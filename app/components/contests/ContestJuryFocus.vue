<template>
  <div class="pc-jury">
    <div class="pc-jury__copy">
      <ContestSectionHead title="Choosing your entries">
        Photoreka Picks scores each of your photos on eight artistic criteria. For
        {{ contest.name }}, its jury gives the most weight to
        <strong>{{ topLabels }}</strong>{{ scope }}.
      </ContestSectionHead>
      <p v-reveal="200" class="pc-jury__note">
        The weights are our reading of the work this competition has rewarded. Real juries change
        every edition and judge with their own eyes, so take the ranking as orientation, never as
        a prediction, and check your shortlist against the contest's brief.
      </p>
      <div v-reveal="280" class="lx-actions">
        <LxButton icon="external" :href="picksUrl" target="_blank" @click="track('picks')">
          Pick your entries
        </LxButton>
        <LxButton variant="ghost" icon="external" :href="trialUrl" target="_blank" @click="track('trial')">
          Try it free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos
        </LxButton>
      </div>
      <p v-reveal="340" class="pc-jury__price">
        {{ formatEur(PICKS_PRICE_PER_PHOTO_EUR) }} per photo, VAT included, minimum
        {{ formatEur(PICKS_MIN_CHARGE_EUR) }}. No account, and your originals never leave your
        device.
      </p>
    </div>

    <div v-reveal="{ variant: 'scale', delay: 120 }" class="pc-panel pc-jury__panel">
      <p class="pc-kicker">Jury weights</p>
      <ul class="pc-jury__bars">
        <li v-for="item in focus" :key="item.key">
          <span class="pc-jury__label">{{ item.label }}</span>
          <span class="pc-jury__track">
            <span class="pc-jury__fill" :style="{ '--w': `${Math.round(item.share * 100)}%` }" />
          </span>
        </li>
      </ul>
      <p v-if="unweighted.length" class="pc-jury__rest">
        Not weighed by this jury: {{ unweighted.join(", ").toLowerCase() }}.
      </p>
    </div>
  </div>
</template>

<script setup>
import ContestSectionHead from "./ContestSectionHead.vue";
import { contestGenre, contestJuryFocus, picksContestUrl } from "~/utils/contests";
import {
  PICKS_CRITERIA,
  PICKS_FREE_TRIAL_PHOTOS,
  PICKS_MIN_CHARGE_EUR,
  PICKS_PRICE_PER_PHOTO_EUR,
} from "~/utils/picksShowcase";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  contest: { type: Object, required: true },
});

const config = useRuntimeConfig();

const focus = computed(() => contestJuryFocus(props.contest.weights));

const topLabels = computed(() => {
  const labels = focus.value.slice(0, 3).map((item) => item.label.toLowerCase());
  return labels.length > 1
    ? `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`
    : (labels[0] ?? "");
});

const scope = computed(() => {
  const genres = props.contest.juryGenres;
  if (!genres?.length) return ", and ranks photos of every genre";
  const labels = genres.map((key) => contestGenre(key).label.toLowerCase());
  const list = labels.length > 1 ? `${labels.slice(0, -1).join(", ")} or ${labels[labels.length - 1]}` : labels[0];
  return `, and only ranks your ${list} photos`;
});

const unweighted = computed(() =>
  PICKS_CRITERIA.filter((criterion) => !props.contest.weights[criterion.key]).map((c) => c.label),
);

const picksUrl = computed(() => picksContestUrl(config.public.appUrl, props.contest.slug));
const trialUrl = computed(() => picksContestUrl(config.public.appUrl, props.contest.slug, true));

const formatEur = (n) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 3 }).format(n);

function track(kind) {
  trackUserAction(
    kind === "trial" ? "navigate_to_picks_trial" : "navigate_to_picks_contest",
    "photo_contest_detail_jury",
    props.contest.slug,
  );
}
</script>

<style scoped>
.pc-jury {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 5vw, 88px);
  align-items: center;
}

.pc-jury__copy {
  display: grid;
  gap: 1.5rem;
  justify-items: start;
}

.pc-jury__note {
  max-width: 40em;
  font-size: var(--lx-fs-sm);
  line-height: 1.7;
  color: var(--lx-text-3);
}

.pc-jury__price {
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

.pc-jury__panel {
  display: grid;
  gap: 1.5rem;
  padding: clamp(24px, 3vw, 44px);
}

.pc-jury__bars {
  display: grid;
  gap: 1.1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pc-jury__bars li {
  display: grid;
  gap: 0.5rem;
}

.pc-jury__label {
  font-family: var(--lx-font-display);
  font-size: 1.1rem;
  font-weight: 360;
  letter-spacing: -0.01em;
  color: var(--lx-text);
}

.pc-jury__track {
  height: 5px;
  border-radius: 999px;
  background: var(--lx-line);
  overflow: hidden;
}

.pc-jury__fill {
  display: block;
  width: 0;
  height: 100%;
  border-radius: inherit;
  background: var(--pc-brand-grad);
  transition: width 1.4s var(--lx-ease) 0.3s;
}

/* The bars fill once the panel has been revealed, or right away without motion. */
.pc-jury__panel.is-in .pc-jury__fill,
html:not(.lx-motion) .pc-jury__fill {
  width: var(--w);
}

.pc-jury__rest {
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

@media (max-width: 1023px) {
  .pc-jury {
    grid-template-columns: 1fr;
  }
}
</style>
