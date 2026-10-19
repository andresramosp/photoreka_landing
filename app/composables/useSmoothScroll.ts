import Lenis from "lenis";

// One Lenis instance shared by every page that opts in. Pages call
// enable() on mount and disable() on unmount; the instance lives while at
// least one user holds it, so navigating between two lx pages never
// tears it down mid-transition.
let lenis: Lenis | null = null;
let users = 0;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useSmoothScroll() {
  const enable = () => {
    if (import.meta.server) return;
    users++;
    if (lenis || prefersReducedMotion()) return;
    lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
      autoRaf: true,
      // Naive UI modals and any element marked data-lenis-prevent keep
      // their own native scroll.
      prevent: (node: HTMLElement) =>
        node.closest?.(".n-modal-container, .n-scrollbar") != null,
    });
  };

  const disable = () => {
    if (import.meta.server) return;
    users = Math.max(0, users - 1);
    if (users > 0 || !lenis) return;
    lenis.destroy();
    lenis = null;
  };

  const scrollTo = (target: string | HTMLElement, offset = 0) => {
    if (import.meta.server) return;
    const el =
      typeof target === "string"
        ? document.querySelector<HTMLElement>(target)
        : target;
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset, duration: 1.6 });
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return { enable, disable, scrollTo };
}
