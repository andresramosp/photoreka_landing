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
                    <n-icon size="16"><ChatbubblesOutline /></n-icon>
                    Photoreka's ChatLab Assistant
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Your photo library,<br />
                  <span class="gradient-text">finally intelligent</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Ask anything about your catalog in plain language.
                  <em>"What are my weakest photos?"</em>,
                  <em>"Build a sequence of my 5 best portraits"</em>,
                  <em>"Have I improved in the last 6 months?"</em>—and get a
                  real answer backed by your actual work.<br /><br />
                  Photoreka's AI assistant knows every photo you've taken,
                  understands your style, and turns your archive into a
                  <strong>conversation</strong>.
                </p>

                <div class="hero-actions" :class="{ visible: heroVisible }">
                  <n-button
                    type="primary"
                    size="large"
                    strong
                    @click="goToApp"
                    class="cta-primary"
                  >
                    <template #icon>
                      <n-icon><RocketOutline /></n-icon>
                    </template>
                    Try the Assistant
                  </n-button>
                  <n-button
                    strong
                    secondary
                    type="primary"
                    size="large"
                    @click="goToSignup"
                  >
                    <template #icon>
                      <n-icon><KeyOutline /></n-icon>
                    </template>
                    Join Waiting List
                  </n-button>
                </div>
                <p class="cta-note">No credit card required · Free to start</p>
              </div>

              <!-- Right: Chat UI Mockup -->
              <div class="hero-visual" :class="{ visible: heroVisible }">
                <div class="chat-mockup">
                  <div class="chat-header">
                    <div class="chat-header-dot dot-red"></div>
                    <div class="chat-header-dot dot-yellow"></div>
                    <div class="chat-header-dot dot-green"></div>
                    <span class="chat-header-title">ChatLab</span>
                  </div>
                  <div class="chat-messages">
                    <div
                      v-for="(msg, i) in demoMessages"
                      :key="i"
                      class="chat-msg"
                      :class="[msg.role, { visible: heroVisible }]"
                      :style="{ transitionDelay: `${0.4 + i * 0.18}s` }"
                    >
                      <div v-if="msg.role === 'assistant'" class="msg-avatar">
                        <n-icon size="14"><SparklesOutline /></n-icon>
                      </div>
                      <div class="msg-bubble">{{ msg.text }}</div>
                    </div>
                  </div>
                  <div class="chat-input-row">
                    <span class="chat-input-placeholder"
                      >Ask about your photos…</span
                    >
                    <n-icon size="18" class="chat-send-icon"
                      ><SendOutline
                    /></n-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Example Conversations Section -->
        <section class="examples-section" ref="examplesSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: examplesVisible }">
              <h2 class="section-title">
                Ask questions no search bar can answer
              </h2>
              <p class="section-subtitle">
                The assistant understands your entire catalog and responds with
                insights, curated selections, and honest feedback—in whatever
                language you write in.
              </p>
            </div>

            <div class="examples-grid" :class="{ visible: examplesVisible }">
              <div
                v-for="(group, i) in conversationExamples"
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
                Two AIs working together to give you the most useful answer for
                each question.
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

        <!-- Features Section -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">
                Everything your archive has been trying to tell you
              </h2>
              <p class="section-subtitle">
                The assistant doesn't just search—it reasons, curates, and
                reflects on your photographic practice.
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

        <!-- FAQ Section -->
        <section class="faq-section" ref="faqSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: faqVisible }">
              <h2 class="section-title">Frequently Asked Questions</h2>
              <p class="section-subtitle">
                Everything you need to know about the AI assistant
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
                Start the conversation with your archive
              </h2>
              <p class="cta-description">
                Your photos have always been trying to tell you something about
                your style, your progress, your voice. Now you can finally ask.
              </p>
              <div class="cta-buttons">
                <n-button
                  type="primary"
                  size="large"
                  strong
                  @click="goToApp"
                  class="cta-primary"
                >
                  <template #icon>
                    <n-icon><RocketOutline /></n-icon>
                  </template>
                  Try the Assistant
                </n-button>
                <n-button
                  strong
                  secondary
                  type="primary"
                  size="large"
                  @click="goToSignup"
                >
                  <template #icon>
                    <n-icon><KeyOutline /></n-icon>
                  </template>
                  Join Waiting List
                </n-button>
              </div>
              <div class="cta-extra">
                <p>
                  Want to explore your photos in 3D space?
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
  ChatbubblesOutline,
  RocketOutline,
  KeyOutline,
  ChevronDownOutline,
  SparklesOutline,
  SendOutline,
  SearchOutline,
  FlashOutline,
  EyeOutline,
  ImagesOutline,
  SpeedometerOutline,
  TrendingUpOutline,
  ColorPaletteOutline,
  GridOutline,
  BookOutline,
  StarOutline,
  PodiumOutline,
  LayersOutline,
  BulbOutline,
  AnalyticsOutline,
  PersonOutline,
  RepeatOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("photo_chat");

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
const crossSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

const heroVisible = ref(false);
const examplesVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const crossVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// Demo chat messages shown in the hero mockup
const demoMessages = ref([
  {
    role: "user",
    text: "What's my weakest area as a photographer?",
  },
  {
    role: "assistant",
    text: "Looking at your 2,847 photos… Your composition is strong across the board, but artificial lighting is your main gap—71% of those shots score below average. Portraits under natural light are consistently your best work.",
  },
  {
    role: "user",
    text: "Show me my top 5 portraits for a competition",
  },
  {
    role: "assistant",
    text: "I've selected and ranked 5 portraits based on emotional impact, technical quality, and compositional strength. Sorted with the strongest opening image first.",
  },
]);

// Conversation example groups
const conversationExamples = ref([
  {
    label: "Portfolio critique",
    icon: markRaw(BookOutline),
    queries: [
      "What are my strengths and weaknesses as a photographer?",
      "Which collection best represents my style?",
      "What should I work on to improve my portfolio?",
    ],
  },
  {
    label: "Artistic evolution",
    icon: markRaw(TrendingUpOutline),
    queries: [
      "Have I improved in the last 6 months?",
      "How has my style changed since 2022?",
      "When did I start shooting more in black and white?",
    ],
  },
  {
    label: "Curation & sequences",
    icon: markRaw(LayersOutline),
    queries: [
      "Build a narrative sequence from my Venice trip",
      "Pick my 3 strongest images for an exhibition",
      "Create a before/after series showing my progression",
    ],
  },

  {
    label: "Visual statistics",
    icon: markRaw(AnalyticsOutline),
    queries: [
      "What subjects do I photograph the most?",
      "What's my most common lighting style?",
      "How many photos have I taken this year vs last?",
    ],
  },
]);

// How it works steps
const steps = ref([
  {
    title: "You ask a question in plain language",
    description:
      "Write naturally—in English, Spanish, French, or any language you prefer. The assistant understands conversational phrasing, follow-up questions, and references to previous messages in the session.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "The AI selects the right tools for your question",
    description:
      "Your question is automatically classified and routed to the most suitable underlying AI. Creative and curatorial questions go to one model; catalog analytics and search go to another. You never have to think about this.",
    color: "linear-gradient(135deg, #a855f7, #ec4899)",
  },
  {
    title: "Your photos and data are fetched in parallel",
    description:
      "The assistant queries your catalog, pulls relevant photo data, and—when needed—analyzes the actual images (not just metadata). Multiple data sources can be combined in a single response.",
    color: "linear-gradient(135deg, #6366f1, #2563eb)",
  },
  {
    title: "You get a concise answer with a curated photo set",
    description:
      "The response comes as text plus a ranked, intentionally ordered list of photos. The order is meaningful: it can represent a quality ranking, a narrative sequence, a before/after comparison, or a thematic grouping.",
    color: "linear-gradient(135deg, #22c55e, #06b6d4)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(BookOutline),
    title: "Portfolio Critique",
    description:
      "Ask for an honest evaluation of your work. The assistant analyzes your full catalog to identify recurring strengths, blind spots, and patterns you may not have noticed yourself.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(TrendingUpOutline),
    title: "Artistic Evolution",
    description:
      "Track how your photography has changed over time. The assistant can map your stylistic development, highlight turning points, and tell you whether your technique is improving.",
    color: "#a855f7",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Intelligent Curation",
    description:
      "Ask for a competition selection, a gallery wall sequence, or a narrative series. The assistant picks and orders photos with curatorial intent—not just by score or date.",
    color: "#6366f1",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Conversational Search",
    description:
      "Describe what you're looking for and the assistant will find it—from 'golden light portraits' to 'the series I shot in Barcelona last spring'. The more context you give, the better it filters.",
    color: "#2563eb",
  },
  {
    icon: markRaw(AnalyticsOutline),
    title: "Catalog Insights",
    description:
      "Discover patterns in your work: what subjects you gravitate toward, which lighting scenarios dominate, how your color palette has evolved. Visual statistics made human.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(BulbOutline),
    title: "Personalized Advice",
    description:
      "Get recommendations based on your actual photographic history—not generic tips. Whether it's techniques to develop, photographers to study, or gaps in your portfolio.",
    color: "#22c55e",
  },
  // {
  //   icon: markRaw(RepeatOutline),
  //   title: "Find Similar Photos",
  //   description:
  //     "Reference a photo and ask for visually or thematically similar images from your archive. Great for building consistent series or discovering overlooked shots.",
  //   color: "#f59e0b",
  // },
  // {
  //   icon: markRaw(PersonOutline),
  //   title: "Multilingual & Contextual",
  //   description:
  //     "Responds in your language. Remembers the context of your conversation so you can ask follow-up questions naturally without repeating yourself.",
  //   color: "#ec4899",
  // },
]);

// FAQs
const faqs = ref([
  {
    question: "How is this different from just searching my photos?",
    answer:
      "Search finds photos that match a description. The assistant reasons about your catalog as a whole: it can evaluate your work, spot patterns across thousands of images, build curated sequences, and give you personalized feedback—answers that no search bar can provide.",
  },
  {
    question: "Does it actually look at my photos, or just the metadata?",
    answer:
      "Both. For most questions it combines metadata with visual embeddings (AI representations of each photo's content and style). When you ask about specific images, it also processes the actual photos directly, enabling true visual understanding of composition, mood, and lighting.",
  },
  {
    question: "Can it really critique my photography objectively?",
    answer:
      "It gives evidence-based feedback grounded in your actual catalog—composition patterns, aesthetic scores, lighting consistency, stylistic evolution. It's not flattery and it's not generic advice. That said, art is subjective, and the assistant is clear about what it's measuring and how.",
  },
  {
    question: "What languages does it support?",
    answer:
      "The assistant responds in the language you write in. Spanish, English, French, Portuguese, German, Italian, and most major languages are fully supported. Just write naturally.",
  },
  {
    question: "How many photos does it need to give useful answers?",
    answer:
      "You'll start seeing useful insights from around 50–100 photos. Catalog-level questions (evolution, statistics, portfolio critique) become richer as your archive grows. There's no upper limit—it works well with 10,000+ images.",
  },
  {
    question: "Can I use it to prepare for a competition or exhibition?",
    answer:
      "Yes, that's one of its strongest use cases. You can ask for a ranked selection of your best work, a thematically coherent sequence, or a specific number of images that tell a story—the assistant will select and order them with curatorial intent.",
  },
  {
    question: "Does it remember previous conversations?",
    answer:
      "Within a session, the assistant remembers the recent conversation so you can ask follow-up questions naturally. Long-term memory across sessions is on the roadmap.",
  },
  {
    question: "Is my photo data private?",
    answer:
      "Yes. The assistant only accesses your own catalog—it has no visibility into other users' libraries. Your photos are processed under Photoreka's privacy policy, and your full-resolution originals are never uploaded unless you explicitly share them.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "photo_chat_page");
  navigateTo("/");
};

const goToApp = () => {
  trackUserAction("navigate_to_app", "photo_chat_page");
  const appUrl = config.public.appUrl || "https://app.photoreka.com";
  window.open(`${appUrl}/demo`, "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "photo_chat_page");
  showRequestDialog.value = true;
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "photo_chat_page");
  navigateTo("/photo_3D_atlas");
};

const goToAiSearch = () => {
  trackUserAction("navigate_to_ai_search", "photo_chat_page");
  navigateTo("/ai_photo_search");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "photo_chat",
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
  watch(crossSection, crossVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();

  trackEvent("page_view", {
    page: "photo_chat",
    page_title: "ChatLab – Photoreka",
  });
});
</script>

<style scoped>
/* ─── Page Container ─────────────────────────────────────── */
.framer-page {
  min-height: 100vh;
  background: var(--premium-bg-primary);
  color: var(--premium-text-primary);
}

/* ─── Navigation ─────────────────────────────────────────── */
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

/* ─── Hero ───────────────────────────────────────────────── */
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

/* ─── Hero Badge ─────────────────────────────────────────── */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #8b5cf6;
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

/* ─── Hero Title / Subtitle ──────────────────────────────── */
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

.hero-subtitle {
  max-width: 600px;
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

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}

.cta-note {
  font-size: 0.85rem;
  color: var(--premium-text-secondary);
  margin-top: -0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

/* cta-note follows the visible class cascade from hero-badge since hero is set
   visible on mount – we apply it directly */
.framer-hero .cta-note {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.6s;
}

/* ─── Hero Visual ────────────────────────────────────────── */
.hero-visual {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  border-radius: 20px;
  overflow: hidden;
}

.hero-visual.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ─── Chat Mockup ────────────────────────────────────────── */
.chat-mockup {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 25px 60px -12px rgba(0, 0, 0, 0.45),
    0 0 0 1px var(--premium-border);
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--premium-border);
  background: var(--premium-bg-secondary);
}

.chat-header-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-red {
  background: #ff5f57;
}
.dot-yellow {
  background: #ffbd2e;
}
.dot-green {
  background: #28c840;
}

.chat-header-title {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--premium-text-secondary);
}

.chat-messages {
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-msg {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-msg.visible {
  opacity: 1;
  transform: translateY(0);
}

.chat-msg.user {
  flex-direction: row-reverse;
}

.msg-avatar {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 2px;
}

.msg-bubble {
  max-width: 78%;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.55;
}

.chat-msg.user .msg-bubble {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  border-radius: 16px 16px 4px 16px;
}

.chat-msg.assistant .msg-bubble {
  background: var(--premium-bg-hover);
  color: var(--premium-text-primary);
  border: 1px solid var(--premium-border);
  border-radius: 16px 16px 16px 4px;
}

.chat-input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--premium-border);
  background: var(--premium-bg-secondary);
}

.chat-input-placeholder {
  font-size: 0.9rem;
  color: var(--premium-text-secondary);
  opacity: 0.6;
}

.chat-send-icon {
  color: #8b5cf6;
  cursor: pointer;
}

/* ─── Gradient Effects ───────────────────────────────────── */
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
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  top: -300px;
  right: -200px;
}

.orb-2 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #6366f1, #2563eb);
  bottom: -200px;
  left: -250px;
  animation-delay: -10s;
}

.orb-3 {
  width: 550px;
  height: 550px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
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

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}

.gradient-text-blue {
  background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}

/* ─── Sections (shared) ──────────────────────────────────── */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 3rem;
}

.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--premium-text-secondary);
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ─── Examples Section ───────────────────────────────────── */
.examples-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
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
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.example-group:hover {
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-3px);
}

.example-group-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8b5cf6;
  margin-bottom: 1rem;
}

.example-queries {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.query-chip {
  display: inline-block;
  font-size: 0.9rem;
  color: var(--premium-text-secondary);
  line-height: 1.5;
  font-style: italic;
}

/* ─── How It Works ───────────────────────────────────────── */
.how-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}

.steps-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.steps-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.step-card {
  display: flex;
  gap: 2rem;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateX(6px);
  border-color: rgba(139, 92, 246, 0.35);
}

.step-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
}

/* ─── Features Grid ──────────────────────────────────────── */
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
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.12);
}

.feature-icon {
  margin-bottom: 1.25rem;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.feature-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* ─── Cross-promo Section ────────────────────────────────── */
.cross-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}

.cross-badge {
  background: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.3);
  color: #2563eb;
}

.cross-title {
  font-size: clamp(2rem, 4vw, 3rem) !important;
}

.cross-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cross-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--premium-text-primary);
  font-size: 0.95rem;
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

.video-frame {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: var(--premium-bg-card);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--premium-border);
}

.hero-video {
  width: 100%;
  height: auto;
  display: block;
}

/* ─── FAQ Section ────────────────────────────────────────── */
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
  border-color: #8b5cf6;
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
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── CTA Section ────────────────────────────────────────── */
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
  font-size: 1.2rem;
  color: var(--premium-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.cta-extra {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--premium-border);
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
}

.cta-link {
  color: #8b5cf6;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-link:hover {
  text-decoration: underline;
}

/* ─── Responsive ─────────────────────────────────────────── */
@media (max-width: 968px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-content {
    text-align: center;
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-subtitle {
    max-width: 100%;
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

  .features-grid,
  .examples-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .step-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cross-features li {
    font-size: 0.9rem;
  }
}
</style>
