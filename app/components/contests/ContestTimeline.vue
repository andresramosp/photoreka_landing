<template>
  <div class="pc-timeline">
    <section v-for="group in groups" :key="group.key" class="pc-month">
      <header class="pc-month__head">
        <h3 class="pc-month__name">
          {{ group.month }}
          <span class="pc-month__year">{{ group.year }}</span>
        </h3>
        <p class="pc-month__count">
          {{ group.items.length }} {{ group.items.length === 1 ? "date" : "dates" }}
        </p>
      </header>
      <div class="pc-month__rows">
        <ContestRow v-for="contest in group.items" :key="contest.slug" :contest="contest" :today="today" />
      </div>
    </section>
  </div>
</template>

<script setup>
import ContestRow from "./ContestRow.vue";
import { contestKeyDate, contestMonthKey, contestMonthLabel } from "~/utils/contests";

const props = defineProps({
  /** Open and upcoming contests, in any order. */
  contests: { type: Array, required: true },
  today: { type: String, required: true },
});

const groups = computed(() => {
  const dated = props.contests
    .map((contest) => ({ contest, date: contestKeyDate(contest, props.today) }))
    .filter((item) => item.date)
    .sort((a, b) => a.date.localeCompare(b.date) || a.contest.name.localeCompare(b.contest.name));

  const byMonth = new Map();
  for (const { contest, date } of dated) {
    const key = contestMonthKey(date);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key).push(contest);
  }
  return [...byMonth.entries()].map(([key, items]) => ({ key, items, ...contestMonthLabel(key) }));
});
</script>

<style scoped>
.pc-timeline {
  display: grid;
  gap: clamp(40px, 5vw, 72px);
}

.pc-month {
  display: grid;
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
  gap: clamp(20px, 3vw, 48px);
  align-items: start;
}

/* The month stays in view while its contests scroll past. */
.pc-month__head {
  position: sticky;
  top: calc(var(--lx-nav-h) + 40px);
  display: grid;
  gap: 0.6rem;
  padding-top: clamp(18px, 2vw, 26px);
}

.pc-month__name {
  font-size: clamp(2.2rem, 3.6vw, 3.4rem);
  font-style: italic;
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: -0.035em;
  color: var(--lx-text);
}

.pc-month__year {
  display: block;
  margin-top: 0.5rem;
  font-family: var(--lx-font-sans);
  font-size: var(--lx-fs-eyebrow);
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--pc-gold-ink);
}

.pc-month__count {
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

.pc-month__rows {
  border-top: 1px solid var(--lx-line-2);
}

@media (max-width: 860px) {
  .pc-month {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .pc-month__head {
    position: static;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-top: 0;
    padding-bottom: 0.75rem;
  }

  .pc-month__year {
    display: inline;
    margin-left: 0.6rem;
  }
}
</style>
