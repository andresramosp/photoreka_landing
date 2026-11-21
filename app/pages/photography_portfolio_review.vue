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
      <PageHero eyebrow="Photography portfolio review · Checked by a curator">
        <template #title>
          A portfolio review <em class="lx-accent">written for your photographs.</em>
        </template>
        <p>
          Send {{ CRITIQUE_MIN_PHOTOS }} to {{ CRITIQUE_MAX_PHOTOS }} photographs and receive a
          written report: what works in your strongest images, where the set starts to repeat
          itself and what to photograph next. Written by our AI following curatorial criteria,
          and reviewed by a curator before it reaches you.
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
              Delivered within {{ CRITIQUE_DELIVERY_HOURS }} hours
            </li>
            <li>
              <n-icon size="15"><CardOutline /></n-icon>
              {{ formatEur(CRITIQUE_PRICE_EUR) }}, VAT included
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
      <section id="report" class="lx-section">
        <div class="lx-container">
          <SectionIntro eyebrow="The report" align="center">
            <template #title>
              Seven sections, <em class="lx-accent">one reading of your work.</em>
            </template>
            <p>
              Not a score and not a list of tips. A report that looks at each photograph on its
              own and then at what the set says about the person behind the camera.
            </p>
          </SectionIntro>
          <PageGrid :items="sections" :columns="3" />
        </div>
      </section>

      <!-- ── One critique ────────────────────────────────────────────── -->
      <section id="critique" class="lx-section">
        <div class="lx-container cql-excerpt">
          <div v-reveal="{ variant: 'scale' }" class="cql-excerpt__photo">
            <ShotFrame
              :src="CRITIQUE_EXCERPT.photo"
              alt="Street photograph of a woman on the phone at a jewellery stall, with its critique"
              ratio="auto"
              bare
            />
          </div>
          <div class="cql-excerpt__copy">
            <SectionIntro eyebrow="Photo critique, frame by frame" size="md" flush>
              <template #title>
                First what the photograph is. <em class="lx-accent">Then why it works.</em>
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
              Word for word from the sample report below. When a photograph works, the report
              says so and leaves it there.
            </p>
          </div>
        </div>
      </section>

      <!-- ── Sample report ───────────────────────────────────────────── -->
      <section id="sample" class="lx-section">
        <div class="lx-container">
          <SectionIntro eyebrow="Sample report" align="center">
            <template #title>
              Read one <em class="lx-accent">from cover to roadmap.</em>
            </template>
            <p>
              A complete report on 25 street photographs, page by page.
            </p>
            <template #actions>
              <LxButton
                variant="ghost"
                icon="down"
                :href="CRITIQUE_SAMPLE_PDF"
                target="_blank"
                @click="trackSample('pdf')"
              >
                Download the sample PDF
              </LxButton>
            </template>
          </SectionIntro>
          <div v-reveal="120">
            <CritiqueSampleViewer :pages="CRITIQUE_SAMPLE_PAGES" @turn="onTurn" />
          </div>
        </div>
      </section>

      <!-- ── How it works ────────────────────────────────────────────── -->
      <section id="how-it-works" class="lx-section">
        <div class="lx-container">
          <SectionIntro eyebrow="How it works">
            <template #title>
              From your selection to <em class="lx-accent">a report in your inbox.</em>
            </template>
          </SectionIntro>
          <PageSteps :steps="steps" />
        </div>
      </section>

      <!-- ── Method ──────────────────────────────────────────────────── -->
      <section class="lx-section lx-section--tight">
        <div class="lx-container">
          <div v-reveal class="lx-card cql-note">
            <span class="cql-note__icon" aria-hidden="true">
              <n-icon size="26"><EyeOutline /></n-icon>
            </span>
            <div>
              <h2 class="lx-title lx-title--md">Written by AI, checked by a curator.</h2>
              <p class="lx-lead">
                The report says so on its first page. Each photograph is read on its own, three
                critical readings of the set are weighed against each other, and every sentence
                is held against the photograph it talks about. The figures are counted, never
                estimated. Then a curator reads the whole report next to your images before it
                is sent. It is a reasoned opinion, not a verdict.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Pricing ─────────────────────────────────────────────────── -->
      <section id="pricing" class="lx-section">
        <div class="lx-container">
          <SectionIntro eyebrow="Pricing" align="center">
            <template #title>
              One report, <em class="lx-accent">one payment.</em>
            </template>
          </SectionIntro>
          <div v-reveal class="lx-card cql-price">
            <div class="cql-price__main">
              <p class="cql-price__figure">
                {{ formatEur(CRITIQUE_PRICE_EUR) }}<span> per report</span>
              </p>
              <p class="cql-price__sub">VAT included. No account, no subscription.</p>
              <LxButton icon="external" block :href="CRITIQUE_APP_URL" target="_blank" @click="trackOrder('pricing')">
                Get my portfolio review
              </LxButton>
            </div>
            <ul class="lx-list cql-price__list">
              <li v-for="item in included" :key="item">
                <span class="lx-tick" aria-hidden="true" />{{ item }}
              </li>
            </ul>
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
                your report. They are never made public and never used to train any model. Your
                photographs and your report are kept for {{ CRITIQUE_RETENTION_DAYS }} days,
                behind a private link that only you receive.
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
          {{ CRITIQUE_MIN_PHOTOS }} to {{ CRITIQUE_MAX_PHOTOS }} photographs, one report, within
          {{ CRITIQUE_DELIVERY_HOURS }} hours.
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
import { markRaw } from "vue";
import {
  AlbumsOutline,
  CardOutline,
  CompassOutline,
  EyeOutline,
  FlagOutline,
  LockClosedOutline,
  PersonRemoveOutline,
  RemoveCircleOutline,
  RepeatOutline,
  RibbonOutline,
  StarOutline,
  TimeOutline,
} from "@vicons/ionicons5";
import {
  CRITIQUE_APP_URL,
  CRITIQUE_DELIVERY_HOURS,
  CRITIQUE_EXCERPT,
  CRITIQUE_FAQS,
  CRITIQUE_LANGUAGES,
  CRITIQUE_MAX_CONTEXT_PHOTOS,
  CRITIQUE_MAX_PHOTOS,
  CRITIQUE_MIN_PHOTOS,
  CRITIQUE_PRICE_EUR,
  CRITIQUE_RETENTION_DAYS,
  CRITIQUE_SAMPLE_PAGES,
  CRITIQUE_SAMPLE_PDF,
} from "~/utils/critiqueShowcase";
import { trackUserAction } from "~/utils/analytics";

useSEO("photography_portfolio_review");

const navLinks = [
  { label: "The report", target: "report" },
  { label: "Sample", target: "sample" },
  { label: "How it works", target: "how-it-works" },
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
const heroPages = [CRITIQUE_SAMPLE_PAGES[10], CRITIQUE_SAMPLE_PAGES[3], CRITIQUE_SAMPLE_PAGES[0]];

const gold = "var(--pc-gold-ink)";
const sections = [
  {
    icon: markRaw(CompassOutline),
    title: "Portfolio overview",
    description:
      "Where your work stands: its genre and manner, the devices it returns to and what it gives up to get what it gets.",
    color: gold,
  },
  {
    icon: markRaw(StarOutline),
    title: "Featured photographs",
    description:
      "Your strongest images critiqued one by one: what works, what could have been better and, where it helps, a tighter framing.",
    color: gold,
  },
  {
    icon: markRaw(RemoveCircleOutline),
    title: "Set-aside images",
    description:
      "The photographs that hold the set back, each with what it was after and why that is not enough.",
    color: gold,
  },
  {
    icon: markRaw(RibbonOutline),
    title: "Your strengths",
    description:
      "Traits of you as an author, not of a single frame, each backed by the photographs that show it.",
    color: gold,
  },
  {
    icon: markRaw(RepeatOutline),
    title: "Areas for growth",
    description:
      "The habits that give your work coherence and could harden into a formula, with exact counts and your own photos as examples.",
    color: gold,
  },
  {
    icon: markRaw(AlbumsOutline),
    title: "Proposed projects",
    description:
      "Series your material already points to: which photographs fit today and what is still to be photographed.",
    color: gold,
  },
  {
    icon: markRaw(FlagOutline),
    title: "Roadmap",
    description:
      "Where to start, concrete steps from your next outing to the coming months, and open contests your strongest photographs suit.",
    color: gold,
  },
];

const steps = [
  {
    title: "Choose your photographs",
    description: `The ${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} you would put in a portfolio today. Add up to ${CRITIQUE_MAX_CONTEXT_PHOTOS} more as context if you like: they show your habits and may hold an image worth rescuing.`,
  },
  {
    title: "Pick a language and pay once",
    description: `${formatEur(CRITIQUE_PRICE_EUR)}, VAT included, no account. Your report is written in ${CRITIQUE_LANGUAGES.slice(0, -1).join(", ")} or ${CRITIQUE_LANGUAGES.at(-1)}.`,
  },
  {
    title: "A curator reviews it",
    description:
      "The report is written within minutes, then read by a curator against your photographs before it is sent.",
  },
  {
    title: "Receive your report as a PDF",
    description: `Within ${CRITIQUE_DELIVERY_HOURS} hours it lands in your inbox as a PDF, with a private link to download it again.`,
  },
];

const included = [
  `${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} photographs reviewed`,
  `Up to ${CRITIQUE_MAX_CONTEXT_PHOTOS} more as context`,
  "About a third of them critiqued at length",
  "Reviewed by a curator before delivery",
  "A print-ready PDF report",
  `In ${CRITIQUE_LANGUAGES.length} languages, your choice`,
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

// One event per visitor is enough to know the sample is being read.
let turned = false;
function onTurn() {
  if (turned) return;
  turned = true;
  trackSample("viewer");
}
</script>

<style scoped>
/* ── Hero ───────────────────────────────────────────────────────── */

.cql-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
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
}

/* Three pages of a real report, fanned like prints on a table. */
.cql-sheets {
  position: relative;
  width: min(100%, 560px);
  aspect-ratio: 1 / 1.02;
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

/* ── Pricing ────────────────────────────────────────────────────── */

.cql-price {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(24px, 5vw, 72px);
  align-items: center;
  max-width: 920px;
  margin: 0 auto;
  padding: clamp(28px, 4vw, 56px);
}

.cql-price__figure {
  margin: 0;
  font-family: var(--lx-font-display);
  font-weight: 300;
  font-size: clamp(3.4rem, 7vw, 5rem);
  letter-spacing: -0.04em;
  line-height: 1;
}

.cql-price__figure span {
  margin-left: 0.4rem;
  font-family: var(--lx-font-sans);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--lx-text-3);
}

.cql-price__sub {
  margin: 0.9rem 0 1.6rem;
  color: var(--lx-text-2);
}

.cql-price__list {
  display: grid;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cql-price__list li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

@media (max-width: 900px) {
  .cql-excerpt,
  .cql-price {
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
