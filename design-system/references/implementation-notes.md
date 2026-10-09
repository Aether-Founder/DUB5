# Implementation Notes

This document provides evidence from the existing DUB5 codebase that supports the design rules documented in DESIGN.md.

---

## File Locations

### Global CSS

**css/tokens.css**
- Contains all CSS custom properties
- Source of truth for design tokens
- Lines 1-50

**css/base.css**
- Reset and base styles
- Background gradient
- Starfield canvas
- Typography base
- Lines 1-86

**css/cards.css**
- Navigation card styles
- Icon chip styles
- Badge styles
- Section pill styles
- Lines 1-186

**css/game.css**
- Game container styles
- HUD styles
- Overlay panel styles
- Game button styles
- Lines 1-233

### Homepage

**index.html**
- Main page layout (lines 18-1490)
- Topbar styles (lines 85-214)
- Header and title (lines 228-313)
- View switch (lines 316-373)
- Grid and cards (lines 376-511)
- Layout variations (lines 519-599)
- Sections (lines 602-627)
- Footer (lines 631-643)
- Animations (lines 646-679)
- Responsive (lines 681-699)
- JavaScript (lines 1000-1486)
- Starfield animation (lines 1228-1486)

### Game Pages

**games/snake/index.html**
- Game page layout (lines 11-150)
- Back link styles (lines 90-130)
- Game header (lines 79-150)

**games/minesweeper/index.html**
- Similar structure to snake
- Game-specific number palette

### Research Pages

**research/index.html**
- Research hub page (lines 1-335)
- Filters and search
- Card grid

**research/post.html**
- Research post detail page (lines 1-381)
- Content wrapper with sidebar

**research/research.js**
- JavaScript for research hub
- Data loading and rendering

**research/post.js**
- JavaScript for post detail
- Content rendering

**research/starfield.js**
- Starfield animation (standalone file)
- Lines 1-275

---

## Design Token Evidence

### Colors

**css/tokens.css lines 2-21:**
```css
:root {
  /* ---- surface ---- */
  --bg-1: #0b1150;
  --bg-2: #050833;
  --bg-3: #01030f;

  /* ---- glass ---- */
  --glass: rgba(9, 13, 38, 0.62);
  --glass-hover: rgba(13, 19, 50, 0.72);
  --glass-blur: blur(16px) saturate(160%);
  --glass-inset: inset 0 1px 0 rgba(255, 255, 255, 0.09);
  --glass-shadow: 0 18px 40px -26px rgba(0, 0, 0, 1);

  /* ---- lines ---- */
  --line: rgba(224, 242, 254, 0.16);
  --line-strong: rgba(224, 242, 254, 0.30);

  /* ---- ink ---- */
  --ink: rgb(226, 240, 255);
  --ink-dim: rgba(226, 240, 255, 0.60);
  --ink-faint: rgba(226, 240, 255, 0.38);

  /* ---- category accents ---- */
  --accent-games: #4cc9f0;
  --accent-tools: #a78bfa;
  --accent-study: #34d399;
  --accent-hacks: #fb7185;
  --accent-guides: #fbbf24;

  /* ---- status ---- */
  --badge-1: #ff5a5f;
  --badge-2: #d81f2a;

  /* ---- radius ---- */
  --r-pill: 999px;
  --r-panel: 18px;
  --r-chip: 12px;
  --r-badge: 7px;

  /* ---- motion ---- */
  --dur-hover: 300ms;
  --ease-hover: ease-in-out;
  --dur-enter: 550ms;
  --ease-enter: cubic-bezier(0.22, 1, 0.36, 1);

  /* ---- type ---- */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI',
              Roboto, Helvetica, Arial, sans-serif;
}
```

### Typography

**index.html lines 10:**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

**index.html lines 234-252 (title):**
```css
.title-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.28em;
  font-size: 8rem;
  line-height: 1;
  font-family: 'DM Serif Display', serif;
}

.title-wrap h1 {
  font-size: 1em;
  line-height: 1;
  font-weight: normal;
  color: #fff;
  letter-spacing: 0.01em;
  text-shadow: 0 0 60px rgba(120, 170, 255, 0.28);
}
```

### Spacing

**index.html lines 218-226 (container):**
```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 7.5rem 2rem 3rem;
  position: relative;
  z-index: 10;
  flex: 1 1 auto;
  width: 100%;
}
```

**index.html lines 377-383 (grid):**
```css
.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 0.85rem;
  max-width: 1280px;
  margin: 0 auto;
}
```

**index.html lines 605-606 (sections):**
```css
.cat-section { scroll-margin-top: 110px; }
.cat-section + .cat-section { margin-top: 3rem; }
```

### Geometry

**index.html lines 389-408 (card):**
```css
.nav-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.68rem 1.15rem 0.68rem 0.68rem;
  border-radius: var(--card-radius);
  border: 1px solid var(--line);
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: var(--glass-inset), var(--glass-shadow);
}
```

### Motion

**index.html lines 648-655 (animations):**
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes card-in {
  from { opacity: 0; transform: translateY(9px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Responsive

**index.html lines 681-683 (mobile grid):**
```css
@media (max-width: 900px) {
  .nav-grid { grid-template-columns: 1fr; }
}
```

**index.html lines 685-694 (mobile typography):**
```css
@media (max-width: 768px) {
  .title-wrap { font-size: 4.5rem; }
  .rating-stars { font-size: 1.35rem; }
  .container { padding: 6.5rem 1.25rem 2rem; }
  .topbar-inner {
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }
  .topbar-link { padding: 0.5rem 0.55rem; font-size: 0.82rem; }
}
```

**index.html lines 696-698 (hide descriptions):**
```css
@media (max-width: 560px) {
  .nav-button-desc { display: none; }
  .nav-button { gap: 0.65rem; }
}
```

---

## Component Evidence

### Navigation Card

**index.html lines 389-408**
**css/cards.css lines 2-18**

### Icon Chip

**index.html lines 430-445**
**css/cards.css lines 31-49**

### Badge

**index.html lines 481-496**
**css/cards.css lines 108-122**

### Button

**css/game.css lines 107-137**

### Input

**research/index.html lines 324-353**

### Overlay Panel

**css/game.css lines 73-83**

---

## Background Evidence

### Gradient

**index.html line 48:**
```css
background: radial-gradient(140% 100% at 50% -10%, #0b1150 0%, #050833 42%, #01030f 100%);
```

### Nebula Gradients

**index.html lines 59-70:**
```css
body::before {
  content: "";
  position: fixed;
  inset: -15%;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(42% 34% at 16% 10%, rgba(70, 110, 255, 0.20), transparent 68%),
    radial-gradient(38% 30% at 86% 16%, rgba(150, 80, 255, 0.15), transparent 66%),
    radial-gradient(58% 42% at 52% 108%, rgba(0, 130, 230, 0.18), transparent 72%);
  filter: blur(26px);
}
```

### Starfield Canvas

**index.html lines 72-80**
**research/starfield.js (complete file)**

---

## Starfield Animation Evidence

### Implementation

**index.html lines 1228-1486**
**research/starfield.js lines 1-275**

### Key Properties

**Star tints (lines 1235-1240):**
```javascript
const TINTS = [
  [255, 255, 255],
  [205, 222, 255],
  [255, 236, 214],
  [186, 205, 255]
];
```

**Base sizes (line 1242):**
```javascript
const BASE_SIZE = [1.8, 3.2, 6.4, 11];
```

**Sprite generation (lines 1255-1289)**
**Shooting star (lines 1351-1362)**
**Animation loop (lines 1441-1444)**
**Reduced motion (lines 1446-1455)**

---

## Logo Animation Evidence

### Brand Mark

**index.html lines 135-152:**
```html
.brand-mark {
  position: relative;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
}

.brand-canvas {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 72px;
  height: 72px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: block;
}
```

**Animation:** Uses same starfield engine

---

## Font Loading Evidence

**index.html lines 8-10:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

---

## Category Color Evidence

**index.html lines 513-517:**
```css
[data-cat="games"]  { --accent: #4cc9f0; --accent-soft: rgba(76, 201, 240, 0.13); }
[data-cat="tools"]  { --accent: #a78bfa; --accent-soft: rgba(167, 139, 250, 0.13); }
[data-cat="study"]  { --accent: #34d399; --accent-soft: rgba(52, 211, 153, 0.13); }
[data-cat="hacks"]  { --accent: #fb7185; --accent-soft: rgba(251, 113, 133, 0.13); }
[data-cat="guides"] { --accent: #fbbf24; --accent-soft: rgba(251, 191, 36, 0.13); }
```

---

## State Evidence

### Hover

**index.html lines 409-414:**
```css
.nav-button:hover,
.nav-button:focus-visible {
  border-color: var(--line-strong);
  transform: translateY(-2px);
  background: var(--glass-hover);
}
```

### Focus

**index.html lines 415-418:**
```css
.nav-button:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}
```

### Active

**index.html line 208:**
```css
.layout-btn:active { transform: scale(0.9); }
```

---

## Accessibility Evidence

### Reduced Motion

**index.html lines 657-679:**
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .title-wrap h1,
  .rating-stars,
  .header .subline,
  .nav-button,
  .header-rule {
    animation: none !important;
    opacity: 1;
    transform: none;
  }
  .header-rule { transform: scaleX(1); }
  .nav-button,
  .nav-button-title,
  .card-arrow,
  .icon-chip,
  .switch-thumb,
  .topbar::before,
  .topbar-inner,
  .topbar-link {
    transition: none !important;
  }
}
```

### JavaScript Reduced Motion

**research/starfield.js lines 7, 238-242:**
```javascript
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  draw(performance.now());
  rafId = null;
  return;
}
```

---

## Server Configuration

### server.js

**Port:** 5090 (temporarily changed from 5088)
**API routes:** /api/research, /api/research/:slug
**Page routes:** /research, /research/:slug
**Static serving:** express.static(__dirname)

---

## Content Structure

### Research Content

**content/research/index.json**
- Research index with taxonomies and posts

**content/research/posts/**
- Individual research post JSON files
- magister-architecture.json
- schoolyear-lockdown.json
- kwizl-exams.json

---

## Summary

This document provides specific file locations and line numbers that serve as evidence for the design rules documented in DESIGN.md. When in doubt about a design rule, refer to the original implementation in these files.
