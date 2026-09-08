# @danielng23/dsh-mecha-client-ui-edex

The MECHA eDEX shell frame client for the DeepSeek Harness web GUI: a NERV-style
klaxon alert HUD wrapped around the original workspace UI.

- **Two-tone neon card system** — every widget is a closed rounded rectangle:
  orange variant (`#b77920` border / `#ffaa00` glow) for general cards, red
  variant (`#e32200` / `#ff3300`, 4px) for the alert row.
- **INTERNAL** — the identification card: 内部 glyphs, hazard-stripe block, live
  clock + hardware readouts.
- **PSYCHOGRAPHIC DISPLAY** — per-core sparklines, TEMP/MIN/MAX/TASKS, memory /
  swap block bars.
- **APPROACHING LIMITS** — the live network state under a blinking klaxon marker.
- **PATTERN ANALYSIS** — the featured hexagonal warning grid (18 glowing
  klaxon-red cells, staggered opacity flicker) replacing the world-view globe.
- **MAGI SYSLINK strip** — the workspace framed in the same card chrome; the
  original UI stays intact and interactive.
- One accent (`themeColor`, default `#ff3300`) drives the shell palette, the
  terminal composer/sidebar overrides, and the alias-token layer over the
  original UI.

See the repo root (`dsh-edex-mecha-ui`) for the full README, screenshot, and the
reference analysis (`analysis.json` / `analysis.md`) the theme was built from.
