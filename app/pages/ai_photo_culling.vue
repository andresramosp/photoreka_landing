<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_photo_culling_page" :links="navLinks" />

        <PageHero eyebrow="AI Photo Culling">
          <template #title>
            Cull thousands of photos in
            <em class="lx-accent">minutes, not hours</em>
          </template>
          <p>
            Stop spending entire evenings rejecting photos one by one.
            Photoreka scores every image across
            <strong
              >aesthetics, composition, sharpness, and narrative
              strength</strong
            >—so your best shots rise to the top automatically.
          </p>
          <p>
            This isn't binary keep/reject. It's a
            <strong>multi-dimensional ranking</strong> that respects nuance: a
            technically imperfect photo with strong narrative weight won't be
            thrown away.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #visual>
            <ShotFrame
              video="/videos/atlas_1.mp4"
              poster="/home/video_poster.jpg"
              alt="Photoreka ranking a whole photo catalog"
              label="Photoreka — Atlas"
              ratio="16 / 9"
            />
          </template>
        </PageHero>

        <section id="problem" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="The problem" align="center">
              <template #title>
                Traditional culling <em class="lx-accent">is broken</em>
              </template>
              <p>
                Photographers lose hours on repetitive manual selection.
                Existing tools use a binary keep/reject model that can't handle
                nuance. Photoreka takes a different approach.
              </p>
            </SectionIntro>

            <div class="cull-compare">
              <div v-reveal class="lx-card cull-compare__card is-old">
                <h3 class="cull-compare__title">
                  <n-icon size="20"><CloseCircleOutline /></n-icon>
                  Traditional Culling
                </h3>
                <ul class="lx-list">
                  <li v-for="item in oldWay" :key="item">
                    <span class="cull-cross" aria-hidden="true" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div v-reveal="120" class="lx-card cull-compare__card is-new">
                <div class="cull-compare__glow" aria-hidden="true" />
                <h3 class="cull-compare__title">
                  <n-icon size="20"><CheckmarkCircleOutline /></n-icon>
                  Photoreka's Approach
                </h3>
                <ul class="lx-list">
                  <li v-for="item in newWay" :key="item">
                    <span class="lx-tick" aria-hidden="true" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How <em class="lx-accent">AI culling</em> works
              </template>
              <p>
                No guesswork, no black box. Here's exactly what happens when
                Photoreka processes your library.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Culling that
                <em class="lx-accent">understands photography</em>
              </template>
              <p>
                Not just sharpness detection. Photoreka evaluates what makes a
                photo worth keeping—from emotional impact to compositional
                intent.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <PicksPromo id="picks" source="ai_photo_culling" immersive />

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about AI photo culling</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Stop culling. <em class="lx-accent">Start ranking.</em>
          </template>
          <p>
            Your best photos are already in your archive. Let Photoreka surface
            them automatically—scored, ranked, and ready for your next project.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Want to see the detailed scoring?
            <a @click="goToScoring">Explore Photo Scoring</a>
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
  CheckmarkCircleOutline,
  CloseCircleOutline,
  FlashOutline,
  EyeOutline,
  BarChartOutline,
  ImagesOutline,
  LayersOutline,
  SearchOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("ai_photo_culling");

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
  { label: "The problem", target: "problem" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "Picks", target: "picks" },
  { label: "FAQ", target: "faq" },
];

const oldWay = [
  "Binary keep/reject decisions",
  "Hours of manual scrolling per session",
  "Only judges technical sharpness",
  "Misses narratively strong but imperfect shots",
  "No understanding of mood or intent",
  "Starts from scratch every time",
];

const newWay = [
  "Multi-dimensional scoring (6+ criteria)",
  "Instant ranking of entire catalog",
  "Understands composition, narrative, and emotion",
  "Respects artistic intent over technical perfection",
  "Natural language to refine selections",
  "Scores persist—filter anytime",
];

// How it works steps
const steps = [
  {
    title: "Every photo is analyzed by computer vision",
    description:
      "When you upload or sync your library, Photoreka's AI extracts a rich visual embedding from each image—capturing composition, lighting, color harmony, sharpness, subject presence, and emotional tone.",
  },
  {
    title: "Multi-dimensional scores are computed",
    description:
      "Each photo receives scores across 6+ dimensions: aesthetic quality, technical sharpness, compositional strength, narrative weight, originality, and visual impact. No single metric decides the outcome.",
  },
  {
    title: "Your catalog is instantly ranked",
    description:
      "Photos are sorted by overall quality or by individual dimensions. Your strongest work rises to the top—whether it's technically perfect or artistically compelling despite imperfections.",
  },
  {
    title: "Refine with natural language",
    description:
      "Combine scoring with semantic search: 'show me my top-rated portraits from summer' or 'best compositions in black and white'. Scores and search work together to give you exactly what you need.",
  },
];

// Features
const features = [
  {
    icon: markRaw(BarChartOutline),
    title: "6+ Scoring Dimensions",
    description:
      "Aesthetics, composition, sharpness, narrative strength, originality, and visual impact. Each photo gets a full profile, not just a pass/fail grade.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Artistic Intent Matters",
    description:
      "A motion-blurred street photo with raw energy won't be rejected for being 'unsharp'. The AI evaluates intent and artistic merit alongside technical quality.",
    color: "#2563eb",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Instant Results",
    description:
      "Once analyzed, scores are persistent. Filter and sort your catalog by any dimension at any time—no reprocessing needed. Results appear in milliseconds.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Search + Score Combined",
    description:
      "Use natural language search and scoring together: find your highest-rated golden hour shots, or your most compositionally strong portraits from a specific trip.",
    color: "#22c55e",
  },
  {
    icon: markRaw(ImagesOutline),
    title: "Handles Any Catalog Size",
    description:
      "Whether you have 500 photos or 10,000, culling performance stays consistent. Process an entire shoot or your full archive in one batch.",
    color: "#ec4899",
  },
  {
    icon: markRaw(LayersOutline),
    title: "From Culling to Curation",
    description:
      "Once you've found your top shots, seamlessly move to sequencing, portfolio building, or 3D Atlas exploration. Culling is just the first step in the workflow.",
    color: "#06b6d4",
  },
];

// FAQs
const faqs = [
  {
    question: "How is this different from Aftershoot or Narrative Select?",
    answer:
      "Most culling tools use a binary keep/reject model optimized for wedding and event photography. Photoreka takes a fundamentally different approach: it scores photos across multiple artistic dimensions, respects narrative intent over pure technical quality, and integrates with semantic search so you can filter by content, mood, and style—not just sharpness.",
  },
  {
    question: "Will it reject my intentionally imperfect photos?",
    answer:
      "No. Photoreka's scoring understands that a motion-blurred street scene or a high-grain documentary shot can have enormous artistic value. Narrative strength and emotional impact are scored independently from technical sharpness.",
  },
  {
    question: "Can I customize the scoring criteria?",
    answer:
      "You can sort and filter by any individual dimension (aesthetics, composition, narrative, etc.) or use the overall combined score. This lets you prioritize what matters most for each project—technical perfection for commercial work, or raw emotion for a personal series.",
  },
  {
    question: "How long does it take to process my photos?",
    answer:
      "Analysis runs in the background and typically processes around 1,000 photos per hour. Once analyzed, scores are permanent—you never need to reprocess. Filtering and sorting is instantaneous.",
  },
  {
    question: "Does it work with my Lightroom catalog?",
    answer:
      "Yes. Photoreka's Lightroom Classic plugin syncs your catalog directly. Photos are analyzed in the cloud (only compressed previews are sent—never your originals) and scores are available both in the web platform and referenced from within Lightroom.",
  },
  {
    question: "Can I use culling results to build a portfolio?",
    answer:
      "Absolutely. Culling, scoring, and portfolio building are all part of the same workflow. Surface your top-scored photos, refine with natural language, and use the sequencing tools to arrange them into a cohesive portfolio or exhibition selection.",
  },
];

const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_culling_page");
  window.open("https://app.photoreka.com/demo/workspace", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "ai_photo_culling_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToScoring = () => {
  trackUserAction("navigate_to_scoring", "ai_photo_culling_page");
  navigateTo("/photo_scoring");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "ai_photo_culling",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", { page: "ai_photo_culling" });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
/* ── Old vs new comparison ─────────────────────────────────── */
.cull-compare {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 28px);
  max-width: 1080px;
  margin-inline: auto;
}

.cull-compare__card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  align-content: start;
  gap: 1.5rem;
  padding: clamp(28px, 3.5vw, 48px);
}

.cull-compare__card.is-old {
  background: var(--lx-bg-2);
}

.cull-compare__card.is-new {
  box-shadow: var(--lx-shadow-md), var(--lx-highlight);
}

.cull-compare__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    70% 60% at 100% 0%,
    var(--lx-glow-1),
    transparent 70%
  );
}

.cull-compare__title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.6rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.is-old .cull-compare__title {
  color: var(--lx-text-2);
}

.is-old .cull-compare__title .n-icon {
  color: var(--lx-text-3);
}

.is-new .cull-compare__title .n-icon {
  color: var(--lx-accent);
}

.is-old .lx-list > li {
  color: var(--lx-text-2);
}

/* Muted counterpart of .lx-tick for the old way. */
.cull-cross {
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid var(--lx-line-2);
}

.cull-cross::before,
.cull-cross::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 1.5px;
  border-radius: 1px;
  background: var(--lx-text-3);
  transform: translate(-50%, -50%) rotate(45deg);
}

.cull-cross::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

@media (max-width: 760px) {
  .cull-compare {
    grid-template-columns: 1fr;
  }
}
</style>
