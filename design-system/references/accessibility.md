# Accessibility Reference

This document details accessibility conventions in DUB5.

---

## Focus Visibility

### Canonical Implementation

```css
:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}
```

### Applied To

All interactive elements:
- Navigation cards
- Buttons
- Links
- Inputs
- Selects
- Icon buttons

### Why :focus-visible Instead of :focus

- `:focus-visible` only shows outline for keyboard navigation
- `:focus` would show outline for mouse clicks too
- Respects user preference for visual feedback

### Implementation

```css
.nav-button:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}

.game-btn:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}

.search-input:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}
```

---

## Contrast

### Color Contrast Ratios

**Primary text on dark backgrounds:**
- var(--ink) on var(--glass): ~14:1 (WCAG AAA)
- var(--ink) on background gradient: ~15:1 (WCAG AAA)

**Secondary text:**
- var(--ink-dim) on var(--glass): ~7:1 (WCAG AA)
- var(--ink-dim) on background gradient: ~8:1 (WCAG AA)

**Accent colors:**
- All category accents on dark backgrounds: WCAG AA compliant
- White text on accent backgrounds: WCAG AAA compliant

### Guidelines

- **Never use low contrast for important text**
- **Always maintain WCAG AA contrast ratios**
- **Test with contrast checker if uncertain**
- **Consider color blindness when choosing colors**

---

## Touch Targets

### Minimum Sizes

**Buttons:**
- Minimum height: 44px
- Implementation: 14px 28px padding results in >44px

**Links:**
- Minimum: 44px × 44px recommended
- Implementation: 0.5rem 0.85rem padding provides adequate target

**Cards:**
- No minimum height requirement
- Entire card is clickable
- Padding provides adequate touch area

### Guidelines

- **Ensure buttons are at least 44px tall**
- **Provide adequate padding for links**
- **Don't make touch targets too small**
- **Test on actual mobile devices**

---

## Keyboard Navigation

### Tab Order

**Logical tab order:**
1. Topbar navigation links
2. Layout toggle button
3. Main content (cards, buttons, inputs)
4. Footer links

### Skip Links

**Not currently implemented**

**Could be added:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--glass);
  padding: 8px 16px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Keyboard Shortcuts

**Documented shortcut:**
- `C` key (without modifiers): Toggle view (all/sections)

**Implementation:**
```javascript
document.addEventListener('keydown', function (e) {
  if (e.key !== 'c' && e.key !== 'C') return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  const t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

  setView(currentView === 'all' ? 'sections' : 'all');
});
```

---

## Non-Color State Communication

### Principle

**Never rely on color alone** to communicate state.

### Implementation

**Hover state uses multiple indicators:**
- Background color change
- Border color change
- Transform (translateY)
- Icon scale/movement

**Example:**
```css
.nav-button:hover {
  background: var(--glass-hover);    /* Color */
  border-color: var(--line-strong);   /* Border */
  transform: translateY(-2px);      /* Transform */
}
```

**Focus state uses:**
- Outline (visual)
- No color-only focus indicator

**Error state (if implemented):**
- Color (red/pink)
- Icon (warning icon)
- Text (error message)
- Border (red border)

---

## Text Readability

### Font Sizes

**Minimum body text:** 0.83rem (13.28px)

**Recommended minimum:** 1rem (16px) for body content

**DUB5 sizes:**
- Card description: 0.83rem (minimum acceptable)
- Body text: 1rem (recommended)
- Navigation: 0.86rem (small but acceptable)

### Line Heights

**Body text:** 1.5
**Headings:** 1.2
**Navigation:** normal

### Font Families

**Display font:** DM Serif Display (for headings only)
**UI font:** System font stack (for body text)

**Why system fonts:**
- Native feel on each platform
- Optimized for readability
- No additional load time

### Letter Spacing

**Uppercase text:** 0.09em (badges), 0.08em (labels)
**Normal text:** 0.01em - 0.02em (headings)
**No letter-spacing:** body text

---

## Disabled States

### Not Currently Used

**Could be implemented as:**

```css
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Guidelines

- **Reduce opacity to 0.5**
- **Remove hover effects**
- **Show not-allowed cursor**
- **Maintain readable text**

---

## Error Communication

### Not Currently Used

**Could be implemented as:**

**Visual:**
- Red/pink border (var(--accent-hacks))
- Error icon
- Error message below input

**Implementation:**
```css
.input-error {
  border-color: var(--accent-hacks);
}

.error-message {
  color: var(--accent-hacks);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
```

---

## Screen Reader Support

### ARIA Labels

**Not extensively used in current implementation**

**Could be added:**
```html
<button aria-label="Toggle layout between 4 columns and 3 columns">
  <svg>...</svg>
</button>
```

**Role attributes:**
```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/games">Games</a></li>
  </ul>
</nav>
```

### Alt Text

**Images:**
- Not used in current implementation

**If added:**
- Always provide descriptive alt text
- Use empty alt for decorative images

---

## Reduced Motion

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

### JavaScript Support

```javascript
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  // Disable canvas animation
  draw(performance.now());
  rafId = null;
  return;
}
```

### Canvas Animation

**Starfield respects reduced motion:**
- Disables animation loop
- Renders static frame once
- Pauses when tab hidden

---

## Accessibility Checklist

Before considering implementation complete:

- [ ] Focus-visible outline on all interactive elements
- [ ] Contrast ratios meet WCAG AA (4.5:1 for normal text)
- [ ] Touch targets at least 44px height for buttons
- [ ] Adequate padding for links
- [ ] States communicate without color alone
- [ ] Keyboard navigation works logically
- [ ] Reduced motion is respected
- [ ] Text is readable (font size, line height)
- [ ] Font families are legible
- [ ] Forms have labels (when implemented)
- [ ] Error states are clear (when implemented)
- [ ] Screen reader support (ARIA labels, roles)
