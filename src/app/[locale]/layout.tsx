import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site, siteUrl } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = `/${locale}`;
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: `%s · ${site.name}` },
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}` },
    },
    openGraph: {
      type: "website",
      locale,
      url: path,
      siteName: site.name,
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

// Applies the saved theme before paint so there is no flash. Light is the
// default; a saved choice always wins.
const themeScript = `
document.documentElement.classList.add('js');
try {
  var t = localStorage.getItem('theme');
  if (t !== 'light' && t !== 'dark') {
    t = 'light';
  }
  document.documentElement.dataset.theme = t;
} catch (e) {
  document.documentElement.dataset.theme = 'light';
}
`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <script
          type="application/ld+json"
          // JSON-LD is trusted, generated from our own data.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: siteUrl,
              jobTitle: "Software Engineer",
              alumniOf: "Universidade de Brasília",
              sameAs: [site.github, site.linkedin, site.leetcode, site.linktree],
            }),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col border-x-2 border-[var(--stroke)]">
            <SiteHeader />
            <div className="flex flex-1 flex-col">{children}</div>
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
