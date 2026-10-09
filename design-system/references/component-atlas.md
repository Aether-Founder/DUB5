# Component and State Atlas

This document provides a structured reference for all recurring DUB5 components and their states.

---

## Navigation Card

### Purpose
Primary navigation element for linking to different sections of the site.

### Structure
- Icon chip (left)
- Title (left)
- Description (left, hidden below 560px)
- Arrow indicator (right)

### Dimensions
- Width: Auto
- Height: Auto
- Padding: 0.68rem 1.15rem 0.68rem 0.68rem
- Gap: 0.8rem

### Typography
- Title: 0.98rem, normal weight
- Description: 0.83rem, normal weight

### Spacing
- Gap between elements: 0.8rem
- Gap between cards: 0.85rem

### Colors
- Background: var(--glass)
- Border: var(--line)
- Text: var(--ink)
- Description: var(--ink-dim)

### Borders
- Width: 1px
- Color: var(--line)
- Radius: var(--card-radius) (18px)

### Shadow/Elevation
- Glass shadow: var(--glass-shadow)
- Glass inset: var(--glass-inset)
- Blur: var(--glass-blur)

### Iconography
- Family: Stroke-based icons
- Size: 24px × 24px (var(--icon-size))
- Color: Category accent color

### Alignment
- Items: center
- Justify: start

### Variants
None (single variant)

### States

**Default:**
- Background: var(--glass)
- Border: var(--line)
- Transform: none

**Hover:**
- Background: var(--glass-hover)
- Border: var(--line-strong)
- Transform: translateY(-2px)
- Duration: var(--dur-hover)
- Easing: var(--ease-hover)

**Focus:**
- Border: var(--line-strong)
- Outline: 2px solid rgba(224, 242, 254, 0.8)
- Outline-offset: 3px

**Active:**
- Transform: scale(0.9)
- Duration: immediate

**Selected:**
- Not used in current implementation

**Disabled:**
- Not used in current implementation

**Loading:**
- Not used in current implementation

**Error:**
- Not used in current implementation

### Responsive Behavior
- Below 560px: Description hidden
- Below 560px: Gap reduced to 0.65rem
- No other responsive changes

### Motion Behavior
- Hover: translateY(-2px), 300ms, ease-in-out
- Icon chip: scale(1.05) on hover
- Title: translateX(2px) on hover
- Arrow: translate(2px, -2px) on hover

---

## Icon Chip

### Purpose
Visual identifier for category accent on navigation cards.

### Structure
- Icon (centered)
- Background with category color

### Dimensions
- Width: 24px × 24px
- Height: 24px × 24px

### Typography
None (icon only)

### Spacing
None (standalone)

### Colors
- Background: var(--accent-soft) for category
- Icon: var(--accent) for category

### Borders
- None

### Shadow/Elevation
- None

### Iconography
- Family: Stroke-based icons
- Size: 16px × 16px
- Color: var(--accent) for category

### Alignment
- Centered

### Variants
- Categories: games (cyan), tools (purple), study (green), hacks (pink), guides (yellow)

### States

**Default:**
- Background: var(--accent-soft)
- Icon: var(--accent)

**Hover:**
- Not interactive (part of parent card)

**Focus:**
- Not interactive (part of parent card)

**Active:**
- Not interactive (part of parent card)

**Selected:**
- Not used

**Disabled:**
- Not used

**Loading:**
- Not used

**Error:**
- Not used

### Responsive Behavior
- None

### Motion Behavior
- Part of parent card hover: scale(1.05)

---

## Badge

### Purpose
Status indicator on navigation cards.

### Structure
- Pill-shaped background
- Text label

### Dimensions
- Height: 18px
- Width: Auto
- Padding: 0.2rem 0.4rem

### Typography
- Size: 0.65rem
- Weight: 600
- Transform: uppercase

### Spacing
- Positioned absolute

### Colors
- Background: var(--badge-1) or var(--badge-2)
- Text: var(--ink)

### Borders
- None

### Shadow/Elevation
- None

### Iconography
- None

### Alignment
- Top right of card

### Variants
- Badge 1: var(--badge-1) (#ff5a5f)
- Badge 2: var(--badge-2) (#d81f2a)

### States

**Default:**
- As defined

**Hover:**
- Not interactive (part of parent card)

**Focus:**
- Not interactive (part of parent card)

**Active:**
- Not interactive (part of parent card)

**Selected:**
- Not used

**Disabled:**
- Not used

**Loading:**
- Not used

**Error:**
- Not used

### Responsive Behavior
- None

### Motion Behavior
- None

---

## Button

### Purpose
Interactive element for actions.

### Structure
- Label text
- Optional icon

### Dimensions
- Height: Auto
- Padding: 0.4rem 0.8rem
- Radius: var(--r-pill) (999px)

### Typography
- Size: 0.85rem
- Weight: 500

### Spacing
- Gap between icon and text: 0.3rem

### Colors
- Background: var(--accent)
- Text: var(--ink)
- Hover: var(--accent-hover)

### Borders
- None (pill shape)

### Shadow/Elevation
- None

### Iconography
- Optional

### Alignment
- Center

### Variants
- Primary: Solid background
- Secondary: Not documented

### States

**Default:**
- Background: var(--accent)
- Text: var(--ink)

**Hover:**
- Background: var(--accent-hover)
- Transform: scale(0.9)
- Duration: var(--dur-hover)

**Focus:**
- Outline: 2px solid rgba(224, 242, 254, 0.8)
- Outline-offset: 3px

**Active:**
- Transform: scale(0.9)

**Selected:**
- Not used

**Disabled:**
- Not used

**Loading:**
- Not used

**Error:**
- Not used

### Responsive Behavior
- None

### Motion Behavior
- Hover: scale(0.9), 300ms
- Active: scale(0.9)

---

## Input

### Purpose
Text input for forms and search.

### Structure
- Input field
- Optional icon

### Dimensions
- Height: 36px
- Width: Auto
- Padding: 0.4rem 0.6rem
- Radius: var(--r-chip) (12px)

### Typography
- Size: 0.85rem
- Weight: normal

### Spacing
- Icon padding-left: 0.8rem

### Colors
- Background: var(--glass)
- Border: var(--line)
- Text: var(--ink)
- Placeholder: var(--ink-dim)

### Borders
- Width: 1px
- Color: var(--line)
- Radius: var(--r-chip) (12px)

### Shadow/Elevation
- Glass shadow: var(--glass-shadow)
- Glass inset: var(--glass-inset)
- Blur: var(--glass-blur)

### Iconography
- Optional search icon

### Alignment
- Left

### Variants
- Search field with icon
- Standard input

### States

**Default:**
- Border: var(--line)

**Focus:**
- Border: var(--line-strong)
- Outline: 2px solid rgba(224, 242, 254, 0.8)
- Outline-offset: 3px

**Hover:**
- Border: var(--line-strong)

**Active:**
- Not used

**Selected:**
- Not used

**Disabled:**
- Not used

**Loading:**
- Not used

**Error:**
- Not used

### Responsive Behavior
- None

### Motion Behavior
- Focus: border color change, 300ms

---

## State Relationships

### Navigation Card

```
Default
   ↓ Hover
   ↓ Focus
   ↓ Active
```

**Description:** Navigation card follows linear state progression from default to hover to focus to active.

### Icon Chip

```
Fixed (no states)
```

**Description:** Icon chip is not independently interactive; states are inherited from parent card.

### Badge

```
Fixed (no states)
```

**Description:** Badge is not interactive; displays status.

### Button

```
Default
   ↓ Hover
   ↓ Focus
   ↓ Active
```

**Description:** Button follows linear state progression.

### Input

```
Default
   ↓ Hover
   ↓ Focus
```

**Description:** Input follows linear state progression to focus.
