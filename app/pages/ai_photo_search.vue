<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="framer-page">
        <!-- Navigation Header -->
        <nav class="premium-nav">
          <div class="nav-container">
            <div class="nav-brand">
              <AppLogo layout="horizontal" :height="45" />
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
                    <n-icon size="16"><SearchOutline /></n-icon>
                    AI Search
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Find any photo by
                  <span class="gradient-text">describing it</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Stop scrolling through thousands of photos trying to remember
                  where something is. Just type what you remember—
                  <em>"rainy street at night with reflections"</em>,
                  <em>"smiling kid, warm light, shallow focus"</em>,
                  <em>"Blade Runner-style atmosphere"</em>—and Photoreka finds
                  it instantly.<br /><br />
                  No tagging. No folders. No metadata editing. Pure
                  <strong>semantic search</strong> powered by computer vision AI
                  that understands your photos the way you do.
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

              <!-- Right: Video -->
              <div class="hero-visual" :class="{ visible: heroVisible }">
                <div class="video-frame">
                  <video
                    class="hero-video"
                    src="/videos/explorer_1.mp4"
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

        <!-- Search Examples Section -->
        <section class="examples-section" ref="examplesSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: examplesVisible }">
              <h2 class="section-title">Search the way you think</h2>
              <p class="section-subtitle">
                Photoreka understands natural language, visual descriptions,
                emotions, styles, and even references to other photographers or
                films. If you can describe it, you can find it.
              </p>
            </div>

            <div class="examples-grid" :class="{ visible: examplesVisible }">
              <div
                v-for="(group, i) in searchExamples"
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

        <!-- How It Works Section -->
        <section class="how-section" ref="howSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="section-container" style="position: relative; z-index: 1">
            <div class="section-header" :class="{ visible: howVisible }">
              <h2 class="section-title">How it works</h2>
              <p class="section-subtitle">
                No black box. Here's exactly what happens when you type a query.
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
              <h2 class="section-title">More than keyword search</h2>
              <p class="section-subtitle">
                Photoreka's search understands context, mood, composition, and
                intent—not just the words in your metadata.
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

        <!-- Lightroom Section (secondary) -->
        <section class="lr-section" ref="lrSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -8s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -3s"></div>
          </div>
          <div class="hero-container">
            <div class="hero-layout lr-layout" :class="{ visible: lrVisible }">
              <!-- Left: Video -->
              <div class="hero-visual" :class="{ visible: lrVisible }">
                <div class="video-frame">
                  <video
                    class="hero-video"
                    src="/videos/lr_plugin.mp4"
                    poster="/home/video_lr_poster.jpg"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
              </div>

              <!-- Right: Content -->
              <div class="hero-content" :class="{ visible: lrVisible }">
                <div class="hero-badge lr-badge">
                  <span class="badge-content">
                    <img
                      src="/logos/lightroom_logo.png"
                      alt="Adobe Lightroom"
                      style="height: 18px; width: 18px; object-fit: contain"
                    />
                    Also available in Lightroom Classic
                  </span>
                </div>
                <h2 class="hero-title lr-title">
                  Search directly from
                  <span class="gradient-text">Lightroom Classic</span>
                </h2>
                <p class="hero-subtitle">
                  Already using Lightroom? Our official plugin brings the same
                  AI-powered natural language search directly into your existing
                  workflow—without leaving Lightroom or migrating your catalog.
                  Install it, analyze your library once, and start searching
                  naturally from within Lightroom's own panels.
                </p>

                <ul class="lr-features">
                  <li>
                    <div class="feature-icon-wrapper" style="color: #2563eb">
                      <n-icon size="18"><SyncOutline /></n-icon>
                    </div>
                    <span>Reads your existing catalog—nothing changes</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #8b5cf6">
                      <n-icon size="18"><ChatbubblesOutline /></n-icon>
                    </div>
                    <span>Search panel integrated inside Lightroom</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #22c55e">
                      <n-icon size="18"><LockClosedOutline /></n-icon>
                    </div>
                    <span>All processing runs locally on your machine</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #f59e0b">
                      <n-icon size="18"><LinkOutline /></n-icon>
                    </div>
                    <span>Compatible with Lightroom Classic 13.0+</span>
                  </li>
                </ul>

                <div class="hero-actions">
                  <n-button
                    type="warning"
                    size="large"
                    strong
                    @click="goToLightroomPlugin"
                  >
                    <template #icon>
                      <n-icon><DownloadOutline /></n-icon>
                    </template>
                    See the Plugin
                  </n-button>
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
                Everything you need to know about AI photo search
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
              <h2 class="cta-title">Stop searching. Start finding.</h2>
              <p class="cta-description">
                Your archive has been waiting to be understood. Try the demo and
                search your photos the way you've always wanted—by describing
                what you see, feel, and remember.
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
                  Want to see how photos are organized in space?
                  <a @click="goToAtlas" class="cta-link"
                    >Explore the 3D Atlas</a
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
  SearchOutline,
  KeyOutline,
  ChevronDownOutline,
  ChatbubblesOutline,
  SpeedometerOutline,
  LockClosedOutline,
  LinkOutline,
  SyncOutline,
  DownloadOutline,
  ColorPaletteOutline,
  ImagesOutline,
  EyeOutline,
  FlashOutline,
  HappyOutline,
  FilmOutline,
  GridOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("ai_photo_search");

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
const examplesSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const lrSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);
const videoRef = ref(null);

const heroVisible = ref(false);
const examplesVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const lrVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// Search example groups
const searchExamples = ref([
  {
    label: "By subject & scene",
    icon: markRaw(ImagesOutline),
    queries: [
      "street scene at dusk with neon signs",
      "child laughing on the beach",
      "empty road through a forest in autumn",
    ],
  },
  {
    label: "By mood & emotion",
    icon: markRaw(HappyOutline),
    queries: [
      "melancholic portrait in window light",
      "joyful chaos at a family gathering",
      "quiet solitude, minimalist composition",
    ],
  },
  {
    label: "By light & color",
    icon: markRaw(ColorPaletteOutline),
    queries: [
      "warm golden hour backlight",
      "high contrast black and white, deep shadows",
      "pastel tones, soft diffused light",
    ],
  },
  {
    label: "By style & reference",
    icon: markRaw(FilmOutline),
    queries: [
      "Blade Runner-style atmosphere",
      "Vivian Maier street photography feel",
      "cinematic wide angle, desaturated",
    ],
  },
  {
    label: "Super precise & logical",
    icon: markRaw(GridOutline),
    queries: [
      "silhouette with sun behind",
      "three people looking at the camera",
      "car speeding through rain at night",
    ],
  },
  {
    label: "Nuanced & broad",
    icon: markRaw(EyeOutline),
    queries: [
      "tension and release",
      "nostalgia mixed with hope",
      "abandoned but not desolate",
    ],
  },
]);

// How it works steps
const steps = ref([
  {
    title: "Your photos are analyzed once",
    description:
      "When you upload or sync your library, Photoreka's computer vision model processes each photo and extracts a high-dimensional visual embedding—a numerical representation that captures content, mood, composition, colors, and style.",
    color: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "Your query becomes a vector too",
    description:
      "When you type a search, Photoreka converts your text into a vector in the same semantic space as your photo embeddings using a multimodal AI model trained to align language and images.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Similarity search returns results instantly",
    description:
      "A fast vector similarity search (cosine distance) finds the photos whose embeddings are closest to your query vector. Results are ranked by semantic relevance—not by filename, date, or metadata.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "Results improve as you refine",
    description:
      "You can combine queries, filter by date or source, and use figurative or emotional language. The more specific your description, the more precise the results—even across 100,000+ photos.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(ChatbubblesOutline),
    title: "Natural Language",
    description:
      "Use everyday language—not boolean operators or keyword combinations. Describe a feeling, a scene, a lighting situation, or even a cinematic reference.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Visual Content Understanding",
    description:
      "The AI reads the actual content of each image: subjects, objects, actions, colors, lighting, composition, depth of field, and mood—without any manual input from you.",
    color: "#2563eb",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Instant Results",
    description:
      "Once your library is analyzed, searches are near-instantaneous regardless of catalog size. Vector similarity search is orders of magnitude faster than scanning metadata records.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(ImagesOutline),
    title: "Exact & Figurative Matches",
    description:
      'Search for literal content ("red umbrella in the rain") or figurative associations ("solitude", "tension before a decision", "euphoria"). Both work equally well.',
    color: "#22c55e",
  },
  {
    icon: markRaw(GridOutline),
    title: "Search by Visual Similarity",
    description:
      "Found a photo you love? Use it as a query. Photoreka will surface visually similar images from your archive based on embedding proximity—not just similar colors, but similar intent.",
    color: "#ec4899",
  },
  {
    icon: markRaw(SpeedometerOutline),
    title: "Scales to Any Archive",
    description:
      "Whether you have 100 or 5000 photos, search performance stays consistent. The more you have, the more powerful the discovery.",
    color: "#06b6d4",
  },
]);

// FAQs
const faqs = ref([
  {
    question: "Do I need to tag or keyword my photos first?",
    answer:
      "No. That's the whole point. Photoreka analyzes the visual content of your photos automatically when you upload or sync your library. You never need to add a single keyword or tag to search effectively.",
  },
  {
    question:
      "How is this different from searching in Google Photos or Apple Photos?",
    answer:
      "Google Photos and Apple Photos also use AI search, but they're optimized for consumer snapshots and basic object detection. Photoreka is built for photographers: it understands compositional intent, lighting mood, stylistic references, and figurative language—not just 'dog' or 'beach'. It also gives you full control over your archive without locking you into a proprietary cloud.",
  },
  {
    question: "Can it understand artistic or emotional descriptions?",
    answer:
      "Yes. You can search for 'melancholic portrait', 'chaotic energy', 'Hopper-esque loneliness', or 'cinematic tension' and get meaningful results. The underlying model was trained on a vast corpus of image-text pairs including photography criticism, captions, and art descriptions.",
  },
  {
    question: "How long does the initial analysis take?",
    answer:
      "Analysis runs in the background and typically processes around 1,000 photos per hour depending on your connection. You don't need to wait for it to finish—you can start searching as soon as a batch is ready.",
  },
  {
    question: "Are my photos sent to a server or processed locally?",
    answer:
      "Photoreka sends compressed previews (not your originals) to our servers for analysis. Your full-resolution files never leave your machine. The search index is stored on your account and no one else can access your library.",
  },
  {
    question: "Can I search across multiple sources at once?",
    answer:
      "Yes. If you have photos from Lightroom Classic, Google Photos, and local uploads all synced to Photoreka, a single search will return results across all of them simultaneously.",
  },
  {
    question: "What if the results aren't what I expected?",
    answer:
      "Try rephrasing your query. More descriptive language usually yields better results. You can also narrow down by date range, source, or combine the search with the 3D Atlas to visually explore adjacent clusters of similar photos.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "ai_photo_search_page");
  navigateTo("/");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_search_page");
  window.open("https://app.photoreka.com/demo", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "ai_photo_search_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "ai_photo_search_page");
  navigateTo("/photo_3D_atlas");
};

const goToLightroomPlugin = () => {
  trackUserAction("navigate_to_lr_plugin", "ai_photo_search_page");
  navigateTo("/lightroom_search_plugin");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "ai_photo_search",
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
  watch(examplesSection, examplesVisible);
  watch(howSection, howVisible);
  watch(featuresSection, featuresVisible);
  watch(lrSection, lrVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  if (videoRef.value) videoRef.value.playbackRate = 1.5;
  trackEvent("page_view", {
    page: "ai_photo_search",
    page_title: "AI Photo Search - Find Any Photo by Describing It | Photoreka",
  });
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

/* Badge */
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

/* LR Badge variant */
.lr-badge {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
  color: #f59e0b;
  opacity: 1;
  transform: none;
}

/* Title */
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

/* LR title variant */
.lr-title {
  font-size: clamp(2rem, 5vw, 3rem) !important;
  opacity: 1;
  transform: none;
}

/* Subtitle */
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

/* Actions */
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
.cta-note {
  font-size: 0.9rem;
  color: var(--premium-text-secondary);
}

/* Video visual */
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
  box-shadow:
    0 35px 70px -15px rgba(0, 0, 0, 0.5),
    0 0 0 1px var(--premium-border);
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

/* Gradient text */
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

/* ── Examples Section ──────────────────────────────────────── */
.examples-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(24px);
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
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.example-group:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
.example-group-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #06b6d4;
}
.example-queries {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.query-chip {
  display: block;
  font-size: 0.92rem;
  color: var(--premium-text-secondary);
  font-style: italic;
  line-height: 1.5;
  padding: 0.4rem 0.75rem;
  background: rgba(6, 182, 212, 0.05);
  border-radius: 8px;
  border-left: 2px solid rgba(6, 182, 212, 0.3);
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

/* ── LR Section ────────────────────────────────────────────── */
.lr-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}
.lr-layout {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.lr-layout.visible {
  opacity: 1;
}
.lr-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.lr-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--premium-text-primary);
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

/* ── FAQ Section ───────────────────────────────────────────── */
.faq-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
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
  .lr-layout {
    grid-template-columns: 1fr !important;
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
  .examples-grid,
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
  .how-section,
  .lr-section {
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
