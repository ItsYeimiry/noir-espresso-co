"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ui, t, type Lang } from "@/content.config";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { scrollToId, setScrollLock } from "@/lib/scroll";
import type { Detail } from "./detail";

export function ItemDialog({ item, onClose, lang }: { item: Detail | null; onClose: () => void; lang: Lang }) {
  // Keep the last item mounted while the close animation plays.
  const [shown, setShown] = useState<Detail | null>(item);
  if (item && item !== shown) setShown(item);

  useEffect(() => {
    setScrollLock(!!item);
    return () => setScrollLock(false);
  }, [item]);

  const d = item ?? shown;

  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      {d && (
        <DialogContent data-lenis-prevent className="p-0">
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[34rem]">
              <Image
                src={d.image}
                alt=""
                fill
                sizes="(min-width: 768px) 32rem, 100vw"
                quality={85}
                className="object-cover"
              />
            </div>

            <div className="flex flex-col p-6 sm:p-9 md:p-11">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-3 z-10 bg-bg/60 backdrop-blur md:right-4 md:top-4"
                  aria-label={t(ui.dialog.close, lang)}
                >
                  <X aria-hidden="true" />
                </Button>
              </DialogClose>

              {d.kicker && <p className="eyebrow">{d.kicker}</p>}
              <DialogTitle className="display mt-3 text-[clamp(2rem,1.3rem+2.4vw,3.4rem)]">{d.title}</DialogTitle>
              <DialogDescription className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
                {d.description}
              </DialogDescription>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label={t(ui.coffee.notes, lang)}>
                {d.notes.map((n) => (
                  <li key={n} className="rounded-full border border-line px-3 py-1 text-sm">
                    {n}
                  </li>
                ))}
              </ul>

              {d.specs.length > 0 && (
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
                  {d.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="eyebrow">{s.label}</dt>
                      <dd className="tnum mt-1 text-[0.9375rem]">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {d.extra && (
                <div className="mt-8 border-t border-line pt-6">
                  <p className="eyebrow">{d.extra.label}</p>
                  <p className="mt-1">{d.extra.value}</p>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between gap-4 pt-9">
                <span className="tnum font-display text-4xl font-semibold tracking-tight">{d.price}</span>
                <Button
                  onClick={() => {
                    onClose();
                    window.setTimeout(() => scrollToId("reserve"), 260);
                  }}
                >
                  {t(ui.dialog.reserveCta, lang)}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
