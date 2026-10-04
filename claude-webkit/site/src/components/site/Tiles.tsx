import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ui, t, type Lang } from "@/content.config";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const tiles = [
  { id: "coffee", image: "/images/tiles/coffee.jpg", copy: ui.tiles.coffee, span: "lg:col-span-7 lg:aspect-[4/3]" },
  { id: "pastry", image: "/images/tiles/pastry.jpg", copy: ui.tiles.pastry, span: "lg:col-span-5" },
  { id: "reserve", image: "/images/tiles/reserve.jpg", copy: ui.tiles.reserve, span: "lg:col-span-12 lg:aspect-[21/8]" },
] as const;

export function Tiles({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="tiles-title" className="mx-auto max-w-[110rem] px-[var(--gutter)] pb-[clamp(5rem,10vw,9rem)]">
      <Reveal>
        <h2 id="tiles-title" className="eyebrow mb-6">
          {t(ui.tiles.title, lang)}
        </h2>
      </Reveal>
      <ul className="grid gap-3 sm:gap-4 lg:grid-cols-12">
        {tiles.map((tile, i) => (
          <li key={tile.id} className={cn("min-h-[22rem] sm:min-h-[26rem] lg:min-h-0", tile.span)}>
            <Reveal delay={i} className="h-full">
              <a
                href={`#${tile.id}`}
                className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 text-on-media sm:p-9"
              >
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  quality={80}
                  className="-z-20 object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.035]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,oklch(0.1_0.01_55/0.78),oklch(0.1_0.01_55/0.05)_62%)]"
                />
                <h3 className="display max-w-[14ch] text-[length:var(--text-h3)]">{t(tile.copy.t, lang)}</h3>
                <p className="mt-2 max-w-[34ch] text-on-media/80">{t(tile.copy.d, lang)}</p>
                <span className="link-arrow mt-5 text-sm">
                  {t(ui.tiles.cta, lang)} <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
