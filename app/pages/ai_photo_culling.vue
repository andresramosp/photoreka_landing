<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_photo_culling_page" :links="navLinks" />

        <PageHero eyebrow="AI Photo Culling">
          <template #title>
            Cull photos for
            <em class="lx-accent">meaning, not just focus</em>
          </template>
          <p>
            The first pass is a technical filter: blinks, blur, the best frame
            of each burst. Photoreka does the rest of the cull. It flags the
            near-duplicates that slip through and reads the photos you kept
            across <strong>8 artistic criteria</strong>—aesthetics, composition,
            storytelling, originality and more—so the frames that carry your
            work rise to the top.
          </p>
          <p>
            Not binary keep/reject, and not a focus check. A
            <strong>multi-dimensional ranking</strong> that judges each photo
            against the rest of your body of work: a technically imperfect frame
            with real narrative weight stays in.
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
              poster="/home/video_poster.webp"
              alt="Photoreka mapping a photographer's body of work"
              label="Photoreka — Atlas"
              ratio="16 / 9"
            />
          </template>
        </PageHero>

        <HomeWorkflow />

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How <em class="lx-accent">AI culling</em> works
              </template>
              <p>
                No guesswork, no black box. Here's exactly what happens when
                Photoreka processes your selects.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
            <div
              v-reveal="{ variant: 'scale', delay: 120 }"
              v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
              class="cull-result"
            >
              <ShotFrame
                class="lx-zoom"
                label="Photoreka — Scores"
                ratio="1586 / 992"
              >
                <FeatureCarousel :images="resultImages" fit="contain" />
              </ShotFrame>
            </div>
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
                Focus and blinks are the first pass's job. Photoreka
                evaluates what makes a kept photo worth showing—from narrative
                weight to compositional intent.
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
            The first pass kept them.
            <em class="lx-accent">Photoreka ranks them.</em>
          </template>
          <p>
            Your best photos are already among your keepers. Let Photoreka
            surface them—scored, ranked, and ready for your next portfolio, book
            or contest.
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
  { label: "Where it fits", target: "workflow" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "Picks", target: "picks" },
  { label: "FAQ", target: "faq" },
];

const resultImages = [
  {
    src: "/ai_photo_scoring/9.webp",
    alt: "Photoreka score panel for a single photo: overall 7.1/10 with the Street preset, fundamentals and bonus dimensions",
  },
  {
    src: "/ai_photo_scoring/7.webp",
    alt: "Photoreka workspace sorted by aesthetic and originality scores, with each photo's score on its thumbnail",
  },
];

// How it works steps
const steps = [
  {
    title: "Bring the photos you kept",
    description:
      "Start after the first pass. Send your picks or a collection from Lightroom Classic, or bring them from Google Photos, Google Drive, Dropbox or local folders. Photoreka's AI reads each image—composition, light, color, subject, mood and the story it tells.",
  },
  {
    title: "Eight artistic scores are computed",
    description:
      "Each photo is scored 1–10 on 8 criteria: aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity. Focus and blinks aren't on the list—the first pass already filtered them out. No single criterion decides the outcome.",
  },
  {
    title: "Your body of work is ranked",
    description:
      "Near-duplicates are flagged and photos are sorted by an overall rating or by any single criterion. The frames that carry your work rise to the top—whether they're technically perfect or compelling despite their imperfections.",
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
    title: "8 Artistic Criteria",
    description:
      "Aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity, each scored 1–10. Every photo gets a full profile, not a pass/fail grade.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Artistic Intent Matters",
    description:
      "A motion-blurred street photo with raw energy won't be pushed down for being 'unsharp'. Photoreka doesn't score sharpness at all: it judges intent and artistic merit.",
    color: "#2563eb",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Instant Results",
    description:
      "Once analyzed, scores are persistent. Filter and sort your work by any criterion at any time—no reprocessing needed. Results appear in milliseconds.",
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
    title: "Built for the Second Pass",
    description:
      "Made for the photos you kept, not every photo you shot: a body of work of up to 50,000 photos. Each frame is read against the rest of that work—a signal that bursts and rejects would only drown.",
    color: "#ec4899",
  },
  {
    icon: markRaw(LayersOutline),
    title: "From Culling to Curation",
    description:
      "Once your strongest frames surface, move straight to sequencing, portfolio building or the 3D Atlas. Ranking the keepers is where the editing starts, not where it ends.",
    color: "#06b6d4",
  },
];

// FAQs
const faqs = [
  {
    question:
      "How is this different from Aftershoot, Imagen or Narrative Select?",
    answer:
      "They're built for large volumes of photos, and they're good at it: spotting the shots that failed, grouping duplicates and picking the best frame of each moment so a shoot becomes a deliverable set. Use them for the first pass. Photoreka finishes the cull on a more carefully curated catalog—what survives—which is what lets it go a level higher: curation and editorial judgment. It flags the near-duplicates that slip through, scores your keepers on 8 artistic criteria, judges each one against the rest of your body of work, and connects the result to search, sequencing and portfolio building. They judge frames; Photoreka reads bodies of work.",
    link: {
      to: "/blog/best-ai-culling-software/",
      label: "Compare the best AI culling software",
    },
  },
  {
    question: "Will it reject my intentionally imperfect photos?",
    answer:
      "No. Photoreka doesn't score sharpness or technical quality, so a motion-blurred street scene or a high-grain documentary shot is judged on what it says: storytelling, originality, composition and emotional weight.",
  },
  {
    question: "Is there a limit on how many photos I can cull?",
    answer:
      "Photoreka is built for a body of work of up to 50,000 photos—the keepers of years of shooting, not every frame off the card. That's a design choice: each photo is scored against the rest of your work, and bursts, blinks and near-duplicates would drown that signal. Filter each shoot first, by hand or with your usual tool, then bring the selects: Photoreka flags the near-duplicates that slip through.",
  },
  {
    question: "Can I customize the scoring criteria?",
    answer:
      "You can sort and filter by any individual criterion (aesthetics, composition, storytelling, etc.) or use the overall rating, and your profile adjusts how the criteria are weighted. With the Commercial Photography profile, subject clarity and commercial intent replace two criteria for client work; for a personal series, lean on storytelling and spontaneity.",
  },
  {
    question: "How long does it take to process my photos?",
    answer:
      "Analysis runs in the background and typically processes around 1,000 photos per hour. Once analyzed, scores are permanent—you never need to reprocess. Filtering and sorting is instantaneous.",
  },
  {
    question: "Does it work with my Lightroom catalog?",
    answer:
      "Yes. Select your picks or a collection in Lightroom Classic and send them with the official plugin—exactly the second pass Photoreka is built for. Photos are analyzed in the cloud (only compressed previews are sent—never your originals) and scores are available both in the web platform and referenced from within Lightroom.",
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
  window.open("https://app.photoreka.com/demo", "_blank");
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
  navigateTo("/photo_scoring/");
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
/* The payoff of the steps: the catalog, ranked. */
/* The frame matches 9.webp; 7.webp is slightly wider, so the thin bands it
   leaves take its own edge colour instead of the light theme's white. */
.cull-result {
  --lx-shot-bg: #161618;
  max-width: 1000px;
  margin: clamp(56px, 7vw, 96px) auto 0;
}
</style>
