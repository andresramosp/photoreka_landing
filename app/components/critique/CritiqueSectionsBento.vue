<template>
  <!-- The sections of a report, each shown by a fragment of the real thing.
       Sizes are chosen so eight tiles close a 4 × 4 block with no gap. -->
  <ul class="csb">
    <li
      v-for="(section, index) in sections"
      :key="section.title"
      v-reveal="(index % 4) * 80"
      class="csb__tile"
      :class="section.size && `csb__tile--${section.size}`"
    >
      <a
        class="csb__btn"
        :href="`${pdf}#page=${section.page + 1}`"
        target="_blank"
        rel="noopener"
        @click="emit('open', section.page)"
      >
        <CritiquePageCrop
          class="csb__crop"
          :src="pages[section.page]"
          :focus="section.focus"
        />
        <span class="csb__body">
          <span class="csb__meta">
            Page {{ section.page + 1 }}
            <span class="csb__open" aria-hidden="true">Open →</span>
          </span>
          <span class="csb__title">{{ section.title }}</span>
          <span class="csb__desc">{{ section.description }}</span>
          <span class="sr-only">Open this page of the sample report (PDF, new tab)</span>
        </span>
      </a>
    </li>
  </ul>
</template>

<script setup>
import CritiquePageCrop from "~/components/critique/CritiquePageCrop.vue";

defineProps({
  /** [{ title, description, page (0-based), focus: [x, y, w, h], size: "big" | "wide" | undefined }] */
  sections: { type: Array, required: true },
  /** The page images of the sample report. */
  pages: { type: Array, required: true },
  /** The sample PDF: each tile opens it at its page. */
  pdf: { type: String, required: true },
});
const emit = defineEmits(["open"]);
</script>

<style scoped>
.csb {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: minmax(300px, auto);
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.csb__tile--big {
  grid-column: span 2;
  grid-row: span 2;
}

.csb__tile--wide {
  grid-column: span 2;
}

.csb__btn {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(150px, 1fr) auto;
  padding: 0;
  border: 0;
  border-radius: var(--lx-radius);
  background: var(--lx-surface);
  box-shadow: 0 0 0 1px var(--lx-line);
  overflow: hidden;
  text-align: left;
  text-decoration: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  transition:
    transform 0.5s var(--lx-ease),
    box-shadow 0.5s var(--lx-ease);
}

.csb__btn:hover,
.csb__btn:focus-visible {
  transform: translateY(-4px);
  box-shadow:
    0 0 0 1px var(--lx-line-2),
    0 30px 60px -40px rgba(24, 24, 48, 0.5);
}

.csb__btn:hover :deep(.cpc__zoom),
.csb__btn:focus-visible :deep(.cpc__zoom) {
  transform: scale(1.04);
}

.csb__crop {
  min-height: 150px;
  border-bottom: 1px solid var(--lx-line);
}

.csb__body {
  display: grid;
  gap: 0.35rem;
  padding: 18px 22px 22px;
}

.csb__meta {
  display: flex;
  justify-content: space-between;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.csb__open {
  color: var(--pc-gold-ink);
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.3s var(--lx-ease),
    transform 0.3s var(--lx-ease);
}

.csb__btn:hover .csb__open,
.csb__btn:focus-visible .csb__open {
  opacity: 1;
  transform: none;
}

.csb__title {
  font-family: var(--lx-font-display);
  font-size: 1.4rem;
  line-height: 1.15;
  color: var(--lx-text);
}

.csb__tile--big .csb__title {
  font-size: 1.8rem;
}

.csb__desc {
  font-size: var(--lx-fs-sm);
  line-height: 1.55;
  color: var(--lx-text-2);
}

@media (max-width: 1000px) {
  .csb {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .csb__tile--big {
    grid-row: auto;
  }

  .csb__tile--big .csb__btn {
    grid-template-rows: minmax(260px, 1fr) auto;
  }
}

@media (max-width: 640px) {
  .csb {
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: auto;
  }

  .csb__tile--big,
  .csb__tile--wide {
    grid-column: auto;
  }

  .csb__btn,
  .csb__tile--big .csb__btn {
    grid-template-rows: 220px auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .csb__btn,
  .csb__open,
  .csb__btn :deep(.cpc__zoom) {
    transition: none;
  }
}
</style>
