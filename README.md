# sirazul.dev — portfolio

Personal site of **Md. Sirazul Islam**, Senior Software Engineer (Dhaka).
Live at [sirazul263.vercel.app](https://sirazul263.vercel.app).

## Stack

| Layer      | Choice                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, React Compiler) · React 19                 |
| Language   | TypeScript 5.9, strict                                                         |
| Styling    | Tailwind CSS v4 with a CSS-variable design system, dark + light themes        |
| Motion     | CSS keyframes + IntersectionObserver for reveals · Lenis (idle-loaded) · Motion only inside the lazily loaded command palette |
| Fonts      | Bricolage Grotesque · Instrument Serif italic · JetBrains Mono via `next/font` |
| Data       | Typed content in `content/` · live GitHub stats with hourly ISR                |
| Email      | Server Action + Resend for the contact form                                    |
| SEO        | Metadata API, per-page OG images, generated icons, sitemap, robots, JSON-LD    |
| Quality    | ESLint 9, Playwright smoke + axe accessibility suite, GitHub Actions CI        |
| Security   | CSP, HSTS, frame, referrer and permissions headers from `next.config.ts`       |

## Pages

- `/` — hero, stack ticker, selected work, experience teaser, live GitHub activity
- `/work` — every project plus smaller experiments
- `/work/[slug]` — case study per project, statically generated, own OG image
- `/experience` — career timeline, education, research
- `/about` — bio, working principles, toolkit
- `/contact` — email, socials, contact form
- `/resume` — printable resume generated from the same content files

Press <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere for the command palette.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: Resend + GitHub token
npm run dev
```

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run build`     | Production build                                          |
| `npm run lint`      | ESLint                                                    |
| `npm run typecheck` | `tsc --noEmit`                                            |
| `npm run test:e2e`  | Playwright: every route renders, passes axe, no console errors, headers, OG images, palette, theme toggle. Builds must exist first (`npm run build`). |

CI (`.github/workflows/ci.yml`) runs lint, build, typecheck and the e2e suite on every push and pull request.

## Editing content

All copy lives in `content/`:

- `site.ts` — name, role, email, socials, current role, availability flag, resume path
- `projects.ts` — projects and experiments; set `image: "/projects/<file>.jpg"` on a project to use a real screenshot instead of the generated cover art
- `experience.ts` — companies, positions, education, research
- `skills.ts` — toolkit groups and the home-page ticker

Replace `public/CV_Md_Sirazul_Islam.pdf` and `public/img/portrait.jpg` to update the resume PDF and portrait. The `/resume` page renders from `content/` and can be printed to PDF from the browser.

## Environment variables

See `.env.example`. Without `RESEND_API_KEY` the contact form explains that it is not connected and shows the email address instead of pretending to send. Vercel Analytics and Speed Insights only mount when `VERCEL=1`.

## Performance notes

Above-the-fold content never waits on JavaScript: the hero and page titles use CSS entrances, scroll reveals only hide elements that are below the fold at hydration, and route-change transitions skip the initial load. Lighthouse mobile scores 100 on accessibility, best practices and SEO; real-world LCP is under a second.
