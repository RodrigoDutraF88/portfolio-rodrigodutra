# Roadmap

The build runs over fifteen days with one to three commits a day. Each day is a coherent slice
that leaves the site working. This file is the source that mirrors to a GitHub Project board once
the `gh` CLI is set up.

## Milestones

- M1 Foundation: project, tooling, docs (day 1)
- M2 Design system and i18n (days 2 to 3)
- M3 Core sections: hero, nav, about, skills (days 4 to 5)
- M4 Projects and systems (days 6 to 8)
- M5 Contact, SEO, performance, a11y (days 9 to 11)
- M6 Content, testing, deploy, launch (days 12 to 15)

## Days

| Day | Focus                   | Result                                                 |
| --- | ----------------------- | ------------------------------------------------------ |
| 1   | Foundation and docs     | App scaffolded, tooling set, docs written              |
| 2   | Design system           | Tokens, theme, fonts, base layout, style guide page    |
| 3   | i18n                    | pt, en, it routing, switcher, pt catalog complete      |
| 4   | Hero and navigation     | Terminal hero with profile photo, nav, palette, footer |
| 5   | About and skills        | Bio, skills grid, experience timeline                  |
| 6   | Projects data and cards | Typed content, filterable grid, two projects per row   |
| 7   | Project detail pages    | Case studies for the main projects                     |
| 8   | GitHub and systems      | Build time data, homelab and systems section           |
| 9   | Contact and motion      | Links, resume, purposeful animation pass               |
| 10  | SEO and metadata        | Metadata, Open Graph, sitemap, hreflang, JSON-LD       |
| 11  | a11y and performance    | Keyboard, contrast, images, Lighthouse tuning          |
| 12  | English content         | en catalog filled, pt proofread                        |
| 13  | Testing and CI          | Unit tests, smoke tests, GitHub Actions                |
| 14  | Deploy                  | Vercel, analytics, domain                              |
| 15  | Launch and Italian      | it content, final QA, repo descriptions, launch        |

## Priority if time runs short

- pt and en ship. Italian is a stretch.
- End to end tests and Lighthouse CI are stretch.
- The command palette and live GitHub data stay in. They carry the technical signal.

## Repository descriptions

Ready to apply to the GitHub repos. Plain and human, no filler.

| Repo                     | Description                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| bookshelf-app            | Full stack reading tracker where you catalog books, log progress, and rate what you finish. Built with Next.js, tRPC, Prisma, and PostgreSQL. |
| AlgoCards                | Flashcards for algorithms and data structures that schedule reviews with the FSRS spaced repetition model, so interview prep actually sticks. |
| ValeteDeCopas backend    | Marketplace backend built for the CJR selection process at UnB, covering auth, listings, and orders.                                          |
| dev-homelab              | My self hosted development setup on Fedora Linux, with the scripts and configs I use to rebuild it from scratch.                              |
| BudgetPro                | Personal finance dashboard that tracks spending and converts currencies in real time, with charts for monthly trends.                         |
| Projeto-UniTask          | Task manager with JWT auth and a Supabase backend for organizing coursework and personal todos.                                               |
| cli-cinema-manager       | Command line tool in Python for managing cinema sessions, rooms, and ticket sales from the terminal.                                          |
| learning-journal-2026    | A running log of what I learn in 2026, with notes and small projects for each new tool or topic.                                              |
| estrutura-de-dados-1-unb | Data Structures 1 coursework at UnB, implemented in C from linked lists to trees.                                                             |
| typescript-learning      | Notes and runnable examples following the official TypeScript handbook.                                                                       |
| html-css-challenges      | My first web projects while learning HTML and CSS fundamentals.                                                                               |
| COMP1                    | Compilers 1 coursework at UnB, working through lexical and syntax analysis in C.                                                              |
