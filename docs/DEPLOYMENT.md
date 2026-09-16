# Deployment

How the site ships to production.

## Where it runs

The site is hosted on Vercel. Vercel builds every push and gives each pull request a preview URL,
so changes can be reviewed live before they reach production.

## First time setup

1. Create a project on Vercel and connect the GitHub repository.
2. Framework preset: Next.js. Vercel detects this on its own.
3. Build command `npm run build` and output handled by Next. No extra config needed.
4. Add any optional environment variables from [SETUP.md](SETUP.md) under Project Settings.

## Environments

- Production comes from the `main` branch.
- Preview comes from every other branch and pull request.

## Custom domain

1. Add the domain under Project Settings, Domains.
2. Point the DNS records Vercel shows at your registrar.
3. Set `NEXT_PUBLIC_SITE_URL` to the final domain so canonical links and Open Graph are correct.

## Rollback

Every deploy is kept. To roll back, open the Deployments list, find the last good one, and
promote it. No rebuild is required.

## Checklist before promoting

- `npm run build` passes locally
- Lighthouse scores are healthy on mobile
- Open Graph preview renders for the three locales
- `/sitemap.xml` and `/robots.txt` are reachable
