# Design System: TheCallAgent
**Source:** Analyzed from `css/style.css` (design system v2) — Tech Noir aesthetic
**Skill:** `design-md` from `google-labs-code/stitch-skills`

---

## 1. Visual Theme & Atmosphere

TheCallAgent embodies **Tech Noir precision** — a dark, immersive interface that communicates AI authority through electric blue and teal accents against a deep space background. The design feels **high-stakes and sharp**, suitable for a B2B AI call agent service targeting decision-makers.

The mood is **confident and futuristic**: glassmorphism cards hover over a particle-filled void, spotlight gradients dramatize key content, and subtle grid lines evoke a command center aesthetic. Despite the technical density, the layout remains clean and conversion-focused.

**Key Characteristics:**
- Deep space backgrounds with layered depth (bg, bg-2, noise overlay, grid)
- Electric blue (#2B6FFF) as the primary action color — trust + technology
- Teal (#06D6A0) as the success/accent color — growth + intelligence
- Glassmorphism cards with translucent backgrounds and luminous borders
- Gradient text headers (blue to teal diagonal)
- Syne font for headings (futuristic, geometric), DM Sans for body (readable, modern)

---

## 2. Color Palette & Roles

### Backgrounds (Dark Foundation)
- **Deep Space** (`#06080F`) — `--bg` — primary page background. Near-black with slight blue undertone.
- **Navy Void** (`#0B0F1C`) — `--bg-2` — secondary surfaces (section backgrounds, footer).
- **Glass Card** (`rgba(255,255,255,0.035)`) — `--bg-card` — card default. Ultra-low opacity white = frosted glass.
- **Glass Card Hover** (`rgba(255,255,255,0.07)`) — `--bg-card-h` — card hover state.

### Brand Accents
- **Electric Blue** (`#2B6FFF`) — `--blue` — CTAs, active states, primary buttons.
- **Blue Light** (`#5B9FFF`) — `--blue-light` — hover states, secondary accents.
- **Teal** (`#06D6A0`) — `--cyan` — success states, AI feature badges, secondary CTAs.
- **Teal Dim** (`rgba(6,214,160,0.15)`) — `--cyan-dim` — teal-tinted backgrounds for highlighted areas.

### Glow Effects (Atmospheric)
- **Blue Glow** (`rgba(43,111,255,0.3)`) — `--glow-blue` — drop shadows, button halos.
- **Cyan Glow** (`rgba(6,214,160,0.25)`) — `--glow-cyan` — glow behind teal badges.

### Borders (Luminous Lines)
- **Border Default** (`rgba(80,130,255,0.12)`) — `--border` — card edges, section dividers.
- **Border Hover** (`rgba(80,130,255,0.45)`) — `--border-h` — borders ignite on hover.

### Typography Colors
- **Primary Text** (`#E8EDFF`) — `--text` — body copy, card content. Blue-tinted white.
- **Muted Text** (`#7080A0`) — `--text-muted` — captions, secondary info.
- **Dim Text** (`#3A4A65`) — `--text-dim` — legal copy, very low hierarchy content.

### Gradients
- **Primary** — `linear-gradient(135deg, #2B6FFF 0%, #06D6A0 100%)` — hero headlines, badge borders.
- **Reverse** — `linear-gradient(135deg, #06D6A0 0%, #2B6FFF 100%)` — alternative orientation.

---

## 3. Typography Rules

**Heading Font:** Syne (`--font-h`) — Google Fonts
**Body Font:** DM Sans (`--font-b`) — Google Fonts

### Heading Hierarchy (Syne)
- **H1 / Hero:** weight 800, 3.5-4.5rem, gradient text (`background-clip: text`), tight letter-spacing.
- **H2 / Section:** weight 700, 2-2.5rem, `--text` or gradient text.
- **H3 / Card Titles:** weight 600, 1.25-1.5rem, `--text`.
- **H4 / Labels:** weight 600, 0.9rem, uppercase, `--blue-light`, letter-spacing 0.08em.

### Body Hierarchy (DM Sans)
- **Lead / Intro:** weight 300-400, 1.1-1.25rem, `--text-muted`, line-height 1.7.
- **Body Copy:** weight 400, 1rem, `--text`, line-height 1.65.
- **Small / Caption:** weight 300, 0.85rem, `--text-muted`, line-height 1.5.
- **Button Text:** weight 500-600, 0.9-1rem.

---

## 4. Component Stylings

### Primary Button (CTA)
- Background: `--blue` (#2B6FFF)
- Text: white, weight 500-600
- Border-radius: `--r` (14px)
- Padding: 14px 28px
- Hover: lighten to `--blue-light`, add `--glow-blue` box-shadow
- Focus: visible blue outline for a11y
- Transition: 300ms `--ease`

### Secondary Button / Outline
- Background: transparent
- Border: 1px solid `--border-h`
- Text: `--text`
- Hover: background `--bg-card-h`, border glows to `--blue-light`

### Cards (Glassmorphism)
- Background: `--bg-card`
- Border: 1px solid `--border`
- Border-radius: `--r` (14px) or `--r-lg` (24px) for feature cards
- Hover: border to `--border-h`, background to `--bg-card-h`, translateY(-2px)
- Box-shadow: `0 8px 40px rgba(0,0,0,0.4)` default; blue glow on hover
- Backdrop-filter: `blur(12px)`

### Navigation
- Fixed, transparent by default
- `.scrolled`: `rgba(6,8,15,0.75)` + `backdrop-filter: blur(24px)` + border-bottom
- Nav links: `--text-muted` default, `--text` hover
- Active CTA: Primary Button style, compact padding (12px 24px)

### Badges / Tags
- Background: `--cyan-dim`
- Border: 1px solid `rgba(6,214,160,0.3)`
- Text: `--cyan`, weight 500, 0.8rem
- Border-radius: 20px (pill)
- Padding: 4px 12px

### Form Inputs
- Background: `--bg-2` or `--bg-card`
- Border: 1px solid `--border`
- Focus border: `--blue`, focus shadow: `0 0 0 3px var(--glow-blue)`
- Text: `--text`, placeholder: `--text-muted`
- Border-radius: `--r` (14px)

---

## 5. Spacing & Layout

- **Container max-width:** 1180px, centered, 24px horizontal padding
- **Section padding:** 100-120px vertical desktop, 60-80px mobile
- **Grid gap:** 24-32px between cards
- **Border-radius tokens:** `--r` 14px (standard), `--r-lg` 24px (featured)

---

## 6. Motion & Animation

- **Primary easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease`) — snappy spring
- **Secondary easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (`--ease-out`) — material ease-out
- **Durations:** 300ms hover, 500ms page transitions
- **Scroll reveal:** Intersection Observer, opacity 0 to 1, translateY(30px to 0), staggered delay
- **prefers-reduced-motion:** All animations disabled

---

## 7. Atmospheric Effects (Tech Noir Specifics)

- **Noise overlay:** SVG fractalNoise at 3% opacity — film grain texture
- **Grid lines:** 48x48px grid, rgba blue 3% — command center look, radially masked
- **Particles canvas:** JS floating dots (see `js/main.js`)
- **Spotlight gradient:** Large radial gradient on hero, blue-to-transparent
- **Scroll-driven video:** Hero video opacity/scale driven by scroll (`js/main.js` lines 376-428)

---

## 8. Using This File with Google Stitch

When prompting Stitch to generate new TheCallAgent screens, include this context:

> "Dark tech noir SaaS interface. Background: #06080F (deep space). Primary accent: #2B6FFF (electric blue). Secondary accent: #06D6A0 (teal). Cards: glassmorphism with rgba(255,255,255,0.035) background, 14px radius, luminous blue border rgba(80,130,255,0.12). Headings: Syne 700-800. Body: DM Sans 300-400. Output: vanilla HTML5 + CSS3 only, no component libraries."

Reference this file as `docs/DESIGN.md` when invoking the `design-md` skill for automatic design system injection.

---

## 9. Skill Installation Reference

```bash
# List available Stitch skills
npx skills add google-labs-code/stitch-skills --list

# Install design-md globally (already done 2026-04-28)
npx skills add google-labs-code/stitch-skills --skill design-md --global --yes

# Install other skills as needed
npx skills add google-labs-code/stitch-skills --skill enhance-prompt --global --yes
npx skills add google-labs-code/stitch-skills --skill stitch-design --global --yes
```

**Note:** `stitch-design` and `stitch-loop` require the Stitch MCP server connected to Claude Code (Google account + Stitch project). `design-md` and `enhance-prompt` work standalone for prompt engineering and documentation.
