<template>
  <div class="lx-hero__tools" :class="{ 'is-static': isStatic }">
    <div class="lx-hero__tools-track">
      <ul
        v-for="copy in isStatic ? 1 : 2"
        :key="copy"
        class="lx-hero__tools-set"
        :aria-hidden="copy === 2 ? 'true' : undefined"
      >
        <li v-for="(genre, i) in isStatic ? genres : rollingGenres" :key="i">
          <n-icon><component :is="genre.icon" /></n-icon>
          {{ genre.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { inject, markRaw } from "vue";
import {
  WalkOutline,
  ColorPaletteOutline,
  PersonOutline,
  BriefcaseOutline,
} from "@vicons/ionicons5";
import BookOpen16Regular from "@vicons/fluent/es/BookOpen16Regular.js";

const genres = [
  { icon: markRaw(WalkOutline), label: "Street" },
  { icon: markRaw(BookOpen16Regular), label: "Documentary" },
  { icon: markRaw(ColorPaletteOutline), label: "Artistic" },
  { icon: markRaw(PersonOutline), label: "Lifestyle" },
  { icon: markRaw(BriefcaseOutline), label: "Commercial" },
];
// Repeated so each half of the rolling track is wider than the column;
// otherwise a gap shows before the loop restarts.
const rollingGenres = [...genres, ...genres];

const isStatic = inject("heroGenresStatic", false);
</script>

<style scoped>
/* Contained so the endless track adds no width: the row takes the width
   of its column (in practice, the lead's). */
.lx-hero__tools {
  contain: inline-size;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 6%,
    #000 88%,
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 6%,
    #000 88%,
    transparent
  );
}

.lx-hero__tools-track {
  display: flex;
  width: max-content;
  animation: lx-hero-tools 80s linear infinite;
}

.lx-hero__tools:hover .lx-hero__tools-track {
  animation-play-state: paused;
}

/* The trailing padding equals the gap so the -50% loop has no seam. */
.lx-hero__tools-set {
  display: flex;
  gap: 0.5rem;
  margin: 0;
  padding: 0 0.5rem 0 0;
  list-style: none;
}

@keyframes lx-hero-tools {
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lx-hero__tools-track {
    animation: none;
  }
}

.lx-hero__tools li {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.85rem 0.3rem 0.7rem;
  border: 1px solid var(--lx-line);
  border-radius: 999px;
  color: var(--lx-text-2);
  font-size: var(--lx-fs-sm);
  font-weight: 500;
}

.lx-hero__tools .n-icon {
  font-size: 16px;
  color: color-mix(in srgb, var(--lx-accent) 60%, transparent);
}

/* Static: every genre inside one capsule. On wide columns it stays on one
   line, easing the text down with the column width (the cqi divisor is the
   capsule's own width in em); on narrow ones it wraps instead. Centred
   heroes set --lx-hero-genres-justify. */
.lx-hero__tools.is-static {
  container-type: inline-size;
  overflow: visible;
  -webkit-mask-image: none;
  mask-image: none;
}

.is-static .lx-hero__tools-track {
  width: auto;
  justify-content: var(--lx-hero-genres-justify, flex-start);
  animation: none;
}

.is-static .lx-hero__tools-set {
  gap: 1.1em;
  padding: 0.6em 1.3em;
  font-size: clamp(0.8rem, calc(100cqi / 39), var(--lx-fs-sm));
  border: 1px solid color-mix(in srgb, var(--lx-accent) 26%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--lx-accent) 7%, transparent);
  box-shadow: var(--lx-highlight);
}

.is-static .lx-hero__tools-set li {
  gap: 0.4em;
  padding: 0;
  border: 0;
  border-radius: 0;
  font-size: inherit;
}

.is-static .n-icon {
  font-size: 1.15em;
}

@container (max-width: 520px) {
  .is-static .lx-hero__tools-set {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.55em 1.1em;
    padding: 0.75em 1.3em;
    font-size: var(--lx-fs-sm);
    border-radius: 1.6em;
  }
}
</style>
