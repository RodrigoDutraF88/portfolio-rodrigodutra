// Build-time GitHub data. Fetched during the build (revalidated daily) and
// baked into the static page. Every failure path returns null so the page
// renders without live data instead of breaking the build or the request.
import { site } from "@/lib/site";

export type GithubRepo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
};

export type GithubStats = {
  publicRepos: number;
  totalStars: number;
  topRepos: GithubRepo[];
};

const login = site.github.split("/").filter(Boolean).pop() ?? "";

type ApiRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
};

export async function getGithubStats(): Promise<GithubStats | null> {
  if (!login) return null;

  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": login,
    };
    const next = { revalidate: 86400 };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${login}`, { headers, next }),
      fetch(`https://api.github.com/users/${login}/repos?per_page=100&sort=pushed`, {
        headers,
        next,
      }),
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as { public_repos?: number };
    const repos = (await reposRes.json()) as ApiRepo[];
    if (!Array.isArray(repos)) return null;

    const owned = repos.filter((repo) => !repo.fork);
    const totalStars = owned.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const topRepos = [...owned]
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
      )
      .slice(0, 4)
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
      }));

    return {
      publicRepos: user.public_repos ?? owned.length,
      totalStars,
      topRepos,
    };
  } catch {
    return null;
  }
}
