/**
 * PATTERN ANALYSIS widget: the reference's featured element — the glowing
 * red hexagonal warning grid (18 cells in staggered rows, near-black gaps,
 * diffuse red glow, no outer frame) — replacing the WORLD VIEW globe. Cell
 * fills derive from the LIVE network snapshot (interface state + ping +
 * traffic shape), so the warning matrix is wired to real data. Cells blink
 * in a staggered klaxon flicker (opacity-only keyframes).
 */
import { useMemo } from 'react'
import type { RightWidgetHooks } from '../../widgets/types.ts'
import css from './PatternWidget.module.css'

/** One hexagon's visual state. */
interface HexCell {
  /** Staggered-blink delay (negative so the phase is already running at mount). */
  delay: number
  /** Blink period in seconds. */
  duration: number
  /** Dim cells read as the darker facet tone from the reference. */
  dim: boolean
}

/**
 * Derive the 18-cell matrix from the live network snapshot: the lit count
 * tracks the throughput level, and one cell's dim state flips with the
 * interface state (so the grid actually moves with the data).
 */
function useCells(upMbs: number, downMbs: number, state: string): HexCell[] {
  return useMemo(() => {
    const level = Math.min(1, (upMbs + downMbs) / 8)
    const lit = Math.round(6 + level * 11)
    const offSeed = state === 'up' ? 4 : 11
    return Array.from({ length: 18 }, (_, index): HexCell => ({
      delay: -((index * 7) % 23) / 10,
      duration: 2.2 + ((index * 3) % 5) * 0.35,
      dim: index >= lit || index === offSeed,
    }))
  }, [upMbs, downMbs, state])
}

/** PATTERN ANALYSIS: the hexagonal warning matrix (featured widget). */
export function PatternWidget({ useNetwork }: RightWidgetHooks) {
  const network = useNetwork(s => s)
  const cells = useCells(network.upMbs, network.downMbs, network.network.state)

  return (
    <div className={css.grid} data-testid="edex-pattern-grid" role="img" aria-label="PATTERN ANALYSIS hex warning grid">
      {cells.map((cell, index) => (
        <span
          key={index}
          className={cell.dim ? css.cellDim : css.cell}
          style={{ animationDelay: `${cell.delay.toFixed(2)}s`, animationDuration: `${cell.duration.toFixed(2)}s` }}
        />
      ))}
    </div>
  )
}
