<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_photo_storyboard_page" :links="navLinks" />

        <PageHero eyebrow="Infinite Canvas · Sequence · AI Chat on the board">
          <template #title>
            Storyboard your photos with
            <em class="lx-accent">an AI that sees your board</em>
          </template>
          <p>
            Lay your own photographs out on an infinite canvas and arrange them
            into a sequence. A chat docked to the board reads how they sit,
            where the hole is, and tells you what is missing using
            <NuxtLink to="/ai_photo_search">your own archive</NuxtLink>.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #note>
            <span>Shooting commercial work?</span>
            <button class="lx-link" @click="goToCommercialDemo">
              Try the commercial demo
              <n-icon size="15"><ArrowForwardOutline /></n-icon>
            </button>
            <span class="lx-status sb-hero-status">
              No credit card required · The demo needs no account
            </span>
          </template>
          <!-- Placeholder for now — swap `heroShot` below for the final
               canvas + chat capture when it is ready. -->
          <template #visual>
            <ShotFrame
              :src="heroShot"
              alt="Photos arranged into a storyboard on Photoreka's infinite canvas, with the AI chat panel proposing a narrative sequence beside it"
              label="Photoreka — Canvas"
              ratio="auto"
              loading="eager"
            />
          </template>
        </PageHero>

        <!-- Not a generator -->
        <section id="not-a-generator" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Not a generator" align="center">
              <template #title>
                Every other AI storyboard tool draws the frames.
                <em class="lx-accent">This one finds yours.</em>
              </template>
              <p>
                A storyboard made of invented images is a mockup. A storyboard
                made of your own photographs is an edit — the thing you can
                actually print, hang, publish or send.
              </p>
            </SectionIntro>

            <div class="sb-compare">
              <div v-reveal class="lx-card sb-compare__card is-old">
                <h3 class="sb-compare__title">
                  <n-icon size="20"><ColorWandOutline /></n-icon>
                  AI storyboard generators
                </h3>
                <ul class="lx-list">
                  <li v-for="item in generatorTraits" :key="item">
                    <span class="sb-cross" aria-hidden="true" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div v-reveal="120" class="lx-card sb-compare__card is-new">
                <div class="sb-compare__glow" aria-hidden="true" />
                <h3 class="sb-compare__title">
                  <n-icon size="20"><ImagesOutline /></n-icon>
                  Photoreka Canvas
                </h3>
                <ul class="lx-list">
                  <li v-for="item in photorekaTraits" :key="item">
                    <span class="lx-tick" aria-hidden="true" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- The three levels, with the questions you ask at each one -->
        <section id="levels" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="You point, it understands">
              <template #title>
                You never explain
                <em class="lx-accent">which photos you mean</em>
              </template>
              <p>
                On a board full of pictures, "does this one fit here?" is
                ambiguous — unless the assistant can see what you marked. Three
                nested levels turn a gesture on the canvas into the subject of
                your question.
              </p>
            </SectionIntro>

            <div class="sb-levels">
              <div v-reveal class="sb-levels__side">
                <div class="lx-tabs" role="tablist" aria-label="Levels">
                  <button
                    v-for="(tab, i) in levelTabs"
                    :id="`sb-tab-${i}`"
                    :key="tab.label"
                    type="button"
                    role="tab"
                    class="lx-tab"
                    :class="{ 'is-active': activeLevel === i }"
                    :aria-selected="activeLevel === i"
                    :aria-controls="`sb-panel-${i}`"
                    @click="activeLevel = i"
                  >
                    <n-icon size="16"><component :is="tab.icon" /></n-icon>
                    {{ tab.title }}
                  </button>
                </div>

                <!-- Every panel stays in the DOM so all the copy is indexable. -->
                <div
                  v-for="(tab, i) in levelTabs"
                  v-show="activeLevel === i"
                  :id="`sb-panel-${i}`"
                  :key="tab.label"
                  class="lx-panel"
                  role="tabpanel"
                  :aria-labelledby="`sb-tab-${i}`"
                >
                  <template v-if="tab.level">
                    <p class="sb-panel__kicker">{{ tab.level.kicker }}</p>
                    <p class="sb-panel__text">{{ tab.level.text }}</p>
                    <p class="sb-level-how">
                      <n-icon size="14"><HandLeftOutline /></n-icon>
                      <span>{{ tab.level.how }}</span>
                    </p>
                    <p class="sb-level-example">“{{ tab.level.example }}”</p>
                  </template>

                  <div class="sb-panel__prompts">
                    <h3 class="sb-prompts-title">
                      What you actually ask
                      <em class="lx-accent">a board like this</em>
                    </h3>
                    <p class="sb-prompts-lead">
                      The same question means something different depending on
                      what you marked. Write in whatever language you think in —
                      the assistant answers in it.
                    </p>
                    <p class="sb-prompts-label">{{ tab.label }}</p>
                    <ul class="sb-queries">
                      <li v-for="query in tab.queries" :key="query">
                        “{{ query }}”
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Placeholder until the real capture is ready — swap
                   `levelsShot` below and this picks it up. -->
              <div
                v-reveal="{ variant: 'scale', delay: 120 }"
                class="sb-levels__shot"
              >
                <ShotFrame
                  :src="levelsShot"
                  alt="The three levels of context on Photoreka's canvas: the whole board, the focus area marked out with the halo, and a single spotlighted photo"
                  label="Photoreka — Canvas"
                  ratio="auto"
                />
                <p class="sb-levels-footnote">
                  The finest level you marked is the subject of the question.
                  Everything wider than it is context — which is exactly how you
                  already think when you stand in front of a wall of prints.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- How it works -->
        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How to storyboard your photos
                <em class="lx-accent">with AI</em>
              </template>
              <p>
                Five steps from a pile of frames to an ordered sequence you can
                defend.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <!-- Canvas features -->
        <section id="canvas" class="lx-section">
          <div class="lx-container">
            <div class="sb-canvas-head">
              <SectionIntro eyebrow="The canvas" flush>
                <template #title>
                  Everything the canvas does
                  <em class="lx-accent">on its own</em>
                </template>
                <p>
                  Before a single word is typed, the board is already a proper
                  editing table: infinite space, real drag-and-drop, and your
                  archive one gesture away from any photo on it.
                </p>
              </SectionIntro>
              <div
                v-reveal="{ variant: 'scale', delay: 120 }"
                v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
              >
                <!-- Each frame only plays while visible, so the hidden one
                     never starts. -->
                <ShotFrame
                  class="lx-zoom sb-canvas-video--desktop"
                  video="/videos/canvas_desktop.mp4"
                  alt="Photoreka infinite canvas clustering photos automatically"
                  label="Photoreka — Canvas"
                  ratio="16 / 9"
                />
                <ShotFrame
                  class="sb-canvas-video--mobile"
                  video="/videos/canvas_mobile.mp4"
                  alt="Photoreka infinite canvas clustering photos automatically"
                  label="Photoreka — Canvas"
                  ratio="4 / 5"
                />
              </div>
            </div>

            <!-- Plain columns, no cards: the page keeps its one card grid
                 for the chat. -->
            <ul class="lx-columns" style="--lx-cols: 4">
              <li
                v-for="(item, i) in canvasFeatures"
                :key="item.title"
                v-reveal="(i % 4) * 80"
                class="lx-column"
              >
                <span class="lx-icon-tile" :style="{ color: item.color }">
                  <n-icon size="18"><component :is="item.icon" /></n-icon>
                </span>
                <h3 class="lx-column__title">{{ item.title }}</h3>
                <p class="lx-column__text">{{ item.description }}</p>
              </li>
            </ul>
          </div>
        </section>

        <!-- Similarity criteria -->
        <section id="similarity" class="lx-section">
          <div class="lx-container sb-similarity">
            <SectionIntro
              eyebrow="Similarity"
              flush
              class="sb-similarity__intro"
            >
              <template #title>
                Pick any photo on the board and ask for
                <em class="lx-accent">more like it — on your axis</em>
              </template>
              <p>
                "Similar" is not one thing. A frame can rhyme with another by
                colour and clash with it narratively. Choose which kind of
                resemblance you are extending, and the strip under the canvas
                fills with candidates you drag straight up onto the board.
              </p>
            </SectionIntro>
            <ul v-reveal="120" class="lx-list lx-list--rich">
              <li v-for="item in criteriaItems" :key="item.title">
                <span class="lx-icon-tile" :style="{ color: item.color }">
                  <n-icon size="18"><component :is="item.icon" /></n-icon>
                </span>
                <span class="lx-list__copy">
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.description }}</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Chat superpowers -->
        <section id="chat" class="lx-section">
          <div class="lx-container">
            <SectionIntro
              eyebrow="The canvas, with the chat open"
              align="center"
            >
              <template #title>
                What changes when the assistant
                <em class="lx-accent">is looking at the board</em>
              </template>
              <p>
                A general photo chat knows your catalog. This one also knows the
                arrangement in front of you — and that turns questions about
                sequence, rhythm and gaps into questions it can actually answer.
              </p>
            </SectionIntro>
            <PageGrid :items="chatPowers" :columns="2" />
          </div>
        </section>

        <!-- Use cases -->
        <section id="use-cases" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Use cases" align="center">
              <template #title>
                What photographers
                <em class="lx-accent">storyboard here</em>
              </template>
              <p>Any body of work whose order carries meaning.</p>
            </SectionIntro>
            <ul class="lx-columns">
              <li
                v-for="(item, i) in useCaseItems"
                :key="item.title"
                v-reveal="(i % 3) * 80"
                class="lx-column"
              >
                <span class="lx-icon-tile" :style="{ color: item.color }">
                  <n-icon size="18"><component :is="item.icon" /></n-icon>
                </span>
                <h3 class="lx-column__title">{{ item.title }}</h3>
                <p class="lx-column__text">{{ item.description }}</p>
              </li>
            </ul>
          </div>
        </section>

        <!-- Cross-promo -->
        <section id="more" class="lx-section">
          <div class="lx-container lx-container--narrow">
            <SectionIntro eyebrow="Same catalog, more ways in" align="center">
              <template #title>
                The board sits on top of
                <em class="lx-accent">the rest of Photoreka</em>
              </template>
              <p>
                Every photo it offers has already been searched, scored and
                understood by the same engines that power the rest of the app.
              </p>
            </SectionIntro>

            <ul v-reveal="120" class="lx-list sb-cross-list">
              <li>
                <span class="sb-cross-list__icon" style="color: #8b5cf6">
                  <n-icon size="18"><ChatbubblesOutline /></n-icon>
                </span>
                <span>
                  <NuxtLink to="/photo_chat" class="lx-inline-link"
                    >AI Photo Assistant</NuxtLink
                  >
                  — the same conversation without a board: critique your
                  portfolio, track how your work has changed, ask anything about
                  your archive.
                </span>
              </li>
              <li>
                <span class="sb-cross-list__icon" style="color: #06b6d4">
                  <n-icon size="18"><SearchOutline /></n-icon>
                </span>
                <span>
                  <NuxtLink to="/ai_photo_search" class="lx-inline-link"
                    >AI Photo Search</NuxtLink
                  >
                  — describe a frame in plain language and find it in seconds,
                  no tagging required. It is what fills the board.
                </span>
              </li>
              <li>
                <span class="sb-cross-list__icon" style="color: #22c55e">
                  <n-icon size="18"><TrophyOutline /></n-icon>
                </span>
                <span>
                  <NuxtLink
                    to="/photography_portfolio_builder"
                    class="lx-inline-link"
                    >AI Portfolio Builder</NuxtLink
                  >
                  — when a sequence graduates into a finished edit, it builds
                  and orders the full portfolio for you.
                </span>
              </li>
              <li>
                <span class="sb-cross-list__icon" style="color: #f59e0b">
                  <n-icon size="18"><BarChartOutline /></n-icon>
                </span>
                <span>
                  <NuxtLink to="/photo_scoring" class="lx-inline-link"
                    >AI Photo Scoring</NuxtLink
                  >
                  — the aesthetic, narrative and originality scores behind
                  "which of these is strongest".
                </span>
              </li>
            </ul>
          </div>
        </section>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>
            What photographers ask before storyboarding their own photos with AI
          </p>
        </FaqSection>

        <PageCta>
          <template #title>
            Put your photos on a board
            <em class="lx-accent">and start</em>
          </template>
          <p>
            Arrange, question, replace, reorder. The archive is yours and so is
            the edit — the assistant just never lets you forget what you already
            shot.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Shooting commercial work?
            <a @click="goToCommercialDemo">Try the commercial demo</a>
            — the same board on a product and packshot catalog.
          </template>
        </PageCta>
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
  ArrowForwardOutline,
  PlayCircleOutline,
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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

// Hero screenshot. Placeholder until the final canvas + chat capture is dropped in;
// swap this one path and the hero picks it up.
const heroShot = "/canvas/hero_3.png";

// Full-width shot under the three levels. Placeholder for now — a capture showing
// the board, the halo and a spotlighted photo at once is what belongs here.
const levelsShot = "/canvas/levels.png";

const showRequestDialog = ref(false);

const navLinks = [
  { label: "Levels", target: "levels" },
  { label: "How it works", target: "how-it-works" },
  { label: "Canvas", target: "canvas" },
  { label: "Chat", target: "chat" },
  { label: "Use cases", target: "use-cases" },
  { label: "FAQ", target: "faq" },
];

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

// The card panels read { icon, kicker, title, description, color }.
const levelItems = computed(() =>
  levels.value.map((level, i) => ({
    ...level,
    kicker: `Level ${i + 1}`,
    description: level.text,
  })),
);

const criteriaItems = computed(() =>
  criteria.value.map((c) => ({ ...c, description: c.text })),
);

// One tab per level, plus "Reading your own edit", which only has prompts.
const levelTabs = computed(() =>
  promptExamples.value.map((group, i) => {
    const level = levelItems.value[i];
    return {
      label: group.label,
      title: level ? level.title : group.label,
      icon: level ? level.icon : group.icon,
      queries: group.queries,
      level: level || null,
    };
  }),
);

const activeLevel = ref(0);

const useCaseItems = computed(() =>
  useCases.value.map((u) => ({ ...u, description: u.text })),
);

// Runtime config
const config = useRuntimeConfig();

// Navigation
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

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "ai_photo_storyboard",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", {
    page: "ai_photo_storyboard",
    page_title: "AI Photo Storyboard – Photoreka",
  });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
.sb-canvas-video--mobile {
  display: none;
}

@media (max-width: 760px) {
  .sb-canvas-video--desktop {
    display: none;
  }

  .sb-canvas-video--mobile {
    display: block;
  }
}

/* ── Generators vs Photoreka ───────────────────────────────── */
.sb-compare {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 28px);
  max-width: 1080px;
  margin-inline: auto;
}

.sb-compare__card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  align-content: start;
  gap: 1.5rem;
  padding: clamp(28px, 3.5vw, 48px);
}

.sb-compare__card.is-old {
  background: var(--lx-bg-2);
}

.sb-compare__card.is-new {
  box-shadow: var(--lx-shadow-md), var(--lx-highlight);
}

.sb-compare__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    70% 60% at 100% 0%,
    var(--lx-glow-1),
    transparent 70%
  );
}

.sb-compare__title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.6rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.is-old .sb-compare__title {
  color: var(--lx-text-2);
}

.is-old .sb-compare__title .n-icon {
  color: var(--lx-text-3);
}

.is-new .sb-compare__title .n-icon {
  color: var(--lx-accent);
}

.is-old .lx-list > li {
  color: var(--lx-text-2);
}

/* Muted counterpart of .lx-tick for the generators column. */
.sb-cross {
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid var(--lx-line-2);
}

.sb-cross::before,
.sb-cross::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 1.5px;
  border-radius: 1px;
  background: var(--lx-text-3);
  transform: translate(-50%, -50%) rotate(45deg);
}

.sb-cross::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* ── Hero note ─────────────────────────────────────────────── */
.sb-hero-status {
  flex-basis: 100%;
  margin-top: 0.35rem;
}

/* ── Levels ────────────────────────────────────────────────── */
.sb-level-how {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: var(--lx-fs-sm);
  line-height: 1.6;
  color: var(--lx-text-3);
}

.sb-level-how .n-icon {
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.sb-level-example {
  margin-top: auto;
  padding-top: 1.1rem;
  border-top: 1px solid var(--lx-line);
  font-family: var(--lx-font-display);
  font-style: italic;
  font-size: 1.08rem;
  line-height: 1.45;
  color: var(--lx-text);
}

.sb-levels-footnote {
  max-width: 44em;
  margin-top: clamp(20px, 2.4vw, 28px);
  font-size: var(--lx-fs-sm);
  line-height: 1.7;
  color: var(--lx-text-2);
}

/* ── Levels: tabs on the left, capture on the right ────────── */
.sb-levels {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(32px, 4.5vw, 72px);
  align-items: start;
}

.sb-levels__shot {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 24px);
}

.sb-panel__kicker {
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.sb-panel__text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--lx-text);
}

.sb-panel__prompts {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.2rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--lx-line);
}

.sb-prompts-title {
  font-family: var(--lx-font-display);
  font-size: 1.45rem;
  font-weight: 360;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.sb-prompts-lead {
  font-size: var(--lx-fs-sm);
  line-height: 1.7;
  color: var(--lx-text-2);
}

.sb-prompts-label {
  margin-top: 0.3rem;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

/* ── Canvas: intro beside the video ────────────────────────── */
.sb-canvas-head {
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
  gap: clamp(32px, 4.5vw, 72px);
  align-items: center;
  margin-bottom: clamp(56px, 7vw, 96px);
}

/* ── Similarity: the list on the left, the intro on the right ─ */
.sb-similarity {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 5vw, 88px);
  align-items: center;
}

.sb-similarity__intro {
  order: 2;
}

@media (max-width: 1023px) {
  /* minmax(0, …): the scrolling tab row must not widen the column. */
  .sb-levels,
  .sb-canvas-head,
  .sb-similarity {
    grid-template-columns: minmax(0, 1fr);
  }

  /* On phones and tablets the capture comes first. */
  .sb-levels__shot {
    position: relative;
    top: auto;
    order: -1;
  }

  .sb-similarity__intro {
    order: -1;
  }
}

/* ── Prompts ───────────────────────────────────────────────── */
.sb-queries {
  display: grid;
  gap: 0.55rem;
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
}

.sb-queries li {
  padding: 0.55rem 0.85rem;
  border-radius: var(--lx-radius-sm);
  background: var(--lx-surface-2);
  border: 1px solid var(--lx-line);
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 340;
  font-size: 1.02rem;
  line-height: 1.4;
  color: var(--lx-text-2);
}

/* ── Cross-promo ───────────────────────────────────────────── */
.sb-cross-list {
  max-width: 820px;
  margin-inline: auto;
}

.sb-cross-list > li {
  align-items: flex-start;
  padding: 1.15rem 0;
  line-height: 1.6;
  color: var(--lx-text-2);
}

.sb-cross-list__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}

.sb-cross-list .lx-inline-link {
  font-weight: 600;
}

@media (max-width: 760px) {
  .sb-compare {
    grid-template-columns: 1fr;
  }
}
</style>
