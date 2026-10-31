<template>
  <section class="lx-section">
    <div
      class="lx-container lx-split lx-split--media"
      :class="{ 'lx-split--reverse': reverse }"
    >
      <div class="lx-split__copy">
        <SectionIntro :eyebrow="eyebrow" flush>
          <template #title><slot name="title" /></template>
          <slot />
        </SectionIntro>

        <div v-reveal="200" class="lx-actions">
          <slot name="actions">
            <LxButton icon="play" @click="emit('demo')">Try the Demo</LxButton>
            <NuxtLink v-if="learnMoreTo" :to="learnMoreTo" class="lx-link">
              Learn more
              <n-icon size="15"><ArrowForwardOutline /></n-icon>
            </NuxtLink>
          </slot>
        </div>
      </div>

      <div
        v-reveal="{ variant: 'scale', delay: 120 }"
        v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
        class="lx-split__visual"
      >
        <!-- Each frame only plays while visible, so the hidden one never
             starts. -->
        <ShotFrame
          class="lx-zoom"
          :class="{ 'media-split__desktop': mobileVideo }"
          :video="video"
          :src="src"
          :playback-rate="playbackRate"
          :poster="poster"
          :alt="alt"
          :label="label"
          :ratio="ratio"
          :focus="focus"
          :bare="bare"
        />
        <ShotFrame
          v-if="mobileVideo"
          class="media-split__mobile"
          :video="mobileVideo"
          :playback-rate="playbackRate"
          :alt="alt"
          :label="label"
          :ratio="mobileRatio"
          :bare="bare"
        />
      </div>
    </div>

    <!-- Details that would make the copy taller than the video run in a row
         under both columns instead. -->
    <div v-if="$slots.below" v-reveal="160" class="lx-container media-split__below">
      <slot name="below" />
    </div>
  </section>
</template>

<script setup>
import { ArrowForwardOutline } from "@vicons/ionicons5";

defineProps({
  eyebrow: { type: String, default: "" },
  /** Video on the left, copy on the right. */
  reverse: { type: Boolean, default: false },
  /** A video, or a still image through `src`. */
  video: { type: String, default: "" },
  src: { type: String, default: "" },
  poster: { type: String, default: "" },
  playbackRate: { type: Number, default: 1 },
  alt: { type: String, default: "" },
  /** Caption in the window bar of the frame. */
  label: { type: String, default: "" },
  ratio: { type: String, default: "16 / 9" },
  /** object-position when the capture is cropped to `ratio`. */
  focus: { type: String, default: "50% 0%" },
  /** No window frame around the video. */
  bare: { type: Boolean, default: false },
  /** Alternative cut shown on phones instead of `video`. */
  mobileVideo: { type: String, default: "" },
  mobileRatio: { type: String, default: "4 / 5" },
  learnMoreTo: { type: String, default: "" },
});

const emit = defineEmits(["demo"]);
</script>

<style scoped>
/* Below 1024px the columns stack and the copy always comes first. */
@media (min-width: 1024px) {
  .lx-split--reverse .lx-split__visual {
    order: -1;
  }
}

/* Several lead paragraphs need air between them. */
.lx-split__copy :deep(.lx-lead) {
  display: grid;
  gap: 1rem;
}

.media-split__mobile {
  display: none;
}

.media-split__below {
  margin-top: clamp(48px, 6vw, 80px);
}

@media (max-width: 760px) {
  .media-split__desktop {
    display: none;
  }

  .media-split__mobile {
    display: block;
  }
}
</style>
