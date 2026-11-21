<template>
  <div class="csv">
    <div class="csv__stage pc-panel">
      <button
        type="button"
        class="csv__arrow csv__arrow--prev"
        aria-label="Previous page"
        :disabled="current === 0"
        @click="go(current - 1)"
      >
        <n-icon size="20"><ChevronBackOutline /></n-icon>
      </button>

      <div class="csv__page">
        <Transition name="csv-turn" mode="out-in">
          <img
            :key="current"
            :src="pages[current]"
            :alt="`Page ${current + 1} of the sample report`"
            width="1100"
            height="1556"
            decoding="async"
          />
        </Transition>
      </div>

      <button
        type="button"
        class="csv__arrow csv__arrow--next"
        aria-label="Next page"
        :disabled="current === pages.length - 1"
        @click="go(current + 1)"
      >
        <n-icon size="20"><ChevronForwardOutline /></n-icon>
      </button>
    </div>

    <div class="csv__bar">
      <ol class="csv__thumbs" aria-label="Pages of the sample report">
        <li v-for="(page, index) in pages" :key="page">
          <button
            type="button"
            class="csv__thumb"
            :class="{ 'is-active': index === current }"
            :aria-label="`Page ${index + 1}`"
            :aria-current="index === current ? 'page' : undefined"
            @click="go(index)"
          >
            <img :src="page" alt="" loading="lazy" width="110" height="156" />
          </button>
        </li>
      </ol>
      <p class="csv__count">
        Page <strong>{{ current + 1 }}</strong> of {{ pages.length }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ChevronBackOutline, ChevronForwardOutline } from "@vicons/ionicons5";

// A real report leafed through page by page: the pages are images of the PDF
// a buyer downloads.
const props = defineProps({
  pages: { type: Array, required: true },
});
const emit = defineEmits(["turn"]);

const current = ref(0);

function go(index) {
  const next = Math.min(Math.max(index, 0), props.pages.length - 1);
  if (next === current.value) return;
  current.value = next;
  emit("turn", next + 1);
}
</script>

<style scoped>
.csv__stage {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(8px, 2vw, 24px);
  padding: clamp(12px, 2.4vw, 32px);
  background: var(--lx-surface-3);
}

.csv__page {
  width: min(100%, 620px);
  margin: 0 auto;
}

.csv__page img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 30px 70px -40px rgba(24, 24, 48, 0.55);
}

.csv__arrow {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface);
  color: var(--lx-text);
  cursor: pointer;
  transition:
    border-color 0.3s var(--lx-ease),
    transform 0.3s var(--lx-ease),
    opacity 0.3s var(--lx-ease);
}

.csv__arrow:not(:disabled):hover {
  border-color: var(--pc-gold);
  transform: scale(1.06);
}

.csv__arrow:disabled {
  opacity: 0.3;
  cursor: default;
}

.csv__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
}

.csv__thumbs {
  display: flex;
  gap: 6px;
  margin: 0;
  padding: 4px;
  list-style: none;
  overflow-x: auto;
  scrollbar-width: none;
}

.csv__thumb {
  display: block;
  width: 44px;
  padding: 0;
  border: 0;
  border-radius: 3px;
  overflow: hidden;
  background: #fff;
  outline: 1px solid var(--lx-line-2);
  opacity: 0.6;
  cursor: pointer;
  transition:
    opacity 0.3s var(--lx-ease),
    outline-color 0.3s var(--lx-ease);
}

.csv__thumb img {
  display: block;
  width: 100%;
  height: auto;
}

.csv__thumb:hover,
.csv__thumb.is-active {
  opacity: 1;
}

.csv__thumb.is-active {
  outline: 2px solid var(--pc-gold);
}

.csv__count {
  flex: none;
  margin: 0;
  font-size: var(--lx-fs-sm);
  font-variant-numeric: tabular-nums;
  color: var(--lx-text-3);
}

.csv__count strong {
  color: var(--lx-text);
}

.csv-turn-enter-active,
.csv-turn-leave-active {
  transition: opacity 0.22s var(--lx-ease);
}

.csv-turn-enter-from,
.csv-turn-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .csv__stage {
    grid-template-columns: minmax(0, 1fr);
  }

  .csv__arrow {
    display: none;
  }

  .csv__count {
    display: none;
  }
}
</style>
