# portfolio_tupola

Personal portfolio website built with Next.js, TypeScript and Tailwind CSS. A responsive, bilingual (Finnish / English) portfolio that showcases work experience, projects, skills, and personal information.

Live site: [tupola.dev](https://tupola.dev)

---

## Features

- Responsive portfolio layout (desktop, tablet, mobile)
- Work experience timeline
- Projects list with modal detail view and media carousel (images, videos, YouTube)
- Skills section grouped by category
- Bilingual content (Finnish / English) with the chosen language remembered between visits
- Navigation bar that highlights the section currently in view
- Content is prerendered into the HTML at build time, so search engines and link previews see the full page
- Structured data (schema.org `Person`) for search engines
- Open Graph and Twitter Card meta tags for social sharing previews
- Animated gradient background

## Tech stack

- **Framework:** Next.js (Pages Router, static prerendering)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** React 19
- **Analytics:** Vercel Analytics & Speed Insights
- **Animation:** Motion
- **Media:** Static files in `public/Media/`

## Deployment

Deployed to [Vercel](https://vercel.com/)

## Project structure

- `components/` — React components (Header, Profile, Work, Projects, Skills, Info, Footer, MediaCarousel, LangChanger, AnimatedBackground)
- `lib/` — Shared helpers (footer link handling)
- `pages/` — Next.js pages (`index.tsx`, `_app.tsx`)
- `types/` — TypeScript type definitions for the content JSON (`content.ts`)
- `styles/` — Global CSS (`globals.css`)
- `public/Media/` — Static images, videos and CV PDFs
- `public/Data/` — Localized content JSON files (`Fin.json`, `Eng.json`)

## Localization / Content

All text on the site comes from two JSON files under `public/Data/`:

- `Fin.json` — Finnish content
- `Eng.json` — English content

Both files are bundled into the site at build time, so **changes to them show up only after a rebuild** (locally, restart `npm run dev` if needed; on Vercel, push to deploy).

Each file has the same top-level keys: `Nav`, `Profile`, `Work`, `Projects`, `Skills`, `info` and `footer`. Keep the structure identical in both languages. The expected shape of each section is defined in [`types/content.ts`](types/content.ts).

Notes:

- **Nav:** each link's `id` must match a section `id` in `pages/index.tsx` (e.g. `work`, `projects`). Keep the ids the same in both languages.
- **Work:** `Work.jobs` is a list of jobs. `title`, `company`, `Timeline` and `description` are required; `location`, `logo`, `tasks`, `links` and `Tech` are optional and hidden when empty.
- **Projects:** `Projects.projects` is a list of projects shown as cards; details open in a modal.
- **Skills:** `Skills.items` is a list of skills; each skill's `slot` decides which category it is grouped under.
- **Footer:** `footer.email` and `footer.Links` are used both in the footer and as social links in the profile section.

## Contact

If you find a bug, error, typo or have an improvement suggestion, please contact me.

Author: Teemu Tupola

Email: [teemu.tupola@gmail.com](mailto:teemu.tupola@gmail.com)
