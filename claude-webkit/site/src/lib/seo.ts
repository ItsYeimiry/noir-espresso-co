import type { Metadata } from "next";
import { site, ui, t, type Lang } from "@/content.config";

export function buildMetadata(lang: Lang): Metadata {
  const path = lang === "es" ? "/" : "/en";
  return {
    metadataBase: new URL(site.url),
    title: t(ui.seo.title, lang),
    description: t(ui.seo.description, lang),
    alternates: {
      canonical: path,
      languages: { es: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t(ui.seo.title, lang),
      description: t(ui.seo.description, lang),
      locale: lang === "es" ? "es_ES" : "en_US",
      url: path,
      images: [{ url: "/images/hero/hero.jpg", width: 2400, height: 1500 }],
    },
    twitter: { card: "summary_large_image", title: t(ui.seo.title, lang), description: t(ui.seo.description, lang) },
  };
}
