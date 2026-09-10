<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="framer-page">
        <!-- Navigation Header -->
        <nav class="premium-nav">
          <div class="nav-container">
            <div class="nav-brand">
              <NuxtLink to="/">
                <AppLogo layout="horizontal" :height="40" />
              </NuxtLink>
            </div>
            <div class="nav-actions">
              <button
                v-if="canToggleTheme(true)"
                class="theme-toggle"
                @click="toggleTheme"
                aria-label="Toggle theme"
              >
                <n-icon size="20">
                  <component
                    :is="themeMode === 'dark' ? SunnyOutline : MoonOutline"
                  />
                </n-icon>
              </button>
              <n-button text @click="goToHome" class="back-link">
                <template #icon>
                  <n-icon><ArrowBackOutline /></n-icon>
                </template>
                Back to Home
              </n-button>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="framer-hero" ref="heroSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="gradient-orb orb-3"></div>
          </div>
          <div class="hero-container">
            <div class="hero-layout">
              <!-- Left: Content -->
              <div class="hero-content">
                <div class="hero-badge" :class="{ visible: heroVisible }">
                  <span class="badge-content">
                    <n-icon size="16"><GridOutline /></n-icon>
                    Infinite Canvas · Sequence · AI Chat on the board
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Storyboard your photos with
                  <span class="gradient-text">an AI that sees your board</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Lay your own photographs out on an infinite canvas and arrange
                  them into a sequence. A chat docked to the board reads how
                  they sit, where the hole is, and tells you what is missing
                  using
                  <NuxtLink to="/ai_photo_search" class="cta-link"
                    >your own archive</NuxtLink
                  >.
                </p>

                <div class="hero-actions" :class="{ visible: heroVisible }">
                  <n-button
                    type="primary"
                    size="large"
                    strong
                    @click="goToDemo"
                    class="cta-primary"
                  >
                    <template #icon>
                      <n-icon><PlayCircleOutline /></n-icon>
                    </template>
                    Try the Demo
                  </n-button>
                  <n-button
                    strong
                    secondary
                    type="primary"
                    size="large"
                    @click="goToSignup"
                  >
                    <template #icon>
                      <n-icon><KeyOutline /></n-icon>
                    </template>
                    {{ joinButtonLabel }}
                  </n-button>
                </div>
                <p class="hero-alt-demo" :class="{ visible: heroVisible }">
                  <n-icon size="14"><BriefcaseOutline /></n-icon>
                  <span>
                    Shooting commercial work?
                    <a class="hero-alt-demo-link" @click="goToCommercialDemo"
                      >Try the commercial demo →</a
                    >
                  </span>
                </p>
                <p class="cta-note">
                  No credit card required · The demo needs no account
                </p>
              </div>

              <!-- Right: Screenshot.
                   Placeholder for now — swap `heroShot` below for the final
                   canvas + chat capture when it is ready. -->
              <div class="hero-visual" :class="{ visible: heroVisible }">
                <div class="video-frame">
                  <img
                    class="hero-shot"
                    :src="heroShot"
                    alt="Photos arranged into a storyboard on Photoreka's infinite canvas, with the AI chat panel proposing a narrative sequence beside it"
                    width="1600"
                    height="900"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Not a generator -->
        <section class="contrast-section" ref="contrastSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: contrastVisible }">
              <h2 class="section-title">
                Every other AI storyboard tool draws the frames.
                <span class="gradient-text">This one finds yours.</span>
              </h2>
              <p class="section-subtitle">
                A storyboard made of invented images is a mockup. A storyboard
                made of your own photographs is an edit — the thing you can
                actually print, hang, publish or send.
              </p>
            </div>

            <div class="contrast-grid" :class="{ visible: contrastVisible }">
              <div class="contrast-card contrast-card--them">
                <div class="contrast-label">
                  <n-icon size="16"><ColorWandOutline /></n-icon>
                  AI storyboard generators
                </div>
                <ul class="contrast-list">
                  <li v-for="(item, i) in generatorTraits" :key="i">
                    <n-icon size="16" class="contrast-icon contrast-icon--no">
                      <CloseCircleOutline />
                    </n-icon>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <div class="contrast-card contrast-card--us">
                <div class="contrast-label contrast-label--us">
                  <n-icon size="16"><ImagesOutline /></n-icon>
                  Photoreka Canvas
                </div>
                <ul class="contrast-list">
                  <li v-for="(item, i) in photorekaTraits" :key="i">
                    <n-icon size="16" class="contrast-icon contrast-icon--yes">
                      <CheckmarkCircleOutline />
                    </n-icon>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- The three levels -->
        <section class="levels-section" ref="levelsSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="section-container" style="position: relative; z-index: 1">
            <div class="section-header" :class="{ visible: levelsVisible }">
              <div
                class="hero-badge levels-badge"
                :class="{ visible: levelsVisible }"
              >
                <span class="badge-content">
                  <n-icon size="16"><LocateOutline /></n-icon>
                  You point, it understands
                </span>
              </div>
              <h2 class="section-title">
                You never explain which photos you mean
              </h2>
              <p class="section-subtitle">
                On a board full of pictures, "does this one fit here?" is
                ambiguous — unless the assistant can see what you marked. Three
                nested levels turn a gesture on the canvas into the subject of
                your question.
              </p>
            </div>

            <div class="levels-grid" :class="{ visible: levelsVisible }">
              <div
                v-for="(level, i) in levels"
                :key="i"
                class="level-card"
                :style="{
                  transitionDelay: `${i * 120}ms`,
                  '--level-color': level.color,
                }"
              >
                <div class="level-head">
                  <span class="level-badge">
                    <n-icon size="20"><component :is="level.icon" /></n-icon>
                  </span>
                  <div>
                    <span class="level-index">Level {{ i + 1 }}</span>
                    <h3 class="level-title">{{ level.title }}</h3>
                  </div>
                </div>
                <p class="level-text">{{ level.text }}</p>
                <p class="level-how">
                  <n-icon size="13" class="level-how-icon"
                    ><HandLeftOutline
                  /></n-icon>
                  {{ level.how }}
                </p>
                <div class="level-example">"{{ level.example }}"</div>
              </div>
            </div>

            <!-- Placeholder until the real capture is ready — swap `levelsShot`
                 below and this picks it up. -->
            <figure class="levels-figure" :class="{ visible: levelsVisible }">
              <img
                class="levels-shot"
                :src="levelsShot"
                alt="The three levels of context on Photoreka's canvas: the whole board, the focus area marked out with the halo, and a single spotlighted photo"
                width="2400"
                height="1200"
                loading="lazy"
              />
            </figure>

            <p class="levels-footnote" :class="{ visible: levelsVisible }">
              The finest level you marked is the subject of the question.
              Everything wider than it is context — which is exactly how you
              already think when you stand in front of a wall of prints.
            </p>
          </div>
        </section>

        <!-- How it works -->
        <section class="how-section" ref="howSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: howVisible }">
              <h2 class="section-title">
                How to storyboard your photos with AI
              </h2>
              <p class="section-subtitle">
                Five steps from a pile of frames to an ordered sequence you can
                defend.
              </p>
            </div>

            <div class="steps-container" :class="{ visible: howVisible }">
              <div
                v-for="(step, i) in steps"
                :key="i"
                class="step-card"
                :style="{ transitionDelay: `${i * 120}ms` }"
              >
                <div class="step-number" :style="{ background: step.color }">
                  {{ i + 1 }}
                </div>
                <div class="step-content">
                  <h3 class="step-title">{{ step.title }}</h3>
                  <p class="step-description">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Canvas features -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">
                Everything the canvas does on its own
              </h2>
              <p class="section-subtitle">
                Before a single word is typed, the board is already a proper
                editing table: infinite space, real drag-and-drop, and your
                archive one gesture away from any photo on it.
              </p>
            </div>

            <div class="features-grid">
              <div
                v-for="(feature, index) in canvasFeatures"
                :key="index"
                class="feature-card"
                :class="{ visible: featuresVisible }"
                :style="{ transitionDelay: `${index * 80}ms` }"
              >
                <div class="feature-icon" :style="{ color: feature.color }">
                  <n-icon size="30">
                    <component :is="feature.icon" />
                  </n-icon>
                </div>
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Similarity criteria -->
        <section class="criteria-section" ref="criteriaSection">
          <div class="hero-background">
            <div class="gradient-orb orb-3" style="animation-delay: -6s"></div>
          </div>
          <div class="section-container" style="position: relative; z-index: 1">
            <div class="section-header" :class="{ visible: criteriaVisible }">
              <h2 class="section-title">
                Pick any photo on the board and ask for
                <span class="gradient-text-blue"
                  >more like it — on your axis</span
                >
              </h2>
              <p class="section-subtitle">
                "Similar" is not one thing. A frame can rhyme with another by
                colour and clash with it narratively. Choose which kind of
                resemblance you are extending, and the strip under the canvas
                fills with candidates you drag straight up onto the board.
              </p>
            </div>

            <div class="criteria-grid" :class="{ visible: criteriaVisible }">
              <div
                v-for="(criterion, i) in criteria"
                :key="i"
                class="criterion-card"
                :style="{
                  transitionDelay: `${i * 70}ms`,
                  '--criterion-color': criterion.color,
                }"
              >
                <n-icon size="22" class="criterion-icon">
                  <component :is="criterion.icon" />
                </n-icon>
                <h3 class="criterion-title">{{ criterion.title }}</h3>
                <p class="criterion-text">{{ criterion.text }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Chat superpowers -->
        <section class="chat-section" ref="chatSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: chatVisible }">
              <div
                class="hero-badge chat-badge"
                :class="{ visible: chatVisible }"
              >
                <span class="badge-content">
                  <n-icon size="16"><ChatbubblesOutline /></n-icon>
                  The canvas, with the chat open
                </span>
              </div>
              <h2 class="section-title">
                What changes when the assistant is looking at the board
              </h2>
              <p class="section-subtitle">
                A general photo chat knows your catalog. This one also knows the
                arrangement in front of you — and that turns questions about
                sequence, rhythm and gaps into questions it can actually answer.
              </p>
            </div>

            <div class="chat-grid">
              <div
                v-for="(item, index) in chatPowers"
                :key="index"
                class="chat-card"
                :class="{ visible: chatVisible }"
                :style="{ transitionDelay: `${index * 80}ms` }"
              >
                <div class="chat-card-head">
                  <div class="chat-icon" :style="{ color: item.color }">
                    <n-icon size="22">
                      <component :is="item.icon" />
                    </n-icon>
                  </div>
                  <h3 class="chat-title">{{ item.title }}</h3>
                </div>
                <p class="chat-text">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Prompts by level -->
        <section class="examples-section" ref="examplesSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: examplesVisible }">
              <h2 class="section-title">
                What you actually ask a board like this
              </h2>
              <p class="section-subtitle">
                The same question means something different depending on what
                you marked. Write in whatever language you think in — the
                assistant answers in it.
              </p>
            </div>

            <div class="examples-grid" :class="{ visible: examplesVisible }">
              <div
                v-for="(group, i) in promptExamples"
                :key="i"
                class="example-group"
                :style="{ transitionDelay: `${i * 80}ms` }"
              >
                <div class="example-group-label">
                  <n-icon size="16">
                    <component :is="group.icon" />
                  </n-icon>
                  <span>{{ group.label }}</span>
                </div>
                <div class="example-queries">
                  <span
                    v-for="(q, j) in group.queries"
                    :key="j"
                    class="query-chip"
                  >
                    "{{ q }}"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Use cases -->
        <section class="usecase-section" ref="useCaseSection">
          <div class="hero-background">
            <div class="gradient-orb orb-2" style="animation-delay: -9s"></div>
          </div>
          <div class="section-container" style="position: relative; z-index: 1">
            <div class="section-header" :class="{ visible: useCaseVisible }">
              <h2 class="section-title">What photographers storyboard here</h2>
              <p class="section-subtitle">
                Any body of work whose order carries meaning.
              </p>
            </div>

            <div class="usecase-grid" :class="{ visible: useCaseVisible }">
              <div
                v-for="(useCase, i) in useCases"
                :key="i"
                class="usecase-card"
                :style="{ transitionDelay: `${i * 70}ms` }"
              >
                <n-icon
                  size="20"
                  class="usecase-icon"
                  :style="{ color: useCase.color }"
                >
                  <component :is="useCase.icon" />
                </n-icon>
                <div>
                  <h3 class="usecase-title">{{ useCase.title }}</h3>
                  <p class="usecase-text">{{ useCase.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Cross-promo -->
        <section class="cross-section" ref="crossSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: crossVisible }">
              <div
                class="hero-badge cross-badge"
                :class="{ visible: crossVisible }"
              >
                <span class="badge-content">
                  <n-icon size="16"><LayersOutline /></n-icon>
                  Same catalog, more ways in
                </span>
              </div>
              <h2 class="section-title cross-title">
                The board sits on top of
                <span class="gradient-text-blue">the rest of Photoreka</span>
              </h2>
              <p class="section-subtitle">
                Every photo it offers has already been searched, scored and
                understood by the same engines that power the rest of the app.
              </p>
            </div>

            <ul class="cross-features" :class="{ visible: crossVisible }">
              <li>
                <div class="feature-icon-wrapper" style="color: #8b5cf6">
                  <n-icon size="18"><ChatbubblesOutline /></n-icon>
                </div>
                <span>
                  <NuxtLink to="/photo_chat">AI Photo Assistant</NuxtLink>
                  — the same conversation without a board: critique your
                  portfolio, track how your work has changed, ask anything about
                  your archive.
                </span>
              </li>
              <li>
                <div class="feature-icon-wrapper" style="color: #06b6d4">
                  <n-icon size="18"><SearchOutline /></n-icon>
                </div>
                <span>
                  <NuxtLink to="/ai_photo_search">AI Photo Search</NuxtLink>
                  — describe a frame in plain language and find it in seconds,
                  no tagging required. It is what fills the board.
                </span>
              </li>
              <li>
                <div class="feature-icon-wrapper" style="color: #22c55e">
                  <n-icon size="18"><TrophyOutline /></n-icon>
                </div>
                <span>
                  <NuxtLink to="/photography_portfolio_builder"
                    >AI Portfolio Builder</NuxtLink
                  >
                  — when a sequence graduates into a finished edit, it builds
                  and orders the full portfolio for you.
                </span>
              </li>
              <li>
                <div class="feature-icon-wrapper" style="color: #f59e0b">
                  <n-icon size="18"><BarChartOutline /></n-icon>
                </div>
                <span>
                  <NuxtLink to="/photo_scoring">AI Photo Scoring</NuxtLink>
                  — the aesthetic, narrative and originality scores behind
                  "which of these is strongest".
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- FAQ -->
        <section class="faq-section" ref="faqSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: faqVisible }">
              <h2 class="section-title">Frequently Asked Questions</h2>
              <p class="section-subtitle">
                What photographers ask before storyboarding their own photos
                with AI
              </p>
            </div>

            <div class="faqs-container" :class="{ visible: faqVisible }">
              <div
                v-for="(faq, index) in faqs"
                :key="index"
                class="faq-item"
                :class="{ active: activeFAQ === index }"
              >
                <button class="faq-question" @click="toggleFAQ(index)">
                  <span>{{ faq.question }}</span>
                  <n-icon
                    size="20"
                    class="faq-icon"
                    :class="{ rotated: activeFAQ === index }"
                  >
                    <ChevronDownOutline />
                  </n-icon>
                </button>
                <div v-if="activeFAQ === index" class="faq-answer">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Final CTA -->
        <section class="cta-section" ref="ctaSection">
          <div class="section-container">
            <div class="cta-content" :class="{ visible: ctaVisible }">
              <h2 class="cta-title">Put your photos on a board and start</h2>
              <p class="cta-description">
                Arrange, question, replace, reorder. The archive is yours and so
                is the edit — the assistant just never lets you forget what you
                already shot.
              </p>
              <div class="cta-buttons">
                <n-button
                  type="primary"
                  size="large"
                  strong
                  @click="goToDemo"
                  class="cta-primary"
                >
                  <template #icon>
                    <n-icon><PlayCircleOutline /></n-icon>
                  </template>
                  Try the Demo
                </n-button>
                <n-button
                  strong
                  secondary
                  type="primary"
                  size="large"
                  @click="goToSignup"
                >
                  <template #icon>
                    <n-icon><KeyOutline /></n-icon>
                  </template>
                  {{ joinButtonLabel }}
                </n-button>
              </div>
              <div class="cta-extra">
                <p>
                  Shooting commercial work?
                  <a @click="goToCommercialDemo" class="cta-link"
                    >Try the commercial demo</a
                  >
                  — the same board on a product and packshot catalog.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <RequestAccessDialog
        v-model:show="showRequestDialog"
        @success="onRequestSuccess"
      />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { markRaw } from "vue";
import {
  SunnyOutline,
  MoonOutline,
  ArrowBackOutline,
  PlayCircleOutline,
  KeyOutline,
  ChevronDownOutline,
  SearchOutline,
  GridOutline,
  LayersOutline,
  LocateOutline,
  HandLeftOutline,
  FlashlightOutline,
  ScanOutline,
  AlbumsOutline,
  ChatbubblesOutline,
  ColorPaletteOutline,
  ColorWandOutline,
  ImagesOutline,
  CheckmarkCircleOutline,
  CloseCircleOutline,
  BookOutline,
  CameraOutline,
  LocationOutline,
  ConstructOutline,
  PricetagOutline,
  ShuffleOutline,
  GitCompareOutline,
  TrashOutline,
  ExpandOutline,
  SaveOutline,
  MoveOutline,
  BarChartOutline,
  TrophyOutline,
  NewspaperOutline,
  EaselOutline,
  BriefcaseOutline,
  StarOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("ai_photo_storyboard");

useHead({
  script: [
    {
      children: `(function(){try{const t=localStorage.getItem('photoreka-theme-mode')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
      tagPosition: "head",
      type: "text/javascript",
    },
  ],
});

const {
  naiveTheme: currentTheme,
  naiveThemeOverrides: themeOverrides,
  themeMode,
  toggleTheme: baseToggleTheme,
  canToggleTheme,
  initTheme,
} = useTheme();

const toggleTheme = () => baseToggleTheme();

// Hero screenshot. Placeholder until the final canvas + chat capture is dropped in;
// swap this one path and the hero picks it up.
const heroShot = "/canvas/hero_3.png";

// Full-width shot under the three levels. Placeholder for now — a capture showing
// the board, the halo and a spotlighted photo at once is what belongs here.
const levelsShot = "/canvas/levels.png";

// Refs
const heroSection = ref(null);
const contrastSection = ref(null);
const levelsSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const criteriaSection = ref(null);
const chatSection = ref(null);
const examplesSection = ref(null);
const useCaseSection = ref(null);
const crossSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

const heroVisible = ref(false);
const contrastVisible = ref(false);
const levelsVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const criteriaVisible = ref(false);
const chatVisible = ref(false);
const examplesVisible = ref(false);
const useCaseVisible = ref(false);
const crossVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// ─── Not a generator ───────────────────────────────────────
const generatorTraits = ref([
  "Invent frames from a text prompt — nothing you actually shot",
  "Output is a mockup you still have to go and photograph",
  "Know nothing about the archive you already own",
  "Consistency is a model problem, not an editing decision",
  "Built for pre-production: planning a shoot that has not happened",
]);

const photorekaTraits = ref([
  "Every frame is a real photograph from your own catalog",
  "The output is a finished edit — printable, publishable, sendable",
  "Reads a library of thousands and remembers what you forgot you had",
  "Consistency is judged across your real work, by score and by look",
  "Built for post-production: making sense of what you already shot",
]);

// ─── The three levels ──────────────────────────────────────
const levels = ref([
  {
    icon: markRaw(AlbumsOutline),
    title: "The board",
    color: "#64748b",
    text: "Every photo you have placed. The widest context — the overall sense of the sequence you are building, and the pool the assistant can profile as a body of work.",
    how: "Nothing to do. It is what the chat sees by default.",
    example: "What kind of shot is missing to make this set feel complete?",
  },
  {
    icon: markRaw(ScanOutline),
    title: "The focus",
    color: "#3b82f6",
    text: "The stretch of the board you are working on right now. Photos under the halo — an ambient circle that follows your viewport — or a set you pick by hand.",
    how: "Move the halo over the photos, click them one by one, or Ctrl / ⌘ and drag a box.",
    example: "What connects these, and which one is the weakest of them?",
  },
  {
    icon: markRaw(FlashlightOutline),
    title: "The spotlight",
    color: "#f59e0b",
    text: "The individual frames the question is really about. They can sit inside the focus, or be held up against it from elsewhere on the board.",
    how: "With a focus set, press the spotlight button on any photo.",
    example: "Does this one fit here, or does it break the run?",
  },
]);

// ─── How it works ──────────────────────────────────────────
const steps = ref([
  {
    title: "Drop your photos on an infinite board",
    description:
      "Pull frames from your catalog onto a canvas with no edges and arrange them by hand — left to right, top to bottom, the way the story should read. Nothing snaps to a template; the layout is the edit.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Mark what you are working on",
    description:
      "Slide the halo over a stretch of the sequence, or drag a box around it. Spotlight a single frame when the question is about that shot alone. The marks on the board are how you address the assistant.",
    color: "linear-gradient(135deg, #a855f7, #ec4899)",
  },
  {
    title: "Ask about the sequence, not just the photos",
    description:
      "The arrangement travels with your question as a grid — neighbours, rows, gaps, whether two clusters read as separate groups. So 'does this belong here', 'what breaks the rhythm' and 'what goes in the hole' are answerable, with the position named.",
    color: "linear-gradient(135deg, #6366f1, #2563eb)",
  },
  {
    title: "Pull the missing frame out of your archive",
    description:
      "The assistant searches your own library for work that would sit well beside what you have out — matched on look, narrative, palette or setting, your choice. Photos already on the board are held out, so every result is genuinely new. Drag any of them from the reply onto the canvas.",
    color: "linear-gradient(135deg, #06b6d4, #22c55e)",
  },
  {
    title: "Let it lay a proposed order out for you",
    description:
      "When a reply groups photos into a sequence, one click places them on the board in that exact order, as a block. Then you do what you were always going to do: move two of them and change your mind about the ending.",
    color: "linear-gradient(135deg, #22c55e, #84cc16)",
  },
]);

// ─── Canvas features ───────────────────────────────────────
const canvasFeatures = ref([
  {
    icon: markRaw(GridOutline),
    title: "An infinite, freeform board",
    description:
      "Pan and zoom across a canvas with no edges. Photos go anywhere, at any size, in any order — no grid, no template, no slots to fill. Dot grid, background colour and auto-align are yours to switch on or off.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Related photos, one gesture away",
    description:
      "Select any photo on the board and a strip fills underneath with visually and narratively related work from your archive. Drag them straight up onto the canvas — the board grows out of the frame you are looking at.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(AlbumsOutline),
    title: "As many boards as you have projects",
    description:
      "Create, name, switch and duplicate canvases. Each is saved with its own photos, its own arrangement and its own conversation, so a book edit and a client moodboard never collide.",
    color: "#3b82f6",
  },
  {
    icon: markRaw(MoveOutline),
    title: "Real arranging, not slideshow ordering",
    description:
      "Stack, overlap, cluster, leave a hole where the missing frame goes. Two photos side by side with a third hanging below them means something — and the assistant reads that geometry the same way you do.",
    color: "#a855f7",
  },
  {
    icon: markRaw(TrashOutline),
    title: "A trash you can walk back",
    description:
      "Drag a photo to the bin to take it out of the edit. It leaves the board and stops being proposed, but nothing is deleted — reopen the bin and pull it back whenever the sequence changes its mind.",
    color: "#ef4444",
  },
  {
    icon: markRaw(ExpandOutline),
    title: "Fit, unstack, zoom, tidy",
    description:
      "Frame the whole board in one click, spread a pile of overlapping frames apart, or zoom into a run of three. Small tools, but they are the difference between a working table and a mess.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(SaveOutline),
    title: "Send a selection anywhere",
    description:
      "Select photos on the board and push them into a collection, a series, a portfolio, another tool, or a chat — or download them. The canvas is a stage in a workflow, not a dead end.",
    color: "#22c55e",
  },
  {
    icon: markRaw(PlayCircleOutline),
    title: "A live demo board, no account",
    description:
      "Open a canvas that already has a real catalog behind it and try the whole thing — arranging, the related-photos strip, the chat — before you commit an archive of your own to it.",
    color: "#ec4899",
  },
]);

// ─── Similarity criteria ───────────────────────────────────
const criteria = ref([
  {
    icon: markRaw(CameraOutline),
    title: "General",
    color: "#8b5cf6",
    text: "Broad visual and semantic resemblance — scene, subject and overall style at once. The honest default when you just want more of this.",
  },
  {
    icon: markRaw(BookOutline),
    title: "Narrative",
    color: "#f59e0b",
    text: "What is happening, and how it feels to watch it. The one that matters when you are building a story rather than a wall of matching pictures.",
  },
  {
    icon: markRaw(ColorPaletteOutline),
    title: "Chromatic",
    color: "#ec4899",
    text: "Palette and colour distribution. For a sequence that has to hold together on a page, or a spread that must not clash.",
  },
  {
    icon: markRaw(LocationOutline),
    title: "Context",
    color: "#06b6d4",
    text: "Places, environments, symbols and cues. Finds the frames shot in the same world, even when they look nothing alike.",
  },
  {
    icon: markRaw(ConstructOutline),
    title: "Technical",
    color: "#3b82f6",
    text: "Framing, light and treatment. For matching the physical craft of a shot rather than what it depicts.",
  },
  {
    icon: markRaw(PricetagOutline),
    title: "Photo tags",
    color: "#22c55e",
    text: "Match on the concepts the AI already extracted from your archive — pick the ones that matter and search on those alone.",
  },
]);

// ─── What the chat adds ────────────────────────────────────
const chatPowers = ref([
  {
    icon: markRaw(GridOutline),
    title: "It reads the arrangement, not just the photos",
    description:
      "The board's geometry travels as a grid: what is next to what, what sits above or below, where the empty slot is, whether two clusters read apart. That is why it can say 'it breaks the run in the second row' instead of a generic opinion.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(LocateOutline),
    title: "It knows what you pointed at",
    description:
      "Board, focus, spotlight. You mark the level on the canvas and the finest one becomes the subject of the question — so 'these', 'here' and 'this one' all resolve to the photos you actually meant.",
    color: "#3b82f6",
  },
  {
    icon: markRaw(SearchOutline),
    title: "It searches your archive on the axis you name",
    description:
      "'More like these' anchors on the photos you marked. 'The same palette as these', 'narratively like these', 'in this vein but only verticals' — it switches what similarity means, and combines it with hard constraints when you set one.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(ImagesOutline),
    title: "Its answers are draggable",
    description:
      "Every photo in a reply can be dragged straight from the panel onto the board. Frames already placed are excluded from search results, so nothing it shows is something you have already used.",
    color: "#a855f7",
  },
  {
    icon: markRaw(ShuffleOutline),
    title: "It can lay a whole sequence out",
    description:
      "When a reply proposes a run — an opener, a middle, a closer — one click places those photos on the canvas in that order, as a block. The proposal becomes something you can look at, not just read.",
    color: "#22c55e",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "It can profile the board as a body of work",
    description:
      "Recurring subjects, dominant lighting, palette, score averages, where and when it was shot. Ask what the canvas is actually about and it answers from the board itself — never confusing it with your catalog at large.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(ScanOutline),
    title: "Canvas only: stay inside your own edit",
    description:
      "One switch confines every search to the photos already on the board. The conversation stops proposing new material and starts reading what you have: which frames are weakest, what repeats, whether the set holds.",
    color: "#ef4444",
  },
  {
    icon: markRaw(GitCompareOutline),
    title: "One conversation per board, kept with it",
    description:
      "Each canvas keeps its own thread, stored with the board rather than in a chat history. Reopen a project on another device six weeks later and the discussion about that sequence is still there.",
    color: "#ec4899",
  },
]);

// ─── Prompts by level ──────────────────────────────────────
const promptExamples = ref([
  {
    label: "The whole board",
    icon: markRaw(AlbumsOutline),
    queries: [
      "What is the overall mood these create together?",
      "What kind of shot is missing to make the set feel complete?",
      "Find the most unexpected pairings across the board",
      "Has this drifted away from what I named it?",
    ],
  },
  {
    label: "A focus area",
    icon: markRaw(ScanOutline),
    queries: [
      "What connects the photos I have selected here?",
      "Which of these is the strongest, and why?",
      "Find more like these, but at night",
      "Order these into a sequence that builds",
    ],
  },
  {
    label: "A spotlighted frame",
    icon: markRaw(FlashlightOutline),
    queries: [
      "Does this one fit here, or does it break the run?",
      "What should come after this photo?",
      "Give me three alternatives for this slot",
      "In the canvas, find something chromatically like this",
    ],
  },
  {
    label: "Reading your own edit",
    icon: markRaw(StarOutline),
    queries: [
      "Of everything on the board, which is weakest?",
      "Am I repeating myself here?",
      "Which two of these are doing the same job?",
      "Does this hold together as a series?",
    ],
  },
]);

// ─── Use cases ─────────────────────────────────────────────
const useCases = ref([
  {
    icon: markRaw(NewspaperOutline),
    title: "Photo essays and documentary stories",
    color: "#8b5cf6",
    text: "Find the opening frame, the turn and the closer, and check the middle is not sagging.",
  },
  {
    icon: markRaw(BookOutline),
    title: "Photo books and zines",
    color: "#f59e0b",
    text: "Lay out spreads as they will be read, and test whether facing pages actually talk to each other.",
  },
  {
    icon: markRaw(EaselOutline),
    title: "Exhibition walls",
    color: "#06b6d4",
    text: "Arrange in rows and clusters exactly as they will hang, gaps and all, before anything is printed.",
  },
  {
    icon: markRaw(TrophyOutline),
    title: "Portfolio and competition edits",
    color: "#22c55e",
    text: "Cut a large body of work down to the frames that earn their place, and defend the order.",
  },
  {
    icon: markRaw(BriefcaseOutline),
    title: "Client moodboards and pitches",
    color: "#ec4899",
    text: "Build a board from your own back catalog to show a direction, instead of borrowing someone else's references.",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Making sense of a shoot",
    color: "#3b82f6",
    text: "Spread a day's take out, group what belongs together, and find out whether there is a series in there at all.",
  },
]);

// ─── FAQ ───────────────────────────────────────────────────
const faqs = ref([
  {
    question: "Is there an app to storyboard my photos with AI?",
    answer:
      "Yes. Photoreka's canvas is an infinite board where you lay your own photographs out and arrange them into a sequence, with an AI chat docked beside it that reads the arrangement. Unlike AI storyboard generators, it never invents an image — every frame it proposes is a real photograph from your own archive.",
  },
  {
    question: "Does it generate images, or use my own photos?",
    answer:
      "Only your own photos. Photoreka is a curation tool, not an image generator. Every photo the assistant surfaces comes from the library you uploaded, which is what makes the result usable as a real edit, portfolio sequence or photo essay rather than a mockup.",
  },
  {
    question: "Does the AI actually understand how my photos are arranged?",
    answer:
      "Yes. The board's geometry travels to the assistant as a grid: which photos are neighbours, what sits above or below what, where the empty slot is, and whether two clusters read as separate groups. That is what lets it answer questions like 'does this fit here', 'what breaks the run', or 'what belongs in the gap' — questions a flat list of photos cannot answer.",
  },
  {
    question: "How do I tell the AI which photos I am asking about?",
    answer:
      "Three nested levels. The whole board is the general context. The focus — the photos under the halo, or the ones you pick by hand — is the working area. The spotlight singles out the specific frames you are asking about. You never name a level: you mark it on the board and the assistant reads the finest one as the subject of your question.",
  },
  {
    question: "Can it find the photo that is missing from my sequence?",
    answer:
      "That is the most common request on the canvas. The assistant reads the photos you have out, works out what the set is doing, and searches your archive for work that would sit well beside them — by overall look, by narrative, by palette or by setting. Photos already on the board are excluded from results, so everything it shows is genuinely new material you can drag onto the canvas.",
  },
  {
    question: "Can the AI arrange the photos for me?",
    answer:
      "It can propose an order and lay it out. When a reply groups photos into a sequence, one click places them on the board in that exact order, as a block you can then rearrange by hand. The canvas stays yours — the assistant proposes, you edit.",
  },
  {
    question:
      "Can I keep the AI strictly inside the photos I already have out?",
    answer:
      "Yes. The Canvas only switch confines every search to the photos placed on the board. With it on, the conversation is about reading your own edit — which frames are weakest, what repeats, how the set holds together — instead of proposing new material.",
  },
  {
    question: "How is this different from the general photo chat?",
    answer:
      "The general assistant knows your catalog. The canvas chat also knows the board in front of you: the arrangement, what you marked, and what you have already placed. That makes questions about sequence, rhythm, neighbours and gaps answerable, and it keeps a separate conversation per board.",
  },
  {
    question: "What can I use a photo storyboard for?",
    answer:
      "Sequencing a photo essay or documentary story, ordering a photo book or zine, planning an exhibition wall, building a portfolio edit, laying out a moodboard for a client, or simply working out whether a shoot holds together as a series.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. The canvas runs in the browser. There is also a demo you can open without registering — a board backed by a real catalog, with the chat live — so you can try the arranging and the sequencing before uploading anything of your own.",
  },
  {
    question: "Is the conversation saved with the board?",
    answer:
      "Yes. Each canvas keeps its own conversation, stored with the board rather than in a general chat history. Reopen the board on any device and the discussion about that particular sequence is still there.",
  },
  {
    question: "What languages does it work in?",
    answer:
      "Write in the language you think in — Spanish, English, French, Portuguese, German, Italian and most major languages are supported, and the assistant answers in the one you used.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "ai_photo_storyboard_page");
  navigateTo("/");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_storyboard_page");
  const appUrl = config.public.appUrl || "https://app.photoreka.com";
  window.open(`${appUrl}/demo/canvas`, "_blank");
};

// La demo comercial corre sobre su propio catálogo (/demo-commercial), no es
// una ruta dentro de /demo. Ver app/pages/commercial_photography.vue.
const goToCommercialDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_storyboard_page", "commercial");
  const appUrl = config.public.appUrl || "https://app.photoreka.com";
  window.open(`${appUrl}/demo-commercial/canvas`, "_blank");
};

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

const goToSignup = () => {
  trackUserAction("open_signup", "ai_photo_storyboard_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "ai_photo_storyboard",
    faq_index: index,
    action: wasOpen ? "close" : "open",
  });
};

// Scroll animations
const setupScrollAnimations = () => {
  const opts = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };
  const watch = (section, flag) => {
    if (!section.value) return;
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) flag.value = true;
      });
    }, opts).observe(section.value);
  };
  watch(heroSection, heroVisible);
  watch(contrastSection, contrastVisible);
  watch(levelsSection, levelsVisible);
  watch(howSection, howVisible);
  watch(featuresSection, featuresVisible);
  watch(criteriaSection, criteriaVisible);
  watch(chatSection, chatVisible);
  watch(examplesSection, examplesVisible);
  watch(useCaseSection, useCaseVisible);
  watch(crossSection, crossVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();

  trackEvent("page_view", {
    page: "ai_photo_storyboard",
    page_title: "AI Photo Storyboard – Photoreka",
  });
});
</script>

<style scoped>
/* ─── Page Container ─────────────────────────────────────── */
.framer-page {
  min-height: 100vh;
  background: var(--premium-bg-primary);
  color: var(--premium-text-primary);
}

/* ─── Navigation ─────────────────────────────────────────── */
.premium-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--premium-bg-nav);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--premium-border);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
}
.nav-brand a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  color: var(--premium-text-primary);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--premium-bg-hover);
}

.back-link {
  font-size: var(--fs-base);
}

/* ─── Hero ───────────────────────────────────────────────── */
.framer-hero {
  position: relative;
  padding: 8rem 2rem 6rem;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-container {
  max-width: 1560px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}

.hero-layout {
  display: grid;
  grid-template-columns: minmax(420px, 1fr) 2.15fr;
  gap: 3rem;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ─── Hero Badge ─────────────────────────────────────────── */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50px;
  font-size: var(--fs-sm);
  font-weight: var(--font-weight-semibold);
  color: #8b5cf6;
  width: fit-content;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-badge.visible {
  opacity: 1;
  transform: translateY(0);
}

.badge-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ─── Hero Title / Subtitle ──────────────────────────────── */
.hero-title {
  font-size: var(--fs-display-promo);
  font-weight: var(--font-weight-black);
  margin: 0;
  line-height: var(--line-height-none);
  letter-spacing: var(--letter-spacing-tighter);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-subtitle {
  max-width: 540px;
  margin: 0;
  font-size: var(--fs-lead);
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.hero-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}

.cta-note {
  font-size: var(--fs-xs);
  color: var(--premium-text-secondary);
  margin-top: -0.5rem;
}

.framer-hero .cta-note {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.6s;
}

/* ─── Hero Visual ────────────────────────────────────────── */
.hero-visual {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  border-radius: 20px;
  overflow: hidden;
}

.hero-visual.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.video-frame {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: var(--premium-bg-card);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--premium-border);
}

.hero-shot {
  width: 100%;
  height: auto;
  display: block;
}

/* ─── Gradient Effects ───────────────────────────────────── */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.18;
  animation: float 25s infinite ease-in-out;
  will-change: transform;
}

.orb-1 {
  width: 700px;
  height: 700px;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  top: -300px;
  right: -200px;
}

.orb-2 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #6366f1, #2563eb);
  bottom: -200px;
  left: -250px;
  animation-delay: -10s;
}

.orb-3 {
  width: 550px;
  height: 550px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -15s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}

.gradient-text-blue {
  background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}

/* ─── Sections (shared) ──────────────────────────────────── */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: var(--fs-h1);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-tight);
}

.section-subtitle {
  font-size: var(--fs-subheading);
  color: var(--premium-text-secondary);
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
  line-height: var(--line-height-loose);
}

/* ─── Contrast Section ───────────────────────────────────── */
.contrast-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}

.contrast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.contrast-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.contrast-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
}

.contrast-card--us {
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.1);
}

.contrast-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--premium-text-secondary);
  margin-bottom: 1.5rem;
}

.contrast-label--us {
  color: #8b5cf6;
}

.contrast-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contrast-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  line-height: var(--line-height-relaxed);
  color: var(--premium-text-secondary);
  font-size: var(--fs-base);
}

.contrast-icon {
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.contrast-icon--no {
  color: #64748b;
}

.contrast-icon--yes {
  color: #22c55e;
}

/* ─── Levels Section ─────────────────────────────────────── */
.levels-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}

.levels-badge {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #3b82f6;
  margin-bottom: 1.5rem;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.levels-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.level-card {
  position: relative;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 1.75rem;
  transition: all 0.3s ease;
}

.level-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 1.75rem;
  right: 1.75rem;
  height: 2px;
  border-radius: 0 0 2px 2px;
  background: var(--level-color);
  opacity: 0.8;
}

.level-card:hover {
  transform: translateY(-4px);
  border-color: var(--level-color);
}

.level-head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.level-badge {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: var(--level-color);
  background: color-mix(in srgb, var(--level-color) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--level-color) 30%, transparent);
}

.level-index {
  display: block;
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--premium-text-secondary);
  font-weight: var(--font-weight-semibold);
}

.level-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.level-text {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
  margin: 0 0 1rem;
}

.level-how {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  font-size: var(--fs-sm);
  color: var(--premium-text-primary);
  margin: 0 0 1rem;
  line-height: var(--line-height-relaxed);
}

.level-how-icon {
  flex-shrink: 0;
  margin-top: 0.25rem;
  color: var(--level-color);
}

.level-example {
  font-size: var(--fs-sm);
  font-style: italic;
  color: var(--premium-text-secondary);
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  border-left: 2px solid var(--level-color);
  background: var(--premium-bg-secondary);
}

/* Full width of the section container — deliberately wider than the level cards
   above it, so the shot reads as the three levels seen on a real board. */
.levels-figure {
  width: 100%;
  margin: 3rem 0 0;
  border-radius: 20px;
  overflow: hidden;
  background: var(--premium-bg-card);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--premium-border);
  opacity: 0;
  transform: translateY(30px) scale(0.98);
  transition: all 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.25s;
}

.levels-figure.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.levels-shot {
  width: 100%;
  height: auto;
  display: block;
}

.levels-footnote {
  max-width: 720px;
  margin: 2.5rem auto 0;
  text-align: center;
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.levels-footnote.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── How It Works ───────────────────────────────────────── */
.how-section {
  position: relative;
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
  overflow: hidden;
}

.steps-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.steps-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.step-card {
  display: flex;
  gap: 2rem;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateX(6px);
  border-color: rgba(139, 92, 246, 0.35);
}

.step-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  font-size: var(--fs-3xl);
  font-weight: var(--font-weight-bold);
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.step-description {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
}

/* ─── Features Grid ──────────────────────────────────────── */
.features-section {
  padding: 6rem 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.12);
}

.feature-icon {
  margin-bottom: 1.25rem;
}

.feature-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.6rem;
}

.feature-description {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
}

/* ─── Criteria Section ───────────────────────────────────── */
.criteria-section {
  position: relative;
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
  overflow: hidden;
}

.criteria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.criteria-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.criterion-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 14px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.criterion-card:hover {
  border-color: var(--criterion-color);
  transform: translateY(-3px);
}

.criterion-icon {
  color: var(--criterion-color);
  margin-bottom: 0.75rem;
}

.criterion-title {
  font-size: var(--fs-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 0.4rem;
}

.criterion-text {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--fs-sm);
  margin: 0;
}

/* ─── Chat Section ───────────────────────────────────────── */
.chat-section {
  padding: 6rem 2rem;
}

.chat-badge {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  color: #8b5cf6;
  margin-bottom: 1.5rem;
}

.chat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.chat-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 1.75rem;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.chat-card:hover {
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-4px);
}

.chat-card-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.chat-icon {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--premium-bg-secondary);
  border: 1px solid var(--premium-border);
}

.chat-title {
  font-size: var(--fs-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.chat-text {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
  margin: 0;
}

/* ─── Examples Section ───────────────────────────────────── */
.examples-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.examples-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.example-group {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.example-group:hover {
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-3px);
}

.example-group-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  color: #8b5cf6;
  margin-bottom: 1rem;
}

.example-queries {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.query-chip {
  display: inline-block;
  font-size: var(--fs-sm);
  color: var(--premium-text-secondary);
  line-height: var(--line-height-relaxed);
  font-style: italic;
}

/* ─── Use Cases ──────────────────────────────────────────── */
.usecase-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}

.usecase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.usecase-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.usecase-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 14px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.usecase-card:hover {
  transform: translateY(-3px);
  border-color: rgba(139, 92, 246, 0.35);
}

.usecase-icon {
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.usecase-title {
  font-size: var(--fs-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 0.35rem;
}

.usecase-text {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--fs-sm);
  margin: 0;
}

/* ─── Cross-promo Section ────────────────────────────────── */
.cross-section {
  position: relative;
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
  overflow: hidden;
}

.cross-badge {
  background: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.3);
  color: #2563eb;
  margin-bottom: 1.5rem;
}

.cross-title {
  font-size: var(--fs-h1) !important;
}

.cross-features {
  list-style: none;
  padding: 0;
  margin: 2rem auto 0;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
}

.cross-features.visible {
  opacity: 1;
  transform: translateY(0);
}

.cross-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--premium-text-primary);
  font-size: var(--fs-base);
  text-align: left;
}

.cross-features li a {
  color: #8b5cf6;
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
}

.cross-features li a:hover {
  text-decoration: underline;
}

.feature-icon-wrapper {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 8px;
}

/* ─── FAQ Section ────────────────────────────────────────── */
.faq-section {
  padding: 6rem 2rem;
}

.faqs-container {
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.faqs-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.faq-item {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover,
.faq-item.active {
  border-color: #8b5cf6;
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--premium-text-primary);
  font-size: var(--fs-lg);
  font-weight: var(--font-weight-semibold);
  text-align: left;
  gap: 1rem;
}

.faq-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: var(--premium-text-secondary);
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── CTA Section ────────────────────────────────────────── */
.cta-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.cta-title {
  font-size: var(--fs-h1);
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-tight);
}

.cta-description {
  font-size: var(--fs-xl);
  color: var(--premium-text-secondary);
  margin-bottom: 2rem;
  line-height: var(--line-height-loose);
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.cta-extra {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--premium-border);
  font-size: var(--fs-base);
  color: var(--premium-text-secondary);
}

.cta-link {
  color: #8b5cf6;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-link:hover {
  text-decoration: underline;
}

/* ─── Responsive ─────────────────────────────────────────── */
@media (max-width: 968px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-content {
    text-align: center;
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-subtitle {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .framer-hero {
    padding: 6rem 1rem 3rem;
    min-height: auto;
  }

  .hero-title {
    font-size: var(--fs-h1);
  }

  .features-grid,
  .examples-grid,
  .levels-grid,
  .chat-grid,
  .criteria-grid,
  .usecase-grid,
  .contrast-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .step-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cross-features li {
    font-size: var(--fs-sm);
  }
}
</style>
