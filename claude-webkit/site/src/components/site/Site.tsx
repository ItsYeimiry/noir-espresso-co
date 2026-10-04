import type { Lang } from "@/content.config";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Statement } from "./Statement";
import { Tiles } from "./Tiles";
import { CoffeeShowcase } from "./CoffeeShowcase";
import { Method } from "./Method";
import { PastryList } from "./PastryList";
import { Reservation } from "./Reservation";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { JsonLd } from "./JsonLd";

export function Site({ lang }: { lang: Lang }) {
  return (
    <>
      <SmoothScroll />
      <JsonLd lang={lang} />
      <Nav lang={lang} />
      <main id="main">
        <Hero lang={lang} />
        <Statement lang={lang} />
        <Tiles lang={lang} />
        <CoffeeShowcase lang={lang} />
        <Method lang={lang} />
        <PastryList lang={lang} />
        <Reservation lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
