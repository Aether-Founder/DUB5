# Patterns Reference

This document documents reusable UI patterns in DUB5.

---

## Page Composition Patterns

### Hub/Landing Page Pattern

**Structure:**
1. Fixed topbar (transparent → opaque on scroll)
2. Large centered title (8rem DM Serif Display)
3. Rating stars below title
4. Subline description
5. Animated gradient rule
6. View switch (pill toggle)
7. Category sections with card grids
8. Footer at bottom

**Container:**
```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 7.5rem 2rem 3rem;
}
```

**Content Hierarchy:**
- Title: primary (8rem)
- Subtitle: secondary
- Section headers: tertiary
- Cards: quaternary

### Content Detail Page Pattern

**Structure:**
1. Fixed back link (top-left)
2. Page header (left-aligned, 4.5rem title)
3. Main content (centered or left-aligned)
4. Footer at bottom

**Container:**
```css
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}
```

**Content Hierarchy:**
- Title: primary (4.5rem)
- Subtitle: secondary
- Section headings: tertiary
- Body content: quaternary

---

## Content Hierarchy

### Visual Hierarchy Levels

**Level 1 (Primary):**
- Homepage title: 8rem
- DM Serif Display
- Text glow
- Highest contrast

**Level 2 (Secondary):**
- Game page title: 4.5rem
- Overlay title: 2.5rem
- DM Serif Display
- High contrast

**Level 3 (Tertiary):**
- Section headings: 1.1rem
- System UI, font-weight 600
- var(--ink)

**Level 4 (Quaternary):**
- Card titles: 0.98rem
- Body text: 1rem
- System UI
- var(--ink) or var(--ink-dim)

**Level 5 (Quinary):**
- Card descriptions: 0.83rem
- Labels: 0.8rem
- Metadata: 0.8rem
- var(--ink-dim)

---

## Navigation Hierarchy

### Topbar Navigation

**Structure:**
- Brand (left)
- Navigation links (right, horizontal scroll)
- Layout toggle (rightmost)

**Visual Hierarchy:**
- Brand: largest, DM Serif Display
- Links: smaller, system UI
- Toggle: icon only

**Interaction:**
- Links: color change on hover
- Toggle: scale on active

---

## Card Composition

### Navigation Card Pattern

**Internal Layout:**
```
[Icon Chip] [Title] [Description] [Badge] [Arrow]
```

**Spacing:**
- Gap between elements: 0.8rem
- Padding: 0.68rem 1.15rem 0.68rem 0.68rem

**Visual Weight:**
- Icon chip: medium (color)
- Title: high (white, larger)
- Description: low (dimmed, smaller)
- Badge: high (gradient, small but bright)
- Arrow: low (dimmed)

---

## Empty States

### Pattern

**Visual:**
- Centered text
- Dimmed color (var(--ink-dim))
- No decoration

**Implementation:**
```css
.empty {
  text-align: center;
  padding: 3rem;
  color: var(--ink-dim);
}
```

**Example Usage:**
- No search results
- No items in category
- Loading placeholder

---

## Dashboards

### Not Used in Current Implementation

**If needed, follow these principles:**
- Use card grid pattern
- Use category sections
- Use glassmorphism panels
- Maintain DUB5 visual identity

---

## Forms

### Glassmorphism Form Pattern

**Structure:**
1. Form title (DM Serif Display)
2. Form description (var(--ink-dim))
3. Input fields (panel radius, glassmorphism)
4. Helper text (var(--ink-dim))
5. Error messages (when implemented)
6. Submit button (pill, glassmorphism)

**Input Field Pattern:**
```css
.form-field {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  color: var(--ink);
  font-size: 0.9rem;
  outline: none;
}

.form-input:focus {
  border-color: var(--line-strong);
  background: var(--glass-hover);
}

.form-helper {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: var(--ink-dim);
}
```

---

## Detail Pages

### Article/Content Pattern

**Structure:**
1. Breadcrumb navigation
2. Header (title, subtitle, metadata)
3. Ethical notice (if applicable)
4. Quick facts sidebar
5. Table of contents (sticky)
6. Main content sections
7. References
8. Related posts

**Layout:**
```css
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
}

.main-content {
  min-width: 0;
}

.sidebar {
  position: sticky;
  top: 2rem;
  align-self: start;
}
```

**Responsive:**
```css
@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: static;
  }
}
```

---

## Creation Flows

### Not Used in Current Implementation

**If needed, follow these principles:**
- Use overlay panel pattern
- Use step indicators (if multi-step)
- Use glassmorphism throughout
- Maintain DUB5 visual identity

---

## Settings

### Not Used in Current Implementation

**If needed, follow these principles:**
- Use card grid pattern
- Use toggle switches (pill shape)
- Use glassmorphism panels
- Maintain DUB5 visual identity

---

## Lists

### Category Section List Pattern

**Structure:**
1. Section header (title + count)
2. Card grid
3. Next section

**Implementation:**
```css
.cat-section {
  scroll-margin-top: 110px;
}

.cat-section + .cat-section {
  margin-top: 3rem;
}

.section-head {
  max-width: 1280px;
  margin: 0 auto 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.section-head h3 {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ink);
}

.section-count {
  font-size: 0.8rem;
  color: var(--ink-dim);
  font-weight: 500;
}
```

---

## Responsive Transformations

### Grid Transformations

**Desktop:**
```css
.nav-grid {
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
}
```

**Tablet (900px):**
```css
@media (max-width: 900px) {
  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Mobile (768px):**
```css
@media (max-width: 768px) {
  .nav-grid {
    grid-template-columns: 1fr;
  }
}
```

### Typography Transformations

**Desktop:**
```css
.title-wrap {
  font-size: 8rem;
}
```

**Mobile (768px):**
```css
@media (max-width: 768px) {
  .title-wrap {
    font-size: 4.5rem;
  }
}
```

### Content Visibility Transformations

**Hide descriptions below 560px:**
```css
@media (max-width: 560px) {
  .nav-button-desc {
    display: none;
  }
}
```

---

## Layout Variations

### Four-Column Layout

```css
.nav-grid {
  grid-template-columns: repeat(4, 1fr);
}
```

### Three-Column Layout

```css
.nav-grid {
  grid-template-columns: repeat(3, 1fr);
}
```

### Two-Column Layout

```css
.nav-grid {
  grid-template-columns: repeat(2, 1fr);
}
```

### Single-Column Layout

```css
.nav-grid {
  grid-template-columns: 1fr;
}
```

### List Layout

```css
.nav-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-button {
  width: 100%;
}
```

### Tall Layout

```css
.nav-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.nav-button {
  flex-direction: column;
  align-items: flex-start;
  padding: 1.1rem 1.1rem 1rem;
  border-radius: 18px;
  gap: 0.5rem;
}

.nav-button-title {
  white-space: normal;
  font-size: 1.05rem;
}

.nav-button-desc {
  white-space: normal;
  overflow: visible;
  font-size: 0.86rem;
  line-height: 1.5;
}
```

---

## Pattern Summary

| Pattern | Use Case | Key Characteristics |
|---------|----------|-------------------|
| Hub page | Landing, navigation | Large title, card grid, sections |
| Detail page | Content, articles | Back link, header, sidebar, TOC |
| Card | Navigation | Pill shape, glassmorphism, icon chip |
| Form | Data entry | Panel radius inputs, glassmorphism |
| List | Category sections | Section header, grid, spacing |
| Empty state | No results | Centered, dimmed text |
| Overlay | Modals, dialogs | Panel, centered, fade-in |
