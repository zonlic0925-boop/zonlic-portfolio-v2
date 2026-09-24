# Design

<!-- impeccable:design-schema 1 -->

## What this is

One sheet of a ballooned inspection drawing, drawn in the browser. The page is a technical
document about a person: the part is ZHANG Zilong, each credential and project is a ballooned
characteristic, and every claim carries an index that points at the record it came from. Nothing
is decoration; the apparatus of a drawing sheet is doing the work a portfolio normally does with
cards.

Recorded from the built page at `index.html`, not from intention.

## World

**Ground.** A printed drawing sheet read under office daylight: cool paper, blue-black line work,
one inspection-blue accent. Depth comes from paper tints and hairlines, never from shadow. A dark
counterpart exists as a second rendering of the same sheet, not a filter: it is the same drawing on
a CAD viewer's night canvas.

**Geometry.** Square corners everywhere. A drawing has no rounded geometry, so `border-radius` is 0
on every surface. The one round shape in the system is the balloon circle, because a callout is
round in the notation this world borrows from; it is a documented exception, not a drift.

**Elevation.** No box-shadow is used for depth anywhere. The single shadow in the file paints the
paper band around the sheet (`box-shadow: 0 0 0 var(--frame) var(--paper)` on `.frame__border`), so
the frame reads as a mask over the scrolling page rather than as elevation.

## Tokens

Defined on `:root` in `assets/css/sheet.css`, redefined under `[data-theme='night']`.

| Token | Sheet | Night | Role |
|---|---|---|---|
| `--paper` | `#eef0ed` | `#13171a` | the sheet itself |
| `--paper-raised` | `#f6f7f5` | `#191e22` | title block, plates, insets |
| `--paper-sunk` | `#e3e7e3` | `#0e1113` | scrollbar track, recessed bands |
| `--paper-plate` | `#ffffff` | `#1d2328` | behind a screenshot inside its frame |
| `--ink` | `#16191c` | `#e7eae7` | line work, headings, body |
| `--ink-2` | `#4c555c` | `#aab3b9` | secondary copy, table cells |
| `--ink-3` | `#616b73` | `#949ea5` | field labels only, never body |
| `--rule` | `#c3c9c6` | `#2c3338` | hairline between records |
| `--rule-2` | `#a7afac` | `#3d464c` | frame, plate borders, leaders |
| `--accent` | `#1b4d8f` | `#85b3e8` | the single accent |
| `--accent-ink` | `#ffffff` | `#0e1113` | text on the accent |
| `--accent-wash` | `#dbe4f0` | `#1c2836` | traced row, selection |
| `--accent-edge` | `#8ba7c9` | `#3d5b7d` | reserved for accent-tinted rules |

**One accent, one job list.** Blueprint blue marks: the balloon rings, the zone rail's active tick,
the jump menu's active item, links, the primary action, the traced-row wash, and the accent
borders on plates. It is never used as decoration and never as a second hue. A warm grey does not
appear on this sheet.

**Color strategy: Restrained.** Neutrals plus one accent, chosen because the visitor is reading a
document rather than being sold to. The accent's saturation stays under 80% so it reads as ink,
not as a highlight.

## Type

Two self-hosted faces, chosen from the world rather than from habit.

- **Barlow** (400/500/600/700) for display and UI. DIN-adjacent grotesque, which is the lettering
  tradition of technical drawings. Not a system fallback and not a training-data default.
- **Azeret Mono** (400/500/600) for anything measured: drawing numbers, dates, periods, counts,
  field labels, table headers, captions' figure numbers, the rail ticks.
- **Chinese** falls back to the platform gothic (`PingFang TC`, `Microsoft JhengHei`, `Noto Sans TC`).
  Deliberate: a self-hosted CJK face costs megabytes, and the platform gothic is the correct
  companion for a technical document on both macOS and Windows.

Sizes, in `rem` unless noted: `.part__name` `clamp(2.9rem, 12.2vw, 11rem)`; `.sheet-title`
`clamp(1.6rem, 3.6vw, 2.6rem)`; `.view__name` `clamp(1.45rem, 3.2vw, 2.4rem)`; body
`clamp(0.95rem, 0.42vw + 0.85rem, 1.0625rem)`; the smallest functional text is `0.72rem`
(11.52px), the legibility floor.

Tracking: display sits at `-0.03em`; the mono face at `0.035em`; uppercase micro-labels at
`0.11em`. Nothing below `-0.04em`.

## Structure

A fixed frame carries the sheet's coordinate system: a border inset by `--frame` (14px desktop,
8px phone) with zone letters A-F on the top rail, each a working jump link that reports
`aria-current`. A 52px strip below it holds the name, the drawing number and sheet count, the zone
jump menu, the language segments and the light/night control. Both are chrome, both are masked by
paper, and neither is a heading.

Zones, in order: **A** general view (hero), **B** inspection record, **C** project views, **D**
revision history, **E** notes, **F** sign-off. Zone letters live in the rail only; no section
carries a small uppercase label above its heading.

**The index graph.** The inspection record's five rows carry balloons 01-05, each with a REFERENCE
link out to a revision row or a project view. The views carry a dashed REFERENCE balloon back to
their characteristic, and the revision rows carry an `ITEM n` link back to the record. Every number
matches across zones in both languages. This is the page's signature interaction and it is real:
activating a balloon scrolls to its entry and marks it traced for 2.6 seconds.

## Components

- **Title block** - bordered grid of labelled fields plus the one contact action; the phone drops
  the sheet-count field and keeps a 2x2 with no empty cell.
- **Record tables** - real `<table>` with `<thead>`, `<colgroup>` and a visually hidden caption.
  Below 1180px they become a stack of labelled records via `td[data-label]::before`; the header row
  stays in the accessibility tree.
- **Balloon** - a 30px ring in accent blue, or dashed when it is a back-reference. Never a pill,
  never a filled chip.
- **Plate** - a bordered frame holding one real image or one poster frame, with its caption below
  the frame (never overlaid). Figure numbers are mono and accented.
- **Route strip** - a dimension line spanning three stops with a hollow-to-filled progression.
- **Papers** - two bordered publication entries.
- **Lightbox** - a native `<dialog>` opened with `showModal()`, so focus trapping and Escape come
  from the platform. Closed state is `display: none`; an author `display` rule on a closed dialog
  would otherwise paint the scrim over the whole sheet.

## Motion

One authored moment on load: the frame settles, the name's two lines rise, and the leader between
the part and its detail view draws itself from the name outward. The only other motion is the
leader dash on each view's notes, which draws when its view arrives, plus the traced-row wash. There
is no per-section entrance replay, no parallax, no infinite loop.

Easing is `cubic-bezier(0.16, 1, 0.3, 1)` throughout. Everything animates `transform` and `opacity`
only. `prefers-reduced-motion: reduce` collapses all of it to static, and the leader-draw
IntersectionObserver is not even created.

## States

- Language and theme controls are `aria-pressed` toggles; both persist to `localStorage` and both
  fall back to the platform preference on first visit.
- Balloons expose `aria-pressed` and an accessible name naming the item they index.
- Demo plates swap their poster for a `<video controls autoplay playsinline>` on activation, one at
  a time, and the frame reports `data-playing`.
- The mobile zone menu is a disclosure with `aria-expanded`, closed by Escape, by choosing a zone,
  or by leaving the width.
- Browser surfaces are themed: selection, caret, scrollbar, focus ring and link underline offset all
  come from the palette.

## Responsive

| Breakpoint | What changes |
|---|---|
| 1180px | record and revision tables stop being tables and become labelled stacks |
| 1080px | the view header drops its metadata to its own line; the hero stops being two columns |
| 900px | the zone jump menu collapses into a disclosure; figure grids go two-up; the hero goes one column |
| 760px | the rail is hidden and the frame narrows to 8px; plate arrays become scroll-snap rows; the phone title block drops one field; the portrait becomes a square crop |

Every multi-column layout declares its own collapse. No `h-screen` anywhere: full-height regions
use `100dvh`. The hero fits its viewport with the contact action above the fold at all twelve widths
tested from 1920x1080 to 360x740.

## Print

A print stylesheet ships with the page: chrome and lightbox are removed, plate grids go three-up,
and link targets are printed after their labels. The sheet is meant to be printable because a
drawing is.

## What this world refuses

- Rounded corners, drop shadows and glass. The one exception is the balloon circle.
- A second accent colour, and any purple-to-blue gradient.
- Small uppercase eyebrows above section headings. The zone rail carries the coordinates instead.
- Icons drawn by hand: the seven glyphs are Phosphor paths, vendored because there is no build step.
- Fake product UI built from divs. Every product image is a screenshot of the shipped application.
- Claims without a source. The notes block states the rule on the page itself: every figure comes
  from the certification record, the laboratory record, or the shipped build.
