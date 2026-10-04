import { coffeeById, money, ui, t, type Coffee, type Lang, type Pastry } from "@/content.config";

export type Detail = {
  id: string;
  image: string;
  title: string;
  kicker?: string;
  description: string;
  notes: string[];
  specs: { label: string; value: string }[];
  price: string;
  extra?: { label: string; value: string };
};

export function coffeeDetail(c: Coffee, lang: Lang): Detail {
  return {
    id: c.id,
    image: c.image,
    title: t(c.name, lang),
    kicker: t(c.kicker, lang),
    description: t(c.description, lang),
    notes: c.notes.map((n) => t(n, lang)),
    specs: [
      { label: t(ui.coffee.origin, lang), value: t(c.origin, lang) },
      { label: t(ui.coffee.method, lang), value: t(c.method, lang) },
      { label: t(ui.coffee.temp, lang), value: c.temp },
      { label: t(ui.coffee.time, lang), value: c.time },
    ],
    price: money(c.price),
  };
}

export function pastryDetail(p: Pastry, lang: Lang): Detail {
  const pair = coffeeById(p.pairing);
  return {
    id: p.id,
    image: p.image,
    title: t(p.name, lang),
    kicker: t(p.tag, lang),
    description: t(p.description, lang),
    notes: p.notes.map((n) => t(n, lang)),
    specs: [],
    price: money(p.price),
    extra: pair ? { label: t(ui.pastry.pairing, lang), value: `${t(pair.name, lang)} · ${t(pair.kicker, lang)}` } : undefined,
  };
}
