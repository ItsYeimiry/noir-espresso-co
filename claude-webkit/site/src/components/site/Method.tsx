"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ui, t, type Lang } from "@/content.config";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Method({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const steps = ui.method.steps;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="mx-auto max-w-[110rem] px-[var(--gutter)] py-[clamp(5rem,10vw,9rem)]"
    >
      <Reveal>
        <p className="eyebrow">{t(ui.method.eyebrow, lang)}</p>
      </Reveal>
      <Reveal delay={1}>
        <h2 id="method-title" className="h2 mt-4 max-w-[16ch]">
          {t(ui.method.title, lang)}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-x-16 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+2rem)] h-[calc(100svh-var(--nav-h)-4rem)] max-h-[44rem] overflow-hidden rounded-[1.75rem] bg-surface">
            {steps.map((s, i) => (
              <Image
                key={s.k.es}
                src={s.image}
                alt=""
                fill
                sizes="50vw"
                quality={85}
                className={cn(
                  "object-cover transition-opacity duration-[700ms] ease-[var(--ease-out)]",
                  i === active ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </div>

        <ol>
          {steps.map((s, i) => (
            <li
              key={s.k.es}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-index={i}
              className={cn(
                "flex flex-col justify-center gap-6 py-10 lg:min-h-[78svh] lg:py-0",
                "transition-opacity duration-500 ease-[var(--ease-out)] lg:data-[active=false]:opacity-35",
              )}
              data-active={i === active}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-surface lg:hidden">
                <Image src={s.image} alt="" fill sizes="100vw" quality={80} className="object-cover" />
              </div>
              <p className="eyebrow tnum">
                {String(i + 1).padStart(2, "0")} · {t(s.k, lang)}
              </p>
              <h3 className="display text-[length:var(--text-h3)] max-w-[18ch]">{t(s.t, lang)}</h3>
              <p className="max-w-[44ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{t(s.d, lang)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
