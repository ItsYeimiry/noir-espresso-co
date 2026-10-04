"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ui, t, type Lang } from "@/content.config";

export function Statement({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = ref.current?.querySelectorAll("span");
      if (!words?.length) return;
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 48%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <section className="px-[var(--gutter)] py-[clamp(6rem,16vw,14rem)]">
      <p ref={ref} className="display mx-auto max-w-[22ch] text-[clamp(2rem,1rem+4.6vw,5.25rem)] sm:max-w-[26ch]">
        {t(ui.statement.text, lang)
          .split(" ")
          .map((w, i) => (
            <Fragment key={i}>
              <span className="inline-block">{w}</span>{" "}
            </Fragment>
          ))}
      </p>
    </section>
  );
}
