# Content Inventory

Every section, its copy, and the translation status per language. This is the single place to see
what is written and what is missing. Portuguese is the source of truth. English and Italian follow.

Status key: `todo`, `draft`, `done`.

## Sections

| Section        | Purpose                                  | pt    | en    | it    |
| -------------- | ---------------------------------------- | ----- | ----- | ----- |
| Hero           | Photo, name, role, one line pitch        | todo  | todo  | todo  |
| About          | Who I am, full stack and systems story   | draft | draft | draft |
| Skills         | Grouped tools and languages with context | draft | draft | draft |
| Experience     | UnB and CJR timeline (folded into About) | todo  | todo  | todo  |
| Projects list  | Filterable cards                         | draft | draft | draft |
| Project detail | Case studies per project                 | draft | draft | draft |
| Systems        | Homelab, Linux, C and compilers          | draft | draft | draft |
| GitHub         | Live activity and pinned repos           | draft | draft | draft |
| Contact        | Links, email, resume                     | draft | draft | draft |
| Footer         | Small print and secondary links          | todo  | todo  | todo  |

## Projects to feature

Pulled from real repositories. Descriptions are drafted in [ROADMAP.md](ROADMAP.md).

- bookshelf-app
- AlgoCards
- ValeteDeCopas backend
- dev-homelab
- BudgetPro
- Projeto-UniTask
- cli-cinema-manager

## Assets to gather

- Profile photo or avatar
- Resume PDF in each language (placeholder at `public/cv.pdf`, replace with the real CV)
- Project screenshots or short clips (placeholders at `public/projects/*.svg`, revealed on card hover)
- Favicon and Open Graph image set

## Rules

- A section is not `done` in a language until its copy is proofread by a person.
- Italian is the last language filled and is allowed to trail behind.
- A key parity script flags any string present in pt but missing in en or it.
