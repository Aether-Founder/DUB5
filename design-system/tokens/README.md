# Token Schema

This document explains the structure of the machine-readable `tokens.json` file for the DUB5 design system.

---

## Schema Structure

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://dub5.design-system/tokens.json",
  "title": "DUB5 Design Tokens",
  "description": "Machine-readable design tokens for the DUB5 design system.",
  "version": "1.0.0",
  "tokens": {
    "color": { ... },
    "typography": { ... },
    "spacing": { ... },
    "radius": { ... },
    "border": { ... },
    "shadow": { ... },
    "opacity": { ... },
    "motion": { ... },
    "breakpoint": { ... },
    "zIndex": { ... },
    "layout": { ... }
  }
}
```

---

## Token Categories

### color

Surface and text colors for the DUB5 interface.

**Structure:**
- `background.primary` — Lightest blue, top of gradient (#0b1150)
- `background.secondary` — Mid blue-purple (#050833)
- `background.tertiary` — Darkest, bottom of gradient (#01030f)
- `surface.glass` — Glassmorphism surface
- `surface.glassHover` — Glass surface on hover
- `surface.glassBlur` — Blur effect for glass
- `text.primary` — Primary text color
- `text.secondary` — Secondary/dimmed text
- `text.tertiary` — Tertiary/faint text
- `line.default` — Default line color
- `line.strong` — Strong line color
- `accent.games` — Games category accent (#4cc9f0)
- `accent.tools` — Tools category accent (#a78bfa)
- `accent.study` — Study category accent (#34d399)
- `accent.hacks` — Hacks category accent (#fb7185)
- `accent.guides` — Guides category accent (#fbbf24)
- `status.badge1` — Badge color 1 (#ff5a5f)
- `status.badge2` — Badge color 2 (#d81f2a)

### typography

Font families, sizes, weights, and spacing.

**Structure:**
- `fontFamily.display` — DM Serif Display
- `fontFamily.ui` — System UI font stack
- `fontSize.display.desktop` — Display size on desktop (8rem)
- `fontSize.display.mobile` — Display size on mobile (4.5rem)
- `fontSize.detailTitle` — Detail/game title (4.5rem)
- `fontSize.cardTitle` — Card title (0.98rem)
- `fontSize.cardDescription` — Card description (0.83rem)
- `fontSize.body` — Body text (1rem)
- `lineHeight.body` — Body line height (1.5)
- `lineHeight.heading` — Heading line height (1.2)
- `letterSpacing.default` — Default letter spacing

### spacing

Spacing scale and layout spacing.

**Structure:**
- `scale` — Complete spacing scale (0.22rem to 7.5rem)
- `container.desktop` — Desktop container padding (7.5rem 2rem 3rem)
- `container.mobile` — Mobile container padding (6.5rem 1.25rem 2rem)
- `gridGap` — Grid gap (0.85rem)

### radius

Border radius values.

**Structure:**
- `pill` — Pill shape (999px)
- `panel` — Panel radius (18px)
- `chip` — Chip radius (12px)
- `badge` — Badge radius (7px)

### border

Border properties.

**Structure:**
- `width` — Border width (1px)
- `color.default` — Default border color
- `color.strong` — Strong border color

### shadow

Shadow effects.

**Structure:**
- `glass` — Glass shadow (0 18px 40px -26px rgba(0, 0, 0, 1))
- `glassInset` — Glass inset shadow

### opacity

Opacity values.

**Structure:**
- `hover` — Opacity on hover (1)
- `inactive` — Opacity when inactive (0.6)

### motion

Animation durations, easing, and transforms.

**Structure:**
- `duration.hover` — Hover transition (300ms)
- `duration.enter` — Enter animation (550ms)
- `duration.topbarScroll` — Topbar scroll (420ms)
- `duration.headerRule` — Header rule (1300ms)
- `easing.hover` — Hover easing (ease-in-out)
- `easing.enter` — Enter easing (cubic-bezier(0.22, 1, 0.36, 1))
- `easing.scroll` — Scroll easing (cubic-bezier(0.4, 0, 0.2, 1))
- `transform.hoverLift` — Hover lift (translateY(-2px))
- `transform.iconChipHover` — Icon chip hover (scale(1.05))
- `transform.titleHover` — Title hover (translateX(2px))
- `transform.arrowHover` — Arrow hover (translate(2px, -2px))
- `transform.activeButton` — Active button (scale(0.9))

### breakpoint

Responsive breakpoints.

**Structure:**
- `hideDescriptions` — Hide card descriptions (560px)
- `singleColumn` — Single column layout (600px)
- `mobile` — Mobile breakpoint (768px)
- `tablet` — Tablet breakpoint (900px)

### zIndex

Z-index layering.

**Structure:**
- `content` — Content layer (10)
- `topbar` — Topbar layer (50)
- `overlay` — Overlay layer (100)

### layout

Layout dimensions.

**Structure:**
- `container.maxWidth` — Max container width (1400px)
- `grid.minWidth` — Grid item min width (340px)

---

## Using the Tokens

The tokens correspond exactly to the canonical rules documented in `DESIGN.md`. Do not use these tokens independently of the canonical documentation.

When implementing DUB5 visuals:
1. Read the relevant section of `DESIGN.md`
2. Reference the corresponding token value in `tokens.json`
3. Use the exact value
4. Do not modify the token without updating `DESIGN.md`

---

## Versioning

The token file version matches the design-system version. When tokens change, update both `tokens.json` and `DESIGN.md`, and increment the version accordingly.
