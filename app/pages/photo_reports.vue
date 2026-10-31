<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="photo_reports_page" :links="navLinks" />

        <PageHero eyebrow="Photography Reports">
          <template #title>
            See your photography
            <em class="lx-accent">from the outside</em>
          </template>
          <p>
            You know how your photos <em>feel</em>—but do you know what the data
            says? Photoreka generates
            <strong
              >detailed reports on your style, patterns, strengths, and
              evolution</strong
            >
            by analyzing your entire catalog with AI.
          </p>
          <p>
            Discover what you're great at, where you're growing, and what to
            shoot next—backed by multi-dimensional analysis, not vibes.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #visual>
            <ShotFrame
              src="/report/2.png"
              alt="Photoreka patterns report: narrative and contextual patterns detected across a photo catalog, each with example photos"
              label="Photoreka — Reports"
              ratio="16 / 10"
              focus="0% 0%"
              loading="eager"
            />
          </template>
        </PageHero>

        <section id="reports" class="lx-section">
          <div class="lx-container">
            <div class="lx-beside rep-head">
              <SectionIntro eyebrow="Report types" flush>
                <template #title>
                  Reports that <em class="lx-accent">reveal your work</em>
                </template>
                <p>
                  Every report is generated from real AI analysis of your
                  photos— not metadata alone. Understand patterns, track growth,
                  and make informed creative decisions.
                </p>
              </SectionIntro>
              <div
                v-reveal="{ variant: 'scale', delay: 120 }"
                v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
              >
                <ShotFrame
                  class="lx-zoom"
                  src="/report/3.png"
                  alt="Photoreka narrative and contextual patterns report with example photos for each pattern"
                  label="Photoreka — Patterns report"
                  ratio="4 / 3"
                  focus="0% 0%"
                />
              </div>
            </div>

            <!-- Plain columns, no cards: the page keeps its one card grid
                 for the features. -->
            <ul class="lx-columns">
              <li
                v-for="(item, i) in reportTypes"
                :key="item.title"
                v-reveal="(i % 3) * 80"
                class="lx-column"
              >
                <span class="lx-icon-tile" :style="{ color: item.color }">
                  <n-icon size="18"><component :is="item.icon" /></n-icon>
                </span>
                <h3 class="lx-column__title">{{ item.title }}</h3>
                <p class="lx-column__text">{{ item.description }}</p>
                <ul class="lx-list report-insights">
                  <li v-for="insight in item.insights" :key="insight">
                    <span class="lx-tick" aria-hidden="true" />
                    <span>{{ insight }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How photo reports <em class="lx-accent">work</em>
              </template>
              <p>From raw analysis to actionable insights—all automatic.</p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                More than numbers—<em class="lx-accent"
                  >real creative intelligence</em
                >
              </template>
              <p>
                Photo reports go beyond basic stats. They combine AI vision,
                scoring data, and temporal analysis to give you a complete
                picture of your practice.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about AI-powered photo reports</p>
        </FaqSection>

        <PageCta>
          <template #title>
            What story does your photography
            <em class="lx-accent">tell?</em>
          </template>
          <p>
            Let the data reveal patterns you can't see by scrolling through a
            grid. Photoreka reports give you a photographer's mirror— objective,
            detailed, and built to help you grow.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            See how scoring powers your reports:
            <a @click="goToScoring">Photo Scoring</a>
            <span class="lx-sep" aria-hidden="true">·</span>
            <a @click="goToChat">Chat with Your Photos</a>
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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

const showRequestDialog = ref(false);

const navLinks = [
  { label: "Reports", target: "reports" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "FAQ", target: "faq" },
];

// Report types
const reportTypes = [
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
];

// How it works steps
const steps = [
  {
    title: "Your photos are scored across multiple dimensions",
    description:
      "Photoreka's AI evaluates every image for aesthetics, composition, narrative strength, originality, technical quality, and more. This scoring data is the foundation of all reports.",
  },
  {
    title: "Patterns are detected across your catalog",
    description:
      "The system identifies trends over time, recurring subjects, stylistic clusters, and quality distributions. It finds the patterns you can't see by scrolling a grid.",
  },
  {
    title: "Reports are generated with visual summaries",
    description:
      "Each report combines charts, example photos, and natural-language insights. You see both the data and the 'so what'—clear takeaways you can act on.",
  },
  {
    title: "Track progress and set creative goals",
    description:
      "Use reports to benchmark your evolution, celebrate improvements, and identify the next area to focus on. The reports update as your catalog grows.",
  },
];

// Features
const features = [
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
];

// FAQs
const faqs = [
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
];

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
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

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "photo_reports",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", { page: "photo_reports" });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
.rep-head {
  margin-bottom: clamp(56px, 7vw, 96px);
}

.report-insights {
  margin-top: auto;
  padding-top: 0.5rem;
}

.report-insights > li {
  gap: 0.75rem;
  padding: 0.7rem 0;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text);
}

.report-insights .lx-tick {
  width: 16px;
  height: 16px;
}

.report-insights .lx-tick::after {
  inset: 4px;
}
</style>
