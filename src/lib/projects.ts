// Typed project content. The slug is the stable id and the i18n key; the
// description is translated per locale under `projects.items.<slug>`. Names and
// repos are proper nouns kept language neutral. A repo is the real slug under
// site.github, or an "owner/name" pair when the repository lives under a
// teammate or an org, so the card link resolves either way.
import { site } from "@/lib/site";

export const projectCategories = ["fullstack", "backend", "systems", "learning"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  name: string;
  repo?: string;
  category: ProjectCategory;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "bookshelf",
    name: "Bookshelf App",
    repo: "bookshelf-app",
    category: "fullstack",
    tags: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Docker"],
  },
  {
    slug: "algocards",
    name: "AlgoCards",
    repo: "AlgoCards",
    category: "fullstack",
    tags: ["Next.js", "tRPC", "Prisma", "FSRS"],
  },
  {
    slug: "stockio",
    name: "Stock.io",
    repo: "GiovanniMateus/ValeteDeCopas_PT_CJR_Backend",
    category: "backend",
    tags: ["NestJS", "Prisma", "PostgreSQL", "JWT"],
  },
  {
    slug: "homelab",
    name: "Dev Homelab",
    repo: "dev-homelab",
    category: "systems",
    tags: ["Fedora", "Docker", "Traefik", "Grafana"],
  },
  {
    slug: "piggyme",
    name: "PiggyMe",
    repo: "FGA0138-MDS-Ajax/2026.1-T03-Brooks",
    category: "fullstack",
    tags: ["Node.js", "Express", "MySQL", "JWT"],
  },
  {
    slug: "unitask",
    name: "UniTask",
    repo: "Projeto-UniTask",
    category: "fullstack",
    tags: ["JavaScript", "Express", "Supabase", "Canvas API"],
  },
  {
    slug: "budgetpro",
    name: "BudgetPro",
    repo: "BudgetPro",
    category: "fullstack",
    tags: ["JavaScript", "Chart.js", "LocalStorage", "Fetch API"],
  },
  {
    slug: "atividadeDocker",
    name: "Atividade Docker",
    repo: "ATIVIDADE-DOCKER",
    category: "systems",
    tags: ["Docker", "Compose", "GitHub Actions", "GHCR"],
  },
  {
    slug: "learning",
    name: "Learning Journal 2026",
    repo: "learning-journal-2026",
    category: "learning",
    tags: ["TypeScript", "NestJS", "Algorithms"],
  },
];

/** The public GitHub URL for a project, when it has a public repository. An
 * "owner/name" repo links under that owner; a bare slug links under site.github. */
export function repoUrl(project: Project): string | null {
  if (!project.repo) return null;
  return project.repo.includes("/")
    ? `https://github.com/${project.repo}`
    : `${site.github}/${project.repo}`;
}
