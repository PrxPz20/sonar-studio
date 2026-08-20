# Sonar Studio

Production website for Sonar Studio: an AI-search-first web studio serving businesses in the UK, Ireland, Cyprus and beyond.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at `http://localhost:3000` by default.

## Environment

- `RESEND_API_KEY` — Resend API key for the enquiry form
- `RESEND_FROM` — verified sender address
- `CONTACT_TO` — destination for enquiries
- `NEXT_PUBLIC_SITE_URL` — canonical production URL
- `NEXT_PUBLIC_FOUNDER_NAME` — public founder name for structured data
- `NEXT_PUBLIC_INSTAGRAM_URL` and `NEXT_PUBLIC_LINKEDIN_URL` — optional social links and structured data

The contact API validates all input with Zod. Without a Resend key, it returns a controlled service-unavailable response instead of pretending the submission succeeded.

## Owner-supplied assets

The experience is complete with purposeful fallbacks. Add the final assets at these exact paths to activate the richer visuals without changing components:

- `public/visuals/sonar-signal/Sonar_Signal_Animation_dc.html`
- `public/models/sonar-transducer_glb.glb`
- final proof screenshots in `public/results/`
- final logo files in `public/brand/`

The WebGL model and interactive hero load only on capable desktop devices, respect reduced-motion and data-saver preferences, pause offscreen, and clean up their render loops.

## Commands

```bash
npm run lint
npm run build
npm run start
```

Product requirements and implementation decisions live in `PRODUCT.md` and `DESIGN.md`.
