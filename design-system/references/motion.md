# Motion Reference

This document provides the complete DUB5 motion language specification.

---

## Overview

DUB5 motion is subtle, cinematic, and enhances the interface without distracting. The motion language is defined by specific durations, easing functions, and transforms.

---

## Durations

### Hover Duration

**Canonical value:** 300ms

**Usage:**
- All hover transitions
- Border-color changes
- Transform changes
- Background changes
- Color changes

**Applied to:**
- Navigation cards
- Buttons
- Links
- Inputs
- All interactive elements

**Implementation:**
```css
transition: border-color 300ms ease-in-out,
            transform 300ms ease-in-out,
            background 300ms ease-in-out;
```

### Enter/Load Duration

**Canonical value:** 550ms

**Usage:**
- Page load animations
- Card entry animations
- Fade-in effects
- Overlay appearances

**Easing:** cubic-bezier(0.22, 1, 0.36, 1) (spring-like)

**Implementation:**
```css
@keyframes card-in {
  from { opacity: 0; transform: translateY(9px); }
  to { opacity: 1; transform: translateY(0); }
}

.nav-button {
  animation: card-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}
```

### Topbar Scroll Duration

**Canonical value:** 420ms

**Usage:**
- Topbar background fade-in on scroll
- Topbar padding transition on scroll

**Easing:** cubic-bezier(0.4, 0, 0.2, 1)

**Implementation:**
```css
.topbar::before {
  transition: opacity 420ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Header Rule Duration

**Canonical value:** 1300ms

**Usage:**
- Header rule expansion animation
- scaleX transform from 0 to 1

**Easing:** cubic-bezier(0.22, 1, 0.36, 1)

**Implementation:**
```css
@keyframes rule-in {
  to { transform: scaleX(1); }
}

.header-rule {
  animation: rule-in 1300ms cubic-bezier(0.22, 1, 0.36, 1) 300ms forwards;
}
```

---

## Easing Functions

### Hover Easing

**Canonical value:** ease-in-out

**Usage:**
- All hover transitions
- Creates smooth, predictable motion

**Why:** ease-in-out provides a natural feel with gradual acceleration and deceleration.

### Enter Easing

**Canonical value:** cubic-bezier(0.22, 1, 0.36, 1)

**Usage:**
- All enter/load animations
- Creates spring-like, bouncy feel

**Why:** This cubic-bezier creates a spring effect that feels energetic and premium.

### Scroll Easing

**Canonical value:** cubic-bezier(0.4, 0, 0.2, 1)

**Usage:**
- Topbar scroll transitions
- Creates smooth, damped motion

**Why:** This easing feels natural for scroll-based transitions.

---

## Movement

### Hover Transforms

**Canonical transform:** translateY(-2px)

**Usage:**
- Navigation cards
- Buttons
- Back links
- All interactive cards

**Implementation:**
```css
.nav-button:hover {
  transform: translateY(-2px);
}
```

**Effect:** Subtle lift that creates depth without being distracting.

### Icon Chip Scale

**Canonical transform:** scale(1.05)

**Usage:**
- Icon chips on hover

**Implementation:**
```css
.icon-chip:hover {
  transform: scale(1.05);
}
```

**Effect:** Subtle growth that draws attention without being jarring.

### Card Title Movement

**Canonical transform:** translateX(2px)

**Usage:**
- Card titles on hover

**Implementation:**
```css
.nav-button:hover .nav-button-title {
  transform: translateX(2px);
}
```

**Effect:** Subtle shift that creates a sense of forward motion.

### Card Arrow Movement

**Canonical transform:** translate(2px, -2px)

**Usage:**
- Card arrows on hover

**Implementation:**
```css
.nav-button:hover .card-arrow {
  transform: translate(2px, -2px);
}
```

**Effect:** Diagonal movement that indicates direction.

### Active Scale

**Canonical transform:** scale(0.9)

**Usage:**
- Layout toggle button on active
- Some buttons on press

**Implementation:**
```css
.layout-btn:active {
  transform: scale(0.9);
}
```

**Effect:** Pressed-in feel that provides tactile feedback.

---

## Layout Transitions

### View Switch Thumb

**Canonical behavior:**
- Width transition with spring easing
- Transform (translateX) with spring easing
- Duration: 380ms (derived from ease-enter)

**Implementation:**
```css
.switch-thumb {
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
              width 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}
```

**Effect:** Smooth, spring-like movement that feels premium.

### Grid Layout

**Canonical behavior:**
- No layout transitions (instant)
- Grid changes happen immediately

**Why:** Layout transitions can be jarring and don't fit the DUB5 motion language.

---

## Hover

### Canonical Hover State

**Duration:** 300ms
**Easing:** ease-in-out
**Properties:**
- background-color
- border-color
- transform
- color (for text)

**Implementation:**
```css
.interactive-element {
  transition: background 300ms ease-in-out,
              border-color 300ms ease-in-out,
              transform 300ms ease-in-out,
              color 300ms ease-in-out;
}

.interactive-element:hover {
  background: var(--glass-hover);
  border-color: var(--line-strong);
  transform: translateY(-2px);
  color: #fff;
}
```

### Hover on Different Elements

**Navigation cards:**
- Background: var(--glass) → var(--glass-hover)
- Border: var(--line) → var(--line-strong)
- Transform: translateY(-2px)
- Icon chip: scale(1.05)
- Title: translateX(2px)
- Arrow: translate(2px, -2px), color #fff

**Buttons:**
- Background: var(--glass) → var(--glass-hover)
- Border: var(--line) → var(--line-strong)
- Transform: translateY(-2px)

**Links:**
- Color: var(--ink-dim) → #fff
- No background change
- No transform

**Inputs:**
- Border: var(--line) → var(--line-strong)
- Background: var(--glass) → var(--glass-hover)
- No transform

---

## Press

### Canonical Press State

**Transform:** translateY(0) (from -2px)
**Scale:** scale(0.9) (for some buttons)

**Implementation:**
```css
.button:active {
  transform: translateY(0);
}

.layout-btn:active {
  transform: scale(0.9);
}
```

**Effect:** Pressed-in feel that provides tactile feedback.

---

## Expansion/Collapse

**Not used in current implementation**

**If needed in future:**
- Use 300ms ease-in-out
- Apply to height or max-height
- Use opacity fade for content

---

## Overlays

### Game Overlay

**Canonical behavior:**
- Opacity fade
- Duration: 550ms
- Easing: cubic-bezier(0.22, 1, 0.36, 1)

**Implementation:**
```css
.game-overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 550ms cubic-bezier(0.22, 1, 0.36, 1);
}

.game-overlay.active {
  opacity: 1;
  pointer-events: auto;
}
```

**Effect:** Smooth fade-in that feels premium.

---

## Page Transitions

**Not used (single-page feel)**

**Smooth scroll:**
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 110px;
}
```

**Why:** DUB5 uses smooth scroll for navigation instead of page transitions.

---

## Shared Transitions

### All Hover States

**Canonical:**
- Duration: 300ms
- Easing: ease-in-out
- Properties: background, border-color, transform, color

**Applied to:**
- Cards
- Buttons
- Links
- Inputs
- All interactive elements

**Consistency:** All hover states use the same duration and easing for a cohesive feel.

---

## Loading Animation

### Fade-In

**Canonical keyframe:**
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Usage:**
- Page content fade-in
- Text fade-in
- Staggered animations with delays

**Implementation:**
```css
.header .subline {
  opacity: 0;
  animation: fade-in 700ms ease-out 340ms forwards;
}
```

### Card-In

**Canonical keyframe:**
```css
@keyframes card-in {
  from { opacity: 0; transform: translateY(9px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Usage:**
- Navigation cards
- Staggered entry with animation-delay

**Implementation:**
```css
.nav-button {
  animation: card-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i, 0) * 20ms);
}
```

---

## Reduced-Motion Behavior

### Canonical Implementation

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto;
  }
}
```

**Effect:**
- Disables all animations
- Disables all transitions
- Disables smooth scroll
- Respects user preference

**When to apply:**
- Always include in global styles
- Check with matchMedia in JavaScript for canvas animations

**JavaScript example:**
```javascript
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  // Disable canvas animation
  draw(performance.now());
  rafId = null;
  return;
}
```

---

## Motion That Should NOT Be Introduced

### Prohibited Animations

- **Bouncing animations** — Too distracting
- **Rotating animations** — Not consistent with DUB5 aesthetic
- **Shaking/wobbling** — Unprofessional
- **Dramatic scale changes** — Too jarring
- **Particle effects** (except starfield) — Overwhelming
- **Parallax** (except starfield) — Distracting
- **Complex keyframe animations** — Beyond current set
- **Elastic/bouncy easing** (except enter animations) — Inconsistent
- **Scroll jacking** — Poor UX
- **Page transition effects** — Not needed

### When to Avoid Motion

- **On sensitive content** — Keep it stable
- **On forms** — Don't distract from input
- **On error states** — Keep it clear
- **On loading states** — Keep it subtle
- **On accessibility-critical elements** — Ensure clarity

### Motion Budget

- **Total concurrent animations:** Keep to minimum
- **Duration limit:** 1300ms maximum (header rule)
- **Complexity limit:** Simple transforms only
- **Performance limit:** 60fps minimum

---

## Starfield Animation

### Overview

The starfield is a canvas-based animation that provides the signature DUB5 background effect.

### Characteristics

**Star properties:**
- 4 size buckets: [1.8, 3.2, 6.4, 11] pixels
- 4 color tints: white, light blue, warm white, blue-white
- Depth-based parallax (0.25 to 1.0)
- Twinkle effect with sine wave
- Mouse-responsive parallax movement

**Shooting stars:**
- Random spawn every 7-19 seconds
- Speed: 380-700 pixels/second
- Diagonal trajectory
- Fade-out tail gradient
- Cross flare on largest stars

**Performance:**
- Uses sprite caching for efficiency
- Respects `prefers-reduced-motion`
- Pauses when tab is hidden
- Limits max density to 1500 stars

### Implementation Reference

**Location:** `research/starfield.js` or `index.html` (lines 1228-1486)

**Key functions:**
- `build()` — Initializes star field
- `draw()` — Renders each frame
- `loop()` — Animation loop
- `start()` — Starts animation
- `stop()` — Stops animation
- `getSprite()` — Caches star sprites
- `getFlare()` — Creates cross flare
- `spawnShooting()` — Creates shooting star

### Canvas Setup

```javascript
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d', { alpha: true });
const dpr = Math.min(window.devicePixelRatio || 1, 2);

canvas.width = Math.floor(W * dpr);
canvas.height = Math.floor(H * dpr);
canvas.style.width = W + 'px';
canvas.style.height = H + 'px';
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
```

### Star Generation

```javascript
const density = Math.round((W * H) / 1500);
const count = Math.min(1500, Math.max(420, density));

stars = [];
for (let i = 0; i < count; i++) {
  const roll = Math.random();
  let bucket = 0;
  if (roll > 0.9955) bucket = 3;
  else if (roll > 0.972) bucket = 2;
  else if (roll > 0.85) bucket = 1;

  stars.push({
    x: Math.random() * W,
    y: Math.random() * H,
    depth: 0.25 + Math.random() * 0.75,
    bucket: bucket,
    tint: [0, 0, 0, 1, 3, 2][Math.floor(Math.random() * 6)],
    base: 0.28 + Math.random() * 0.62,
    speed: 0.35 + Math.random() * 1.5,
    phase: Math.random() * Math.PI * 2,
    angle: Math.random() * Math.PI,
    hasFlare: bucket === 3
  });
}
```

### Animation Loop

```javascript
function loop(now) {
  draw(now);
  rafId = requestAnimationFrame(loop);
}
```

### Reduced Motion Support

```javascript
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  draw(performance.now());
  rafId = null;
  return;
}
```

### Visibility Handling

```javascript
document.addEventListener('visibilitychange', function () {
  if (reduceMotion) return;
  if (document.hidden) stop();
  else start();
});
```

---

## Logo Animation

### Overview

The brand mark uses a canvas-based animation with the same starfield rendering system.

### Characteristics

**Display size:** 18px × 18px
**Canvas size:** 72px × 72px (4x scale for sharpness)
**Animation:** Same as starfield (twinkling, parallax)

### Implementation

```html
<div class="brand-mark">
  <canvas class="brand-canvas"></canvas>
</div>
```

The brand canvas is animated using the same starfield engine, creating a subtle twinkling effect that matches the background.

---

## Motion Summary

### Key Values

| Property | Value | Usage |
|----------|-------|-------|
| Hover duration | 300ms | All hover transitions |
| Enter duration | 550ms | Load animations |
| Scroll duration | 420ms | Topbar scroll |
| Rule duration | 1300ms | Header rule |
| Hover easing | ease-in-out | All hover |
| Enter easing | cubic-bezier(0.22, 1, 0.36, 1) | Load animations |
| Scroll easing | cubic-bezier(0.4, 0, 0.2, 1) | Topbar scroll |
| Hover transform | translateY(-2px) | Cards, buttons |
| Icon scale | scale(1.05) | Icon chips |
| Title move | translateX(2px) | Card titles |
| Arrow move | translate(2px, -2px) | Card arrows |
| Active scale | scale(0.9) | Button press |

### Principles

1. **Subtle** — Motion enhances, doesn't distract
2. **Consistent** — Same durations and easing throughout
3. **Cinematic** — Spring-like easing feels premium
4. **Respectful** — Honors reduced-motion preference
5. **Purposeful** — Every animation has a reason

### Prohibited

- Bouncing, rotating, shaking
- Dramatic scale changes
- Particle effects (except starfield)
- Parallax (except starfield)
- Complex keyframes beyond current set
- Scroll jacking
- Page transition effects

---

## Implementation Checklist

When implementing motion in DUB5:

- [ ] Use 300ms for hover transitions
- [ ] Use ease-in-out for hover easing
- [ ] Use 550ms for enter animations
- [ ] Use cubic-bezier(0.22, 1, 0.36, 1) for enter easing
- [ ] Use translateY(-2px) for hover lift
- [ ] Apply focus-visible outline (not motion, but related)
- [ ] Respect prefers-reduced-motion
- [ ] Don't introduce prohibited animations
- [ ] Keep motion subtle
- [ ] Test performance (60fps minimum)
