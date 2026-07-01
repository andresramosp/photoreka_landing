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
              <!-- Left: Content -->
              <div class="hero-content">
                <div class="hero-badge" :class="{ visible: heroVisible }">
                  <span class="badge-content">
                    <n-icon size="16"><CloudUploadOutline /></n-icon>
                    Semantic Tag Map
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Your photo vocabulary
                  <span class="gradient-text">mapped in 2D space</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Thousands of tags from your photos—<em>people</em>,
                  <em>places</em>, <em>moods</em>, <em>objects</em>,
                  <em>weather</em>—arranged by semantic similarity in an
                  interactive map. Tags that share meaning cluster together.
                  <br /><br />
                  Pan, zoom, select, and <strong>search by navigating</strong>.
                  The closer two tags are, the more often they appear together
                  in the same kind of scene.
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

              <!-- Right: Video/Image -->
              <div class="hero-visual" :class="{ visible: heroVisible }">
                <div class="video-frame">
                  <!-- TODO: Replace with video element when /videos/tag_cloud.mp4 is ready -->
                  <img
                    class="hero-video"
                    src="/home/tag_cloud_poster.png"
                    alt="Tag Cloud visualization - Photo vocabulary mapped in 2D semantic space"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tag Groups Section -->
        <section class="groups-section" ref="groupsSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: groupsVisible }">
              <h2 class="section-title">Every tag, color-coded by category</h2>
              <p class="section-subtitle">
                AI assigns each tag to a semantic group. The color palette
                instantly tells you what type of concept you're looking at—and
                you can filter the map to focus on just the groups that matter
                to you.
              </p>
            </div>

            <div class="groups-grid" :class="{ visible: groupsVisible }">
              <div
                v-for="(group, i) in tagGroups"
                :key="i"
                class="group-card"
                :style="{ transitionDelay: `${i * 60}ms` }"
              >
                <div
                  class="group-dot"
                  :style="{ background: group.color }"
                ></div>
                <div class="group-info">
                  <span class="group-name">{{ group.name }}</span>
                  <span class="group-examples">{{ group.examples }}</span>
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
              <h2 class="section-title">From photos to a living map</h2>
              <p class="section-subtitle">
                The tag cloud is built automatically from AI analysis of your
                photos. No manual tagging—ever.
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
              <h2 class="section-title">More than a word cloud</h2>
              <p class="section-subtitle">
                Position carries meaning. The Tag Cloud is a navigable semantic
                space where exploration is search.
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

        <!-- Search Bridge Section -->
        <section class="bridge-section" ref="bridgeSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -8s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -3s"></div>
          </div>
          <div class="hero-container">
            <div
              class="hero-layout bridge-layout"
              :class="{ visible: bridgeVisible }"
            >
              <!-- Left: Content -->
              <div class="hero-content" :class="{ visible: bridgeVisible }">
                <div class="hero-badge" style="opacity: 1; transform: none">
                  <span class="badge-content">
                    <n-icon size="16"><SearchOutline /></n-icon>
                    Navigation as Search
                  </span>
                </div>
                <h2
                  class="hero-title"
                  style="
                    font-size: var(--fs-hero-sm);
                    opacity: 1;
                    transform: none;
                  "
                >
                  Pan into a cluster,
                  <span class="gradient-text">instantly see those photos</span>
                </h2>
                <p class="hero-subtitle" style="opacity: 1; transform: none">
                  Enable <strong>dynamic search</strong> and the Tag Cloud
                  becomes a spatial photo browser. As you zoom and pan,
                  Photoreka automatically queries your catalog with the most
                  visible tags and streams the results—no button needed. Arrive
                  in the <em>"melancholy urban"</em> cluster and your best
                  matching photos appear instantly.
                </p>
                <ul class="bridge-features">
                  <li>
                    <div class="feature-icon-wrapper" style="color: #06b6d4">
                      <n-icon size="18"><MapOutline /></n-icon>
                    </div>
                    <span
                      >Spatial browsing: move the map, change the results</span
                    >
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #8b5cf6">
                      <n-icon size="18"><ExtensionPuzzleOutline /></n-icon>
                    </div>
                    <span
                      >Rectangle selection to hand-pick any tag
                      combination</span
                    >
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #22c55e">
                      <n-icon size="18"><FilterOutline /></n-icon>
                    </div>
                    <span
                      >Filter by group to focus on mood, place, or subject</span
                    >
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #f59e0b">
                      <n-icon size="18"><SpeedometerOutline /></n-icon>
                    </div>
                    <span
                      >Works across catalogs of 100,000+ photos in real
                      time</span
                    >
                  </li>
                </ul>
                <div class="hero-actions" style="opacity: 1; transform: none">
                  <n-button type="info" size="large" strong @click="goToSearch">
                    <template #icon>
                      <n-icon><SearchOutline /></n-icon>
                    </template>
                    See AI Photo Search
                  </n-button>
                </div>
              </div>

              <!-- Right: Video/Image -->
              <div class="hero-visual" :class="{ visible: bridgeVisible }">
                <div class="video-frame">
                  <!-- TODO: Replace with video element when /videos/search.mp4 is ready -->
                  <img
                    class="hero-video"
                    src="/home/tag_cloud_poster_detailed.png"
                    alt="AI Photo Search - Dynamic tag cloud navigation with real-time photo results"
                  />
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
                Everything you need to know about the Tag Cloud
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
              <h2 class="cta-title">Your catalog has a shape. Discover it.</h2>
              <p class="cta-description">
                Every photo you've ever taken adds a point to your personal
                semantic universe. Analyze your library and see the full map for
                the first time.
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
                  Want to see your photos in 3D space?
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
  KeyOutline,
  ChevronDownOutline,
  SearchOutline,
  MapOutline,
  FilterOutline,
  SpeedometerOutline,
  ExtensionPuzzleOutline,
  ColorPaletteOutline,
  ExpandOutline,
  GridOutline,
  EyeOutline,
  LayersOutline,
  FlashOutline,
  ResizeOutline,
  CloudUploadOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("photo_tag_cloud");

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.photoreka.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Photo Tag Cloud",
            item: "https://www.photoreka.com/photo_tag_cloud",
          },
        ],
      }),
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
const groupsSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const bridgeSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

const heroVisible = ref(false);
const groupsVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const bridgeVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// Tag groups color-coded as in the real app
const tagGroups = ref([
  {
    name: "Mood & Atmosphere",
    color: "#a78bfa",
    examples: "melancholy, joy, tension, solitude, intimacy…",
  },
  {
    name: "Environment & Place",
    color: "#10b981",
    examples: "urban, forest, interior, coastal, industrial…",
  },
  {
    name: "Objects & Things",
    color: "#60a5fa",
    examples: "bicycle, window, door, shadow, reflection…",
  },
  {
    name: "People & Figures",
    color: "#f472b6",
    examples: "child, silhouette, crowd, gesture, eye contact…",
  },
  {
    name: "Weather & Light",
    color: "#38bdf8",
    examples: "fog, golden hour, overcast, rain, harsh light…",
  },
  {
    name: "Animals",
    color: "#fbbf24",
    examples: "bird, dog, cat, horse, wildlife…",
  },
  {
    name: "Geographic Names",
    color: "#34d399",
    examples: "Paris, Havana, Tokyo, river, mountain…",
  },
  {
    name: "Symbols & Signs",
    color: "#f87171",
    examples: "graffiti, flag, cross, neon, advertisement…",
  },
  {
    name: "Abstract Concepts",
    color: "#c084fc",
    examples: "isolation, belonging, chaos, rhythm, contrast…",
  },
  {
    name: "Other / Misc",
    color: "#9ca3af",
    examples: "patterns, textures, detail, miscellaneous…",
  },
]);

// How it works steps
const steps = ref([
  {
    title: "AI analyzes every photo",
    description:
      "Photoreka runs each image through a computer vision model that extracts dozens of semantic tags per photo: subjects, moods, settings, lighting, abstract themes, and cultural references.",
    color: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "Tags are embedded in semantic space",
    description:
      "Each unique tag is converted into a high-dimensional semantic vector. Tags with similar meaning—or that tend to co-occur in similar scenes—end up geometrically close in this space.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Dimensionality reduction maps them to 2D",
    description:
      "UMAP reduces the high-dimensional embedding to two coordinates, preserving local neighborhood structure. The result is a 2D plane where clusters are semantically meaningful—not random.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "PixiJS renders the interactive map",
    description:
      "All tags are drawn with WebGL via PixiJS. Labels appear dynamically as you zoom in, collision-aware so they never overlap. Dot size reflects how many photos carry that tag.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
  {
    title: "Navigate and search",
    description:
      "Click a tag to find all photos with it. Drag a rectangle to combine multiple tags. Enable dynamic search and the visible area becomes a live query—the map IS the search interface.",
    color: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(LayersOutline),
    title: "Semantic positioning",
    description:
      'Tags are placed by meaning, not alphabetically or by frequency. "Rain" and "fog" live next to "melancholy" and "mist"—because that\'s how they relate in real photographs.',
    color: "#06b6d4",
  },
  {
    icon: markRaw(ColorPaletteOutline),
    title: "10 color-coded groups",
    description:
      "At a glance, you see which area of the map is about people, which is about place, which is about weather. Filter to a single group and the map instantly focuses.",
    color: "#a78bfa",
  },
  {
    icon: markRaw(ExpandOutline),
    title: "Balloon expansion",
    description:
      "Dense clusters can be expanded with a slider, spreading tags apart so you can read and interact with previously overlapping labels without losing their relative positions.",
    color: "#22c55e",
  },
  {
    icon: markRaw(GridOutline),
    title: "Rectangle multi-select",
    description:
      "Hold Ctrl (or Cmd) and drag a selection rectangle over any area of the map. All tags inside are combined into a single AND/OR query against your photo catalog.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Collision-aware labels",
    description:
      "Labels only appear when there's room to show them without overlapping. As you zoom in, more labels become visible—dense areas reveal their detail progressively.",
    color: "#2563eb",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Dynamic search mode",
    description:
      "Toggle dynamic search and the Tag Cloud becomes a live photo browser. The most visible tags on screen are automatically used as a query—real-time results with every pan.",
    color: "#ec4899",
  },
]);

// FAQs
const faqs = ref([
  {
    question: "Where do the tags come from?",
    answer:
      "Tags are extracted automatically by Photoreka's AI when you analyze your photos. The model identifies subjects, places, moods, lighting conditions, objects, animals, and abstract themes—typically generating 20–50 tags per image. You never have to add tags manually.",
  },
  {
    question: "What does the position of a tag actually mean?",
    answer:
      "Position reflects semantic similarity. Tags that share meaning or tend to appear in the same visual contexts are placed near each other. Distance between tags corresponds to conceptual distance—not popularity, not alphabetical order. The positions are computed using UMAP dimensionality reduction applied to AI-generated semantic embeddings.",
  },
  {
    question: "How is this different from a regular tag list or word cloud?",
    answer:
      "A word cloud shows size by frequency. A tag list is alphabetical. The Photoreka Tag Cloud shows meaning by position—it is a spatial map of your photo vocabulary. Nearby tags are related; distant ones are unrelated. You can discover connections you'd never notice in a flat list.",
  },
  {
    question: "Can I search photos directly from the Tag Cloud?",
    answer:
      "Yes. Click any tag to instantly search your catalog for photos with that tag. Drag a rectangle to select multiple tags and search for photos matching any of them. Enable dynamic search to automatically query as you navigate—the visible portion of the map defines the active search.",
  },
  {
    question: "What is balloon expansion?",
    answer:
      "Balloon expansion is a slider that scales all tag positions radially outward from the center. It's useful when a cluster is very dense and labels overlap even at high zoom. Expanding the balloon spreads tags apart while preserving their relative neighborhood structure.",
  },
  {
    question: "Can I filter the map to only show certain types of tags?",
    answer:
      "Yes. The config panel lets you toggle individual groups on or off (mood, environment, people, objects, weather, etc.). You can also set a minimum photo count to hide rare tags, and a maximum tag limit to keep the map readable.",
  },
  {
    question: "How many tags can the Tag Cloud display at once?",
    answer:
      "The renderer handles tens of thousands of tags smoothly using WebGL. By default the map shows up to 10,000 tags, configurable up to the full set. Labels are shown selectively based on zoom level and available screen space, so even large catalogs feel fast and navigable.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. The Tag Cloud supports touch gestures: pinch to zoom, single-finger pan, and tap to select tags. Drag multi-select is available with two-finger interaction. Mobile keyboards (WASD navigation) are disabled automatically.",
  },
]);

// Runtime config
const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "photo_tag_cloud_page");
  navigateTo("/");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "photo_tag_cloud_page");
  window.open("https://app.photoreka.com/demo/tagcloud", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "photo_tag_cloud_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToSearch = () => {
  trackUserAction("navigate_to_search", "photo_tag_cloud_page");
  navigateTo("/ai_photo_search");
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "photo_tag_cloud_page");
  navigateTo("/photo_3D_atlas");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "photo_tag_cloud",
    faq_index: index,
    action: wasOpen ? "close" : "open",
  });
};

// Scroll animations
const setupScrollAnimations = () => {
  const opts = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };
  const watch = (section, flag) => {
    if (!section.value) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        flag.value = true;
        observer.disconnect();
      }
    }, opts);
    observer.observe(section.value);
  };
  watch(heroSection, heroVisible);
  watch(groupsSection, groupsVisible);
  watch(howSection, howVisible);
  watch(featuresSection, featuresVisible);
  watch(bridgeSection, bridgeVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  trackEvent("page_view", {
    page: "photo_tag_cloud",
    page_title:
      "Photo Tag Cloud - Explore Your Photo Vocabulary in 2D | Photoreka",
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
  grid-template-columns: 1fr 1.3fr;
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
  background: rgba(167, 139, 250, 0.1);
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 50px;
  font-size: var(--fs-sm);
  font-weight: var(--font-weight-semibold);
  color: #a78bfa;
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

/* Title */
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

/* Subtitle */
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

/* Video visual */
.hero-visual {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 32px 64px rgba(0, 0, 0, 0.4),
    0 0 80px rgba(167, 139, 250, 0.12);
}
.hero-visual.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.hero-visual:hover {
  transform: translateY(-8px) scale(1);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 40px 80px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(167, 139, 250, 0.2);
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
  background: linear-gradient(135deg, #a78bfa 0%, #06b6d4 60%, #34d399 100%);
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
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
  top: -300px;
  right: -200px;
}
.orb-2 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #06b6d4, #2563eb);
  bottom: -200px;
  left: -250px;
  animation-delay: -10s;
}
.orb-3 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #34d399, #10b981);
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
    transform: translate(30px, -20px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 15px) scale(0.97);
  }
}

/* ── Section shell ─────────────────────────────────────────── */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
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

/* ── Tag Groups Section ────────────────────────────────────── */
.groups-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  max-width: 1100px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.groups-grid.visible {
  opacity: 1;
  transform: translateY(0);
}
.group-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 14px;
  transition: all 0.4s ease;
}
.group-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
.group-dot {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-top: 4px;
  box-shadow: 0 0 8px currentColor;
}
.group-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.group-name {
  font-size: var(--fs-base);
  font-weight: var(--font-weight-bold);
}
.group-examples {
  font-size: var(--fs-xs);
  color: var(--premium-text-secondary);
  font-style: italic;
  line-height: var(--line-height-relaxed);
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

/* ── Features Section ──────────────────────────────────────── */
.features-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
.feature-icon {
  margin-bottom: 1rem;
}
.feature-title {
  font-size: var(--fs-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.5rem;
}
.feature-description {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
}

/* ── Bridge (Search) Section ───────────────────────────────── */
.bridge-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}
.bridge-layout {
  grid-template-columns: 1fr 1fr;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.bridge-layout.visible {
  opacity: 1;
  transform: translateY(0);
}
.bridge-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.bridge-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: var(--fs-base);
  color: var(--premium-text-secondary);
}
.feature-icon-wrapper {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
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
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(24px);
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
  overflow: hidden;
  transition: all 0.3s ease;
}
.faq-item:hover,
.faq-item.active {
  border-color: rgba(167, 139, 250, 0.4);
}
.faq-question {
  width: 100%;
  background: transparent;
  border: none;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  color: var(--premium-text-primary);
  font-size: var(--fs-md);
  font-weight: var(--font-weight-semibold);
  text-align: left;
  transition: all 0.3s ease;
}
.faq-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.faq-icon.rotated {
  transform: rotate(180deg);
}
.faq-answer {
  padding: 0 1.5rem 1.25rem;
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
  animation: fadeIn 0.3s ease;
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
  padding: 8rem 2rem;
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
  font-weight: var(--font-weight-black);
  margin-bottom: 1.5rem;
  letter-spacing: var(--letter-spacing-tight);
}
.cta-description {
  font-size: var(--fs-lg);
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  margin-bottom: 2.5rem;
}
.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.cta-extra {
  font-size: var(--fs-base);
  color: var(--premium-text-secondary);
}
.cta-link {
  color: #a78bfa;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}
.cta-link:hover {
  color: #c4b5fd;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 968px) {
  .hero-layout,
  .bridge-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero-visual {
    order: -1;
  }
}

@media (max-width: 768px) {
  .framer-hero {
    padding: 6rem 1.25rem 4rem;
  }
  .groups-section,
  .how-section,
  .features-section,
  .bridge-section,
  .faq-section,
  .cta-section {
    padding: 4rem 1.25rem;
  }
  .hero-title {
    font-size: var(--fs-h1);
  }
  .groups-grid {
    grid-template-columns: 1fr 1fr;
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
  .step-card {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
