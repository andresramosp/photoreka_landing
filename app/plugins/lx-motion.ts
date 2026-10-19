import type { Directive } from "vue";

/*
 * Motion directives for the lx landing system (see assets/landing-system.scss).
 *
 *   v-reveal                 fade + rise + unblur when the element enters view
 *   v-reveal="120"           same, delayed 120ms
 *   v-reveal="{ variant: 'scale' | 'fade', delay }"
 *
 *   v-split                  title revealed word by word (static text only:
 *                            the text nodes are replaced by word spans)
 *
 *   v-scroll-progress="{ from, to, anchor, mode, distance, disableBelow }"
 *                            writes --p (0..1) on the element while it
 *                            scrolls through the viewport; CSS maps --p to
 *                            transforms. `from`/`to` are viewport fractions
 *                            where the anchor edge sits at p=0 and p=1.
 *                            mode "scroll" uses window.scrollY / (vh*distance).
 */

type RevealOptions = {
  delay?: number;
  variant?: "rise" | "fade" | "scale";
};
type RevealValue = number | RevealOptions | undefined;
type SplitValue = number | { delay?: number } | undefined;
type ProgressOptions = {
  mode?: "view" | "scroll";
  from?: number;
  to?: number;
  anchor?: "top" | "center" | "bottom";
  distance?: number;
  disableBelow?: number;
};
type ProgressValue = ProgressOptions | null | false | undefined;

const delayOf = (v: RevealValue | SplitValue) =>
  typeof v === "number" ? v : (v?.delay ?? 0);

const variantOf = (v: RevealValue) =>
  typeof v === "object" && v?.variant && v.variant !== "rise" ? v.variant : "";

const markIn = (el: Element) => {
  el.classList.add("is-in");
  // Remembered outside `class`: a reactive :class on the same element
  // rewrites the whole attribute and would drop "is-in" (see restore).
  el.setAttribute("data-lx-in", "");
};

let inViewObserver: IntersectionObserver | null = null;
const getInViewObserver = () => {
  if (inViewObserver) return inViewObserver;
  inViewObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        markIn(entry.target);
        inViewObserver?.unobserve(entry.target);
      }
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" },
  );
  return inViewObserver;
};

// Whatever is already on screen at load reveals right away; otherwise an
// element inside the observer's bottom margin would stay hidden, leaving a
// blank band until the first scroll.
const watchInView = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  if ((rect.width || rect.height) && rect.top < window.innerHeight) {
    requestAnimationFrame(() => markIn(el));
    return;
  }
  getInViewObserver().observe(el);
};

// Re-applies the state classes after Vue patches the element's class
// attribute; runs in the same flush, so nothing flickers or re-animates.
const restoreState = (el: HTMLElement) => {
  if (el.hasAttribute("data-lx-split")) el.classList.add("is-split");
  if (el.hasAttribute("data-lx-in")) el.classList.add("is-in");
};

const reveal: Directive<HTMLElement, RevealValue> = {
  getSSRProps(binding) {
    return { "data-reveal": variantOf(binding.value) };
  },
  beforeMount(el, binding) {
    el.setAttribute("data-reveal", variantOf(binding.value));
    const delay = delayOf(binding.value);
    if (delay) el.style.setProperty("--lx-delay", `${delay}ms`);
  },
  mounted(el) {
    watchInView(el);
  },
  updated: restoreState,
  beforeUnmount(el) {
    inViewObserver?.unobserve(el);
  },
};

const splitWords = (root: HTMLElement) => {
  let index = 0;
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        if (!text.trim()) continue;
        const fragment = document.createDocumentFragment();
        for (const part of text.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
            continue;
          }
          const outer = document.createElement("span");
          outer.className = "lx-w";
          const inner = document.createElement("span");
          inner.style.setProperty("--i", String(index++));
          inner.textContent = part;
          outer.appendChild(inner);
          fragment.appendChild(outer);
        }
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    }
  };
  walk(root);
};

const split: Directive<HTMLElement, SplitValue> = {
  getSSRProps() {
    return { "data-split": "" };
  },
  beforeMount(el, binding) {
    el.setAttribute("data-split", "");
    const delay = delayOf(binding.value);
    if (delay) el.style.setProperty("--lx-delay", `${delay}ms`);
  },
  mounted(el) {
    if (el.classList.contains("is-split")) return;
    splitWords(el);
    el.classList.add("is-split");
    el.setAttribute("data-lx-split", "");
    watchInView(el);
  },
  updated: restoreState,
  beforeUnmount(el) {
    inViewObserver?.unobserve(el);
  },
};

type Tracked = { opts: ProgressOptions; active: boolean; last: number };
const tracked = new Map<HTMLElement, Tracked>();
let framePending = false;
let listening = false;
let activityObserver: IntersectionObserver | null = null;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

const progressOf = (el: HTMLElement, opts: ProgressOptions) => {
  if (opts.disableBelow && window.innerWidth < opts.disableBelow) return 1;
  const vh = window.innerHeight;
  if (opts.mode === "scroll") {
    return clamp01(window.scrollY / (vh * (opts.distance ?? 1)));
  }
  const rect = el.getBoundingClientRect();
  const edge =
    opts.anchor === "center"
      ? rect.top + rect.height / 2
      : opts.anchor === "bottom"
        ? rect.bottom
        : rect.top;
  const from = (opts.from ?? 1) * vh;
  const to = (opts.to ?? 0) * vh;
  return clamp01((from - edge) / (from - to || 1));
};

const writeProgress = (el: HTMLElement, state: Tracked) => {
  const p = progressOf(el, state.opts);
  if (Math.abs(p - state.last) < 0.0005) return;
  state.last = p;
  el.style.setProperty("--p", p.toFixed(4));
};

const flush = () => {
  framePending = false;
  tracked.forEach((state, el) => {
    if (state.active) writeProgress(el, state);
  });
};

const schedule = () => {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(flush);
};

const ensureListening = () => {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  activityObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const state = tracked.get(entry.target as HTMLElement);
        if (!state) continue;
        state.active = entry.isIntersecting;
        if (state.active) writeProgress(entry.target as HTMLElement, state);
      }
    },
    { rootMargin: "40% 0px 40% 0px" },
  );
};

const scrollProgress: Directive<HTMLElement, ProgressValue> = {
  mounted(el, binding) {
    if (!binding.value) return;
    ensureListening();
    const state: Tracked = { opts: binding.value, active: true, last: -1 };
    tracked.set(el, state);
    writeProgress(el, state);
    if (binding.value.mode !== "scroll") activityObserver?.observe(el);
  },
  beforeUnmount(el) {
    tracked.delete(el);
    activityObserver?.unobserve(el);
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", reveal);
  nuxtApp.vueApp.directive("split", split);
  nuxtApp.vueApp.directive("scroll-progress", scrollProgress);
});
