"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { site, ui, t, type Lang } from "@/content.config";
import { Button } from "@/components/ui/button";
import { cn, fmtHour, timeSlots } from "@/lib/utils";
import { useToday } from "@/lib/hooks";
import { Reveal } from "./Reveal";

type Errors = Partial<Record<"name" | "date" | "time", string>>;

const field =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-fg transition-[border-color,box-shadow] duration-150 placeholder:text-muted/70 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 aria-[invalid=true]:border-[oklch(0.7_0.17_25)]";

export function Reservation({ lang }: { lang: Lang }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const today = useToday();
  const slots = timeSlots(site.hours.open, site.hours.close);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = {
      name: String(f.get("name") ?? "").trim(),
      date: String(f.get("date") ?? ""),
      time: String(f.get("time") ?? ""),
      guests: String(f.get("guests") ?? "2"),
      notes: String(f.get("notes") ?? "").trim(),
    };

    const next: Errors = {};
    if (!v.name) next.name = t(ui.reserve.errName, lang);
    if (!v.date || (today && v.date < today)) next.date = t(ui.reserve.errDate, lang);
    if (!slots.includes(v.time)) next.time = t(ui.reserve.errTime, lang);
    setErrors(next);

    const firstInvalid = (["name", "date", "time"] as const).find((k) => next[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const prettyDate = new Date(`${v.date}T12:00:00`).toLocaleDateString(lang === "es" ? "es" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const text = ui.reserve.message(lang, { ...v, date: prettyDate, time: fmtHour(v.time, lang) });
    setStatus(lang === "es" ? "Abriendo WhatsApp…" : "Opening WhatsApp…");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="reserve" aria-labelledby="reserve-title" className="relative isolate overflow-hidden">
      <Image src="/images/visit/space.jpg" alt="" fill sizes="100vw" quality={80} className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-bg/65" />

      <div className="mx-auto grid max-w-[110rem] gap-14 px-[var(--gutter)] py-[clamp(5rem,10vw,9rem)] lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-24">
        <div className="self-start lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
          <Reveal>
            <p className="eyebrow">{t(ui.reserve.eyebrow, lang)}</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 id="reserve-title" className="h2 mt-4 max-w-[10ch]">
              {t(ui.reserve.title, lang)}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-[40ch] text-[length:var(--text-lead)] leading-relaxed text-muted">
              {t(ui.reserve.sub, lang)}
            </p>
            <p className="tnum mt-8 text-sm text-muted">
              {t(ui.reserve.hours, lang)} {fmtHour(site.hours.open, lang)} {t(ui.reserve.to, lang)}{" "}
              {fmtHour(site.hours.close, lang)}
            </p>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[1.75rem] border border-line bg-surface/80 p-6 backdrop-blur-xl sm:p-8">
            <div>
              <label htmlFor={id("name")} className="eyebrow mb-2 block">
                {t(ui.reserve.name, lang)}
              </label>
              <input
                id={id("name")}
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? id("name-err") : undefined}
                className={field}
              />
              {errors.name && <Err id={id("name-err")}>{errors.name}</Err>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={id("date")} className="eyebrow mb-2 block">
                  {t(ui.reserve.date, lang)}
                </label>
                <input
                  id={id("date")}
                  name="date"
                  type="date"
                  min={today}
                  required
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? id("date-err") : undefined}
                  className={field}
                />
                {errors.date && <Err id={id("date-err")}>{errors.date}</Err>}
              </div>
              <div>
                <label htmlFor={id("time")} className="eyebrow mb-2 block">
                  {t(ui.reserve.time, lang)}
                </label>
                <Select
                  id={id("time")}
                  name="time"
                  defaultValue=""
                  invalid={!!errors.time}
                  describedBy={errors.time ? id("time-err") : undefined}
                >
                  <option value="" disabled>
                    —
                  </option>
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      {fmtHour(s, lang)}
                    </option>
                  ))}
                </Select>
                {errors.time && <Err id={id("time-err")}>{errors.time}</Err>}
              </div>
            </div>

            <div>
              <label htmlFor={id("guests")} className="eyebrow mb-2 block">
                {t(ui.reserve.guests, lang)}
              </label>
              <Select id={id("guests")} name="guests" defaultValue="2">
                {Array.from({ length: site.maxGuests }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label htmlFor={id("notes")} className="eyebrow mb-2 block">
                {t(ui.reserve.notes, lang)}
              </label>
              <textarea
                id={id("notes")}
                name="notes"
                rows={3}
                placeholder={t(ui.reserve.notesHint, lang)}
                className={cn(field, "h-auto resize-none py-3")}
              />
            </div>

            <Button type="submit" variant="accent" size="lg" className="mt-1 w-full">
              {t(ui.reserve.submit, lang)}
            </Button>
            <p role="status" aria-live="polite" className="min-h-5 text-center text-sm text-muted">
              {status}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Err({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-[oklch(0.78_0.14_25)]">
      {children}
    </p>
  );
}

function Select({
  invalid,
  describedBy,
  children,
  ...props
}: React.ComponentProps<"select"> & { invalid?: boolean; describedBy?: string }) {
  return (
    <div className="relative">
      <select
        {...props}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={cn(field, "cursor-pointer appearance-none pr-10")}
      >
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </div>
  );
}
