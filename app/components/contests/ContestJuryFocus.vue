<template>
  <div class="pc-jury">
    <div class="pc-jury__copy">
      <p class="pc-jury__brand">
        <img src="/logos/marca/horizontal-light.webp" alt="Photoreka" height="26" />
        <span>Picks</span>
      </p>
      <h2 class="pc-jury__title">Find your best photos for {{ contest.name }}</h2>
      <p class="pc-jury__lead">
        Not sure which photos to enter? Photoreka Picks ranks your shortlist with a jury weighted
        for this contest: it gives the most weight to <strong>{{ topLabels }}</strong>{{ scope }}.
      </p>

      <ol class="pc-jury__steps">
        <li>
          <span>1</span>
          <p><strong>Add your photos.</strong> Up to {{ formatCount(PICKS_MAX_PHOTOS) }}, straight from your computer.</p>
        </li>
        <li>
          <span>2</span>
          <p><strong>Each one is scored</strong> on eight criteria and weighed the way this jury would.</p>
        </li>
        <li>
          <span>3</span>
          <p><strong>Enter the top of the ranking,</strong> with a short critique for every photo.</p>
        </li>
      </ol>

      <div class="lx-actions">
        <LxButton icon="external" :href="picksUrl" target="_blank" @click="track('picks')">
          <ContestPicksMark dark :size="24" />
          Rank my photos for this contest
        </LxButton>
        <LxButton variant="ghost" icon="external" :href="trialUrl" target="_blank" @click="track('trial')">
          Try it free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos
        </LxButton>
      </div>
      <p class="pc-jury__price">
        {{ formatEur(PICKS_PRICE_PER_PHOTO_EUR) }} per photo, VAT included, minimum
        {{ formatEur(PICKS_MIN_CHARGE_EUR) }}. No account, and your originals never leave your
        device.
      </p>
      <p class="pc-jury__note">
        The weights are our reading of the work this competition has rewarded. Real juries change
        every edition, so take the ranking as orientation, not a prediction, and check your
        shortlist against the contest's brief.
      </p>
    </div>

    <div v-reveal="{ variant: 'scale', delay: 120 }">
      <ContestPicksPreview :contest="contest" />
    </div>
  </div>
</template>

<script setup>
import ContestPicksPreview from "./ContestPicksPreview.vue";
import ContestPicksMark from "./ContestPicksMark.vue";
import { contestGenre, contestJuryFocus, picksContestUrl } from "~/utils/contests";
import {
  PICKS_FREE_TRIAL_PHOTOS,
  PICKS_MAX_PHOTOS,
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
  if (!genres?.length) return "";
  const labels = genres.map((key) => contestGenre(key).label.toLowerCase());
  const list = labels.length > 1 ? `${labels.slice(0, -1).join(", ")} or ${labels[labels.length - 1]}` : labels[0];
  return `, and only ranks your ${list} photos`;
});

const picksUrl = computed(() => picksContestUrl(config.public.appUrl, props.contest.slug));
const trialUrl = computed(() => picksContestUrl(config.public.appUrl, props.contest.slug, true));

const formatEur = (n) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 3 }).format(n);
const formatCount = (n) => new Intl.NumberFormat("en-GB").format(n);

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
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
  padding: clamp(24px, 4vw, 56px);
  border-radius: var(--lx-radius-lg);
  border: 1px solid color-mix(in srgb, var(--pc-gold) 30%, var(--lx-line));
  background: linear-gradient(135deg, color-mix(in srgb, var(--pc-gold) 9%, var(--lx-surface)) 0%, var(--lx-surface) 60%);
}

.pc-jury__copy {
  display: grid;
  gap: 1.3rem;
  justify-items: start;
}

.pc-jury__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
}

.pc-jury__brand img {
  display: block;
  height: 26px;
  width: auto;
}

.pc-jury__brand span {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--pc-gold-grad);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #2a1a04;
}

.pc-jury__title {
  margin: 0;
  font-family: var(--lx-font-sans);
  font-size: clamp(1.6rem, 2.6vw, 2.3rem);
  font-weight: 650;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: var(--lx-text);
}

.pc-jury__lead {
  max-width: 36em;
  margin: 0;
  font-size: var(--lx-fs-lead);
  line-height: 1.6;
  color: var(--lx-text-2);
}

.pc-jury__lead strong {
  color: var(--lx-text);
}

.pc-jury__steps {
  display: grid;
  gap: 0.75rem;
  margin: 0.2rem 0;
  padding: 0;
  list-style: none;
}

.pc-jury__steps li {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
}

.pc-jury__steps li > span {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background: var(--lx-text);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--lx-bg);
}

.pc-jury__steps p {
  margin: 0.15rem 0 0;
  font-size: var(--lx-fs-sm);
  line-height: 1.55;
  color: var(--lx-text-2);
}

.pc-jury__steps strong {
  color: var(--lx-text);
}

.pc-jury__price,
.pc-jury__note {
  max-width: 40em;
  margin: 0;
  font-size: var(--lx-fs-xs);
  line-height: 1.6;
  color: var(--lx-text-3);
}

@media (max-width: 1023px) {
  .pc-jury {
    grid-template-columns: 1fr;
  }
}
</style>
