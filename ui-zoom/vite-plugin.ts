// UI zoom for large screens (2K, 4K…): the interface scales up the way browser zoom would.
// On laptop widths it scales down to 90% instead (see SHRINK below).
//
// Each step z applies when the window is at least 1760·z × 920·z CSS px, so the visible
// area never drops below ~1760×920 (a Full HD laptop). A 2K monitor (2560×1440) gets 125 %;
// a 4K monitor at 100 % Windows scaling gets 200 %.
//
// This plugin does two things:
//   1. Builds the inline <head> script: the shim (ui-zoom-shim.js) with the zoom CSS inside.
//   2. Rewrites viewport units in our source at build time. Under `zoom`, 100vh renders as
//      z·100vh and overflows, so `100vh` becomes `calc(100vh / var(--ui-zoom, 1))`.
//      Keep writing 100vh as usual in CSS, templates and inline styles.
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";

const STEPS = [1.25, 1.5, 1.75, 2];

// Laptops go the other way: below the 1760 px reference (1366–1536 px wide, e.g.
// 1920×1200 at 125% Windows scaling) the full-size UI feels oversized, and
// browser zoom at 90% is what looks right. Desktop pointers only, so tablets in
// landscape keep their full-size touch targets. Shrinking is always safe for our
// own breakpoints: media queries see the real width, the page gets more room.
// --ui-zoom-shrink (1 here, unset elsewhere) lets a component take back part of
// the reduction where 90% reads too small, e.g. long-form text:
//   font-size: calc(14px + var(--ui-zoom-shrink, 0) * 1px);
const SHRINK = { zoom: 0.9, minWidth: 1280, maxWidth: 1759.98 };

const UI_ZOOM_CSS =
  `@media screen and (min-width:${SHRINK.minWidth}px) and (max-width:${SHRINK.maxWidth}px) and (hover:hover) and (pointer:fine){html{zoom:${SHRINK.zoom};--ui-zoom:${SHRINK.zoom};--ui-zoom-shrink:1}}` +
  STEPS.map(
    (z) =>
      `@media screen and (min-width:${1760 * z}px) and (min-height:${920 * z}px){html{zoom:${z};--ui-zoom:${z}}}`,
  ).join("");

/** Inline script for <head>, ahead of any other script. It adds the zoom CSS itself. */
export const UI_ZOOM_SCRIPT = readFileSync(
  new URL("./ui-zoom-shim.js", import.meta.url),
  "utf8",
).replace('"__UI_ZOOM_CSS__"', JSON.stringify(UI_ZOOM_CSS));

// A number with a viewport unit that is not part of another token
// (not `w-50vw`, not `#100vh`) and is not already compensated.
const VIEWPORT_UNIT =
  /(^|[^\w.#$/-])(-?(?:\d+\.?\d*|\.\d+)(?:d|s|l)?(?:vh|vw|vmin|vmax))\b(?!\s*\/\s*var\(--ui-zoom)/g;

// Text before an opening parenthesis that makes it a math context: calc/clamp/min/max,
// or a bare grouping parenthesis (only valid inside one of those).
const MATH_CONTEXT = /(?:(?:^|[^\w-])(?:-webkit-)?(?:calc|clamp|min|max)|(?:^|[^\w-]))$/;

// Text just before the parenthesis that encloses `index`, or null at the top level of a value.
function enclosingFunction(code: string, index: number): string | null {
  let depth = 0;
  for (let i = index - 1; i >= 0 && index - i < 400; i--) {
    const ch = code[i];
    if (ch === ")") depth++;
    else if (ch === "(") {
      if (depth === 0) return code.slice(Math.max(0, i - 20), i);
      depth--;
    } else if (depth === 0 && ";{}:'\"`".includes(ch)) return null;
  }
  return null;
}

export function compensateViewportUnits(code: string): string {
  return code.replace(
    VIEWPORT_UNIT,
    (_: string, before: string, value: string, offset: number) => {
      // Inside calc/clamp/min/max a bare division is valid and keeps minifiers happy;
      // elsewhere (top level, translate(), var() fallbacks…) it needs its own calc().
      const context = enclosingFunction(code, offset + before.length);
      const inMath = context !== null && MATH_CONTEXT.test(context);
      const scaled = `${value} / var(--ui-zoom, 1)`;
      return `${before}${inMath ? scaled : `calc(${scaled})`}`;
    },
  );
}

const SOURCE_FILE = /\.(vue|[cm]?[jt]sx?|css|s[ac]ss)$/;
const STYLE_REQUEST = /\.(css|s[ac]ss)$|[?&]type=style\b/;

function rewrite(code: string, id: string, accept: (path: string, query: string) => boolean) {
  const [path, query = ""] = id.split("?");
  if (path.includes("/node_modules/") || !accept(path, query)) return;
  if (/(^|&)(raw|url)\b/.test(query) || path.endsWith(".d.ts")) return;
  const out = compensateViewportUnits(code);
  return out === code ? undefined : { code: out, map: null };
}

export function uiZoomUnits(): Plugin[] {
  return [
    {
      // Raw source: templates, inline styles and strings in scripts.
      name: "photoreka-ui-zoom-units",
      enforce: "pre",
      transform: (code: string, id: string) =>
        rewrite(code, id, (path) => SOURCE_FILE.test(path)),
    },
    {
      // Compiled CSS: catches what Sass inlined from @import'ed partials.
      name: "photoreka-ui-zoom-units-css",
      transform: (code: string, id: string) =>
        rewrite(code, id, (path, query) => STYLE_REQUEST.test(id) || STYLE_REQUEST.test(`${path}?${query}`)),
    },
  ];
}

/** Full plugin for a Vite app with its own index.html. */
export function uiZoom(): Plugin[] {
  return [
    ...uiZoomUnits(),
    {
      name: "photoreka-ui-zoom-head",
      transformIndexHtml() {
        return [{ tag: "script", children: UI_ZOOM_SCRIPT, injectTo: "head" as const }];
      },
    },
  ];
}
