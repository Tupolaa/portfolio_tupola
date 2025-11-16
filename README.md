# portfolio_tupola

Personal portfolio website — built with Next.js and plain CSS. This repository contains the source for a responsive, bilingual (Finnish / English) portfolio that showcases projects, skills, and personal information.

---

## Features

- Responsive portfolio layout (desktop, tablet, mobile)
- Animated SVG headings and a TiltedCard component for profile photo
- Projects list with modal detail view and media carousel (images/videos/YouTube)
- Skills section with categories, level indicator and hover description overlays
- Bilingual content support via JSON files (`public/Data/Fin.json`, `public/Data/Eng.json`)

## Tech stack

- Framework: Next.js
- Language: JavaScript (React)
- Styling: CSS modules / global CSS in `styles/`
- Media: static files in `public/Media/`


## Deployment

Deployed  to [Vercel](https://vercel.com/)

## Project structure (important files)

- `components/` — React components (Header, Footer, Profile, Projects, Skills, MediaCarousel, TiltedCard, etc.)
- `pages/` — Next.js pages (index.js and app/document wrappers)
- `public/Media/` — static images and videos
- `public/Data/Fin.json` & `public/Data/Eng.json` — localized content used by `useLanguage` hook
- `styles/` — CSS files for components and global styles
- `package.json` — scripts and dependencies

## Localization / Content

This project loads content from JSON files under `public/Data/`:

- `Fin.json` — Finnish content
- `Eng.json` — English content

Each file contains keys for `Profile`, `Projects`, `Skills`, `Footer`, etc. Keep the JSON structure consistent: arrays for lists (e.g., `Projects.projects` or `Skills.items`) and use `slot` fields in skills for category filtering.

## Styling & Components

Styles are in `styles/` (e.g., `Profile.css`, `Projects.css`, `Skills.css`, `Header.css`, `Footer.css`). The code uses plain CSS (no CSS-in-JS). Keep responsive breakpoints in these files to ensure mobile/tablet compatibility.

## License

This repository does not include a license by default. Add a `LICENSE` file (e.g., MIT) if you want to make the project open source.

## Contact

Author: Teemu Tupola

Email: teemu.tupola@gmail.com