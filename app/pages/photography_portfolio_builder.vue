<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="framer-page">
        <!-- Navigation Header -->
        <nav class="premium-nav">
          <div class="nav-container">
            <div class="nav-brand">
              <NuxtLink to="/">
                <AppLogo layout="horizontal" :height="45" />
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
                    <n-icon size="16"><LayersOutline /></n-icon>
                    AI Photography Portfolio Builder
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Your best portfolio,
                  <span class="gradient-text">picked by AI</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Choosing 20 photos out of thousands for a gallery,
                  competition, or book takes days. Photoreka's portfolio builder
                  combines
                  <strong
                    >8-dimension artistic scoring, five coherence modes, and
                    intelligent sequencing</strong
                  >
                  to deliver a curated, ordered selection you can actually
                  present.<br /><br />
                  Set a target size (10–40 photos), describe the vibe you're
                  after, pick a coherence mode, and let the builder score,
                  select, and arrange your strongest work.
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
              </div>

              <div class="hero-visual" :class="{ visible: heroVisible }">
                <!--
                  Temporary placeholder slideshow.
                  TODO: replace with the definitive product video.
                  Images auto-rotate with fade + soft Ken Burns zoom.
                  Replace the URLs in `slideshowImages` with real product
                  screenshots when ready.
                -->
                <!--
                <div class="video-frame">
                  <video
                    class="hero-video"
                    src="/videos/atlas_1.mp4"
                    poster="/home/video_poster.jpg"
                    ref="videoRef"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
                -->
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

        <!-- Use Cases Section -->
        <section class="examples-section" ref="usecasesSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: usecasesVisible }">
              <h2 class="section-title">
                One AI portfolio generator, many outputs
              </h2>
              <p class="section-subtitle">
                Whether you're preparing for a gallery, a competition, a client
                delivery, or a photobook—the same intelligent pipeline adapts to
                your goal and automatically selects your strongest photos.
              </p>
            </div>

            <div class="usecases-grid" :class="{ visible: usecasesVisible }">
              <div
                v-for="(uc, i) in usecases"
                :key="i"
                class="usecase-card"
                :style="{ transitionDelay: `${i * 100}ms` }"
              >
                <div class="usecase-icon" :style="{ color: uc.color }">
                  <n-icon size="28">
                    <component :is="uc.icon" />
                  </n-icon>
                </div>
                <h3 class="usecase-title">{{ uc.title }}</h3>
                <p class="usecase-description">{{ uc.description }}</p>
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
              <h2 class="section-title">How portfolio building works</h2>
              <p class="section-subtitle">
                A guided wizard turns a scored catalog into a curated, sequenced
                portfolio in five short steps.
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

        <!-- Features Grid Section -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">
                Built for serious photographic curation &amp; selection
              </h2>
              <p class="section-subtitle">
                Not a template gallery. An AI photo selection engine that
                understands quality, coherence, and narrative—and lets you stay
                in control.
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

        <!-- Export Section -->
        <!-- <section class="export-section">
          <div class="section-container">
            <div class="export-inner">
              <div class="export-headline">
                <h2 class="section-title" style="text-align: left">
                  Export in the format you need
                </h2>
                <p class="section-subtitle" style="text-align: left; margin: 0">
                  Once your portfolio is curated, take it anywhere. Three export
                  modes cover every destination — from print-ready PDFs to
                  original-resolution archives.
                </p>
              </div>
              <div class="export-cards">
                <div
                  v-for="(mode, i) in exportModes"
                  :key="i"
                  class="export-card"
                >
                  <div
                    class="export-card-icon"
                    :style="{ background: mode.bg }"
                  >
                    <n-icon size="22" color="#fff">
                      <component :is="mode.icon" />
                    </n-icon>
                  </div>
                  <div class="export-card-body">
                    <h3 class="export-card-title">{{ mode.title }}</h3>
                    <p class="export-card-description">
                      {{ mode.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> -->

        <!-- 3D Atlas Section -->
        <section class="atlas-section" ref="atlasSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="hero-container">
            <div class="hero-layout">
              <!-- Left: Video -->
              <div class="hero-visual" :class="{ visible: atlasVisible }">
                <div class="video-frame">
                  <video
                    class="hero-video"
                    src="/videos/atlas_1.mp4"
                    poster="/home/video_lr_poster.jpg"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
              </div>

              <!-- Right: Content -->
              <div
                class="hero-content atlas-content"
                :class="{ visible: atlasVisible }"
              >
                <div
                  class="hero-badge atlas-badge"
                  :class="{ visible: atlasVisible }"
                >
                  <span class="badge-content">
                    <n-icon size="18"><CubeOutline /></n-icon>
                    3D Atlas
                  </span>
                </div>
                <h2
                  class="hero-title atlas-title"
                  :class="{ visible: atlasVisible }"
                >
                  From portfolio curation to
                  <span class="gradient-text"> 3D exploration</span>
                </h2>
                <p class="hero-subtitle" :class="{ visible: atlasVisible }">
                  Once your portfolio starts taking shape, step into the 3D
                  Atlas to zoom out and understand the larger body of work it
                  comes from. Photoreka arranges your images in space by visual
                  similarity, revealing clusters, repetitions, transitions, and
                  unexpected relationships across your archive. It is the ideal
                  companion for refining selections, discovering adjacent
                  images, and seeing your photography with more clarity,
                  coherence, and perspective.
                </p>

                <div class="hero-actions" :class="{ visible: atlasVisible }">
                  <n-button
                    type="primary"
                    size="large"
                    strong
                    @click="goToAtlas"
                  >
                    <template #icon>
                      <n-icon><CubeOutline /></n-icon>
                    </template>
                    Open 3D Atlas
                  </n-button>
                  <span class="cta-note">Launch in Photoreka web platform</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section" ref="faqSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: faqVisible }">
              <h2 class="section-title">Frequently Asked Questions</h2>
              <p class="section-subtitle">
                Everything you need to know about AI portfolio building
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
              <h2 class="cta-title">
                Your next portfolio is already in your archive.
              </h2>
              <p class="cta-description">
                Stop second-guessing which photos belong. Let Photoreka score,
                select, and sequence your strongest work into a portfolio you're
                proud of.
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
                  Want to understand your scoring in detail?
                  <a @click="goToScoring" class="cta-link">See Photo Scoring</a>
                  &middot;
                  <a @click="goToChat" class="cta-link">Try the AI Assistant</a>
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
  LayersOutline,
  ImagesOutline,
  BarChartOutline,
  ChatbubblesOutline,
  SearchOutline,
  EyeOutline,
  BookOutline,
  RibbonOutline,
  BriefcaseOutline,
  DocumentTextOutline,
  ImageOutline,
  DownloadOutline,
} from "@vicons/ionicons5";
import { Trophy20Regular } from "@vicons/fluent";
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
  themeMode,
  toggleTheme: baseToggleTheme,
  canToggleTheme,
  initTheme,
} = useTheme();

const toggleTheme = () => baseToggleTheme();

const atlasVisible = ref(true);

// Refs
const heroSection = ref(null);
const usecasesSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);
const videoRef = ref(null);

const heroVisible = ref(false);
const usecasesVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// Hero slideshow with portfolio builder product screenshots.
// Images crossfade with a fade + soft Ken Burns zoom.
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
  {
    src: "/portfolio_builder/6.png",
    alt: "Portfolio builder interface - step 6",
  },
];
const currentSlide = ref(0);
// JS-driven Ken Burns: transform controlled here to avoid CSS animation snap artifacts.
const slideTransforms = ref(slideshowImages.map(() => "scale(1.0)"));
let slideshowTimer = null;

const activateSlide = (idx) => {
  // Ensure we start from base scale (no transition fires since value is unchanged)
  slideTransforms.value[idx] = "scale(1.0)";
  // After Vue commits the reset to the DOM, start the slow zoom (triggers CSS transition)
  nextTick(() => {
    slideTransforms.value[idx] = "scale(1.1)";
  });
};

const deactivateSlide = (idx) => {
  // Reset transform after the opacity fade-out (0.93s) is done, while the slide is invisible
  setTimeout(() => {
    slideTransforms.value[idx] = "scale(1.0)";
  }, 1100);
};

// Use cases
const usecases = ref([
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
]);

// How it works steps — mirrors the real 6-step wizard, condensed for the landing
const steps = ref([
  {
    title: "Name it and describe the vibe",
    description:
      'Give your portfolio a name and, optionally, a theme in plain language — e.g. "European cities at night, moody urban vibes". The theme acts as a soft bias during curation, not a hard filter.',
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Pick a size and your artistic priorities",
    description:
      'Choose a target between 10 and 40 photos. Then either describe your style ("strong storytelling and humor, cinematic light") and let the AI parse it into weights, or tune the 8 artistic dimensions manually with genre presets (Street, Documentary, Artistic…).',
    color: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "Filter and choose a coherence mode",
    description:
      "Narrow the candidate pool by visual aspects (genre, framing, depth of field, lighting…), date range or collection. Then select how the portfolio should hold together: Visual, Chromatic, Narrative, Heterogeneous or Free.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "Let the AI score, select and sequence",
    description:
      "The engine builds a ranked candidate pool, evaluates photos in context with a vision LLM, refines the set to remove redundancies, and — if enabled — arranges the final sequence with attention to visual flow and orientation balance.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
  {
    title: "Review, reorder, refine",
    description:
      "Drag photos to reorder, remove the ones that don't belong (with undo), or pull in additional shots from your catalog. Adjust columns and gap, save the layout, or start a manual portfolio from scratch at any time.",
    color: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  },
]);

// Features — reflect actual unique capabilities of the builder
const features = ref([
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
]);

// Export modes
const exportModes = [
  {
    icon: markRaw(DocumentTextOutline),
    title: "PDF — print-ready layout",
    description:
      "Generates a paginated PDF with your photos arranged in the current grid layout (1–6 columns, custom gap). Each page preserves your column configuration, ready to hand to a printer or gallery.",
    bg: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    icon: markRaw(ImageOutline),
    title: "JPEG — single composite image",
    description:
      "Renders the entire grid as a single high-quality JPEG. Useful for quick previews, social sharing, or embedding your portfolio layout in a presentation or submission form.",
    bg: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    icon: markRaw(DownloadOutline),
    title: "ZIP — original files",
    description:
      "Packages the full-resolution originals of every photo in the portfolio into a ZIP archive. Ideal for submitting to a competition, sending files to a retoucher, or handing a curated selection to a client.",
    bg: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
];

// FAQs — updated to match real behaviour and constraints
const faqs = ref([
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
]);

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "portfolio_builder_page");
  navigateTo("/");
};

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

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "photography_portfolio_builder",
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
  watch(usecasesSection, usecasesVisible);
  watch(howSection, howVisible);
  watch(featuresSection, featuresVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  trackEvent("page_view", { page: "photography_portfolio_builder" });

  // Kick off Ken Burns zoom on the first slide
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
  font-size: 0.95rem;
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
  font-size: 0.9rem;
  font-weight: 600;
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
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.03em;
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
  font-size: 17px;
  color: var(--premium-text-secondary);
  line-height: 1.7;
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
.hero-video {
  width: 100%;
  height: auto;
  display: block;
}

/* ── Hero slideshow (temporary placeholder) ─────────────────── */
.hero-slideshow {
  position: relative;
  width: 100%;
  /* Match a typical 16:10 product screenshot so layout doesn't jump
     when the real video/screenshots replace this. */
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
  /* opacity fades in/out; transform is driven by JS (activateSlide/deactivateSlide)
     so it always transitions smoothly from its current value — no snap. */
  transition:
    opacity 0.93s ease-in-out,
    transform 4s ease-out;
  will-change: opacity, transform;
}
.hero-slide.active {
  opacity: 1;
}
.hero-slideshow-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.25) 100%
  );
}
@media (prefers-reduced-motion: reduce) {
  .hero-slide {
    transition: opacity 0.4s ease !important;
  }
}
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--premium-text-secondary);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Use Cases Section ─────────────────────────────────────── */
.examples-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.usecases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.usecases-grid.visible {
  opacity: 1;
  transform: translateY(0);
}
.usecase-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s ease;
}
.usecase-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
.usecase-icon {
  margin-bottom: 1rem;
}
.usecase-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.usecase-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
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
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.step-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
  font-size: 0.97rem;
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
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.feature-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
  font-size: 0.97rem;
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
  font-size: 1.05rem;
  font-weight: 600;
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
  line-height: 1.7;
  animation: fadeIn 0.3s ease;
  font-size: 0.97rem;
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

/* ── Export Section ────────────────────────────────────────── */
.export-section {
  padding: 5rem 2rem;
  background: var(--premium-bg-primary);
}
.export-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3.5rem;
  align-items: start;
}
.export-headline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 6rem;
}
.export-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.export-card {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 14px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}
.export-card:hover {
  transform: translateX(4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
.export-card-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.export-card-body {
  flex: 1;
}
.export-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.4rem;
}
.export-card-description {
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  margin: 0;
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.cta-description {
  font-size: 1.15rem;
  color: var(--premium-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.7;
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
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
}
.cta-link {
  color: var(--premium-primary);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}
.cta-link:hover {
  text-decoration: underline;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 968px) {
  .export-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .export-headline {
    position: static;
  }
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
    font-size: clamp(2rem, 8vw, 3rem);
  }
  .section-title {
    font-size: 1.8rem;
  }
  .usecases-grid,
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
