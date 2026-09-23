# Sonar Studio Design System

## Source and scope

The approved Sonar Studio design-system audit is the source for this implementation.
Preserve existing copy, Space Grotesk and Inter, the locked brand colours, the hero
WebGL/flip animations, and the 3D transducer with its existing animation and sizing.

## Tokens

- Canvas: `#0B1F1C`; primary teal: `#0E8C7F`; blip: `#14B8A6`.
- Mint: `#6FE3CE`; legacy brand muted: `#7FA39C`; off-white: `#F6F9F8`.
- Surfaces 1–3: `#0B2C28`, `#0C3530`, `#0C3E38`.
- Secondary text: `#B4BCBA`; tertiary text on canvas: `#7C8886`.
- Hairlines: mint at 14% and 28%.
- Structural spacing: 4, 8, 12, 16, 24, 32, 48, 96px.
- Major section padding: 96px; 72px below 768px.
- Shared page frame: 182px outer margins plus 46px inner padding on desktop, reduced responsively on tablet and mobile.

## Typography

- H1: Space Grotesk, 64px/700, 1.05 line height, -1.5px tracking; 40px mobile.
- Section H2: 48px/700, 1.1 line height, -.5px tracking; 24px mobile.
- Subordinate titles: 22–28px/500, 1.25–1.2 line height, -.3–-.4px tracking.
- Body: Inter, 16px/400, 1.6 line height; section copy 24px desktop and 15px mobile.
- Captions: 13px; controls and labels use Inter.
- Body reading measure: 68ch maximum.

## Shared components

- Buttons: 8px radius, Inter 16px/600, 16px/28px padding.
- Secondary buttons: transparent with mint hairlines.
- Inputs: surface-1, 8px radius, 14px padding, visible mint focus outline.
- Form panels: surface-1, 12px radius, 32px padding (24px mobile).
- About feature cards: surface-1, 12px radius, 24px padding, 3/2/1 columns.
- FAQ rows: Space Grotesk 22px/500, 24px vertical padding, mint hairline.
- CTA banners: surface-1, 12px radius, 48px padding (24px mobile), 28px title.
- Header: fixed floating rail; contracts into a centered pill after scroll and switches to the compact mobile menu below 901px.
- Footer: canvas, 64px/32px padding, 13px tertiary text; mobile links remain 44px tall.

## Explicit resolutions of conflicting rules

- Primary teal with either locked text colour fails 4.5:1 at the specified 16px
  label size. The base brand token stays unchanged; the action fill mixes 88% teal
  with 12% canvas for off-white labels. Hover uses blip with canvas-coloured text.
  This is the component-specific exception to the general ban on blip fills.
- Secondary hover uses a teal border and mint text to preserve text contrast.
- CTA corners follow the component's explicit 12px value rather than the conflicting
  16–24px shape guidance. Mobile padding adapts to 24px to keep content usable.
- The homepage headline keeps its existing sizing, weight, tracking and line height
  because the protected flip animation inherits them. Other H1s follow the new role.
- Hero and transducer containers retain their existing dimensions and breakpoints
  so shared gutter changes do not resize the protected visual experiences.
- Paired proof images retain their semantic layout and existing content count.

## Interaction and accessibility

Preserve modal focus restoration, touch targets, intent continuity, live form
feedback, reduced-motion handling, and existing animation timings. Do not add motion,
dependencies, or external requests for styling. Fixed-header clearance is included
in page spacing and focus/anchor scroll offsets.
