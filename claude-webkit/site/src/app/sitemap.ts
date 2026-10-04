export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/content.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), alternates: { languages: { es: site.url, en: `${site.url}/en` } } },
    { url: `${site.url}/en`, lastModified: new Date(), alternates: { languages: { es: site.url, en: `${site.url}/en` } } },
  ];
}
