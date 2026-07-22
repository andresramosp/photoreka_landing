<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="article-page">
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
              <n-button text @click="goToBlog" class="back-link">
                <template #icon>
                  <n-icon><ArrowBackOutline /></n-icon>
                </template>
                Back to Blog
              </n-button>
            </div>
          </div>
        </nav>

        <!-- Article header -->
        <header class="article-header">
          <div class="section-container">
            <span class="article-category">{{ post.category }}</span>
            <h1 class="article-title">{{ post.title }}</h1>
            <p class="article-excerpt">{{ post.excerpt }}</p>
            <div class="article-meta">
              <span class="author-avatar">{{ authorInitials }}</span>
              <div class="article-meta-text">
                <span class="author-name">{{ post.author.name }}</span>
                <span class="meta-line">
                  {{ formatBlogDate(post.publishedAt) }} ·
                  {{ post.readingMinutes }} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        <!-- Cover -->
        <div class="section-container">
          <div class="article-cover">
            <div v-if="post.coverPlaceholder" class="cover-placeholder">
              <n-icon size="32"><ImageOutline /></n-icon>
              <span>Cover image placeholder</span>
            </div>
            <img
              v-else
              :src="post.coverImage"
              :alt="post.title"
              class="cover-img"
            />
          </div>
        </div>

        <!-- Body -->
        <div class="section-container article-layout">
          <!-- TOC -->
          <aside v-if="post.toc && toc.length" class="article-toc">
            <div class="toc-inner">
              <span class="toc-label">On this page</span>
              <a
                v-for="item in toc"
                :key="item.id"
                :href="`#${item.id}`"
                class="toc-link"
              >
                {{ item.text }}
              </a>
            </div>
          </aside>

          <!-- Content -->
          <article class="article-content">
            <template v-for="(block, i) in post.content" :key="i">
              <p v-if="block.type === 'p'" v-html="block.html"></p>

              <h2 v-else-if="block.type === 'h2'" :id="block.id">
                {{ block.text }}
              </h2>

              <h3 v-else-if="block.type === 'h3'" :id="block.id">
                {{ block.text }}
              </h3>

              <blockquote v-else-if="block.type === 'quote'">
                <p>{{ block.text }}</p>
                <cite v-if="block.cite">{{ block.cite }}</cite>
              </blockquote>

              <ul v-else-if="block.type === 'list' && !block.ordered">
                <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
              </ul>
              <ol v-else-if="block.type === 'list' && block.ordered">
                <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
              </ol>

              <figure v-else-if="block.type === 'image'" class="article-image">
                <div v-if="block.placeholder" class="image-placeholder">
                  <n-icon size="28"><ImageOutline /></n-icon>
                  <span>{{ block.alt }}</span>
                </div>
                <img v-else :src="block.src" :alt="block.alt" />
                <figcaption v-if="block.caption">
                  {{ block.caption }}
                </figcaption>
              </figure>

              <div
                v-else-if="block.type === 'callout'"
                class="callout"
                :class="`callout--${block.variant || 'info'}`"
              >
                <n-icon size="20" class="callout-icon">
                  <BulbOutline v-if="block.variant === 'tip'" />
                  <AlertCircleOutline v-else-if="block.variant === 'warning'" />
                  <InformationCircleOutline v-else />
                </n-icon>
                <div class="callout-body">
                  <strong v-if="block.title">{{ block.title }}</strong>
                  <p v-html="block.html"></p>
                </div>
              </div>

              <div v-else-if="block.type === 'cta'" class="inline-cta">
                <span v-if="block.eyebrow" class="inline-cta-eyebrow">{{
                  block.eyebrow
                }}</span>
                <h3 class="inline-cta-title">{{ block.title }}</h3>
                <p v-if="block.text" class="inline-cta-text">
                  {{ block.text }}
                </p>
                <n-button
                  type="info"
                  size="large"
                  strong
                  @click="handleCtaClick(block)"
                >
                  <template #icon>
                    <n-icon><PlayCircleOutline /></n-icon>
                  </template>
                  {{ block.buttonLabel }}
                </n-button>
              </div>
            </template>
          </article>
        </div>

        <!-- Author + final CTA -->
        <section class="closing-section">
          <div class="section-container">
            <div class="author-card">
              <span class="author-avatar author-avatar--lg">{{
                authorInitials
              }}</span>
              <div>
                <span class="author-name">{{ post.author.name }}</span>
                <span v-if="post.author.role" class="author-role">{{
                  post.author.role
                }}</span>
              </div>
            </div>

            <div class="final-cta">
              <h2 class="final-cta-title">Stop scrolling. Start describing.</h2>
              <p class="final-cta-text">
                Try Photoreka's AI photo search on a real catalog, or create an
                account to start curating your own.
              </p>
              <div class="final-cta-buttons">
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
          </div>
        </section>

        <!-- Related posts -->
        <section v-if="relatedPosts.length" class="related-section">
          <div class="section-container">
            <h2 class="related-title">More from the blog</h2>
            <div class="related-grid">
              <NuxtLink
                v-for="related in relatedPosts"
                :key="related.slug"
                :to="`/blog/${related.slug}`"
                class="related-card"
              >
                <span class="related-category">{{ related.category }}</span>
                <h3>{{ related.title }}</h3>
                <p>{{ related.excerpt }}</p>
              </NuxtLink>
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
import { computed, ref } from "vue";
import {
  SunnyOutline,
  MoonOutline,
  ArrowBackOutline,
  ImageOutline,
  BulbOutline,
  AlertCircleOutline,
  InformationCircleOutline,
  PlayCircleOutline,
  KeyOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { getPostBySlug, getRelatedPosts, formatBlogDate } from "~/config/blog";
import { trackUserAction } from "~/utils/analytics";

const route = useRoute();
const post = getPostBySlug(route.params.slug);

if (!post) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useHead({
  title: `${post.title} | Photoreka`,
  meta: [
    {
      name: "description",
      content: post.description,
    },
  ],
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

const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();
const showRequestDialog = ref(false);

const toc = computed(() =>
  post.content
    .filter((block) => block.type === "h2")
    .map((block) => ({ id: block.id, text: block.text })),
);

const relatedPosts = getRelatedPosts(post.slug);

const authorInitials = computed(() =>
  post.author.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(),
);

const goToBlog = () => {
  trackUserAction("navigate_to_blog", "blog_article");
  navigateTo("/blog");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "blog_article", post.slug);
  window.open("https://app.photoreka.com/demo/search", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "blog_article", post.slug);
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const handleCtaClick = (block) => {
  if (block.action === "demo") {
    goToDemo();
  } else if (block.action === "signup") {
    goToSignup();
  } else if (block.action === "link" && block.href) {
    navigateTo(block.href);
  }
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

onMounted(() => {
  initTheme();
});
</script>

<style scoped>
.article-page {
  min-height: 100vh;
  background: var(--premium-bg-primary, var(--premium-bg));
  color: var(--premium-text-primary);
}

/* Nav */
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-toggle:hover {
  background: var(--premium-bg-hover);
}

.section-container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.article-header {
  padding: 9rem 0 2rem;
  text-align: center;
}
.article-category {
  display: inline-block;
  padding: 0.3rem 0.85rem;
  background: rgba(6, 182, 212, 0.12);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 50px;
  font-size: var(--fs-xs);
  font-weight: var(--font-weight-semibold);
  color: #06b6d4;
  margin-bottom: 1.25rem;
}
.article-title {
  font-size: var(--fs-hero-sm);
  font-weight: var(--font-weight-black);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tighter);
  margin: 0 0 1rem;
}
.article-excerpt {
  font-size: var(--fs-subheading);
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
  max-width: 680px;
  margin: 0 auto 1.75rem;
}
.article-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}
.article-meta-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.author-name {
  font-weight: var(--font-weight-semibold);
  font-size: var(--fs-sm);
}
.meta-line {
  color: var(--premium-text-tertiary);
  font-size: var(--fs-xs);
}
.author-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: #fff;
  font-weight: var(--font-weight-bold);
  font-size: var(--fs-sm);
}
.author-avatar--lg {
  width: 52px;
  height: 52px;
  font-size: var(--fs-md);
}

/* Cover */
.article-cover {
  margin: 0 auto 3rem;
  max-width: 860px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--premium-border);
  background: var(--premium-bg-elevated);
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-placeholder,
.image-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: var(--premium-text-tertiary);
  font-size: var(--fs-sm);
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.03) 0,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 12px
  );
}

/* Layout: TOC + content */
.article-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 3rem;
  align-items: start;
  padding-bottom: 4rem;
  max-width: 1060px;
}
.article-toc {
  position: sticky;
  top: 6.5rem;
}
.toc-inner {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-left: 2px solid var(--premium-border);
  padding-left: 1rem;
}
.toc-label {
  font-size: var(--fs-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--premium-text-tertiary);
  margin-bottom: 0.25rem;
}
.toc-link {
  font-size: var(--fs-sm);
  color: var(--premium-text-secondary);
  text-decoration: none;
  line-height: var(--line-height-normal);
  transition: color 0.2s ease;
}
.toc-link:hover {
  color: var(--premium-primary);
}

/* Article content typography */
.article-content {
  max-width: 680px;
  font-size: var(--fs-lead);
  line-height: var(--line-height-loose);
  color: var(--premium-text-primary);
}
.article-content :deep(h2) {
  font-size: var(--fs-2xl, 1.6rem);
  font-weight: var(--font-weight-bold);
  margin: 2.5rem 0 1rem;
  letter-spacing: var(--letter-spacing-tight);
  scroll-margin-top: 6rem;
}
.article-content :deep(h3) {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-semibold);
  margin: 2rem 0 0.75rem;
  scroll-margin-top: 6rem;
}
.article-content :deep(p) {
  margin: 0 0 1.25rem;
}
.article-content :deep(p) strong {
  color: var(--premium-text-primary);
  font-weight: var(--font-weight-semibold);
}
.article-content :deep(a) {
  color: var(--premium-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0 0 1.5rem;
  padding-left: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.article-content :deep(blockquote) {
  margin: 2rem 0;
  padding: 0.25rem 0 0.25rem 1.5rem;
  border-left: 3px solid var(--premium-primary);
  font-style: italic;
  font-size: var(--fs-xl);
  color: var(--premium-text-primary);
}
.article-content :deep(blockquote p) {
  margin: 0;
}
.article-content :deep(blockquote cite) {
  display: block;
  margin-top: 0.5rem;
  font-style: normal;
  font-size: var(--fs-sm);
  color: var(--premium-text-tertiary);
}

.article-image {
  margin: 2rem 0;
}
.article-image img {
  width: 100%;
  border-radius: 12px;
  display: block;
  border: 1px solid var(--premium-border);
}
.article-image .image-placeholder {
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  border: 1px dashed var(--premium-border);
}
.article-image figcaption {
  margin-top: 0.6rem;
  font-size: var(--fs-xs);
  color: var(--premium-text-tertiary);
  text-align: center;
  font-style: italic;
}

.callout {
  display: flex;
  gap: 0.85rem;
  padding: 1.25rem;
  margin: 1.75rem 0;
  border-radius: 12px;
  border: 1px solid var(--premium-border);
  background: var(--premium-bg-elevated);
}
.callout-icon {
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.callout-body {
  font-size: var(--fs-base);
  line-height: var(--line-height-relaxed);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.callout-body p {
  margin: 0;
}
.callout--tip {
  border-color: rgba(34, 197, 94, 0.35);
}
.callout--tip .callout-icon {
  color: #22c55e;
}
.callout--warning {
  border-color: rgba(245, 158, 11, 0.35);
}
.callout--warning .callout-icon {
  color: #f59e0b;
}
.callout--info .callout-icon {
  color: #06b6d4;
}

.inline-cta {
  margin: 2.5rem 0;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--premium-border);
  background: var(--premium-bg-elevated);
  text-align: center;
}
.inline-cta-eyebrow {
  display: inline-block;
  font-size: var(--fs-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: #06b6d4;
  margin-bottom: 0.5rem;
}
.inline-cta-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 0.5rem;
}
.inline-cta-text {
  color: var(--premium-text-secondary);
  margin: 0 0 1.25rem;
  font-size: var(--fs-base);
}

/* Closing */
.closing-section {
  padding: 2rem 0 5rem;
  border-top: 1px solid var(--premium-border);
}
.author-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
}
.author-card > div {
  display: flex;
  flex-direction: column;
}
.author-role {
  font-size: var(--fs-xs);
  color: var(--premium-text-tertiary);
}
.final-cta {
  text-align: center;
}
.final-cta-title {
  font-size: var(--fs-h1, 2.2rem);
  font-weight: var(--font-weight-bold);
  margin: 0 0 0.75rem;
}
.final-cta-text {
  color: var(--premium-text-secondary);
  font-size: var(--fs-lg);
  line-height: var(--line-height-loose);
  max-width: 560px;
  margin: 0 auto 2rem;
}
.final-cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Related */
.related-section {
  padding: 4rem 0 6rem;
  background: var(--premium-bg-secondary, var(--premium-bg-elevated));
}
.related-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 1.5rem;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}
.related-card {
  display: block;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--premium-border);
  background: var(--premium-bg-card, var(--premium-surface));
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}
.related-card:hover {
  transform: translateY(-4px);
  border-color: var(--premium-primary);
}
.related-category {
  font-size: var(--fs-xs);
  font-weight: var(--font-weight-semibold);
  color: #06b6d4;
}
.related-card h3 {
  font-size: var(--fs-lg);
  margin: 0.5rem 0;
}
.related-card p {
  font-size: var(--fs-sm);
  color: var(--premium-text-secondary);
  margin: 0;
}

@media (max-width: 860px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
  .article-toc {
    display: none;
  }
  .article-content {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .article-header {
    padding: 7rem 0 1.5rem;
  }
  .section-container {
    padding: 0 1.25rem;
  }
}
</style>
