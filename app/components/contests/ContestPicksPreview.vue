<template>
  <div class="pc-panel pc-preview">
    <header class="pc-preview__head">
      <span class="pc-preview__brand">
        <img src="/logos/marca/icon-light.webp" alt="" width="22" height="22" />
        Photoreka <strong>Picks</strong>
      </span>
      <span class="pc-preview__for">Ranked for {{ contest.name }}</span>
    </header>

    <ol class="pc-preview__list">
      <li v-for="item in ranking" :key="item.photo.id" class="pc-preview__item" :class="{ 'is-first': item.rank === 1 }">
        <span class="pc-preview__rank">#{{ item.rank }}</span>
        <img :src="item.photo.src" alt="" loading="lazy" decoding="async" class="pc-preview__photo" />
        <span class="pc-preview__why">
          <strong>{{ item.rank === 1 ? "Best entry" : item.rank === 2 ? "Runner-up" : "Third choice" }}</strong>
          <span>{{ item.reason }}</span>
        </span>
        <span class="pc-preview__score">{{ formatScore(item.score) }}</span>
      </li>
    </ol>
    <p class="pc-preview__sample">Example ranking of sample photos with this contest's jury.</p>

    <div class="pc-preview__weights">
      <p class="pc-kicker">How this jury weighs a photo</p>
      <ul>
        <li v-for="item in focus" :key="item.key">
          <span>{{ item.label }}</span>
          <span class="pc-preview__track">
            <span class="pc-preview__fill" :style="{ width: `${Math.round(item.share * 100)}%` }" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { contestJuryFocus } from "~/utils/contests";
import { PICKS_CRITERIA, SHOWCASE_PHOTOS, formatScore, weightedScore } from "~/utils/picksShowcase";

const props = defineProps({
  contest: { type: Object, required: true },
});

const focus = computed(() => contestJuryFocus(props.contest.weights));

// Same rule as the app: a themed jury only ranks photos of its genres. With
// too few sample photos of those genres, every sample photo takes part.
const ranking = computed(() => {
  const genres = props.contest.juryGenres;
  const themed = genres?.length
    ? SHOWCASE_PHOTOS.filter((photo) => photo.genres.some((genre) => genres.includes(genre)))
    : SHOWCASE_PHOTOS;
  const pool = themed.length >= 3 ? themed : SHOWCASE_PHOTOS;
  const top = focus.value.slice(0, 2).map((item) => item.key);
  return pool
    .map((photo) => ({ photo, score: weightedScore(photo.scores, props.contest.weights) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item, i) => ({ ...item, rank: i + 1, reason: strengths(item.photo, top) }));
});

function strengths(photo, keys) {
  const label = (key) => PICKS_CRITERIA.find((criterion) => criterion.key === key)?.label ?? key;
  return keys.map((key) => `${label(key)} ${formatScore(photo.scores[key])}`).join(" · ");
}
</script>

<style scoped>
.pc-preview {
  display: grid;
  gap: 1.1rem;
  padding: clamp(20px, 2.6vw, 32px);
}

.pc-preview__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem 1rem;
}

.pc-preview__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--lx-text);
}

.pc-preview__brand strong {
  color: var(--pc-gold-ink);
}

.pc-preview__for {
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

.pc-preview__list {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pc-preview__item {
  display: grid;
  grid-template-columns: 2.2rem 72px minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.9rem;
  padding: 0.55rem 0.8rem 0.55rem 0.6rem;
  border-radius: var(--lx-radius-sm);
  border: 1px solid var(--lx-line);
  background: var(--lx-surface-2);
}

.pc-preview__item.is-first {
  border-color: color-mix(in srgb, var(--pc-gold) 55%, transparent);
  background: color-mix(in srgb, var(--pc-gold) 8%, var(--lx-surface));
}

.pc-preview__rank {
  font-family: var(--lx-font-display);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--lx-text-3);
}

.is-first .pc-preview__rank {
  color: var(--pc-gold-ink);
}

.pc-preview__photo {
  width: 72px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
}

.pc-preview__why {
  display: grid;
  gap: 0.15rem;
  min-width: 0;
}

.pc-preview__why strong {
  font-size: var(--lx-fs-sm);
  font-weight: 600;
  color: var(--lx-text);
}

.pc-preview__why span {
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pc-preview__score {
  font-family: var(--lx-font-display);
  font-size: 1.5rem;
  font-variant-numeric: tabular-nums;
  color: var(--lx-text);
}

.is-first .pc-preview__score {
  color: var(--pc-gold-ink);
}

.pc-preview__sample {
  margin: -0.4rem 0 0;
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

.pc-preview__weights {
  display: grid;
  gap: 0.7rem;
  padding-top: 1rem;
  border-top: 1px solid var(--lx-line);
}

.pc-preview__weights ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 1.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pc-preview__weights li {
  display: grid;
  gap: 0.3rem;
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-2);
}

.pc-preview__track {
  height: 4px;
  border-radius: 999px;
  background: var(--lx-line);
  overflow: hidden;
}

.pc-preview__fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--pc-brand-grad);
}

@media (max-width: 480px) {
  .pc-preview__item {
    grid-template-columns: 1.8rem 56px minmax(0, 1fr) auto;
    gap: 0.6rem;
  }

  .pc-preview__photo {
    width: 56px;
    height: 42px;
  }
}
</style>
