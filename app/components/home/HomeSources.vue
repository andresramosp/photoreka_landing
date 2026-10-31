<template>
  <section id="sources" class="lx-section lx-section--tight">
    <div class="lx-container">
      <SectionIntro eyebrow="Import">
        <template #title>
          Import and organize photos
          <em class="lx-accent">from anywhere</em>
        </template>
        <p>
          Import from Lightroom Classic, Google Photos, Google Drive, Dropbox,
          or local files and start curating right away. A
          <NuxtLink to="/ai_photo_organizer"
            >cloud-based AI photo organizer</NuxtLink
          >
          that runs in your browser on any OS—nothing to install.
        </p>
      </SectionIntro>

      <div class="lx-sources">
        <article
          v-for="(source, index) in sources"
          :key="source.name"
          v-reveal="index * 80"
          class="lx-source"
          :style="{ '--brand': source.brand }"
        >
          <span class="lx-source__glow" aria-hidden="true" />

          <div class="lx-source__logo">
            <n-icon v-if="source.icon" size="26" :color="source.brand">
              <component :is="source.icon" />
            </n-icon>
            <img
              v-for="logo in source.logos || []"
              :key="logo.src"
              :src="logo.src"
              :alt="logo.alt"
            />
          </div>

          <h3 class="lx-source__name">{{ source.name }}</h3>
          <p class="lx-source__desc">{{ source.description }}</p>

          <div class="lx-source__foot">
            <NuxtLink v-if="source.to" :to="source.to" class="lx-link">
              {{ source.linkLabel }}
              <n-icon size="15"><ArrowForwardOutline /></n-icon>
            </NuxtLink>
            <span
              class="lx-source__status"
              :class="{ 'lx-source__status--soon': source.comingSoon }"
            >
              {{ source.comingSoon ? "Coming Soon" : "Available Now" }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { markRaw } from "vue";
import {
  ArrowForwardOutline,
  CloudUploadOutline,
  LogoDropbox,
} from "@vicons/ionicons5";

const sources = [
  {
    icon: markRaw(CloudUploadOutline),
    name: "Local Files",
    description:
      "Upload photos directly from your computer. Supports all major image formats (JPEG, PNG, TIFF).",
    brand: "#22c55e",
    comingSoon: false,
  },
  {
    logos: [
      { src: "/logos/google_photos.png", alt: "Google Photos" },
      { src: "/logos/google_drive.svg", alt: "Google Drive" },
    ],
    name: "Google Photos & Drive",
    description:
      "Sync your entire Google Photos library with one click, or pick the photos you want straight from your Google Drive.",
    brand: "#4285f4",
    comingSoon: false,
  },
  {
    logos: [
      { src: "/logos/lightroom_classic_logo.svg", alt: "Lightroom Classic" },
    ],
    name: "Lightroom Classic",
    description:
      "Connect directly with your Lightroom Classic catalog through our official plugin.",
    brand: "#31a8ff",
    to: "/lightroom_search_plugin",
    linkLabel: "Explore the plugin",
    comingSoon: false,
  },
  {
    icon: markRaw(LogoDropbox),
    name: "Dropbox",
    description:
      "Sync your Dropbox photo folders directly with Photoreka. Works with any folder structure you already have.",
    brand: "#0061ff",
    comingSoon: false,
  },
];
</script>

<style scoped>
.lx-sources {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

/* Each card carries its source's brand colour as a faint wash and glow. */
.lx-source {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 30px 30px 26px;
  overflow: hidden;
  isolation: isolate;
  border-radius: 24px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--brand) 8%, var(--lx-surface)) 0%,
    var(--lx-surface) 55%
  );
  border: 1px solid var(--lx-line-2);
  box-shadow: var(--lx-shadow-md), var(--lx-highlight);
  transition:
    transform 0.5s var(--lx-ease),
    border-color 0.4s ease;
}

.lx-source:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--brand) 45%, var(--lx-line-2));
}

.lx-source__glow {
  position: absolute;
  top: -70px;
  left: -40px;
  z-index: -1;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--brand);
  filter: blur(70px);
  opacity: 0.16;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.lx-source:hover .lx-source__glow {
  opacity: 0.3;
}

/* Grows sideways when a card carries more than one logo. */
.lx-source__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  align-self: flex-start;
  min-width: 54px;
  height: 54px;
  padding: 0 13px;
  margin-bottom: 0.6rem;
  border-radius: 16px;
  background: var(--lx-surface-3);
  border: 1px solid color-mix(in srgb, var(--brand) 30%, var(--lx-line));
  box-shadow: 0 10px 30px -12px color-mix(in srgb, var(--brand) 60%, transparent);
}

.lx-source__logo img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.lx-source__name {
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.3rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.lx-source__desc {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--lx-text-2);
}

.lx-source__foot {
  display: grid;
  justify-items: start;
  gap: 0.9rem;
  margin-top: auto;
  padding-top: 0.6rem;
}

.lx-source__foot .lx-link {
  font-size: var(--lx-fs-sm);
}

.lx-source__status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: var(--lx-fs-xs);
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--lx-text-2);
  background: color-mix(in srgb, var(--lx-ok) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--lx-ok) 22%, transparent);
}

.lx-source__status::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lx-ok);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--lx-ok) 20%, transparent);
}

.lx-source__status--soon {
  background: transparent;
  border-color: var(--lx-line-2);
}

.lx-source__status--soon::before {
  background: var(--lx-text-3);
  box-shadow: none;
}

@media (max-width: 1100px) {
  .lx-sources {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .lx-sources {
    grid-template-columns: 1fr;
  }
}
</style>
