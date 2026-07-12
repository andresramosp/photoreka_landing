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
                    <n-icon size="16"><AlbumsOutline /></n-icon>
                    AI Photo Organizer
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Organize your photo library
                  <span class="gradient-text"
                    >without moving a single file</span
                  >
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Photoreka is the
                  <strong>AI curation layer for your photo archive</strong>. It
                  sits on top of
                  <strong>Lightroom Classic, Google Photos, Dropbox</strong> or
                  local folders and analyzes your library once—making it
                  searchable in natural language, scored for quality, and mapped
                  by visual similarity.
                </p>
                <p class="hero-note" :class="{ visible: heroVisible }">
                  No migration. No new catalog. No subscription—pay per analyzed
                  batch.
                </p>
                <p class="hero-note" :class="{ visible: heroVisible }">
                  100% cloud-based: runs in your browser, no install—works the
                  same on Windows, Mac, and Linux.
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

              <!-- Right: Visual -->
              <div class="hero-visual" :class="{ visible: heroVisible }">
                <div class="video-frame">
                  <img
                    class="hero-image"
                    src="/home/dashboard.png"
                    alt="Photoreka AI photo organizer dashboard showing an analyzed photo catalog"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Positioning Section -->
        <section class="pillars-section" ref="pillarsSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: pillarsVisible }">
              <h2 class="section-title">
                Your storage is fine. Your findability isn't.
              </h2>
              <p class="section-subtitle">
                Most photo organizers ask you to rebuild your library inside
                their system. Photoreka takes the opposite approach: your files
                stay exactly where they are, and the intelligence comes to them.
              </p>
            </div>

            <div class="pillars-grid" :class="{ visible: pillarsVisible }">
              <div
                v-for="(pillar, i) in pillars"
                :key="i"
                class="pillar-card"
                :style="{ transitionDelay: `${i * 100}ms` }"
              >
                <div class="pillar-icon" :style="{ color: pillar.color }">
                  <n-icon size="32">
                    <component :is="pillar.icon" />
                  </n-icon>
                </div>
                <h3 class="pillar-title">{{ pillar.title }}</h3>
                <p class="pillar-description">{{ pillar.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Atlas Showcase Section -->
        <section class="atlas-section" ref="atlasSection">
          <div class="atlas-header" :class="{ visible: atlasVisible }">
            <h2 class="section-title">Your entire archive, in one image</h2>
            <p class="section-subtitle">
              Once analyzed, every photo you own takes its place on a single
              map—clustered by what the images actually are, not by the folder
              they landed in. Dense continents are the work you keep returning
              to. The dark space between them is the work you haven't made yet.
            </p>
          </div>

          <div class="atlas-figure" :class="{ visible: atlasVisible }">
            <img
              class="atlas-image"
              src="/atlas/2d.png"
              alt="Photoreka 2D Atlas: an entire photo library organized into visual similarity clusters on a single navigable map"
              loading="lazy"
            />
          </div>

          <div class="atlas-caption" :class="{ visible: atlasVisible }">
            <p>
              This is organization as a whole, not a folder at a time.
              <NuxtLink to="/photo_3D_atlas" class="cta-link"
                >Explore the 2D &amp; 3D Atlas →</NuxtLink
              >
            </p>
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
              <h2 class="section-title">
                From folder chaos to organized catalog
              </h2>
              <p class="section-subtitle">
                One analysis pass replaces years of manual tagging, rating, and
                album building.
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
                Everything an AI photo organizer should give you
              </h2>
              <p class="section-subtitle">
                Organization is not folders and stars. It's being able to find,
                rank, and understand any part of your archive in seconds.
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
                <h3 class="feature-title">
                  <NuxtLink
                    v-if="feature.link"
                    :to="feature.link"
                    class="feature-link"
                    >{{ feature.title }}</NuxtLink
                  >
                  <template v-else>{{ feature.title }}</template>
                </h3>
                <p class="feature-description">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Alternatives Callout Section -->
        <section class="alt-section" ref="altSection">
          <div class="hero-background">
            <div class="gradient-orb orb-2" style="animation-delay: -8s"></div>
          </div>
          <div class="section-container" style="position: relative; z-index: 1">
            <div class="alt-callout" :class="{ visible: altVisible }">
              <div class="alt-callout-inner">
                <h3 class="alt-callout-title">
                  Not another DAM. Not another desktop app.
                </h3>
                <p class="alt-callout-text">
                  Excire Foto, Peakto, and Mylio are capable desktop organizers
                  —but each one asks something of you: a new catalog to import
                  into, a Mac-only environment, or a monthly subscription.
                  Photoreka asks for none of it.
                </p>
                <div class="alt-features">
                  <div class="alt-feature">
                    <span class="alt-check">✓</span>
                    <span
                      ><strong>Cloud-based, runs in the browser</strong> on
                      Windows, Mac, and Linux — unlike Peakto
                      (Mac-only)</span
                    >
                  </div>
                  <div class="alt-feature">
                    <span class="alt-check">✓</span>
                    <span
                      ><strong>Pay per analyzed batch</strong>, not per month —
                      your organized catalog stays organized</span
                    >
                  </div>
                  <div class="alt-feature">
                    <span class="alt-check">✓</span>
                    <span
                      >Goes beyond organizing into <strong>curation</strong>:
                      quality scoring, portfolio sequencing, and an AI assistant
                      for your catalog</span
                    >
                  </div>
                  <div class="alt-feature">
                    <span class="alt-check">✓</span>
                    <span
                      >No query length limit on search — unlike CLIP-based tools
                      like Excire (~77-token cap)</span
                    >
                  </div>
                </div>
                <!-- <p class="alt-note">
                  Deciding between tools? Read our honest comparison:
                  <NuxtLink
                    to="/blog/peakto-alternative-windows"
                    class="cta-link"
                    >Photoreka vs Peakto — AI photo curation beyond the
                    Mac</NuxtLink
                  >.
                </p> -->
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
                What photographers ask before organizing their library with AI
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
              <h2 class="cta-title">Your archive, organized by the weekend.</h2>
              <p class="cta-description">
                Connect your sources, let the analysis run, and open a catalog
                that finally answers back. Your files never move.
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
                  Using Lightroom Classic?
                  <NuxtLink to="/lightroom_search_plugin" class="cta-link"
                    >See the official plugin</NuxtLink
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
  AlbumsOutline,
  SearchOutline,
  PricetagsOutline,
  BarChartOutline,
  GitNetworkOutline,
  CopyOutline,
  MapOutline,
  CloudOutline,
  GlobeOutline,
  FlashOutline,
  WalletOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("ai_photo_organizer");

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
const pillarsSection = ref(null);
const atlasSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const altSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

const heroVisible = ref(false);
const pillarsVisible = ref(false);
const atlasVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const altVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// Positioning pillars
const pillars = ref([
  {
    icon: markRaw(CloudOutline),
    title: "Works on top of your storage",
    description:
      "Lightroom Classic, Google Photos, Dropbox, local folders—Photoreka reads from all of them and organizes across them. Your originals never move, and your folder structure survives untouched.",
    color: "#2563eb",
  },
  {
    icon: markRaw(GlobeOutline),
    title: "Cloud-based, runs on any OS",
    description:
      "No app to install, no OS-specific build. Photoreka is a web-based AI photo organizer that runs in your browser—open the same catalog from Windows, Mac, or Linux.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Analyze once, organized forever",
    description:
      "A single AI analysis pass extracts tags, quality scores, and visual embeddings from every photo. That intelligence persists—no re-processing, no ongoing maintenance, no manual tagging ever again.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(WalletOutline),
    title: "No subscription",
    description:
      "You pay per analyzed photo batch, once. Most tools charge you monthly to keep accessing your own organization. With Photoreka, an organized catalog is something you own.",
    color: "#22c55e",
  },
]);

// How it works steps
const steps = ref([
  {
    title: "Connect your photo sources",
    description:
      'Link your Lightroom Classic catalog via the <a href="/lightroom_search_plugin">official plugin</a>, connect Google Photos or Dropbox, or upload local files. Photoreka works from compressed previews—your full-resolution originals stay on your machine.',
    color: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "AI analyzes your library once",
    description:
      "Computer vision processes each photo to extract semantic tags, multi-dimensional quality scores, visual embeddings, and near-duplicate signatures. Analysis runs in the background at roughly 1,000 photos per hour.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Your catalog becomes navigable",
    description:
      "Search in natural language, sort by quality dimension, browse the tag cloud, fly through the 2D/3D similarity map, or see everything on a world map. Every view is generated automatically—zero manual organization.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "Curate from an organized base",
    description:
      'Once organized, the real work starts: cull the weak frames, surface hidden gems, and build sequenced selections with the <a href="/photography_portfolio_builder">Portfolio Builder</a>—for exhibitions, photobooks, or client delivery.',
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(SearchOutline),
    title: "Natural Language Search",
    description:
      "Find any photo by describing it—subject, mood, light, or cinematic reference. Three search modes, no query length limit, no tagging required.",
    color: "#06b6d4",
    link: "/ai_photo_search",
  },
  {
    icon: markRaw(PricetagsOutline),
    title: "Automatic AI Tagging",
    description:
      "Every photo receives semantic tags across mood, environment, subjects, weather, and more—browsable as an interactive 2D tag map of your whole vocabulary.",
    color: "#8b5cf6",
    link: "/photo_tag_cloud",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Quality Scoring & Ranking",
    description:
      "9+ scoring dimensions—aesthetics, composition, narrative, originality—rank your entire catalog so your strongest work surfaces automatically.",
    color: "#f59e0b",
    link: "/photo_scoring",
  },
  {
    icon: markRaw(GitNetworkOutline),
    title: "2D/3D Visual Maps",
    description:
      "See your whole archive as a navigable space where similar photos cluster together. Spot themes, gaps, and stylistic shifts no grid can reveal.",
    color: "#2563eb",
    link: "/photo_3D_atlas",
  },
  {
    icon: markRaw(CopyOutline),
    title: "Duplicate Detection",
    description:
      "Near-duplicate detection flags over-shot sequences and redundant frames, so your organized catalog starts from an intentional body of work.",
    color: "#ec4899",
  },
  {
    icon: markRaw(MapOutline),
    title: "World Map & Geo Recovery",
    description:
      "Photos with GPS land on your world map automatically—and AI geo-inference recovers locations for the archive shots that never had GPS metadata.",
    color: "#22c55e",
    link: "/ai_geo_inference",
  },
]);

// FAQs
const faqs = ref([
  {
    question: "Is Photoreka a DAM or photo management software?",
    answer:
      "Photoreka is the layer most DAMs are missing: intelligence. It doesn't store your originals or replace your folder structure—it analyzes your library and gives you semantic search, quality scores, automatic tags, and visual maps on top of the storage you already use (Lightroom, Google Photos, Dropbox, or local files).",
  },
  {
    question: "Do I have to migrate my photo library or rebuild my catalog?",
    answer:
      "No. Your files stay exactly where they are. Photoreka reads your existing sources—including your Lightroom Classic catalog via the official plugin—and builds its analysis from compressed previews. Nothing is moved, renamed, or reorganized.",
  },
  {
    question: "How is Photoreka different from Excire Foto or Peakto?",
    answer:
      "Excire Foto and Peakto are desktop apps (Peakto is Mac-only, subscription-based). Photoreka runs in the browser on any OS, is paid per analyzed photo batch instead of a subscription, and goes beyond organization into curation: multi-dimensional quality scoring, three-mode semantic search with no query length limit, portfolio sequencing, and an AI assistant for your catalog.",
  },
  {
    question: "Does Photoreka replace Lightroom?",
    answer:
      "No—it complements it. Lightroom remains your editor and catalog of record. Photoreka adds what Lightroom doesn't have: natural language search, AI quality scoring, style reports, and visual maps of your whole archive. The Lightroom Classic plugin keeps both in sync.",
  },
  {
    question: "How many photos can I organize with Photoreka?",
    answer:
      "The sweet spot is a catalog of up to 20,000 photos, with up to 50,000 tested and workable. Photoreka is built for a curated body of work rather than a raw dump of every file ever captured—duplicate detection is built in to help you get there.",
  },
  {
    question: "What happens to my photos and who can see them?",
    answer:
      "Photoreka only stores a reduced version of your images on secure servers for analysis. Your photos are not shared with anyone and you retain 100% of the rights to your work. Analysis uses proprietary and third-party services under agreements that prevent retaining or reusing your photos.",
  },
  {
    question: "Do I need to keep paying to keep my library organized?",
    answer:
      "No. Analysis is a one-time batch payment per set of photos. After that, most tools are usable for free with daily limits, or with credits for unlimited access. There is no monthly fee to keep what's already analyzed.",
  },
  {
    question: "Is Photoreka a cloud photo organizer, and does it work on Windows?",
    answer:
      "Yes. Photoreka is a cloud-based AI photo organizer: it runs entirely in your web browser, with no software to install and no OS-specific build. That means it works the same way on Windows, Mac, and Linux—unlike desktop organizers such as Peakto, which is Mac-only.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "ai_photo_organizer_page");
  navigateTo("/");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_organizer_page");
  window.open("https://app.photoreka.com/demo/search", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "ai_photo_organizer_page");
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
    page: "ai_photo_organizer",
    faq_index: index,
    action: wasOpen ? "close" : "open",
  });
};

// Scroll animations
const setupScrollAnimations = () => {
  const opts = { threshold: 0, rootMargin: "0px 0px -50px 0px" };
  const watch = (section, flag) => {
    if (!section.value) return;
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) flag.value = true;
      });
    }, opts).observe(section.value);
  };
  watch(heroSection, heroVisible);
  watch(pillarsSection, pillarsVisible);
  watch(atlasSection, atlasVisible);
  watch(howSection, howVisible);
  watch(featuresSection, featuresVisible);
  watch(altSection, altVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  trackEvent("page_view", {
    page: "ai_photo_organizer",
    page_title:
      "AI Photo Organizer — No Migration, No Subscription | Photoreka",
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
  grid-template-columns: minmax(360px, 460px) 1fr;
  gap: 3.5rem;
  align-items: center;
}
/* Overrides the centered .hero-content in global.scss — this hero is
   an asymmetric two-column layout, so the copy stays left-aligned. */
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 1.5rem;
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.3);
  border-radius: 50px;
  font-size: var(--fs-sm);
  font-weight: var(--font-weight-semibold);
  color: #2563eb;
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
  font-size: clamp(2.25rem, 3.2vw, 3.1rem);
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
  max-width: 460px;
  margin: 0;
  font-size: var(--fs-base);
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

/* Note under subtitle */
.hero-note {
  max-width: 460px;
  margin: -0.5rem 0 0;
  font-size: var(--fs-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--premium-text-primary);
  line-height: var(--line-height-relaxed);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
}
.hero-note.visible {
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

/* Visual — bleeds past the right edge of the viewport on desktop.
   The negative margin cancels the hero padding plus the centering
   gutter of the 1400px container, then overshoots so the screenshot
   is cropped by .framer-hero's overflow. */
.hero-visual {
  --hero-bleed-overshoot: 4rem;
  margin-right: calc(
    -1 *
      (
        2rem + max(0px, (100vw - 4rem - 1400px) / 2) +
          var(--hero-bleed-overshoot)
      )
  );
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
  box-shadow:
    -25px 25px 60px -12px rgba(0, 0, 0, 0.45),
    0 0 0 1px var(--premium-border);
}
.hero-visual.visible {
  opacity: 1;
  transform: translateY(0);
}
.video-frame {
  position: relative;
  width: 100%;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
  background: var(--premium-bg-card);
}
.hero-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #22c55e 100%);
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
  background: linear-gradient(135deg, #2563eb, #06b6d4);
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
  background: linear-gradient(135deg, #22c55e, #06b6d4);
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

/* ── Pillars Section ───────────────────────────────────────── */
.pillars-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.pillars-grid.visible {
  opacity: 1;
  transform: translateY(0);
}
.pillar-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.pillar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
.pillar-icon {
  margin-bottom: 1.5rem;
}
.pillar-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.75rem;
}
.pillar-description {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
}

/* ── Atlas Showcase Section ────────────────────────────────────
   Deliberately dark in both themes: the screenshot is a dark-UI
   product shot and reads as a spotlight band. Text colors are set
   explicitly so light mode doesn't inherit dark-on-dark. */
.atlas-section {
  position: relative;
  padding: 4.5rem 0 3.5rem;
  overflow: hidden;
  background: #05070d;
  border-top: 1px solid var(--premium-border);
  border-bottom: 1px solid var(--premium-border);
}
.atlas-header {
  max-width: 960px;
  margin: 0 auto 2.25rem;
  padding: 0 2rem;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.atlas-header.visible {
  opacity: 1;
  transform: translateY(0);
}
.atlas-header .section-title {
  color: #f8fafc;
}
.atlas-header .section-subtitle {
  color: #94a3b8;
  max-width: 760px;
}
.atlas-figure {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  transition: all 1.1s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
}
.atlas-figure.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
/* Big enough to read the clusters, capped so it never becomes a
   full-screen takeover. */
.atlas-image {
  width: auto;
  height: auto;
  max-width: min(1400px, 100%);
  max-height: 70vh;
  display: block;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow:
    0 40px 90px -20px rgba(0, 0, 0, 0.75),
    0 0 120px -40px rgba(37, 99, 235, 0.35);
}
.atlas-caption {
  max-width: 780px;
  margin: 2.25rem auto 0;
  padding: 0 2rem;
  text-align: center;
  font-size: var(--fs-base);
  color: #94a3b8;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}
.atlas-caption.visible {
  opacity: 1;
  transform: translateY(0);
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
.step-description :deep(a) {
  color: var(--premium-primary);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
}
.step-description :deep(a):hover {
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
.feature-link {
  color: var(--premium-text-primary);
  text-decoration: none;
}
.feature-link:hover {
  color: var(--premium-primary);
  text-decoration: underline;
}
.feature-description {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
}

/* ── Alternatives Callout ──────────────────────────────────── */
.alt-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}
.alt-callout {
  max-width: 900px;
  margin: 0 auto;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 20px;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.18s;
}
.alt-callout.visible {
  opacity: 1;
  transform: translateY(0);
}
.alt-callout-inner {
  padding: 2.5rem;
}
.alt-callout-title {
  font-size: var(--fs-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.75rem;
}
.alt-callout-text {
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  font-size: var(--fs-base);
  margin-bottom: 1.5rem;
}
.alt-features {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}
.alt-feature {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  font-size: var(--fs-base);
  color: var(--premium-text-primary);
  line-height: var(--line-height-relaxed);
}
.alt-check {
  color: #22c55e;
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
  margin-top: 1px;
}
.alt-note {
  font-size: var(--fs-sm);
  color: var(--premium-text-secondary);
  padding-top: 1.1rem;
  border-top: 1px solid var(--premium-border);
  line-height: var(--line-height-loose);
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
  .hero-subtitle,
  .hero-note {
    max-width: 100%;
  }
  .hero-actions {
    justify-content: center;
  }
  /* No bleed when stacked: the screenshot returns to the container */
  .hero-visual {
    margin-right: 0;
    border-radius: 20px;
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.4),
      0 0 0 1px var(--premium-border);
  }
  .video-frame {
    border-radius: 20px;
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
  .pillars-grid,
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
  .alt-section,
  .pillars-section,
  .features-section,
  .faq-section,
  .cta-section {
    padding: 3.5rem 0.75rem;
  }
  .atlas-section {
    padding: 3.5rem 0 3rem;
  }
  .atlas-header {
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  .atlas-figure {
    padding: 0 0.75rem;
  }
  .alt-callout-inner {
    padding: 1.25rem;
  }
}
</style>
