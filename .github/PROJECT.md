# Project Board

The roadmap is tracked in the repo today. When the `gh` CLI is installed and authorized, this
file is the recipe to mirror it into GitHub Issues and a Project board. Nothing here runs on its
own. Run the commands yourself once you are signed in.

## One time setup

Install and sign in:

```bash
brew install gh
gh auth login
```

## Board columns

The board uses four columns that map to the roadmap milestones:

- Backlog
- In progress
- Review
- Done

## Milestones

Create one milestone per roadmap group:

```bash
gh api repos/:owner/:repo/milestones -f title="M1 Foundation"
gh api repos/:owner/:repo/milestones -f title="M2 Design system and i18n"
gh api repos/:owner/:repo/milestones -f title="M3 Core sections"
gh api repos/:owner/:repo/milestones -f title="M4 Projects and systems"
gh api repos/:owner/:repo/milestones -f title="M5 Contact, SEO, performance, a11y"
gh api repos/:owner/:repo/milestones -f title="M6 Content, testing, deploy, launch"
```

## Labels

```bash
gh label create task --color 1f6feb
gh label create content --color 8957e5
gh label create design --color 2da44e
gh label create infra --color 6e7681
```

## Issues

Create one issue per roadmap day, for example:

```bash
gh issue create --title "day 2: design system" --label design --milestone "M2 Design system and i18n"
gh issue create --title "day 3: i18n routing and pt catalog" --label task --milestone "M2 Design system and i18n"
```

The full list of days is in [../docs/ROADMAP.md](../docs/ROADMAP.md).

## Project

```bash
gh project create --owner "@me" --title "Portfolio"
```

Then add the issues to the project from the GitHub UI or with `gh project item-add`.
