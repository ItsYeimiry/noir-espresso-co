"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coffees, ui, t, money, type Lang } from "@/content.config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { ItemDialog } from "./ItemDialog";
import { coffeeDetail, type Detail } from "./detail";

const pad = (n: number) => String(n).padStart(2, "0");

export function CoffeeShowcase({ lang }: { lang: Lang }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Detail | null>(null);
  const n = coffees.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = stageRef.current!;
      const track = trackRef.current!;
      // Set before measuring so panels are already full-width when the distance is read.
      stage.dataset.pinned = "true";

      const distance = () => track.scrollWidth - stage.clientWidth;
      let last = 0;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          pin: true,
          scrub: true,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            const i = Math.round(self.progress * (n - 1));
            if (i !== last) {
              last = i;
              setActive(i);
            }
          },
        },
      });
      stRef.current = tween.scrollTrigger ?? null;

      track.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
        const img = panel.querySelector<HTMLElement>("[data-parallax]");
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: -5 },
          {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      return () => {
        delete stage.dataset.pinned;
        stRef.current = null;
        if (progressRef.current) progressRef.current.style.transform = "";
      };
    });

    return () => mm.revert();
  }, [n]);

  const onNativeScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || stageRef.current?.dataset.pinned) return;
    const panels = track.querySelectorAll<HTMLElement>("[data-panel]");
    if (panels.length < 2) return;
    const step = panels[1].offsetLeft - panels[0].offsetLeft;
    const i = Math.min(n - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    setActive(i);
    if (progressRef.current) {
      const max = track.scrollWidth - track.clientWidth;
      progressRef.current.style.transform = `scaleX(${max > 0 ? track.scrollLeft / max : 0})`;
    }
  }, [n]);

  const goTo = useCallback(
    (i: number) => {
      const st = stRef.current;
      if (st) {
        const y = st.start + (i / (n - 1)) * (st.end - st.start);
        if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.1 });
        else window.scrollTo({ top: y, behavior: "smooth" });
        return;
      }
      const track = trackRef.current;
      const panel = track?.querySelectorAll<HTMLElement>("[data-panel]")[i];
      if (track && panel) track.scrollTo({ left: panel.offsetLeft - track.offsetLeft, behavior: "smooth" });
    },
    [n],
  );

  return (
    <section id="coffee" aria-labelledby="coffee-title" className="relative">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)] pb-10 pt-[clamp(5rem,10vw,9rem)]">
        <Reveal>
          <p className="eyebrow">{t(ui.coffee.eyebrow, lang)}</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 id="coffee-title" className="h2 mt-4 max-w-[18ch]">
            {t(ui.coffee.title, lang)}
          </h2>
        </Reveal>
      </div>

      <div ref={stageRef} className="group/stage relative overflow-hidden pb-24 lg:pb-0 data-[pinned=true]:h-[100svh] data-[pinned=true]:pb-0">
        <div
          ref={trackRef}
          onScroll={onNativeScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 group-data-[pinned=true]/stage:h-full group-data-[pinned=true]/stage:snap-none group-data-[pinned=true]/stage:gap-0 group-data-[pinned=true]/stage:overflow-visible group-data-[pinned=true]/stage:px-0 group-data-[pinned=true]/stage:pb-0"
          style={{ scrollPaddingInline: "var(--gutter)" }}
        >
          {coffees.map((c, i) => (
            <article
              key={c.id}
              data-panel
              onFocus={() => {
                if (stageRef.current?.dataset.pinned) goTo(i);
              }}
              className={cn(
                "flex w-[86vw] shrink-0 snap-center flex-col gap-6 sm:w-[28rem]",
                "lg:w-[min(88vw,76rem)] lg:snap-start lg:flex-row lg:items-center lg:gap-16",
                "group-data-[pinned=true]/stage:lg:h-full group-data-[pinned=true]/stage:lg:w-screen group-data-[pinned=true]/stage:lg:px-[var(--gutter)] group-data-[pinned=true]/stage:lg:pb-20",
              )}
            >
              <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[1.5rem] bg-surface lg:w-[min(36vw,32rem)] lg:max-h-[72svh]">
                <div data-parallax className="absolute inset-[-6%]">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 36vw, 86vw"
                    quality={85}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="eyebrow tnum">
                  {pad(i + 1)} / {pad(n)}
                </p>
                <h3 className="display mt-4 text-[clamp(2.4rem,1.2rem+4.2vw,6rem)]">{t(c.name, lang)}</h3>
                <p className="mt-3 text-[length:var(--text-lead)] text-muted">{t(c.kicker, lang)}</p>

                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {c.notes.map((note) => (
                    <li key={note.es} className="flex items-center gap-2">
                      <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                      {t(note, lang)}
                    </li>
                  ))}
                </ul>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-4">
                  <Spec label={t(ui.coffee.origin, lang)} value={t(c.origin, lang)} />
                  <Spec label={t(ui.coffee.method, lang)} value={t(c.method, lang)} />
                  <Spec label={t(ui.coffee.temp, lang)} value={c.temp} />
                  <Spec label={t(ui.coffee.time, lang)} value={c.time} />
                </dl>

                <div className="mt-8 flex items-center gap-6">
                  <span className="tnum font-display text-3xl font-semibold tracking-tight">{money(c.price)}</span>
                  <Button variant="outline" onClick={() => setSelected(coffeeDetail(c, lang))}>
                    {t(ui.coffee.details, lang)}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-[110rem] items-center gap-5 px-[var(--gutter)] group-data-[pinned=true]/stage:absolute group-data-[pinned=true]/stage:inset-x-0 group-data-[pinned=true]/stage:bottom-8 group-data-[pinned=true]/stage:mt-0">
          <p className="tnum w-14 shrink-0 text-sm text-muted" aria-live="polite">
            {pad(active + 1)}/{pad(n)}
          </p>
          <div className="relative h-px flex-1 bg-line">
            <span ref={progressRef} className="absolute inset-0 origin-left scale-x-0 bg-fg" />
            <ul className="absolute inset-x-0 -top-3 hidden justify-between sm:flex">
              {coffees.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${pad(i + 1)} ${t(c.name, lang)}`}
                    aria-current={i === active ? "true" : undefined}
                    className="group/tick flex size-7 cursor-pointer items-center justify-center"
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full bg-muted/70 transition-[transform,background-color] duration-200 ease-out group-hover/tick:scale-150",
                        i === active && "scale-150 bg-accent",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ItemDialog item={selected} onClose={() => setSelected(null)} lang={lang} />
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="tnum mt-1 text-[0.9375rem]">{value}</dd>
    </div>
  );
}
