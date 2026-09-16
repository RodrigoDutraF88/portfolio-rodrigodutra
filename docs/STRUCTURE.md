# Structure

How the project is laid out and why.

## Overview

This is a Next.js App Router project. Pages are static by default so they load fast and are easy
to crawl. Content lives as typed data and MDX, not hardcoded markup, so the same source feeds the
cards, the detail pages, and the structured data.

## Folders

```
.
├── src/
│   ├── app/                 # App Router. Routes live under [locale] once i18n lands.
│   │   ├── layout.tsx       # Root layout, fonts, base html
│   │   ├── page.tsx         # Home (moves under [locale] on i18n day)
│   │   └── globals.css      # Tailwind entry and design tokens
│   ├── components/          # Reusable UI (added as sections are built)
│   ├── content/             # Project data and MDX case studies
│   ├── lib/                 # Helpers: github fetch, i18n config, utils
│   └── messages/            # Translation catalogs: pt.json, en.json, it.json
├── public/                  # Static assets, resume, icons, og images
├── docs/                    # This documentation
└── .github/                 # Issue templates and CI workflows
```

Folders that do not exist yet are created on the day their feature is built. See
[ROADMAP.md](ROADMAP.md) for the order.

## Routing

- `/` redirects to the default locale `pt`.
- `/pt`, `/en`, `/it` render the same tree in each language.
- `/[locale]/projects/[slug]` renders a project case study.

## Content model

- Project metadata is a typed array in `src/content`. Each entry has an id, title, summary,
  stack, links, and a featured flag.
- Long form case studies are MDX files keyed by the same id.
- Translatable strings live in `src/messages/{locale}.json` and are read through next-intl.

## Data at build time

Public GitHub data is fetched during the build, cached, and falls back to a static snapshot so a
failed request never breaks a deploy. No secrets are needed for public data.
