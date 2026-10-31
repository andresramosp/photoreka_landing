<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_photo_search_page" :links="navLinks" />

        <PageHero eyebrow="AI search across your own library">
          <template #title>
            Find any photo in
            <em class="lx-accent">your own catalog</em>
            just by describing it
          </template>
          <p>
            Point Photoreka at <strong>your own photo library</strong>—local
            files, Lightroom, Google Photos, Dropbox—and it learns what's inside
            every shot. Then stop scrolling through thousands of images trying
            to remember where something is. Just type what you remember—
            <em>"rainy street at night with reflections"</em>,
            <em>"smiling kid, warm light, shallow focus"</em>,
            <em>"Blade Runner-style atmosphere"</em>—and it surfaces the photo
            instantly.
          </p>
          <p>
            No tagging. No folders. No metadata editing. Pure
            <strong>semantic search</strong> powered by computer vision AI that
            understands your photos the way you do
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #note>
            <span>Shooting commercial work?</span>
            <button class="lx-link" @click="goToCommercialDemo">
              Try the commercial demo
              <n-icon size="15"><ArrowForwardOutline /></n-icon>
            </button>
          </template>
          <template #visual>
            <ShotFrame
              video="/videos/Search.mp4"
              poster="/home/video_poster.jpg"
              alt="Photoreka AI photo search by natural language"
              label="Photoreka — Search"
              ratio="16 / 9"
              :playback-rate="0.8"
            />
          </template>
        </PageHero>

        <section id="examples" class="lx-section">
          <div class="lx-container search-examples">
            <SectionIntro
              eyebrow="Search examples"
              flush
              class="search-examples__intro"
            >
              <template #title>
                Search your catalog
                <em class="lx-accent">the way you think</em>
              </template>
              <p>
                Photoreka reads every photo in your library and understands
                natural language, visual descriptions, emotions, styles, and
                even references to other photographers or films. If you can
                describe it, you can find it in your archive.
              </p>
            </SectionIntro>
            <ul class="search-examples__list">
              <li
                v-for="(group, i) in searchExamples"
                :key="group.title"
                v-reveal="i * 60"
                class="search-examples__row"
              >
                <h3 class="search-examples__label">
                  <span
                    class="search-examples__icon"
                    :style="{ color: group.color }"
                  >
                    <n-icon size="16"><component :is="group.icon" /></n-icon>
                  </span>
                  {{ group.title }}
                </h3>
                <ul class="search-queries">
                  <li v-for="query in group.queries" :key="query">
                    “{{ query }}”
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section id="modes" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Search modes" align="center">
              <template #title>
                Three search modes,
                <em class="lx-accent">honest about precision</em>
              </template>
              <p>
                Most AI photo search tools use a single embedding model. When
                results drift, they call it "associative" or "metaphorical"—but
                that's just imprecision with better branding. Photoreka gives
                you three distinct modes and tells you exactly what each one
                does.
              </p>
            </SectionIntro>

            <div class="search-modes">
              <div v-reveal class="search-modes__side">
                <div class="lx-tabs" role="tablist" aria-label="Search modes">
                  <button
                    v-for="(mode, i) in searchModes"
                    :id="`search-tab-${i}`"
                    :key="mode.kicker"
                    type="button"
                    role="tab"
                    class="lx-tab"
                    :class="{ 'is-active': activeMode === i }"
                    :aria-selected="activeMode === i"
                    :aria-controls="`search-panel-${i}`"
                    @click="activeMode = i"
                  >
                    <span
                      class="lx-tab__dot"
                      :style="{ background: mode.color }"
                    />
                    {{ mode.kicker }}
                  </button>
                </div>

                <!-- Every panel stays in the DOM so all the copy is indexable. -->
                <div
                  v-for="(mode, i) in searchModes"
                  v-show="activeMode === i"
                  :id="`search-panel-${i}`"
                  :key="mode.kicker"
                  class="lx-panel"
                  role="tabpanel"
                  :aria-labelledby="`search-tab-${i}`"
                >
                  <h3 class="search-panel__title">{{ mode.title }}</h3>
                  <p class="search-panel__text">{{ mode.description }}</p>
                  <p class="search-mode-example">
                    <span>Example</span>
                    <em>“{{ mode.example }}”</em>
                  </p>
                </div>
              </div>

              <div
                v-reveal="{ variant: 'scale', delay: 120 }"
                class="search-modes__shot"
              >
                <ShotFrame
                  src="/home/search_results.jpg"
                  alt="Photoreka search results: a grid of matching photos from your own catalog, ranked by relevance"
                  label="Photoreka — Search"
                  ratio="7 / 4"
                  fit="cover"
                  focus="100% 50%"
                />
              </div>
            </div>

            <div v-reveal="120" class="lx-card search-alt">
              <div class="search-alt__copy">
                <h3 class="lx-title lx-title--md">
                  A real
                  <em class="lx-accent">Excire Search alternative</em>
                </h3>
                <p class="search-alt__text">
                  Excire Search, Mylio Photos, and DigiKam use CLIP-based
                  embeddings with a hard ~77-token limit—long queries get
                  silently truncated, and a single mode means results are always
                  associative. Photoreka has no query length limit and adds a
                  Precise mode that <em>verifies</em> candidates against your
                  exact conditions rather than just ranking by vector proximity.
                </p>
                <p class="search-alt__note">
                  Also relevant if you're looking for an alternative to
                  <strong>Google Photos</strong> (avoid cloud lock-in),
                  <strong>Mylio Photos</strong>, or
                  <strong>DigiKam</strong>—none of which offer the search depth
                  or curation tools of Photoreka.
                </p>
              </div>
              <ul class="lx-list search-alt__list">
                <li>
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    >Unlimited query length — no silent truncation of complex
                    descriptions</span
                  >
                </li>
                <li>
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    >Three honest modes instead of one broad model rebranded as
                    "intelligent"</span
                  >
                </li>
                <li>
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    >Enriched result insights — understand <em>why</em> each
                    photo surfaced</span
                  >
                </li>
                <li>
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    ><NuxtLink to="/photo_chat" class="lx-inline-link"
                      >ChatLab</NuxtLink
                    >: an LLM vision layer for conversational, iterative
                    refinement</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How it <em class="lx-accent">works</em>
              </template>
              <p>
                No black box. Here's exactly what happens when you type a query.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                More than <em class="lx-accent">keyword search</em>
              </template>
              <p>
                Photoreka's search understands context, mood, composition, and
                intent—not just the words in your metadata.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <MediaSplitSection
          id="lightroom"
          eyebrow="Also available in Lightroom Classic"
          video="/videos/lr_plugin.mp4"
          poster="/home/video_lr_poster.jpg"
          alt="Photoreka search panel inside Adobe Lightroom Classic"
          label="Lightroom Classic — Photoreka"
          reverse
        >
          <template #title>
            Search directly from
            <em class="lx-accent">Lightroom Classic</em>
          </template>
          <ul class="lx-list search-lr">
            <li v-for="item in lightroomPoints" :key="item.text">
              <span class="search-lr__icon" :style="{ color: item.color }">
                <n-icon size="17"><component :is="item.icon" /></n-icon>
              </span>
              <span>{{ item.text }}</span>
            </li>
          </ul>
          <template #actions>
            <LxButton
              icon="download"
              to="/lightroom_search_plugin"
              @click="onLightroomPlugin"
            >
              See the Plugin
            </LxButton>
          </template>
        </MediaSplitSection>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about AI photo search</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Stop searching. <em class="lx-accent">Start finding.</em>
          </template>
          <p>
            Your archive has been waiting to be understood. Try the demo and
            search your photos the way you've always wanted—by describing what
            you see, feel, and remember.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Want to see how photos are organized in space?
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
  ArrowForwardOutline,
  ChatbubblesOutline,
  SpeedometerOutline,
  LockClosedOutline,
  LinkOutline,
  SyncOutline,
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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

const showRequestDialog = ref(false);

const navLinks = [
  { label: "Examples", target: "examples" },
  { label: "Modes", target: "modes" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "Lightroom", target: "lightroom" },
  { label: "FAQ", target: "faq" },
];

// Search example groups
const searchExamples = [
  {
    title: "By subject & scene",
    icon: markRaw(ImagesOutline),
    color: "#06b6d4",
    queries: [
      "street scene at dusk with neon signs",
      "child laughing on the beach",
      "empty road through a forest in autumn",
    ],
  },
  {
    title: "By mood & emotion",
    icon: markRaw(HappyOutline),
    color: "#f59e0b",
    queries: [
      "melancholic portrait in window light",
      "joyful chaos at a family gathering",
      "quiet solitude, minimalist composition",
    ],
  },
  {
    title: "By light & color",
    icon: markRaw(ColorPaletteOutline),
    color: "#ec4899",
    queries: [
      "warm golden hour backlight",
      "high contrast black and white, deep shadows",
      "pastel tones, soft diffused light",
    ],
  },
  {
    title: "By style & reference",
    icon: markRaw(FilmOutline),
    color: "#8b5cf6",
    queries: [
      "Blade Runner-style atmosphere",
      "Vivian Maier street photography feel",
      "cinematic wide angle, desaturated",
    ],
  },
  {
    title: "Super precise & logical",
    icon: markRaw(GridOutline),
    color: "#22c55e",
    queries: [
      "silhouette with sun behind",
      "three people looking at the camera",
      "car speeding through rain at night",
    ],
  },
  {
    title: "Nuanced & broad",
    icon: markRaw(EyeOutline),
    color: "#2563eb",
    queries: [
      "tension and release",
      "nostalgia mixed with hope",
      "abandoned but not desolate",
    ],
  },
];

// How it works steps
const steps = [
  {
    title: "Your photos are analyzed once",
    description:
      "When you upload or sync your library, Photoreka's computer vision model processes each photo and extracts a high-dimensional visual embedding—a numerical representation that captures content, mood, composition, colors, and style.",
  },
  {
    title: "Your query becomes a vector too",
    description:
      "When you type a search, Photoreka converts your text into a vector in the same semantic space as your photo embeddings using a multimodal AI model trained to align language and images.",
  },
  {
    title: "Similarity search returns results instantly",
    description:
      "A fast vector similarity search (cosine distance) finds the photos whose embeddings are closest to your query vector. Results are ranked by semantic relevance—not by filename, date, or metadata.",
  },
  {
    title: "Results improve as you refine",
    description:
      "You can combine queries, filter by date or source, and use figurative or emotional language. The more specific your description, the more precise the results—even across 100,000+ photos.",
  },
];

// Features
const features = [
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
];

// Search modes (Broad / Adaptive / Precise)
const searchModes = [
  {
    kicker: "Broad",
    title: "Broad search",
    description:
      "Pure embedding similarity — your query and every photo coexist in the same semantic space. Fast, associative, and ideal when you're exploring or describing mood, style, and feeling rather than specific facts.",
    example: "abandoned but not desolate",
    color: "#a78bfa",
  },
  {
    kicker: "Adaptive",
    title: "Adaptive search",
    description:
      "Designed for cultural references and stylistic shorthand. When you type 'Blade Runner-inspired photos', Photoreka automatically unpacks what that means — neon reflections, wet asphalt, dystopian atmosphere, high contrast — and adds those nuances under the hood. It uses Broad's recall strength and enriches it with the implicit vocabulary your reference carries.",
    example: "Blade Runner-inspired photos",
    color: "var(--lx-accent)",
  },
  {
    kicker: "Precise",
    title: "Precise search",
    description:
      "Adds a logical inference layer on top of embeddings. The model doesn't just rank candidates by vector proximity — it reasons through your description and actively verifies that each result meets your specific conditions. Real precision, not rebranded association.",
    example:
      "exactly three people, at least one looking away from camera, outdoor setting",
    color: "var(--lx-ok)",
  },
];

const activeMode = ref(0);

const lightroomPoints = [
  {
    icon: markRaw(SyncOutline),
    color: "#2563eb",
    text: "Reads your existing catalog—nothing changes",
  },
  {
    icon: markRaw(ChatbubblesOutline),
    color: "#8b5cf6",
    text: "Search panel integrated inside Lightroom",
  },
  {
    icon: markRaw(LockClosedOutline),
    color: "#22c55e",
    text: "All processing runs locally on your machine",
  },
  {
    icon: markRaw(LinkOutline),
    color: "#f59e0b",
    text: "Compatible with Lightroom Classic 13.0+",
  },
];

// FAQs
const faqs = [
  {
    question:
      "Does Photoreka search the internet, social media, or stock photos?",
    answer:
      "No. Photoreka only searches your own photo catalog—the images you've shot and imported into the app (from local files, Lightroom Classic, Google Photos, Dropbox, etc.). It never searches the web, Facebook, Instagram, or stock libraries. Think of it as a smart search box for your personal or professional archive, not a search engine for photos you don't own.",
  },
  {
    question: "Does Photoreka generate images with AI?",
    answer:
      "No. Photoreka does not create or generate any images. It uses AI to understand and find the real photos that already exist in your catalog. When you describe what you're looking for, it returns your own existing photos that match—nothing is invented or synthesized.",
  },
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
    question: "How does Photoreka compare to Excire Search?",
    answer:
      "Excire Search is a solid Lightroom Classic plugin for short keyword prompts. Its main technical constraint is the CLIP model it's built on: a hard context window of ~77 tokens (~50 words), meaning long or nuanced queries get silently truncated. Beyond length, Excire offers a single search mode—all results are associative by embedding proximity with no way to ask for something genuinely specific. Photoreka has no query length limit, offers three distinct modes (Broad for direct similarity, Adaptive for cultural and stylistic references that auto-expands your query with the right nuances, and Precise which adds logical inference to actually verify conditions), enriches results with insights, and lets you continue refining through ChatLab's LLM vision layer. It also works across sources beyond Lightroom: Google Photos, Dropbox, and local files in a single search.",
  },
  {
    question:
      "What's the difference between Broad, Adaptive, and Precise search?",
    answer:
      "Broad search uses pure embedding similarity—fast, associative, best for mood, style, and figurative queries. Adaptive is designed for cultural references and stylistic shorthand: when you type 'Blade Runner-inspired' or 'Hopper-esque loneliness', it automatically expands your query with the implicit visual vocabulary that reference carries (neon reflections, wet asphalt, isolation, side-lit interiors…), using Broad's recall and enriching it with nuances you didn't have to spell out. Precise adds a logical inference step: a reasoning model reads your description and actively verifies each candidate result against the specific conditions you set—it doesn't just pick the nearest vectors, it checks whether the answer is actually correct. Broad is great for exploration; Adaptive for cultural or stylistic references; Precise for when you know exactly what you're looking for.",
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
      "Yes. If you have photos from Lightroom Classic, Google Photos, Dropbox, and local uploads all synced to Photoreka, a single search will return results across all of them simultaneously.",
  },
  {
    question: "What if the results aren't what I expected?",
    answer:
      "Try rephrasing your query. More descriptive language usually yields better results. You can also narrow down by date range, source, or combine the search with the 3D Atlas to visually explore adjacent clusters of similar photos.",
  },
  {
    question: "What kind of photo catalog is Photoreka designed for?",
    answer:
      "Photoreka is built for photographers who want to work with a curated body of work—not a raw dump of every file ever captured. Think of it as a studio, not a warehouse. The sweet spot is a catalog of up to 20,000 photos; up to 50,000 is tested and workable, but we recommend keeping it focused. Because analysis runs in the cloud and the tools are built around curation—sequences, semantic search, visual clusters, scores—they work best when your archive already has a baseline of intentionality: duplicates removed, clearly failed shots discarded. There is duplicate detection built in, but the value of every feature increases the more curated your starting point is.",
  },
];

const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_search_page");
  window.open("https://app.photoreka.com/demo/", "_blank");
};

// La demo comercial corre sobre su propio catálogo (/demo-commercial), no es
// una ruta dentro de /demo. Ver app/pages/commercial_photography.vue.
const goToCommercialDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_search_page", "commercial");
  window.open("https://app.photoreka.com/demo-commercial/search", "_blank");
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

const onLightroomPlugin = () => {
  trackUserAction("navigate_to_lr_plugin", "ai_photo_search_page");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "ai_photo_search",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", {
    page: "ai_photo_search",
    page_title:
      "AI Search for Your Own Photo Catalog - Find Any Photo by Describing It | Photoreka",
  });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
/* ── Search examples: intro beside a list of query rows ────── */
.search-examples {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(32px, 5vw, 88px);
  align-items: start;
}

.search-examples__intro {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 32px);
}

.search-examples__list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--lx-line-2);
}

.search-examples__row {
  display: grid;
  gap: 0.8rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid var(--lx-line-2);
}

.search-examples__label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--lx-font-display);
  font-size: 1.22rem;
  font-weight: 380;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.search-examples__icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 12%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 26%, transparent);
}

.search-queries {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.search-queries li {
  padding: 0.5rem 0.85rem;
  border-radius: var(--lx-radius-sm);
  background: var(--lx-surface-2);
  border: 1px solid var(--lx-line);
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 340;
  font-size: 1.02rem;
  line-height: 1.4;
  color: var(--lx-text-2);
}

/* ── Search modes: tabs on the left, results on the right ──── */
.search-modes {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(32px, 4.5vw, 72px);
  align-items: center;
}

.search-panel__title {
  font-family: var(--lx-font-display);
  font-size: 1.6rem;
  font-weight: 360;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.search-panel__text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--lx-text-2);
}

.search-mode-example {
  display: grid;
  gap: 0.35rem;
  margin-top: 0.4rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--lx-line);
  font-size: var(--lx-fs-sm);
  line-height: 1.5;
  color: var(--lx-text);
}

.search-mode-example span {
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.search-mode-example em {
  font-family: var(--lx-font-display);
  font-size: 1.08rem;
}

.search-alt {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  margin-top: clamp(40px, 5vw, 64px);
  padding: clamp(28px, 4.5vw, 64px);
}

.search-alt__copy {
  display: grid;
  gap: 1.25rem;
}

.search-alt__text {
  font-size: var(--lx-fs-body);
  line-height: 1.75;
  color: var(--lx-text-2);
}

.search-alt__note {
  padding-top: 1.1rem;
  border-top: 1px solid var(--lx-line);
  font-size: var(--lx-fs-sm);
  line-height: 1.7;
  color: var(--lx-text-3);
}

.search-alt__note strong {
  color: var(--lx-text-2);
  font-weight: 600;
}

/* ── Lightroom ─────────────────────────────────────────────── */
.search-lr {
  margin-top: 0.5rem;
}

.search-lr__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}

@media (max-width: 1023px) {
  .search-alt,
  .search-examples,
  .search-modes {
    grid-template-columns: minmax(0, 1fr);
  }

  .search-examples__intro {
    position: relative;
    top: auto;
  }

  /* On phones and tablets the capture comes first. */
  .search-modes__shot {
    order: -1;
  }
}
</style>
