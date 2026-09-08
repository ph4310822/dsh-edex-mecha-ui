/**
 * APPROACHING LIMITS widget: the MECHA red warning banner (the reference's
 * APPROACHING LIMITS / DANGER language) carrying the live network readout —
 * interface, link state, IP, and ping rendered as alert lines under a
 * blinking DANGER-style state marker.
 */
import type { RightWidgetHooks } from '../../widgets/types.ts'
import css from './NetworkStatusWidget.module.css'

/** Network status widget: alert-styled interface state readout. */
export function NetworkStatusWidget({ useNetwork }: RightWidgetHooks) {
  const network = useNetwork(s => s)
  return (
    <>
      <div className={css.banner} data-testid="edex-network-status-banner">
        <span className={css.marker} aria-hidden="true" />
        <span className={css.stateText}>{String(network.network.state).toUpperCase()}</span>
      </div>
      <div className={css.specLine}><span className={css.key}>INTERFACE</span><span>{network.network.interfaceName}</span></div>
      <div className={css.specLine}><span className={css.key}>IP</span><span>{network.network.ip ?? '—'}</span></div>
      <div className={css.specLine}><span className={css.key}>PING</span><span>{network.network.pingMs === null ? '—' : `${network.network.pingMs.toFixed(0)}ms`}</span></div>
    </>
  )
}
