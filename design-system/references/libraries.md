# Libraries Reference

This document defines the policy for third-party/public libraries in DUB5 implementations.

---

## Library Decision Hierarchy

When considering a library, follow this hierarchy:

1. **Existing DUB5 component or utility** — Use this first
2. **Existing project dependency** — Use this second
3. **Approved public library** — Use this third
4. **Custom implementation** — Only when necessary

---

## Animation Libraries

### Status: Not Recommended

**DUB5 uses:** CSS transitions and animations + requestAnimationFrame for canvas

**Why not use animation libraries:**
- DUB5 motion is simple and well-defined
- CSS transitions are sufficient for hover states
- requestAnimationFrame is sufficient for canvas
- Animation libraries add unnecessary complexity
- Performance impact on simple animations

**When to consider:**
- Complex physics simulations
- Complex timeline-based animations
- Gesture-based animations

**Approved alternatives:**
- CSS transitions and animations
- requestAnimationFrame for canvas
- Web Animations API for complex sequences

---

## Icon Libraries

### Status: Custom SVG Recommended

**DUB5 uses:** Inline SVG icons with Feather Icons style

**Why custom SVG:**
- Full control over stroke width and style
- No external dependency
- Can be optimized for each use case
- Consistent with DUB5 visual style

**Icon style:**
- Stroke-based
- Stroke width: 1.7
- Rounded line caps
- 20px × 20px standard size

**When to consider icon library:**
- Large number of icons needed
- Dynamic icon loading
- Icon search functionality

**Approved alternatives:**
- Feather Icons (matches DUB5 style)
- Heroicons (similar stroke style)
- Lucide (Feather Icons fork)

**Do not:**
- Mix multiple icon families
- Use filled icons when DUB5 uses stroke
- Use inconsistent stroke widths

---

## UI Component Libraries

### Status: Not Recommended

**DUB5 uses:** Custom components built with documented patterns

**Why not use UI libraries:**
- DUB5 has a distinct visual identity
- Component libraries have generic styling
- Custom components ensure consistency
- Avoids dependency bloat

**When to consider:**
- Prototyping only
- When DUB5 visual identity is not required
- When time constraints are severe

**Not recommended:**
- Material UI
- Ant Design
- Bootstrap
- Tailwind UI
- Chakra UI
- Mantine

**Approved approach:**
- Build custom components using DUB5 design tokens
- Follow component patterns from references/components.md
- Reuse CSS custom properties

---

## Chart Libraries

### Status: Not Currently Used

**DUB5 uses:** No charts in current implementation

**When needed:**
- Choose lightweight library
- Ensure styling can match DUB5
- Prefer SVG-based libraries

**Approved alternatives:**
- Chart.js (customizable styling)
- Recharts (React-specific)
- D3.js (for complex visualizations)

**Styling requirements:**
- Must use DUB5 colors
- Must support dark theme
- Must be responsive

---

## Form Libraries

### Status: Not Recommended

**DUB5 uses:** Native HTML form elements with custom styling

**Why not use form libraries:**
- DUB5 forms are simple
- Custom styling ensures consistency
- Native elements are accessible
- Avoids dependency bloat

**When to consider:**
- Complex form validation
- Multi-step forms
- Dynamic form generation

**Approved alternatives:**
- Formik (React-specific)
- React Hook Form (React-specific)
- Native HTML with custom validation

---

## Date/Time Libraries

### Status: Not Currently Used

**DUB5 uses:** No date/time components in current implementation

**When needed:**
- Choose lightweight library
- Ensure styling can match DUB5
- Prefer native Date API when possible

**Approved alternatives:**
- date-fns (lightweight, functional)
- Day.js (lightweight, Moment.js replacement)
- Luxon (modern, chainable)

**Not recommended:**
- Moment.js (deprecated, large)

---

## Utility Libraries

### Status: Use Judiciously

**DUB5 uses:** Minimal utilities

**Approved:**
- Lodash (only needed functions)
- Ramda (functional programming)
- Underscore.js (similar to Lodash)

**Guidelines:**
- Only import what you use
- Prefer tree-shaking
- Consider if native API suffices

**Not recommended:**
- Loading entire utility library for one function
- Using utilities when native API works

---

## CSS Frameworks

### Status: Not Recommended

**DUB5 uses:** Custom CSS with CSS custom properties

**Why not use CSS frameworks:**
- DUB5 has a distinct visual identity
- CSS frameworks have generic styling
- Custom CSS ensures consistency
- Avoids dependency bloat

**Not recommended:**
- Tailwind CSS (unless already in project)
- Bootstrap
- Bulma
- Foundation
- Semantic UI

**When to consider:**
- Project already uses the framework
- Tight time constraints
- Team already familiar with framework

**If using Tailwind:**
- Map DUB5 tokens to Tailwind config
- Use theme extension
- Don't override with arbitrary values

---

## Build Tools

### Status: Use Project Standards

**DUB5 uses:** No build step (vanilla HTML/CSS/JS)

**Approved:**
- Whatever the project already uses
- Vite (fast, modern)
- Webpack (industry standard)
- Parcel (zero-config)
- esbuild (extremely fast)

**Guidelines:**
- Match project existing setup
- Don't introduce new build tools without reason
- Consider performance impact

---

## Testing Libraries

### Status: Not Currently Documented

**When needed:**
- Choose based on project framework
- Ensure testing utilities match project needs

**Approved:**
- Jest (JavaScript testing)
- Vitest (Vite-native alternative to Jest)
- Testing Library (React, Vue, etc.)
- Playwright (E2E testing)
- Cypress (E2E testing)

---

## General Library Policy

### Principles

1. **Prefer native APIs** when they suffice
2. **Prefer lightweight libraries** over heavy ones
3. **Prever libraries that can be styled** to match DUB5
4. **Avoid multiple libraries** for the same problem
5. **Document the reason** when adding a new library
6. **Remove unused libraries** regularly

### Adding a New Library

**Before adding:**
1. Check if existing solution works
2. Check if project already has similar library
3. Verify library can be styled to match DUB5
4. Consider performance impact
5. Consider bundle size impact
6. Consider maintenance burden

**After adding:**
1. Document in this file
2. Document when to use it
3. Document when NOT to use it
4. Document integration approach
5. Update package.json with version pinning

### Removing a Library

**When to remove:**
- Library is no longer used
- Better alternative exists
- Library is deprecated
- Library causes security issues

**Process:**
1. Verify no code uses the library
2. Remove from package.json
3. Remove from node_modules
4. Update this file
5. Test application

---

## Library Maintenance

### Regular Review

**Quarterly:**
- Review all dependencies
- Check for security vulnerabilities
- Check for deprecated libraries
- Check for better alternatives

**When vulnerability found:**
- Update to secure version
- If no secure version, find alternative
- Document the change

### Version Pinning

**Recommendation:**
- Pin exact versions in package.json
- Use caret (^) for minor updates only
- Use tilde (~) for patch updates only
- Avoid wildcards (*) for production

---

## Summary

### Recommended Approach

1. **Build custom components** using DUB5 design tokens
2. **Use native APIs** when they suffice
3. **Use existing project dependencies** before adding new ones
4. **Choose lightweight libraries** when necessary
5. **Ensure libraries can be styled** to match DUB5
6. **Document all library decisions**

### What to Avoid

1. Don't add libraries for simple problems
2. Don't add multiple libraries for the same purpose
3. Don't use heavy libraries when lightweight alternatives exist
4. Don't use libraries that can't be styled to match DUB5
5. Don't use deprecated libraries
6. Don't ignore security vulnerabilities

### Decision Framework

**When considering a library:**

1. Can native API solve this? → Use native API
2. Does project already have a library? → Use existing
3. Is there a lightweight approved library? → Use approved
4. Must build custom? → Build custom with DUB5 tokens

**Only add new library when all above fail.**
