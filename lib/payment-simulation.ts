/** In-memory teaching model, not a payment processor or backend security guarantee. */
export type Packet = { id: number }
export type PaymentState = { offline: boolean; queue: Packet[]; settled: number[]; lastBatch: Packet[]; nextId: number; ignored: number }
export type PaymentAction = 'toggle-network' | 'pay' | 'retry' | 'reset'
export const initialPaymentState: PaymentState = { offline: false, queue: [], settled: [], lastBatch: [], nextId: 1, ignored: 0 }

function reconcile(state: PaymentState, batch: Packet[]): PaymentState {
  const ids = new Set(state.settled)
  let ignored = 0
  for (const packet of batch) {
    if (ids.has(packet.id)) ignored++
    else ids.add(packet.id)
  }
  return { ...state, settled: [...ids], queue: [], lastBatch: batch, ignored }
}

export function paymentReducer(state: PaymentState, action: PaymentAction): PaymentState {
  if (action === 'reset') return initialPaymentState
  if (action === 'retry') return state.offline ? state : reconcile(state, state.lastBatch)
  if (action === 'toggle-network') return state.offline ? reconcile({ ...state, offline: false }, state.queue) : { ...state, offline: true, ignored: 0 }
  const packet = { id: state.nextId }
  const next = { ...state, nextId: state.nextId + 1, ignored: 0 }
  return state.offline ? { ...next, queue: [...state.queue, packet] } : reconcile(next, [packet])
}
