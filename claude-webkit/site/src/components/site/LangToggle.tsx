import Link from "next/link";
import type { Lang } from "@/content.config";
import { cn } from "@/lib/utils";

export function LangToggle({ lang, label }: { lang: Lang; label: string }) {
  return (
    <div className="flex items-center gap-0.5 text-xs font-medium tracking-wide" role="group" aria-label={label}>
      <Link
        href="/"
        hrefLang="es"
        lang="es"
        aria-current={lang === "es" ? "true" : undefined}
        className={cn("rounded-full px-2 py-1 transition-colors duration-150", lang === "es" ? "bg-fg/10 text-fg" : "text-muted hover:text-fg")}
      >
        ES
      </Link>
      <Link
        href="/en"
        hrefLang="en"
        lang="en"
        aria-current={lang === "en" ? "true" : undefined}
        className={cn("rounded-full px-2 py-1 transition-colors duration-150", lang === "en" ? "bg-fg/10 text-fg" : "text-muted hover:text-fg")}
      >
        EN
      </Link>
    </div>
  );
}
