"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { pastries, ui, t, money, type Lang } from "@/content.config";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";
import { Reveal } from "./Reveal";
import { ItemDialog } from "./ItemDialog";
import { pastryDetail, type Detail } from "./detail";

export function PastryList({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<string>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<Detail | null>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const tags = useMemo(() => {
    const seen = new Map<string, string>();
    pastries.forEach((p) => seen.set(p.tag.es, t(p.tag, lang)));
    return [...seen.entries()];
  }, [lang]);

  const visible = pastries.filter((p) => filter === "all" || p.tag.es === filter);
  const hoveredItem = pastries.find((p) => p.id === hovered);

  return (
    <section
      id="pastry"
      aria-labelledby="pastry-title"
      className="mx-auto max-w-[110rem] px-[var(--gutter)] py-[clamp(5rem,10vw,9rem)]"
    >
      <Reveal>
        <p className="eyebrow">{t(ui.pastry.eyebrow, lang)}</p>
      </Reveal>
      <Reveal delay={1}>
        <h2 id="pastry-title" className="h2 mt-4 max-w-[16ch]">
          {t(ui.pastry.title, lang)}
        </h2>
      </Reveal>

      <div role="group" aria-label={t(ui.pastry.eyebrow, lang)} className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
        {[["all", t(ui.pastry.all, lang)] as const, ...tags].map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={cn(
              "h-9 shrink-0 cursor-pointer rounded-full border px-4 text-sm transition-[transform,background-color,color,border-color] duration-150 ease-out active:scale-[0.97]",
              filter === key ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-fg/40 hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <ul
        key={filter}
        className="mt-8 animate-[fade-in_320ms_var(--ease-out)] border-t border-line"
        onMouseMove={(e) => {
          x.set(e.clientX + 28);
          y.set(e.clientY - 120);
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {visible.map((p, i) => (
          <li key={p.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => setSelected(pastryDetail(p, lang))}
              onMouseEnter={() => setHovered(p.id)}
              onFocus={() => setHovered(null)}
              className="group grid w-full cursor-pointer grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 py-5 text-left transition-colors duration-200 sm:py-6 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.3fr)_6rem_5rem_1.5rem] md:gap-x-6"
            >
              <span className="tnum text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-[clamp(1.35rem,1rem+1.2vw,2.1rem)] transition-transform duration-300 ease-[var(--ease-out)] md:group-hover:translate-x-2">
                {t(p.name, lang)}
              </span>
              <span className="hidden truncate text-muted md:block">{t(p.description, lang)}</span>
              <span className="hidden text-sm text-muted md:block">{t(p.tag, lang)}</span>
              <span className="tnum text-right font-display text-xl font-semibold">{money(p.price)}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="hidden size-5 text-muted transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
              />
            </button>
          </li>
        ))}
      </ul>

      {canHover && (
        <motion.div
          aria-hidden="true"
          style={{ x: sx, y: sy }}
          animate={{ opacity: hoveredItem ? 1 : 0, scale: hoveredItem ? 1 : 0.95 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="pointer-events-none fixed left-0 top-0 z-40 h-[17rem] w-[13.5rem] overflow-hidden rounded-2xl bg-surface shadow-[0_24px_60px_-20px_oklch(0_0_0/0.55)]"
        >
          {pastries.map((p) => (
            <Image
              key={p.id}
              src={p.image}
              alt=""
              fill
              sizes="216px"
              quality={75}
              className={cn(
                "object-cover transition-opacity duration-200 ease-out",
                hovered === p.id ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </motion.div>
      )}

      <ItemDialog item={selected} onClose={() => setSelected(null)} lang={lang} />
    </section>
  );
}
