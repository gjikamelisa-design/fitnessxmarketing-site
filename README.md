# FitnessXMarketing — Astro site

Starter site for fitnessxmarketing.com, built with [Astro](https://astro.build).

## What's here

- `src/layouts/Layout.astro` — shared page shell (nav, footer, brand colors)
- `src/pages/index.astro` — home page
- `src/pages/blog/index.astro` — article listing
- `src/pages/blog/*.astro` — individual articles (one file per article for now)

## Local development (optional)

You don't need this to deploy — Cloudflare Pages builds the site for you on every push. This is only if you want to preview changes on your own machine first.

```
npm install
npm run dev
```

## Deploying

Push this repo to GitHub, then in Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** → pick this repo.

Build command: `npm run build`
Build output directory: `dist`

Every push to `main` redeploys automatically.

## Adding a new article

Copy `src/pages/blog/sample-article.astro`, rename the file, change the content and the `title`/`description` in the frontmatter, then add a link to it from `src/pages/blog/index.astro`. Push to GitHub — it goes live on the next deploy, usually under a minute.
