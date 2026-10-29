<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_geo_recovery_page" :links="navLinks" />

        <PageHero
          class="gr-hero"
          eyebrow="Geo Recovery - Photo geotagging without account"
        >
          <template #eyebrow-icon>
            <span class="lx-eyebrow__dot gr-dot" aria-hidden="true" />
          </template>
          <template #title>
            Geotag photos with AI.
            <em class="lx-accent">Download them with GPS inside.</em>
          </template>
          <p>
            Need to add GPS data to photos in bulk? Geo Recovery uses AI photo
            geotagging to find where your shots were taken, lets you review each
            marker on the map, and downloads your originals with GPS coordinates
            embedded in EXIF metadata. This is built for DSLR and archive photos
            with missing GPS metadata.
          </p>
          <p>
            <strong>Your originals never leave your browser.</strong> Only
            lightweight thumbnails are sent for analysis. No Photoreka account
            required — one payment for the whole batch, €0.012 per photo, VAT
            included.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToTool">
              Start Geo Recovery
            </LxButton>
            <LxButton variant="ghost" @click="goToGeoInference">
              Photoreka full platform
            </LxButton>
          </template>
          <template #note>
            <span class="gr-trust">
              <n-icon size="14"><ShieldCheckmarkOutline /></n-icon>
              Originals stay in your browser
            </span>
            <span class="gr-trust">
              <n-icon size="14"><CardOutline /></n-icon>
              One payment per batch
            </span>
            <span class="gr-trust">
              <n-icon size="14"><DownloadOutline /></n-icon>
              GPS injected into EXIF
            </span>
          </template>
          <template #visual>
            <!-- Placeholder slideshow — replace with Geo Recovery screenshots. -->
            <ShotFrame label="Photoreka — Geo Recovery" ratio="16 / 9">
              <FeatureCarousel :images="slideshowImages" />
            </ShotFrame>
          </template>
        </PageHero>

        <section id="use-cases" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Use cases" align="center">
              <template #title>
                Who needs bulk
                <em class="lx-accent">EXIF GPS recovery</em>
              </template>
              <p>
                If you have photos without GPS and want them back with
                coordinates embedded — without setting up an account or learning
                a new tool — this is it.
              </p>
            </SectionIntro>
            <PageGrid :items="usecases" :columns="4" />
          </div>
        </section>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How to geotag photos
                <em class="lx-accent">with AI (4 steps)</em>
              </template>
              <p>
                No onboarding, no catalog setup, no credits to buy. Upload, pay,
                review, download.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Built for bulk geotagging and
                <em class="lx-accent">EXIF GPS writeback</em>
              </template>
              <p>
                Everything in Geo Recovery is designed so you spend less time
                configuring and more time with your photos — wherever they were
                taken.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <MediaSplitSection
          id="map"
          class="gr-map"
          eyebrow="Interactive Map Review"
          src="/ai_geoinference/4.png"
          alt="Geo Recovery interactive map"
          label="Photoreka — Geo Recovery"
          reverse
        >
          <template #title>
            Every photo on the map.
            <em class="lx-accent">Every pin yours to move.</em>
          </template>
          <p>
            Once the AI has processed your batch, every located photo appears as
            a clustered marker on a full-screen interactive map. Explore by
            cluster, zoom in, click any marker to see the photo thumbnail and
            the inferred address. This is practical photo geotagging with a
            visual review step before EXIF write back.
          </p>
          <p>
            Not happy with a placement? Click the edit button, search for the
            correct location by name or drag the pin on the map. Your
            correction is what gets written into the EXIF on download — the
            AI's guess never overrides your judgment.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToTool">
              Start Geo Recovery
            </LxButton>
            <span class="lx-status">No account needed · Pay once</span>
          </template>
        </MediaSplitSection>

        <section id="privacy" class="lx-section lx-section--tight">
          <div class="lx-container">
            <div v-reveal class="lx-card gr-privacy">
              <div class="gr-privacy__glow" aria-hidden="true" />
              <span class="gr-privacy__icon" aria-hidden="true">
                <n-icon size="34"><ShieldCheckmarkOutline /></n-icon>
              </span>
              <SectionIntro eyebrow="Privacy" size="md" flush>
                <template #title>
                  Your photos
                  <em class="lx-accent">never leave your device</em>
                </template>
                <p>
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
              </SectionIntro>
            </div>
          </div>
        </section>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about Geo Recovery</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Upload your photos. Pay once.
            <em class="lx-accent">Get them back with GPS.</em>
          </template>
          <p>
            Thousands of photos. One batch. AI reads each frame, places it on
            the map, lets you correct anything, then injects GPS coordinates
            directly into the EXIF of your originals. No account, no
            subscription, no fuss.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToTool">
              Start Geo Recovery
            </LxButton>
            <LxButton variant="ghost" @click="goToHome">
              What is Photoreka?
            </LxButton>
          </template>
          <template #links>
            Already have a Photoreka account? Use
            <a @click="goToGeoInference">AI Geo-Inference</a>
            — richer filters, world map integration, and no separate payment.
          </template>
        </PageCta>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { markRaw } from "vue";
import {
  MapOutline,
  SparklesOutline,
  CreateOutline,
  CameraOutline,
  FilmOutline,
  NewspaperOutline,
  ShieldCheckmarkOutline,
  CardOutline,
  DownloadOutline,
  ImagesOutline,
  DocumentTextOutline,
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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

const navLinks = [
  { label: "Use cases", target: "use-cases" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "Map", target: "map" },
  { label: "Privacy", target: "privacy" },
  { label: "FAQ", target: "faq" },
];

// Hero slideshow — using geo-inference screenshots as placeholders
// TODO: replace with Geo Recovery product screenshots
const slideshowImages = [
  { src: "/ai_geoinference/1.png", alt: "Geo Recovery - upload photos" },
  { src: "/ai_geoinference/2.png", alt: "Geo Recovery - AI processing" },
  { src: "/ai_geoinference/3.png", alt: "Geo Recovery - map review" },
  { src: "/ai_geoinference/4.png", alt: "Geo Recovery - results map" },
];

// Use cases
const usecases = [
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
];

// Steps
const steps = [
  {
    title: "Upload your photos",
    description:
      "Drag and drop your photos — JPEGs, RAW files, HEIC, anything. Your originals are saved locally in the browser only. Lightweight thumbnails are generated and sent for AI analysis. No account needed.",
  },
  {
    title: "One-time payment",
    description:
      "Pay once for the entire batch: €0.012 per photo, VAT included, with a €2.40 minimum. No subscription, no credits to top up.",
  },
  {
    title: "AI geolocates at scale",
    description:
      "The same engine that powers the Photoreka platform handles bulk photo geotagging, analyzing every photo in parallel by reading architecture, landscapes, signage, and lighting conditions. Only confident matches are placed on the map — uncertain photos are flagged as unknown, never guessed.",
  },
  {
    title: "Review, correct & download",
    description:
      "Inspect every placed marker on the interactive map. Click any pin to see the photo and its address, move it if needed, or search for the correct location by name. Click Download — your original files come back with GPS EXIF data injected, pixel-perfect and unchanged otherwise.",
  },
];

// Features
const features = [
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
];

// FAQs
const faqs = [
  {
    question: "How to geotag photos already taken online?",
    answer:
      "Upload the photos you already took, let Geo Recovery analyze lightweight thumbnails with AI, review each inferred pin on the map, correct anything you want, and then download your original files with GPS coordinates written into EXIF metadata.",
  },
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
      "You pay once for the full batch at the time you submit it: €0.012 per photo, VAT included, with a €2.40 minimum per batch. There is no subscription and no expiry on your session until you download. If you want to process another batch later, you start a new session and pay once more.",
  },
  {
    question: "I already use Photoreka. Should I use this instead?",
    answer:
      "Probably not. The main Photoreka platform includes richer analysis: color palettes, aesthetic scoring, semantic tagging, natural-language search, a 3D atlas, a portfolio builder, and Lightroom integration. Geo Recovery is the lightweight, frictionless option for people who only need GPS recovery without setting up an account.",
  },
];

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

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "ai_geo_recovery",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", { page: "ai_geo_recovery" });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
/* Green marks Geo Recovery as the standalone service, as in its promo. */
.gr-dot {
  background: var(--lx-ok);
  box-shadow: 0 0 12px var(--lx-ok);
}

.gr-trust {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.gr-trust :deep(.n-icon) {
  color: var(--lx-ok);
}

.gr-privacy {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: start;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(28px, 5vw, 72px);
  box-shadow: var(--lx-shadow-lg), var(--lx-highlight);
}

.gr-privacy__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    45% 70% at 0% 0%,
    color-mix(in srgb, var(--lx-ok) 12%, transparent),
    transparent 70%
  );
}

.gr-privacy__icon {
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  border-radius: 22px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line-2);
  color: var(--lx-ok);
}

.gr-privacy :deep(.lx-intro) {
  max-width: 820px;
}

.gr-privacy :deep(.lx-title) {
  font-size: clamp(2rem, 3.2vw, 3rem);
}

@media (max-width: 640px) {
  .gr-privacy {
    grid-template-columns: 1fr;
  }

  .gr-privacy__icon {
    width: 60px;
    height: 60px;
    border-radius: 18px;
  }
}
</style>
