import { site, ui, t, type Lang } from "@/content.config";
import { fmtHour } from "@/lib/utils";
import { LogoMark } from "./Logo";

export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[110rem] gap-12 px-[var(--gutter)] py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight">
            <LogoMark className="size-6" /> {site.name}
          </p>
          <p className="mt-4 max-w-[30ch] text-muted">{t(ui.hero.sub, lang)}</p>
        </div>

        <div>
          <h2 className="eyebrow">{t(ui.footer.visit, lang)}</h2>
          <address className="mt-4 not-italic leading-relaxed">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.country}
          </address>
        </div>

        <div>
          <h2 className="eyebrow">{t(ui.footer.hours, lang)}</h2>
          <p className="tnum mt-4 leading-relaxed">
            {t(ui.footer.daily, lang)}
            <br />
            {fmtHour(site.hours.open, lang)} – {fmtHour(site.hours.close, lang)}
          </p>
        </div>

        <div>
          <h2 className="eyebrow">{t(ui.footer.contact, lang)}</h2>
          <ul className="mt-4 space-y-1.5">
            <li>
              <a className="transition-colors duration-150 hover:text-accent" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="tnum transition-colors duration-150 hover:text-accent" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li className="flex gap-4 pt-2 text-muted">
              <a className="transition-colors duration-150 hover:text-fg" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a className="transition-colors duration-150 hover:text-fg" href={site.social.tiktok} target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[110rem] flex-col gap-2 border-t border-line px-[var(--gutter)] py-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name} {t(ui.footer.rights, lang)}
        </p>
        {site.showCredit && (
          <p>
            {t(ui.footer.credit, lang)}{" "}
            <a className="underline-offset-4 transition-colors duration-150 hover:text-fg hover:underline" href="https://tododeia.com" target="_blank" rel="noopener noreferrer">
              Tododeia
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
