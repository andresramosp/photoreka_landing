<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="photo_scoring_page" :links="navLinks" />

        <PageHero eyebrow="AI Photo Scoring & Quality Ranking">
          <template #title>
            Score your entire catalog,
            <em class="lx-accent">surface your best work</em>
          </template>
          <p>
            Your archive has thousands of images—your portfolio needs twenty.
            Photoreka scores every photo in your catalog across
            <strong
              >aesthetics, composition, narrative strength, originality, visual
              wit</strong
            >, and more—giving you an objective lens on your own work.
          </p>
          <p>
            For commercial work—product, stock, or fashion—two extra dimensions
            activate: <strong>subject clarity</strong> and
            <strong>commercial intent</strong>.
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
          </template>
          <template #visual>
            <ShotFrame label="Photoreka — Scores" ratio="16 / 11">
              <FeatureCarousel :images="slideshowImages" fit="contain" />
            </ShotFrame>
          </template>
        </PageHero>

        <section id="dimensions" class="lx-section">
          <div class="lx-container sc-dims">
            <!-- The intro and the capture stay pinned while the list is read. -->
            <div class="sc-dims__side">
              <SectionIntro eyebrow="Scoring dimensions" flush>
                <template #title>
                  9+ AI photo
                  <em class="lx-accent">scoring dimensions</em>
                </template>
                <p>
                  Each photo receives a detailed quality profile across multiple
                  independent criteria—so you can rank and filter by exactly
                  what matters for your project. Commercial mode activates two
                  additional product-, stock-, and fashion-specific scores.
                </p>
              </SectionIntro>
              <div v-reveal="{ variant: 'scale', delay: 120 }">
                <ShotFrame
                  src="/ai_photo_scoring/3.png"
                  alt="Photoreka score breakdown: aesthetic quality, composition, storytelling, originality, message, humor, visual games and candidness, with the weights of the Street preset"
                  label="Photoreka — Scores"
                  ratio="4 / 3"
                  focus="0% 50%"
                />
              </div>
            </div>
            <ul class="lx-list lx-list--rich">
              <li v-for="item in dimensions" :key="item.title">
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

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How <em class="lx-accent">scoring</em> works
              </template>
              <p>
                Transparent, reproducible, and based on real computer vision—not
                subjective crowdsourced ratings.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Quality ranking built for
                <em class="lx-accent">serious catalogs</em>
              </template>
              <p>
                A multi-dimensional scoring engine for photographers who care
                about nuance—not just pixel-level sharpness metrics.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <PicksPromo id="picks" source="photo_scoring" immersive />

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about AI photo scoring</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Your best photos
            <em class="lx-accent">deserve to be found.</em>
          </template>
          <p>
            Let Photoreka score your entire catalog and surface the work that
            defines you as a photographer. No guesswork, no second-guessing.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Ready to build a portfolio from your top scores?
            <a @click="goToPortfolio">Explore Portfolio Builder</a>
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
  BarChartOutline,
  EyeOutline,
  FlashOutline,
  ImagesOutline,
  ColorPaletteOutline,
  HappyOutline,
  LayersOutline,
  SearchOutline,
  GitNetworkOutline,
  BriefcaseOutline,
  ScanOutline,
  ExtensionPuzzleOutline,
  PersonOutline,
} from "@vicons/ionicons5";
import Trophy20Regular from "@vicons/fluent/es/Trophy20Regular.js";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("photo_scoring");

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
  { label: "Dimensions", target: "dimensions" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "Picks", target: "picks" },
  { label: "FAQ", target: "faq" },
];

const slideshowImages = [
  { src: "/ai_photo_scoring/1.png", alt: "Photo scoring hero slide 1" },
  { src: "/ai_photo_scoring/2.png", alt: "Photo scoring hero slide 2" },
  { src: "/ai_photo_scoring/4.png", alt: "Photo scoring hero slide 4" },
  { src: "/ai_photo_scoring/5.png", alt: "Photo scoring hero slide 5" },
];

// Scoring dimensions
const dimensions = [
  {
    icon: markRaw(ColorPaletteOutline),
    title: "Aesthetic Quality",
    description:
      "Overall visual beauty: color harmony, tonal balance, light quality, and visual coherence. How pleasing is this image to look at?",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Composition",
    description:
      "Spatial arrangement, framing, balance, leading lines, rule of thirds, negative space, and visual flow. How well-structured is the frame?",
    color: "#2563eb",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Narrative Strength",
    description:
      "Storytelling power, emotional resonance, tension, implied action, and human connection. Does this photo say something?",
    color: "#22c55e",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Originality",
    description:
      "Uniqueness within your catalog and in general photographic terms. Does this stand out from your usual work and from common visual tropes?",
    color: "#f59e0b",
  },
  {
    icon: markRaw(ExtensionPuzzleOutline),
    title: "Visual Games",
    description:
      "Reflections, optical illusions, visual paradoxes, and perceptual tricks. Images that play with the viewer's perception and reward a second look.",
    color: "#ec4899",
  },
  {
    icon: markRaw(HappyOutline),
    title: "Humor",
    description:
      "Comic timing, irony, absurdity, and wit captured in a single frame. Does this image make you laugh or smile at the world?",
    color: "#06b6d4",
  },
  {
    icon: markRaw(ScanOutline),
    title: "Subject Clarity",
    description:
      "How clearly and unambiguously the main subject stands out from the background. Especially relevant for product, stock, and fashion photography where instant subject identification is critical.",
    color: "#f97316",
  },
  {
    icon: markRaw(BriefcaseOutline),
    title: "Commercial Intent",
    description:
      "Suitability for commercial applications: product advertising, stock libraries, fashion editorials. Evaluates background cleanliness, subject isolation, lighting quality for commercial use, and overall production value.",
    color: "#a78bfa",
  },
  {
    icon: markRaw(PersonOutline),
    title: "Candidness",
    description:
      "Authenticity and spontaneity of the moment. Unposed, genuine expressions and interactions that feel true to life—the opposite of staged or constructed imagery.",
    color: "#34d399",
  },
];

// How it works steps
const steps = [
  {
    title: "Computer vision analyzes each photo",
    description:
      "When you upload or sync your library, Photoreka's AI processes each image to extract high-dimensional visual embeddings that capture content, style, composition, lighting, and emotional tone.",
  },
  {
    title: "Multi-dimensional scores are computed",
    description:
      "Each embedding is evaluated across 6+ independent quality dimensions by specialized scoring models. The result is a detailed quality profile—not a single pass/fail number.",
  },
  {
    title: "Rankings surface your best work",
    description:
      "Sort your entire catalog by any dimension or by a combined overall score. Your strongest photos rise to the top automatically. Filters let you narrow by date, source, or semantic content.",
  },
  {
    title: "Scores feed into every tool",
    description:
      "Scoring isn't isolated—it powers culling, portfolio building, <a href=\"/photo_chat\">AI Chat recommendations</a>, and 3D Atlas highlighting. Your quality data follows you across Photoreka's entire workflow.",
    html: true,
  },
];

// Features
const features = [
  {
    icon: markRaw(Trophy20Regular),
    title: "Surface Hidden Gems",
    description:
      "Many photographers underrate their own work. Scoring reveals photos with exceptional quality that you may have overlooked or forgotten deep in your archive.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Score + Search Combined",
    description:
      "Filter by score and search simultaneously: 'my highest-rated portraits from winter' or 'top compositions in black and white'. Quality and content work together.",
    color: "#2563eb",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Track Your Progress",
    description:
      "Compare average scores across time periods to see if your photography is improving. Identify which dimensions have grown and which need attention.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(GitNetworkOutline),
    title: "No Subjective Crowdsourcing",
    description:
      "Scoring is computed by AI trained on expert-level photographic assessment, not random internet votes. Results are consistent, reproducible, and private.",
    color: "#22c55e",
  },
  {
    icon: markRaw(ImagesOutline),
    title: "Batch Any Catalog Size",
    description:
      "From 100 photos to 20,000+. Scoring runs in the background and results persist—sort and filter anytime without reprocessing.",
    color: "#ec4899",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Instant Re-ranking",
    description:
      "Switch dimensions instantly. Sort by narrative strength for a documentary project, then by aesthetics for a gallery submission—without waiting.",
    color: "#06b6d4",
  },
];

// FAQs
const faqs = [
  {
    question: "Can AI really judge the quality of a photo?",
    answer:
      "Photoreka's scoring models are trained on expert photographic assessments and analyze visual properties that correlate with quality: composition, color harmony, lighting, subject presence, and emotional impact. They're not infallible—art is subjective—but they provide a consistent, data-driven starting point that most photographers find surprisingly accurate.",
  },
  {
    question: "Is this just a sharpness detector?",
    answer:
      "No. Technical sharpness is only one of 6+ dimensions. A soft, atmospheric portrait can score very high on aesthetics, narrative, and originality while scoring lower on technical sharpness. The system evaluates what makes a photo compelling, not just what makes it technically correct.",
  },
  {
    question: "How are the scoring models trained?",
    answer:
      "The models combine large-scale visual understanding (from computer vision foundation models) with specialized fine-tuning on photographic quality datasets curated by professional photographers and critics. They're designed to evaluate photography, not generic images.",
  },
  {
    question: "Can I sort by a single dimension?",
    answer:
      "Yes. You can sort and filter by any individual dimension (aesthetics, composition, narrative strength, originality, visual wit, or technical quality) or by the combined overall score. This lets you tailor rankings to each specific project.",
  },
  {
    question: "Do scores change over time?",
    answer:
      "Scores are computed once when your photos are analyzed and remain stable. As our models improve, you may optionally re-score your catalog, but existing scores persist. This ensures consistency and allows meaningful comparisons over time.",
  },
  {
    question: "Is this included with Photoreka?",
    answer:
      "Yes. Aesthetic scoring is a core feature available to all Photoreka users. Every photo in your catalog receives a full quality profile as part of the standard analysis pipeline.",
  },
  {
    question: "How does commercial scoring work?",
    answer:
      "When Photoreka detects commercial photography (product, stock, fashion) in your catalog—or when you flag it manually—two additional dimensions are activated: Subject Clarity, which measures how cleanly the main subject stands out from its environment, and Commercial Intent, which evaluates overall production value and suitability for advertising, stock libraries, or editorial use. These scores help you quickly identify your most licensable or pitch-ready images.",
  },
];

const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToDemo = () => {
  trackUserAction("navigate_to_demo", "photo_scoring_page");
  window.open("https://app.photoreka.com/demo/report", "_blank");
};

// La demo comercial corre sobre su propio catálogo (/demo-commercial), no es
// una ruta dentro de /demo. Ver app/pages/commercial_photography.vue.
const goToCommercialDemo = () => {
  trackUserAction("navigate_to_demo", "photo_scoring_page", "commercial");
  window.open("https://app.photoreka.com/demo-commercial/report", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "photo_scoring_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToPortfolio = () => {
  trackUserAction("navigate_to_portfolio", "photo_scoring_page");
  navigateTo("/photography_portfolio_builder");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "photo_scoring",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", { page: "photo_scoring" });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
/* ── Dimensions: pinned intro + capture beside the list ────── */
.sc-dims {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 5vw, 88px);
  align-items: start;
}

.sc-dims__side {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 24px);
  display: grid;
  gap: clamp(28px, 3vw, 40px);
}

@media (max-width: 1023px) {
  .sc-dims {
    grid-template-columns: minmax(0, 1fr);
  }

  .sc-dims__side {
    position: relative;
    top: auto;
  }
}
</style>
