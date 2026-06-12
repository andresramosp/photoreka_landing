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
                    <n-icon size="16"><LocationOutline /></n-icon>
                    Geo Recovery - Photo geotagging without account
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Geotag photos with AI.
                  <span class="gradient-text"
                    >Download them with GPS inside.</span
                  >
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Need to add GPS data to photos in bulk? Geo Recovery uses AI
                  photo geotagging to find where your shots were taken, lets you
                  review each marker on the map, and downloads your originals
                  with GPS coordinates embedded in EXIF metadata. This is built
                  for DSLR and archive photos with missing GPS metadata.<br /><br />
                  <strong>Your originals never leave your browser.</strong> Only
                  lightweight thumbnails are sent for analysis. No Photoreka
                  account required — one flat payment for the entire batch.
                </p>

                <div class="hero-actions" :class="{ visible: heroVisible }">
                  <n-button
                    type="success"
                    size="large"
                    strong
                    @click="goToTool"
                  >
                    <template #icon>
                      <n-icon><LocationOutline /></n-icon>
                    </template>
                    Start Geo Recovery
                  </n-button>
                  <n-button
                    strong
                    secondary
                    type="success"
                    size="large"
                    @click="goToGeoInference"
                  >
                    <template #icon>
                      <n-icon><GlobeOutline /></n-icon>
                    </template>
                    Photoreka full platform
                  </n-button>
                </div>

                <!-- Key trust signals -->
                <div class="hero-trust" :class="{ visible: heroVisible }">
                  <span class="trust-item">
                    <n-icon size="14"><ShieldCheckmarkOutline /></n-icon>
                    Originals stay in your browser
                  </span>
                  <span class="trust-separator">·</span>
                  <span class="trust-item">
                    <n-icon size="14"><CardOutline /></n-icon>
                    One-time flat payment
                  </span>
                  <span class="trust-separator">·</span>
                  <span class="trust-item">
                    <n-icon size="14"><DownloadOutline /></n-icon>
                    GPS injected into EXIF
                  </span>
                </div>
              </div>

              <div class="hero-visual" :class="{ visible: heroVisible }">
                <!--
                  Placeholder slideshow — replace with Geo Recovery screenshots.
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
              <h2 class="section-title">Who needs bulk EXIF GPS recovery</h2>
              <p class="section-subtitle">
                If you have photos without GPS and want them back with
                coordinates embedded — without setting up an account or learning
                a new tool — this is it.
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
              <h2 class="section-title">
                How to geotag photos with AI (4 steps)
              </h2>
              <p class="section-subtitle">
                No onboarding, no catalog setup, no credits to buy. Upload, pay,
                review, download.
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
                Built for bulk geotagging and EXIF GPS writeback
              </h2>
              <p class="section-subtitle">
                Everything in Geo Recovery is designed so you spend less time
                configuring and more time with your photos — wherever they were
                taken.
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

        <!-- Map visual section -->
        <section class="atlas-section" ref="mapSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="hero-container">
            <div class="hero-layout">
              <!-- Left: Map screenshot -->
              <div class="hero-visual" :class="{ visible: mapVisible }">
                <div class="video-frame">
                  <img
                    src="/ai_geoinference/4.png"
                    alt="Geo Recovery interactive map"
                    class="map-screenshot"
                  />
                </div>
              </div>

              <!-- Right: Content -->
              <div
                class="hero-content atlas-content"
                :class="{ visible: mapVisible }"
              >
                <div
                  class="hero-badge atlas-badge"
                  :class="{ visible: mapVisible }"
                >
                  <span class="badge-content">
                    <n-icon size="18"><MapOutline /></n-icon>
                    Interactive Map Review
                  </span>
                </div>
                <h2
                  class="hero-title atlas-title"
                  :class="{ visible: mapVisible }"
                >
                  Every photo on the map.
                  <span class="gradient-text">Every pin yours to move.</span>
                </h2>
                <p class="hero-subtitle" :class="{ visible: mapVisible }">
                  Once the AI has processed your batch, every located photo
                  appears as a clustered marker on a full-screen interactive
                  map. Explore by cluster, zoom in, click any marker to see the
                  photo thumbnail and the inferred address. This is practical
                  photo geotagging with a visual review step before EXIF write
                  back.<br /><br />
                  Not happy with a placement? Click the edit button, search for
                  the correct location by name or drag the pin on the map. Your
                  correction is what gets written into the EXIF on download —
                  the AI's guess never overrides your judgment.
                </p>

                <div class="hero-actions" :class="{ visible: mapVisible }">
                  <n-button
                    type="success"
                    size="large"
                    strong
                    @click="goToTool"
                  >
                    <template #icon>
                      <n-icon><LocationOutline /></n-icon>
                    </template>
                    Start Geo Recovery
                  </n-button>
                  <span class="cta-note">No account needed · Pay once</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Privacy section -->
        <section class="privacy-section" ref="privacySection">
          <div class="section-container">
            <div class="privacy-card" :class="{ visible: privacyVisible }">
              <div class="privacy-icon">
                <n-icon size="40"><ShieldCheckmarkOutline /></n-icon>
              </div>
              <div class="privacy-text">
                <h2 class="privacy-title">
                  Your photos never leave your device
                </h2>
                <p class="privacy-description">
                  Geo Recovery stores your original files in your browser's
                  local storage (IndexedDB). Only thumbnail-sized analysis
                  copies are sent to the AI — just enough for it to read visual
                  context. When you download, your original pixels come back
                  untouched, with GPS coordinates added to the EXIF layer.
                  <strong
                    >Nothing is kept on our servers after the session
                    ends.</strong
                  >
                </p>
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
                Everything you need to know about Geo Recovery
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
                Upload your photos. Pay once. Get them back with GPS.
              </h2>
              <p class="cta-description">
                Thousands of photos. One batch. AI reads each frame, places it
                on the map, lets you correct anything, then injects GPS
                coordinates directly into the EXIF of your originals. No
                account, no subscription, no fuss.
              </p>
              <div class="cta-buttons">
                <n-button type="success" size="large" strong @click="goToTool">
                  <template #icon>
                    <n-icon><LocationOutline /></n-icon>
                  </template>
                  Start Geo Recovery
                </n-button>
                <n-button
                  strong
                  secondary
                  type="success"
                  size="large"
                  @click="goToHome"
                >
                  <template #icon>
                    <n-icon><GlobeOutline /></n-icon>
                  </template>
                  What is Photoreka?
                </n-button>
              </div>
              <div class="cta-extra">
                <p>
                  Already have a Photoreka account? Use
                  <a @click="goToGeoInference" class="cta-link"
                    >AI Geo-Inference</a
                  >
                  — richer filters, world map integration, and no separate
                  payment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { markRaw, nextTick } from "vue";
import {
  SunnyOutline,
  MoonOutline,
  ArrowBackOutline,
  ChevronDownOutline,
  GlobeOutline,
  MapOutline,
  LocationOutline,
  SparklesOutline,
  CheckmarkCircleOutline,
  CreateOutline,
  CameraOutline,
  FilmOutline,
  PeopleOutline,
  NewspaperOutline,
  ShieldCheckmarkOutline,
  CardOutline,
  DownloadOutline,
  CloudUploadOutline,
  ImagesOutline,
  DocumentTextOutline,
  TimeOutline,
} from "@vicons/ionicons5";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("ai_geo_recovery");

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

// Section refs
const heroSection = ref(null);
const usecasesSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const mapSection = ref(null);
const privacySection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

// Visibility flags
const heroVisible = ref(false);
const usecasesVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const mapVisible = ref(true);
const privacyVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);

// Hero slideshow — using geo-inference screenshots as placeholders
// TODO: replace with Geo Recovery product screenshots
const slideshowImages = [
  { src: "/ai_geoinference/1.png", alt: "Geo Recovery - upload photos" },
  { src: "/ai_geoinference/2.png", alt: "Geo Recovery - AI processing" },
  { src: "/ai_geoinference/3.png", alt: "Geo Recovery - map review" },
  { src: "/ai_geoinference/4.png", alt: "Geo Recovery - results map" },
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

// Use cases
const usecases = ref([
  {
    icon: markRaw(FilmOutline),
    title: "Film digitizers",
    description:
      "Just scanned hundreds of slides or negatives from your analogue archive? Batch-locate them all at once and let the AI embed the GPS back into the files — from a single paid session.",
    color: "#22c55e",
  },
  {
    icon: markRaw(CameraOutline),
    title: "Pre-GPS camera bodies",
    description:
      "Shot years of travel with a DSLR that had no GPS? Upload the whole collection, pay once, and recover the geography hidden in every pixel — from the architecture, the landscapes, the light.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(ImagesOutline),
    title: "Inherited photo collections",
    description:
      "Working with a digitized family or editorial archive with no metadata? Process thousands of unlabeled photos in a single batch and receive the originals back, location-enriched.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(NewspaperOutline),
    title: "Journalists & documentarians",
    description:
      "Managing a backlog of editorial or documentary shoots with missing location metadata? One upload, one payment, and you receive back the originals with GPS data embedded — ready for any CMS or archive.",
    color: "#f59e0b",
  },
]);

// Steps
const steps = ref([
  {
    title: "Upload your photos",
    description:
      "Drag and drop your photos — JPEGs, RAW files, HEIC, anything. Your originals are saved locally in the browser only. Lightweight thumbnails are generated and sent for AI analysis. No account needed.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "One-time payment",
    description:
      "Pay a flat fee for the entire batch. No subscription, no per-photo pricing, no credits to top up. The price is the same whether you upload ten photos or five thousand.",
    color: "linear-gradient(135deg, #06b6d4, #0891b2)",
  },
  {
    title: "AI geolocates at scale",
    description:
      "The same engine that powers the Photoreka platform handles bulk photo geotagging, analyzing every photo in parallel by reading architecture, landscapes, signage, and lighting conditions. Only confident matches are placed on the map — uncertain photos are flagged as unknown, never guessed.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Review, correct & download",
    description:
      "Inspect every placed marker on the interactive map. Click any pin to see the photo and its address, move it if needed, or search for the correct location by name. Click Download — your original files come back with GPS EXIF data injected, pixel-perfect and unchanged otherwise.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(ShieldCheckmarkOutline),
    title: "Originals stay in your browser",
    description:
      "Your original files are stored only in your browser's local storage (IndexedDB). Only analysis-grade thumbnails are sent to the AI. Your originals are never transmitted — they never leave your device until you choose to download them.",
    color: "#22c55e",
  },
  {
    icon: markRaw(SparklesOutline),
    title: "Bulk-scale AI inference",
    description:
      "The same AI engine that powers Photoreka processes thousands of photos in parallel. No need to queue them one by one — upload the whole batch and let the system work through it.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(DocumentTextOutline),
    title: "GPS injected into EXIF",
    description:
      "The output is your exact original file with GPS coordinates written directly into the EXIF metadata. Open it in Lightroom, Finder, Capture One, or any EXIF-aware tool and the location is there.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(MapOutline),
    title: "Interactive map review",
    description:
      "Every located photo appears as a marker on a full-screen interactive map. Click any cluster to explore what was shot there, inspect individual markers, and confirm or correct the AI's placement before downloading.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(CreateOutline),
    title: "Manual correction",
    description:
      "No AI placement is final. Every marker has an edit button. Click it to search for the correct location by name or drag the pin on the map. Your corrections are what end up embedded in the EXIF — you always have the final word.",
    color: "#ec4899",
  },
  {
    icon: markRaw(CardOutline),
    title: "One payment, no strings",
    description:
      "No ongoing subscription, no credit balance to maintain. Pay once for the batch, review the map, download your enriched files. Done. If you come back later, start a new session and pay once more.",
    color: "#0891b2",
  },
]);

// FAQs
const faqs = ref([
  {
    question: "How do I add GPS data to photos in bulk with AI?",
    answer:
      "Upload your photos to Geo Recovery, pay once for the batch, and let the AI analyze each image to infer the location from visual context (architecture, landmarks, signage). Review the interactive map, correct any pins if needed, then download your originals with GPS coordinates written into the EXIF metadata.",
  },
  {
    question: "Are my original photos uploaded to a server?",
    answer:
      "No. Your original files are stored only in your browser (IndexedDB). Only thumbnail-sized versions are sent to the AI for visual analysis — just enough for it to read architectural details, landscapes, and visual context. Your originals are never transmitted to Photoreka's servers.",
  },
  {
    question: "What is photo geotagging?",
    answer:
      "Photo geotagging means adding GPS coordinates to a photo's EXIF metadata so the location shows up in photo apps and catalogs. Geo Recovery does this in bulk and lets you review every pin before the EXIF GPS is written.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "JPEG, HEIC, WebP, and PNG. Soon we will support RAW formats (CR2, CR3, NEF, ARW, ORF, RAF, DNG, and others). GPS is injected into standard EXIF fields, fully compatible with Lightroom, Capture One, Finder, Photos, and any EXIF-aware tool.",
  },
  {
    question: "How accurate are the results?",
    answer:
      "Results are typically at city or district level. The AI reads visual context — architecture, landscapes, signage, lighting conditions — and filters out low-confidence guesses. Only reliable matches are placed on the map. Street-level precision is never claimed, but the placed location is the AI's honest best guess.",
  },
  {
    question: "What happens to photos the AI can't locate?",
    answer:
      'Photos the AI cannot locate with confidence appear in the results as "unknown" — no marker, no coordinates invented. You can still include them in the download; they come back as-is, without any GPS modification.',
  },
  {
    question: "Can I correct wrong placements?",
    answer:
      "Yes, always. Every marker has an edit button. Click it to search for the correct location by name or drag the pin anywhere on the map. Your correction replaces the AI result and is what gets written into the EXIF on download.",
  },
  {
    question: "What does 'one-time payment' mean exactly?",
    answer:
      "You pay a flat fee for the full batch at the time you submit it. There is no per-photo pricing, no subscription, and no expiry on your session until you download. If you want to process another batch later, you start a new session and pay once more.",
  },
  {
    question: "I already use Photoreka. Should I use this instead?",
    answer:
      "Probably not. The main Photoreka platform includes richer analysis: color palettes, aesthetic scoring, semantic tagging, natural-language search, a 3D atlas, a portfolio builder, and Lightroom integration. Geo Recovery is the lightweight, frictionless option for people who only need GPS recovery without setting up an account.",
  },
]);

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "ai_geo_recovery_page");
  navigateTo("/");
};

const goToTool = () => {
  trackUserAction("navigate_to_geo_recovery_tool", "ai_geo_recovery_page");
  window.open("https://app.photoreka.com/geo-recovery", "_blank");
};

const goToGeoInference = () => {
  trackUserAction("navigate_to_geo_inference", "ai_geo_recovery_page");
  navigateTo("/ai_geo_inference");
};

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "ai_geo_recovery",
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
  watch(mapSection, mapVisible);
  watch(privacySection, privacyVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  trackEvent("page_view", { page: "ai_geo_recovery" });

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
/* ── Geo-recovery accent color ───────────────────────────── */
:root,
[data-theme="dark"],
[data-theme="light"] {
  --geo-accent: #22c55e;
}

/* ── Layout & Base ─────────────────────────────────────── */
.framer-page {
  min-height: 100vh;
  background: var(--premium-bg-primary);
  color: var(--premium-text-primary);
}

/* ── Nav ───────────────────────────────────────────────── */
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

/* ── Hero ──────────────────────────────────────────────── */
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
  gap: 1.5rem;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--geo-accent);
  width: fit-content;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.hero-badge.visible {
  opacity: 1;
  transform: translateY(0);
}
.badge-content {
  display: flex;
  align-items: center;
  gap: 6px;
}
.hero-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.7s ease 0.1s;
}
.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-subtitle {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--premium-text-secondary);
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 0.2s;
}
.hero-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 0.3s;
}
.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Trust signals row */
.hero-trust {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--premium-text-secondary);
  opacity: 0;
  transform: translateY(12px);
  transition: all 0.7s ease 0.4s;
}
.hero-trust.visible {
  opacity: 1;
  transform: translateY(0);
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(34, 197, 94, 0.85);
  font-weight: 500;
}
.trust-separator {
  color: var(--premium-text-secondary);
  opacity: 0.5;
}

.hero-visual {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s ease 0.2s;
}
.hero-visual.visible {
  opacity: 1;
  transform: translateX(0);
}
.hero-visual:hover {
  transform: translateY(-4px);
}
.video-frame {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  aspect-ratio: 16/10;
  position: relative;
}

/* ── Hero slideshow ────────────────────────────────────── */
.hero-slideshow {
  width: 100%;
  height: 0;
  padding-bottom: 62.5%;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}
.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition:
    opacity 1.1s ease,
    transform 1.5s ease;
  transform: scale(1);
}
.hero-slide.active {
  opacity: 1;
}
.hero-slideshow-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.08) 0%,
    transparent 60%
  );
  pointer-events: none;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide {
    transition: opacity 0.3s ease;
  }
}

.map-screenshot {
  width: 100%;
  height: auto;
  display: block;
}

/* ── Gradient text & orbs ──────────────────────────────── */
.gradient-text {
  background: linear-gradient(135deg, #22c55e, #16a34a, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: float 8s ease-in-out infinite;
}
.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #22c55e, transparent);
  top: -10%;
  right: 10%;
}
.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #06b6d4, transparent);
  bottom: 10%;
  left: -5%;
  animation-delay: -3s;
}
.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #8b5cf6, transparent);
  top: 40%;
  right: -5%;
  animation-delay: -6s;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  33% {
    transform: translateY(-20px) scale(1.02);
  }
  66% {
    transform: translateY(10px) scale(0.98);
  }
}

/* ── Section shell ─────────────────────────────────────── */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}
.section-title {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 700;
  margin: 0 0 1rem;
}
.section-subtitle {
  font-size: 1.05rem;
  color: var(--premium-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ── Use Cases Section ─────────────────────────────────── */
.examples-section {
  padding: 6rem 2rem;
}
.usecases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.6s ease 0.2s;
}
.usecases-grid.visible {
  opacity: 1;
  transform: translateY(0);
}
.usecase-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}
.usecase-card:hover {
  transform: translateY(-4px);
  border-color: var(--geo-accent);
}
.usecase-icon {
  margin-bottom: 1rem;
}
.usecase-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}
.usecase-description {
  font-size: 0.9rem;
  color: var(--premium-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ── How It Works Section ──────────────────────────────── */
.how-section {
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
}
.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.6s ease 0.2s;
}
.steps-container.visible {
  opacity: 1;
  transform: translateY(0);
}
.step-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease;
}
.step-card:hover {
  transform: translateY(-4px);
}
.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
}
.step-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.step-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}
.step-description {
  font-size: 0.9rem;
  color: var(--premium-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ── Features Section ──────────────────────────────────── */
.features-section {
  padding: 6rem 2rem;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.feature-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 12px;
  padding: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    border-color 0.3s ease;
}
.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.feature-card:hover {
  border-color: var(--geo-accent);
}
.feature-icon {
  margin-bottom: 1rem;
}
.feature-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}
.feature-description {
  font-size: 0.9rem;
  color: var(--premium-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ── Map / Atlas Section ───────────────────────────────── */
.atlas-section {
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
}
.atlas-content {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s ease 0.2s;
}
.atlas-content.visible {
  opacity: 1;
  transform: translateX(0);
}
.atlas-title {
  font-size: clamp(1.5rem, 3vw, 2.4rem) !important;
}
.atlas-badge {
  opacity: 0;
  transform: translateY(12px);
  transition: all 0.5s ease;
}
.atlas-badge.visible {
  opacity: 1;
  transform: translateY(0);
}
.cta-note {
  font-size: 0.85rem;
  color: var(--premium-text-secondary);
  align-self: center;
}

/* ── Privacy Section ───────────────────────────────────── */
.privacy-section {
  padding: 4rem 2rem;
}
.privacy-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(34, 197, 94, 0.06);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 16px;
  padding: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.privacy-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.privacy-icon {
  color: var(--geo-accent);
  flex-shrink: 0;
}
.privacy-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
}
.privacy-description {
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* ── FAQ Section ───────────────────────────────────────── */
.faq-section {
  padding: 6rem 2rem;
}
.faqs-container {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.6s ease 0.2s;
}
.faqs-container.visible {
  opacity: 1;
  transform: translateY(0);
}
.faq-item {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}
.faq-item:hover,
.faq-item.active {
  border-color: var(--geo-accent);
}
.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--premium-text-primary);
  cursor: pointer;
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
  padding: 0 1.5rem 1.25rem;
  font-size: 0.9rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
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

/* ── CTA Section ───────────────────────────────────────── */
.cta-section {
  padding: 6rem 2rem;
}
.cta-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.cta-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.cta-title {
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  font-weight: 800;
  margin: 0 0 1rem;
}
.cta-description {
  font-size: 1rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  margin: 0 0 2rem;
}
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}
.cta-extra {
  font-size: 0.875rem;
  color: var(--premium-text-secondary);
}
.cta-extra p {
  margin: 0;
}
.cta-link {
  color: var(--geo-accent);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.cta-link:hover {
  opacity: 0.8;
}

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 968px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .hero-visual {
    order: -1;
  }
}

@media (max-width: 768px) {
  .framer-hero {
    padding: 6rem 1.5rem 4rem;
    min-height: auto;
  }
  .examples-section,
  .how-section,
  .features-section,
  .atlas-section,
  .privacy-section,
  .faq-section,
  .cta-section {
    padding: 4rem 1.5rem;
  }
  .privacy-card {
    flex-direction: column;
    text-align: center;
  }
  .hero-trust {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.75rem 1rem;
  }
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
