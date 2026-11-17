<template>
  <div class="pc-panel pc-count" :class="`is-${status}`" :style="{ '--c': genre.color }">
    <p class="pc-kicker pc-count__status"><i aria-hidden="true" />{{ statusLabel }}</p>

    <p v-if="number !== null" class="pc-count__figure">
      <span class="pc-num pc-count__num" :class="status === 'open' && 'pc-num--gold'">
        {{ String(number).padStart(2, "0") }}
      </span>
      <span class="pc-count__unit">{{ unit }}</span>
    </p>
    <p v-else class="pc-num pc-count__word" :class="status === 'open' && 'pc-num--gold'">{{ word }}</p>

    <ul class="pc-count__dates">
      <li v-for="line in lines" :key="line.label">
        <span>{{ line.label }}</span>
        <strong>{{ line.value }}</strong>
      </li>
    </ul>

    <div class="pc-count__actions">
      <LxButton icon="external" block :href="entryUrl" target="_blank" @click="trackEnter">
        {{ status === "open" ? "Enter on the official site" : "Visit the official site" }}
      </LxButton>
      <LxButton v-if="canSaveDate" variant="ghost" icon="download" block @click="saveDate">
        Add the deadline to my calendar
      </LxButton>
    </div>

    <p class="pc-count__checked">
      <template v-if="contest.checkedAt">
        Last checked on the official site: {{ formatCheckedAt(contest.checkedAt) }}.
      </template>
      <template v-if="facts?.deadline">
        Deadlines have a cut-off time and time zone: confirm the exact hour on the official site.
      </template>
    </p>
  </div>
</template>

<script setup>
import {
  contestGenre,
  contestPath,
  contestStatus,
  contestWeekday,
  daysBetween,
  daysLeft,
  daysToOpening,
  formatCheckedAt,
  formatContestDate,
} from "~/utils/contests";
import { downloadDeadlineIcs } from "~/utils/contestCalendar";
import { trackUserAction } from "~/utils/analytics";
import { seoConfig } from "~/config/seo";

const props = defineProps({
  contest: { type: Object, required: true },
  today: { type: String, required: true },
});

const genre = computed(() => contestGenre(props.contest.genre));
const facts = computed(() => props.contest.facts);
const status = computed(() => contestStatus(props.contest, props.today));

const statusLabel = computed(
  () =>
    ({
      open: "Open for entries",
      upcoming: "Opening soon",
      closed: "Entries closed",
      unknown: "Dates to be confirmed",
    })[status.value],
);

const number = computed(() => {
  if (status.value === "open") {
    const left = daysLeft(props.contest, props.today);
    return left === 0 ? null : left;
  }
  if (status.value === "upcoming") return daysToOpening(props.contest, props.today);
  return null;
});

const unit = computed(() => {
  const plural = number.value === 1 ? "day" : "days";
  return status.value === "open" ? `${plural} left to enter` : `${plural} until entries open`;
});

const word = computed(() => {
  if (status.value === "open") return "Today";
  return status.value === "closed" ? "Closed" : "To be confirmed";
});

const fullDate = (iso) => `${contestWeekday(iso)}, ${formatContestDate(iso)}`;

const lines = computed(() => {
  const f = facts.value;
  if (!f) return [];
  const out = [];
  if (f.opensAt && status.value === "upcoming") out.push({ label: "Entries open", value: fullDate(f.opensAt) });
  if (f.earlyDeadline && f.earlyDeadline >= props.today && status.value === "open") {
    const days = daysBetween(props.today, f.earlyDeadline);
    out.push({
      label: "Early deadline",
      value: `${formatContestDate(f.earlyDeadline)} · ${days === 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`}`,
    });
  }
  if (f.deadline) {
    out.push({
      label: status.value === "closed" ? "Closed on" : status.value === "open" && number.value === null ? "Closes today" : "Final deadline",
      value: fullDate(f.deadline),
    });
  }
  if (f.nextOpening && status.value !== "open") out.push({ label: "Next edition", value: f.nextOpening });
  return out;
});

const entryUrl = computed(() => (status.value === "open" && facts.value?.entryUrl) || props.contest.url);
const canSaveDate = computed(() => ["open", "upcoming"].includes(status.value) && Boolean(facts.value?.deadline));

function saveDate() {
  downloadDeadlineIcs(props.contest, `${seoConfig.siteUrl}${contestPath(props.contest.slug)}`);
  trackUserAction("contest_add_to_calendar", "photo_contest_detail", props.contest.slug);
}

function trackEnter() {
  trackUserAction("navigate_to_contest_site", "photo_contest_detail", props.contest.slug);
}
</script>

<style scoped>
.pc-count {
  display: grid;
  gap: 1rem;
  padding: clamp(20px, 2.4vw, 32px);
  overflow: hidden;
  background:
    radial-gradient(110% 80% at 100% 0%, color-mix(in srgb, var(--c) 14%, transparent), transparent 60%),
    var(--pc-panel);
}

.pc-count::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: var(--pc-brand-grad);
  opacity: 0.8;
}

.pc-count__status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--lx-text-2);
}

.pc-count__status i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lx-text-3);
}

.is-open .pc-count__status i {
  background: var(--lx-ok);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--lx-ok) 20%, transparent);
}

.is-upcoming .pc-count__status i {
  background: var(--pc-sky);
}

.pc-count__figure {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
}

.pc-count__num {
  font-size: clamp(4.5rem, 8vw, 7rem);
  font-style: italic;
  padding-right: 0.2em;
  color: var(--lx-text);
}

.pc-count__word {
  font-size: clamp(2.6rem, 4.6vw, 4rem);
  font-style: italic;
  line-height: 1.05;
  padding-right: 0.2em;
  color: var(--lx-text);
}

.pc-count__unit {
  font-size: var(--lx-fs-sm);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pc-gold-ink);
}

.is-upcoming .pc-count__unit {
  color: var(--pc-sky);
}

.pc-count__dates {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--lx-line-2);
}

.pc-count__dates li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.2rem 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--lx-line);
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.pc-count__dates strong {
  font-weight: 600;
  color: var(--lx-text);
}

.pc-count__actions {
  display: grid;
  gap: 0.6rem;
}

.pc-count__checked {
  font-size: var(--lx-fs-xs);
  line-height: 1.6;
  color: var(--lx-text-3);
}
</style>
