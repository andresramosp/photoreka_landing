<template>
  <section id="lightroom_plugin" class="lx-section">
    <div class="lx-container lx-split lx-split--reverse">
      <div
        v-reveal="{ variant: 'scale' }"
        v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
        class="lx-split__visual"
      >
        <ShotFrame
          class="lx-zoom"
          video="/videos/lr_plugin.mp4"
          poster="/home/video_lr_poster.jpg"
          :playback-rate="2"
          alt="Photoreka plugin running inside Adobe Lightroom Classic"
          label="Lightroom Classic — Photoreka plugin"
          ratio="auto"
        />
      </div>

      <div class="lx-split__copy">
        <div v-reveal class="lx-lr-badge">
          <img src="/logos/lightroom_logo.png" alt="Adobe Lightroom" />
        </div>
        <SectionIntro eyebrow="Official Plugin" flush>
          <template #title>
            Lightroom <em class="lx-accent">Integration</em>
          </template>
          <p>
            Seamlessly connect Photoreka with Adobe Lightroom Classic. Sync your
            catalog, search by natural language directly from Lightroom, and
            bring the power of intelligent curation to your existing workflow.
          </p>
        </SectionIntro>

        <ul v-reveal="200" class="lx-list lx-lr-list">
          <li v-for="item in features" :key="item.label">
            <span class="lx-lr-list__icon" aria-hidden="true">
              <n-icon size="16"><component :is="item.icon" /></n-icon>
            </span>
            <span>{{ item.label }}</span>
          </li>
        </ul>

        <div v-reveal="280" class="lx-actions">
          <LxButton icon="download" @click="emit('signup')">
            Get the Plugin
          </LxButton>
          <span class="lx-note">Free with Photoreka account</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { markRaw } from "vue";
import {
  SyncOutline,
  ChatbubblesOutline,
  ShareSocialOutline,
  LinkOutline,
  InformationCircleOutline,
} from "@vicons/ionicons5";

const emit = defineEmits(["signup"]);

const features = [
  { icon: markRaw(SyncOutline), label: "Direct sync from Lightroom catalog" },
  {
    icon: markRaw(ChatbubblesOutline),
    label: "Search by natural language integrated",
  },
  {
    icon: markRaw(ShareSocialOutline),
    label: "One-click photo transfer to Photoreka",
  },
  {
    icon: markRaw(LinkOutline),
    label: "Compatible with Photoreka web workflow",
  },
  {
    icon: markRaw(InformationCircleOutline),
    label: "Lightroom Classic 13.0+ · RAW, JPEG, PNG, TIFF",
  },
];
</script>

<style scoped>
.lx-lr-badge {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: var(--lx-surface-2);
  border: 1px solid var(--lx-line-2);
  box-shadow: var(--lx-shadow-md);
}

.lx-lr-badge img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.lx-lr-list__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--lx-surface-2);
  border: 1px solid var(--lx-line);
  color: var(--lx-text-2);
}

.lx-note {
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}
</style>
