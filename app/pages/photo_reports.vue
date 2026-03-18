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
                    <n-icon size="16"><AnalyticsOutline /></n-icon>
                    Photography Reports
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  See your photography
                  <span class="gradient-text">from the outside</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  You know how your photos <em>feel</em>—but do you know what
                  the data says? Photoreka generates
                  <strong
                    >detailed reports on your style, patterns, strengths, and
                    evolution</strong
                  >
                  by analyzing your entire catalog with AI.<br /><br />
                  Discover what you're great at, where you're growing, and what
                  to shoot next—backed by multi-dimensional analysis, not vibes.
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

        <!-- Report Types Section -->
        <section class="reports-section" ref="reportsSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: reportsVisible }">
              <h2 class="section-title">Reports that reveal your work</h2>
              <p class="section-subtitle">
                Every report is generated from real AI analysis of your photos—
                not metadata alone. Understand patterns, track growth, and make
                informed creative decisions.
              </p>
            </div>

            <div class="reports-grid" :class="{ visible: reportsVisible }">
              <div
                v-for="(report, i) in reportTypes"
                :key="i"
                class="report-card"
                :style="{ transitionDelay: `${i * 100}ms` }"
              >
                <div class="report-icon" :style="{ color: report.color }">
                  <n-icon size="28">
                    <component :is="report.icon" />
                  </n-icon>
                </div>
                <h3 class="report-title">{{ report.title }}</h3>
                <p class="report-description">{{ report.description }}</p>
                <ul class="report-insights">
                  <li v-for="(insight, j) in report.insights" :key="j">
                    {{ insight }}
                  </li>
                </ul>
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
              <h2 class="section-title">How photo reports work</h2>
              <p class="section-subtitle">
                From raw analysis to actionable insights—all automatic.
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
                More than numbers—real creative intelligence
              </h2>
              <p class="section-subtitle">
                Photo reports go beyond basic stats. They combine AI vision,
                scoring data, and temporal analysis to give you a complete
                picture of your practice.
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
                Everything you need to know about AI-powered photo reports
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
              <h2 class="cta-title">What story does your photography tell?</h2>
              <p class="cta-description">
                Let the data reveal patterns you can't see by scrolling through
                a grid. Photoreka reports give you a photographer's mirror—
                objective, detailed, and built to help you grow.
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
                  See how scoring powers your reports:
                  <a @click="goToScoring" class="cta-link">Photo Scoring</a>
                  &middot;
                  <a @click="goToChat" class="cta-link"
                    >Chat with Your Photos</a
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
import { markRaw } from "vue";
import {
  SunnyOutline,
  MoonOutline,
  ArrowBackOutline,
  PlayCircleOutline,
  KeyOutline,
  ChevronDownOutline,
  AnalyticsOutline,
  BarChartOutline,
  TrendingUpOutline,
  ColorPaletteOutline,
  EyeOutline,
  FlashOutline,
  GitNetworkOutline,
  SpeedometerOutline,
  TimeOutline,
  LayersOutline,
  StatsChartOutline,
  PulseOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("photo_reports");

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
const reportsSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);
const videoRef = ref(null);

const heroVisible = ref(false);
const reportsVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// Report types
const reportTypes = ref([
  {
    icon: markRaw(BarChartOutline),
    title: "Quality Distribution Report",
    description:
      "Understand the quality landscape of your entire catalog at a glance.",
    insights: [
      "Score distribution across all photos",
      "Top percentile breakdown",
      "Quality vs. volume by time period",
    ],
    color: "#f59e0b",
  },
  {
    icon: markRaw(TrendingUpOutline),
    title: "Evolution & Growth Report",
    description:
      "Track how your photography has changed month-over-month and year-over-year.",
    insights: [
      "Average score trends over time",
      "Dimension-specific improvements",
      "Shooting frequency patterns",
    ],
    color: "#22c55e",
  },
  {
    icon: markRaw(ColorPaletteOutline),
    title: "Style & Aesthetics Report",
    description:
      "Discover the visual DNA of your photography—color palettes, moods, and recurring motifs.",
    insights: [
      "Dominant color profiles",
      "Mood and tone analysis",
      "Subject and theme clusters",
    ],
    color: "#8b5cf6",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Strengths & Gaps Report",
    description:
      "See where you excel across scoring dimensions and where there's room to grow.",
    insights: [
      "Strongest scoring dimensions",
      "Weakest scoring dimensions",
      "Personalized improvement suggestions",
    ],
    color: "#2563eb",
  },
  {
    icon: markRaw(GitNetworkOutline),
    title: "Pattern & Cluster Report",
    description:
      "Visualize how your photos naturally group by style, subject, and quality.",
    insights: [
      "Automatic theme detection",
      "Cluster quality comparison",
      "Outlier and standout identification",
    ],
    color: "#06b6d4",
  },
  {
    icon: markRaw(PulseOutline),
    title: "Shooting Session Analysis",
    description:
      "Break down individual sessions to understand your hit rate and workflow efficiency.",
    insights: [
      "Keeper rate per session",
      "Best time of day / conditions",
      "Session-to-session comparison",
    ],
    color: "#ec4899",
  },
]);

// How it works steps
const steps = ref([
  {
    title: "Your photos are scored across multiple dimensions",
    description:
      "Photoreka's AI evaluates every image for aesthetics, composition, narrative strength, originality, technical quality, and more. This scoring data is the foundation of all reports.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Patterns are detected across your catalog",
    description:
      "The system identifies trends over time, recurring subjects, stylistic clusters, and quality distributions. It finds the patterns you can't see by scrolling a grid.",
    color: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "Reports are generated with visual summaries",
    description:
      "Each report combines charts, example photos, and natural-language insights. You see both the data and the 'so what'—clear takeaways you can act on.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "Track progress and set creative goals",
    description:
      "Use reports to benchmark your evolution, celebrate improvements, and identify the next area to focus on. The reports update as your catalog grows.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(StatsChartOutline),
    title: "Data-Driven Insights",
    description:
      "Every insight is backed by AI analysis of your actual photos—not metadata guesses. Understand your strengths with the same rigor a coach would bring.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(TrendingUpOutline),
    title: "Temporal Evolution",
    description:
      "See how your scores evolve over time. Identify when you had creative breakthroughs and which periods produced your best work.",
    color: "#22c55e",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Visual Examples",
    description:
      "Reports include your actual photos as examples—top scorers, best compositions, most original shots. It's a best-of archive generated automatically.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Actionable Recommendations",
    description:
      "Each report includes personalized suggestions: what to shoot more of, what technical skills to develop, and what subjects to explore.",
    color: "#2563eb",
  },
  {
    icon: markRaw(TimeOutline),
    title: "Auto-Updating",
    description:
      "Reports refresh as you add new photos. Track your growth continuously without manually running analyses or exporting data.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(SpeedometerOutline),
    title: "Instant Generation",
    description:
      "Reports are computed from pre-analyzed scoring data—no waiting for hours of processing. Your insights are ready when you are.",
    color: "#ec4899",
  },
]);

// FAQs
const faqs = ref([
  {
    question: "What data do the reports use?",
    answer:
      "Reports are built from AI-generated scores across multiple dimensions (aesthetics, composition, narrative, originality, technical quality), plus metadata like date, camera settings, and detected subjects. The scoring is done once per photo and the reports aggregate the results.",
  },
  {
    question: "How many photos do I need for useful reports?",
    answer:
      "You'll get basic insights with as few as 50 photos. For evolution tracking and meaningful trend analysis, 200+ photos spread over time gives the best results. The more photos you have, the richer the patterns.",
  },
  {
    question: "Can I compare different time periods?",
    answer:
      "Yes. The evolution report lets you compare quality metrics across months, quarters, or years. You can see exactly when your photography improved and in which specific dimensions.",
  },
  {
    question: "Are the reports automated or manual?",
    answer:
      "Fully automated. Once your photos are scored, reports are generated without any manual input. They update continuously as new photos are added to your catalog.",
  },
  {
    question: "Can I share reports with a mentor or community?",
    answer:
      "Reports are designed to be shareable. They're a great tool for getting feedback from mentors, peers, or photography communities—backed by data rather than subjective impressions alone.",
  },
  {
    question: "Do reports tell me what to shoot?",
    answer:
      "They suggest areas for growth based on your data. For example, if your composition scores are consistently lower than aesthetics, the report may suggest focusing on compositional exercises. It's guidance, not a prescription.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "photo_reports_page");
  navigateTo("/");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "photo_reports_page");
  window.open("https://app.photoreka.com/demo/report", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "photo_reports_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToScoring = () => {
  trackUserAction("navigate_to_scoring", "photo_reports_page");
  navigateTo("/photo_scoring");
};

const goToChat = () => {
  trackUserAction("navigate_to_chat", "photo_reports_page");
  navigateTo("/photo_chat");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "photo_reports",
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
  watch(reportsSection, reportsVisible);
  watch(howSection, howVisible);
  watch(featuresSection, featuresVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  trackEvent("page_view", { page: "photo_reports" });
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

/* ── Reports Grid Section ──────────────────────────────────── */
.reports-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.reports-grid.visible {
  opacity: 1;
  transform: translateY(0);
}
.report-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s ease;
}
.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
.report-icon {
  margin-bottom: 1rem;
}
.report-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.report-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}
.report-insights {
  list-style: none;
  padding: 0;
  margin: 0;
}
.report-insights li {
  position: relative;
  padding-left: 1.25rem;
  color: var(--premium-text-secondary);
  font-size: 0.9rem;
  line-height: 1.8;
}
.report-insights li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--premium-primary);
  font-weight: 600;
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
  .reports-grid,
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
  .reports-section,
  .features-section,
  .faq-section,
  .cta-section {
    padding: 4rem 1rem;
  }
}
</style>
