<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="portfolio_builder_page" :links="navLinks" />

        <PageHero eyebrow="AI Photography Portfolio Builder">
          <template #title>
            Your best portfolio,
            <em class="lx-accent">picked by AI</em>
          </template>
          <p>
            Choosing 20 photos out of thousands for a gallery, competition, or
            book takes days. Photoreka's portfolio builder combines
            <strong
              >8-dimension artistic scoring, five coherence modes, and
              intelligent sequencing</strong
            >
            to deliver a curated, ordered selection you can actually present.
          </p>
          <p>
            Set a target size (10–40 photos), describe the vibe you're after,
            pick a coherence mode, and let the builder score, select, and
            arrange your strongest work.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #visual>
            <!-- Captures have mixed shapes, so the frame is fixed and each
                 one is shown whole inside it. -->
            <ShotFrame label="Photoreka — Portfolio Builder" ratio="16 / 10.4">
              <FeatureCarousel :images="slideshowImages" fit="contain" />
            </ShotFrame>
          </template>
        </PageHero>

        <section id="use-cases" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Use cases" align="center">
              <template #title>
                One AI portfolio generator,
                <em class="lx-accent">many outputs</em>
              </template>
              <p>
                Whether you're preparing for a gallery, a competition, a client
                delivery, or a photobook—the same intelligent pipeline adapts to
                your goal and automatically selects your strongest photos.
              </p>
            </SectionIntro>
            <PageGrid :items="usecases" :columns="4" />
          </div>
        </section>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How portfolio building
                <em class="lx-accent">works</em>
              </template>
              <p>
                A guided wizard turns a scored catalog into a curated, sequenced
                portfolio in five short steps.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Built for serious photographic
                <em class="lx-accent">curation &amp; selection</em>
              </template>
              <p>
                Not a template gallery. An AI photo selection engine that
                understands quality, coherence, and narrative—and lets you stay
                in control.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <MediaSplitSection
          id="atlas"
          eyebrow="3D Atlas"
          video="/videos/atlas_1.mp4"
          poster="/home/video_lr_poster.jpg"
          alt="Photoreka 3D Atlas arranging photos by visual similarity"
          label="Photoreka — 3D Atlas"
          reverse
        >
          <template #title>
            From portfolio curation to
            <em class="lx-accent">3D exploration</em>
          </template>
          <p>
            Once your portfolio starts taking shape, step into the 3D Atlas to
            zoom out and understand the larger body of work it comes from.
            Photoreka arranges your images in space by visual similarity,
            revealing clusters, repetitions, transitions, and unexpected
            relationships across your archive. It is the ideal companion for
            refining selections, discovering adjacent images, and seeing your
            photography with more clarity, coherence, and perspective.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToAtlas">Open 3D Atlas</LxButton>
            <span class="lx-status">Launch in Photoreka web platform</span>
          </template>
        </MediaSplitSection>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about AI portfolio building</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Your next portfolio is
            <em class="lx-accent">already in your archive.</em>
          </template>
          <p>
            Stop second-guessing which photos belong. Let Photoreka score,
            select, and sequence your strongest work into a portfolio you're
            proud of.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Want to understand your scoring in detail?
            <a @click="goToScoring">See Photo Scoring</a>
            <span class="lx-sep" aria-hidden="true">·</span>
            <a @click="goToChat">Try the AI Assistant</a>
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
  LayersOutline,
  ImagesOutline,
  BarChartOutline,
  ChatbubblesOutline,
  SearchOutline,
  EyeOutline,
  BookOutline,
  RibbonOutline,
  BriefcaseOutline,
} from "@vicons/ionicons5";
import Trophy20Regular from "@vicons/fluent/es/Trophy20Regular.js";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("photography_portfolio_builder");

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

const showRequestDialog = ref(false);

const navLinks = [
  { label: "Use cases", target: "use-cases" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "3D Atlas", target: "atlas" },
  { label: "FAQ", target: "faq" },
];

// Hero slideshow with portfolio builder product screenshots.
const slideshowImages = [
  {
    src: "/portfolio_builder/0.png",
    alt: "Portfolio builder interface - step 0",
  },
  {
    src: "/portfolio_builder/1.png",
    alt: "Portfolio builder interface - step 1",
  },
  {
    src: "/portfolio_builder/2.png",
    alt: "Portfolio builder interface - step 2",
  },
  {
    src: "/portfolio_builder/3.png",
    alt: "Portfolio builder interface - step 3",
  },
  {
    src: "/portfolio_builder/4.png",
    alt: "Portfolio builder interface - step 4",
  },
  {
    src: "/portfolio_builder/5.png",
    alt: "Portfolio builder interface - step 5",
  },
];

// Use cases
const usecases = [
  {
    icon: markRaw(ImagesOutline),
    title: "Gallery Exhibition",
    description:
      "Curate 20–40 photos that share a visual language. Use the Visual or Chromatic coherence mode to ensure the selection hangs together on a wall.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(RibbonOutline),
    title: "Competition Submission",
    description:
      "Surface your strongest 10–15 images ranked across aesthetics, composition, originality and message. Tune the weights to match the judging criteria.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(BriefcaseOutline),
    title: "Client Delivery",
    description:
      "Distill a shoot into a tight edit. Filter by date range or collection, score across quality dimensions, and deliver a sequenced selection — not a raw dump.",
    color: "#2563eb",
  },
  {
    icon: markRaw(BookOutline),
    title: "Photobook Layout",
    description:
      "Use Narrative coherence and AI sequencing to build arcs with pacing, tonal transitions, and balanced orientations across spreads.",
    color: "#22c55e",
  },
];

// How it works steps — mirrors the real 6-step wizard, condensed for the landing
const steps = [
  {
    title: "Name it and describe the vibe",
    description:
      'Give your portfolio a name and, optionally, a theme in plain language — e.g. "European cities at night, moody urban vibes". The theme acts as a soft bias during curation, not a hard filter.',
  },
  {
    title: "Pick a size and your artistic priorities",
    description:
      'Choose a target between 10 and 40 photos. Then either describe your style ("strong storytelling and humor, cinematic light") and let the AI parse it into weights, or tune the 8 artistic dimensions manually with genre presets (Street, Documentary, Artistic…).',
  },
  {
    title: "Filter and choose a coherence mode",
    description:
      "Narrow the candidate pool by visual aspects (genre, framing, depth of field, lighting…), date range or collection. Then select how the portfolio should hold together: Visual, Chromatic, Narrative, Heterogeneous or Free.",
  },
  {
    title: "Let the AI score, select and sequence",
    description:
      "The engine builds a ranked candidate pool, evaluates photos in context with a vision LLM, refines the set to remove redundancies, and — if enabled — arranges the final sequence with attention to visual flow and orientation balance.",
  },
  {
    title: "Review, reorder, refine",
    description:
      "Drag photos to reorder, remove the ones that don't belong (with undo), or pull in additional shots from your catalog. Adjust columns and gap, save the layout, or start a manual portfolio from scratch at any time.",
  },
];

// Features — reflect actual unique capabilities of the builder
const features = [
  {
    icon: markRaw(Trophy20Regular),
    title: "8-Dimension Artistic Scoring",
    description:
      "Every analyzed photo is scored across aesthetic quality, composition, storytelling, originality, message, humor, visual games and candidness. Emphasize the axes that matter for this portfolio.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Five Coherence Modes",
    description:
      "Visual (similar style), Chromatic (shared palette), Narrative (related situations and emotional tone), Heterogeneous (maximize diversity) or Free (pure quality). Same catalog, five very different portfolios.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(ChatbubblesOutline),
    title: "Describe Your Style in Plain Language",
    description:
      "Skip the sliders if you want. Describe the mood and intent — the builder parses your text into emphasize/deemphasize sets and shows a live preview of the resulting weight vector before you commit.",
    color: "#2563eb",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Intelligent Sequencing",
    description:
      "Photos aren't listed by date. A greedy algorithm orders them maximizing embedding dissimilarity between neighbours, spreading orientations so verticals and horizontals alternate naturally across the sequence.",
    color: "#22c55e",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Precise Visual Filters",
    description:
      "Narrow the candidate pool by genre, framing, depth of field, lighting scheme, perspective, stylistic traits, date range or collection. Fully optional — combine any subset of filters.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Similarity Gating & Refinement",
    description:
      "The engine rejects near-duplicates using perceptual hashing and CLIP similarity, then iteratively refines the pre-selection with the vision LLM to trim the weakest or most redundant shots before sequencing.",
    color: "#ec4899",
  },
];

// FAQs — updated to match real behaviour and constraints
const faqs = [
  {
    question: "How many photos can a portfolio have?",
    answer:
      "Between 10 and 40 photos, in increments of 5. The builder over-generates by ~35% during evaluation, then trims the set down to the exact target size you chose.",
  },
  {
    question: "What do the five coherence modes actually do?",
    answer:
      "Visual favours photos with similar style and composition using CLIP embeddings. Chromatic groups by color palette and temperature. Narrative looks for related situations and emotional tone. Heterogeneous intentionally maximizes diversity. Free applies no coherence constraint and selects purely on quality.",
  },
  {
    question: "Do I need to analyze my catalog first?",
    answer:
      "Yes. The builder only considers photos that have been processed by Photoreka's analyzer (artistic scores, embeddings and perceptual hashes). At least ~80% of the pool used must be analyzed for a build to be eligible.",
  },
  {
    question: "Can I control the ordering of photos?",
    answer:
      "Sequencing is optional. You can leave the AI-generated order, disable sequencing entirely, or — after the build completes — drag-and-drop photos to reorder them, remove any that don't belong (with undo) and save the final layout.",
  },
  {
    question: "Can I build a portfolio manually?",
    answer:
      "Yes. Alongside the AI-driven flow there is a Manual mode: create an empty portfolio, then add or remove photos from your catalog by hand. No scoring, no credits — just a curated bucket you control end to end.",
  },
  {
    question: "Does it cost credits?",
    answer:
      "Yes. Cost scales with target size, coherence mode and whether LLM-based sequencing is used. The wizard shows a live, backend-authoritative credit estimate before you start the build. Manual portfolios are free.",
  },
  {
    question: "Is this a portfolio website builder?",
    answer:
      "No — Photoreka is the curation engine, not the website. It selects and sequences your photos. You can then take the resulting set to any portfolio platform, print service, competition submission or photobook layout tool.",
  },
];

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToDemo = () => {
  trackUserAction("navigate_to_demo", "portfolio_builder_page");
  window.open("https://app.photoreka.com/demo/portfolios", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "portfolio_builder_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "portfolio_builder_page");
  const atlasUrl = `${config.public.appUrl}/demo/atlas?mode=3d`;
  window.open(atlasUrl, "_blank");
};

const goToScoring = () => {
  trackUserAction("navigate_to_scoring", "portfolio_builder_page");
  navigateTo("/photo_scoring");
};

const goToChat = () => {
  trackUserAction("navigate_to_chat", "portfolio_builder_page");
  navigateTo("/photo_chat");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "photography_portfolio_builder",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", { page: "photography_portfolio_builder" });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>
