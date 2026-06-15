---
name: TheCallAgent
colors:
  surface: '#11131b'
  surface-dim: '#11131b'
  surface-bright: '#373942'
  surface-container-lowest: '#0b0e16'
  surface-container-low: '#191b24'
  surface-container: '#1d1f28'
  surface-container-high: '#272a33'
  surface-container-highest: '#32343e'
  on-surface: '#e1e2ee'
  on-surface-variant: '#c2c6d8'
  inverse-surface: '#e1e2ee'
  inverse-on-surface: '#2e3039'
  outline: '#8c90a1'
  outline-variant: '#424655'
  surface-tint: '#b3c5ff'
  primary: '#b3c5ff'
  on-primary: '#002a76'
  primary-container: '#5f8bff'
  on-primary-container: '#002468'
  inverse-primary: '#0054d8'
  secondary: '#40efb7'
  on-secondary: '#003827'
  secondary-container: '#00d29c'
  on-secondary-container: '#00543d'
  tertiary: '#ffb695'
  on-tertiary: '#571f00'
  tertiary-container: '#ed691f'
  on-tertiary-container: '#4c1a00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#00184a'
  on-primary-fixed-variant: '#003fa5'
  secondary-fixed: '#54fdc4'
  secondary-fixed-dim: '#27e0a9'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#00513b'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7c2e00'
  background: '#11131b'
  on-background: '#e1e2ee'
  surface-variant: '#32343e'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is engineered for a premium AI operational environment, blending high-stakes technical precision with an editorial, high-end aesthetic. The target audience includes enterprise leaders and operations managers who require immediate clarity paired with a sophisticated, future-forward interface.

The visual style is **Glassmorphic Corporate**, characterized by:
- **Atmospheric Depth:** Layers of translucent "Graphite" surfaces over a deep, obsidian background.
- **Precision Accents:** High-contrast "Electric Blue" and "Signal Green" used sparingly to denote action and system health.
- **Refined Technicality:** A mix of geometric grotesques and utilitarian sans-serifs that evoke a sense of "monitored intelligence."
- **Optical Luminance:** Subtle blue and green glows emanate from active elements, simulating a high-fidelity dashboard display.

## Colors

The palette is optimized for dark-mode environments to reduce eye strain during prolonged operational monitoring while maintaining high visual impact.

- **Primary (Electric Blue):** Reserved for primary calls-to-action, active states, and AI processing indicators.
- **Secondary (Signal Green):** Dedicated to system "Go" states, successful call completions, and live status indicators.
- **Surface (Graphite):** Used for elevated panels and cards, providing a subtle contrast against the true-black background.
- **Borders:** A custom "Azure-Tinted" border (10-15% opacity Electric Blue) should be applied to all glass panels to define edges without adding visual weight.

## Typography

The typography system relies on a hierarchy of "High-Impact Geometry" and "Functional Legibility."

- **Space Grotesk (Headlines):** Must be set with tight tracking (letter-spacing) to create a compact, editorial look. Use for dashboard stats, section headers, and agent names.
- **DM Sans (Body):** Used for transcripts and descriptions. Its low-contrast, geometric shapes maintain readability against dark, translucent backgrounds.
- **Inter (Labels):** Utilized for technical metadata, timestamps, and status badges. The increased letter-spacing in `label-sm` ensures clarity at small scales.

## Layout & Spacing

This design system employs a **12-column fixed grid** for desktop, centered within the viewport to maintain an editorial feel. 

- **Desktop (1440px+):** 12 columns, 24px gutters, 80px side margins. Content is grouped into "operational modules."
- **Tablet (768px - 1439px):** 8 columns, 16px gutters, 32px side margins.
- **Mobile (Under 768px):** 4 columns, 16px gutters, 16px side margins. Large display type scales down significantly to fit portrait widths.

Vertical rhythm is strictly maintained using multiples of 8px. Large sections (e.g., between the audio waveform and the transcript) should use `xl` spacing to provide "breathing room" consistent with premium design.

## Elevation & Depth

Hierarchy is established through **Luminous Glassmorphism** rather than traditional drop shadows.

1.  **Level 0 (Base):** Deep black (`#06080F`).
2.  **Level 1 (Panels):** Graphite (`#0B0F1C`) with 80% opacity and a 20px backdrop-blur. 1px stroke using a 10% Electric Blue tint.
3.  **Level 2 (Modals/Popovers):** Graphite with 90% opacity, 40px backdrop-blur, and a soft outer glow (`0px 8px 24px rgba(43, 111, 255, 0.15)`).
4.  **Level 3 (Active Elements):** Elements like active conversation bubbles use a subtle inner glow to appear "energized."

## Shapes

The shape language is "Soft-Technical." Edges are primarily sharp or slightly softened to maintain a professional, architectural feel. 

- **Standard Containers:** Use 0.25rem (4px) or 0.5rem (8px) corners to feel precise.
- **Interactive Elements:** Buttons and badges use 0.5rem for a modern touch.
- **Action Badges/Pills:** These are the only elements permitted to use "full-pill" (100px) rounding to distinguish them from structural UI components.

## Components

### Conversation Bubbles
- **Agent:** Graphite background, 1px Electric Blue border (low opacity), left-aligned.
- **User:** Deep Black background, 1px white border (5% opacity), right-aligned.
- **Typography:** DM Sans 16px.

### Audio Waveforms
- **Inactive State:** Muted text color bars at 30% opacity.
- **Active/Played State:** Electric Blue bars with a subtle `2px` blur glow behind the playhead.
- **Interaction:** Seek bar should be a 2px Electric Blue line.

### Dashboard Cards
- **Header:** Space Grotesk Bold.
- **Content:** Wrapped in Level 1 Glass panels.
- **Footer:** Use `label-sm` for timestamps or metadata.

### Action Badges
- **Status:** Small, pill-shaped. "Live" uses Signal Green with a pulsing 4px glow.
- **Action:** Electric Blue background with Inter Bold (White) text.

### Input Fields
- **Style:** Underlined or ghost-style (no fill) with a 1px border at the bottom.
- **Focus:** Border-bottom transitions to 2px Electric Blue with a soft blue shadow beneath the line.