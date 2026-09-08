# MECHA — Review

**Verdict: PASS** (probe #3 after two fixes; 0 console errors across every probe)

**Published verification**: the npm chain (`dsh-edex-mecha-ui@0.1.0` → `dsh-mecha-client-ui-edex@0.1.1` → `dsh-mecha-client-ui-theme-terminal@0.1.1` → `dsh-mecha-host-system-metrics@0.1.0`) was installed from the registry into a scratch DSH profile, booted on port 3086, and re-probed: **0 errors, workspace present, worldViewGone, `pattern` widget present, identical tokens** (`--edex-green #ff3300`, bodyBackground `rgb(10, 11, 14)`).

## Result summary

| Check | Result |
|---|---|
| Console/page errors | **0** (probe-review, animation probe, GIF capture) |
| Shell present | true |
| Workspace present (sidebar/conversation/composer) | **true** |
| Center section transparent / borderless / margin 0 | **true** (`rgba(0,0,0,0)`, 0px, 0px) |
| worldViewGone | **true** |
| Featured widget `pattern` rendered | **true** (`widgetIds` contains `pattern`; hex grid visible upper-right) |
| bodyBackground | `rgb(10, 11, 14)` = `--edex-panel` `#0a0b0e` (panel match) |
| `--edex-green` | `#ff3300` (== analysis `theme.primaryAccent`) |
| Pixel diff (reference vs render) | 15.84% overall; worst band = the reference's dense mid-band (artboard vs live-app layout difference) |
| Animation probe | **pass: true** — 19 running animations (18 hex-flicker + 1 marker-blink), opacity sampled changing, playState running, extent in container, 0 errors |
| Animation diff (t0/t1) | 0.09% overall, confined to the hex-grid region (x 1067–1600, y 150–450) |
| GIF | `preview.gif` 4s @ 12fps, 48 frames, 1.2 MB, 0 errors |

Artifacts: the review screenshot was promoted to `screenshot.png` (repo root, referenced
from the README); the captured frames/heatmaps live in the loop's vision-toolkit artifact
directory (`.dsh-vision-toolkit/artifacts/mecha-review-diff`, `mecha-anim-diff`).

## Granularity check (per-element, zoomed)

- **Left column** (3 cards): each card = closed rounded box, ~3px amber border `#b77920`, ~8–10px radius, orange glow, glowing uppercase title — matches `borderFeatures.cards` (full / 3px / radius 10 / moderate amber glow). INTERNAL card shows the hazard stripes + 内部 glyphs.
- **Right column**: APPROACHING LIMITS = 4px red `#e32200` rounded frame + red glow + glowing red title; PATTERN ANALYSIS = same red variant around the hex grid; TRAFFIC = amber 3px variant. Two-tone orange/red system as analyzed.
- **Frame level**: panel cells carry NO border (canvas), per `borderFeatures.frame.notes`.
- **Center chrome**: `.centerWidget` 3px amber border + MAGI SYSLINK title strip; inner `[data-widget='center']` section transparent (0px border, no margin, no background).

## Fixes applied during review (2 retries)

1. **Center container painted over the workspace**: `.centerWidget`'s opaque `background: var(--edex-panel)` covered the original UI's center column (the shell paints ABOVE the layout frame's columns — the columns render *behind* the shell, unlike the AIRTRACK assumption that the frame is squeezed inside). Fixed: `background: transparent` on the center container; the workspace surface color comes from the token overrides. Verified visually: `Into the Unknown`, `Choose a workspace` composer, sidebar rail all visible.
2. **Border weight below the reference**: first render's 2px cards read thinner than the reference's 3–4px neon frames (vision compare: "borders thinner, glow weaker"). Bumped cards 2→3px, red variant 3→4px, center 2→3px (+inset), glow intensity up.

## Palette / token verification

- Accent `#ff3300` == `--edex-green` == label-primary token (icons recolored).
- `--edex-border` computed `#602010` — the runtime `paletteFor('#ff3300')` dark-border tone (analysis `borderFeatures.inputs.color #8f1200` is the static default; runtime derives its family from the theme color — same klaxon-red family, expected behavior of the one-accent palette system).
- Semantic accents: warn/success `#ffaa00`, error `#ff2533` (FIXED_ACCENTS from the analysis).

## Divergences (noted, accepted)

- The reference is a poster-style artboard (3 dominant elements); the render is a live 10-widget dashboard — layout density differs by design (the eDEX frame structure is kept per build.md).
- Reference's hex cells are facet-shaded SVG art; the implementation approximates with clip-path hexagons + gradient facets + staggered opacity blink (the implied klaxon flicker).
