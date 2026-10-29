<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="photo_chat_page" :links="navLinks" />

        <PageHero eyebrow="AI Photo Assistant · Find · Organize · Critique">
          <template #title>
            Find your best photos by
            <em class="lx-accent">chatting with your library</em>
          </template>
          <p>
            Photoreka is like
            <strong>ChatGPT for your photo library</strong>—ask it to find your
            best shots, organize your catalog, or critique your portfolio,
            combining AI curation with
            <NuxtLink to="/ai_photo_search">library search</NuxtLink>, all in
            plain language.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToApp">
              Try the Assistant
            </LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #note>
            <span class="lx-status">No credit card required · Free to start</span>
          </template>
          <template #visual>
            <ShotFrame
              video="/videos/Chatlab_Largo_1.mp4"
              poster="/home/video_poster.jpg"
              alt="Photoreka ChatLab answering questions about a photo library"
              label="Photoreka — ChatLab"
              ratio="16 / 9"
            />
          </template>
        </PageHero>

        <section id="examples" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="What you can ask" align="center">
              <template #title>
                Ask AI to find, organize,
                <em class="lx-accent">and critique your photos</em>
              </template>
              <p>
                This is more than AI photo search. The assistant uses AI to
                organize your full catalog and responds with your best photos,
                curated selections, honest photography critique, and tracking of
                your improvement over time—in whatever language you write.
              </p>
            </SectionIntro>
            <PageGrid :items="conversationExamples" :columns="2">
              <template #item="{ item }">
                <ul class="chat-prompts">
                  <li v-for="query in item.queries" :key="query">
                    “{{ query }}”
                  </li>
                </ul>
              </template>
            </PageGrid>
          </div>
        </section>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How it <em class="lx-accent">works</em>
              </template>
              <p>
                An AI photo assistant and photo catalog search engine working
                together on the same query.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Everything an AI photo assistant
                <em class="lx-accent">should do for your archive</em>
              </template>
              <p>
                It does not stop at finding images. It reasons across your photo
                library, curates selections, and explains what is happening in
                your work.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <section id="engines" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Same catalog, more ways in" align="center">
              <template #title>
                Built on the same
                <em class="lx-accent">search and scoring engines</em>
              </template>
              <p>
                Every answer in ChatLab draws on Photoreka's own semantic search
                index and multi-dimensional photo scores. Prefer a focused
                interface instead of a conversation? The same intelligence is
                available directly.
              </p>
            </SectionIntro>

            <div class="chat-cross">
              <NuxtLink
                v-for="(link, index) in crossLinks"
                :key="link.to"
                v-reveal="index * 90"
                :to="link.to"
                class="chat-cross__item"
                @click="link.onClick?.()"
              >
                <span class="chat-cross__icon" :style="{ color: link.color }">
                  <n-icon size="20"><component :is="link.icon" /></n-icon>
                </span>
                <span class="chat-cross__title">
                  {{ link.label }}
                  <n-icon size="16"><ArrowForwardOutline /></n-icon>
                </span>
                <span class="chat-cross__desc">{{ link.text }}</span>
              </NuxtLink>
            </div>
          </div>
        </section>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>
            What photographers usually want to know about AI photo chat and
            photo library search
          </p>
        </FaqSection>

        <PageCta>
          <template #title>
            Start chatting with
            <em class="lx-accent">your photo catalog</em>
          </template>
          <p>
            Search your photo library, ask for critique, and build curated
            selections from the same AI assistant.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToApp">
              Try the Assistant
            </LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Want to explore your photos in 3D space?
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
  SearchOutline,
  TrendingUpOutline,
  GridOutline,
  BookOutline,
  LayersOutline,
  BulbOutline,
  AnalyticsOutline,
  BarChartOutline,
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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

const showRequestDialog = ref(false);

const navLinks = [
  { label: "Examples", target: "examples" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "Engines", target: "engines" },
  { label: "FAQ", target: "faq" },
];

// Conversation example groups
const conversationExamples = [
  {
    title: "Portfolio critique",
    icon: markRaw(BookOutline),
    queries: [
      "What are my strengths and weaknesses as a photographer?",
      "Which collection best represents my style?",
      "What should I work on to improve my portfolio?",
    ],
  },
  {
    title: "Artistic evolution",
    icon: markRaw(TrendingUpOutline),
    queries: [
      "Have I improved in the last 6 months?",
      "How has my style changed since 2022?",
      "When did I start shooting more in black and white?",
    ],
  },
  {
    title: "Curation & sequences",
    icon: markRaw(LayersOutline),
    queries: [
      "Build a narrative sequence from my Venice trip",
      "Pick my 3 strongest images for an exhibition",
      "Create a before/after series showing my progression",
    ],
  },

  {
    title: "Visual statistics",
    icon: markRaw(AnalyticsOutline),
    queries: [
      "What subjects do I photograph the most?",
      "What's my most common lighting style?",
      "How many photos have I taken this year vs last?",
    ],
  },
];

// How it works steps
const steps = [
  {
    title: "You ask a question in plain language",
    description:
      "Write naturally—in English, Spanish, French, or any language you prefer. The assistant understands conversational phrasing, follow-up questions, and references to previous messages in the session.",
  },
  {
    title: "The AI selects the right tools for your question",
    description:
      "Your question is automatically classified and routed to the most suitable underlying AI. Creative and curatorial questions go to one model; catalog analytics and search go to another. You never have to think about this.",
  },
  {
    title: "Your photos and data are fetched in parallel",
    description:
      "The assistant queries your catalog, pulls relevant photo data, and—when needed—analyzes the actual images (not just metadata). Multiple data sources can be combined in a single response.",
  },
  {
    title: "You get a concise answer with a curated photo set",
    description:
      "The response comes as text plus a ranked, intentionally ordered list of photos. The order is meaningful: it can represent a quality ranking, a narrative sequence, a before/after comparison, or a thematic grouping.",
  },
];

// Features
const features = [
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
];

// FAQs
const faqs = [
  {
    question: "Can the AI find my best photos automatically?",
    answer:
      "Yes. Just ask it to find your best photos and it ranks your strongest shots across your entire library—by composition, expression, and technical quality—then explains why each one stands out. It is one of the fastest ways to surface portfolio-worthy images you may have overlooked.",
  },
  {
    question: "Can it critique my portfolio like an editor would?",
    answer:
      "Yes. Ask it to review a shoot or critique your portfolio and it gives evidence-based feedback grounded in your actual catalog—composition patterns, aesthetic scores, lighting consistency, and stylistic evolution. It is honest, not flattering, and clear about what it is measuring.",
  },
  {
    question: "Can it help me organize my photo library with AI?",
    answer:
      "Absolutely. Beyond chat, Photoreka uses AI to understand and organize your catalog so you can group, filter, and curate by subject, style, lighting, or quality—without manual tagging. The assistant works on top of that organized library to answer your questions.",
  },
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
];

const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToApp = () => {
  trackUserAction("navigate_to_app", "photo_chat_page");
  const appUrl = config.public.appUrl || "https://app.photoreka.com";
  window.open(`${appUrl}/demo/chat-lab`, "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "photo_chat_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "photo_chat_page");
  navigateTo("/photo_3D_atlas");
};

const goToAiSearch = () => {
  trackUserAction("navigate_to_ai_search", "photo_chat_page");
};

const goToScoring = () => {
  trackUserAction("navigate_to_scoring", "photo_chat_page");
};

const crossLinks = [
  {
    to: "/ai_photo_search",
    label: "AI Photo Search",
    text: "Describe a photo in plain language and find it instantly, no tagging required.",
    icon: markRaw(SearchOutline),
    color: "#06b6d4",
    onClick: goToAiSearch,
  },
  {
    to: "/photo_scoring",
    label: "AI Photo Scoring",
    text: "The same aesthetic, composition, and narrative scores, ranked and filterable across your whole catalog.",
    icon: markRaw(BarChartOutline),
    color: "#f59e0b",
    onClick: goToScoring,
  },
  {
    to: "/ai_photo_storyboard",
    label: "AI Photo Storyboard",
    text: "The same assistant docked to an infinite canvas, where it reads how your photos are arranged and helps you sequence them.",
    icon: markRaw(GridOutline),
    color: "#8b5cf6",
  },
];

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "photo_chat",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", {
    page: "photo_chat",
    page_title: "ChatLab – Photoreka",
  });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
/* ── Prompt examples ───────────────────────────────────────── */
.chat-prompts {
  display: grid;
  gap: 0.55rem;
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
}

.chat-prompts li {
  padding: 0.6rem 0.9rem;
  border-radius: var(--lx-radius-sm);
  background: var(--lx-surface-2);
  border: 1px solid var(--lx-line);
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 340;
  font-size: 1.04rem;
  line-height: 1.4;
  color: var(--lx-text-2);
}

/* ── Cross-links to search, scoring and storyboard ─────────── */
.chat-cross {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.chat-cross__item {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: clamp(24px, 2.6vw, 36px);
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface);
  box-shadow: var(--lx-highlight);
  color: var(--lx-text);
  text-decoration: none;
  transition:
    transform 0.6s var(--lx-ease),
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.chat-cross__item:hover {
  transform: translateY(-4px);
  border-color: var(--lx-line-3);
  background: var(--lx-surface-2);
}

.chat-cross__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 0.5rem;
  border-radius: 13px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}

.chat-cross__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.chat-cross__title .n-icon {
  transition: transform 0.5s var(--lx-ease);
}

.chat-cross__item:hover .chat-cross__title .n-icon {
  transform: translateX(4px);
}

.chat-cross__desc {
  font-size: 0.94rem;
  line-height: 1.7;
  color: var(--lx-text-2);
}

@media (max-width: 1023px) {
  .chat-cross {
    grid-template-columns: 1fr;
  }
}
</style>
