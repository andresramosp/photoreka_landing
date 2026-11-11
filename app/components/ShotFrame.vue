<template>
  <figure class="lx-shot" :class="{ 'lx-shot--bare': bare }" :style="frameStyle">
    <div v-if="chrome && !bare" class="lx-shot__bar" aria-hidden="true">
      <span class="lx-shot__dot" />
      <span class="lx-shot__dot" />
      <span class="lx-shot__dot" />
      <span v-if="label" class="lx-shot__label">{{ label }}</span>
    </div>
    <div ref="mediaRef" class="lx-shot__media">
      <slot>
        <video
          v-if="video"
          ref="videoRef"
          :src="video"
          :poster="poster || undefined"
          muted
          :loop="!startAt"
          playsinline
          preload="metadata"
          :aria-label="alt || undefined"
          @loadedmetadata="seekToStart"
          @loadeddata="applyPlaybackRate"
          @ended="restartFromStart"
        />
        <img
          v-else-if="src"
          :src="src"
          :alt="alt"
          :loading="loading"
          decoding="async"
        />
      </slot>
    </div>
  </figure>
</template>

<script setup>
// Every screenshot and video on a landing goes through this frame so they
// share one border, radius, shadow and aspect ratio, whatever the capture.
const props = defineProps({
  src: { type: String, default: "" },
  alt: { type: String, default: "" },
  video: { type: String, default: "" },
  poster: { type: String, default: "" },
  playbackRate: { type: Number, default: 1 },
  /** Second the video starts and loops back to. */
  startAt: { type: Number, default: 0 },
  /** Small caption in the window bar, e.g. "Photoreka — Search". */
  label: { type: String, default: "" },
  chrome: { type: Boolean, default: true },
  /** No window at all: only the rounded media and its shadow. */
  bare: { type: Boolean, default: false },
  /** CSS aspect-ratio of the media area; "auto" keeps the asset's own. */
  ratio: { type: String, default: "16 / 10" },
  /** cover | contain */
  fit: { type: String, default: "cover" },
  /** object-position of the asset inside the frame. */
  focus: { type: String, default: "50% 0%" },
  loading: { type: String, default: "lazy" },
});

const frameStyle = computed(() => ({
  "--lx-shot-ratio": props.ratio,
  "--lx-shot-fit": props.fit,
  "--lx-shot-focus": props.focus,
}));

const mediaRef = ref(null);
const videoRef = ref(null);
let observer = null;

const applyPlaybackRate = () => {
  if (videoRef.value) videoRef.value.playbackRate = props.playbackRate;
};

const seekToStart = () => {
  if (videoRef.value && props.startAt) videoRef.value.currentTime = props.startAt;
};

// Native loop always rewinds to 0, so a custom start loops by hand.
const restartFromStart = () => {
  seekToStart();
  videoRef.value?.play?.().catch(() => {});
};

// Videos only play while on screen, which keeps long pages light.
onMounted(() => {
  if (!props.video || !videoRef.value) return;
  observer = new IntersectionObserver(
    ([entry]) => {
      const el = videoRef.value;
      if (!el) return;
      if (entry.isIntersecting) el.play?.().catch(() => {});
      else el.pause?.();
    },
    { threshold: 0.15 },
  );
  observer.observe(mediaRef.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>
