import type { LivelinePoint } from '../types'

/**
 * Compute visible Y range from data points + current value.
 * Returns { min, max } with margin applied.
 */
export function computeRange(
  visible: LivelinePoint[],
  currentValue: number,
  referenceValue?: number,
  exaggerate?: boolean,
  /** Absolute minimum y-axis span; keeps tiny moves from filling the chart. */
  minSpan = 0,
): { min: number; max: number } {
  let targetMin = Infinity
  let targetMax = -Infinity

  for (const p of visible) {
    if (p.value < targetMin) targetMin = p.value
    if (p.value > targetMax) targetMax = p.value
  }

  if (currentValue < targetMin) targetMin = currentValue
  if (currentValue > targetMax) targetMax = currentValue

  // Include reference line so it's always visible
  if (referenceValue !== undefined) {
    if (referenceValue < targetMin) targetMin = referenceValue
    if (referenceValue > targetMax) targetMax = referenceValue
  }

  const rawRange = targetMax - targetMin
  const marginFactor = exaggerate ? 0.01 : 0.12
  const minRange = rawRange * (exaggerate ? 0.02 : 0.1) || (exaggerate ? 0.04 : 0.4)

  if (rawRange < minRange) {
    const mid = (targetMin + targetMax) / 2
    targetMin = mid - minRange / 2
    targetMax = mid + minRange / 2
  } else {
    const margin = rawRange * marginFactor
    targetMin -= margin
    targetMax += margin
  }

  // Absolute floor: keep a minimum span so tiny moves don't fill the chart.
  if (minSpan > 0 && targetMax - targetMin < minSpan) {
    const mid = (targetMin + targetMax) / 2
    targetMin = mid - minSpan / 2
    targetMax = mid + minSpan / 2
  }

  return { min: targetMin, max: targetMax }
}
