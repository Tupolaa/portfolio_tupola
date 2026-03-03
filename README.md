# portfolio_tupola

Personal portfolio website built with Next.js, TypeScript and Tailwind CSS. A responsive, bilingual (Finnish / English) portfolio that showcases projects, skills, and personal information.

---

## Features

- Responsive portfolio layout (desktop, tablet, mobile)
- Projects list with modal detail view and media carousel (images, videos, YouTube)
- Skills section with categories
- Bilingual content support via JSON files (`public/Data/Fin.json`, `public/Data/Eng.json`)
- Animated background with particles
- Open Graph and Twitter Card meta tags for social sharing previews

## Tech stack

- **Framework:** Next.js (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** React 19
- **Analytics:** Vercel Analytics & Speed Insights
- **Animation:** Motion
- **Media:** Static files in `public/Media/`

## Deployment

Deployed to [Vercel](https://vercel.com/)

## Project structure

- `components/` — React components (Header, Footer, Profile, Projects, Skills, Info, MediaCarousel, LangChanger, AnimatedBackground)
- `pages/` — Next.js pages (`index.tsx`, `_app.tsx`)
- `types/` — TypeScript type definitions
- `styles/` — Global CSS (`globals.css`)
- `public/Media/` — Static images and videos
- `public/Data/` — Localized content JSON files (Fin.json, Eng.json)
- `package.json` — Scripts and dependencies

## Localization / Content

This project loads content from JSON files under `public/Data/`:

- `Fin.json` — Finnish content
- `Eng.json` — English content

Each file contains keys for `Profile`, `Projects`, `Skills`, `Footer`, etc. Keep the JSON structure consistent: arrays for lists (e.g., `Projects.projects` or `Skills.items`) and use `slot` fields in skills for category filtering.

## Contact

If you find a bug, error, typo or have an improvement suggestion, please contact me.

Author: Teemu Tupola

Email: teemu.tupola@gmail.com
