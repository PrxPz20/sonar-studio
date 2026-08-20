# Sonar Studio Design System

## Visual theme

An ink-drenched survey instrument: deep field surfaces, horizontal depth rails, hard crop lines and a single returning teal blip. The layout is asymmetric and editorially paced without adopting magazine or terminal cliches.

## Color palette

- Ink: `#0B1F1C`
- Teal: `#0E8C7F`
- Blip: `#14B8A6`
- Mint: `#6FE3CE`
- Muted: `#7FA39C`
- Off-white: `#F6F9F8`

No other hues are introduced. Neutral black, white and grey may support text and surfaces. Blip is reserved for the most important action or state in a composition.

## Typography

- Headings: Space Grotesk, 600 and 700
- Body, controls and labels: Inter, 400, 500, 600 and 700
- Display maximum: 96px
- Display tracking floor: -0.04em
- Body measure: 68ch maximum

## Shape and material

- Buttons may be pill-shaped.
- Panels and form fields use 12px radii.
- Structural content prefers negative space and rules over cards.
- No glass, decorative glow, soft oversized shadows or gradient text.

## Motion

- UI feedback: 140-220ms using `cubic-bezier(0.23, 1, 0.32, 1)`.
- Buttons compress to 0.97 on pointer activation.
- The supplied hero loop and transducer are the only ambient motion.
- Reduced motion removes positional animation and all live WebGL.

## Responsive behavior

- Desktop uses a 12-column asymmetric grid.
- Tablet simplifies overlaps and keeps two-column comparisons where legible.
- Below 768px every section becomes a strict single column with static media fallbacks.
