<template>
  <div class="pc-filters" role="search" aria-label="Filter contests">
    <div class="pc-filters__group">
      <p id="pc-filter-genre" class="pc-filters__label">Genre</p>
      <div class="pc-filters__pills" role="group" aria-labelledby="pc-filter-genre">
        <button
          type="button"
          class="pc-pill"
          :class="{ 'is-active': model.genre === 'all' }"
          :aria-pressed="model.genre === 'all'"
          @click="model.genre = 'all'"
        >
          All genres
        </button>
        <button
          v-for="genre in genres"
          :key="genre.key"
          type="button"
          class="pc-pill"
          :class="{ 'is-active': model.genre === genre.key }"
          :style="{ '--c': genre.color }"
          :aria-pressed="model.genre === genre.key"
          @click="model.genre = model.genre === genre.key ? 'all' : genre.key"
        >
          <i aria-hidden="true" />{{ genre.label }}
        </button>
      </div>
    </div>

    <div class="pc-filters__row">
      <div class="pc-filters__group">
        <p class="pc-filters__label">Entry fee</p>
        <button
          type="button"
          class="pc-pill pc-pill--toggle"
          :class="{ 'is-active': model.free }"
          :aria-pressed="model.free"
          @click="model.free = !model.free"
        >
          Free entry only
        </button>
      </div>
      <div class="pc-filters__group">
        <p id="pc-filter-format" class="pc-filters__label">Format</p>
        <div class="pc-seg" role="group" aria-labelledby="pc-filter-format">
          <button
            v-for="option in formats"
            :key="option.key"
            type="button"
            :class="{ 'is-active': model.format === option.key }"
            :aria-pressed="model.format === option.key"
            @click="model.format = option.key"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
      <div class="pc-filters__group pc-filters__group--grow">
        <p class="pc-filters__label">Name</p>
        <label class="pc-search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <span class="pc-search__label">Search contests by name</span>
          <input v-model="model.query" type="search" placeholder="Search by name" autocomplete="off" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CONTEST_GENRES } from "~/utils/contests";

const props = defineProps({
  /** Genres that have at least one contest. */
  available: { type: Array, default: () => [] },
});

const model = defineModel({ type: Object, required: true });

const genres = computed(() =>
  CONTEST_GENRES.filter((genre) => props.available.includes(genre.key)),
);

const formats = [
  { key: "any", label: "Any format" },
  { key: "single", label: "Single images" },
  { key: "series", label: "Series" },
];

</script>

<style scoped>
.pc-filters {
  display: grid;
  gap: 1.2rem;
}

.pc-filters__group {
  display: grid;
  gap: 0.5rem;
  align-content: start;
}

.pc-filters__group--grow {
  flex: 1 1 240px;
}

.pc-filters__label {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.pc-filters__pills,
.pc-filters__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;
}

.pc-filters__row {
  gap: 1.2rem 1.6rem;
}

.pc-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 40px;
  padding: 0 1rem;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  background: var(--pc-tint);
  color: var(--lx-text-2);
  font: 600 0.84rem var(--lx-font-sans);
  white-space: nowrap;
  cursor: pointer;
  transition:
    color 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.pc-pill:hover {
  color: var(--lx-text);
  border-color: var(--lx-line-3);
}

.pc-pill i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c);
}

.pc-pill.is-active {
  color: var(--lx-text);
  border-color: color-mix(in srgb, var(--c, var(--pc-gold)) 65%, transparent);
  background: color-mix(in srgb, var(--c, var(--pc-gold)) 14%, transparent);
}

.pc-pill--toggle.is-active {
  --c: var(--lx-ok);
}

.pc-seg {
  display: inline-flex;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  background: var(--pc-tint);
}

.pc-seg button {
  height: 32px;
  padding: 0 0.9rem;
  border: 0;
  border-radius: 999px;
  background: none;
  color: var(--lx-text-2);
  font: 600 0.82rem var(--lx-font-sans);
  white-space: nowrap;
  cursor: pointer;
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
}

.pc-seg button.is-active {
  background: var(--lx-btn-bg);
  color: var(--lx-btn-fg);
}

.pc-search {
  position: relative;
  display: block;
}

.pc-search svg {
  position: absolute;
  left: 14px;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  fill: none;
  stroke: var(--lx-text-3);
  stroke-width: 2;
  stroke-linecap: round;
}

.pc-search__label {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}

.pc-search input {
  width: 100%;
  height: 40px;
  padding: 0 1rem 0 2.5rem;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  background: var(--pc-tint);
  color: var(--lx-text);
  font: 500 0.88rem var(--lx-font-sans);
  outline: none;
  transition: border-color 0.3s ease;
}

.pc-search input::placeholder {
  color: var(--lx-text-3);
}

.pc-search input:focus {
  border-color: color-mix(in srgb, var(--pc-gold) 60%, transparent);
}

.pc-pill:focus-visible,
.pc-seg button:focus-visible {
  outline: 2px solid var(--pc-gold);
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .pc-filters__pills {
    flex-wrap: nowrap;
    margin-inline: calc(-1 * var(--lx-gutter));
    padding-inline: var(--lx-gutter);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .pc-filters__group--grow {
    flex-basis: 100%;
  }
}
</style>
