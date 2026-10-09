# DUB5 Design System — Application Skill

This document describes how to apply the DUB5 design system during development work. It provides a repeatable workflow for implementing DUB5 visuals consistently across projects.

---

## Overview

The DUB5 design system is a complete visual language specification. This skill document explains how to apply that specification when building or modifying interfaces.

**Goal:** Ensure all implementations consistently reproduce the DUB5 visual identity.

---

## Implementation Workflow

### Step 1: Inspect the Existing Project Context

Before applying DUB5 visuals:

1. **Understand the project structure**
   - What framework is being used? (React, Vue, vanilla, etc.)
   - What styling approach exists? (CSS, Tailwind, CSS-in-JS, etc.)
   - What are the existing patterns?

2. **Identify what needs to be built or modified**
   - New page? New component? Modification?
   - Is there an existing DUB5 pattern that fits?

3. **Check for existing design tokens**
   - Does the project already have tokens?
   - Can DUB5 tokens be added or mapped?

### Step 2: Read DESIGN.md

Before writing any code:

1. **Read the relevant sections of DESIGN.md**
   - Design Tokens for exact values
   - Components for element specifications
   - Layout for structure
   - Responsive for behavior
   - Motion for animations

2. **Identify which rules apply**
   - What tokens do you need?
   - What component pattern fits?
   - What responsive behavior is required?

3. **Note the exact values**
   - Write down the exact hex codes, rem values, pixel values
   - Don't rely on memory or approximation

### Step 3: Determine Which DUB5 Design Rules Apply

For each decision:

1. **Check if a pattern exists**
   - Is there a similar component in DUB5?
   - Can it be adapted?

2. **Use documented tokens**
   - Colors: var(--ink), var(--glass), etc.
   - Spacing: values from the scale
   - Typography: sizes and weights from hierarchy
   - Radius: 999px, 18px, 12px, or 7px

3. **Follow component behavior**
   - Hover states: 300ms ease-in-out, translateY(-2px)
   - Focus: 2px outline with 3px offset
   - Glassmorphism: blur(16px) saturate(160%)

4. **Apply motion language**
   - Enter: 550ms cubic-bezier(0.22, 1, 0.36, 1)
   - Hover: 300ms ease-in-out
   - Reduced motion: respect preference

### Step 4: Reuse Existing Patterns Before Creating New Ones

1. **Check for similar components**
   - Navigation card → use card pattern
   - Button → use button pattern
   - Input → use input pattern
   - Panel → use panel pattern

2. **Adapt if necessary**
   - Can the existing pattern work with minor changes?
   - Are the changes justified?

3. **Only create new when necessary**
   - Existing pattern cannot reasonably express the requirement
   - Document the new pattern for future reuse

### Step 5: Use Documented Tokens

Always use the documented tokens from DESIGN.md:

**Colors:**
```css
--bg-1: #0b1150
--bg-2: #050833
--bg-3: #01030f
--glass: rgba(9, 13, 38, 0.62)
--glass-hover: rgba(13, 19, 50, 0.72)
--ink: rgb(226, 240, 255)
--ink-dim: rgba(226, 240, 255, 0.60)
--line: rgba(224, 242, 254, 0.16)
--line-strong: rgba(224, 242, 254, 0.30)
--accent-games: #4cc9f0
--accent-tools: #a78bfa
--accent-study: #34d399
--accent-hacks: #fb7185
--accent-guides: #fbbf24
```

**Spacing:**
Use values from the documented scale (0.22rem to 7.5rem)

**Typography:**
```css
--font-display: 'DM Serif Display', Georgia, serif;
--font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**Radius:**
```css
--r-pill: 999px
--r-panel: 18px
--r-chip: 12px
--r-badge: 7px
```

**Motion:**
```css
--dur-hover: 300ms
--ease-hover: ease-in-out
--dur-enter: 550ms
--ease-enter: cubic-bezier(0.22, 1, 0.36, 1)
```

### Step 6: Follow DUB5 Typography and Spacing

**Typography:**
- Headings: DM Serif Display
- Body/UI: System font stack
- Use the documented hierarchy for sizes
- Use the documented weights (400 for display, 600 for UI, 700 for badges)

**Spacing:**
- Use the documented scale
- Don't invent new values
- Consistent spacing creates rhythm

**Example:**
```css
/* Correct: use documented scale */
padding: 0.68rem 1.15rem;
gap: 0.85rem;
margin-top: 3rem;

/* Incorrect: arbitrary values */
padding: 12px 16px;
gap: 14px;
margin-top: 48px;
```

### Step 7: Follow DUB5 Component Behavior

**For each component:**

1. **Apply glassmorphism**
```css
background: var(--glass);
backdrop-filter: var(--glass-blur);
box-shadow: var(--glass-inset), var(--glass-shadow);
border: 1px solid var(--line);
```

2. **Apply hover state**
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

3. **Apply focus state**
```css
:focus-visible {
  outline: 2px solid rgba(224, 242, 254, 0.8);
  outline-offset: 3px;
}
```

4. **Use correct radius**
- Cards/buttons: 999px (pill)
- Panels: 18px
- Icon chips: 12px
- Badges: 7px

### Step 8: Follow DUB5 Responsive Rules

**Implement responsive behavior:**

1. **Use documented breakpoints**
   - 560px: Hide card descriptions
   - 600px: Single column grid
   - 768px: Mobile (reduced padding)
   - 900px: Tablet (2-column grid)

2. **Mobile-first or desktop-first?**
   - DUB5 uses desktop-first with mobile overrides
   - Adapt to your project's approach

3. **Grid behavior**
   - Desktop: auto-fill with minmax(340px, 1fr)
   - Tablet: 2 columns
   - Mobile: 1 column

4. **Typography scaling**
   - Homepage title: 8rem → 4.5rem on mobile
   - Body text: no change
   - Buttons: no change

5. **Touch targets**
   - Minimum 44px height for buttons
   - Adequate padding for links

### Step 9: Follow DUB5 Motion Rules

**Apply motion consistently:**

1. **Hover transitions**
   - Duration: 300ms
   - Easing: ease-in-out
   - Properties: border-color, transform, background

2. **Enter animations**
   - Duration: 550ms
   - Easing: cubic-bezier(0.22, 1, 0.36, 1)
   - Effect: fade-in + translateY

3. **Don't introduce:**
   - Bouncing animations
   - Rotating animations
   - Excessive motion
   - Complex keyframes beyond current set

4. **Respect reduced motion**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Step 10: Use Approved Libraries Where Appropriate

**Library decision hierarchy:**

1. **Existing DUB5 component or utility** — Use this first
2. **Existing project dependency** — Use this second
3. **Approved public library** — Use this third
4. **Custom implementation** — Only when necessary

**For motion:**
- Prefer CSS transitions and animations
- Use requestAnimationFrame for complex animations
- Avoid heavy animation libraries unless necessary

**For icons:**
- Use stroke-based SVG icons
- Feather Icons style is compatible
- 1.7 stroke width, rounded caps

**For other categories:**
- See references/libraries.md for approved libraries
- Don't introduce multiple libraries for the same problem

### Step 11: Compare Implementation Against References

**After implementation:**

1. **Visual comparison**
   - Does it look like DUB5?
   - Are colors correct?
   - Is typography correct?
   - Is spacing correct?

2. **Code comparison**
   - Are tokens used correctly?
   - Is glassmorphism applied?
   - Are states correct?
   - Is motion correct?

3. **Responsive comparison**
   - Does it match documented behavior?
   - Are breakpoints correct?
   - Is mobile usable?

### Step 12: Perform Design Review

**Use the review process from references/design-review.md:**

1. **IMPLEMENT** → Build the feature
2. **RENDER** → View in browser
3. **INSPECT** → Compare against DESIGN.md
4. **COMPARE** → Check all categories
5. **IDENTIFY DRIFT** → List deviations
6. **FIX** → Correct major drift
7. **RENDER AGAIN** → Verify fixes
8. **FINAL REVIEW** → Pass/fail assessment

**Review categories:**
- Visual identity
- Color
- Typography
- Spacing
- Geometry
- Components
- Layout
- Responsive
- Motion
- Interaction
- Accessibility
- Visual drift

### Step 13: Correct Visual Drift

**When drift is identified:**

1. **Categorize as minor or major**
   - Minor: Small deviation, doesn't break identity
   - Major: Breaks visual identity, must fix

2. **Fix major drift**
   - Re-apply documented rules
   - Use exact token values
   - Follow component patterns

3. **Consider minor drift**
   - Is it justified by context?
   - Should it be documented?
   - Can it be avoided?

4. **Re-apply when necessary**
   - Don't accept "close enough"
   - Use exact values from DESIGN.md

### Step 14: Re-Review

**After corrections:**

1. **Render again**
   - View the corrected implementation
   - Check at different screen sizes

2. **Verify fixes**
   - Did the drift resolve?
   - Are tokens correct now?
   - Is visual identity preserved?

3. **Final assessment**
   - Pass: All major categories pass
   - Minor drift: Justified and documented
   - Fail: Still has major drift, continue fixing

### Step 15: Only Then Consider Complete

**Do not consider the work complete until:**

- All design tokens are used correctly
- All component patterns are followed
- All states are implemented
- Responsive behavior matches documentation
- Motion language is applied
- Accessibility requirements are met
- Design review passes

---

## Creating New Pages

### Process

1. **Determine page type**
   - Hub/landing → Use homepage pattern
   - Content detail → Use game page pattern
   - List/index → Use category section pattern
   - Form → Use glassmorphism form pattern

2. **Apply background**
   - Always use the canonical gradient
   - Always include nebula gradients
   - Always include starfield canvas

3. **Choose container**
   - Hub: max-width 1400px, padding 7.5rem 2rem 3rem
   - Content: max-width 960px, padding 3rem 1.5rem 4rem

4. **Apply typography**
   - Headings: DM Serif Display
   - Body: System font stack
   - Follow hierarchy

5. **Use components**
   - Cards: navigation card pattern
   - Buttons: button pattern
   - Inputs: input pattern

6. **Apply spacing**
   - Use documented scale
   - Section margins: 3rem
   - Grid gaps: 0.85rem

7. **Ensure responsive**
   - Mobile: single column
   - Tablet: 2 columns
   - Desktop: full grid

8. **Add motion**
   - Hover: 300ms ease-in-out
   - Enter: 550ms cubic-bezier(0.22, 1, 0.36, 1)

9. **Verify accessibility**
   - Focus states
   - Contrast
   - Touch targets

10. **Design review**
    - Compare against DESIGN.md
    - Fix any drift
    - Final assessment

---

## Creating New Components

### Process

1. **Check for existing similar component**
   - Is there already a component that fits?
   - Can it be adapted?

2. **If no existing component:**
   - Follow glassmorphism pattern
   - Use documented tokens
   - Apply hover/focus states
   - Use correct radius

3. **Document the new component**
   - Add to DESIGN.md Components section
   - Add to references/components.md
   - Add example in examples/
   - Add screenshot if visual

4. **Make it reusable**
   - Use semantic props
   - Support variants if needed
   - Document the variants

5. **Test thoroughly**
   - All states
   - All responsive breakpoints
   - Accessibility

6. **Design review**
   - Does it feel like DUB5?
   - Is it consistent?
   - Should it be part of the system?

---

## Modifying Existing Components

### Process

1. **Understand why modification is needed**
   - Is it a bug fix?
   - Is it a feature addition?
   - Is it a visual improvement?

2. **Check design system impact**
   - Does this change a documented rule?
   - Should DESIGN.md be updated?
   - Should the component spec be updated?

3. **Make minimal changes**
   - Only change what's necessary
   - Preserve existing patterns
   - Maintain consistency

4. **Update documentation**
   - Update DESIGN.md if rule changes
   - Update references/components.md
   - Update examples if needed

5. **Test affected areas**
   - All uses of the component
   - All states
   - All responsive breakpoints

6. **Design review**
   - Does the change improve consistency?
   - Does it break anything?
   - Is it justified?

---

## Introducing New Patterns

### When Is It Justified?

A new pattern is justified when:

1. **Existing patterns cannot reasonably express the requirement**
   - The functionality is genuinely new
   - Adapting existing patterns would be forced
   - No reasonable alternative exists

2. **The new pattern follows DUB5 principles**
   - Uses glassmorphism
   - Uses documented tokens
   - Follows motion language
   - Maintains visual consistency

3. **The new pattern is reusable**
   - Can be used in multiple contexts
   - Solves a recurring problem
   - Not a one-off solution

### Process

1. **Design the pattern**
   - Follow DUB5 principles
   - Use documented tokens
   - Apply glassmorphism
   - Implement states

2. **Document the pattern**
   - Add to DESIGN.md
   - Add to references/
   - Add example
   - Add screenshot

3. **Test thoroughly**
   - All states
   - All contexts
   - Responsive behavior

4. **Design review**
   - Does it feel like DUB5?
   - Is it consistent?
   - Should it be canonical?

5. **Integrate into system**
   - Make it available for reuse
   - Update SKILL.md if workflow changes
   - Update library decisions if applicable

---

## Handling Unspecified Design Decisions

### Decision Framework

When DESIGN.md doesn't specify something:

1. **Reuse the closest existing DUB5 pattern**
   - Is there a similar component?
   - Can an existing pattern be adapted?

2. **Reuse an existing semantic token**
   - Is there a color token that fits?
   - Is there a spacing token that works?
   - Is there a typography token that matches?

3. **Reuse the existing spacing/radius/type scale**
   - Choose the closest value from the scale
   - Don't invent new values
   - Maintain consistency

4. **Prefer consistency over novelty**
   - Does this match the visual language?
   - Would this feel like DUB5?
   - Is this consistent with other elements?

5. **Introduce new only when necessary**
   - Can the requirement be expressed with existing patterns?
   - Is this genuinely new functionality?
   - Is there no reasonable alternative?

6. **Document genuinely new reusable patterns**
   - If a new pattern is created, document it
   - Add to DESIGN.md
   - Make it available for future use

### Examples

**Unspecified button size:**
- Use the closest existing button padding (14px 28px or 0.55rem 1.4rem)
- Don't invent a new padding value

**Unspecified color for a new state:**
- Use the closest semantic color (var(--ink), var(--ink-dim), category accent)
- Don't introduce a new hex value

**Unspecified spacing:**
- Use the closest value from the spacing scale
- Don't invent a new rem value

**Unspecified component:**
- Adapt the closest existing component pattern
- Apply glassmorphism, pill radius, hover state
- Don't create from scratch

---

## Preserving Consistency

### Rules

1. **Always use documented tokens**
   - Don't guess values
   - Don't use approximate values
   - Use exact values from DESIGN.md

2. **Always follow component patterns**
   - Don't reinvent components
   - Don't create new styles unnecessarily
   - Reuse existing patterns

3. **Always apply glassmorphism**
   - To all interactive surfaces
   - With the exact blur value
   - With the exact shadow value

4. **Always use the motion language**
   - Documented durations
   - Documented easing
   - Documented transforms

5. **Always ensure responsive behavior**
   - Documented breakpoints
   - Documented layouts
   - Documented sizing

6. **Always perform design review**
   - Compare against DESIGN.md
   - Fix drift
   - Don't accept "close enough"

### Consistency Checklist

Before considering work complete:

- [ ] All colors use documented tokens
- [ ] All spacing uses documented scale
- [ ] All typography uses documented hierarchy
- [ ] All components follow documented patterns
- [ ] All states are implemented correctly
- [ ] Glassmorphism is applied correctly
- [ ] Motion follows documented language
- [ ] Responsive behavior matches documentation
- [ ] Accessibility requirements are met
- [ ] Design review passes

---

## Responsive Implementation

### Process

1. **Use documented breakpoints**
   - 560px, 600px, 768px, 900px
   - Don't introduce new breakpoints without reason

2. **Implement documented behavior**
   - Grid changes at specific breakpoints
   - Typography scaling at specific breakpoints
   - Padding changes at specific breakpoints

3. **Test on actual devices**
   - Mobile phone
   - Tablet
   - Desktop
   - Large desktop

4. **Touch targets**
   - Minimum 44px height for buttons
   - Adequate padding for links
   - Adequate spacing between interactive elements

5. **Content visibility**
   - Hide descriptions on mobile (560px)
   - Stack columns appropriately
   - Ensure content remains accessible

---

## Motion Implementation

### Process

1. **Use documented durations**
   - Hover: 300ms
   - Enter: 550ms
   - Topbar scroll: 420ms

2. **Use documented easing**
   - Hover: ease-in-out
   - Enter: cubic-bezier(0.22, 1, 0.36, 1)
   - Scroll: cubic-bezier(0.4, 0, 0.2, 1)

3. **Use documented transforms**
   - Hover: translateY(-2px)
   - Icon chip: scale(1.05)
   - Active: scale(0.9)

4. **Don't introduce:**
   - Bouncing animations
   - Rotating animations
   - Excessive motion
   - Complex keyframes beyond current set

5. **Respect reduced motion**
   - Always include reduced-motion media query
   - Disable or simplify animations when preferred

---

## Library Selection

### Decision Hierarchy

1. **Existing DUB5 component or utility** — Use this first
2. **Existing project dependency** — Use this second
3. **Approved public library** — Use this third
4. **Custom implementation** — Only when necessary

### Guidelines

- Don't introduce multiple libraries for the same problem
- Prefer lightweight, focused libraries
- Ensure libraries fit DUB5 philosophy
- Check if existing implementation already satisfies requirement

### See references/libraries.md

For approved libraries and their intended roles.

---

## Accessibility Implementation

### Requirements

1. **Focus states**
   - 2px outline with 3px offset
   - Applied to all interactive elements
   - Use :focus-visible, not :focus

2. **Contrast**
   - WCAG AA contrast ratios
   - High contrast for text
   - Adequate contrast for interactive elements

3. **Touch targets**
   - Minimum 44px height for buttons
   - Adequate padding for links
   - Adequate spacing

4. **Keyboard navigation**
   - All interactive elements keyboard-accessible
   - Logical tab order
   - Visible focus indicators

5. **Non-color state communication**
   - States use multiple indicators
   - Color + border + transform
   - Never rely on color alone

6. **Reduced motion**
   - Always respect prefers-reduced-motion
   - Simplify or disable animations

---

## Visual Review

### Process

1. **Implement** → Build the feature
2. **Render** → View in browser at multiple sizes
3. **Inspect** → Check against DESIGN.md
4. **Compare** → Check all review categories
5. **Identify drift** → List deviations
6. **Fix** → Correct major drift
7. **Render again** → View corrections
8. **Final review** → Pass/fail assessment

### Review Categories

- Visual identity
- Color
- Typography
- Spacing
- Geometry
- Components
- Layout
- Responsive
- Motion
- Interaction
- Accessibility
- Visual drift

### Pass/Fail Criteria

**PASS:**
- All major categories pass
- Minor drift is justified and documented
- Visual identity is preserved
- No arbitrary inventions

**MINOR DRIFT:**
- Small deviations that don't break identity
- Justified by context
- Documented for future reference

**MAJOR DRIFT:**
- Breaks visual identity
- Arbitrary colors or patterns
- Inconsistent with DUB5
- Must be fixed

### See references/design-review.md

For complete review procedure.

---

## Summary

The DUB5 design system application workflow is:

1. Inspect project context
2. Read DESIGN.md
3. Determine applicable rules
4. Reuse existing patterns
5. Use documented tokens
6. Follow typography and spacing
7. Follow component behavior
8. Follow responsive rules
9. Follow motion rules
10. Use approved libraries
11. Compare against references
12. Perform design review
13. Correct visual drift
14. Re-review
15. Only then consider complete

**Key principle:** Consistency over novelty. When in doubt, choose the closest existing DUB5 pattern rather than inventing something new.

---

## Documentation Updates

### When to Update the Design System

When a reusable design change is intentionally introduced:

1. **Identify if the change is reusable**
   - Can this pattern be used in other contexts?
   - Is this a genuinely new component or pattern?
   - Is this a modification to an existing reusable pattern?

2. **Update DESIGN.md if applicable**
   - If introducing a new reusable component, add to Components section
   - If introducing a new pattern, add to Patterns section
   - If modifying existing rules, update the relevant section
   - If adding new tokens, add to Design Tokens section

3. **Update reference documents**
   - Add detailed component spec to references/components.md
   - Add motion details to references/motion.md
   - Add responsive behavior to references/responsive.md
   - Update implementation-notes.md with new file references

4. **Update machine-readable tokens**
   - Add new tokens to tokens/tokens.json
   - Update tokens/README.md if schema changes
   - Ensure tokens match DESIGN.md exactly

5. **Increment version**
   - Update version in README.md
   - Add entry to CHANGELOG.md
   - Categorize as Major, Minor, or Patch

6. **Document the reason**
   - Explain why the change was necessary
   - Describe what problem it solves
   - Note any alternatives considered

### When Updates Are Not Required

**Do not update the design system for:**
- One-off solutions that won't be reused
- Context-specific hacks
- Temporary implementations
- Bug fixes that don't change visual rules
- Business logic changes
- Content changes

### Update Workflow

**Before implementation:**
1. Determine if the change is genuinely reusable
2. If yes, plan the documentation update

**After implementation:**
1. Update canonical source (DESIGN.md)
2. Update reference documents
3. Update machine-readable tokens
4. Update version and changelog
5. Verify consistency across all documents
