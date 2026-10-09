# Responsive Design Reference

This document details the actual responsive behavior of DUB5.

---

## Breakpoints

### Canonical Values

| Breakpoint | Pixel Value | Usage |
|------------|-------------|-------|
| Mobile | 560px | Hide card descriptions |
| Mobile | 600px | Single column grid (three-columns layout) |
| Mobile | 768px | Mobile breakpoint (reduced padding) |
| Tablet | 900px | Tablet breakpoint (2-column grid) |

### Usage Rules

- **Do not introduce new breakpoints** without documented reason
- **Use these exact values** for consistency
- **Test at each breakpoint** to ensure correct behavior

---

## Desktop (Above 900px)

### Layout

**Homepage:**
- Grid: auto-fill with minmax(340px, 1fr)
- Max-width: 1280px for grid
- Container: 1400px max-width
- Padding: 7.5rem 2rem 3rem

**Game pages:**
- Full game canvas
- Container: 960px max-width
- Padding: 3rem 1.5rem 4rem

**Navigation:**
- Horizontal scroll with hidden scrollbar
- Topbar padding: 0.95rem 1.5rem
- Link font: 0.86rem

### Typography

**Homepage title:** 8rem
**Game title:** 4.5rem
**Rating stars:** 1.9rem
**Body text:** Full size
**Buttons:** Full size

### Components

**Cards:**
- Full width with descriptions
- All spacing full value

**Buttons:**
- Standard padding

**Inputs:**
- Standard padding

---

## Tablet (768px - 900px)

### Layout

**Homepage:**
- Grid: 2 columns
- Container: same as desktop
- Padding: same as desktop

**Game pages:**
- No specific changes documented

**Navigation:**
- Same as desktop

### Typography

**Homepage title:** Intermediate size (not specified, likely 6rem)
**Body text:** No change
**Buttons:** No change

### Components

**Cards:**
- All spacing full value

**Buttons:**
- Standard padding

---

## Mobile (Below 768px)

### Layout

**Homepage:**
- Grid: 1 column
- Container: 6.5rem 1.25rem 2rem padding
- Max-width: 100%

**Game pages:**
- No specific changes
- Padding: 3rem 1.5rem 4rem (same as desktop)

**Navigation:**
- Horizontal scroll with reduced padding
- Topbar padding: 1.1rem horizontal
- Link font: 0.82rem

### Typography

**Homepage title:** 4.5rem (from 8rem)
**Rating stars:** 1.35rem (from 1.9rem)
**Body text:** No change
**Buttons:** No change

### Components

**Cards:**
- Hide description below 560px
- Compact: always hide description

**Buttons:**
- Full width on mobile

**Inputs:**
- Full width on mobile

**Panels:**
- 90% width on mobile

---

## Specific Responsive Rules

### Card Descriptions

**Hide below 560px:**
```css
@media (max-width: 560px) {
  .nav-button-desc {
    display: none;
  }
}
```

**Hide in compact layout:**
```css
.nav-grid.compact .nav-button-desc {
  display: none;
}
```

### Grid Columns

**Three-columns layout:**
```css
@media (max-width: 900px) {
  body[data-layout="three-columns"] .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  body[data-layout="three-columns"] .nav-grid {
    grid-template-columns: 1fr;
  }
}
```

**Default grid:**
```css
@media (max-width: 900px) {
  .nav-grid {
    grid-template-columns: 1fr;
  }
}
```

### Homepage Title

**Scale down on mobile:**
```css
@media (max-width: 768px) {
  .title-wrap {
    font-size: 4.5rem;
  }
}
```

### Container Padding

**Reduce on mobile:**
```css
@media (max-width: 768px) {
  .container {
    padding: 6.5rem 1.25rem 2rem;
  }
}
```

### Topbar Padding

**Reduce on mobile:**
```css
@media (max-width: 768px) {
  .topbar-inner {
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }
}
```

### Navigation Links

**Reduce on mobile:**
```css
@media (max-width: 768px) {
  .topbar-link {
    padding: 0.5rem 0.55rem;
    font-size: 0.82rem;
  }
}
```

---

## Touch Targets

### Buttons

**Minimum height:** 44px

**Implementation:**
```css
.game-btn {
  padding: 14px 28px; /* Results in >44px height */
}
```

### Links

**Adequate padding:**
```css
.topbar-link {
  padding: 0.5rem 0.85rem; /* Adequate touch target */
}
```

### Cards

**Full clickable area:**
- No minimum height requirement
- Entire card is clickable
- Padding provides adequate touch area

---

## Responsive Transformation Summary

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Homepage title | 8rem | ~6rem | 4.5rem |
| Grid columns | Auto-fill | 2 cols | 1 col |
| Container padding | 7.5rem 2rem 3rem | Same | 6.5rem 1.25rem 2rem |
| Topbar padding | 0.95rem 1.5rem | Same | 1.1rem horizontal |
| Link font | 0.86rem | Same | 0.82rem |
| Card descriptions | Visible | Visible | Hidden <560px |
| Button width | Auto | Auto | Full width |
| Input width | Auto | Auto | Full width |

---

## Responsive Implementation Guidelines

### When Implementing Responsive Behavior

1. **Use documented breakpoints**
   - Don't introduce new breakpoints
   - Use 560px, 600px, 768px, 900px

2. **Follow documented transformations**
   - Homepage title: 8rem → 4.5rem
   - Grid: auto-fill → 2 cols → 1 col
   - Padding: full → reduced

3. **Hide non-essential content**
   - Card descriptions below 560px
   - Don't hide essential content

4. **Ensure touch targets**
   - Minimum 44px height for buttons
   - Adequate padding for links

5. **Test on actual devices**
   - Mobile phone
   - Tablet
   - Desktop
   - Large desktop

### Mobile-First vs Desktop-First

**DUB5 uses desktop-first** with mobile overrides.

**If implementing mobile-first:**
- Start with mobile styles
- Add min-width media queries for tablet/desktop
- Ensure final result matches documented behavior

### Responsive Testing Checklist

- [ ] Grid layout correct at all breakpoints
- [ ] Typography scales correctly
- [ ] Padding changes at correct breakpoints
- [ ] Card descriptions hide at 560px
- [ ] Buttons full width on mobile
- [ ] Inputs full width on mobile
- [ ] Touch targets adequate on mobile
- [ ] Navigation usable on mobile
- [ ] No horizontal scroll on body
- [ ] Content remains accessible
