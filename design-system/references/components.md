# Components Reference

This document provides in-depth details for recurring DUB5 components.

---

## Navigation Card

### Purpose
Primary navigation element that links to content sections and groups related content.

### Structure
```html
<a class="nav-button" data-cat="category" href="/path">
  <span class="nav-button-glow"></span>
  <span class="icon-chip">{icon}</span>
  <span class="nav-button-title">Title</span>
  <span class="nav-button-desc">Description</span>
  <span class="badge">New</span>
  <span class="card-arrow">{arrow}</span>
</a>
```

### Complete CSS
```css
.nav-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.68rem 1.15rem 0.68rem 0.68rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--glass-inset), var(--glass-shadow);
  text-decoration: none;
  color: inherit;
  transition: border-color 300ms ease-in-out,
              transform 300ms ease-in-out,
              background 300ms ease-in-out;
}

.nav-button:hover {
  border-color: var(--line-strong);
  transform: translateY(-2px);
  background: var(--glass-hover);
}

.nav-button:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}

.nav-button-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  pointer-events: none;
}

.nav-button:hover .nav-button-glow {
  opacity: 1;
}

.icon-chip {
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: var(--accent, #9ec5ff);
  background: var(--accent-soft, rgba(158, 197, 255, 0.13));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.13);
  transition: transform 0.3s ease;
}

.nav-button:hover .icon-chip {
  transform: scale(1.05);
}

.icon-chip svg {
  width: 20px;
  height: 20px;
}

.nav-button-title {
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.95);
  transition: transform 0.3s ease;
}

.nav-button:hover .nav-button-title {
  transform: translateX(2px);
}

.nav-button-desc {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-width: 0;
  font-size: 0.83rem;
  color: var(--ink-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge {
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 0.22rem 0.5rem;
  border-radius: 7px;
  color: #fff;
  background: linear-gradient(180deg, #ff5a5f 0%, #d81f2a 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22),
              0 6px 18px -8px rgba(216, 31, 42, 0.95);
}

.card-arrow {
  position: relative;
  z-index: 2;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  margin-left: auto;
  color: var(--ink-dim);
  transition: transform 0.3s ease, color 0.3s ease;
}

.nav-button:hover .card-arrow {
  transform: translate(2px, -2px);
  color: #fff;
}

/* Category colors */
[data-cat="games"] { --accent: #4cc9f0; --accent-soft: rgba(76, 201, 240, 0.13); }
[data-cat="tools"] { --accent: #a78bfa; --accent-soft: rgba(167, 139, 250, 0.13); }
[data-cat="study"] { --accent: #34d399; --accent-soft: rgba(52, 211, 153, 0.13); }
[data-cat="hacks"] { --accent: #fb7185; --accent-soft: rgba(251, 113, 133, 0.13); }
[data-cat="guides"] { --accent: #fbbf24; --accent-soft: rgba(251, 191, 36, 0.13); }
```

### States

**Hover:**
- Background: var(--glass-hover)
- Border: var(--line-strong)
- Transform: translateY(-2px)
- Icon chip: scale(1.05)
- Title: translateX(2px)
- Arrow: translate(2px, -2px), color #fff
- Glow: opacity 1

**Focus:**
- Outline: 2px solid rgba(224, 242, 254, 0.8)
- Outline offset: 3px

**Active/Selected:**
- Not used (links are always active)

**Disabled:**
- Not used

### Responsive

**Below 560px:**
- Hide description

**Below 900px:**
- Single column grid

**Compact layout:**
- Always hide description

### Category Color Application

The card uses CSS custom properties for category colors:

```css
[data-cat="games"] { --accent: #4cc9f0; --accent-soft: rgba(76, 201, 240, 0.13); }
```

The icon chip uses these properties:
```css
color: var(--accent, #9ec5ff);
background: var(--accent-soft, rgba(158, 197, 255, 0.13));
```

### Mouse Glow Effect

The nav-button-glow creates a radial gradient that follows the mouse:

```javascript
button.addEventListener('mousemove', function (e) {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  glow.style.background =
    'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.16) 0%, transparent 60%)';
});

button.addEventListener('mouseleave', function () {
  glow.style.background = '';
});
```

---

## Button

### Purpose
Primary action button with glassmorphism styling.

### Variants

**Primary (game context):**
- Background: var(--accent-games)
- Text: var(--bg-3)
- Border: same as background

**Secondary:**
- Background: var(--glass)
- Text: var(--ink)
- Border: var(--line)

### Complete CSS
```css
.game-btn {
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 14px 28px;
  color: var(--ink);
  font-size: 0.86rem;
  font-weight: 600;
  box-shadow: var(--glass-inset), var(--glass-shadow);
  transition: background 300ms ease-in-out,
              border-color 300ms ease-in-out,
              transform 300ms ease-in-out;
  cursor: pointer;
  width: 100%;
}

.game-btn:hover {
  background: var(--glass-hover);
  border-color: var(--line-strong);
  transform: translateY(-2px);
}

.game-btn:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}

.game-btn:active {
  transform: translateY(0);
}

.game-btn.primary {
  background: var(--accent-games);
  color: var(--bg-3);
  border-color: var(--accent-games);
}

.game-btn.primary:hover {
  filter: brightness(1.1);
}
```

### States

**Hover:**
- Background: var(--glass-hover) or brightness(1.1) for primary
- Border: var(--line-strong)
- Transform: translateY(-2px)

**Active:**
- Transform: translateY(0)

**Focus:**
- Outline: 2px solid rgba(224, 242, 254, 0.8)
- Outline offset: 3px

**Disabled:**
- Not used

### Responsive

**Mobile:**
- Full width

---

## Input

### Purpose
Text input for search and filtering.

### Complete CSS
```css
.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  color: var(--ink);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 300ms ease-in-out,
              background 300ms ease-in-out;
}

.search-input::placeholder {
  color: var(--ink-dim);
}

.search-input:focus {
  border-color: var(--line-strong);
  background: var(--glass-hover);
}
```

### States

**Hover:**
- Border: var(--line-strong)
- Background: var(--glass-hover)

**Focus:**
- Border: var(--line-strong)
- Background: var(--glass-hover)
- Outline: none (custom focus style)

**Disabled:**
- Not used

### Responsive

**Mobile:**
- Full width

---

## Select

### Purpose
Dropdown for filtering and selection.

### Complete CSS
```css
.filter-select {
  padding: 0.75rem 1rem;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  color: var(--ink);
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: border-color 300ms ease-in-out,
              background 300ms ease-in-out;
}

.filter-select:focus {
  border-color: var(--line-strong);
  background: var(--glass-hover);
}

.filter-select option {
  background: #050833;
  color: var(--ink);
}
```

### States

**Hover:**
- Border: var(--line-strong)
- Background: var(--glass-hover)

**Focus:**
- Border: var(--line-strong)
- Background: var(--glass-hover)
- Outline: none

**Disabled:**
- Not used

### Responsive

**Mobile:**
- Full width

---

## Badge

### Purpose
Status indicator ("New", "Updated", etc.).

### Complete CSS
```css
.badge {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 0.22rem 0.5rem;
  border-radius: 7px;
  color: #fff;
  background: linear-gradient(180deg, #ff5a5f 0%, #d81f2a 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22),
              0 6px 18px -8px rgba(216, 31, 42, 0.95);
}
```

### States

**Static only** — No hover, focus, or active states

### Variants

Could be extended with different gradient colors for different states, but not used in current implementation.

---

## Overlay Panel

### Purpose
Modal/overlay dialog for game overlays and other centered content.

### Complete CSS
```css
.overlay-panel {
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 32px 40px;
  max-width: 400px;
  width: 90%;
  box-shadow: var(--glass-inset), var(--glass-shadow);
  text-align: center;
}

.overlay-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 12px;
}

.overlay-body {
  font-size: 1rem;
  color: var(--ink-dim);
  margin-bottom: 24px;
  line-height: 1.5;
}

.overlay-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

### States

**Static only** — No interactive states on the panel itself

### Animation

**Fade-in:**
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

### Responsive

**Mobile:**
- 90% width

---

## Back Link

### Purpose
Fixed navigation link to return to previous page.

### Complete CSS
```css
.back-link-fixed {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--glass-inset), var(--glass-shadow);
  color: var(--ink-dim);
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 300ms ease-in-out,
              border-color 300ms ease-in-out,
              transform 300ms ease-in-out,
              background 300ms ease-in-out;
}

.back-link-fixed:hover {
  color: #fff;
  border-color: var(--line-strong);
  transform: translateY(-2px);
  background: var(--glass-hover);
}

.back-link-fixed:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}

.back-link-fixed svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
```

### States

**Hover:**
- Color: #fff
- Border: var(--line-strong)
- Transform: translateY(-2px)
- Background: var(--glass-hover)

**Focus:**
- Outline: 2px solid rgba(224, 242, 254, 0.8)
- Outline offset: 3px

### Responsive

**Always fixed** at top-left

---

## Component Summary

| Component | Radius | Padding | States | Responsive |
|-----------|--------|---------|--------|------------|
| Navigation Card | 999px | 0.68rem 1.15rem | Hover, Focus | Hide desc < 560px |
| Button | 999px | 14px 28px | Hover, Active, Focus | Full width mobile |
| Input | 18px | 0.75rem 1rem | Hover, Focus | Full width mobile |
| Select | 18px | 0.75rem 1rem | Hover, Focus | Full width mobile |
| Badge | 7px | 0.22rem 0.5rem | None | N/A |
| Overlay Panel | 18px | 32px 40px | None | 90% width mobile |
| Back Link | 999px | 0.5rem 1rem | Hover, Focus | Fixed position |

---

## Component Patterns

### Glassmorphism Pattern

All interactive components use this pattern:

```css
background: var(--glass);
backdrop-filter: var(--glass-blur);
box-shadow: var(--glass-inset), var(--glass-shadow);
border: 1px solid var(--line);
```

### Hover Pattern

All interactive components use this pattern:

```css
transition: border-color 300ms ease-in-out,
            transform 300ms ease-in-out,
            background 300ms ease-in-out;
}

:hover {
  border-color: var(--line-strong);
  transform: translateY(-2px);
  background: var(--glass-hover);
}
```

### Focus Pattern

All interactive components use this pattern:

```css
:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}
```

### Radius Pattern

- Primary interactive (cards, buttons, links): 999px
- Containers (panels, overlays): 18px
- Small elements (icon chips): 12px
- Status indicators (badges): 7px
