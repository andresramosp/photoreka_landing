<template>
  <dl class="pc-facts">
    <div
      v-for="fact in rows"
      :key="fact.label"
      class="pc-facts__item"
      :class="{ 'is-wide': fact.wide, 'is-lead': fact.lead }"
    >
      <dt class="pc-kicker">{{ fact.label }}</dt>
      <dd v-if="fact.chips" class="pc-facts__chips">
        <span v-for="chip in fact.chips" :key="chip">{{ chip }}</span>
      </dd>
      <dd v-else :class="{ 'is-free': fact.free }">{{ fact.value }}</dd>
    </div>
  </dl>
</template>

<script setup>
import { contestFormatLabel, formatContestDate } from "~/utils/contests";

const props = defineProps({
  contest: { type: Object, required: true },
});

const CADENCE = { annual: "Every year", biennial: "Every two years", monthly: "Monthly calls" };

// Only what the official site states: an unpublished fact gets no row.
const rows = computed(() => {
  const f = props.contest.facts;
  const out = [];
  if (f?.prizes) out.push({ label: "What you can win", value: f.prizes, wide: true, lead: true });
  if (f?.entryFee || f?.isFree) {
    out.push({ label: "Entry fee", value: f.isFree ? f.entryFee || "Free entry" : f.entryFee, free: f.isFree });
  }
  if (f?.deadline) out.push({ label: "Final deadline", value: formatContestDate(f.deadline) });
  if (f?.earlyDeadline) out.push({ label: "Early deadline", value: formatContestDate(f.earlyDeadline) });
  if (f?.opensAt) out.push({ label: "Entries open", value: formatContestDate(f.opensAt) });
  if (f?.accepts) out.push({ label: "Format", value: contestFormatLabel(f.accepts) });
  if (f?.maxImages) {
    out.push({ label: "Images per entry", value: `Up to ${f.maxImages}` });
  }
  out.push({ label: "Held", value: CADENCE[props.contest.cadence] ?? "" });
  if (f?.categories?.length) out.push({ label: "Categories", chips: f.categories, wide: true });
  if (f?.eligibility) out.push({ label: "Who can enter", value: f.eligibility, wide: true });
  return out;
});
</script>

<style scoped>
.pc-facts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
  gap: clamp(24px, 2.6vw, 36px) clamp(20px, 2.4vw, 40px);
  margin: 0;
}

.pc-facts__item {
  display: grid;
  align-content: start;
  gap: 0.7rem;
}

/* Long facts take a full row each, ruled off from the short ones. */
.pc-facts__item.is-wide {
  grid-column: 1 / -1;
  padding-top: clamp(22px, 2.4vw, 32px);
  border-top: 1px solid var(--lx-line);
}

.pc-facts dd {
  margin: 0;
  font-family: var(--lx-font-display);
  font-size: clamp(1.15rem, 1.6vw, 1.5rem);
  font-weight: 360;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--lx-text);
}

.pc-facts__item.is-wide dd {
  max-width: 44em;
  font-family: var(--lx-font-sans);
  font-size: var(--lx-fs-body);
  font-weight: 400;
  line-height: 1.65;
  letter-spacing: 0;
  color: var(--lx-text-2);
}

/* The prizes open the sheet, in the display face. */
.pc-facts__item.is-lead {
  padding-top: 0;
  border-top: 0;
}

.pc-facts__item.is-lead dd {
  font-family: var(--lx-font-display);
  font-size: clamp(1.3rem, 1.9vw, 1.7rem);
  font-weight: 360;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--lx-text);
}

.pc-facts dd.is-free {
  color: var(--lx-ok);
}

.pc-facts__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.pc-facts__chips span {
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  background: var(--pc-tint);
  font-size: var(--lx-fs-sm);
  color: var(--lx-text);
}

</style>
