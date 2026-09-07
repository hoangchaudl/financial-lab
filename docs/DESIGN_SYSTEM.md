# Design System Snapshot — "Doraemon Manga" Theme

Snapshot date: 2026-09-07, updated 2026-09-07 against `origin/main` @ `8d16e0c`
("Changed Finance Lab font")

This document captures the design tokens (fonts, colors, shape/shadow rules) that
were in place immediately before the switch to the clean blue/white SaaS theme, so
it can be reverted to this exact state later if that redesign doesn't work out.
Source of truth is always [`src/index.css`](../src/index.css) and
[`tailwind.config.ts`](../tailwind.config.ts) — this file is a point-in-time copy.

## Fonts

Loaded in `index.html` via Google Fonts:

```
https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bangers&family=Nunito:wght@400;600;700;800;900&display=swap
```

| Role | Font | Usage |
|---|---|---|
| Body / UI | **Nunito** (400/600/700/800/900) | Default `font-family` on `<body>`, all regular text |
| Display / wordmark | **Abril Fatface** → **Bangers** → **Nunito** | `.font-display`, weight 400, letter-spacing 0.02em, italic + uppercase where applied — used for the "Finance Lab" wordmark via [`Brand.tsx`](../src/components/Brand.tsx) (sidebar, mobile header, landing nav/footer, auth cards) |
| Comic/title | **Bangers** | `.manga-title` — page H1s, styled like a manga chapter title (outlined + drop shadow) |

Fallback stack: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`

Tailwind config (`tailwind.config.ts`):
```ts
fontFamily: {
  display: ['"Abril Fatface"', '"Bangers"', '"Nunito"', "ui-sans-serif", "system-ui", "sans-serif"],
  sans: ['"Nunito"', "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
},
```

The logo mark itself (`Brand.tsx`) rendered `src/assets/finance-lab-logo.png` inside a
36px rounded-xl box with a `border-2 border-outline` + `card-shadow-sm` hard offset
shadow, next to the italic-uppercase wordmark.

## Colors (HSL CSS vars, `src/index.css` `:root`)

**Core**
- Background: `0 0% 100%` (white) with a subtle dot-grid screentone texture overlay
- Foreground/text: `0 0% 10%` (near-black)
- Outline/border: `0 0% 10%` — 2px borders throughout
- Border (soft): `0 0% 88%`

**Brand**
- Primary (Doraemon blue): `199 100% 46%` → `#00A0E9`
- Primary foreground (strong, for text on blue): `202 100% 22%`
- Secondary (pale blue tint): `199 100% 96%`
- Accent (light blue tint): `199 100% 94%`

**Semantic**
- Success / gains (green): `151 100% 35%` → `#00B060`
- Destructive / loss (red): `350 100% 45%` → `#E60026`
- Warning (gold): `51 100% 50%`, warning-foreground: `40 70% 28%`
- Bell yellow: `51 100% 50%` → `#FFD700`

**Chart palette** (`--chart-1` … `--chart-7`, one shared source of truth for every pie/donut/line series):
1. Blue `199 100% 46%` — Stocks
2. Green `151 100% 35%` — Savings / Cash
3. Violet `262 83% 62%` — Crypto
4. Gold `51 100% 50%` — Gold
5. Teal `174 70% 41%` — ETF
6. Orange `24 95% 53%` — Mutual Funds
7. Gray `0 0% 55%` — Other

**Sidebar**
- Background: `199 100% 46%` (Doraemon blue)
- Foreground: `0 0% 100%` (white)
- Active pill (bell): `51 100% 50%` bg, `0 0% 10%` text
- Accent (hover): `199 100% 40%`

**Shape**
- `--radius: 1rem` (16px)

## Signature style details

- **Hard offset shadows, no blur**: `box-shadow: 4px 4px 0 0 hsl(var(--outline))` on cards
  (`.card-shadow`), `2px 2px 0 0` on small elements (`.card-shadow-sm`), `6px 6px 0 0` on
  floating nav (`.floating-nav-shadow`)
- **2px solid black borders** on nearly every surface (cards, inputs, buttons)
- Manga-style speech-bubble tooltips (`.manga-bubble`): white bubble, black border,
  triangle tail — used in Recharts custom tooltips
- Dot-grid background texture: `radial-gradient(hsl(0 0% 10% / 0.08) 1px, transparent 1px)`,
  `background-size: 14px 14px`
- `.manga-title`: Bangers font, `letter-spacing: 0.06em`, `-webkit-text-stroke: 1px` outline,
  `text-shadow: 2px 2px 0` outline color

## How to revert to this theme

1. Restore the Google Fonts `<link>` in `index.html` (see URL above).
2. Restore `fontFamily.display` / `fontFamily.sans` in `tailwind.config.ts` to the values above.
3. Restore the `:root` CSS variable block in `src/index.css` to the HSL values above.
4. Restore the `.card-shadow`, `.card-shadow-sm`, `.floating-nav-shadow`, `.manga-title`,
   `.font-display`, `.manga-bubble`, `.nav-bell` utility classes in `src/index.css`.
5. Restore the `border-2 border-outline card-shadow-sm` classes on the logo `<img>` in
   `Brand.tsx`, and the `italic uppercase` classes on its wordmark `<span>`.
6. Restore the `border-2 border-outline`/`card-shadow`/belly-pocket markup in
   `src/components/AppLayout.tsx` (sidebar chrome), `src/components/EmptyState.tsx`,
   and the hero card in `src/pages/Dashboard.tsx`.

Alternatively, diff this branch against the commit right before the redesign
(`origin/main` @ `8d16e0c`, "Changed Finance Lab font") for the exact prior state of
every file.
