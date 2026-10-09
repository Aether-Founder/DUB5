# DUB5 Design System

This is the canonical visual design specification for DUB5. It documents the complete visual language of the DUB5 interface so it can be consistently reproduced across future projects and different technology stacks.

---

## 1. Introduction

### What This System Is

The DUB5 Design System is a comprehensive documentation of the visual identity observed in the existing DUB5 implementation. It captures:

- Exact color values and their semantic roles
- Typography hierarchy with specific fonts and sizes
- Spacing scale and layout patterns
- Component behaviors and states
- Motion language and animation principles
- Responsive design transformations
- Accessibility conventions

### Why It Exists

This system exists to:

1. **Preserve visual consistency** across multiple projects
2. **Enable portable implementation** of the DUB5 visual language
3. **Provide authoritative design tokens** that prevent arbitrary visual decisions
4. **Document the design DNA** that makes DUB5 recognizable
5. **Support automated development workflows** with structured design instructions

### What It Intends to Preserve

The system preserves:

- The deep space atmosphere and color palette
- Glassmorphism surface treatment
- Animated starfield background
- Category-based color coding
- Pill-shaped geometry
- DM Serif Display typography
- Subtle, cinematic motion
- High contrast readability
- Generous spacing rhythm

### How It Should Be Used

**When implementing DUB5 visuals:**
1. Reference exact tokens from the Design Tokens section
2. Follow component rules from the Components section
3. Apply layout patterns from the Layout section
4. Use motion rules from the Motion section
5. Respect responsive behavior from the Responsive Design section

**When creating something new:**
1. Reuse the closest existing DUB5 pattern
2. Use documented tokens for colors, spacing, typography
3. Follow the component behavior rules
4. Apply the motion language
5. Perform design review against this specification

### What Is Authoritative

The authority hierarchy is:

1. **Exact design tokens** — CSS custom properties with exact values
2. **Component-specific rules** — Dimensions, states, behaviors
3. **Layout and interaction rules** — Grids, spacing, responsive patterns
4. **General design principles** — Overall philosophy
5. **Reasonable judgment** — Only when genuinely unspecified

When a rule is documented here, follow it. Do not invent competing values.

### Separating Design Rules from Project Content

This system documents **design rules**, not DUB5-specific content:

- It describes "how a navigation card looks" not "the DUB5 navigation has these specific links"
- It documents "the category color palette" not "games use cyan, tools use purple"
- It explains "the glassmorphism surface treatment" not "the snake game uses this style"

This separation allows the visual language to be reused in projects with completely different content, features, and purpose.

---

## 2. Design Philosophy

### Overall Visual Philosophy

DUB5 creates an immersive, space-themed interface that feels like a gaming portal while maintaining professional usability. The design balances visual richness with functional clarity.

**Key characteristics:**
- Deep space atmosphere with animated starfield
- Glassmorphism surfaces that feel elevated yet integrated
- Category-based color coding for visual organization
- Cinematic motion that enhances without distracting
- High contrast for readability on dark backgrounds
- Generous spacing that creates breathing room

### Visual Mood

The interface feels:
- **Immersive** — The starfield and nebula effects create depth
- **Cinematic** — Smooth animations and glowing effects
- **Professional** — Clean hierarchy and consistent patterns
- **Playful** — Color accents and subtle interactions
- **Focused** — High contrast and clear content hierarchy

### Hierarchy

Visual hierarchy is established through:

1. **Size** — Large display typography for titles (8rem on homepage)
2. **Color** — White/light text for primary, dimmed for secondary
3. **Glow** — Text shadows on headings for emphasis
4. **Position** — Centered titles, left-aligned content
5. **Spacing** — Generous margins between sections
6. **Depth** — Glass surfaces with shadows create layering

### Density

The interface is **spacious, not cramped**:

- Cards have generous padding (0.68rem 1.15rem)
- Grid gaps are substantial (0.85rem)
- Section margins are large (3rem)
- Content has room to breathe
- Not cluttered despite rich visual effects

### Spacing Philosophy

Spacing is intentional and consistent:

- Follows a documented scale (0.22rem to 7.5rem)
- Generous margins create visual separation
- Consistent gaps create rhythm
- Whitespace is a design element, not empty space
- Never compress spacing to fit more content

### Surface Philosophy

All interactive surfaces use glassmorphism:

- Semi-transparent backgrounds (62% opacity)
- Backdrop blur (16px with 160% saturation)
- Inset highlight (subtle top edge glow)
- Drop shadow (creates depth)
- Border (defines edge)

This combination creates the signature DUB5 glass effect.

### Interaction Philosophy

Interactions are subtle and responsive:

- Hover: color change + border change + subtle transform
- Active: minimal scale (0.9) for buttons
- Focus: visible outline for keyboard navigation
- Loading: fade-in animations with spring easing
- Reduced motion: respects user preferences

### Restraint vs Decoration

The design uses decoration **strategically**:

- Starfield: ambient background, not distracting
- Nebula gradients: subtle color depth
- Text glow: only on important headings
- Category colors: functional organization, not random decoration
- Shadows: functional depth, not excessive

Decoration serves the design, it doesn't overpower it.

### Principles Behind Visual Decisions

**Why glassmorphism?**
- Creates depth without darkening the background
- Maintains connection to the space theme
- Allows background effects to show through
- Feels modern and premium

**Why pill shapes?**
- Consistent geometry creates harmony
- Rounded corners feel friendly and approachable
- Pill shapes work well with touch targets
- Avoids sharp, aggressive aesthetics

**Why DM Serif Display?**
- Adds elegance and personality
- Creates contrast with system UI fonts
- Feels cinematic and premium
- Works well at large sizes

**Why category colors?**
- Provides visual organization
- Makes content scannable
- Adds variety without breaking consistency
- Helps users orient themselves

**Why subtle motion?**
- Enhances the immersive feel
- Provides feedback without distraction
- Makes the interface feel alive
- Respects user attention

---

## 3. Design Tokens

### CSS Custom Properties

The following CSS custom properties define the complete DUB5 token system. These are the authoritative values that should be used in any implementation.

```css
:root {
  /* === SURFACE COLORS === */
  --bg-1: #0b1150;                    /* Lightest blue, top of gradient */
  --bg-2: #050833;                    /* Mid blue-purple */
  --bg-3: #01030f;                    /* Darkest, bottom of gradient */

  /* === GLASS SURFACES === */
  --glass: rgba(9, 13, 38, 0.62);    /* Default glass background */
  --glass-hover: rgba(13, 19, 50, 0.72); /* Glass on hover/focus */
  --glass-blur: blur(16px) saturate(160%); /* Backdrop filter */
  --glass-inset: inset 0 1px 0 rgba(255, 255, 255, 0.09); /* Inset highlight */
  --glass-shadow: 0 18px 40px -26px rgba(0, 0, 0, 1); /* Drop shadow */

  /* === BORDER/LINE COLORS === */
  --line: rgba(224, 242, 254, 0.16); /* Default border */
  --line-strong: rgba(224, 242, 254, 0.30); /* Border on hover/focus */

  /* === TEXT COLORS === */
  --ink: rgb(226, 240, 255);         /* Primary text */
  --ink-dim: rgba(226, 240, 255, 0.60); /* Secondary text */
  --ink-faint: rgba(226, 240, 255, 0.38); /* Tertiary text */

  /* === CATEGORY ACCENT COLORS === */
  --accent-games: #4cc9f0;            /* Cyan */
  --accent-tools: #a78bfa;            /* Purple */
  --accent-study: #34d399;            /* Green */
  --accent-hacks: #fb7185;            /* Pink */
  --accent-guides: #fbbf24;           /* Yellow */

  /* === STATUS/BADGE COLORS === */
  --badge-1: #ff5a5f;                 /* Light red */
  --badge-2: #d81f2a;                 /* Dark red */

  /* === BORDER RADIUS === */
  --r-pill: 999px;                    /* Pill/fully rounded */
  --r-panel: 18px;                    /* Panels/containers */
  --r-chip: 12px;                     /* Icon chips/small elements */
  --r-badge: 7px;                     /* Badges */

  /* === MOTION === */
  --dur-hover: 300ms;                 /* Hover transition duration */
  --ease-hover: ease-in-out;          /* Hover easing */
  --dur-enter: 550ms;                 /* Enter animation duration */
  --ease-enter: cubic-bezier(0.22, 1, 0.36, 1); /* Enter easing */

  /* === TYPOGRAPHY === */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI',
              Roboto, Helvetica, Arial, sans-serif;
}
```

### Exact Background CSS

The complete background implementation includes the gradient, nebula effects, and starfield:

```css
/* Main background gradient */
body {
  background: radial-gradient(140% 100% at 50% -10%, #0b1150 0%, #050833 42%, #01030f 100%);
}

/* Nebula gradient overlay */
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

/* Starfield canvas */
.stars {
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
```

### Starfield Animation

The starfield is a canvas-based animation with the following characteristics:

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

**CSS Setup:**
```css
.stars {
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
```

**HTML:**
```html
<canvas id="stars" class="stars"></canvas>
```

**JavaScript Implementation (Exact):**
```javascript
/* Starfield background - Canvas-based, optimized for low CPU usage */
(function starfield() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const TINTS = [
    [255, 255, 255],
    [205, 222, 255],
    [255, 236, 214],
    [186, 205, 255]
  ];

  const BASE_SIZE = [1.8, 3.2, 6.4, 11];

  const spriteCache = new Map();
  let flareSprite = null;

  let W = 0;
  let H = 0;
  let dpr = 1;

  let stars = [];
  let shooting = null;
  let nextShot = 3200;

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  let lastT = performance.now();
  let rafId = null;

  function getSprite(tint, bucket) {
    const key = tint + ':' + bucket;
    const cached = spriteCache.get(key);
    if (cached) return cached;

    const radius = [1.5, 2.6, 4.6, 7.4][bucket];
    const size = Math.max(2, Math.ceil(radius * 2));
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;

    const g = c.getContext('2d');
    const t = TINTS[tint];
    const cx = size / 2;

    const grad = g.createRadialGradient(cx, cx, 0, cx, cx, cx);
    grad.addColorStop(0.00, 'rgba(255,255,255,1)');
    grad.addColorStop(0.14, 'rgba(' + t[0] + ',' + t[1] + ',' + t[2] + ',0.80)');
    grad.addColorStop(0.38, 'rgba(' + t[0] + ',' + t[1] + ',' + t[2] + ',0.20)');
    grad.addColorStop(0.72, 'rgba(' + t[0] + ',' + t[1] + ',' + t[2] + ',0.04)');
    grad.addColorStop(1.00, 'rgba(' + t[0] + ',' + t[1] + ',' + t[2] + ',0)');

    g.fillStyle = grad;
    g.beginPath();
    g.arc(cx, cx, cx, 0, Math.PI * 2);
    g.fill();

    g.fillStyle = 'rgba(255,255,255,0.95)';
    g.beginPath();
    g.arc(cx, cx, Math.max(0.4, cx * 0.15), 0, Math.PI * 2);
    g.fill();

    spriteCache.set(key, c);
    return c;
  }

  function getFlare() {
    if (flareSprite) return flareSprite;

    const s = 64;
    const c = document.createElement('canvas');
    c.width = s;
    c.height = s;

    const g = c.getContext('2d');
    const mid = s / 2;

    const h = g.createLinearGradient(0, mid, s, mid);
    h.addColorStop(0, 'rgba(255,255,255,0)');
    h.addColorStop(0.5, 'rgba(255,255,255,0.8)');
    h.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = h;
    g.fillRect(0, mid - 0.55, s, 1.1);

    const v = g.createLinearGradient(mid, 0, mid, s);
    v.addColorStop(0, 'rgba(255,255,255,0)');
    v.addColorStop(0.5, 'rgba(255,255,255,0.8)');
    v.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = v;
    g.fillRect(mid - 0.55, 0, 1.1, s);

    flareSprite = c;
    return flareSprite;
  }

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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
  }

  function spawnShooting() {
    const goLeft = Math.random() > 0.5;
    const speed = 380 + Math.random() * 320;

    shooting = {
      x: W * (0.15 + Math.random() * 0.7),
      y: H * (0.05 + Math.random() * 0.35),
      vx: (goLeft ? -1 : 1) * speed * 0.85,
      vy: speed * 0.45,
      life: 0,
      max: 0.9 + Math.random() * 0.5
    };
  }

  function draw(now) {
    const t = now / 1000;
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;

    ctx.clearRect(0, 0, W, H);

    mouseX += (targetX - mouseX) * 0.045;
    mouseY += (targetY - mouseY) * 0.045;
    const px = mouseX * 16;
    const py = mouseY * 16;

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const twinkle = 0.7 + 0.3 * Math.sin(t * s.speed + s.phase);
      const alpha = Math.min(1, s.base * twinkle);

      const size = BASE_SIZE[s.bucket] * (0.6 + s.depth * 0.8);
      const x = s.x + px * s.depth;
      const y = s.y + py * s.depth;

      ctx.globalAlpha = alpha;
      ctx.drawImage(getSprite(s.tint, s.bucket), x - size / 2, y - size / 2, size, size);

      if (s.hasFlare) {
        const fs = size * 6;
        ctx.globalAlpha = alpha * 0.3;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.angle);
        ctx.drawImage(getFlare(), -fs / 2, -fs / 2, fs, fs);
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;

    if (!reduceMotion) {
      if (!shooting) {
        nextShot -= dt * 1000;
        if (nextShot <= 0) {
          spawnShooting();
          nextShot = 7000 + Math.random() * 12000;
        }
      } else {
        const p = shooting;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        const tailX = p.x - p.vx * 0.13;
        const tailY = p.y - p.vy * 0.13;
        const fade = Math.max(0, 1 - p.life / p.max);

        const grad = ctx.createLinearGradient(p.x, p.y, tailX, tailY);
        grad.addColorStop(0, 'rgba(255,255,255,0.95)');
        grad.addColorStop(0.35, 'rgba(190,220,255,0.32)');
        grad.addColorStop(1, 'rgba(190,220,255,0)');

        ctx.globalAlpha = fade;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.globalAlpha = fade * 0.85;
        ctx.drawImage(getSprite(0, 3), p.x - 8, p.y - 8, 16, 16);
        ctx.globalAlpha = 1;

        if (p.life > p.max || p.x < -300 || p.x > W + 300 || p.y > H + 300) {
          shooting = null;
        }
      }
    }
  }

  function loop(now) {
    draw(now);
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId !== null) cancelAnimationFrame(rafId);
    lastT = performance.now();

    if (reduceMotion) {
      draw(performance.now());
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  let resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      build();
      if (reduceMotion) draw(performance.now());
    }, 140);
  });

  window.addEventListener('pointermove', function (e) {
    targetX = (e.clientX / W) * 2 - 1;
    targetY = (e.clientY / H) * 2 - 1;
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (reduceMotion) return;
    if (document.hidden) stop();
    else start();
  });

  build();
  start();
})();
```

### Logo Animation

The brand mark uses a canvas-based animation with the same starfield rendering system.

**Properties:**
- Glow radius: 24px (header), 8px (navbar)
- Animation speed: 0.60
- Scale multiplier: 0.60
- Flare ratio: 6× the glow radius
- Twinkle base: 1.10
- Rotation base: 0.005 radians per frame
- Respects `prefers-reduced-motion`

**HTML:**
```html
<span class="logo-slot" aria-hidden="true">
  <canvas class="logo-canvas" id="headerStar"></canvas>
</span>
```

**CSS:**
```css
.logo-slot {
  position: relative;
  width: 0.42em;
  height: 0.42em;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  margin-right: 0.28em;
  opacity: 0;
  animation: fade-in 700ms ease-out 80ms forwards;
}

@keyframes fade-in {
  to { opacity: 1; }
}

.logo-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
```

**JavaScript Implementation (Exact):**
```javascript
function setupStar(canvas, glowRadius) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* How much bigger the flare is than the glow — 6× is the classic ratio,
     plus a 1.5× safety margin so the flare tips never clip. */
  const FLARE_RATIO = 6;
  const SAFETY = 1.5;
  const canvasSize = glowRadius * FLARE_RATIO * SAFETY;

  const SPEED = 0.60;             // animation speed (twinkle + rotation)
  const SCALE = 0.60;             // size multiplier
  const TWINKLE_BASE = 1.10;      // base twinkle rate
  const ROTATION_BASE = 0.005;    // base rotation per frame

  let dpr = Math.min(window.devicePixelRatio || 1, 3);
  let angle = 0;
  let phase = Math.random() * Math.PI * 2;
  let rafId = null;
  let startT = performance.now();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width  = Math.round(canvasSize * dpr);
    canvas.height = Math.round(canvasSize * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawFrame(now) {
    const t = (now - startT) / 1000;
    const cx = canvasSize / 2;
    const cy = canvasSize / 2;

    const twinkle = 0.7 + 0.3 * Math.sin(t * TWINKLE_BASE * SPEED + phase);
    const alpha = Math.min(1, 0.92 * twinkle);

    const r = glowRadius * SCALE;
    const flareSize = r * FLARE_RATIO;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.save();
    ctx.translate(cx, cy);

    /* 1. Faint halo — very subtle, pale blue */
    const haloRad = r * 2.8;
    const haloGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, haloRad);
    haloGrad.addColorStop(0.00, 'rgba(235, 245, 255, 0.16)');
    haloGrad.addColorStop(0.38, 'rgba(210, 228, 255, 0.05)');
    haloGrad.addColorStop(0.72, 'rgba(190, 215, 255, 0.02)');
    haloGrad.addColorStop(1.00, 'rgba(180, 210, 255, 0)');
    ctx.globalAlpha = alpha;
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(0, 0, haloRad, 0, Math.PI * 2);
    ctx.fill();

    /* 2. Soft glow */
    const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    glowGrad.addColorStop(0.00, 'rgba(255, 255, 255, 1)');
    glowGrad.addColorStop(0.14, 'rgba(255, 255, 255, 0.80)');
    glowGrad.addColorStop(0.38, 'rgba(255, 255, 255, 0.20)');
    glowGrad.addColorStop(0.72, 'rgba(255, 255, 255, 0.04)');
    glowGrad.addColorStop(1.00, 'rgba(255, 255, 255, 0)');
    ctx.globalAlpha = alpha;
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    /* 3. Bright white core */
    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(0.6, r * 0.15), 0, Math.PI * 2);
    ctx.fill();

    /* 4. Classic 4-point cross flare, rotating slowly */
    ctx.globalAlpha = alpha * 0.30;
    ctx.save();
    ctx.rotate(angle);
    const half = flareSize / 2;
    const thickness = Math.max(1.5, flareSize * 0.017);

    const hGrad = ctx.createLinearGradient(-half, 0, half, 0);
    hGrad.addColorStop(0,   'rgba(255, 255, 255, 0)');
    hGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
    hGrad.addColorStop(1,   'rgba(255, 255, 255, 0)');
    ctx.fillStyle = hGrad;
    ctx.fillRect(-half, -thickness / 2, flareSize, thickness);

    const vGrad = ctx.createLinearGradient(0, -half, 0, half);
    vGrad.addColorStop(0,   'rgba(255, 255, 255, 0)');
    vGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
    vGrad.addColorStop(1,   'rgba(255, 255, 255, 0)');
    ctx.fillStyle = vGrad;
    ctx.fillRect(-thickness / 2, -half, thickness, flareSize);

    ctx.restore();
    ctx.restore();

    if (!reduceMotion) angle += ROTATION_BASE * SPEED;
    rafId = requestAnimationFrame(drawFrame);
  }

  function start() {
    if (rafId !== null) cancelAnimationFrame(rafId);
    if (reduceMotion) {
      drawFrame(startT); // one static frame
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(drawFrame);
  }

  resize();
  start();

  /* Rebuild on resize (debounced) */
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); start(); }, 120);
  });

  document.addEventListener('visibilitychange', () => {
    if (reduceMotion) return;
    if (document.hidden) {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    } else {
      start();
    }
  });
}

/* Initialize */
setupStar(document.getElementById('headerStar'), 24);
```

### Font Loading

DM Serif Display is loaded from Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

The `ital@0;1` parameter loads both normal and italic weights.

### Complete Typography Scale

| Usage | Font | Size | Weight | Line Height | Letter Spacing |
|-------|------|------|--------|-------------|----------------|
| Homepage title | DM Serif Display | 8rem | 400 | 1 | 0.01em |
| Game page title | DM Serif Display | 4.5rem | 400 | 1 | 0.01em |
| Overlay title | DM Serif Display | 2.5rem | 400 | 1.2 | normal |
| Section heading | System UI | 1.1rem | 600 | 1.2 | 0.02em |
| Card title | System UI | 0.98rem | 600 | 1.2 | normal |
| Card description | System UI | 0.83rem | 400 | 1.5 | normal |
| Navigation link | System UI | 0.86rem | 600 | normal | normal |
| Button text | System UI | 0.86rem | 600 | normal | normal |
| Badge text | System UI | 0.62rem | 700 | normal | 0.09em |
| HUD score | DM Serif Display | 2rem | 400 | normal | normal |
| HUD label | System UI | 0.86rem | 600 | normal | 0.08em |
| Footer text | System UI | 0.82rem | 400 | normal | 0.01em |
| Overlay body | System UI | 1rem | 400 | 1.5 | normal |

### Complete Spacing Scale

| Value | Usage |
|-------|-------|
| 0.22rem | Badge padding |
| 0.28em | Logo mark gap |
| 0.35rem | Layout toggle margin |
| 0.5rem | Navigation link padding |
| 0.55rem | Compact button padding |
| 0.6rem | Brand mark gap |
| 0.65rem | Compact card gap |
| 0.68rem | Card vertical padding |
| 0.75rem | Input padding |
| 0.85rem | Grid gap |
| 0.9rem | Navigation link padding |
| 0.95rem | Topbar padding |
| 1rem | Standard button padding |
| 1.1rem | Section margin below header |
| 1.15rem | Card horizontal padding |
| 1.25rem | Panel padding |
| 1.5rem | Page padding (content pages) |
| 2rem | Page horizontal padding (homepage) |
| 2.25rem | Header margin (game pages) |
| 2.5rem | View switch margin |
| 3rem | Section margin between categories |
| 4rem | Page bottom padding |
| 7.5rem | Page top padding (homepage) |

### Complete Border Radius Scale

| Value | Name | Usage |
|-------|------|-------|
| 999px | Pill | Navigation cards, buttons, pills, back links |
| 18px | Panel | Overlay panels, game containers, tall layout cards |
| 12px | Chip | Icon chips, small rounded elements |
| 7px | Badge | Status badges |

### Z-Index Layers

| Value | Usage |
|-------|-------|
| 0 | Background nebula gradients |
| 1 | Starfield canvas |
| 5 | Footer |
| 10 | Main content |
| 40 | Topbar |
| 50 | Back links |
| 15 | Game controls (pause, exit) |
| 20 | Game overlays |

### Motion Durations

| Value | Usage |
|-------|-------|
| 300ms | Hover transitions |
| 420ms | Topbar scroll transition |
| 550ms | Enter/load animations |
| 1300ms | Header rule animation |

### Motion Easing

| Value | Usage |
|-------|-------|
| ease-in-out | Hover transitions |
| cubic-bezier(0.22, 1, 0.36, 1) | Enter animations (spring-like) |
| cubic-bezier(0.4, 0, 0.2, 1) | Topbar scroll |

### Breakpoints

| Value | Usage |
|-------|-------|
| 560px | Hide card descriptions |
| 600px | Single column grid (three-columns layout) |
| 768px | Mobile breakpoint (reduced padding) |
| 900px | Tablet breakpoint (2-column grid) |

---

## 4. Color System

### Background Colors

**Primary gradient (canonical):**
```css
background: radial-gradient(140% 100% at 50% -10%, #0b1150 0%, #050833 42%, #01030f 100%);
```

**Semantic tokens:**
- `--bg-1: #0b1150` — Lightest blue, top of gradient
- `--bg-2: #050833` — Mid blue-purple
- `--bg-3: #01030f` — Darkest, bottom of gradient

**Usage:**
- Always use this exact gradient for page backgrounds
- Do not use flat colors or different gradients
- The gradient creates the deep space atmosphere

### Glass Surface Colors

**Default glass:**
```css
--glass: rgba(9, 13, 38, 0.62);
```

**Hover glass:**
```css
--glass-hover: rgba(13, 19, 50, 0.72);
```

**Usage:**
- Primary surface for all cards, panels, buttons, and interactive elements
- Background for navigation cards, modals, overlays, and controls
- Use `--glass-hover` on hover/focus states
- Always combine with backdrop blur and glass shadow
- Never use opaque backgrounds for interactive surfaces

### Glass Effects

**Backdrop blur (canonical):**
```css
--glass-blur: blur(16px) saturate(160%);
backdrop-filter: var(--glass-blur);
```

**Inset highlight (canonical):**
```css
--glass-inset: inset 0 1px 0 rgba(255, 255, 255, 0.09);
```

**Drop shadow (canonical):**
```css
--glass-shadow: 0 18px 40px -26px rgba(0, 0, 0, 1);
```

**Combined usage:**
```css
background: var(--glass);
backdrop-filter: var(--glass-blur);
box-shadow: var(--glass-inset), var(--glass-shadow);
```

**Usage:**
- Apply to all glass surfaces
- The inset highlight creates a subtle top edge glow
- The shadow creates depth and separation from background
- The blur creates the signature glassmorphism effect
- The saturation boost (160%) enhances color vibrancy

### Border/Line Colors

**Default border:**
```css
--line: rgba(224, 242, 254, 0.16);
```

**Strong border:**
```css
--line-strong: rgba(224, 242, 254, 0.30);
```

**Usage:**
- `--line`: Default border for all glass surfaces (1px solid)
- `--line-strong`: Border on hover/focus states
- Also used for dividers and separators
- Never use solid white or gray borders
- The 0.16 opacity creates subtle definition

### Text Colors

**Primary text:**
```css
--ink: rgb(226, 240, 255);
```

**Secondary text:**
```css
--ink-dim: rgba(226, 240, 255, 0.60);
```

**Tertiary text:**
```css
--ink-faint: rgba(226, 240, 255, 0.38);
```

**Usage:**
- `--ink`: Headings, primary labels, card titles, active navigation
- `--ink-dim`: Descriptions, body text, inactive navigation, metadata
- `--ink-faint`: Very subtle text, timestamps, less important info
- Never use pure white (#fff) for text except in specific highlighted states
- The rgb() format for primary ensures exact color matching

### Category Accent Colors

**Games (cyan):**
```css
--accent-games: #4cc9f0;
```

**Tools (purple):**
```css
--accent-tools: #a78bfa;
```

**Study (green):**
```css
--accent-study: #34d399;
```

**Hacks (pink):**
```css
--accent-hacks: #fb7185;
```

**Guides (yellow):**
```css
--accent-guides: #fbbf24;
```

**Usage:**
- Icon chip backgrounds in navigation cards
- Category-specific branding elements
- Primary action buttons in category contexts
- Do not use for general decoration
- Each category has a specific accent color that must be respected
- These colors are functional, not arbitrary

### Category Accent Soft Colors

Derived from accent colors with 13% opacity:

```css
--accent-games-soft: rgba(76, 201, 240, 0.13);
--accent-tools-soft: rgba(167, 139, 250, 0.13);
--accent-study-soft: rgba(52, 211, 153, 0.13);
--accent-hacks-soft: rgba(251, 113, 133, 0.13);
--accent-guides-soft: rgba(251, 191, 36, 0.13);
```

**Usage:**
- Icon chip backgrounds when using category-specific soft colors
- Subtle category-specific glows or highlights
- Used when the full accent is too strong

### Status/Badge Colors

**Badge gradient (canonical):**
```css
background: linear-gradient(135deg, #ff5a5f, #d81f2a);
```

**Semantic tokens:**
```css
--badge-1: #ff5a5f; /* Light red */
--badge-2: #d81f2a; /* Dark red */
```

**Usage:**
- "New" badges on navigation items
- Status indicators
- Only for status indications, not general decoration
- Badge background with white text
- The gradient creates a premium feel

### Nebula Gradient Colors

**Three radial gradients (canonical):**
```css
background:
  radial-gradient(42% 34% at 16% 10%, rgba(70, 110, 255, 0.20), transparent 68%),
  radial-gradient(38% 30% at 86% 16%, rgba(150, 80, 255, 0.15), transparent 66%),
  radial-gradient(58% 42% at 52% 108%, rgba(0, 130, 230, 0.18), transparent 72%);
```

**Usage:**
- Fixed pseudo-element before body content
- Applied to `body::before` with `inset: -15%`
- Creates the animated nebula effect
- Always use these exact gradients and positions
- Filter with `blur(26px)`
- The different positions create depth

### Focus State Colors

**Focus outline (canonical):**
```css
outline: 2px solid rgba(224, 242, 254, 0.8);
outline-offset: 3px;
```

**Usage:**
- Focus-visible outline for all interactive elements
- 2px width provides visibility without overwhelming
- 3px offset provides spacing from element
- Do not use browser default focus styles
- The 0.8 opacity creates definition

### Color Hierarchy

1. **Background** — Deepest layer (#01030f → #050833 → #0b1150)
2. **Nebula** — Subtle color depth (15-20% opacity)
3. **Glass surfaces** — Semi-transparent overlays (62-72% opacity)
4. **Text primary** — High contrast (rgb(226, 240, 255))
5. **Text secondary** — Medium contrast (60% opacity)
6. **Text tertiary** — Low contrast (38% opacity)
7. **Accents** — Category-specific functional colors
8. **Borders** — Subtle definition (16-30% opacity)

### Contrast Strategy

- High contrast for primary text on dark backgrounds
- Category accents used with dark backgrounds for contrast
- Never use low contrast for important text
- Always maintain WCAG AA contrast ratios for text
- Glass surfaces maintain sufficient contrast with content

### Interactive State Colors

**Hover:**
- Background: `--glass-hover` (72% opacity)
- Border: `--line-strong` (30% opacity)
- Text: `--ink` (100% opacity, from dimmed)

**Focus:**
- Outline: `rgba(224, 242, 254, 0.8)`
- Background: `--glass-hover`
- Border: `--line-strong`

**Active:**
- Transform: translateY(0) (from -2px)
- Scale: 0.9 (for buttons only)

**Selected:**
- Not used in current implementation (could use stronger border or background)

**Disabled:**
- Not used in current implementation (could use reduced opacity)

### Overlay Colors

**Game overlay:**
```css
background: rgba(1, 3, 15, 0.85);
backdrop-filter: blur(12px);
```

**Usage:**
- Dims background to focus attention
- Semi-transparent black with blur
- Always with glass panel inside
- Fade in/out with opacity transition

### Gradient Usage

**Background gradient:**
- Always use the canonical radial gradient
- Do not use linear gradients for backgrounds
- The 140% 100% at 50% -10% creates the space atmosphere

**Badge gradient:**
- Linear gradient 135deg
- Light to dark red
- Creates premium feel

**Nebula gradients:**
- Three radial gradients
- Different positions create depth
- Always with blur(26px)

**Do not introduce:**
- Random gradients
- Unused gradient directions
- Arbitrary gradient colors
- Gradient overlays without purpose

### Glow Effects

**Heading glow:**
```css
text-shadow: 0 0 60px rgba(120, 170, 255, 0.28);
```

**Rating star glow:**
```css
text-shadow: 0 0 22px rgba(160, 200, 255, 0.45);
```

**HUD score glow:**
```css
text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
```

**Usage:**
- Glow is used sparingly, only on important elements
- Do not add text shadows to body text or UI elements
- The blur radius determines glow spread
- The opacity determines glow intensity

### Transparency Strategy

**Glass surfaces:**
- Default: 62% opacity
- Hover: 72% opacity
- Creates subtle contrast on interaction

**Nebula gradients:**
- 15-20% opacity
- Creates subtle color depth
- Never opaque

**Text:**
- Primary: 100% opacity
- Secondary: 60% opacity
- Tertiary: 38% opacity
- Creates hierarchy

**Overlays:**
- Game overlay: 85% opacity
- Dim but not opaque
- Allows some background visibility

**Do not:**
- Use opaque backgrounds for interactive surfaces
- Use fully transparent backgrounds without glassmorphism
- Randomly vary opacity without reason

---

## 5. Typography

### Font Families

**Display font (canonical):**
```css
--font-display: 'DM Serif Display', Georgia, serif;
```

**UI font (canonical):**
```css
--font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Helvetica, Arial, sans-serif;
```

**Font loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

**Usage:**
- `--font-display`: All headings (h1-h6), display text, large titles
- `--font-ui`: Body text, UI labels, buttons, navigation, descriptions
- Always load DM Serif Display from Google Fonts
- Use Georgia as serif fallback
- The system font stack ensures native feel on each platform

### Heading Hierarchy

**Homepage title:**
- Font: DM Serif Display
- Size: 8rem
- Weight: 400 (normal)
- Line height: 1
- Letter spacing: 0.01em
- Color: #fff
- Text shadow: 0 0 60px rgba(120, 170, 255, 0.28)
- Usage: Main "DUB5" logo on homepage

**Game page title:**
- Font: DM Serif Display
- Size: 4.5rem
- Weight: 400 (normal)
- Line height: 1
- Letter spacing: 0.01em
- Color: #fff
- Text shadow: 0 0 60px rgba(120, 170, 255, 0.28)
- Usage: Game titles on game pages

**Overlay title:**
- Font: DM Serif Display
- Size: 2.5rem
- Weight: 400 (normal)
- Line height: 1.2
- Letter spacing: normal
- Color: var(--ink)
- Usage: Modal/overlay titles

**Section heading:**
- Font: System UI
- Size: 1.1rem
- Weight: 600
- Line height: 1.2
- Letter spacing: 0.02em
- Color: var(--ink)
- Usage: Category section headers

**Card title:**
- Font: System UI
- Size: 0.98rem
- Weight: 600
- Line height: 1.2
- Letter spacing: normal
- Color: var(--ink)
- Usage: Navigation card titles

**Rules:**
- Headings always use DM Serif Display
- Font weight is always 400 (normal) for display headings
- Larger headings use letter-spacing for elegance
- Never bold DM Serif Display
- System UI for smaller headings (sections, cards)

### Body Text

**Card description:**
- Font: System UI
- Size: 0.83rem
- Weight: 400
- Line height: 1.5
- Color: var(--ink-dim)
- Usage: Navigation card descriptions

**Navigation link:**
- Font: System UI
- Size: 0.86rem
- Weight: 600
- Line height: normal
- Color: var(--ink-dim) → #fff on hover
- Usage: Topbar navigation

**Button text:**
- Font: System UI
- Size: 0.86rem
- Weight: 600
- Line height: normal
- Color: var(--ink)
- Usage: Button labels

**Label/metadata:**
- Font: System UI
- Size: 0.8rem
- Weight: 500
- Line height: normal
- Color: var(--ink-dim)
- Usage: Section counts, tags

**Badge text:**
- Font: System UI
- Size: 0.62rem
- Weight: 700
- Line height: normal
- Color: #fff
- Text transform: uppercase
- Letter spacing: 0.09em
- Usage: Status badges

**Footer text:**
- Font: System UI
- Size: 0.82rem
- Weight: 400
- Line height: normal
- Letter spacing: 0.01em
- Color: var(--ink-dim)
- Usage: Footer content

**Overlay body:**
- Font: System UI
- Size: 1rem
- Weight: 400
- Line height: 1.5
- Color: var(--ink-dim)
- Usage: Modal/overlay content

**HUD label:**
- Font: System UI
- Size: 0.86rem
- Weight: 600
- Line height: normal
- Text transform: uppercase
- Letter spacing: 0.08em
- Color: var(--ink-dim)
- Usage: Game HUD labels

**Rules:**
- UI text always uses system font stack
- Font weight 600 for interactive elements
- Font weight 400 for body content
- Font weight 700 for badges and emphasis
- Always use var(--ink-dim) for secondary text

### Text Transformations

**Uppercase with letter-spacing:**
- Badges: uppercase with 0.09em letter-spacing
- HUD labels: uppercase with 0.08em letter-spacing
- Brand mark: uppercase with 0.14em letter-spacing

**Normal case with letter-spacing:**
- Section headings: normal case with 0.02em letter-spacing
- Homepage title: normal case with 0.01em letter-spacing
- Game title: normal case with 0.01em letter-spacing

**Rules:**
- Never uppercase body text or headings
- Uppercase only for badges, labels, and brand
- Letter-spacing adds elegance to uppercase text
- Minimal letter-spacing for normal case

### Italic Usage

- DM Serif Display italic is available but rarely used
- Only use italic for specific emphasis or decorative purposes
- Not used in current implementation

### Text Shadows

**Large headings:**
```css
text-shadow: 0 0 60px rgba(120, 170, 255, 0.28);
```

**Rating stars:**
```css
text-shadow: 0 0 22px rgba(160, 200, 255, 0.45);
```

**HUD scores:**
```css
text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
```

**Rules:**
- Do not add text shadows to body text or UI elements
- Glow is used sparingly, only on important elements
- The blur radius determines glow spread
- The opacity determines glow intensity

### Responsive Typography

**Mobile (below 768px):**
- Homepage title: 4.5rem (from 8rem)
- Rating stars: 1.35rem (from 1.9rem)
- Navigation links: 0.82rem (from 0.86rem)
- Body text: no change
- Buttons: no change

**Tablet (768px - 900px):**
- Intermediate title size
- No specific changes documented

**Desktop (above 900px):**
- Full heading sizes
- Full body text sizes

**Rules:**
- Large headings scale down on mobile
- Body text remains consistent
- Interactive elements remain usable
- Never scale below readable sizes

---

## 6. Layout

### Page Container (Homepage)

**Canonical implementation:**
```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 7.5rem 2rem 3rem;
  position: relative;
  z-index: 10;
}
```

**Usage:**
- Main content wrapper on homepage
- Centers content with max-width
- Top padding accounts for fixed topbar
- Relative positioning for z-index layering
- Do not change max-width without reason

### Page Wrapper (Game/Content Pages)

**Canonical implementation:**
```css
.page {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem 4rem;
}
```

**Usage:**
- Used on game pages and content pages
- Centers content with flexbox
- Less top padding than homepage (no large title)
- Min-height ensures full viewport coverage
- Relative for z-index layering

### Grid System

**Canonical implementation:**
```css
.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 0.85rem;
  max-width: 1280px;
  margin: 0 auto;
}
```

**Usage:**
- Navigation card grid on homepage
- Auto-fill with 340px minimum card width
- 0.85rem gap between cards
- Max-width constrained to 1280px
- Centered with auto margins
- Do not change minmax without reason

### Content Alignment

**Homepage:**
- Centered layout with centered header
- Grid centered with max-width
- Title centered
- Content flows naturally

**Game pages:**
- Left-aligned content with centered page wrapper
- Game header left-aligned
- Game canvas centered
- Content flows naturally

**Navigation:**
- Centered grid
- Section headers flex row with space-between
- Cards left-aligned within grid

### Max-Widths

| Element | Max-Width | Usage |
|---------|-----------|-------|
| Page container | 1400px | Homepage content |
| Navigation grid | 1280px | Card grid |
| Header rule | 1280px | Decorative line |
| Game header | 960px | Game page headers |
| Overlay panel | 400px | Modal/overlay content |

**Rules:**
- Respect these max-widths
- Do not arbitrarily increase max-widths
- Center with auto margins
- Full-width backgrounds, contained content

### Section Spacing

**Canonical implementation:**
```css
.cat-section + .cat-section { margin-top: 3rem; }
.section-head { margin: 0 auto 1.1rem; }
```

**Usage:**
- 3rem margin between category sections
- 1.1rem margin below section headers
- Consistent vertical rhythm
- Do not compress spacing

### Content Density

- Generous spacing throughout
- Cards have padding of 0.68rem 1.15rem
- Grid gaps of 0.85rem
- Section margins of 3rem
- Not cramped despite rich visual effects
- Whitespace is intentional

### Whitespace Philosophy

- Whitespace is a design element, not empty space
- Generous margins and padding create breathing room
- Spacing is intentional and consistent
- Never compress spacing to fit more content
- Rhythm creates visual harmony

### Positioning Conventions

**Fixed:**
- Topbar (always at top)
- Back buttons (top-left)
- Starfield (full viewport)
- Nebula gradients (full viewport with inset)

**Relative:**
- Main content containers
- Page wrappers
- Content sections

**Absolute:**
- Overlays
- HUD elements
- Glow effects
- Brand canvas

**Rules:**
- Respect z-index layering
- Fixed elements for navigation
- Relative for content flow
- Absolute for overlays

### Full-Width vs Contained

**Full-width:**
- Backgrounds (inset: -15% for nebula)
- Gradients
- Starfield canvas

**Contained:**
- Content (max-width)
- Grids (max-width)
- Cards (within grid)

**Rules:**
- Backgrounds always full-width
- Content always contained
- Never make content full-width without reason

---

## 7. Spacing

### Spacing Scale

The following scale represents all recurring spacing values in DUB5:

| Value | Usage | Context |
|-------|-------|---------|
| 0.22rem | Badge padding | Small badges |
| 0.28em | Title gap | Logo mark spacing |
| 0.35rem | Button gap | Layout toggle margin |
| 0.5rem | Navigation padding | Topbar links |
| 0.55rem | Button padding | Compact buttons |
| 0.6rem | Brand gap | Logo spacing |
| 0.65rem | Card gap | Compact cards |
| 0.68rem | Card padding | Navigation cards (vertical) |
| 0.75rem | Input padding | Form inputs |
| 0.85rem | Grid gap | Navigation grid |
| 0.9rem | Navigation padding | Topbar links |
| 0.95rem | Topbar padding | Header spacing |
| 1rem | Button padding | Standard buttons |
| 1.1rem | Section margin | Below headers |
| 1.15rem | Card padding | Navigation cards (horizontal) |
| 1.25rem | Panel padding | Overlay panels |
| 1.5rem | Page padding | Game pages |
| 2rem | Page padding | Homepage horizontal |
| 2.25rem | Header margin | Below game header |
| 2.5rem | Switch margin | View switch bar |
| 3rem | Section margin | Between categories |
| 4rem | Page padding | Bottom padding |
| 7.5rem | Page padding | Homepage top |

### Common Padding Values

**Cards:**
- Navigation cards: 0.68rem 1.15rem 0.68rem 0.68rem
- Horizontal: 1.15rem
- Vertical: 0.68rem

**Buttons:**
- View switch: 0.55rem 1.4rem
- Game buttons: 14px 28px
- Compact: 0.55rem 0.9rem

**Inputs:**
- Search/filter: 0.75rem 1rem

**Panels:**
- Overlay panels: 1.25rem (32px 40px in game.css)

**Pages:**
- Content pages: 3rem 1.5rem 4rem
- Homepage: 7.5rem 2rem 3rem

### Common Margins

**Between sections:**
- Category sections: 3rem

**Below headers:**
- Section headers: 1.1rem
- Game header: 2.25rem

**Below title:**
- Game subline: 0.85rem

**Below view switch:**
- 2.5rem

### Gap Values

**Grid gap:**
- Navigation grid: 0.85rem

**Card internal gap:**
- Icon to title: 0.8rem

**Navigation gap:**
- Topbar links: 0.15rem

**Button gap:**
- Overlay actions: 1rem

**Section pill gap:**
- 8px

### Section Spacing

- Category sections: 3rem between sections
- Section headers: 1.1rem below header
- Content within sections: follow grid spacing

### Component Internal Spacing

**Card:**
- Gap between icon, title, description, arrow: 0.8rem

**Badge:**
- Padding: 0.22rem 0.5rem

**Icon chip:**
- Centered with grid

**Buttons:**
- Padding based on size

### Grid Gaps

- Navigation grid: 0.85rem
- Compact grid: same gap, smaller cards
- List layout: 0.5rem gap

### Navigation Spacing

- Topbar links: 0.15rem gap
- Topbar padding: 0.95rem 1.5rem
- Layout toggle: 0.35rem margin-left

### Mobile Spacing

- Mobile container: 6.5rem 1.25rem 2rem
- Mobile topbar: 1.1rem horizontal
- Mobile navigation: 0.5rem 0.55rem

### Spacing Rules

- Follow the documented scale
- Do not invent new spacing values
- Use the closest value when uncertain
- Consistent spacing creates rhythm
- Generous spacing is intentional

---

## 8. Shapes and Geometry

### Border Radius Scale

**Canonical values:**
```css
--r-pill: 999px;    /* Pill/fully rounded */
--r-panel: 18px;    /* Panels/containers */
--r-chip: 12px;     /* Icon chips/small elements */
--r-badge: 7px;     /* Badges */
```

**Usage:**
- `--r-pill`: Navigation cards, buttons, pills, back links
- `--r-panel`: Overlay panels, game containers, tall layout cards
- `--r-chip`: Icon chips, small rounded elements
- `--r-badge`: Status badges

### Corner Styles

**Pill (999px):**
- Navigation cards
- Buttons
- Pills
- Back links
- View switch

**Rounded (18px):**
- Panels
- Modals
- Larger containers
- Tall layout cards

**Soft rounded (12px):**
- Icon chips
- Small rounded elements

**Subtle rounded (7px):**
- Badges

**Rules:**
- No sharp corners in the design
- All shapes are symmetric
- Consistent rounding across all elements

### Border Thickness

- Default borders: 1px solid
- No borders thicker than 1px
- Border color always from `--line` or `--line-strong`
- Never use borders without glassmorphism

### Divider Styles

**Header rule (canonical):**
```css
.header-rule {
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(190, 215, 255, 0) 0%,
    rgba(190, 215, 255, 0.35) 12%,
    rgba(214, 232, 255, 0.72) 50%,
    rgba(190, 215, 255, 0.35) 88%,
    rgba(190, 215, 255, 0) 100%
  );
}
```

**Usage:**
- Gradient line, not solid
- Fades in and out
- Bright center, dim edges
- No vertical dividers
- No solid dividers

### Pills

**Canonical implementation:**
```css
border-radius: var(--r-pill); /* 999px */
```

**Used for:**
- Navigation cards
- Buttons
- Pills
- View switch
- Back links

**Rules:**
- Always with glassmorphism
- Always with hover state
- Never square or sharp

### Circular Elements

**Brand mark:**
- 18px × 18px display
- 72px × 72px canvas (4x scale)

**Logo canvas:**
- Absolute positioning
- Scaled with transform

**Icon chips:**
- 40px × 40px
- Rounded (12px radius), not circular

**Rules:**
- No perfectly circular interactive elements
- Icon chips are rounded rectangles
- Brand mark is circular for logo only

### Square vs Rounded Controls

- All controls are pill-shaped (999px radius)
- Icon chips are rounded rectangles (12px radius)
- No square controls
- No sharp corners anywhere

### Asymmetric Shapes

- Not used in current implementation
- All shapes are symmetric
- Consistent rounding across all elements

### Shape Hierarchy

1. **Pill (999px)** — Primary interactive elements
2. **Rounded (18px)** — Containers and panels
3. **Soft rounded (12px)** — Small elements
4. **Subtle rounded (7px)** — Badges

**Rules:**
- Respect the hierarchy
- Use appropriate radius for element size
- Consistent rounding creates harmony

---

## 9. Elevation and Depth

### Box Shadows

**Canonical glass shadow:**
```css
--glass-shadow: 0 18px 40px -26px rgba(0, 0, 0, 1);
```

**Usage:**
- Applied to all glass surfaces
- Creates depth and separation from background
- Negative vertical offset (-26px) creates shadow below element
- Always combined with `--glass-inset`

### Shadow Strength

**Strong:**
- Used for glass surfaces
- Value: 0 18px 40px -26px rgba(0, 0, 0, 1)

**Subtle:**
- Used for badges
- Value: 0 6px 18px -8px rgba(216, 31, 42, 0.95)

**Rules:**
- No weak shadows
- Consistent shadow strength
- Negative vertical offset for glass surfaces

### Blur

**Canonical glass blur:**
```css
--glass-blur: blur(16px) saturate(160%);
```

**Usage:**
- Applied to all glass surfaces
- 16px blur with 160% saturation boost
- Creates the signature glassmorphism effect
- Must be applied to all interactive surfaces

**Other blur values:**
- Game overlays: blur(12px)
- Topbar: blur(18px) saturate(170%)
- Nebula: blur(26px)

**Rules:**
- Different blur amounts for different contexts
- Glass surfaces always use 16px
- Saturation boost enhances color vibrancy

### Surface Layering

**Z-index hierarchy:**
```
0: Background nebula gradients
1: Starfield canvas
5: Footer
10: Main content
40: Topbar
50: Back links
15: Game controls (pause, exit)
20: Game overlays
```

**Usage:**
- Background at z-index 0-1
- Content at z-index 10
- Navigation at z-index 40-50
- Overlays at z-index 20+
- Always respect this layering

### Borders Used Instead of Shadows

- Borders are always used WITH shadows, not instead
- 1px border from `--line` creates edge definition
- Border strengthens on hover to `--line-strong`
- Never use borders alone for depth

### Background Contrast

**Glass surfaces:**
- Default: 62% opacity (rgba(9, 13, 38, 0.62))
- Hover: 72% opacity (rgba(13, 19, 50, 0.72))
- Creates subtle contrast on interaction
- Never use opaque backgrounds

**Rules:**
- Always use transparency for depth
- Consistent opacity values
- Hover increases opacity

### Transparency

**Glass:**
- Default: 62% opacity
- Hover: 72% opacity

**Nebula gradients:**
- 15-20% opacity

**Overlays:**
- Game overlay: 85% opacity

**Rules:**
- Always use transparency for depth
- Consistent opacity creates harmony
- Never opaque for interactive surfaces

### Backdrop Blur

**All glass surfaces:**
```css
backdrop-filter: blur(16px) saturate(160%);
```

**Game overlays:**
```css
backdrop-filter: blur(12px);
```

**Topbar:**
```css
backdrop-filter: blur(18px) saturate(170%);
```

**Rules:**
- Different blur amounts for different contexts
- Saturation boost for vibrancy
- Always apply to glass surfaces

### Glass Effects

**Canonical combination:**
```css
background: var(--glass);
backdrop-filter: var(--glass-blur);
box-shadow: var(--glass-inset), var(--glass-shadow);
border: 1px solid var(--line);
```

**Usage:**
- Always combine all four properties
- The glass effect is the signature of DUB5
- Never use opacity alone for depth
- Never skip the inset highlight

### Overlays

**Canonical implementation:**
```css
.game-overlay {
  background: rgba(1, 3, 15, 0.85);
  backdrop-filter: blur(12px);
}
```

**Usage:**
- Dim background to focus attention
- Semi-transparent black with blur
- Always with glass panel inside
- Fade in/out with opacity transition

### Glow Effects

**Heading glow:**
```css
text-shadow: 0 0 60px rgba(120, 170, 255, 0.28);
```

**Rating star glow:**
```css
text-shadow: 0 0 22px rgba(160, 200, 255, 0.45);
```

**HUD score glow:**
```css
text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
```

**Rules:**
- Glow is used sparingly
- Only on important elements
- Blur radius determines spread
- Opacity determines intensity

### When Depth Should Be Used

**Always use depth on:**
- Interactive elements
- Cards and panels
- Buttons
- Navigation items

**Never use depth on:**
- Static text
- Backgrounds
- Non-interactive elements

**Rules:**
- Depth creates visual hierarchy
- Don't overuse depth effects
- Consistent depth creates harmony

### When Depth Should Not Be Used

- Static text: no shadows
- Backgrounds: no shadows
- Non-interactive elements: no shadows
- Don't overuse depth effects

---

## 10. Components

This section documents every major recurring component in DUB5. For each component, the complete visual specification is provided.

### Navigation Card (Primary Card)

**Purpose:**
- Primary navigation element
- Links to content sections
- Groups related content

**Structure:**
- Flex row layout
- Icon chip on left
- Title next
- Description right
- Badge if applicable
- Arrow on far right

**Dimensions:**
- Width: Auto (grid-controlled)
- Height: Auto
- Min-width: 340px (in grid)
- Padding: 0.68rem 1.15rem 0.68rem 0.68rem

**Spacing:**
- Gap between elements: 0.8rem
- Grid gap: 0.85rem

**Typography:**
- Title: 0.98rem, font-weight 600, color var(--ink)
- Description: 0.83rem, font-weight 400, color var(--ink-dim)

**Colors:**
- Background: var(--glass)
- Border: 1px solid var(--line)
- Text: var(--ink) for title, var(--ink-dim) for description

**Border:**
- 1px solid var(--line)
- Hover: 1px solid var(--line-strong)

**Radius:**
- 999px (pill)

**Shadow:**
- var(--glass-inset), var(--glass-shadow)

**Icons:**
- Icon chip: 40px × 40px, 12px radius
- Icon: 20px × 20px SVG
- Arrow: 16px × 16px SVG

**Alignment:**
- Flex row, left-aligned
- Icon left, title next, description right, arrow far right

**Hover state:**
- Background: var(--glass-hover)
- Border: var(--line-strong)
- Transform: translateY(-2px)
- Icon chip: scale(1.05)
- Title: translateX(2px)
- Arrow: translate(2px, -2px), color #fff

**Active state:**
- Not used (links are always active)

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Below 560px: hide description
- Below 900px: single column grid
- Compact layout: hide description always

**Canonical implementation:**
```css
.nav-button {
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
```

### Icon Chip

**Purpose:**
- Category indicator
- Visual icon container
- Color coding

**Structure:**
- Square container
- Centered icon

**Dimensions:**
- 40px × 40px

**Spacing:**
- Centered with CSS grid

**Typography:**
- Icon: 20px × 20px SVG

**Colors:**
- Background: Category-specific accent color
- Icon: var(--bg-3) (dark contrast)

**Border:**
- No border
- Inset shadow: inset 0 1px 0 rgba(255, 255, 255, 0.13)

**Radius:**
- 12px

**Shadow:**
- Inset highlight only

**Icons:**
- 20px × 20px SVG
- Stroke-based
- Stroke width: 1.7

**Alignment:**
- Centered both axes

**Hover state:**
- Transform: scale(1.05)

**Active state:**
- Not used

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Scales with parent card

**Canonical implementation:**
```css
.icon-chip {
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

.icon-chip svg {
  width: 20px;
  height: 20px;
}
```

### Badge (Status)

**Purpose:**
- Status indicator ("New")
- Highlight important items

**Structure:**
- Inline text element

**Dimensions:**
- Auto width
- Auto height

**Spacing:**
- Padding: 0.22rem 0.5rem
- Margin-left: 8px

**Typography:**
- 0.62rem, font-weight 700, uppercase, letter-spacing 0.09em

**Colors:**
- Background: linear-gradient(135deg, var(--badge-1), var(--badge-2))
- Text: #fff

**Border:**
- No border
- Box shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 6px 18px -8px rgba(216, 31, 42, 0.95)

**Radius:**
- 7px

**Shadow:**
- Inset highlight + drop shadow

**Icons:**
- None

**Alignment:**
- Inline with text

**Hover state:**
- Not used (static)

**Active state:**
- Not used

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Scales with parent

**Canonical implementation:**
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

### Button (Primary - Game)

**Purpose:**
- Primary action in game context
- Start game, restart, etc.

**Structure:**
- Pill-shaped button
- Text label

**Dimensions:**
- Auto width
- Min-width for usability

**Spacing:**
- Padding: 14px 28px

**Typography:**
- 0.86rem, font-weight 600

**Colors:**
- Background: var(--accent-games) for primary, var(--glass) for secondary
- Text: var(--bg-3) for primary, var(--ink) for secondary
- Border: same as background for primary, var(--line) for secondary

**Border:**
- 1px solid var(--line) (secondary) or accent color (primary)

**Radius:**
- 999px (pill)

**Shadow:**
- var(--glass-inset), var(--glass-shadow)

**Icons:**
- None (text only)

**Alignment:**
- Centered text

**Hover state:**
- Background: var(--glass-hover) (secondary) or brightness(1.1) (primary)
- Border: var(--line-strong) (secondary)
- Transform: translateY(-2px)

**Active state:**
- Transform: translateY(0)

**Focus state:**
- Outline: 2px solid rgba(224, 242, 254, 0.8), offset 3px

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Full width on mobile

**Canonical implementation:**
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

.game-btn.primary {
  background: var(--accent-games);
  color: var(--bg-3);
  border-color: var(--accent-games);
}

.game-btn.primary:hover {
  filter: brightness(1.1);
}
```

### Button (Icon Only - Pause/Exit)

**Purpose:**
- Game controls
- Pause, exit, settings

**Structure:**
- Circular or pill-shaped
- Icon only

**Dimensions:**
- Pause: 44px × 44px
- Exit: pill with text

**Spacing:**
- Pause: centered
- Exit: 10px 20px

**Typography:**
- Pause: 20px × 20px icon
- Exit: 0.83rem, font-weight 600

**Colors:**
- Background: var(--glass)
- Text/icon: var(--ink) or var(--ink-dim)

**Border:**
- 1px solid var(--line)

**Radius:**
- 999px (pill)

**Shadow:**
- var(--glass-inset), var(--glass-shadow)

**Icons:**
- 20px × 20px SVG

**Alignment:**
- Centered

**Hover state:**
- Background: var(--glass-hover)
- Border: var(--line-strong)
- Transform: translateY(-2px)
- Text color: var(--ink) (for exit button)

**Active state:**
- Not used

**Focus state:**
- Outline: 2px solid rgba(224, 242, 254, 0.8), offset 3px

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Scales appropriately

**Canonical implementation:**
```css
.pause-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--line);
  border-radius: 999px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 300ms ease-in-out,
              border-color 300ms ease-in-out,
              transform 300ms ease-in-out;
}

.pause-btn:hover {
  background: var(--glass-hover);
  border-color: var(--line-strong);
  transform: translateY(-2px);
}
```

### Back Link (Fixed)

**Purpose:**
- Navigation back to previous page
- Fixed position for easy access

**Structure:**
- Pill-shaped link
- Icon + text

**Dimensions:**
- Auto width

**Spacing:**
- Padding: 0.5rem 1rem
- Gap: 0.5rem

**Typography:**
- 0.84rem, font-weight 600
- Icon: 14px × 14px

**Colors:**
- Background: var(--glass)
- Text: var(--ink-dim)
- Icon: var(--ink-dim)

**Border:**
- 1px solid var(--line)

**Radius:**
- 999px (pill)

**Shadow:**
- var(--glass-inset), var(--glass-shadow)

**Icons:**
- 14px × 14px SVG

**Alignment:**
- Flex row, left-aligned

**Hover state:**
- Color: #fff
- Border: var(--line-strong)
- Transform: translateY(-2px)
- Background: var(--glass-hover)

**Active state:**
- Not used

**Focus state:**
- Outline: 2px solid rgba(224, 242, 254, 0.8), offset 3px

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Fixed position at top-left

**Canonical implementation:**
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
```

### Input (Search/Filter)

**Purpose:**
- Search input
- Filter dropdowns

**Structure:**
- Pill-shaped input
- Text field

**Dimensions:**
- Auto width
- Flex: 1

**Spacing:**
- Padding: 0.75rem 1rem

**Typography:**
- 0.9rem

**Colors:**
- Background: var(--glass)
- Text: var(--ink)
- Placeholder: var(--ink-dim)

**Border:**
- 1px solid var(--line)

**Radius:**
- 18px (panel)

**Shadow:**
- var(--glass-inset), var(--glass-shadow)

**Icons:**
- Not used in current implementation

**Alignment:**
- Left-aligned text

**Hover state:**
- Border: var(--line-strong)
- Background: var(--glass-hover)

**Focus state:**
- Border: var(--line-strong)
- Background: var(--glass-hover)
- Outline: none (custom focus style)

**Active state:**
- Same as focus

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Full width on mobile

**Canonical implementation:**
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

.search-input:focus {
  border-color: var(--line-strong);
  background: var(--glass-hover);
}
```

### Select (Filter Dropdown)

**Purpose:**
- Filter dropdowns
- Category selection

**Structure:**
- Pill-shaped select
- Dropdown options

**Dimensions:**
- Auto width

**Spacing:**
- Padding: 0.75rem 1rem

**Typography:**
- 0.9rem

**Colors:**
- Background: var(--glass)
- Text: var(--ink)
- Options: var(--bg-3) background, var(--ink) text

**Border:**
- 1px solid var(--line)

**Radius:**
- 18px (panel)

**Shadow:**
- var(--glass-inset), var(--glass-shadow)

**Icons:**
- Not used in current implementation

**Alignment:**
- Left-aligned text

**Hover state:**
- Border: var(--line-strong)
- Background: var(--glass-hover)

**Focus state:**
- Border: var(--line-strong)
- Background: var(--glass-hover)
- Outline: none

**Active state:**
- Same as focus

**Selected state:**
- Not used (browser default)

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Full width on mobile

**Canonical implementation:**
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

### Overlay Panel (Modal)

**Purpose:**
- Game overlay panel
- Modal content
- Centered dialog

**Structure:**
- Panel container
- Title
- Body text
- Actions

**Dimensions:**
- Max-width: 400px
- Width: 90%

**Spacing:**
- Padding: 32px 40px

**Typography:**
- Title: 2.5rem, DM Serif Display, font-weight 400
- Body: 1rem, var(--ink-dim), line-height 1.5

**Colors:**
- Background: var(--glass)
- Text: var(--ink) for title, var(--ink-dim) for body

**Border:**
- 1px solid var(--line)

**Radius:**
- 18px (panel)

**Shadow:**
- var(--glass-inset), var(--glass-shadow)

**Icons:**
- Not used

**Alignment:**
- Centered text

**Hover state:**
- Not used (static)

**Active state:**
- Not used

**Focus state:**
- Not used

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- 90% width on mobile

**Canonical implementation:**
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
```

### Game HUD (Heads-Up Display)

**Purpose:**
- Game score display
- Game labels
- In-game information

**Structure:**
- Full-width overlay
- Score
- Label

**Dimensions:**
- Full-width

**Spacing:**
- Padding: 16px 20px

**Typography:**
- Score: 2rem, DM Serif Display, font-weight 400
- Label: 0.86rem, font-weight 600, uppercase, letter-spacing 0.08em

**Colors:**
- Score: var(--ink)
- Label: var(--ink-dim)

**Border:**
- None

**Radius:**
- None

**Shadow:**
- Score: 0 2px 8px rgba(0, 0, 0, 0.5)

**Icons:**
- Not used

**Alignment:**
- Flex row, space-between

**Hover state:**
- Not used (pointer-events: none)

**Active state:**
- Not used

**Focus state:**
- Not used

**Selected state:**
- Not used

**Disabled state:**
- Not used

**Loading state:**
- Not used

**Error state:**
- Not used

**Responsive behavior:**
- Full width always

**Canonical implementation:**
```css
.game-hud {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.hud-score {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--ink);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.hud-label {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ink-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

---

## 11. Navigation

### Header (Topbar)

**Purpose:**
- Primary navigation
- Brand display
- Layout controls

**Position:**
- Fixed at top
- z-index: 40
- Full width

**Dimensions:**
- Height: auto (based on padding)
- Padding: 0.95rem 1.5rem (scrolled: 0.55rem)

**Background:**
- Initially transparent
- On scroll: rgba(6, 9, 28, 0.55) with blur(18px) saturate(170%)
- Border-bottom: 1px solid rgba(224, 242, 254, 0.12)
- Box-shadow: 0 24px 50px -40px rgba(0, 0, 0, 1)

**Typography:**
- Brand: 1.05rem, DM Serif Display, uppercase, letter-spacing 0.14em
- Links: 0.86rem, font-weight 600

**Colors:**
- Brand: #fff
- Links: var(--ink-dim) → #fff on hover

**Icons:**
- Brand mark: 18px × 18px with 72px × 72px canvas
- Layout toggle: 32px × 32px, 18px × 18px icon

**Spacing:**
- Brand gap: 0.6rem
- Link gap: 0.15rem
- Layout toggle margin: 0.35rem

**Active item styling:**
- Not used (links are always active)
- Current page indicated by URL, not visual state

**Hover behavior:**
- Links: color #fff, no background change
- Layout toggle: color #fff, scale(0.9) on active

**Selected state:**
- Not used

**Icons:**
- Brand mark: animated canvas
- Layout toggle: static SVG

**Labels:**
- Brand: "DUB5"
- Links: category names

**Collapse behavior:**
- Not used (always visible)

**Mobile navigation behavior:**
- Same as desktop (horizontal scroll)
- Reduced padding: 1.1rem horizontal
- Smaller font: 0.82rem

**Sticky/fixed positioning:**
- Always fixed at top
- Becomes opaque on scroll

**Canonical implementation:**
```css
.topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 40;
}

.topbar::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background: rgba(6, 9, 28, 0.55);
  backdrop-filter: blur(18px) saturate(170%);
  border-bottom: 1px solid rgba(224, 242, 254, 0.12);
  box-shadow: 0 24px 50px -40px rgba(0, 0, 0, 1);
  transition: opacity 420ms cubic-bezier(0.4, 0, 0.2, 1);
}

.topbar.is-scrolled::before { opacity: 1; }

.topbar-inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.95rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.topbar-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: #fff;
  font-family: 'DM Serif Display', serif;
  font-size: 1.05rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.topbar-link {
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ink-dim);
  padding: 0.5rem 0.85rem;
  transition: color 300ms ease;
}

.topbar-link:hover {
  color: #fff;
}
```

---

## 12. Forms and Inputs

This section documents form elements and input behaviors.

### Field Structure

**Label:**
- Above input
- Same color as secondary text
- Font-weight 600

**Input:**
- Glassmorphism surface
- Pill-shaped (18px radius)
- 1px border

**Helper text:**
- Below input
- Tertiary text color
- Smaller font

**Error message:**
- Below input
- Error color (not defined in current implementation)

### Input Dimensions

**Standard input:**
- Height: auto
- Padding: 0.75rem 1rem
- Border radius: 18px

**Select dropdown:**
- Same as input

### Labels

**Font:**
- System UI
- Size: 0.9rem
- Weight: 600
- Color: var(--ink)

**Spacing:**
- Below input: 0.5rem

### Helper Text

**Font:**
- System UI
- Size: 0.8rem
- Weight: 400
- Color: var(--ink-dim)

**Spacing:**
- Below input: 0.25rem

### Placeholder Text

**Color:**
- var(--ink-dim)

**Font:**
- Same as input text

### Validation

**Not used in current implementation**

**Could be implemented as:**
- Red border for error
- Error message below input
- Green border for success

### Errors

**Not used in current implementation**

**Could use:**
- Error color: var(--accent-hacks) or custom error token
- Error message below input
- Red border

### Focus Behavior

**Canonical:**
```css
input:focus {
  border-color: var(--line-strong);
  background: var(--glass-hover);
  outline: none;
}
```

**No custom focus outline**
- Glass effect provides sufficient definition

### Disabled State

**Not used in current implementation**

**Could be:**
- Reduced opacity (0.5)
- No hover effects
- Not interactive

### Buttons

**See Button component documentation**

### Spacing

**Form vertical spacing:**
- Label to input: 0.5rem
- Input to helper: 0.25rem
- Input to input: 1rem
- Input to button: 1.5rem

---

## 13. Feedback and State Design

This section documents state design for feedback mechanisms.

### Success

**Not used in current implementation**

**Could use:**
- Green accent: var(--accent-study)
- Success message
- Green border or background

### Warning

**Not used in current implementation**

**Could use:**
- Yellow accent: var(--accent-guides)
- Warning message
- Yellow border or background

### Error

**Not used in current implementation**

**Could use:**
- Pink accent: var(--accent-hacks)
- Error message
- Pink border or background

### Information

**Implemented as:**
- Callout boxes (info variant)
- Blue tint
- Info icon

**Canonical:**
```css
.callout-info {
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.1);
}
```

### Loading

**Implemented as:**
- "Laden..." text
- Fade-in animations
- Skeleton states (not used)

**Animation:**
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Empty

**Implemented as:**
- "Geen resultaten" text
- Centered
- Dimmed text color

### Selected

**Not used in current implementation**

**Could use:**
- Stronger border
- Background change
- Accent color

### Disabled

**Not used in current implementation**

**Could use:**
- Reduced opacity
- No hover effects
- Not interactive

### Active

**Implemented as:**
- Transform: translateY(0) on button press
- Scale: 0.9 on layout toggle

### Focus

**Canonical:**
```css
outline: 2px solid rgba(224, 242, 254, 0.8);
outline-offset: 3px;
```

**Applied to:**
- All interactive elements
- Buttons
- Links
- Inputs
- Cards

---

## 14. Responsive Design

This section documents actual responsive behavior.

### Desktop (Above 900px)

**Layout:**
- Homepage: Full card grid (auto-fill, minmax 340px)
- Game pages: Full game canvas
- Navigation: Horizontal scroll with hidden scrollbar

**Typography:**
- Homepage title: 8rem
- Full heading sizes
- Full body text sizes

**Spacing:**
- Homepage: 7.5rem 2rem 3rem
- Full padding values

**Navigation:**
- Topbar: 0.95rem 1.5rem
- Links: 0.86rem

**Components:**
- Cards: Full width with descriptions
- Buttons: Standard padding

### Tablet (768px - 900px)

**Layout:**
- Homepage: 2-column grid
- Game pages: No specific changes
- Navigation: Same as desktop

**Typography:**
- Homepage title: Intermediate size
- No specific changes documented

**Spacing:**
- No specific changes documented

**Navigation:**
- Same as desktop

**Components:**
- No specific changes

### Mobile (Below 768px)

**Layout:**
- Homepage: Single column grid
- Game pages: No specific changes
- Navigation: Horizontal scroll with reduced padding

**Typography:**
- Homepage title: 4.5rem (from 8rem)
- Rating stars: 1.35rem (from 1.9rem)
- Body text: No change
- Buttons: No change

**Spacing:**
- Homepage: 6.5rem 1.25rem 2rem (from 7.5rem 2rem 3rem)
- Topbar: 1.1rem horizontal (from 1.5rem)

**Navigation:**
- Topbar links: 0.5rem 0.55rem (from 0.5rem 0.85rem)
- Font: 0.82rem (from 0.86rem)

**Components:**
- Cards: Hide description below 560px
- Buttons: Full width on mobile
- Inputs: Full width on mobile

### Breakpoints

**Canonical values:**
- 560px: Hide card descriptions
- 600px: Single column grid (three-columns layout)
- 768px: Mobile breakpoint (reduced padding)
- 900px: Tablet breakpoint (2-column grid)

### Layout Changes

**Grid changes:**
- Desktop: auto-fill with minmax(340px, 1fr)
- Tablet: 2 columns at 900px
- Mobile: 1 column at 768px

**Container changes:**
- Desktop: 1400px max-width
- Mobile: 100% width with padding

### Navigation Changes

**Topbar:**
- Desktop: 0.95rem 1.5rem padding
- Mobile: 1.1rem horizontal padding

**Links:**
- Desktop: 0.86rem font
- Mobile: 0.82rem font

**Scroll:**
- All: Horizontal scroll with hidden scrollbar

### Sidebar Behavior

- No sidebar in current implementation
- All content is center-aligned or left-aligned in container

### Component Resizing

**Cards:**
- Scale with grid
- Hide description on mobile

**Buttons:**
- Full width on mobile

**Inputs:**
- Full width on mobile

**Panels:**
- 90% width on mobile

### Typography Resizing

**Homepage title:**
- Desktop: 8rem
- Mobile: 4.5rem

**Game title:**
- 4.5rem (no change)

**Body text:**
- No change

**Buttons:**
- No change

### Grid Changes

**Desktop:**
- auto-fill with minmax(340px, 1fr)

**Tablet:**
- 2 columns at 900px

**Mobile:**
- 1 column at 768px

### Padding Changes

**Homepage:**
- Desktop: 7.5rem 2rem 3rem
- Mobile: 6.5rem 1.25rem 2rem

**Game pages:**
- 3rem 1.5rem 4rem (no change)

**Topbar:**
- Desktop: 0.95rem 1.5rem
- Mobile: 1.1rem horizontal

### Touch-Target Behavior

**Buttons:**
- Minimum 44px height
- Full width on mobile

**Links:**
- Sufficient padding

**Cards:**
- Full clickable area

**No specific touch optimizations beyond responsive sizing**

### Elements That Disappear/Collapse/Stack

**Card descriptions:**
- Hide below 560px
- Hide in compact layout

**Compact layout:**
- Always hide descriptions

**List layout:**
- Stack vertically

**Tall layout:**
- Stack card content vertically

---

## 15. Iconography

### Icon Style

**Stroke-based icons**
- Rounded line caps
- Stroke width: 1.7
- Consistent stroke style across all icons

### Icon Family

**Not using a specific icon library**
- Custom SVG icons inline
- Feather Icons style (similar)

### Typical Icon Sizes

**Navigation cards:**
- 20px × 20px

**Icon chips:**
- 20px × 20px

**Brand mark:**
- 18px × 18px (with 72px × 72px canvas)

**Layout toggle:**
- 18px × 18px

**Back link:**
- 14px × 14px

**Game controls:**
- 20px × 20px

### Stroke/Fill Treatment

**Always stroke, never fill**
- Stroke width: 1.7
- Stroke-linecap: round
- Stroke-linejoin: round

### Icon Color Rules

**Icon chips:**
- var(--bg-3) (dark) on category accent background

**Navigation:**
- var(--ink-dim) → #fff on hover

**Controls:**
- var(--ink) or var(--ink-dim)

**Always inherit or use semantic colors**

### Icon-to-Text Spacing

**Navigation cards:**
- 0.8rem gap

**Back link:**
- 0.5rem gap

**Section pills:**
- 8px gap

### Where Icons Are Used

**Navigation cards:**
- Category indicators

**Back links:**
- Arrow

**Layout toggle:**
- Grid/list icon

**Game controls:**
- Pause, play, exit

**Card arrows:**
- Navigation indicators

**Brand mark:**
- Animated

### Decorative vs Functional

**Brand mark:**
- Decorative (animated)

**Card icons:**
- Functional (category indication)

**Control icons:**
- Functional (actions)

**Arrow icons:**
- Functional (navigation)

---

## 16. Imagery and Visual Assets

### Images

**Not used in current implementation**
- No image assets in design

### Illustrations

**Not used in current implementation**
- No illustrations in design

### Avatars

**Not used in current implementation**
- No avatars in design

### Thumbnails

**Not used in current implementation**
- No thumbnails in design

### Background Images

**Not used (CSS gradients only)**
- No image backgrounds

### Logos

**Brand mark:**
- Animated canvas
- Text-based "DUB5" logo
- No raster logo images

### Decorative Graphics

**Starfield canvas:**
- Animated stars

**Nebula gradients:**
- CSS radial gradients

**No static decorative graphics**

### Aspect-Ratio Rules

**Not applicable (no images)**

### Border Radius

**Not applicable (no images)**

### Cropping Behavior

**Not applicable (no images)**

### Object-Fit Behavior

**Not applicable (no images)**

### Overlay Treatment

**Not applicable (no images)**

### Image Opacity/Filtering

**Not applicable (no images)**

### Placement Conventions

**Not applicable (no images)**

---

## 17. Accessibility

### Focus Visibility

**Canonical:**
```css
outline: 2px solid rgba(224, 242, 254, 0.8);
outline-offset: 3px;
```

**Applied to:**
- All interactive elements
- `:focus-visible` pseudo-class
- Not `:focus` (only keyboard focus)

### Contrast

**High contrast text on dark backgrounds**
- White text on dark glass surfaces
- Accent colors used with dark backgrounds for contrast
- Never use low contrast for important text
- WCAG AA contrast ratios maintained

### Touch Targets

**Buttons:**
- Minimum 44px height
- Full width on mobile

**Links:**
- Sufficient padding

**Cards:**
- Full clickable area

**Follows WCAG 2.5.5**

### Keyboard Behavior

**Focus-visible outline on all interactive elements**
- No hidden keyboard-only states
- All states are visually apparent

### Non-Color State Communication

**States use multiple indicators:**
- Color change
- Border change
- Transform
- Background change

**Never rely on color alone**

### Text Readability

**Font size minimum 0.83rem for body text**
- Line height 1.5 for body text
- High contrast colors
- No text on complex backgrounds

### Disabled States

**Not used in current implementation**
- Could be added with reduced opacity (0.5)

### Error Communication

**Not used in current implementation**
- Could use accent-hacks color (#fb7185)

---

## 18. Motion

This section provides a high-level motion summary. For detailed specifications, see `references/motion.md`.

### Duration

**Hover:**
- 300ms

**Enter/load:**
- 550ms

**Topbar scroll:**
- 420ms

**Header rule:**
- 1300ms

### Easing

**Hover:**
- ease-in-out

**Enter:**
- cubic-bezier(0.22, 1, 0.36, 1) (spring-like)

**Scroll:**
- cubic-bezier(0.4, 0, 0.2, 1)

### Movement

**Hover:**
- translateY(-2px) for cards/buttons
- translateX(2px) for card titles
- translate(2px, -2px) for card arrows

**Scale:**
- scale(1.05) for icon chips
- scale(0.9) for active buttons

### Layout Transitions

**View switch thumb:**
- Width + transform with spring easing

**Grid layout:**
- No layout transitions (instant)

### Hover

**All interactive elements:**
- 300ms ease-in-out
- Background, border, transform changes

### Press

**Buttons:**
- translateY(0) on active
- scale(0.9) for layout toggle

### Expansion/Collapse

**Not used in current implementation**

### Overlays

**Game overlay:**
- Opacity fade
- 550ms cubic-bezier(0.22, 1, 0.36, 1)

### Page Transitions

**Not used (single-page feel)**
- Smooth scroll: scroll-behavior: smooth

### Shared Transitions

**All hover states:**
- 300ms ease-in-out
- Consistent across components

### Loading Animation

**Fade-in:**
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Card-in:**
```css
@keyframes card-in {
  from { opacity: 0; transform: translateY(9px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Reduced-Motion Behavior

**Respects `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Motion That Should Not Be Introduced

- No bouncing animations
- No rotating animations
- No shaking/wobbling
- No dramatic scale changes
- No particle effects (except starfield)
- No parallax (except starfield)
- No complex keyframe animations beyond current set

---

## 19. Design Principles

### Core Principles

1. **Preserve the visual DNA**
   - The exact colors, spacing, typography, and motion define DUB5
   - Do not arbitrarily change these values
   - Consistency is more important than novelty

2. **Reuse before creating**
   - Always check if an existing pattern fits
   - Don't create new components when existing ones work
   - Build on the foundation, don't rebuild it

3. **Respect the token system**
   - Use documented tokens for colors, spacing, typography
   - Don't invent new values without reason
   - Tokens ensure consistency

4. **Follow the component rules**
   - Components have defined behaviors and states
   - Don't arbitrarily change component styling
   - Component patterns are reusable

5. **Maintain hierarchy**
   - Visual hierarchy is intentional
   - Don't flatten or compress without reason
   - Spacing creates rhythm

6. **Keep motion subtle**
   - Motion enhances, doesn't distract
   - Use documented durations and easing
   - Respect reduced-motion preferences

7. **Ensure accessibility**
   - Focus states are required
   - Contrast must be sufficient
   - Touch targets must be adequate

8. **Think mobile-first**
   - Responsive behavior is documented
   - Design for all screen sizes
   - Touch targets must work on mobile

9. **Validate against the system**
   - Compare implementation against DESIGN.md
   - Perform design review
   - Fix visual drift

10. **Document genuinely new patterns**
    - When a new pattern is necessary, document it
    - Add it to the design system
    - Make it reusable

### Design Decision Framework

**When implementing:**
1. Check if a pattern exists
2. Use the documented tokens
3. Follow component rules
4. Apply motion language
5. Ensure responsive behavior
6. Verify accessibility
7. Perform design review

**When uncertain:**
1. Choose the closest existing pattern
2. Use documented tokens
3. Prefer consistency over novelty
4. Document the decision
5. Update the design system if reusable

**When creating something new:**
1. Build on existing tokens
2. Follow established patterns
3. Maintain visual consistency
4. Document the new pattern
5. Add to the design system

---

## 20. Do and Don't Rules

### Do

- Reuse the established spacing scale (0.22rem to 7.5rem)
- Reuse existing semantic colors (var(--ink), var(--ink-dim), var(--glass))
- Reuse existing component patterns (cards, buttons, panels)
- Prefer existing visual patterns over inventing new ones
- Keep hierarchy consistent with the existing interface
- Use DM Serif Display for all headings
- Use system font stack for UI text
- Apply glassmorphism to all interactive surfaces
- Use the exact glass blur: blur(16px) saturate(160%)
- Use the exact glass shadow: 0 18px 40px -26px rgba(0, 0, 0, 1)
- Use the exact background gradient: #0b1150 → #050833 → #01030f
- Use category accent colors consistently
- Use pill shapes (999px radius) for cards and buttons
- Use 300ms ease-in-out for hover transitions
- Use cubic-bezier(0.22, 1, 0.36, 1) for enter animations
- Apply focus-visible outline to all interactive elements
- Respect the z-index layering system
- Use the starfield canvas for animated backgrounds
- Use the nebula gradients for background effects
- Keep typography hierarchy consistent
- Use the exact border radius scale (999px, 18px, 12px, 7px)
- Apply backdrop-filter to all glass surfaces
- Use reduced motion media query for accessibility
- Follow the documented responsive breakpoints
- Use the documented motion durations
- Ensure sufficient contrast for text
- Provide adequate touch targets
- Perform design review against this specification

### Don't

- Introduce arbitrary colors not in the palette
- Introduce a new border-radius style without a reason
- Create a new card style when an existing one already fits
- Add gradients, shadows, glassmorphism, excessive blur, or decorative effects unless the existing design actually uses them
- Mix unrelated typography styles
- Create inconsistent spacing values without justification
- Turn every section into a card
- Use generic AI-generated SaaS patterns that conflict with the DUB5 visual identity
- Use solid backgrounds for interactive elements
- Use opaque backgrounds
- Use sharp corners or square shapes
- Use borders without glassmorphism
- Use shadows without glassmorphism
- Use white text on light backgrounds
- Use low contrast for important text
- Remove the starfield or nebula effects
- Change the background gradient
- Use different fonts than DM Serif Display and system fonts
- Ignore the z-index layering
- Skip focus-visible states
- Use animations longer than 550ms for enter
- Use bouncy or distracting animations
- Introduce new transition timings
- Use different hover transform values
- Remove the glass inset highlight
- Remove the glass shadow
- Use different blur amounts for glass surfaces
- Change the category accent colors
- Mix different border styles
- Use solid colors instead of rgba
- Ignore the spacing scale
- Create new spacing values without reason
- Break the documented responsive behavior
- Introduce new breakpoints without reason
- Ignore accessibility requirements
- Skip design review

---

## 21. New-Page Construction Rules

When building a page that doesn't currently exist in DUB5, follow these rules to ensure it feels native:

### Step 1: Determine Page Type

**Is it a:**
- Hub/landing page? → Use homepage pattern
- Content detail page? → Use game page pattern
- List/index page? → Use category section pattern
- Form page? → Use glassmorphism form pattern
- Modal/overlay? → Use overlay panel pattern

### Step 2: Apply Background

**Always use:**
```css
background: radial-gradient(140% 100% at 50% -10%, #0b1150 0%, #050833 42%, #01030f 100%);
```

**Always include:**
- Nebula gradients (body::before)
- Starfield canvas

### Step 3: Choose Container

**Hub/landing:**
```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 7.5rem 2rem 3rem;
}
```

**Content page:**
```css
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}
```

### Step 4: Apply Typography

**Headings:**
- Use DM Serif Display
- Follow the documented hierarchy
- Use appropriate letter-spacing

**Body text:**
- Use system font stack
- Use var(--ink) for primary, var(--ink-dim) for secondary

### Step 5: Use Components

**Cards:**
- Use navigation card pattern
- Apply glassmorphism
- Use category accent colors

**Buttons:**
- Use pill shape (999px radius)
- Apply glassmorphism
- Use 300ms hover transitions

**Inputs:**
- Use panel radius (18px)
- Apply glassmorphism
- Use focus state

### Step 6: Apply Spacing

**Use the documented scale:**
- Section margins: 3rem
- Card gaps: 0.85rem
- Padding values from the scale

### Step 7: Ensure Responsive

**Mobile:**
- Single column grids
- Full-width inputs/buttons
- Reduced padding

**Tablet:**
- 2-column grids
- Intermediate sizing

**Desktop:**
- Full card grids
- Full spacing

### Step 8: Add Motion

**Hover:**
- 300ms ease-in-out
- Subtle transform (-2px Y)

**Enter:**
- 550ms cubic-bezier(0.22, 1, 0.36, 1)
- Fade-in + translateY

### Step 9: Verify Accessibility

**Focus:**
- 2px outline with 3px offset
- Applied to all interactive elements

**Contrast:**
- Check text contrast ratios
- Ensure readability

**Touch targets:**
- Minimum 44px height for buttons
- Adequate padding for links

### Step 10: Design Review

**Compare against:**
- Color tokens
- Typography hierarchy
- Spacing scale
- Component patterns
- Motion language
- Responsive behavior

**Fix any drift before considering complete**

---

## 22. Design-Token Priority

The following hierarchy defines the order of authority:

### 1. Exact Design Tokens (Authoritative)

**CSS custom properties with exact values:**
- Colors (exact hex values)
- Spacing (exact rem values)
- Typography (exact font sizes, weights)
- Radii (exact pixel values)
- Shadows (exact values)
- Motion (exact durations, easing)
- Breakpoints (exact pixel values)

**When a token is documented, use it exactly. Do not invent a different value.**

### 2. Component-Specific Rules (High Priority)

**Component dimensions, padding, typography, colors, borders, shadows, states:**
- Navigation card: 0.68rem 1.15rem padding, 999px radius
- Button: 14px 28px padding, 999px radius
- Input: 0.75rem 1rem padding, 18px radius
- Badge: 0.22rem 0.5rem padding, 7px radius

**Follow these rules exactly. Do not modify without documented reason.**

### 3. Layout and Interaction Rules (Medium Priority)

**Grid systems, spacing patterns, responsive behavior, motion:**
- Grid: auto-fill with minmax(340px, 1fr)
- Gap: 0.85rem
- Hover: 300ms ease-in-out
- Enter: 550ms cubic-bezier(0.22, 1, 0.36, 1)
- Responsive: Single column below 768px

**Follow these patterns. Adapt when necessary but stay consistent.**

### 4. General Design Principles (Low Priority)

**Overall philosophy, spacing philosophy, surface philosophy, interaction philosophy:**
- Spacious layout
- High contrast
- Consistent glassmorphism
- Subtle motion

**Use these principles to guide decisions when specific rules don't exist.**

### 5. Reasonable Design Judgment (Last Resort)

**When something is genuinely unspecified:**
- Choose the closest existing DUB5 pattern
- Reuse an existing semantic token
- Reuse the existing spacing/radius/type scale
- Prefer consistency over novelty
- Introduce a new pattern only when the existing system cannot reasonably express the requirement
- Document genuinely new reusable patterns so they can become part of the system later

**Do not allow arbitrary invention to become the default.**

---

## 23. Design Drift

Common ways a future implementation could drift away from DUB5:

### Visual Identity Drift

- Arbitrary new colors not in the palette
- Different background gradient
- Missing starfield or nebula effects
- Wrong font family or weights
- Inconsistent category colors

### Color Drift

- Using solid colors instead of rgba
- Wrong opacity values
- Missing saturation boost in blur
- Arbitrary accent colors
- Low contrast text

### Typography Drift

- Wrong font family
- Incorrect font sizes
- Missing letter-spacing
- Wrong font weights
- Inconsistent hierarchy

### Spacing Drift

- Arbitrary spacing values
- Compressed spacing
- Inconsistent gaps
- Missing section margins
- Wrong padding values

### Geometry Drift

- Different border radius
- Sharp corners
- Inconsistent shapes
- Wrong border thickness
- Missing borders

### Component Drift

- New card styles
- Different button styles
- Arbitrary component patterns
- Missing glassmorphism
- Inconsistent states

### Layout Drift

- Wrong max-widths
- Inconsistent grids
- Missing container centering
- Wrong z-index layering
- Incorrect positioning

### Motion Drift

- Different transition durations
- Wrong easing functions
- Missing animations
- Excessive motion
- No reduced-motion support

### Responsive Drift

- Wrong breakpoints
- Missing mobile behavior
- Incorrect grid changes
- Wrong padding on mobile
- Missing touch targets

### Accessibility Drift

- Missing focus states
- Low contrast
- Inadequate touch targets
- No keyboard navigation
- Color-only state communication

### Generic SaaS Drift

- Using generic card patterns
- Typical dashboard layouts
- Standard button styles
- Common navigation patterns
- Typical form designs

**These patterns are not DUB5. Avoid them.**

---

## 24. Handling Unspecified Decisions

When a design decision is not specified in this system:

### Decision Framework

1. **Reuse the closest existing DUB5 pattern**
   - Is there a similar component?
   - Can an existing pattern be adapted?
   - Does the spacing scale have a close value?

2. **Reuse an existing semantic token**
   - Is there a color token that fits?
   - Is there a spacing token that works?
   - Is there a typography token that matches?

3. **Reuse the existing spacing/radius/type scale**
   - Choose the closest value from the documented scale
   - Don't invent new values
   - Maintain the scale's consistency

4. **Prefer consistency over novelty**
   - Does this match the existing visual language?
   - Would this feel like DUB5?
   - Is this consistent with other elements?

5. **Introduce a new pattern only when necessary**
   - Can the requirement be expressed with existing patterns?
   - Is this genuinely new functionality?
   - Is there no reasonable alternative?

6. **Document genuinely new reusable patterns**
   - If a new pattern is created, document it
   - Add it to the design system
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

### Documentation

When you make a genuinely new reusable decision:

1. Document the new token or pattern
2. Add it to the appropriate section of DESIGN.md
3. Add implementation reference if applicable
4. Update SKILL.md if it affects the workflow
5. Make it available for future implementations

---

## 25. Source of Truth

```
Existing DUB5 implementation
        ↓
    Observed design system
        ↓
     DESIGN.md
        ↓
  Supporting references
        ↓
  Future implementation
```

### Rule

The existing DUB5 implementation is the primary source of truth.

This design system documents what was observed in that implementation.

When the DUB5 UI is intentionally changed in the future, the design system should be updated accordingly.

### Maintenance

When the DUB5 UI changes:

1. Update the affected tokens in DESIGN.md
2. Update component rules if behavior changes
3. Update screenshots if visual appearance changes
4. Update examples if patterns change
5. Update implementation notes with new evidence

### Versioning

Consider versioning the design system when:

- Major visual changes occur
- New tokens are added
- Component patterns change significantly
- Responsive behavior changes

This helps track evolution and ensures compatibility.

---

## 26. Design Review System

### Review Process

**IMPLEMENT**
- Build the feature or page
- Apply documented tokens
- Follow component rules

**RENDER**
- View the implementation in browser
- Check at different screen sizes
- Test interactive states

**INSPECT**
- Compare against DESIGN.md
- Check token usage
- Verify component patterns

**COMPARE**
- Does it look like DUB5?
- Are colors correct?
- Is typography correct?
- Is spacing correct?

**IDENTIFY DRIFT**
- List any deviations
- Categorize as minor or major
- Determine if justified

**FIX**
- Correct major drift
- Consider minor drift
- Re-apply documented rules

**RENDER AGAIN**
- View corrected implementation
- Verify fixes

**FINAL REVIEW**
- Pass/fail assessment
- Document any exceptions
- Consider complete

### Review Categories

**Visual Identity**
- Does it clearly look like DUB5?
- Is the starfield present?
- Is the background gradient correct?
- Is glassmorphism applied?

**Color**
- Are semantic colors correct?
- Are category accents used correctly?
- Is contrast sufficient?
- Are borders correct?

**Typography**
- Are families correct?
- Are sizes correct?
- Are weights correct?
- Is hierarchy correct?

**Spacing**
- Is the DUB5 rhythm preserved?
- Are values from the scale?
- Is spacing consistent?

**Geometry**
- Are radius correct?
- Are proportions correct?
- Are borders correct?

**Components**
- Are existing patterns reused?
- Are states correct?
- Is glassmorphism applied?

**Layout**
- Does hierarchy match DUB5?
- Are containers correct?
- Is alignment correct?

**Responsive**
- Does behavior match documented rules?
- Do breakpoints work?
- Is mobile usable?

**Motion**
- Does animation feel like DUB5?
- Are durations correct?
- Is easing correct?

**Interaction**
- Are hover states correct?
- Are focus states present?
- Are other states correct?

**Accessibility**
- Is the design usable?
- Is it readable?
- Are touch targets adequate?

**Visual Drift**
- Does anything feel generic?
- Are there arbitrary colors?
- Are there arbitrary patterns?

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

### When New Components Are Justified

A new component or pattern is justified when:

- Existing patterns cannot reasonably express the requirement
- The new pattern follows DUB5 principles
- The new pattern is documented
- The new pattern is reusable

### Do Not Allow

- "Looks fine" as the only criterion
- Subjective judgment without reference to DESIGN.md
- Arbitrary visual decisions
- Skipping design review

---

## 27. Implementation References

### Global CSS Variables

**Location:** `css/tokens.css`

Contains:
- All color tokens
- All radius tokens
- All motion tokens
- All typography tokens

### Base Styles

**Location:** `css/base.css`

Contains:
- Reset and base styles
- Background gradient
- Starfield canvas
- Typography base

### Card Component

**Location:** `css/cards.css`

Contains:
- Navigation card styles
- Icon chip styles
- Badge styles
- Section pill styles

### Game Component

**Location:** `css/game.css`

Contains:
- Game container styles
- HUD styles
- Overlay panel styles
- Game button styles

### Homepage Implementation

**Location:** `index.html` (lines 18-1490)

Contains:
- Main page layout
- Topbar styles
- Title animation
- Grid layout
- View switch
- Layout variations
- Starfield animation (lines 1228-1486)

### Game Page Implementation

**Location:** `games/snake/index.html` (lines 11-150)

Contains:
- Game page layout
- Back link styles
- Game header styles
- Consistent glassmorphism

### Starfield Animation

**Location:** `research/starfield.js` or `index.html` (lines 1228-1486)

Contains:
- Complete starfield implementation
- Sprite generation
- Shooting star logic
- Mouse parallax
- Performance optimization

---

## 28. Distinctive Details

These specific details make DUB5 different from a generic AI-generated website:

1. **Background Gradient:** `radial-gradient(140% 100% at 50% -10%, #0b1150 0%, #050833 42%, #01030f 100%)`
2. **Glass Blur:** `blur(16px) saturate(160%)` - unique saturation boost
3. **Glass Shadow:** `0 18px 40px -26px rgba(0, 0, 0, 1)` - negative vertical offset
4. **Glass Inset:** `inset 0 1px 0 rgba(255, 255, 255, 0.09)` - subtle top highlight
5. **Nebula Gradients:** Three radial gradients at specific positions with blur(26px)
6. **DM Serif Display:** Specific serif font for all headings
7. **Category Color Palette:** Exact hex values for games, tools, study, hacks, guides
8. **Pill Radius:** 999px for all cards and buttons
9. **Starfield Canvas:** Animated background with specific implementation
10. **Specific Spacing Scale:** From 0.22rem to 7.5rem
11. **Specific Transition Timing:** 300ms ease-in-out for hover, cubic-bezier(0.22, 1, 0.36, 1) for enter
12. **Specific Border Opacity:** rgba(224, 242, 254, 0.16) and 0.30
13. **Specific Text Colors:** rgb(226, 240, 255) and rgba(226, 240, 255, 0.60)
14. **Specific Glass Opacity:** 62% and 72%
15. **Badge Gradient:** linear-gradient(135deg, #ff5a5f, #d81f2a)
16. **Header Rule Animation:** 1300ms cubic-bezier(0.22, 1, 0.36, 1) with scaleX
17. **Icon Chip Size:** Exactly 40px × 40px with 12px radius
18. **Title Glow:** 0 0 60px rgba(120, 170, 255, 0.28)
19. **Topbar Scroll Transition:** 420ms cubic-bezier(0.4, 0, 0.2, 1)
20. **Grid Gap:** Exactly 0.85rem

**These specific values are what make DUB5 visually distinctive. Changing any of these without updating the design system would break the design identity.**

---

## 29. Canonical vs Recommended vs Example vs Context-Specific

### Canonical

**Must be followed unless there is a documented reason not to.**

Examples:
- Exact design tokens (colors, spacing, typography)
- Component dimensions and states
- Glassmorphism surface treatment
- Motion durations and easing
- Responsive breakpoints

### Recommended

**Normally preferred, but context may justify deviation.**

Examples:
- Using existing component patterns
- Following the spacing scale
- Applying the motion language
- Using category accent colors

### Example

**Demonstrates one valid use and does not mean the exact structure must always be copied.**

Examples:
- Specific card content arrangement
- Specific page layout
- Specific component composition

### Context-Specific

**Specific to a DUB5 feature and not automatically reusable.**

Examples:
- Game-specific HUD layout
- Specific navigation link labels
- Category-specific content organization
- Feature-specific interactions

**This hierarchy prevents examples from accidentally becoming rigid rules.**

---

## 30. Maintenance Model

### Adding a New Token

1. Determine if the token is genuinely reusable
2. Choose a semantic name following existing patterns
3. Add to the appropriate section in DESIGN.md
4. Add to css/tokens.css if in the original project
5. Update implementation notes with evidence
6. Consider versioning if major change

### Changing a Token

1. Verify the change is intentional and widespread
2. Update the value in DESIGN.md
3. Update css/tokens.css if in the original project
4. Update all affected components
5. Update screenshots if visual change
6. Update examples if needed
7. Document the reason for the change

### Adding a New Component

1. Verify the component is genuinely new and reusable
2. Document complete specification in DESIGN.md
3. Document in references/components.md
3. Add example in examples/
4. Add screenshot if visual component
5. Update SKILL.md if it affects workflow
6. Consider versioning if major addition

### Changing Component Behavior

1. Verify the change is intentional
2. Update component specification in DESIGN.md
3. Update references/components.md
4. Update examples if needed
5. Update screenshots if visual change
6. Document the reason for the change

### Introducing a New Motion Pattern

1. Verify the pattern fits DUB5 motion language
2. Document duration and easing
3. Document in references/motion.md
4. Add example if applicable
5. Update DESIGN.md motion section
6. Ensure reduced-motion support

### Approving a New Library

1. Verify the library fits DUB5 philosophy
2. Document purpose and role in references/libraries.md
3. Document when to use and when not to use
4. Verify no existing DUB5 implementation already satisfies the requirement
5. Document integration approach
6. Add to the library decision hierarchy

### Adding a New Responsive Pattern

1. Verify the pattern is genuinely new and reusable
2. Document breakpoints and behavior
3. Document in references/responsive.md
4. Add example if applicable
5. Update DESIGN.md responsive section
6. Add screenshots showing behavior

### Updating Screenshots

1. Capture actual rendered output from the DUB5 implementation
2. Organize by desktop/tablet/mobile
3. Add captions explaining what is shown
4. Indicate which design rule it demonstrates
5. Mark as canonical or example
6. Replace outdated screenshots

### Updating Review Rules

1. Verify the new rule improves review quality
2. Add to references/design-review.md
3. Update SKILL.md if workflow changes
4. Train reviewers on new rule
5. Document the reason for the change

### General Principle

**Reusable design changes should update the centralized system rather than being silently implemented in one page.**

This ensures consistency across the entire DUB5 design family and future projects.

---

## 31. Portability

This design system is designed to work when copied into a completely different project.

### It Does Not Rely On

- DUB5 source-code paths being present
- DUB5 business logic
- DUB5 database structure
- DUB5 feature names
- DUB5 route names
- DUB5 framework-specific assumptions (unless clearly labeled)
- A specific editor or development platform

### It Does Provide

- Exact CSS custom properties for colors, spacing, typography
- Complete component specifications
- Motion language with durations and easing
- Responsive behavior with breakpoints
- Accessibility conventions
- Design principles and decision framework
- Implementation references (as secondary evidence)

### Implementation References

**Are secondary to portable design rules.**

The references point to specific files in the original DUB5 project for evidence and context, but the portable design rules remain understandable without the original source code.

### Cross-Platform Usage

The system can be implemented in:

- Vanilla HTML/CSS/JavaScript
- React
- Vue
- Svelte
- Angular
- Any other frontend technology

The design tokens and rules are framework-agnostic.

### Language Independence

The documentation is in English, but the design system itself can be used for projects in any language. Only the example text content is language-specific.

### Technology Independence

The system does not depend on:
- CSS preprocessors (Sass, Less, etc.)
- CSS frameworks (Tailwind, Bootstrap, etc.)
- JavaScript frameworks (React, Vue, etc.)
- Build tools (Webpack, Vite, etc.)

While the original DUB5 uses vanilla HTML/CSS/JavaScript, the design system can be adapted to any technology stack.

---

## 32. Final Validation

Before considering this design system complete, verify:

### Fidelity

- Does the documentation accurately represent the existing DUB5 visual identity?
- Are all primary colors correct?
- Are all major fonts correct?
- Are typography values correct?
- Are spacing values based on actual implementation?

### Specificity

- Are the rules concrete enough to prevent arbitrary visual decisions?
- Are exact values provided?
- Are ranges defined where appropriate?
- Is ambiguity minimized?

### Portability

- Can the design system work in a different project?
- Does it rely on DUB5-specific content?
- Are the rules framework-agnostic?
- Can it be understood without the original codebase?

### Human Readability

- Can a person read and understand the system?
- Is the structure logical?
- Is the language clear?
- Are the examples helpful?

### Machine Usability

- Can an automated workflow use the documents?
- Are the tokens structured?
- Are the rules explicit?
- Is the hierarchy clear?

### Extensibility

- Can the system grow when new patterns emerge?
- Is the maintenance model clear?
- Are update procedures documented?

### Consistency

- Would different projects using this system feel visually related?
- Would they be recognizably DUB5?
- Is the visual DNA preserved?

### Reviewability

- Can a new implementation be compared against explicit rules?
- Is the review process defined?
- Are pass/fail criteria clear?

### Completeness

- Are all major components documented?
- Are all states documented?
- Is responsive behavior documented?
- Is motion documented?
- Is accessibility documented?

### Accuracy

- Are any values invented?
- Are there contradictions?
- Are there missing rules?
- Are references correctly linked?

**Fix any errors before considering the system complete.**
