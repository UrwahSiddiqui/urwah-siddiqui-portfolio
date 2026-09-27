/**
 * Mutable singleton state shared between the DOM/GSAP world and the R3F render
 * loop. Written by scroll orchestration + pointer/hover handlers, read inside
 * `useFrame`. Kept outside React on purpose so the 60fps render loop never
 * triggers component re-renders.
 */
export type CircuitState = {
  scroll: number
  narrative: number
  hoveredNode: number
  pointerX: number
  pointerY: number
  reducedMotion: boolean
  lowPerf: boolean
  visible: boolean
  mountTime: number
  power: boolean
  integrity: number
  activeStage: string
  recruiterMode: boolean
}

export const circuit: CircuitState = {
  scroll: 0,
  narrative: 0,
  hoveredNode: -1,
  pointerX: 0,
  pointerY: 0,
  reducedMotion: false,
  lowPerf: false,
  visible: true,
  mountTime: 0,
  power: false,
  integrity: 99.8,
  activeStage: 'BOOT',
  recruiterMode: false,
}

export function introProgress(): number {
  if (circuit.reducedMotion) return 1
  if (!circuit.mountTime) return 0
  const elapsed = (performance.now() - circuit.mountTime) / 1000
  const t = Math.min(Math.max(elapsed / 2.6, 0), 1)
  return 1 - Math.pow(1 - t, 3)
}

export function powerOn() {
  circuit.power = true
  circuit.activeStage = 'BUILD'
}

export function toggleRecruiterMode() {
  circuit.recruiterMode = !circuit.recruiterMode
  return circuit.recruiterMode
}

export function updateSystemFromScroll(progress: number) {
  circuit.scroll = progress
  circuit.narrative = Math.min(progress * 1.35, 1)
  const stage = progress < 0.18 ? 'BUILD' : progress < 0.42 ? 'SECURE' : progress < 0.72 ? 'OPERATE' : 'EVOLVE'
  circuit.activeStage = stage
  circuit.integrity = Math.max(96.4, 99.8 - progress * 1.6)
}

export function stageLabel() {
  return circuit.activeStage === 'BUILD'
    ? 'FOUNDATION LAYER'
    : circuit.activeStage === 'SECURE'
      ? 'THREAT MODEL'
      : circuit.activeStage === 'OPERATE'
        ? 'ACTIVE OPERATIONS'
        : 'NEXT ITERATION'
}

export function progressPercent() {
  return Math.round(circuit.scroll * 100)
}

export function resetCircuitState() {
  circuit.scroll = 0
  circuit.narrative = 0
  circuit.hoveredNode = -1
  circuit.power = false
  circuit.integrity = 99.8
  circuit.activeStage = 'BOOT'
  circuit.recruiterMode = false
}

export function getCircuitState() {
  return { ...circuit }
}

export function setReducedMotion(value: boolean) {
  circuit.reducedMotion = value
}

export function setVisibility(value: boolean) {
  circuit.visible = value
}

export function setPointer(x: number, y: number) {
  circuit.pointerX = x
  circuit.pointerY = y
}

export function setHoveredNode(index: number) {
  circuit.hoveredNode = index
}

export function initializeCircuit() {
  circuit.mountTime = performance.now()
}

export function getActiveStage() {
  return circuit.activeStage
}

export function isPowered() {
  return circuit.power
}

export function isRecruiterMode() {
  return circuit.recruiterMode
}

export function getIntegrity() {
  return circuit.integrity
}

export function getProgress() {
  return circuit.scroll
}

export function getNarrativeProgress() {
  return circuit.narrative
}

export function getHoveredNode() {
  return circuit.hoveredNode
}

export function getPointer() {
  return { x: circuit.pointerX, y: circuit.pointerY }
}

export function getVisibility() {
  return circuit.visible
}

export function getReducedMotion() {
  return circuit.reducedMotion
}

export function getLowPerf() {
  return circuit.lowPerf
}

export function setLowPerf(value: boolean) {
  circuit.lowPerf = value
}

export function setPower(value: boolean) {
  circuit.power = value
}

export function setRecruiterMode(value: boolean) {
  circuit.recruiterMode = value
}

export function setActiveStage(value: string) {
  circuit.activeStage = value
}

export function setIntegrity(value: number) {
  circuit.integrity = value
}

export function setScroll(value: number) {
  circuit.scroll = value
}

export function setNarrative(value: number) {
  circuit.narrative = value
}

export function setMountTime(value: number) {
  circuit.mountTime = value
}

export function setVisible(value: boolean) {
  circuit.visible = value
}

export function setPointerX(value: number) {
  circuit.pointerX = value
}

export function setPointerY(value: number) {
  circuit.pointerY = value
}

export function setHovered(value: number) {
  circuit.hoveredNode = value
}

export function getStageLabel() {
  return stageLabel()
}

export function getProgressPercent() {
  return progressPercent()
}

export function getSystemSummary() {
  return {
    power: circuit.power,
    stage: circuit.activeStage,
    integrity: circuit.integrity,
    progress: circuit.scroll,
    recruiterMode: circuit.recruiterMode,
  }
}

export function getBootStatus() {
  return circuit.power ? 'SYSTEM ONLINE' : 'SYSTEM STANDBY'
}

export function getModeLabel() {
  return circuit.recruiterMode ? 'QUICK VIEW ACTIVE' : 'CINEMATIC MODE'
}

export function getStatusLine() {
  return `${getBootStatus()} · ${stageLabel()} · ${circuit.integrity.toFixed(1)}% INTEGRITY`
}

export function getChapterId() {
  return circuit.activeStage.toLowerCase()
}

export function getPowerLabel() {
  return circuit.power ? 'Run diagnostic' : 'Power on system'
}

export function getRecruiterLabel() {
  return circuit.recruiterMode ? 'Return to circuit' : 'Recruiter mode'
}

export function getSignalState() {
  return circuit.power ? 'SIGNAL STABLE' : 'SIGNAL DORMANT'
}

export function getControlRoomState() {
  return { ...circuit, stageLabel: stageLabel(), progress: progressPercent() }
}

export function getSystemStage(progress: number) {
  return progress < 0.18 ? 'BUILD' : progress < 0.42 ? 'SECURE' : progress < 0.72 ? 'OPERATE' : 'EVOLVE'
}

export function syncSystemStage(progress: number) {
  const stage = getSystemStage(progress)
  circuit.activeStage = stage
  return stage
}

export function syncSystem(progress: number) {
  updateSystemFromScroll(progress)
  return getControlRoomState()
}

export function hasBooted() {
  return circuit.power
}

export function hasReducedMotion() {
  return circuit.reducedMotion
}

export function isVisible() {
  return circuit.visible
}

export function getIntroProgress() {
  return introProgress()
}

export function getMountTime() {
  return circuit.mountTime
}

export function getLowPerformance() {
  return circuit.lowPerf
}

export function setCapabilities({ reducedMotion, lowPerf }: { reducedMotion?: boolean; lowPerf?: boolean }) {
  if (reducedMotion !== undefined) circuit.reducedMotion = reducedMotion
  if (lowPerf !== undefined) circuit.lowPerf = lowPerf
}

export function setAllState(next: Partial<CircuitState>) {
  Object.assign(circuit, next)
}

export function readCircuit() {
  return circuit
}

export function noop() {}

export default circuit
