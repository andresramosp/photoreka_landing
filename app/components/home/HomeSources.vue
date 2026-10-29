<template>
  <section id="sources" class="lx-section">
    <div class="lx-container">
      <SectionIntro eyebrow="Import" align="center">
        <template #title>
          Import and organize photos
          <em class="lx-accent">from anywhere</em>
        </template>
        <p>
          Photoreka works with your existing photo sources. Import your images
          from Lightroom Classic, Google Photos, Dropbox, or local files and start
          curating with AI immediately. It's a
          <NuxtLink to="/ai_photo_organizer"
            >cloud-based AI photo organizer</NuxtLink
          >
          that runs in your browser on Windows, Mac, or Linux—nothing to
          install.
        </p>
      </SectionIntro>

      <div class="lx-sources">
        <article
          v-for="(source, index) in sources"
          :key="source.name"
          v-reveal="index * 90"
          class="lx-source"
        >
          <div class="lx-source__logo">
            <n-icon v-if="!source.logo" size="28" :color="source.color">
              <component :is="source.icon" />
            </n-icon>
            <img v-else :src="source.logo" :alt="source.name" />
          </div>
          <h3 class="lx-source__name">{{ source.name }}</h3>
          <p class="lx-source__desc">{{ source.description }}</p>
          <NuxtLink v-if="source.to" :to="source.to" class="lx-link">
            {{ source.linkLabel }}
            <n-icon size="15"><ArrowForwardOutline /></n-icon>
          </NuxtLink>
          <span
            class="lx-status"
            :class="{ 'lx-status--soon': source.comingSoon }"
          >
            {{ source.comingSoon ? "Coming Soon" : "Available Now" }}
          </span>
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
    color: "#22c55e",
    comingSoon: false,
  },
  {
    logo: "/logos/google_photos.png",
    name: "Google Photos",
    description:
      "Sync your entire Google Photos library with one click. Keep your photos organized across platforms.",
    comingSoon: false,
  },
  {
    logo: "/logos/lightroom_classic_logo.svg",
    name: "Lightroom Classic",
    description:
      "Connect directly with your Lightroom Classic catalog through our official plugin.",
    to: "/lightroom_search_plugin",
    linkLabel: "Explore the plugin",
    comingSoon: false,
  },
  {
    icon: markRaw(LogoDropbox),
    name: "Dropbox",
    description:
      "Sync your Dropbox photo folders directly with Photoreka. Works with any folder structure you already have.",
    color: "#0061FF",
    comingSoon: false,
  },
];
</script>

<style scoped>
.lx-sources {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid var(--lx-line-2);
  background: var(--lx-line-2);
  box-shadow: var(--lx-shadow-md);
}

.lx-source {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: clamp(24px, 2.6vw, 38px);
  background: var(--lx-surface);
  transition: background-color 0.4s ease;
}

.lx-source:hover {
  background: var(--lx-surface-2);
}

.lx-source__logo {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 0.9rem;
  border-radius: 16px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}

.lx-source__logo img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.lx-source__name {
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.lx-source__desc {
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--lx-text-2);
}

.lx-source .lx-link {
  align-self: flex-start;
  font-size: var(--lx-fs-sm);
}

.lx-status--soon::before {
  background: var(--lx-text-3);
  box-shadow: none;
}

@media (max-width: 1023px) {
  .lx-sources {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .lx-sources {
    grid-template-columns: 1fr;
  }
}
</style>
