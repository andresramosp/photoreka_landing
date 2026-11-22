<template>
  <!-- Light like the contest pages: a report is read on paper. -->
  <ContestsShell :links="navLinks">
    <template #nav-actions>
      <NuxtLink to="/" class="lx-link pc-nav-back">Back to Photoreka</NuxtLink>
      <LxButton size="sm" :href="CRITIQUE_APP_URL" target="_blank" @click="trackOrder('nav')">
        Get my review
      </LxButton>
    </template>

    <div class="lx-numbered cql">
      <PageHero :eyebrow="`Eight-section PDF report · Written in ${CRITIQUE_LANGUAGES.length} languages`">
        <template #title>
          AI photography portfolio review, <em class="lx-accent">without the waiting list or the fee.</em>
        </template>
        <p>
          Send {{ CRITIQUE_MIN_PHOTOS }} to {{ CRITIQUE_MAX_PHOTOS }} photographs and receive a
          <strong>written review of your work as a whole</strong>. Our AI reads photographs with
          <strong>curatorial criteria</strong>: it critiques your strongest frames, names the ones
          that hold the set back and tells you <strong>what to photograph next</strong>. The depth
          of a traditional portfolio review, <strong>faster and for a fraction of the price</strong>.
        </p>
        <template #actions>
          <LxButton icon="external" :href="CRITIQUE_APP_URL" target="_blank" @click="trackOrder('hero')">
            Get my portfolio review
          </LxButton>
          <LxButton variant="ghost" href="#sample" @click="trackSample('hero')">
            Read a sample report
          </LxButton>
        </template>
        <template #note>
          <ul class="cql-trust">
            <li>
              <n-icon size="15"><PersonRemoveOutline /></n-icon>
              No account, no subscription
            </li>
            <li>
              <n-icon size="15"><TimeOutline /></n-icon>
              {{ CRITIQUE_BETA ? `Delivered in ${CRITIQUE_DEFAULT_DELIVERY}` : "Ready in minutes" }}
            </li>
            <li>
              <n-icon size="15"><CardOutline /></n-icon>
              {{ formatEur(CRITIQUE_PRICE_EUR) }}{{ CRITIQUE_BETA ? " beta price" : "" }}, VAT included
            </li>
          </ul>
        </template>
        <template #visual>
          <div class="cql-sheets" aria-hidden="true">
            <img
              v-for="(page, i) in heroPages"
              :key="page"
              :src="page"
              :class="`cql-sheet cql-sheet--${i}`"
              alt=""
              width="1100"
              height="1556"
            />
          </div>
        </template>
      </PageHero>

      <!-- ── What is inside ──────────────────────────────────────────── -->
      <section id="report" class="lx-section cql-report">
        <div class="lx-container">
          <SectionIntro eyebrow="The report" align="center">
            <template #title>
              Eight sections, <em class="lx-accent">one reading of your work.</em>
            </template>
            <p>
              Critique reads your photographs the way a <strong>curator</strong> reads a
              portfolio: one frame at a time, then as a <strong>body of work</strong>. You receive
              a written report on what your strongest images achieve, where the set starts to
              repeat itself and <strong>what to photograph next</strong>.
            </p>
            <template #actions>
              <!-- Who it is for, next to the genres: where a reader checks
                   whether it covers what they do. -->
              <div class="cql-audience">
                <ul class="cql-genres" aria-label="Genres a report covers">
                  <li
                    v-for="genre in CRITIQUE_GENRES"
                    :key="genre.key"
                    class="cql-genre"
                    :style="{ '--c': genre.color }"
                  >
                    <i aria-hidden="true" />{{ genre.label }}
                  </li>
                </ul>
                <p class="cql-fineprint">{{ CRITIQUE_AUDIENCE }}</p>
              </div>
            </template>
          </SectionIntro>
          <CritiqueSectionsBento
            :sections="sections"
            :pages="CRITIQUE_SAMPLE_PAGES"
            :pdf="CRITIQUE_SAMPLE_PDF"
            @open="trackSample('bento')"
          />
        </div>
      </section>

      <!-- ── How it works ────────────────────────────────────────────── -->
      <!-- Right after what the report holds: who writes it is the first doubt
           about a new kind of review. The AI writes in ink; in a Reviewed report
           the curator only adds in gold. Nothing is struck out. -->
      <section id="how-it-works" class="lx-section">
        <div class="lx-container">
          <div class="cql-duet">
            <div class="cql-duet__copy">
              <SectionIntro eyebrow="How it works" flush>
                <template #title>
                  The AI does the reading. <em class="lx-accent">A curator answers for it.</em>
                </template>
                <p>
                  Our AI writes the complete report on its own: every frame, the set as a whole,
                  the roadmap. That is an Instant report. In a Reviewed report, a curator then
                  reads it next to your photographs, <strong>adds what only experience gives and
                  signs it off</strong>.<template v-if="CRITIQUE_BETA"> During the beta, every
                  report is Reviewed.</template>
                </p>
              </SectionIntro>

              <div class="cql-roles">
                <div v-for="(role, i) in roles" :key="role.key" v-reveal="i * 120" class="cql-role">
                  <p class="cql-role__tag" :class="`cql-role__tag--${role.key}`">
                    <span class="cql-role__dot" aria-hidden="true" />
                    {{ role.who }} <span class="cql-role__verb">· {{ role.verb }}</span>
                  </p>
                  <p class="cql-role__lead">{{ role.lead }}</p>
                  <ul class="cql-role__list">
                    <li v-for="item in role.items" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <figure v-reveal="{ variant: 'scale' }" class="cql-ms">
              <div class="cql-ms__head">
                <span><b>03</b> Other images</span>
                <span>Reviewed report · curator's pass</span>
              </div>
              <img
                class="cql-ms__photo"
                :src="CRITIQUE_MANUSCRIPT.photo"
                alt=""
                width="1100"
                height="733"
                loading="lazy"
              />
              <p class="cql-ms__text">
                <template v-for="line in manuscript" :key="line">
                  <span class="cql-ms__line">{{ line }}</span><span
                    class="cql-ms__check"
                    title="Confirmed against the photograph"
                  ><n-icon size="13"><CheckmarkOutline /></n-icon></span>{{ " " }}
                </template>
                <ins class="cql-ms__ins">
                  <span class="cql-ms__caret" aria-hidden="true">‸</span>
                  {{ CURATOR_NOTE }}
                </ins>
              </p>
              <figcaption class="cql-ms__legend">
                <span><i class="cql-ms__swatch cql-ms__swatch--ai" />Written by the AI</span>
                <span><i class="cql-ms__swatch cql-ms__swatch--curator" />Added by the curator</span>
              </figcaption>
            </figure>
          </div>

          <ol class="cql-rail">
            <li
              v-for="(stop, i) in timeline"
              :key="stop.when"
              v-reveal="i * 90"
              class="cql-rail__stop"
              :class="{ 'is-curator': stop.curator }"
            >
              <span class="cql-rail__dot" aria-hidden="true" />
              <p class="cql-rail__when">{{ stop.when }}</p>
              <p class="cql-rail__what">{{ stop.what }}</p>
            </li>
          </ol>
        </div>
      </section>

      <!-- ── One critique ────────────────────────────────────────────── -->
      <section id="critique" class="lx-section">
        <div class="lx-container cql-excerpt">
          <div v-reveal="{ variant: 'scale' }" class="cql-excerpt__photo">
            <ShotFrame
              :src="CRITIQUE_EXCERPT.photo"
              :alt="CRITIQUE_EXCERPT.alt"
              ratio="auto"
              bare
            />
          </div>
          <div class="cql-excerpt__copy">
            <SectionIntro eyebrow="Photo critique, frame by frame" size="md" flush>
              <template #title>
                What works. What doesn’t.<em class="lx-accent"> No AI sycophancy.</em>  
              </template>
            </SectionIntro>
            <div v-reveal="160" class="cql-quote">
              <h3>What works?</h3>
              <p>{{ CRITIQUE_EXCERPT.works }}</p>
            </div>
            <div v-reveal="240" class="cql-quote">
              <h3>What could have been better?</h3>
              <p>{{ CRITIQUE_EXCERPT.improve }}</p>
            </div>
            <p class="cql-fineprint">
              Word for word from the sample report below, as the AI wrote it; the first
              reading is shortened.
            </p>
          </div>
        </div>
      </section>

      <!-- ── Sample report ───────────────────────────────────────────── -->
      <section id="sample" class="lx-section cql-sample">
        <CritiqueSheetsReel :pages="sampleSheets" @open="trackSample('reel')">
          <template #head>
            <SectionIntro eyebrow="Sample report" align="center" size="md">
              <template #title>
                Read one <em class="lx-accent">from cover to roadmap.</em>
              </template>
              <p>
                A complete report on 24 photographs, plus 50 more sent as context,
                <strong>exactly as our AI wrote it</strong>.
              </p>
              <template #actions>
                <LxButton
                  variant="ghost"
                  icon="down"
                  :href="CRITIQUE_SAMPLE_PDF"
                  target="_blank"
                  @click="trackSample('pdf')"
                >
                  <span class="cql-pdf-label">
                    <AppLogo layout="icon" :height="22" class="cql-pdf-logo" />
                    Download the sample PDF
                  </span>
                </LxButton>
              </template>
            </SectionIntro>
          </template>
        </CritiqueSheetsReel>
      </section>

      <!-- ── Compared ────────────────────────────────────────────────── -->
      <!-- Kinds of feedback, never named products: what each gives a photographer. -->
      <section id="compare" class="lx-section">
        <div class="lx-container">
          <SectionIntro eyebrow="Compared" align="center">
            <template #title>
              Not a score per photo. <em class="lx-accent">A reading of your work.</em>
            </template>
            <p>
              What each kind of feedback gives you, side by side. Photo critique apps judge one
              frame at a time; a portfolio review reads what the frames say together.
            </p>
          </SectionIntro>

          <div v-reveal class="cql-compare-scroll">
            <table class="cql-compare">
              <thead>
                <tr>
                  <th scope="col"><span class="sr-only">What you get</span></th>
                  <th
                    v-for="column in compareColumns"
                    :key="column.key"
                    scope="col"
                    :class="{ 'is-ours': column.ours }"
                  >
                    {{ column.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in compareRows" :key="row.label">
                  <th scope="row">{{ row.label }}</th>
                  <td
                    v-for="column in compareColumns"
                    :key="column.key"
                    :class="[`is-${row.cells[column.key][0]}`, { 'is-ours': column.ours }]"
                  >
                    <span v-if="row.cells[column.key][0] !== 'info'" class="cql-compare__mark">
                      <n-icon size="15">
                        <CheckmarkOutline v-if="row.cells[column.key][0] === 'yes'" />
                        <RemoveOutline v-else-if="row.cells[column.key][0] === 'partly'" />
                        <CloseOutline v-else />
                      </n-icon>
                      <span class="sr-only">{{ markLabels[row.cells[column.key][0]] }}</span>
                    </span>
                    {{ row.cells[column.key][1] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="cql-fineprint cql-compare__note">
            Typical of each kind of service; individual offers vary.
          </p>
        </div>
      </section>

      <!-- ── Pricing ─────────────────────────────────────────────────── -->
      <section id="pricing" class="lx-section">
        <div class="lx-container">
          <SectionIntro eyebrow="Pricing" align="center">
            <template v-if="CRITIQUE_BETA" #title>
              Signed off by a curator, <em class="lx-accent">at the Instant price.</em>
            </template>
            <template v-else #title>
              One report. <em class="lx-accent">A curator if you want one.</em>
            </template>
            <p v-if="CRITIQUE_BETA">
              We are in beta, and during it a curator reads every report before it reaches you:
              it is how we keep raising the bar. Until Instant launches, <strong>you get a
              Reviewed report for the Instant price</strong>.
            </p>
            <p v-else>
              Instant is the full report as our AI writes it. Reviewed adds a curator who checks
              it against your photographs, enriches it and <strong>answers for it</strong>.
            </p>
          </SectionIntro>

          <!-- During the beta Reviewed is the one sold; after it, Instant is the
               default and Reviewed the upgrade, so it goes first. -->
          <div class="cql-tiers" :class="{ 'cql-tiers--instant-first': !CRITIQUE_BETA }">
            <div v-reveal class="lx-card cql-tier" :class="{ 'cql-tier--live': CRITIQUE_BETA }">
              <p v-if="CRITIQUE_BETA" class="cql-tier__badge">Beta offer</p>
              <h3 class="cql-tier__name">{{ CRITIQUE_TIERS.curated.name }}</h3>
              <p class="cql-tier__meta">
                The full AI report, reviewed and signed off by a curator · in under
                {{ CRITIQUE_DELIVERY_HOURS }} hours
              </p>
              <p class="cql-tier__figure">
                <s v-if="CRITIQUE_BETA">{{ formatEur(CRITIQUE_TIERS.curated.priceEur) }}</s>
                {{ formatEur(CRITIQUE_PRICE_EUR) }}<span> per report</span>
              </p>
              <p class="cql-tier__sub">VAT included. No account, no subscription.</p>
              <ul class="lx-list cql-tier__list">
                <li v-for="item in included" :key="item">
                  <span class="lx-tick" aria-hidden="true" />{{ item }}
                </li>
              </ul>
              <LxButton icon="external" block :href="CRITIQUE_APP_URL" target="_blank" @click="trackOrder('pricing')">
                Get my portfolio review
              </LxButton>
            </div>

            <!-- During the beta: shown, not sold. -->
            <div
              v-reveal="120"
              class="lx-card cql-tier cql-tier--instant"
              :class="{
                'is-soon': !CRITIQUE_TIERS.instant.available,
                'cql-tier--live': CRITIQUE_TIERS.instant.available,
              }"
              :aria-disabled="!CRITIQUE_TIERS.instant.available"
            >
              <p v-if="!CRITIQUE_TIERS.instant.available" class="cql-tier__badge cql-tier__badge--soon">
                Coming after the beta
              </p>
              <h3 class="cql-tier__name">{{ CRITIQUE_TIERS.instant.name }}</h3>
              <p class="cql-tier__meta">The full AI report · in minutes</p>
              <p class="cql-tier__figure">
                {{ formatEur(CRITIQUE_TIERS.instant.priceEur) }}<span> per report</span>
              </p>
              <p class="cql-tier__sub">VAT included. No account, no subscription.</p>
              <ul class="lx-list cql-tier__list">
                <li v-for="item in instantIncluded" :key="item">
                  <span class="lx-tick" aria-hidden="true" />{{ item }}
                </li>
              </ul>
              <p v-if="!CRITIQUE_TIERS.instant.available" class="cql-tier__soon">
                Not available yet. Order now and you get the Reviewed report at this price.
              </p>
              <LxButton
                v-else
                icon="external"
                block
                :href="CRITIQUE_APP_URL"
                target="_blank"
                @click="trackOrder('pricing_instant')"
              >
                Get my portfolio review
              </LxButton>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Privacy ─────────────────────────────────────────────────── -->
      <section class="lx-section lx-section--tight">
        <div class="lx-container">
          <div v-reveal class="lx-card cql-note">
            <span class="cql-note__icon" aria-hidden="true">
              <n-icon size="26"><LockClosedOutline /></n-icon>
            </span>
            <div>
              <h2 class="lx-title lx-title--md">Your photographs stay yours.</h2>
              <p class="lx-lead">
                They are resized in your browser before they are uploaded and used only to write
                your report. They are never made public and never used to train any model.
                {{ CRITIQUE_WHO_SEES }} Your photographs and your report are kept for
                {{ CRITIQUE_RETENTION_DAYS }} days, behind a private link that only you receive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── FAQ ─────────────────────────────────────────────────────── -->
      <FaqSection :faqs="faqs">
        <template #title>
          Portfolio reviews, <em class="lx-accent">answered.</em>
        </template>
        <template #answer="{ faq }">
          <p>
            {{ faq.answer }}
            <NuxtLink v-if="faq.link" :to="faq.link.to" class="lx-inline-link">
              {{ faq.link.label }} →
            </NuxtLink>
          </p>
        </template>
      </FaqSection>

      <!-- ── Final CTA ───────────────────────────────────────────────── -->
      <PageCta>
        <template #title>
          You know your photographs. <em class="lx-accent">Find out what they say together.</em>
        </template>
        <p>
          {{ CRITIQUE_MIN_PHOTOS }} to {{ CRITIQUE_MAX_PHOTOS }} photographs, one report, in
          {{ CRITIQUE_DEFAULT_DELIVERY }}.
        </p>
        <template #actions>
          <LxButton icon="external" :href="CRITIQUE_APP_URL" target="_blank" @click="trackOrder('final')">
            Get my portfolio review
          </LxButton>
          <LxButton variant="ghost" href="#sample" @click="trackSample('final')">
            Read a sample report
          </LxButton>
        </template>
      </PageCta>
    </div>
  </ContestsShell>
</template>

<script setup>
import {
  CardOutline,
  CheckmarkOutline,
  CloseOutline,
  LockClosedOutline,
  PersonRemoveOutline,
  RemoveOutline,
  TimeOutline,
} from "@vicons/ionicons5";
import CritiqueSectionsBento from "~/components/critique/CritiqueSectionsBento.vue";
import CritiqueSheetsReel from "~/components/critique/CritiqueSheetsReel.vue";
import {
  CRITIQUE_APP_URL,
  CRITIQUE_AUDIENCE,
  CRITIQUE_BETA,
  CRITIQUE_DEFAULT_DELIVERY,
  CRITIQUE_DELIVERY_HOURS,
  CRITIQUE_EXCERPT,
  CRITIQUE_FAQS,
  CRITIQUE_GENRES,
  CRITIQUE_LANGUAGES,
  CRITIQUE_MANUSCRIPT,
  CRITIQUE_MAX_CONTEXT_PHOTOS,
  CRITIQUE_MAX_PHOTOS,
  CRITIQUE_MIN_PHOTOS,
  CRITIQUE_PRICE_EUR,
  CRITIQUE_RETENTION_DAYS,
  CRITIQUE_SAMPLE_LABELS,
  CRITIQUE_SAMPLE_PAGES,
  CRITIQUE_SAMPLE_PDF,
  CRITIQUE_TIERS,
  CRITIQUE_WHO_SEES,
} from "~/utils/critiqueShowcase";
import { trackUserAction } from "~/utils/analytics";

useSEO("photography_portfolio_review");

const navLinks = [
  { label: "The report", target: "report" },
  { label: "How it works", target: "how-it-works" },
  { label: "Sample", target: "sample" },
  { label: "Compare", target: "compare" },
  { label: "Pricing", target: "pricing" },
  { label: "FAQ", target: "faq" },
];

const formatEur = (n) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

// The cover, a featured critique and a growth area: the three faces of a report.
const heroPages = [CRITIQUE_SAMPLE_PAGES[11], CRITIQUE_SAMPLE_PAGES[5], CRITIQUE_SAMPLE_PAGES[0]];

// Each section with the page of the sample it opens and the region of that page
// its tile shows ([x, y, width, height] as fractions of the page). The sizes
// close a 4 × 4 block: two big tiles, then a wide one and two small per row.
const sections = [
  {
    title: "Portfolio overview",
    description:
      "Where your work stands: its genre and manner, the devices it returns to and what it gives up to get what it gets.",
    page: 1,
    focus: [0.065, 0.355, 0.87, 0.52],
    size: "big",
  },
  {
    title: "Featured photographs",
    description:
      "Your strongest images critiqued one by one: what works, what could have been better and, where it helps, a tighter framing.",
    page: 4,
    focus: [0.065, 0.05, 0.87, 0.64],
    size: "big",
  },
  {
    title: "Set-aside images",
    description:
      "The photographs that hold the set back, each with what it was after and why that is not enough.",
    page: 8,
    focus: [0.065, 0.175, 0.87, 0.6],
  },
  {
    title: "Style profile",
    description:
      "What repeats across the set, counted photo by photo: the devices that carry your pictures, where the camera stands and how close.",
    page: 9,
    focus: [0.065, 0.195, 0.87, 0.59],
    size: "wide",
  },
  {
    title: "Your strengths",
    description:
      "Traits of you as an author, not of a single frame, each backed by the photographs that show it.",
    page: 10,
    focus: [0.065, 0.115, 0.87, 0.58],
  },
  {
    title: "Areas for growth",
    description:
      "The habits that give your work coherence and could harden into a formula, with exact counts and your own photos as examples.",
    page: 12,
    focus: [0.065, 0.075, 0.87, 0.38],
    size: "wide",
  },
  {
    title: "Proposed projects",
    description:
      "Series your material already points to: which photographs fit today and what is still to be photographed.",
    page: 13,
    focus: [0.065, 0.2, 0.87, 0.28],
  },
  {
    title: "Roadmap",
    description:
      "Where to start, concrete steps from your next outing to the coming months, and up to five contests your strongest photographs suit, the open ones marked.",
    page: 14,
    focus: [0.065, 0.27, 0.87, 0.37],
  },
];

// Each sheet opens the sample PDF at its page, in a new tab.
const sampleSheets = CRITIQUE_SAMPLE_PAGES.map((src, index) => ({
  src,
  label: CRITIQUE_SAMPLE_LABELS[index],
  href: `${CRITIQUE_SAMPLE_PDF}#page=${index + 1}`,
}));

// How it works: who does what, then when each part happens. The AI writes the
// whole report; the curator is the accountability on top, not a fix.
const roles = [
  {
    key: "ai",
    who: "The AI",
    verb: "writes the whole report",
    lead: "Trained on curatorial criteria, it does the slow, exhaustive reading a human reviewer rarely has time for.",
    items: [
      "Assesses every frame, and says which ones to drop",
      "Reads the set three ways: editorial, narrative and formal",
      "Ties every sentence to the photograph it talks about",
      "Counts every figure, never estimates",
    ],
  },
  {
    key: "curator",
    who: CRITIQUE_BETA ? "The curator" : "The curator, in Reviewed",
    verb: "signs off",
    lead: "Reads the finished report next to your photographs and takes responsibility for it.",
    items: [
      "Confirms each statement against its photograph",
      "References to photographers and books that speak to your work",
      "Nuance where your context or intent matters",
      "A last word on your projects and roadmap, and the sign-off",
    ],
  },
];

// A reading from the sample report as the AI wrote it, one sentence at a time.
const manuscript = CRITIQUE_MANUSCRIPT.text.split(/(?<=\.)\s+/);

// Illustrative: the kind of note a curator adds. It is not in the sample report.
const CURATOR_NOTE =
  "Alex Webb builds whole frames on this kind of layered echo; his Istanbul book is worth an evening next to this set.";

const timeline = [
  {
    when: "Today",
    what: `You send the ${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} photographs you would show today, up to ${CRITIQUE_MAX_CONTEXT_PHOTOS} more as context, choose one of ${CRITIQUE_LANGUAGES.length} languages and pay ${
      CRITIQUE_BETA
        ? `${formatEur(CRITIQUE_PRICE_EUR)} once`
        : `once, from ${formatEur(CRITIQUE_TIERS.instant.priceEur)}`
    }.`,
  },
  {
    when: "Minutes later",
    what: CRITIQUE_BETA
      ? "The AI has read every frame and written the full report."
      : "The AI has read every frame and written the full report. An Instant report is on its way to you.",
  },
  {
    when: CRITIQUE_BETA
      ? `Under ${CRITIQUE_DELIVERY_HOURS} hours`
      : `Reviewed · under ${CRITIQUE_DELIVERY_HOURS} hours`,
    what: "A curator checks it against your photographs, adds their notes and signs it off.",
    curator: true,
  },
  {
    when: "In your inbox",
    what: "A print-ready PDF, with a private link to download it again.",
  },
];

const reportIncluded = [
  `${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} photographs reviewed`,
  `Up to ${CRITIQUE_MAX_CONTEXT_PHOTOS} more as context`,
  `In ${CRITIQUE_LANGUAGES.length} languages, your choice`,
];

const included = [...reportIncluded, "Reviewed and signed off by a curator"];

const instantIncluded = [...reportIncluded, "Same eight sections, same depth"];

// Compared: kinds of feedback, never named products. Each cell is [mark, words]; "info"
// cells carry no mark, only a fact.
const compareColumns = [
  { key: "apps", label: "Photo critique apps" },
  { key: "chatbot", label: "A general chatbot" },
  { key: "critique", label: "Photoreka Critique", ours: true },
  { key: "human", label: "A traditional review" },
];

const markLabels = { yes: "Yes:", partly: "Partly:", no: "No:" };

const compareRows = [
  {
    label: "Reads your photos as a body of work",
    cells: {
      apps: ["no", "One photo at a time"],
      chatbot: ["partly", "Drifts to single frames"],
      critique: [
        "yes",
        `${CRITIQUE_MIN_PHOTOS}–${CRITIQUE_MAX_PHOTOS} photos + ${CRITIQUE_MAX_CONTEXT_PHOTOS} as context`,
      ],
      human: ["yes", "Within one session"],
    },
  },
  {
    label: "Says which photos to leave out",
    cells: {
      apps: ["partly", "A low score, not an edit"],
      chatbot: ["partly", "Tends to praise"],
      critique: ["yes", "Each set-aside image, with why"],
      human: ["yes", "Usually said first"],
    },
  },
  {
    label: "Counts what repeats in your work",
    cells: {
      apps: ["no", "Not across photos"],
      chatbot: ["no", "Estimates, does not count"],
      critique: ["yes", "Counted, photo by photo"],
      human: ["partly", "By eye"],
    },
  },
  {
    label: "Proposes projects and next steps",
    cells: {
      apps: ["no", "Tips per photo"],
      chatbot: ["partly", "If you ask the right way"],
      critique: ["yes", "Projects, roadmap and contests"],
      human: ["partly", "Depends on the reviewer"],
    },
  },
  {
    label: "Same criteria every time",
    cells: {
      apps: ["yes", "Fixed scores"],
      chatbot: ["no", "Ask twice, get two answers"],
      critique: ["yes", "Curatorial criteria, always"],
      human: ["partly", "One reviewer's taste"],
    },
  },
  {
    label: "What you keep",
    cells: {
      apps: ["info", "Scores in an app"],
      chatbot: ["info", "A chat"],
      critique: ["info", `A print-ready PDF, in ${CRITIQUE_LANGUAGES.length} languages`],
      human: ["info", "Your own notes"],
    },
  },
  {
    label: "How soon",
    cells: {
      apps: ["info", "Instantly"],
      chatbot: ["info", "Instantly"],
      critique: ["info", CRITIQUE_BETA ? `In under ${CRITIQUE_DELIVERY_HOURS} hours` : "In minutes"],
      human: ["info", "Weeks, when a slot opens"],
    },
  },
  {
    label: "Price",
    cells: {
      apps: ["info", "Free to a few euros"],
      chatbot: ["info", "Free or a subscription"],
      critique: [
        "info",
        CRITIQUE_BETA
          ? `${formatEur(CRITIQUE_PRICE_EUR)}, once`
          : `From ${formatEur(CRITIQUE_TIERS.instant.priceEur)}, once`,
      ],
      human: ["info", "€150 and up"],
    },
  },
];

const faqs = CRITIQUE_FAQS.map((faq) => ({
  question: faq.q,
  answer: faq.a,
  link: faq.link,
}));

function trackOrder(where) {
  trackUserAction("navigate_to_critique_tool", `portfolio_review_${where}`);
}

function trackSample(where) {
  trackUserAction("open_critique_sample", `portfolio_review_${where}`);
}
</script>

<style scoped>
/* ── Hero ───────────────────────────────────────────────────────── */

/* One line: the three facts read as a single strip. */
.cql-trust {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.cql-trust li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  white-space: nowrap;
}

/* A phone has no room for the strip. */
@media (max-width: 560px) {
  .cql-trust {
    flex-wrap: wrap;
  }
}

/* Three pages of a real report, fanned like prints on a table. */
.cql-sheets {
  position: relative;
  width: min(100%, 560px);
  aspect-ratio: 1 / 0.94;
  margin: 0 auto;
}

.cql-sheet {
  position: absolute;
  top: 6%;
  width: 58%;
  height: auto;
  border-radius: 3px;
  background: #fff;
  box-shadow:
    0 40px 80px -44px rgba(24, 24, 48, 0.6),
    0 0 0 1px var(--lx-line);
  transition: transform 0.9s var(--lx-ease);
}

.cql-sheet--0 {
  left: 0;
  transform: rotate(-7deg);
}

.cql-sheet--1 {
  left: 40%;
  transform: rotate(6deg);
}

.cql-sheet--2 {
  left: 20%;
  top: 0;
  transform: rotate(-1deg);
}

.cql-sheets:hover .cql-sheet--0 {
  transform: rotate(-10deg) translateX(-4%);
}

.cql-sheets:hover .cql-sheet--1 {
  transform: rotate(9deg) translateX(4%);
}

/* A tighter rhythm than the product pages: two section paddings meet between
   blocks, and at the default size they add up to a blank band. Child
   components (FAQ, final CTA) inherit it through the variable. */
.cql {
  --lx-section-y: clamp(56px, 6vw, 92px);
}

/* ── The report ─────────────────────────────────────────────────── */

/* The hero already closes with its own bottom space. */
.cql-report {
  padding-top: calc(var(--lx-section-y) * 0.4);
}

/* Genre pills: the look of the contest filters (ContestFilters.vue), but static. */
.cql-audience {
  display: grid;
  justify-items: center;
  gap: 0.85rem;
}

.cql-audience .cql-fineprint {
  max-width: 52ch;
  text-align: center;
}

.cql-genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cql-genre {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 36px;
  padding: 0 0.95rem;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  background: var(--pc-tint);
  color: var(--lx-text-2);
  font: 600 0.84rem var(--lx-font-sans);
  white-space: nowrap;
}

.cql-genre i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c);
}

/* ── Sample: the reel of pages ──────────────────────────────────── */

/* The Photoreka mark before the label: the PDF is one of ours. */
.cql-pdf-label {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.cql-pdf-logo {
  opacity: 1;
}

/* Pinned, the reel already keeps the nav's height clear above its heading
   and fills the screen below it: the section's own paddings would only add
   blank bands. */
@media (min-width: 761px) {
  .cql-sample {
    padding-block: 0;
  }
}

/* ── One critique ───────────────────────────────────────────────── */

.cql-excerpt {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(28px, 5vw, 80px);
  align-items: center;
}

.cql-excerpt__copy {
  display: grid;
  gap: 1.5rem;
}

.cql-quote h3 {
  margin: 0 0 0.5rem;
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 1.2rem;
  color: var(--pc-gold-ink);
}

.cql-quote p {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--lx-text);
}

.cql-fineprint {
  margin: 0;
  font-size: var(--lx-fs-sm);
  line-height: 1.55;
  color: var(--lx-text-3);
}

/* ── Notes (method, privacy) ────────────────────────────────────── */

.cql-note {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: clamp(18px, 3vw, 36px);
  align-items: start;
  padding: clamp(28px, 4vw, 56px);
}

.cql-note__icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(227, 161, 43, 0.14);
  color: var(--pc-gold-ink);
}

.cql-note .lx-lead {
  margin: 0.75rem 0 0;
  max-width: 70ch;
}

/* ── How it works: two readers ──────────────────────────────────── */

.cql-duet {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
  gap: clamp(32px, 6vw, 96px);
  align-items: center;
}

.cql-roles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(20px, 3vw, 36px);
  margin-top: clamp(28px, 4vw, 44px);
}

.cql-role {
  padding-top: 18px;
  border-top: 1px solid var(--lx-line-2);
}

.cql-role__tag {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 0 0.7rem;
  font-family: var(--lx-font-display);
  font-size: 1.35rem;
  line-height: 1.2;
}

.cql-role__verb {
  font-style: italic;
  color: var(--lx-text-3);
}

.cql-role__dot {
  width: 10px;
  height: 10px;
  flex: none;
  border-radius: 50%;
  background: var(--lx-text);
}

.cql-role__tag--curator .cql-role__dot {
  background: var(--pc-gold);
}

.cql-role__tag--curator .cql-role__verb {
  color: var(--pc-gold-ink);
}

.cql-role__lead {
  margin: 0 0 0.9rem;
  color: var(--lx-text-2);
  line-height: 1.6;
}

.cql-role__list {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--lx-fs-sm);
  line-height: 1.5;
}

.cql-role__list li {
  position: relative;
  padding-left: 1.1rem;
}

.cql-role__list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 7px;
  height: 1px;
  background: var(--lx-text-3);
}

/* A page of the report on the desk, mid-review. */
.cql-ms {
  margin: 0;
  padding: clamp(22px, 3vw, 36px);
  border-radius: 3px;
  background: #fff;
  color: #141418;
  box-shadow:
    0 50px 100px -56px rgba(24, 24, 48, 0.6),
    0 0 0 1px var(--lx-line);
  transform: rotate(1.2deg);
}

.cql-ms__head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 12px;
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(20, 20, 24, 0.7);
  font-size: var(--lx-fs-xs);
  color: rgba(20, 20, 24, 0.55);
}

.cql-ms__head span:first-child {
  color: #141418;
  font-weight: 500;
}

.cql-ms__head b {
  margin-right: 0.4rem;
  font-weight: 400;
  color: #3346c8;
}

.cql-ms__photo {
  display: block;
  width: 100%;
  height: auto;
  margin-bottom: 18px;
}

.cql-ms__text {
  margin: 0;
  font-family: var(--lx-font-display);
  font-size: clamp(1rem, 1.25vw, 1.12rem);
  line-height: 1.65;
}

.cql-ms__check {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-left: 4px;
  border-radius: 50%;
  vertical-align: 0.15em;
  background: rgba(227, 161, 43, 0.18);
  color: var(--pc-gold-ink);
}

/* The curator's addition: an insertion, never a correction. */
.cql-ms__ins {
  display: block;
  position: relative;
  margin-top: 14px;
  padding: 12px 14px 12px 18px;
  border-left: 2px solid var(--pc-gold);
  background: rgba(227, 161, 43, 0.1);
  font-style: italic;
  text-decoration: none;
  color: var(--pc-gold-ink);
}

.cql-ms__caret {
  position: absolute;
  left: -9px;
  top: -6px;
  font-style: normal;
  font-size: 1.3rem;
  color: var(--pc-gold);
}

.cql-ms__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.2rem;
  margin-top: 18px;
  font-size: var(--lx-fs-xs);
  color: rgba(20, 20, 24, 0.55);
}

.cql-ms__legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.cql-ms__swatch {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #141418;
}

.cql-ms__swatch--curator {
  background: var(--pc-gold);
}

/* When each part happens: one line, read left to right. */
.cql-rail {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(16px, 3vw, 40px);
  margin: clamp(56px, 7vw, 96px) 0 0;
  padding: 0;
  list-style: none;
}

.cql-rail::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 5px;
  height: 1px;
  background: var(--lx-line-3);
}

.cql-rail__stop {
  position: relative;
  padding-top: 30px;
}

.cql-rail__dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--lx-bg);
  border: 1.5px solid var(--lx-text);
}

.cql-rail__stop.is-curator .cql-rail__dot {
  border-color: var(--pc-gold);
  background: var(--pc-gold);
  box-shadow: 0 0 0 5px rgba(227, 161, 43, 0.18);
}

.cql-rail__when {
  margin: 0 0 0.4rem;
  font-family: var(--lx-font-display);
  font-style: italic;
  font-size: 1.35rem;
  line-height: 1.2;
}

.cql-rail__stop.is-curator .cql-rail__when {
  color: var(--pc-gold-ink);
}

.cql-rail__what {
  margin: 0;
  font-size: var(--lx-fs-sm);
  line-height: 1.55;
  color: var(--lx-text-2);
}

@media (max-width: 1000px) {
  .cql-duet {
    grid-template-columns: minmax(0, 1fr);
  }

  .cql-ms {
    max-width: 560px;
    margin-inline: auto;
  }
}

@media (max-width: 760px) {
  .cql-roles {
    grid-template-columns: minmax(0, 1fr);
  }

  /* The line turns vertical: stops read top to bottom. */
  .cql-rail {
    grid-template-columns: minmax(0, 1fr);
    gap: 26px;
  }

  .cql-rail::before {
    top: 0;
    bottom: 0;
    left: 5px;
    right: auto;
    width: 1px;
    height: auto;
  }

  .cql-rail__stop {
    padding: 0 0 0 32px;
  }
}

/* ── Compared ───────────────────────────────────────────────────── */

/* A phone scrolls the table sideways; the row labels stay in view. */
.cql-compare-scroll {
  overflow-x: auto;
  margin: 0 auto;
  border: 1px solid var(--lx-line);
  border-radius: 14px;
  background: var(--lx-bg);
}

.cql-compare {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--lx-fs-sm);
  line-height: 1.45;
  color: var(--lx-text-2);
}

.cql-compare th,
.cql-compare td {
  padding: 14px;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--lx-line);
  /* Every cell on one line: the table reads as a grid. Below the container
     width it scrolls sideways, row labels pinned. */
  white-space: nowrap;
}

.cql-compare tbody tr:last-child th,
.cql-compare tbody tr:last-child td {
  border-bottom: 0;
}

.cql-compare thead th {
  font-family: var(--lx-font-sans);
  font-size: var(--lx-fs-xs);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.cql-compare tbody th {
  position: sticky;
  left: 0;
  z-index: 1;
  width: 22%;
  background: var(--lx-bg);
  font-weight: 600;
  color: var(--lx-text);
}

/* Our column, lit like the live price tier. */
.cql-compare .is-ours {
  background: color-mix(in srgb, var(--pc-gold) 9%, var(--lx-bg));
  color: var(--lx-text);
}

.cql-compare thead .is-ours {
  color: var(--pc-gold-ink);
}

.cql-compare__mark {
  display: inline-flex;
  vertical-align: -2px;
  margin-right: 6px;
}

.cql-compare .is-yes .cql-compare__mark {
  color: var(--pc-gold-ink);
}

.cql-compare .is-partly .cql-compare__mark,
.cql-compare .is-no .cql-compare__mark {
  color: var(--lx-text-3);
}

.cql-compare__note {
  margin-top: 12px;
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ── Pricing ────────────────────────────────────────────────────── */

/* Two tiers side by side: the one sold today, and the one after the beta. */
.cql-tiers {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 2.5vw, 28px);
  max-width: 920px;
  margin: 0 auto;
}

.cql-tier {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(26px, 3.5vw, 44px);
}

.cql-tier--live {
  border-color: color-mix(in srgb, var(--pc-gold) 55%, transparent);
  box-shadow: 0 30px 70px -40px rgba(227, 161, 43, 0.55);
}

/* After the beta, Instant is the default and Reviewed the upgrade. */
.cql-tiers--instant-first .cql-tier--instant {
  order: -1;
}

/* Shown, not sold: lighter, dashed, no button. */
.cql-tier.is-soon {
  background: transparent;
  border-style: dashed;
  box-shadow: none;
}

.cql-tier.is-soon > :not(.cql-tier__badge):not(.cql-tier__soon) {
  opacity: 0.55;
}

.cql-tier__badge {
  align-self: flex-start;
  margin: 0 0 1.1rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: var(--pc-gold);
  color: #1a1408;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.cql-tier__badge--soon {
  background: transparent;
  border: 1px solid var(--lx-line-3);
  color: var(--lx-text-2);
}

.cql-tier__name {
  margin: 0;
  font-family: var(--lx-font-display);
  font-weight: 400;
  font-size: clamp(1.7rem, 2.4vw, 2.1rem);
  line-height: 1.1;
}

.cql-tier__meta {
  margin: 0.4rem 0 1.4rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.cql-tier__figure {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 0.6rem;
  margin: 0;
  font-family: var(--lx-font-display);
  font-weight: 300;
  font-size: clamp(3rem, 5.5vw, 4.2rem);
  letter-spacing: -0.04em;
  line-height: 1;
}

.cql-tier__figure s {
  font-size: 0.5em;
  color: var(--lx-text-3);
  text-decoration-thickness: 2px;
}

.cql-tier__figure span {
  font-family: var(--lx-font-sans);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--lx-text-3);
}

.cql-tier__sub {
  margin: 0.8rem 0 1.5rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.cql-tier__list {
  display: grid;
  gap: 0.7rem;
  margin: 0 0 1.8rem;
  padding: 0;
  list-style: none;
}

.cql-tier__list li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

/* The button and the "not yet" note sit at the bottom of their card. */
.cql-tier > :last-child {
  margin-top: auto;
}

.cql-tier__soon {
  margin-bottom: 0;
  font-size: var(--lx-fs-sm);
  line-height: 1.55;
  color: var(--lx-text-2);
}

@media (max-width: 900px) {
  .cql-excerpt,
  .cql-tiers {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .cql-note {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cql-sheet {
    transition: none;
  }
}
</style>
