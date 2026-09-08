/**
 * INTERNAL widget: the MECHA identification card from the reference — huge
 * 内部 glyphs in warning orange with a dark outline + glow, the INTERNAL
 * label, and a vertical hazard-stripe block on the card's right edge — over
 * the live clock and hardware/spec readouts (same hooks as the stock info
 * widget: clock + uptime/platform/power + manufacturer/model/chassis).
 */
import { useEffect, useState } from 'react'
import type { LeftWidgetHooks } from '../../widgets/types.ts'
import css from './InfoWidget.module.css'

/** HH:MM:SS. */
function clockText(date: Date): string {
  const pad = (value: number): string => String(value).padStart(2, '0')
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

/** H:MM:SS from a seconds count. */
function durationText(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const secs = total % 60
  const pad = (value: number): string => String(value).padStart(2, '0')
  return `${hours}:${pad(minutes)}:${pad(secs)}`
}

/** INTERNAL widget: identification header + clock + system specs. */
export function InfoWidget({ usePanel }: LeftWidgetHooks) {
  const panel = usePanel(s => s)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => { clearInterval(timer) }
  }, [])

  const year = now.getFullYear()

  return (
    <div className={css.card}>
      <div className={css.stripe} aria-hidden="true" />
      <div className={css.kanji} aria-hidden="true">内部</div>
      <div className={css.label}>INTERNAL</div>
      <div className={css.clock} data-testid="edex-left-bar-clock">{clockText(now)}</div>
      <div className={css.specs}>
        <div className={css.specLine}><span className={css.specKey}>YEAR</span><span>{year}</span></div>
        <div className={css.specLine}><span className={css.specKey}>UPTIME</span><span>{durationText(panel.uptimeSeconds)}</span></div>
        <div className={css.specLine}><span className={css.specKey}>CONNECTION</span><span>{panel.platform === '' ? '—' : panel.platform}</span></div>
        <div className={css.specLine}><span className={css.specKey}>POWER</span><span>{panel.powerState ?? '—'}</span></div>
      </div>
      <div className={css.specs}>
        <div className={css.specLine}><span className={css.specKey}>MANUFACTURER</span><span>{panel.hardware.manufacturer}</span></div>
        <div className={css.specLine}><span className={css.specKey}>MODEL</span><span>{panel.hardware.model}</span></div>
        <div className={css.specLine}><span className={css.specKey}>CHASSIS</span><span>{panel.hardware.chassis}</span></div>
      </div>
    </div>
  )
}
