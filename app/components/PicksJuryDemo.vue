<template>
  <div class="pjd">
    <div class="pjd-pills" role="tablist">
      <button
        v-for="jury in SHOWCASE_JURIES"
        :key="jury.id"
        role="tab"
        class="pjd-pill"
        :class="{ 'is-active': jury.id === juryId }"
        :aria-selected="jury.id === juryId"
        @click="select(jury.id)"
      >
        {{ jury.label }}
      </button>
    </div>

    <Transition name="pjd-fade" mode="out-in">
      <p :key="juryId" class="pjd-tagline">{{ activeJury.tagline }}</p>
    </Transition>

    <TransitionGroup tag="div" name="pjd-move" class="pjd-grid" :class="`has-${ranked.length}`">
      <figure
        v-for="item in ranked"
        :key="item.photo.id"
        class="pjd-card"
        :class="{ 'is-first': item.rank === 1 }"
      >
        <img :src="item.photo.src" :alt="`Street photo ranked number ${item.rank}`" loading="lazy" />
        <span class="pjd-shade" />
        <span class="pjd-rank">{{ String(item.rank).padStart(2, "0") }}</span>
        <span class="pjd-score">{{ formatScore(item.score) }}</span>
        <figcaption v-if="item.rank === 1" class="pjd-critique">“{{ item.photo.critique }}”</figcaption>
      </figure>
    </TransitionGroup>

    <p class="pjd-note">
      Same {{ SHOWCASE_PHOTOS.length }} photos, real scores from the AI jury. Themed juries only
      rank the photos of their genre.
    </p>
  </div>
</template>

<script setup>
import {
  SHOWCASE_JURIES,
  SHOWCASE_PHOTOS,
  formatScore,
  rankShowcase,
} from "~/utils/picksShowcase";
import { trackUserAction } from "~/utils/analytics";

const juryId = ref(SHOWCASE_JURIES[0].id);
const activeJury = computed(() => SHOWCASE_JURIES.find((j) => j.id === juryId.value));
const ranked = computed(() => rankShowcase(juryId.value));

function select(id) {
  juryId.value = id;
  trackUserAction("picks_demo_jury", id);
}
</script>

<style scoped>
.pjd {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.pjd-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.pjd-pill {
  padding: 0.6rem 1.15rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.65);
  font: 500 0.875rem "Plus Jakarta Sans", sans-serif;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.pjd-pill:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.pjd-pill.is-active {
  color: #ffd98a;
  border-color: rgba(244, 183, 64, 0.55);
  background: rgba(244, 183, 64, 0.1);
  box-shadow: 0 8px 24px -10px rgba(244, 183, 64, 0.5);
}

.pjd-tagline {
  margin: 0;
  text-align: center;
  font-family: "Fraunces", Georgia, serif;
  font-style: italic;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.pjd-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: clamp(110px, 13vw, 170px);
  gap: 10px;
}

.pjd-card {
  position: relative;
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  background: #111117;
}

.pjd-card.is-first {
  grid-column: span 2;
  grid-row: span 2;
}

/* The No. 1 tile takes four cells: widen tiles so the last row ends flush. */
.has-3 .pjd-card:not(.is-first),
.has-8 .pjd-card:last-child {
  grid-column: span 2;
}

.pjd-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pjd-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(4, 4, 7, 0.85) 0%, transparent 45%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, transparent 30%);
}

.pjd-rank {
  position: absolute;
  top: 8px;
  left: 12px;
  font-family: "Fraunces", Georgia, serif;
  font-style: italic;
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}

.is-first .pjd-rank {
  font-size: clamp(2.6rem, 5vw, 4rem);
  background: linear-gradient(135deg, #ffe3a3 0%, #f4b740 45%, #d4861c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.5));
}

.pjd-score {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 3px 10px;
  border-radius: 999px;
  font-family: "Fraunces", Georgia, serif;
  font-size: 0.9rem;
  color: #fff;
  background: rgba(8, 8, 12, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
}

.is-first .pjd-score {
  color: #1a1206;
  border-color: transparent;
  background: linear-gradient(135deg, #ffe3a3 0%, #f4b740 45%, #d4861c 100%);
}

.pjd-critique {
  position: absolute;
  left: 16px;
  right: 80px;
  bottom: 14px;
  font-family: "Fraunces", Georgia, serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(0.85rem, 1.25vw, 1.05rem);
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.92);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

.pjd-note {
  margin: 0;
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.42);
}

.pjd-move-move {
  transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}
.pjd-move-enter-active {
  transition: opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}
.pjd-move-enter-from {
  opacity: 0;
  transform: scale(0.92);
}
.pjd-move-leave-active {
  display: none;
}

.pjd-fade-enter-active,
.pjd-fade-leave-active {
  transition: opacity 0.25s ease;
}
.pjd-fade-enter-from,
.pjd-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .pjd-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 120px;
  }
  .pjd-critique {
    -webkit-line-clamp: 2;
    line-clamp: 2;
    right: 64px;
  }
}
</style>
