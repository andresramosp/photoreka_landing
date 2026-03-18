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
                    AI Portfolio Builder
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Build your best portfolio
                  <span class="gradient-text">in minutes</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Selecting and sequencing photos for a portfolio, exhibition,
                  or competition takes days of agonizing decisions. Photoreka
                  combines
                  <strong
                    >AI scoring, narrative sequencing, and conversational
                    curation</strong
                  >
                  to surface your strongest work and arrange it with intent.<br /><br />
                  Tell the assistant what you need—
                  <em
                    >"pick my 10 best street photos for a gallery
                    submission"</em
                  >
                  —and get a curated, ordered selection backed by data.
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
              </div>
            </div>
          </div>
        </section>

        <!-- Use Cases Section -->
        <section class="examples-section" ref="usecasesSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: usecasesVisible }">
              <h2 class="section-title">One workflow, many outputs</h2>
              <p class="section-subtitle">
                Whether you're preparing for a gallery, a competition, a client
                delivery, or a photobook—the same intelligent pipeline adapts to
                your goal.
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
                Three Photoreka features combine into a single seamless
                workflow.
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
                A portfolio builder for photographers
              </h2>
              <p class="section-subtitle">
                Not a generic website template. An intelligent system that
                understands your work and helps you present it at its best.
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
import { markRaw } from "vue";
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
  CubeOutline,
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

// Use cases
const usecases = ref([
  {
    icon: markRaw(ImagesOutline),
    title: "Gallery Exhibition",
    description:
      "Select and sequence 15-30 photos that tell a cohesive visual story for a gallery wall. The AI ensures thematic coherence and visual flow.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(RibbonOutline),
    title: "Competition Submission",
    description:
      "Surface your strongest 3-10 images ranked by quality, originality, and impact. Maximize your chances with data-driven selection.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(BriefcaseOutline),
    title: "Client Delivery",
    description:
      "Quickly identify the best shots from a session and present them in a polished sequence. From thousands of captures to a tight edit in minutes.",
    color: "#2563eb",
  },
  {
    icon: markRaw(BookOutline),
    title: "Photobook Layout",
    description:
      "Build narrative sequences for print publication. The AI considers pacing, visual variety, and tonal progression across spreads.",
    color: "#22c55e",
  },
]);

// How it works steps
const steps = ref([
  {
    title: "Scoring identifies your strongest photos",
    description:
      "Photoreka's AI scores every image across aesthetics, composition, narrative, originality, and more. Your top-quality work is surfaced automatically from thousands of photos.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "The AI assistant curates with intent",
    description:
      "Tell the assistant what you need: 'pick my 12 best street photos for a gallery' or 'create a narrative sequence from my Italy trip'. It selects and orders photos with curatorial reasoning.",
    color: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "Sequencing creates a visual narrative",
    description:
      "Photos aren't just ranked—they're arranged into meaningful sequences. The AI considers compositional flow, tonal transitions, color progression, and narrative arc.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "Review, refine, and export",
    description:
      "You're always in control. Swap photos, reorder the sequence, ask for alternatives, or change the brief entirely. Export your final portfolio when ready.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(Trophy20Regular),
    title: "Quality-First Selection",
    description:
      "Portfolio selections start from your highest-scored work—not random browsing. The AI considers multiple quality dimensions to surface photos worthy of presentation.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(ChatbubblesOutline),
    title: "Conversational Curation",
    description:
      "Describe your goal in plain language and the assistant builds your portfolio. Refine with follow-ups: 'swap #3 for something warmer' or 'add more variety in framing'.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Intentional Sequencing",
    description:
      "Photos are ordered for visual impact—not alphabetically or by date. The AI evaluates compositional flow, tonal rhythm, and narrative pacing.",
    color: "#2563eb",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Thematic Coherence",
    description:
      "The assistant ensures your selection tells a unified story. It detects when a photo breaks the visual thread and suggests better alternatives.",
    color: "#22c55e",
  },
  {
    icon: markRaw(CubeOutline),
    title: "3D Atlas Integration",
    description:
      "Explore portfolio candidates in 3D space. See how selected photos cluster together and discover nearby images that strengthen the set.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Search to Fill Gaps",
    description:
      "Need a specific type of shot to complete the portfolio? Search your archive by description and the AI will find candidates that fit the sequence.",
    color: "#ec4899",
  },
]);

// FAQs
const faqs = ref([
  {
    question: "Does the AI actually build my portfolio for me?",
    answer:
      "It gives you an intelligent starting point: a curated, scored, and sequenced selection based on your instructions. You review, adjust, and make the final decisions. Think of it as having a knowledgeable curator suggest a first draft.",
  },
  {
    question: "Can I prepare for a specific competition or gallery?",
    answer:
      "Yes. You can specify the number of images, the theme, and any constraints ('only black and white', 'from 2025', 'street photography only'). The assistant will select and sequence accordingly.",
  },
  {
    question: "How does it decide the order of photos?",
    answer:
      "Sequencing considers visual flow (composition rhythm), tonal progression (light/dark alternation), color harmony between adjacent images, and narrative arc. The goal is a portfolio that reads as a coherent whole, not just a list of good photos.",
  },
  {
    question: "Can I use it with only 50 photos?",
    answer:
      "Yes. The tools work with any catalog size, though the selection becomes more powerful as your archive grows. Even with a small catalog, the scoring and sequencing add significant value.",
  },
  {
    question: "What if I disagree with the selection?",
    answer:
      "You're always in control. Swap individual photos, ask for alternatives ('show me 3 options to replace #5'), reorder the sequence, or change the entire brief. The assistant adapts to your feedback in real-time.",
  },
  {
    question: "Is this a portfolio website builder?",
    answer:
      "No—Photoreka is the curation engine behind your portfolio, not the website. It selects and sequences your photos intelligently. You can then use the results in any portfolio platform, print service, or gallery submission.",
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
  window.open("https://app.photoreka.com/demo/chat-lab", "_blank");
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
