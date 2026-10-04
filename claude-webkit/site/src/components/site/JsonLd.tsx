import { coffees, pastries, site, ui, t, type Lang } from "@/content.config";

export function JsonLd({ lang }: { lang: Lang }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.name,
    url: lang === "es" ? site.url : `${site.url}/en`,
    description: t(ui.seo.description, lang),
    image: `${site.url}/images/hero/hero.jpg`,
    telephone: site.phone,
    email: site.email,
    servesCuisine: ["Specialty coffee", "Pastry"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: site.hours.open,
      closes: site.hours.close,
    },
    sameAs: Object.values(site.social),
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: t(ui.nav.coffee, lang),
          hasMenuItem: coffees.map((c) => ({
            "@type": "MenuItem",
            name: t(c.name, lang),
            description: t(c.description, lang),
            offers: { "@type": "Offer", price: c.price, priceCurrency: "USD" },
          })),
        },
        {
          "@type": "MenuSection",
          name: t(ui.nav.pastry, lang),
          hasMenuItem: pastries.map((p) => ({
            "@type": "MenuItem",
            name: t(p.name, lang),
            description: t(p.description, lang),
            offers: { "@type": "Offer", price: p.price, priceCurrency: "USD" },
          })),
        },
      ],
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
