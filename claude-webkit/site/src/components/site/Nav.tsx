"use client";

import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { ui, site, t, type Lang } from "@/content.config";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/scroll";
import { LogoMark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";

const links = [
  { id: "coffee", label: ui.nav.coffee },
  { id: "method", label: ui.nav.method },
  { id: "pastry", label: ui.nav.pastry },
] as const;

export function Nav({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(id: string) {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 280 : 0);
  }

  return (
    <header
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] backdrop-blur-xl backdrop-saturate-150 transition-[border-color,background-color] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-[color-mix(in_oklab,var(--bg)_78%,transparent)]"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        {t(ui.nav.skip, lang)}
      </a>
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[var(--nav-h)] max-w-[110rem] items-center justify-between px-[var(--gutter)]"
      >
        <a
          href={lang === "es" ? "/" : "/en"}
          aria-label={t(ui.nav.homeLabel, lang)}
          className="flex items-center gap-2.5"
          onClick={(e) => {
            e.preventDefault();
            if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <LogoMark className="size-5" />
          <span className="font-display text-[0.95rem] font-semibold tracking-[-0.02em]">
            NOIR <span className="font-normal text-muted">Espresso Co.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className="text-[0.8125rem] text-muted transition-colors duration-150 hover:text-fg"
              >
                {t(l.label, lang)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block">
            <LangToggle lang={lang} label={t(ui.nav.language, lang)} />
          </div>
          <div className="hidden sm:block">
            <ThemeToggle label={t(ui.nav.theme, lang)} />
          </div>
          <Button
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => go("reserve")}
          >
            {t(ui.nav.reserve, lang)}
          </Button>

          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label={t(ui.nav.menu, lang)}>
                <Menu aria-hidden="true" />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Content
                data-lenis-prevent
                className="dialog-content fixed inset-0 z-[70] flex flex-col bg-bg px-[var(--gutter)] pb-8 pt-3 outline-none"
              >
                <DialogPrimitive.Title className="sr-only">{t(ui.nav.menu, lang)}</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">{site.name}</DialogPrimitive.Description>
                <div className="flex h-[var(--nav-h)] items-center justify-between">
                  <span className="flex items-center gap-2.5 font-display text-[0.95rem] font-semibold">
                    <LogoMark className="size-5" /> NOIR
                  </span>
                  <DialogPrimitive.Close asChild>
                    <Button variant="ghost" size="icon" aria-label={t(ui.nav.close, lang)}>
                      <X aria-hidden="true" />
                    </Button>
                  </DialogPrimitive.Close>
                </div>
                <ul className="mt-10 flex flex-1 flex-col gap-2">
                  {[...links, { id: "reserve", label: ui.nav.reserve }].map((l) => (
                    <li key={l.id}>
                      <a
                        href={`#${l.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          go(l.id);
                        }}
                        className="display block py-2 text-[clamp(2.4rem,11vw,3.5rem)] transition-colors duration-150 hover:text-accent"
                      >
                        {t(l.label, lang)}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-line pt-5">
                  <LangToggle lang={lang} label={t(ui.nav.language, lang)} />
                  <ThemeToggle label={t(ui.nav.theme, lang)} />
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </nav>
    </header>
  );
}
