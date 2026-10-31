<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="photo_tag_cloud_page" :links="navLinks" />

        <PageHero eyebrow="Semantic Tag Map">
          <template #title>
            Your photo vocabulary
            <em class="lx-accent">mapped in 2D space</em>
          </template>
          <p>
            Thousands of tags from your photos—<em>people</em>,
            <em>places</em>, <em>moods</em>, <em>objects</em>,
            <em>weather</em>—arranged by semantic similarity in an interactive
            map. Tags that share meaning cluster together.
          </p>
          <p>
            Pan, zoom, select, and <strong>search by navigating</strong>. The
            closer two tags are, the more often they appear together in the
            same kind of scene.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #visual>
            <!-- TODO: Replace with video element when /videos/tag_cloud.mp4 is ready -->
            <ShotFrame
              src="/home/tag_cloud_poster.png"
              alt="Tag Cloud visualization - Photo vocabulary mapped in 2D semantic space"
              label="Photoreka — Tag Cloud"
              ratio="16 / 9"
              loading="eager"
            />
          </template>
        </PageHero>

        <section id="groups" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Tag groups" align="center">
              <template #title>
                Every tag,
                <em class="lx-accent">color-coded by category</em>
              </template>
              <p>
                AI assigns each tag to a semantic group. The color palette
                instantly tells you what type of concept you're looking at—and
                you can filter the map to focus on just the groups that matter
                to you.
              </p>
            </SectionIntro>

            <div class="tag-groups">
              <ul class="tag-groups__inner">
                <li
                  v-for="(group, index) in tagGroups"
                  :key="group.name"
                  v-reveal="(index % 5) * 70"
                  class="tag-group"
                >
                  <span
                    class="tag-group__dot"
                    :style="{ '--dot': group.color }"
                    aria-hidden="true"
                  />
                  <span class="tag-group__name">{{ group.name }}</span>
                  <span class="tag-group__examples">{{ group.examples }}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- TODO: Replace with video element when /videos/search.mp4 is ready -->
        <MediaSplitSection
          id="dynamic-search"
          eyebrow="Navigation as Search"
          src="/home/tag_cloud_poster_detailed.jpg"
          alt="AI Photo Search - Dynamic tag cloud navigation with real-time photo results"
          label="Photoreka — Dynamic search"
        >
          <template #title>
            Pan into a cluster,
            <em class="lx-accent">instantly see those photos</em>
          </template>
          <p>
            Enable <strong>dynamic search</strong> and the Tag Cloud becomes a
            spatial photo browser. As you zoom and pan, Photoreka automatically
            queries your catalog with the most visible tags and streams the
            results—no button needed. Arrive in the
            <em>"melancholy urban"</em> cluster and your best matching photos
            appear instantly.
          </p>
          <template #below>
            <ul class="lx-columns tag-bridge" style="--lx-cols: 4">
              <li v-for="item in bridgePoints" :key="item.text" class="lx-column">
                <span class="lx-icon-tile" :style="{ color: item.color }">
                  <n-icon size="17"><component :is="item.icon" /></n-icon>
                </span>
                <span class="tag-bridge__text">{{ item.text }}</span>
              </li>
            </ul>
          </template>
          <template #actions>
            <LxButton to="/ai_photo_search" @click="onSearchClick">
              See AI Photo Search
            </LxButton>
          </template>
        </MediaSplitSection>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                From photos to a <em class="lx-accent">living map</em>
              </template>
              <p>
                The tag cloud is built automatically from AI analysis of your
                photos. No manual tagging—ever.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                More than a <em class="lx-accent">word cloud</em>
              </template>
              <p>
                Position carries meaning. The Tag Cloud is a navigable semantic
                space where exploration is search.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about the Tag Cloud</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Your catalog has a shape. <em class="lx-accent">Discover it.</em>
          </template>
          <p>
            Every photo you've ever taken adds a point to your personal semantic
            universe. Analyze your library and see the full map for the first
            time.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Want to see your photos in 3D space?
            <a @click="goToAtlas">Explore the 3D Atlas</a>
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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

const showRequestDialog = ref(false);

const navLinks = [
  { label: "Groups", target: "groups" },
  { label: "Dynamic search", target: "dynamic-search" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "FAQ", target: "faq" },
];

// Tag groups color-coded as in the real app
const tagGroups = [
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
];

// How it works steps
const steps = [
  {
    title: "AI analyzes every photo",
    description:
      "Photoreka runs each image through a computer vision model that extracts dozens of semantic tags per photo: subjects, moods, settings, lighting, abstract themes, and cultural references.",
  },
  {
    title: "Tags are embedded in semantic space",
    description:
      "Each unique tag is converted into a high-dimensional semantic vector. Tags with similar meaning—or that tend to co-occur in similar scenes—end up geometrically close in this space.",
  },
  {
    title: "Dimensionality reduction maps them to 2D",
    description:
      "UMAP reduces the high-dimensional embedding to two coordinates, preserving local neighborhood structure. The result is a 2D plane where clusters are semantically meaningful—not random.",
  },
  {
    title: "PixiJS renders the interactive map",
    description:
      "All tags are drawn with WebGL via PixiJS. Labels appear dynamically as you zoom in, collision-aware so they never overlap. Dot size reflects how many photos carry that tag.",
  },
  {
    title: "Navigate and search",
    description:
      "Click a tag to find all photos with it. Drag a rectangle to combine multiple tags. Enable dynamic search and the visible area becomes a live query—the map IS the search interface.",
  },
];

// Features
const features = [
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
];

const bridgePoints = [
  {
    icon: markRaw(MapOutline),
    color: "#06b6d4",
    text: "Spatial browsing: move the map, change the results",
  },
  {
    icon: markRaw(ExtensionPuzzleOutline),
    color: "#8b5cf6",
    text: "Rectangle selection to hand-pick any tag combination",
  },
  {
    icon: markRaw(FilterOutline),
    color: "#22c55e",
    text: "Filter by group to focus on mood, place, or subject",
  },
  {
    icon: markRaw(SpeedometerOutline),
    color: "#f59e0b",
    text: "Works across catalogs of 100,000+ photos in real time",
  },
];

// FAQs
const faqs = [
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
];

const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
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

const onSearchClick = () => {
  trackUserAction("navigate_to_search", "photo_tag_cloud_page");
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "photo_tag_cloud_page");
  navigateTo("/photo_3D_atlas");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "photo_tag_cloud",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", {
    page: "photo_tag_cloud",
    page_title:
      "Photo Tag Cloud - Explore Your Photo Vocabulary in 2D | Photoreka",
  });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
/* ── Tag groups: one panel, cells split by hairlines (as PageGrid) ── */
.tag-groups {
  overflow: hidden;
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface);
  box-shadow: var(--lx-shadow-md);
}

.tag-groups__inner {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin: 0 -1px -1px 0;
  padding: 0;
  list-style: none;
}

.tag-group {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: clamp(22px, 2.4vw, 32px);
  box-shadow:
    inset -1px 0 0 var(--lx-line-2),
    inset 0 -1px 0 var(--lx-line-2);
  transition: background-color 0.4s ease;
}

.tag-group:hover {
  background: var(--lx-surface-2);
}

.tag-group__dot {
  width: 12px;
  height: 12px;
  margin-bottom: 0.6rem;
  border-radius: 50%;
  background: var(--dot);
  box-shadow: 0 0 14px color-mix(in srgb, var(--dot) 60%, transparent);
}

.tag-group__name {
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.15rem;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--lx-text);
}

.tag-group__examples {
  font-size: var(--lx-fs-sm);
  font-style: italic;
  line-height: 1.6;
  color: var(--lx-text-2);
}

/* ── Dynamic search list ───────────────────────────────────── */
.tag-bridge__text {
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--lx-text);
}

@media (max-width: 1023px) {
  .tag-groups__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .tag-groups__inner {
    grid-template-columns: 1fr;
  }
}
</style>
