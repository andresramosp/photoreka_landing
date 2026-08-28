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
              <div class="hero-content">
                <div class="hero-badge" :class="{ visible: heroVisible }">
                  <span class="badge-content">
                    <n-icon size="16"><BarChartOutline /></n-icon>
                    AI Photo Scoring &amp; Quality Ranking
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Score your entire catalog,
                  <span class="gradient-text">surface your best work</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Your archive has thousands of images—your portfolio needs
                  twenty. Photoreka scores every photo in your catalog across
                  <strong
                    >aesthetics, composition, narrative strength, originality,
                    visual wit</strong
                  >, and more—giving you an objective lens on your own work.<br /><br />
                  For commercial work—product, stock, or fashion—two extra
                  dimensions activate:
                  <strong>subject clarity</strong> and
                  <strong>commercial intent</strong>.
                </p>

                <div class="hero-actions" :class="{ visible: heroVisible }">
                  <n-button type="info" size="large" strong @click="goToDemo">
                    <template #icon>
                      <n-icon><PlayCircleOutline /></n-icon>
                    </template>
                    Try the Demo
                  </n-button>
                  <n-button
                    strong
                    secondary
                    type="info"
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
              </div>

              <div class="hero-visual" :class="{ visible: heroVisible }">
                <div class="video-frame hero-slideshow">
                  <div
                    v-for="(img, i) in slideshowImages"
                    :key="i"
                    class="hero-slide"
                    :class="{ active: currentSlide === i }"
                    :style="{
                      backgroundImage: `url(${img.src})`,
                      transform: slideTransforms[i],
                    }"
                    role="img"
                    :aria-label="img.alt"
                  ></div>
                  <div class="hero-slideshow-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Scoring Dimensions Section -->
        <section class="examples-section" ref="dimensionsSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: dimensionsVisible }">
              <h2 class="section-title">9+ AI photo scoring dimensions</h2>
              <p class="section-subtitle">
                Each photo receives a detailed quality profile across multiple
                independent criteria—so you can rank and filter by exactly what
                matters for your project. Commercial mode activates two
                additional product-, stock-, and fashion-specific scores.
              </p>
            </div>

            <div
              class="dimensions-grid"
              :class="{ visible: dimensionsVisible }"
            >
              <div
                v-for="(dim, i) in dimensions"
                :key="i"
                class="dimension-card"
                :style="{ transitionDelay: `${i * 80}ms` }"
              >
                <div class="dimension-icon" :style="{ color: dim.color }">
                  <n-icon size="28">
                    <component :is="dim.icon" />
                  </n-icon>
                </div>
                <h3 class="dimension-title">{{ dim.title }}</h3>
                <p class="dimension-description">{{ dim.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- How It Works Section -->
        <section class="how-section" ref="howSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="section-container" style="position: relative; z-index: 1">
            <div class="section-header" :class="{ visible: howVisible }">
              <h2 class="section-title">How scoring works</h2>
              <p class="section-subtitle">
                Transparent, reproducible, and based on real computer vision—not
                subjective crowdsourced ratings.
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
                  <p class="step-description" v-html="step.description"></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Grid Section -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">
                Quality ranking built for serious catalogs
              </h2>
              <p class="section-subtitle">
                A multi-dimensional scoring engine for photographers who care
                about nuance—not just pixel-level sharpness metrics.
              </p>
            </div>

            <div class="features-grid">
              <div
                v-for="(feature, index) in features"
                :key="index"
                class="feature-card"
                :class="{ visible: featuresVisible }"
                :style="{ transitionDelay: `${index * 100}ms` }"
              >
                <div class="feature-icon" :style="{ color: feature.color }">
                  <n-icon size="32">
                    <component :is="feature.icon" />
                  </n-icon>
                </div>
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Geo Recovery Promo Section -->
        <GeoRecoveryPromo />

        <!-- FAQ Section -->
        <section class="faq-section" ref="faqSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: faqVisible }">
              <h2 class="section-title">Frequently Asked Questions</h2>
              <p class="section-subtitle">
                Everything you need to know about AI photo scoring
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

        <!-- Final CTA Section -->
        <section class="cta-section" ref="ctaSection">
          <div class="section-container">
            <div class="cta-content" :class="{ visible: ctaVisible }">
              <h2 class="cta-title">Your best photos deserve to be found.</h2>
              <p class="cta-description">
                Let Photoreka score your entire catalog and surface the work
                that defines you as a photographer. No guesswork, no
                second-guessing.
              </p>
              <div class="cta-buttons">
                <n-button type="info" size="large" strong @click="goToDemo">
                  <template #icon>
                    <n-icon><PlayCircleOutline /></n-icon>
                  </template>
                  Try the Demo
                </n-button>
                <n-button
                  strong
                  secondary
                  type="info"
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
                  Ready to build a portfolio from your top scores?
                  <a @click="goToPortfolio" class="cta-link"
                    >Explore Portfolio Builder</a
                  >
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
import { markRaw, nextTick } from "vue";
import {
  SunnyOutline,
  MoonOutline,
  ArrowBackOutline,
  PlayCircleOutline,
  KeyOutline,
  ChevronDownOutline,
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
import { Trophy20Regular } from "@vicons/fluent";
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
  themeMode,
  toggleTheme: baseToggleTheme,
  canToggleTheme,
  initTheme,
} = useTheme();

const toggleTheme = () => baseToggleTheme();

// Refs
const heroSection = ref(null);
const dimensionsSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

const heroVisible = ref(false);
const dimensionsVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

const slideshowImages = [
  { src: "/ai_photo_scoring/1.png", alt: "Photo scoring hero slide 1" },
  { src: "/ai_photo_scoring/2.png", alt: "Photo scoring hero slide 2" },
  { src: "/ai_photo_scoring/3.png", alt: "Photo scoring hero slide 3" },
  { src: "/ai_photo_scoring/4.png", alt: "Photo scoring hero slide 4" },
  { src: "/ai_photo_scoring/5.png", alt: "Photo scoring hero slide 5" },
];
const currentSlide = ref(0);
const slideTransforms = ref(slideshowImages.map(() => "scale(1.0)"));
let slideshowTimer = null;

const activateSlide = (idx) => {
  slideTransforms.value[idx] = "scale(1.0)";
  nextTick(() => {
    slideTransforms.value[idx] = "scale(1.1)";
  });
};

const deactivateSlide = (idx) => {
  setTimeout(() => {
    slideTransforms.value[idx] = "scale(1.0)";
  }, 1100);
};

// Scoring dimensions
const dimensions = ref([
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
]);

// How it works steps
const steps = ref([
  {
    title: "Computer vision analyzes each photo",
    description:
      "When you upload or sync your library, Photoreka's AI processes each image to extract high-dimensional visual embeddings that capture content, style, composition, lighting, and emotional tone.",
    color: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "Multi-dimensional scores are computed",
    description:
      "Each embedding is evaluated across 6+ independent quality dimensions by specialized scoring models. The result is a detailed quality profile—not a single pass/fail number.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Rankings surface your best work",
    description:
      "Sort your entire catalog by any dimension or by a combined overall score. Your strongest photos rise to the top automatically. Filters let you narrow by date, source, or semantic content.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "Scores feed into every tool",
    description:
      "Scoring isn't isolated—it powers culling, portfolio building, <a href=\"/photo_chat\">AI Chat recommendations</a>, and 3D Atlas highlighting. Your quality data follows you across Photoreka's entire workflow.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
]);

// Features
const features = ref([
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
]);

// FAQs
const faqs = ref([
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
]);

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "photo_scoring_page");
  navigateTo("/");
};

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

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "photo_scoring",
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
  watch(dimensionsSection, dimensionsVisible);
  watch(howSection, howVisible);
  watch(featuresSection, featuresVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  trackEvent("page_view", { page: "photo_scoring" });

  activateSlide(0);

  slideshowTimer = setInterval(() => {
    const prev = currentSlide.value;
    const next = (prev + 1) % slideshowImages.length;
    deactivateSlide(prev);
    currentSlide.value = next;
    activateSlide(next);
  }, 3333);
});

onUnmounted(() => {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
});
</script>

<style scoped>
/* ── Layout & Base ─────────────────────────────────────────── */
.framer-page {
  min-height: 100vh;
  background: var(--premium-bg-primary);
  color: var(--premium-text-primary);
}

/* ── Nav ───────────────────────────────────────────────────── */
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

/* ── Hero ──────────────────────────────────────────────────── */
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
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}
.hero-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 50px;
  font-size: var(--fs-sm);
  font-weight: var(--font-weight-semibold);
  color: #06b6d4;
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
.hero-title {
  font-size: var(--fs-hero);
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
  max-width: 580px;
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
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}
.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-visual {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--premium-border);
}
.hero-visual.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.hero-visual:hover {
  transform: translateY(-8px) scale(1);
}
.video-frame {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: var(--premium-bg-card);
}

/* ── Hero slideshow ─────────────────────────────────────────── */
.hero-slideshow {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--premium-bg-card);
}
.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transform: scale(1);
  transition:
    opacity 0.93s ease,
    transform 3.5s ease;
}
.hero-slide.active {
  opacity: 1;
}
.hero-slideshow-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(0, 0, 0, 0.35) 100%
  );
  border-radius: 20px;
  pointer-events: none;
}
.hero-video {
  width: 100%;
  height: auto;
  display: block;
}
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}

/* Orbs */
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
  background: linear-gradient(135deg, #06b6d4, #2563eb);
  top: -300px;
  right: -200px;
}
.orb-2 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  bottom: -200px;
  left: -250px;
  animation-delay: -10s;
}
.orb-3 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
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

/* ── Section shell ─────────────────────────────────────────── */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
}
.section-header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 3rem;
  text-align: center;
}
.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}
.section-title {
  font-size: var(--fs-h1);
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-tight);
}
.section-subtitle {
  font-size: var(--fs-subheading);
  color: var(--premium-text-secondary);
  max-width: 680px;
  margin: 0 auto;
  line-height: var(--line-height-loose);
}

/* ── Dimensions Section ────────────────────────────────────── */
.examples-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.dimensions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.dimensions-grid.visible {
  opacity: 1;
  transform: translateY(0);
}
.dimension-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s ease;
}
.dimension-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
.dimension-icon {
  margin-bottom: 1rem;
}
.dimension-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.5rem;
}
.dimension-description {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
}

/* ── How It Works Section ──────────────────────────────────── */
.how-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}
.steps-container {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.steps-container.visible {
  opacity: 1;
  transform: translateY(0);
}
.step-card {
  display: flex;
  gap: 1.75rem;
  align-items: flex-start;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s ease;
}
.step-card:hover {
  transform: translateX(6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: var(--fs-2xl);
  font-weight: var(--font-weight-bold);
  color: white;
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.5rem;
}
.step-description {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
}
.step-description a {
  color: var(--premium-primary);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
}
.step-description a:hover {
  text-decoration: underline;
}

/* ── Features Section ──────────────────────────────────────── */
.features-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.feature-icon {
  margin-bottom: 1.5rem;
}
.feature-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.75rem;
}
.feature-description {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
}

/* ── FAQ Section ───────────────────────────────────────────── */
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
  border-color: var(--premium-primary);
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
  font-size: var(--fs-base);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── CTA Section ───────────────────────────────────────────── */
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
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.cta-extra {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--premium-border);
  font-size: var(--fs-base);
  color: var(--premium-text-secondary);
}
.cta-link {
  color: var(--premium-primary);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}
.cta-link:hover {
  text-decoration: underline;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 968px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero-content {
    text-align: center;
    align-items: center;
  }
  .hero-subtitle {
    max-width: 100%;
  }
  .hero-actions {
    justify-content: center;
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
  .section-title {
    font-size: var(--fs-4xl);
  }
  .dimensions-grid,
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .step-card {
    flex-direction: column;
  }
  .step-number {
    margin: 0 auto;
  }
  .how-section {
    padding: 4rem 1rem;
  }
  .examples-section,
  .features-section,
  .faq-section,
  .cta-section {
    padding: 4rem 1rem;
  }
}
</style>
