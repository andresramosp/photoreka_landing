<template>
  <section :id="sectionId" class="lx-section">
    <div class="lx-container">
      <div class="lx-card grp">
        <div class="grp__glow" aria-hidden="true" />

        <div class="grp__copy">
          <SectionIntro :eyebrow="eyebrow" size="md" flush>
            <template #title>
              <slot name="title">
                Add GPS to your photos.
                <em class="lx-accent">No account needed.</em>
              </slot>
            </template>
            <slot>
              <p>
                Upload a batch of photos lacking GPS data, let AI identify where
                each shot was taken, review every pin on an interactive map, and
                download your originals with GPS coordinates embedded directly
                in EXIF. One-time payment — no subscription, no sign-up, no
                strings attached.
              </p>
            </slot>
          </SectionIntro>

          <ul v-reveal="200" class="lx-list grp__points">
            <li v-for="point in points" :key="point">
              <span class="lx-tick grp__tick" aria-hidden="true" />
              <span>{{ point }}</span>
            </li>
          </ul>

          <div v-reveal="260" class="lx-actions">
            <LxButton to="/ai_geo_recovery" @click="track">
              Try Geo Recovery Free
            </LxButton>
            <span class="lx-status">No registration required</span>
          </div>
        </div>

        <div v-reveal="{ variant: 'scale', delay: 120 }" class="grp__visual">
          <ShotFrame label="Photoreka — Geo Recovery" ratio="16 / 9">
            <FeatureCarousel :images="slides" alt="Geo Recovery" />
          </ShotFrame>

          <ul class="grp__facts">
            <li v-for="fact in facts" :key="fact.title" class="grp__fact">
              <span class="grp__fact-icon" :style="{ color: fact.color }">
                <n-icon size="18"><component :is="fact.icon" /></n-icon>
              </span>
              <div>
                <strong>{{ fact.title }}</strong>
                <p>{{ fact.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { markRaw } from "vue";
import {
  ShieldCheckmarkOutline,
  GlobeOutline,
  DownloadOutline,
} from "@vicons/ionicons5";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  eyebrow: { type: String, default: "Geo Recovery" },
  sectionId: { type: String, default: "geo-recovery" },
  points: {
    type: Array,
    default: () => [
      "One payment per batch, priced per photo",
      "Originals never leave your browser",
      "GPS coordinates embedded in EXIF on download",
      "No account or subscription required",
    ],
  },
  /** Page key for the click event; nothing is tracked without it. */
  source: { type: String, default: "" },
});

const slides = [
  { src: "/ai_geoinference/1.png", alt: "Geo Recovery – upload photos" },
  { src: "/ai_geoinference/2.png", alt: "Geo Recovery – AI processing" },
  { src: "/ai_geoinference/3.png", alt: "Geo Recovery – map review" },
  { src: "/ai_geoinference/4.png", alt: "Geo Recovery – results with GPS" },
  { src: "/ai_geoinference/5.png", alt: "Geo Recovery – download with EXIF" },
];

const facts = [
  {
    icon: markRaw(ShieldCheckmarkOutline),
    color: "var(--lx-ok)",
    title: "Your originals stay private",
    text: "Only lightweight thumbnails are sent for AI analysis. Full-resolution files never leave your device.",
  },
  {
    icon: markRaw(GlobeOutline),
    color: "var(--lx-accent-2)",
    title: "AI reads visual context",
    text: "Architecture, signage, landscape and lighting cues identify location to city or district precision.",
  },
  {
    icon: markRaw(DownloadOutline),
    color: "var(--lx-warm)",
    title: "Map, review, then download",
    text: "Correct any marker manually before exporting. Your corrections always override the AI result.",
  },
];

const track = () => {
  if (props.source) trackUserAction("navigate_to_geo_recovery", props.source);
};
</script>

<style scoped>
.grp {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(40px, 5vw, 80px);
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(28px, 5vw, 72px);
  box-shadow: var(--lx-shadow-lg), var(--lx-highlight);
}

/* A green cast tells this apart from the core product: it is a standalone
   service with its own checkout. */
.grp__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      50% 60% at 0% 0%,
      color-mix(in srgb, var(--lx-ok) 12%, transparent),
      transparent 70%
    ),
    radial-gradient(45% 55% at 100% 100%, var(--lx-glow-2), transparent 70%);
}

.grp__copy {
  display: grid;
  gap: 2rem;
}

/* Pages still on the old styles give headings and paragraphs margins. */
.grp :deep(:is(h2, h3, p)) {
  margin: 0;
}

.grp__copy :deep(.lx-title) {
  font-size: clamp(2rem, 3.2vw, 3rem);
}

.grp__tick::after {
  background: var(--lx-ok);
}

.grp__visual {
  display: grid;
  gap: 1.5rem;
}

.grp__facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.grp__fact {
  display: grid;
  gap: 0.65rem;
  align-content: start;
}

.grp__fact-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}

.grp__fact strong {
  display: block;
  margin: 0 0 0.3rem;
  font-size: var(--lx-fs-sm);
  font-weight: 600;
  color: var(--lx-text);
}

.grp__fact p {
  margin: 0;
  font-size: var(--lx-fs-xs);
  line-height: 1.6;
  color: var(--lx-text-2);
}

@media (max-width: 1023px) {
  .grp {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .grp__facts {
    grid-template-columns: 1fr;
  }
}
</style>
