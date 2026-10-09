# Design Review Procedure

This document defines the actual visual-review process for DUB5 implementations.

---

## Review Process

### Step 1: IMPLEMENT

Build the feature or page according to the design system.

**Checklist:**
- [ ] Used documented design tokens
- [ ] Followed component patterns
- [ ] Applied glassmorphism correctly
- [ ] Used correct typography
- [ ] Used correct spacing
- [ ] Implemented all states

### Step 2: RENDER

View the implementation in a browser.

**Checklist:**
- [ ] Viewed at desktop size
- [ ] Viewed at tablet size
- [ ] Viewed at mobile size
- [ ] Tested hover states
- [ ] Tested focus states
- [ ] Tested active states (if applicable)

### Step 3: INSPECT

Compare the implementation against DESIGN.md.

**Checklist:**
- [ ] Colors match documented tokens
- [ ] Typography matches hierarchy
- [ ] Spacing matches scale
- [ ] Radius matches documented values
- [ ] Shadows match documented values
- [ ] Motion matches documented language

### Step 4: COMPARE

Perform category-by-category comparison.

**Checklist:**
- [ ] Visual identity preserved
- [ ] Colors correct
- [ ] Typography correct
- [ ] Spacing correct
- [ ] Geometry correct
- [ ] Components correct
- [ ] Layout correct
- [ ] Responsive correct
- [ ] Motion correct
- [ ] Interaction correct
- [ ] Accessibility correct

### Step 5: IDENTIFY DRIFT

List any deviations from the design system.

**Categorize as:**
- **Minor drift:** Small deviation, doesn't break identity
- **Major drift:** Breaks visual identity, must fix

### Step 6: FIX

Correct major drift by re-applying documented rules.

**Process:**
1. Identify the rule that was violated
2. Re-apply the exact token value
3. Re-apply the component pattern
4. Re-apply the motion language

### Step 7: RENDER AGAIN

View the corrected implementation.

**Checklist:**
- [ ] Re-viewed at all screen sizes
- [ ] Re-tested all states
- [ ] Verified fixes

### Step 8: FINAL REVIEW

Perform pass/fail assessment.

**Criteria:**
- **PASS:** All major categories pass, minor drift justified
- **MINOR DRIFT:** Small deviations justified and documented
- **FAIL:** Still has major drift, continue fixing

---

## Review Categories

### Visual Identity

**Question:** Does it clearly look like DUB5?

**Check:**
- [ ] Starfield background present
- [ ] Background gradient correct
- [ ] Nebula gradients present
- [ ] Glassmorphism applied
- [ ] Category colors used correctly
- [ ] DM Serif Display used for headings
- [ ] Pill shapes used

**Fail if:**
- Missing starfield
- Wrong background gradient
- No glassmorphism
- Wrong font family
- Arbitrary colors

### Color

**Question:** Are semantic colors correct?

**Check:**
- [ ] var(--ink) used for primary text
- [ ] var(--ink-dim) used for secondary text
- [ ] var(--glass) used for surfaces
- [ ] var(--line) used for borders
- [ ] Category accents used correctly
- [ ] No arbitrary colors

**Fail if:**
- Wrong text colors
- Wrong surface colors
- Arbitrary hex values
- Missing category colors

### Typography

**Question:** Are families, sizes, weights, and hierarchy correct?

**Check:**
- [ ] DM Serif Display for headings
- [ ] System font stack for UI
- [ ] Font sizes match hierarchy
- [ ] Font weights correct (400 for display, 600 for UI)
- [ ] Letter-spacing correct where used

**Fail if:**
- Wrong font family
- Wrong font sizes
- Wrong font weights
- Missing letter-spacing

### Spacing

**Question:** Is the DUB5 rhythm preserved?

**Check:**
- [ ] Values from documented scale
- [ ] Section margins: 3rem
- [ ] Grid gaps: 0.85rem
- [ ] Card padding: 0.68rem 1.15rem
- [ ] No arbitrary spacing values

**Fail if:**
- Arbitrary spacing values
- Compressed spacing
- Inconsistent gaps
- Wrong padding values

### Geometry

**Question:** Are radius and proportions correct?

**Check:**
- [ ] 999px radius for cards/buttons
- [ ] 18px radius for panels
- [ ] 12px radius for icon chips
- [ ] 7px radius for badges
- [ ] 1px border thickness
- [ ] No sharp corners

**Fail if:**
- Wrong border radius
- Sharp corners
- Wrong border thickness
- Inconsistent shapes

### Components

**Question:** Are existing component patterns reused?

**Check:**
- [ ] Cards use navigation card pattern
- [ ] Buttons use button pattern
- [ ] Inputs use input pattern
- [ ] Glassmorphism applied correctly
- [ ] States implemented correctly

**Fail if:**
- New card style without reason
- New button style without reason
- Missing glassmorphism
- Wrong states

### Layout

**Question:** Does hierarchy match DUB5?

**Check:**
- [ ] Container max-widths correct
- [ ] Content centered appropriately
- [ ] Section organization correct
- [ ] Z-index layering correct
- [ ] Positioning correct

**Fail if:**
- Wrong max-widths
- Misaligned content
- Wrong z-index
- Wrong positioning

### Responsive

**Question:** Does behavior match documented rules?

**Check:**
- [ ] Single column below 768px
- [ ] 2 columns at 900px
- [ ] Title scales to 4.5rem on mobile
- [ ] Card descriptions hide below 560px
- [ ] Buttons full width on mobile
- [ ] Touch targets adequate

**Fail if:**
- Wrong breakpoints
- Wrong layout changes
- Missing mobile behavior
- Inadequate touch targets

### Motion

**Question:** Does animation feel like DUB5?

**Check:**
- [ ] Hover: 300ms ease-in-out
- [ ] Enter: 550ms cubic-bezier(0.22, 1, 0.36, 1)
- [ ] Hover transform: translateY(-2px)
- [ ] No prohibited animations
- [ ] Reduced motion respected

**Fail if:**
- Wrong durations
- Wrong easing
- Wrong transforms
- Bouncing/rotating animations
- No reduced-motion support

### Interaction

**Question:** Are hover, active, selected, focus, loading, and disabled states consistent?

**Check:**
- [ ] Hover: background, border, transform changes
- [ ] Focus: 2px outline with 3px offset
- [ ] Active: translateY(0) or scale(0.9)
- [ ] Selected: (if used) clearly indicated
- [ ] Loading: fade-in animation
- [ ] Disabled: (if used) reduced opacity

**Fail if:**
- Missing hover state
- Missing focus state
- Wrong state indicators
- Color-only state communication

### Accessibility

**Question:** Does the design remain usable and readable?

**Check:**
- [ ] Focus-visible outline present
- [ ] Contrast ratios meet WCAG AA
- [ ] Touch targets adequate (44px minimum)
- [ ] Reduced motion respected
- [ ] Keyboard navigation works
- [ ] States not color-only

**Fail if:**
- Missing focus states
- Low contrast
- Small touch targets
- No reduced-motion support
- Color-only states

### Visual Drift

**Question:** Does anything feel like a generic design pattern rather than DUB5?

**Check:**
- [ ] No generic SaaS card style
- [ ] No arbitrary colors
- [ ] No inconsistent patterns
- [ ] No missing glassmorphism
- [ ] No wrong radius
- [ ] No wrong spacing

**Fail if:**
- Generic looking
- Arbitrary visual decisions
- Inconsistent with DUB5 DNA
- Missing signature elements

---

## Pass/Fail Criteria

### PASS

**Requirements:**
- All major categories pass
- Minor drift is justified and documented
- Visual identity is preserved
- No arbitrary inventions
- All documented rules followed

**Example:**
- Minor: Slightly different padding (still within scale)
- Justified: Specific content required it
- Documented: Added note to implementation

### MINOR DRIFT

**Requirements:**
- Small deviation that doesn't break identity
- Justified by specific context
- Documented for future reference
- Doesn't affect user experience

**Example:**
- Deviation: Padding is 1rem instead of 0.85rem
- Justification: Specific content needed more space
- Documented: Added comment explaining why

### MAJOR DRIFT

**Requirements:**
- Breaks visual identity
- Arbitrary colors or patterns
- Inconsistent with DUB5
- Missing signature elements
- Not justified

**Example:**
- Deviation: Using solid white background
- Justification: None
- Action: Must fix, use var(--glass)

---

## When New Components Are Justified

A new component or pattern is justified when:

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

**Process:**
1. Document the new component in DESIGN.md
2. Document in references/components.md
3. Add example in examples/
4. Add screenshot if visual
5. Update SKILL.md if workflow changes

---

## Do Not Allow

- "Looks fine" as the only criterion
- Subjective judgment without reference to DESIGN.md
- Arbitrary visual decisions
- Skipping design review
- Accepting "close enough" without justification
- Ignoring major drift

---

## Review Checklist

Before considering implementation complete:

- [ ] Visual identity preserved
- [ ] Colors correct
- [ ] Typography correct
- [ ] Spacing correct
- [ ] Geometry correct
- [ ] Components correct
- [ ] Layout correct
- [ ] Responsive correct
- [ ] Motion correct
- [ ] Interaction correct
- [ ] Accessibility correct
- [ ] No visual drift
- [ ] All documented rules followed
- [ ] No arbitrary inventions

---

## Continuous Review

### When to Review

- Before committing changes
- After major component changes
- After responsive implementation
- After adding new patterns
- Before merging pull requests

### Review Frequency

- **During development:** Continuous self-review
- **Before PR:** Formal review by peer
- **After merge:** Regression review

### Review Tools

- Browser DevTools (inspect tokens)
- Contrast checker (for accessibility)
- Screen reader (for accessibility)
- Multiple devices (for responsive)
- Different browsers (for compatibility)
