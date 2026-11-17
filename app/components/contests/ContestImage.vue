<template>
  <div class="pc-img" :class="{ 'is-empty': !shown }" :style="{ '--c': genre.color, aspectRatio: ratio }">
    <img
      v-if="shown"
      :src="contest.imageUrl"
      :alt="alt ?? contest.name"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      @error="failed = true"
    />
    <!-- No approved image yet: a backdrop generated from the genre's colour. -->
    <span v-else class="pc-img__fallback" aria-hidden="true">
      <span v-if="monogram" class="pc-img__mono">{{ initials }}</span>
    </span>
  </div>
</template>

<script setup>
import { contestGenre } from "~/utils/contests";

const props = defineProps({
  contest: { type: Object, required: true },
  /** CSS aspect-ratio of the reserved box; the image is cropped to it. */
  ratio: { type: String, default: "3 / 2" },
  /** Pass an empty string for decorative uses. */
  alt: { type: String, default: undefined },
  /** Above the fold: load right away instead of lazily. */
  eager: { type: Boolean, default: false },
  /** Thumbnails print the contest's initials on the fallback. */
  monogram: { type: Boolean, default: false },
});

const failed = ref(false);
const shown = computed(() => Boolean(props.contest.imageUrl) && !failed.value);
const genre = computed(() => contestGenre(props.contest.genre));

const initials = computed(() =>
  props.contest.name
    .split(/[\s·]+/)
    .filter((word) => /^[A-Z]/.test(word) && word.toLowerCase() !== "the")
    .slice(0, 2)
    .map((word) => word[0])
    .join(""),
);

watch(
  () => props.contest.imageUrl,
  () => (failed.value = false),
);
</script>

<style scoped>
.pc-img {
  position: relative;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: var(--lx-shot-bg);
}

.pc-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Brand aurora tinted with the genre's colour, under a layer of grain. */
.pc-img__fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background:
    radial-gradient(85% 110% at 88% 8%, color-mix(in srgb, var(--c) 62%, transparent), transparent 62%),
    radial-gradient(70% 90% at 6% 0%, rgba(34, 211, 238, 0.34), transparent 60%),
    radial-gradient(90% 100% at 30% 100%, rgba(139, 92, 246, 0.5), transparent 66%),
    radial-gradient(60% 70% at 100% 100%, rgba(245, 158, 11, 0.3), transparent 62%),
    #101018;
}

.pc-img__fallback::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.22;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.pc-img__mono {
  position: relative;
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 300;
  font-size: 30cqw;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.88);
  padding-right: 0.08em;
}
</style>
