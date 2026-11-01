# HX design charter (v1)

Single source of truth for the HX product visuals. The live board renders this
charter in section 14 (14A foundations, 14B components, 14C color themes).
Everything below is implemented as CSS custom properties at the top of
`index.html` (`:root` + `html[data-theme="..."]`), so a change here is a
one-line change in code.

## Principles

- Flat, sharp, data-first: radius 0 everywhere (50% only on avatars and map
  pins), no shadows in product UI, no gradients except the loading skeleton.
- Structure never changes color: layout borders, body text and tables stay
  black/gray in every theme. Color only marks interaction (primary buttons,
  selected chips/tabs, active nav) and data signals (trend arrows, chart bars,
  map pins).
- Every figure is demo until a source is wired: DEMO DATA badges are
  mandatory; proposals are drawn dashed/tagged PROPOSED, never as decided.

## Color - 12 canonical steps

| token    | hex      | usage                                   |
|----------|----------|-----------------------------------------|
| ink      | #000     | structure, primary text, 2px borders    |
| gray-900 | #222     | strong text on soft fills               |
| gray-800 | #333     | body emphasis, nav text                 |
| gray-700 | #555     | secondary body                          |
| gray-600 | #666     | captions, table headers                 |
| gray-500 | #777     | meta, tertiary                          |
| gray-400 | #999     | placeholders, disabled                  |
| gray-300 | #bbb     | muted borders, inactive bars            |
| gray-250 | #ccc     | dividers                                |
| gray-200 | #ddd     | hairlines, row separators               |
| gray-150 | #d3d3d3  | map land, image placeholders            |
| gray-100 | #f2f2f2  | soft fills, hover, tags                 |
| paper    | #fff     | screens, panels, inputs                 |

Board-only extras (never inside product screens): backdrop #dcdcdc, sticky
note #fff9c4 / #e0d890.

## Themes (accent, up, down, soft) - PROPOSED, default MONO

| theme  | accent   | up       | down     | soft     | status   |
|--------|----------|----------|----------|----------|----------|
| mono   | #000     | #000     | #666     | #f2f2f2  | current  |
| petrol | #0f4c5c  | #1a7f5a  | #b23a48  | #e6eff2  | proposed |
| oxide  | #0f6b4f  | #1a7f37  | #b3261e  | #e8f3ee  | proposed |
| terra  | #a34a17  | #3d7a2c  | #a12626  | #f7ede4  | proposed |

Live preview: THEME control bottom-right of the board (persisted in
localStorage). Palette choice is Louis's; MONO stays default until decided.

## Type - Helvetica Neue / system sans

Display 44/800 (home hero only) - H1 38/800 - H2 28/800 (sheet titles) -
H3 22/700 - Body 15-16 (nav, search) - Text 13-14 (cells, buttons, chips) -
Caption 11 uppercase +.10-.14em (labels, th, badges).

## Space - 6 steps (px at 1440x900)

4 / 8 / 14 / 20 / 24 / 40. Screen margins and section rhythm: 40.

## Borders & radius

1px hairline (#ddd) - 1.5px component - 2px structural ink. Radius 0; 50%
only on avatars and map pins.

## Components

- Buttons: heights 40 (md) / 30 (sm), 2px ink border, bold, letter-spacing
  .03em. Variants: default, solid (theme accent), disabled (35% opacity).
  States: hover = soft fill (theme), active = 1px shift, focus = accent
  outline.
- Chips: 1.5px border; `.on` = theme accent; `.ghost` = muted.
- Tabs: 3px active underline in theme accent.
- Tables: caption headers, 1px #ddd row separators, hover = theme soft.
- Trends: up/down in theme signal colors (monochrome in MONO).
- Badges: DEMO DATA (solid ink) and PROPOSED (dashed gray) are mandatory.
