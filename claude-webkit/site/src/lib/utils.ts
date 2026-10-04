import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Lang } from "@/content.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "21:30" -> "9:30 PM" (en) or "21:30" (es) */
export function fmtHour(hhmm: string, lang: Lang) {
  if (lang === "es") return hhmm.replace(/^0/, "");
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** 15-minute slots from opening until 30 minutes before closing. */
export function timeSlots(open: string, close: string) {
  const toMin = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };
  const slots: string[] = [];
  for (let t = toMin(open); t <= toMin(close) - 30; t += 15) {
    slots.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
  }
  return slots;
}
