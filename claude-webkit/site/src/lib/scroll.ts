export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.3, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function setScrollLock(locked: boolean) {
  const lenis = window.__lenis;
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
