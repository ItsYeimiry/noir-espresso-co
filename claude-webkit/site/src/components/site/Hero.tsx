"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, ui, t, type Lang } from "@/content.config";
import { fmtHour } from "@/lib/utils";
import { scrollToId } from "@/lib/scroll";

export function Hero({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(imageRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  const lines = t(ui.hero.title, lang)
    .split(/(?<=\.)\s+/)
    .map((line) => line.split(" "));
  let index = 0;

  return (
    <section ref={sectionRef} className="relative isolate min-h-[100svh] overflow-hidden text-on-media">
      <div ref={imageRef} className="absolute inset-x-0 -top-[8%] -z-20 h-[116%]">
        <Image
          src="/images/hero/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,oklch(0.1_0.01_55/0.82)_0%,oklch(0.1_0.01_55/0.25)_45%,oklch(0.1_0.01_55/0.45)_100%)]"
      />

      <div className="mx-auto flex min-h-[100svh] max-w-[110rem] flex-col justify-end px-[var(--gutter)] pb-[clamp(3rem,8vh,6rem)] pt-[calc(var(--nav-h)+3rem)]">
        <p className="fade-up eyebrow !text-on-media/80" style={{ "--i": 0 } as React.CSSProperties}>
          <span aria-hidden="true" className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-accent" />
          {t(ui.hero.open, lang)} · {fmtHour(site.hours.open, lang)} – {fmtHour(site.hours.close, lang)}
        </p>

        <h1 className="display mt-6 max-w-[16ch] text-[length:var(--text-display)]">
          {lines.map((words, li) => (
            <span key={li} className="block">
              {words.map((w) => {
                const i = index++;
                return (
                  <Fragment key={`${li}-${i}`}>
                    <span className="mask-line">
                      <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
                    </span>{" "}
                  </Fragment>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="fade-up max-w-[34ch] text-[length:var(--text-lead)] leading-snug text-on-media/85"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {t(ui.hero.sub, lang)}
          </p>
          <div className="fade-up flex flex-wrap items-center gap-x-8 gap-y-3 text-base" style={{ "--i": 4 } as React.CSSProperties}>
            <a
              href="#coffee"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("coffee");
              }}
              className="link-arrow"
            >
              {t(ui.hero.seeMenu, lang)} <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#reserve"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("reserve");
              }}
              className="link-arrow text-on-media/75 hover:text-on-media"
            >
              {t(ui.hero.book, lang)} <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
