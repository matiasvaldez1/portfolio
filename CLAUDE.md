# Portfolio Rework - Project State

## Current Status: Phase 2 In Progress (i18n + Polish)

The portfolio has been transformed from a basic Next.js site to a **particle universe experience** with Three.js. Currently adding internationalization (EN/ES) support.

---

## Recent Changes (Latest Session)

### Completed
- **Card Component Redesign** - Added description, tech stack tags, hover overlay with "View Project"
- **Loader Optimization** - Reduced min duration from 1500ms to 800ms, faster progress animation
- **Mobile Particle Text** - Scaled down "MATIAS" particle text to fit mobile screens (0.55x scale)
- **Mobile Scroll Indicator** - Now visible on mobile, positioned at bottom of viewport
- **Particle Dispersion** - Reduced spread on scroll (was too chaotic on desktop)

### In Progress (BLOCKED - SSR Error)
- **i18n System** - Created `context/i18n.js` with EN/ES translations
  - Language toggle added to NavBar (desktop + mobile) and Footer
  - All components updated to use translations
  - **BUG**: Getting "Cannot destructure property 'components' of 'object null'" error
  - This is a Next.js SSR issue - context may not be initializing correctly

---

## What's Been Built

### 3D Particle System (`components/Scene/`)
- **Scene.js** - Main R3F Canvas wrapper with postprocessing (Bloom, Noise)
- **ParticleField.js** - 2000 background star particles with organic drift
- **ParticleText.js** - 3000 particles that form "MATIAS", react to cursor, scatter on scroll
- **GlowOrbs.js** - Floating glowing spheres with purple/blue/cyan colors
- **CameraRig.js** - Scroll-driven camera that pulls back as you scroll
- **Loader.js** - Loading screen with progress bar

### i18n System (`context/`) - IN PROGRESS
- **i18n.js** - Context provider with EN/ES translations, system language detection, localStorage persistence

### Smooth Scrolling (`components/Layout/`)
- **SmoothScroll.js** - Lenis smooth scroll wrapper with scroll context

### Hooks (`hooks/`)
- **useScrollProgress.js** - Hook to access scroll progress (0-1)
- **useScrollReveal.js** - GSAP scroll reveal animations

### Redesigned Components
- **NavBar** - Fixed, glassmorphism on scroll, mobile hamburger menu, language toggle
- **Hero** - Clean text overlay integrated with 3D scene, scroll indicator
- **About** - Glassmorphism card, two-column layout, skill pills
- **Card** - Description, tech tags, hover overlay, purple glow on hover
- **Contact** - Centered CTA, copy email button, social links
- **Footer** - Clean signature layout with social icons, language toggle

---

## Tech Stack

```bash
npm install three @react-three/fiber@8.15.19 @react-three/drei@9.88.17 @react-three/postprocessing@2.15.12 gsap lenis --legacy-peer-deps
```

---

## Color Palette

```css
--bg-primary: #050510;         /* Deep space black */
--accent-purple: #e771ff;      /* Neon purple */
--accent-blue: #2954A3;        /* Primary blue */
--accent-cyan: #00d4ff;        /* Cyan accent */
--particle-primary: #667eea;   /* Blue-purple */
```

---

## Current TODOs

### Urgent (Blocking)
- [ ] **Fix i18n SSR error** - Context returns null during server-side rendering
  - Attempted fix: Added default context value
  - May need to use dynamic import or check if running on client

### High Priority
- [ ] Complete i18n integration once SSR issue is fixed
- [ ] Test on different browsers (Chrome, Firefox, Safari)

### Medium Priority
- [ ] Fine-tune particle animation timing
- [ ] Add subtle noise/grain overlay for texture

### Low Priority
- [ ] Add cursor trail effect
- [ ] Create custom 404 page with particle theme
- [ ] Add page transitions between sections

---

## Known Issues

1. **i18n SSR Error** - "Cannot destructure property 'components'" - needs debugging
2. **Google Sheets Warning** - Expected if env vars for project links aren't set
3. **Browserslist Warning** - Run `npx browserslist@latest --update-db` to fix

---

## How to Run

```bash
cd portfolio
npm run dev
# Open http://localhost:3000
```

---

## File Structure

```
portfolio/
├── components/
│   ├── Scene/                    # 3D components
│   │   ├── Scene.js
│   │   ├── ParticleField.js
│   │   ├── ParticleText.js
│   │   ├── GlowOrbs.js
│   │   ├── CameraRig.js
│   │   └── Loader.js
│   ├── Layout/
│   │   └── SmoothScroll.js
│   ├── NavBar/                   # Has language toggle
│   ├── Hero/                     # Has scroll indicator
│   ├── About/
│   ├── Card projects/            # Has description + tech tags
│   ├── Contact/
│   └── Footer/                   # Has language toggle
├── context/                      # NEW
│   └── i18n.js                   # EN/ES translations
├── hooks/
│   ├── useScrollProgress.js
│   └── useScrollReveal.js
├── pages/
│   ├── _app.js                   # Wrapped with I18nProvider
│   └── index.js
├── styles/
│   ├── globals.css
│   └── Index.module.css
└── CLAUDE.md
```

---

## i18n Translations Structure

The `context/i18n.js` file contains translations for:
- `nav` - Navigation links (Home, About, Projects, Contact)
- `hero` - Hero section (greeting, title, location, buttons)
- `about` - About section (label, title, bio paragraphs, section titles)
- `projects` - Project sections (titles, subtitles, view project)
- `contact` - Contact section (label, title, description, copy button)
- `footer` - Footer (copyright)
- `card` - Card buttons (Github, Deploy)

Language detection: System preference via `navigator.language`, saved to localStorage.

---

## Design Reference

Inspired by **basement.studio** but with unique elements:
- Particle universe instead of wireframes
- Organic, flowing aesthetic
- Purple/blue signature colors
- Glow and bloom effects
