# MECHA — Analysis (Japanese mecha alert HUD)

**Reference**: `mecha-nerv-alert` — web-discovered from https://github.com/charlintosh/evangelion-ui-artboard ("evangelion style UI design dark red interface"), captured `references/mecha-discovery/reference-shot.png` (1108×573).
**Method**: vision toolkit (mandatory) + programmatic measurement for pixel values only.

## What the reference is

A NERV/Evangelion-style alert dashboard artboard on a **pure black canvas**. Every element is a
**thick rounded neon rectangle**: near-black fill, 3–4px colored stroke, a thin lighter inner
keyline, ~10–15px radius, and a strong outer glow in the border's own hue. A **two-tone alert
system** runs through the whole piece:

- **Orange variant** — border `#b77920` (bright clusters `#ffaa00`), glowing amber title text,
  thin lighter keyline — used by *PSYCHOGRAPHIC DISPLAY* and the *INTERNAL* card.
- **Red variant** — border `#e32200`/`#ff3300`, glowing orange-red title text, red keyline —
  used by *APPROACHING LIMITS* and *DANGER* (strongest urgency glow).

Title text everywhere is **uppercase, filled with the accent hue, heavy dark outline, glow**.

## Theme (measured + vision-confirmed)

| Token | Value | Source |
|---|---|---|
| Canvas background | `#000000` | dominant cluster 46–57% of frame |
| Card body | `#0a0b0e` (near-black, whisper of the `#2a2c32` structural chrome) | vision "near pure black" + cluster |
| Primary accent | `#ff3300` klaxon red-orange | hue-bucket modal (measure-accent2: red p50 `#ff3300`) |
| Secondary accent | `#ffaa00` warning orange | orange bucket modal `#fca800`/`#ffaa00` |
| Text primary | `#ffaa00` (orange headers) | brightText scan |
| Text secondary | `#b77920` (dim amber labels) | orange border cluster |
| Error / hazard | `#ff2533` hot red-pink (hazard stripes) | brightText `#ff2233` cluster |
| Dark red keyline | `#8f1200` | dark border cluster `#800f00`/`#8a1200` |
| Glow | `#ff3300` strong; `#ffaa00` moderate on orange elements | vision |

No green, no cyan, no blue in this world (trace cyan `#c7e2ea` is capture noise).

## Border language per element

- **frame (warning banners)**: full, solid, 3–4px, `#ff3300` (red) / `#b77920` (orange), radius
  ~12px, **strong** hue-matched glow, thin lighter inner keyline.
- **cards (all elements)**: full, solid, 2px, `#b77920`, radius 10px, moderate `#ffaa00` glow,
  black fill. The featured hex-grid container takes the red variant (3px `#ff3300`, radius 12).
- **dividers**: none — separation comes from black gaps (hex gaps `#080000`–`#120000`, 6–8px)
  and hazard stripes. No added rules except where eDEX structurally needs one.
- **inputs**: none in reference → derived: 1px `#8f1200` dark-red, 8px radius, no glow.
- **active indicator**: 3px `#ff3300` left bar, moderate glow.

## Widgets

Reference inventory: PSYCHOGRAPHIC DISPLAY (orange banner), APPROACHING LIMITS (red banner),
DANGER (red banner), INTERNAL ID CARD (orange card, huge 内部 glyphs, INTERNAL label, vertical
~45° hazard-stripe block: bright `#ff2533` alternating with `#2c0401` black-red), **HEX WARNING
GRID** (18 glowing red-orange hexagons in staggered rows, near-black gaps, diffuse red glow, no
outer frame).

- matches: INTERNAL → `info` (partial), PSYCHOGRAPHIC DISPLAY → `cpu` (partial),
  APPROACHING LIMITS/DANGER → `network-status` (partial)
- **featured (replaces WORLD VIEW globe)**: **PATTERN ANALYSIS** — the hex warning grid,
  implemented in the right bar's showcase slot.

## Implied animation

Klaxon flicker: staggered per-cell opacity blink on the hex grid; glow pulse on the DANGER
banner. Opacity-only keyframes (no rotation, no layout properties).
