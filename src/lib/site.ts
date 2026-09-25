// Single source for profile links and the main section anchors.
export const site = {
  name: "Rodrigo Dutra",
  handle: "rodrigo",
  github: "https://github.com/RodrigoDutraF88",
  linkedin: "https://www.linkedin.com/in/rodrigodutra8",
  leetcode: "https://leetcode.com/u/Rodrigo88/",
  linktree: "https://linktr.ee/rodrigodutra_",
  email: "rodrigodutraf88@gmail.com",
  // E.164 without the plus, for wa.me. Displayed as +55 (61) 99997-1502.
  whatsapp: "5561999971502",
} as const;

// Canonical production origin, used for metadata, sitemap, and Open Graph.
// Override with NEXT_PUBLIC_SITE_URL once the real domain is live.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rodrigodutra.dev").replace(
  /\/$/,
  "",
);

// Stable, language neutral section ids. Nav labels are translated separately.
export const sections = ["about", "projects", "contact"] as const;

export type SectionId = (typeof sections)[number];

// Downloadable resume, served from /public. Swap in the real file per language later.
export const resumeHref = "/cv.pdf";

export const externalLinks = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "LeetCode", href: site.leetcode },
] as const;
