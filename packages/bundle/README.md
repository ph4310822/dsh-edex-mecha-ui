# @danielng23/dsh-edex-mecha-ui

**DeepSeek Harness MECHA eDEX shell** — a NERV/Evangelion-style klaxon alert HUD overlay
for the DSH web GUI: thick rounded neon panels in a two-tone warning-orange/klaxon-red
system on black, hazard stripes, the PATTERN ANALYSIS hex warning grid, and the original
UI intact in the center.

![MECHA screenshot](assets/screenshot.png)

## Features

- **Left bar** — the INTERNAL identification card (内部 glyphs + hazard stripes) and
  the PSYCHOGRAPHIC DISPLAY system panel: CPU, memory, swap, processes, platform
  info, and thermal/power state, with per-core CPU sparklines
- **Right bar** — the APPROACHING LIMITS alert banner (live interface state), the
  PATTERN ANALYSIS hex warning grid (18 glowing klaxon-red cells with staggered
  flicker, replacing the world-view globe), and a dual up/down traffic chart
- **Bottom-left** — filesystem browser: directory listing, file preview, storage
  bar, with folder/file SVG icons in the theme green
- **Bottom-right** — file preview pane (text, code, images)
- **Terminal-styled composer** — flattened input capsule, green block caret, and
  a `~/<workspace>` path prompt at the left edge of the input area
- **Workspace-follow** — the dir panel and prompt track the active conversation's
  workspace; switching sessions navigates both the filesystem browser and the
  prompt
- **Green-on-black skin** — token overrides recolour the entire original UI to
  terminal green, without touching the user's theme preference

## Installation

From the harness checkout:

```sh
pnpm dsh plugin --profile web add @danielng23/dsh-edex-mecha-ui
```

## Packages

| Package | Host/Client | Description |
|---|---|---|
| `@danielng23/dsh-edex-mecha-ui` | — | Installable bundle (`cordis.patch.yml`) |
| `@danielng23/dsh-mecha-client-ui-edex` | client | The eDEX shell frame and all panels |
| `@danielng23/dsh-mecha-client-ui-theme-terminal` | client | Appearance → Terminal theme row |
| `@danielng23/dsh-mecha-host-system-metrics` | host | System telemetry RPC endpoints |

## License

MIT
