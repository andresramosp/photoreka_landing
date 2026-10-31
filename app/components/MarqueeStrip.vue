<template>
  <div
    v-scroll-progress="{ from: 1, to: 0, anchor: 'center' }"
    class="lx-marquee"
    :style="{ '--lx-marquee-duration': `${duration}s` }"
  >
    <ul class="sr-only">
      <li v-for="item in items" :key="item.label">{{ item.label }}</li>
    </ul>
    <div class="lx-marquee__shift" aria-hidden="true">
      <div class="lx-marquee__track">
        <div v-for="copy in 2" :key="copy" class="lx-marquee__set">
          <template v-for="(item, i) in loopItems" :key="`${copy}-${i}`">
            <span class="lx-marquee__word">{{ item.label }}</span>
            <span v-if="item.image" class="lx-marquee__photo">
              <img :src="item.image" alt="" loading="lazy" decoding="async" />
            </span>
            <span v-else class="lx-marquee__mark" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  /** [{ label, image? }] — the image becomes a small print between words. */
  items: { type: Array, required: true },
  /** Seconds for one full loop. */
  duration: { type: Number, default: 48 },
  /** How many times the list repeats inside one loop, to fill wide screens. */
  repeat: { type: Number, default: 2 },
});

const loopItems = computed(() =>
  Array.from({ length: props.repeat }, () => props.items).flat(),
);
</script>

<style scoped>
.lx-marquee {
  position: relative;
  overflow: hidden;
  padding-block: clamp(14px, 1.8vw, 22px);
  border-block: 1px solid var(--lx-line);
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 10%,
    #000 90%,
    transparent
  );
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

/* Scrolling nudges the band sideways on top of its constant drift. */
.lx-marquee__shift {
  transform: translate3d(calc((var(--p, 0.5) - 0.5) * -14%), 0, 0);
  will-change: transform;
}

.lx-marquee__track {
  display: flex;
  width: max-content;
  animation: lx-marquee var(--lx-marquee-duration) linear infinite;
}

.lx-marquee:hover .lx-marquee__track {
  animation-play-state: paused;
}

.lx-marquee__set {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 1.75rem);
  padding-right: clamp(1rem, 2vw, 1.75rem);
}

.lx-marquee__word {
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.15rem, 1.9vw, 1.7rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--lx-text-2);
  white-space: nowrap;
}

.lx-marquee__photo {
  flex-shrink: 0;
  width: clamp(56px, 5.6vw, 84px);
  aspect-ratio: 3 / 2;
  border-radius: 10px;
  overflow: hidden;
  transform: rotate(-3deg);
  box-shadow: var(--lx-shadow-md);
}

.lx-marquee__set > .lx-marquee__photo:nth-of-type(even) {
  transform: rotate(3deg);
}

.lx-marquee__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lx-marquee__mark {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lx-accent-grad);
}

@keyframes lx-marquee {
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lx-marquee__track {
    animation: none;
  }
}
</style>
