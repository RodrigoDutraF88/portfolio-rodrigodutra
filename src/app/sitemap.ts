import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

// Every localized route, with hreflang alternates pointing at each locale.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/styleguide", ...projects.map((project) => `/projects/${project.slug}`)];
  const lastModified = new Date();

  return paths.map((path) => ({
    url: `${siteUrl}/${routing.defaultLocale}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
      ),
    },
  }));
}
