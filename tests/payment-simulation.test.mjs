import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'

const source = readFileSync(new URL('../lib/payment-simulation.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } }).outputText
const { paymentReducer: reduce, initialPaymentState: initial } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'))

test('offline queue reconciles once; retries do not duplicate settlement', () => {
  let state = reduce(initial, 'toggle-network')
  state = reduce(reduce(state, 'pay'), 'pay')
  assert.equal(state.queue.length, 2)
  assert.equal(state.settled.length, 0)
  state = reduce(state, 'toggle-network')
  assert.equal(state.queue.length, 0)
  assert.deepEqual(state.settled, [1, 2])
  state = reduce(state, 'retry')
  assert.deepEqual(state.settled, [1, 2])
  assert.equal(state.ignored, 2)
  state = reduce(state, 'retry')
  assert.equal(state.settled.length, 2)
})

test('online payments settle and offline retry is a no-op', () => {
  let state = reduce(initial, 'pay')
  assert.deepEqual(state.settled, [1])
  assert.equal(state.nextId, 2)
  state = reduce(state, 'toggle-network')
  assert.equal(reduce(state, 'retry'), state)
  assert.deepEqual(reduce(state, 'reset'), initial)
})

test('repeated disconnect cycles preserve unique IDs without mutating initial state', () => {
  let state = initial
  for (let cycle = 0; cycle < 10; cycle++) {
    state = reduce(state, 'toggle-network')
    state = reduce(state, 'pay')
    state = reduce(state, 'toggle-network')
    state = reduce(state, 'retry')
  }
  assert.equal(state.settled.length, 10)
  assert.equal(new Set(state.settled).size, 10)
  assert.equal(initial.settled.length, 0)
  assert.equal(initial.nextId, 1)
})
