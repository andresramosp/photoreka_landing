<template>
  <div class="feat-carousel">
    <!-- Single image → static -->
    <img
      v-if="slides.length <= 1"
      :src="slides[0]?.src"
      :alt="slides[0]?.alt || alt"
      class="feat-carousel-image"
      loading="lazy"
    />

    <!-- Multiple images → crossfading slideshow with soft Ken Burns zoom -->
    <template v-else>
      <div
        v-for="(img, i) in slides"
        :key="i"
        class="feat-carousel-slide"
        :class="{ active: currentSlide === i }"
        :style="{
          backgroundImage: `url(${img.src})`,
          transform: slideTransforms[i],
        }"
        role="img"
        :aria-label="img.alt || alt"
      ></div>
      <div class="feat-carousel-overlay" aria-hidden="true"></div>
      <div class="feat-carousel-dots" aria-hidden="true">
        <span
          v-for="(_, i) in slides"
          :key="i"
          class="feat-carousel-dot"
          :class="{ active: currentSlide === i }"
        ></span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { nextTick } from "vue";

const props = defineProps({
  /** Array of image srcs (string) or { src, alt } objects. */
  images: { type: Array, default: () => [] },
  alt: { type: String, default: "" },
  /** Milliseconds each slide stays before crossfading. */
  interval: { type: Number, default: 3333 },
});

// Normalize to a consistent { src, alt } shape.
const slides = computed(() =>
  (props.images || [])
    .map((img) =>
      typeof img === "string" ? { src: img, alt: props.alt } : img,
    )
    .filter((img) => img && img.src),
);

const currentSlide = ref(0);
const slideTransforms = ref([]);
let slideshowTimer = null;

// JS-driven Ken Burns: reset to base scale, then (after commit) start the
// slow zoom so the CSS transition always animates from the current value.
const activateSlide = (idx) => {
  slideTransforms.value[idx] = "scale(1.0)";
  nextTick(() => {
    slideTransforms.value[idx] = "scale(1.1)";
  });
};

const deactivateSlide = (idx) => {
  // Reset transform only after the opacity fade-out has finished.
  setTimeout(() => {
    slideTransforms.value[idx] = "scale(1.0)";
  }, 1100);
};

const startSlideshow = () => {
  slideshowTimer = setInterval(() => {
    const prev = currentSlide.value;
    const next = (prev + 1) % slides.value.length;
    deactivateSlide(prev);
    currentSlide.value = next;
    activateSlide(next);
  }, props.interval);
};

onMounted(() => {
  slideTransforms.value = slides.value.map(() => "scale(1.0)");
  if (slides.value.length > 1) {
    activateSlide(0);
    startSlideshow();
  }
});

onUnmounted(() => {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
});
</script>

<style scoped>
.feat-carousel {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background: var(--premium-bg-card);
}

/* Static single image */
.feat-carousel-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Slideshow slides */
.feat-carousel-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transform: scale(1);
  transition:
    opacity 0.93s ease-in-out,
    transform 4s ease-out;
  will-change: opacity, transform;
}

.feat-carousel-slide.active {
  opacity: 1;
}

.feat-carousel-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 55%,
    rgba(0, 0, 0, 0.28) 100%
  );
}

.feat-carousel-dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
}

.feat-carousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.feat-carousel-dot.active {
  background: #fff;
  transform: scale(1.3);
}

@media (prefers-reduced-motion: reduce) {
  .feat-carousel-slide {
    transition: opacity 0.4s ease !important;
  }
}
</style>
