<template>
  <ul class="pc-compact">
    <li v-for="contest in contests" :key="contest.slug" class="pc-compact__item">
      <NuxtLink :to="contestPath(contest.slug)" class="pc-compact__thumb" tabindex="-1" aria-hidden="true">
        <ContestImage :contest="contest" ratio="4 / 3" monogram alt="" />
      </NuxtLink>
      <div class="pc-compact__main">
        <NuxtLink :to="contestPath(contest.slug)" class="pc-compact__name">{{ contest.name }}</NuxtLink>
        <ContestGenreChip :genre="contest.genre" />
      </div>
      <p class="pc-compact__note">{{ note(contest) }}</p>
      <NuxtLink :to="contestPath(contest.slug)" class="lx-link pc-compact__link">Details</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import ContestGenreChip from "./ContestGenreChip.vue";
import ContestImage from "./ContestImage.vue";
import { contestPath, formatContestDate } from "~/utils/contests";

const props = defineProps({
  contests: { type: Array, required: true },
  /** closed | unconfirmed */
  kind: { type: String, default: "closed" },
});

// Only what the contest itself has published: no guessed dates.
function note(contest) {
  if (props.kind === "unconfirmed") {
    return contest.facts?.nextOpening || "Dates not confirmed yet";
  }
  const closed = `Closed ${formatContestDate(contest.facts.deadline)}`;
  return contest.facts.nextOpening ? `${closed} · ${contest.facts.nextOpening}` : closed;
}
</script>

<style scoped>
.pc-compact {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 clamp(24px, 4vw, 64px);
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--lx-line-2);
}

.pc-compact__item {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) auto;
  gap: 0.35rem 1.1rem;
  align-items: center;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--lx-line);
}

.pc-compact__thumb {
  grid-row: 1 / span 2;
  border-radius: 10px;
  border: 1px solid var(--lx-line-2);
  overflow: hidden;
}

.pc-compact__main {
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.3rem 0.9rem;
  min-width: 0;
}

.pc-compact__name {
  font-family: var(--lx-font-display);
  font-size: 1.14rem;
  font-weight: 380;
  letter-spacing: -0.015em;
  color: var(--lx-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.pc-compact__name:hover {
  color: var(--pc-gold-ink);
}

.pc-compact__note {
  grid-column: 2;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

.pc-compact__link {
  grid-column: 3;
  grid-row: 1 / span 2;
  font-size: var(--lx-fs-sm);
}

@media (max-width: 860px) {
  .pc-compact {
    grid-template-columns: 1fr;
  }
}
</style>
