# Setup

Getting the project running on your machine.

## Requirements

- Node 20 or newer (developed on Node 22)
- npm 10 or newer

Check with:

```bash
node --version
npm --version
```

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

None are required for local development. Optional values go in a `.env.local` file, which git
ignores.

| Variable               | Required | Purpose                                                                                          |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `GITHUB_TOKEN`         | No       | Raises the GitHub API rate limit used by the build time data fetch. A read only token is enough. |
| `NEXT_PUBLIC_SITE_URL` | No       | Absolute site URL used for canonical links and Open Graph. Defaults to localhost in dev.         |

Copy the example when it exists:

```bash
cp .env.example .env.local
```

## Before you commit

Run the same checks CI runs:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

## Troubleshooting

- Type errors about generated route types usually clear after `npm run build`, which regenerates
  the Next type files.
- If styles look unstyled, confirm `globals.css` is imported in `src/app/layout.tsx`.
