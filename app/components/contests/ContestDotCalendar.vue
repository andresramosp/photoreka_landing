<template>
  <div class="pc-cal" :class="bare ? 'pc-cal--bare' : 'pc-panel'">
    <p class="pc-kicker pc-cal__kicker">Deadlines in the next twelve months</p>
    <ol class="pc-cal__months">
      <li v-for="month in months" :key="month.key" class="pc-cal__month" :class="{ 'is-now': month.isNow }">
        <span class="pc-cal__dots">
          <NuxtLink
            v-for="dot in month.dots"
            :key="dot.slug"
            :to="contestPath(dot.slug)"
            class="pc-cal__dot"
            :style="{ '--c': dot.color }"
            :title="`${dot.name} · closes ${dot.date}`"
            :aria-label="`${dot.name}, closes ${dot.date}`"
          />
        </span>
        <span class="pc-cal__label">{{ month.label }}</span>
      </li>
    </ol>

    <ul v-if="!bare" class="pc-cal__legend">
      <li v-for="genre in legend" :key="genre.key" :style="{ '--c': genre.color }">
        <i aria-hidden="true" />{{ genre.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  CONTEST_GENRES,
  contestGenre,
  contestMonthKey,
  contestMonthLabel,
  contestPath,
  formatContestDate,
} from "~/utils/contests";

const props = defineProps({
  contests: { type: Array, required: true },
  today: { type: String, required: true },
  /** Inside another panel: no card of its own. */
  bare: { type: Boolean, default: false },
});

// One dot per deadline still ahead, whether entries are open or about to open.
const months = computed(() => {
  const [year, month] = props.today.split("-").map(Number);
  const ahead = props.contests.filter(
    (c) => c.facts?.deadline && c.facts.deadline >= props.today,
  );
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(Date.UTC(year, month - 1 + i, 1));
    const key = date.toISOString().slice(0, 7);
    return {
      key,
      label: contestMonthLabel(key).month.slice(0, 3),
      isNow: i === 0,
      dots: ahead
        .filter((c) => contestMonthKey(c.facts.deadline) === key)
        .sort((a, b) => a.facts.deadline.localeCompare(b.facts.deadline))
        .map((c) => ({
          slug: c.slug,
          name: c.name,
          date: formatContestDate(c.facts.deadline),
          color: contestGenre(c.genre).color,
        })),
    };
  });
});

const legend = computed(() =>
  CONTEST_GENRES.filter((genre) => props.contests.some((c) => c.genre === genre.key)),
);
</script>

<style scoped>
.pc-cal {
  padding: clamp(24px, 3vw, 44px);
  overflow: hidden;
}

.pc-cal--bare {
  padding: 0;
}

/* A thread of brand light along the top edge. */
.pc-panel.pc-cal::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: var(--pc-brand-grad);
  opacity: 0.8;
}

.pc-cal__months {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 6px;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.pc-cal__month {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pc-cal__dots {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 5px;
  height: clamp(120px, 13vw, 168px);
  padding: 8px 0;
  border-radius: 12px;
  background: linear-gradient(180deg, transparent, var(--pc-tint));
  border-bottom: 1px solid var(--lx-line-2);
}

.pc-cal--bare .pc-cal__months {
  margin-top: 0.6rem;
}

.pc-cal--bare .pc-cal__dots {
  height: clamp(110px, 10vw, 150px);
}

.pc-cal__month.is-now .pc-cal__dots {
  border-bottom-color: var(--pc-gold);
  background: linear-gradient(180deg, transparent, rgba(227, 161, 43, 0.12));
}

.pc-cal__dot {
  width: clamp(9px, 1vw, 13px);
  aspect-ratio: 1;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 12px color-mix(in srgb, var(--c) 65%, transparent);
  transition: transform 0.4s var(--lx-ease);
}

.pc-cal__dot:hover {
  transform: scale(1.6);
}

.pc-cal__label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.pc-cal__month.is-now .pc-cal__label {
  color: var(--pc-gold-ink);
}

.pc-cal__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  margin: 1.4rem 0 0;
  padding: 0;
  list-style: none;
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-2);
}

.pc-cal__legend li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.pc-cal__legend i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c);
}

@media (max-width: 640px) {
  .pc-cal__months {
    gap: 3px;
  }

  .pc-cal__label {
    font-size: 0.56rem;
    letter-spacing: 0;
  }
}
</style>
