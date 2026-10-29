<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page">
        <PageNav source="blog_post_page" />

        <HeroShell class="article-hero">
          <div class="lx-container article-head">
            <a
              href="/blog"
              class="lx-link article-back"
              @click.prevent="goToBlog"
            >
              <n-icon size="15"><ArrowBackOutline /></n-icon>
              Back to Blog
            </a>
            <p v-reveal class="lx-eyebrow">
              <span class="lx-eyebrow__dot" aria-hidden="true" />
              <span>{{ post.category }}</span>
            </p>
            <h1 v-split="100" class="lx-title article-title">
              {{ post.title }}
            </h1>
            <p v-reveal="260" class="lx-lead article-excerpt">
              {{ post.excerpt }}
            </p>
            <div v-reveal="340" class="article-meta">
              <span class="author-avatar">{{ authorInitials }}</span>
              <div class="article-meta__text">
                <span class="author-name">{{ post.author.name }}</span>
                <span class="article-meta__line">
                  {{ formatBlogDate(post.publishedAt) }} ·
                  {{ post.readingMinutes }} min read
                </span>
              </div>
            </div>
          </div>
        </HeroShell>

        <div class="lx-container article-cover-wrap">
          <div
            v-reveal="{ variant: 'scale', delay: 160 }"
            class="article-cover"
          >
            <div
              v-if="post.coverPlaceholder"
              class="article-cover__placeholder"
            >
              <n-icon size="32"><ImageOutline /></n-icon>
              <span>Cover image placeholder</span>
            </div>
            <img v-else :src="post.coverImage" :alt="post.title" />
          </div>
        </div>

        <div
          class="lx-container article-layout"
          :class="{ 'has-toc': post.toc && toc.length }"
        >
          <aside v-if="post.toc && toc.length" class="article-toc">
            <nav class="article-toc__inner" aria-label="On this page">
              <span class="article-toc__label">On this page</span>
              <a
                v-for="item in toc"
                :key="item.id"
                :href="`#${item.id}`"
                class="article-toc__link"
                @click.prevent="scrollToHeading(item.id)"
              >
                {{ item.text }}
              </a>
            </nav>
          </aside>

          <BlogProse :blocks="post.content" @cta="handleCtaClick" />
        </div>

        <section class="lx-section lx-section--tight article-author-wrap">
          <div
            class="lx-container article-author-row"
            :class="{ 'has-toc': post.toc && toc.length }"
          >
            <div class="article-author">
              <span class="author-avatar author-avatar--lg">{{
                authorInitials
              }}</span>
              <div class="article-meta__text">
                <span class="author-name">{{ post.author.name }}</span>
                <span v-if="post.author.role" class="article-meta__line">{{
                  post.author.role
                }}</span>
              </div>
            </div>
          </div>
        </section>

        <PageCta>
          <template #title>
            Stop scrolling. <em class="lx-accent">Start describing.</em>
          </template>
          <p>
            Try Photoreka's AI photo search on a real catalog, or create an
            account to start curating your own.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
        </PageCta>

        <section v-if="relatedPosts.length" class="lx-section article-related">
          <div class="lx-container">
            <SectionIntro>
              <template #title>
                More from <em class="lx-accent">the blog</em>
              </template>
            </SectionIntro>
            <div class="article-related__grid">
              <BlogCard
                v-for="(related, index) in relatedPosts"
                :key="related.slug"
                v-reveal="index * 90"
                :post="related"
              />
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
import { ArrowBackOutline, ImageOutline } from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import HeroShell from "~/components/hero/HeroShell.vue";
import BlogCard from "~/components/blog/BlogCard.vue";
import BlogProse from "~/components/blog/BlogProse.vue";
import { getPostBySlug, getRelatedPosts, formatBlogDate } from "~/config/blog";
import { seoConfig } from "~/config/seo";
import { trackUserAction } from "~/utils/analytics";

const route = useRoute();
const post = getPostBySlug(route.params.slug);

if (!post) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

const postUrl = `${seoConfig.siteUrl}/blog/${post.slug}`;
const postImage = post.coverImage
  ? `${seoConfig.siteUrl}${post.coverImage}`
  : `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`;
const dateModified = post.updatedAt || post.publishedAt;

useSEO(undefined, {
  title: `${post.title} | Photoreka`,
  description: post.description,
  keywords: post.keywords,
  ogImage: post.coverImage,
  ogType: "article",
  twitterCard: "summary_large_image",
  publishedTime: post.publishedAt,
  modifiedTime: dateModified,
  articleAuthor: post.author.name,
  articleSection: post.category,
  articleTags: post.tags,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: postImage,
      url: postUrl,
      datePublished: post.publishedAt,
      dateModified,
      articleSection: post.category,
      keywords: post.keywords,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      publisher: {
        "@type": "Organization",
        name: "Photoreka",
        url: seoConfig.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${seoConfig.siteUrl}/logos/marca/vertical-claim-light.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: seoConfig.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${seoConfig.siteUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: postUrl,
        },
      ],
    },
  ],
});

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

// Lenis scrolls to the heading itself, so the fixed nav's height is passed
// as an offset.
const scrollToHeading = (id) => {
  smoothScroll.scrollTo(`#${CSS.escape(id)}`, -110);
};

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
  smoothScroll.enable();
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
.article-hero {
  --hero-top: clamp(120px, 15svh, 160px);
  --hero-bottom: clamp(40px, 5vw, 64px);
}

.article-head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  max-width: calc(940px + 2 * var(--lx-gutter));
}

.article-back {
  margin-bottom: 0.5rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.article-back:hover :deep(svg) {
  transform: translateX(-3px);
}

.article-title {
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
}

.article-excerpt {
  max-width: 38em;
}

.article-meta,
.article-author {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.article-meta {
  margin-top: 0.5rem;
}

.author-avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--lx-accent-grad);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.author-avatar--lg {
  width: 56px;
  height: 56px;
  font-size: 1rem;
}

.article-meta__text {
  display: grid;
  gap: 0.1rem;
  line-height: 1.4;
}

.author-name {
  font-size: var(--lx-fs-sm);
  font-weight: 600;
  color: var(--lx-text);
}

.article-meta__line {
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

/* Cover */
.article-cover-wrap {
  max-width: calc(1140px + 2 * var(--lx-gutter));
}

.article-cover {
  overflow: hidden;
  aspect-ratio: 16 / 8.5;
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface-2);
  box-shadow: var(--lx-shadow-lg);
}

.article-cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-cover__placeholder {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0.6rem;
  height: 100%;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

/* Reading column, with the table of contents pinned beside it. The author
   row below shares the same columns so it lines up with the text. */
.article-layout,
.article-author-row {
  max-width: calc(720px + 2 * var(--lx-gutter));
}

.article-layout {
  padding-top: clamp(56px, 7vw, 96px);
}

.article-layout.has-toc,
.article-author-row.has-toc {
  display: grid;
  grid-template-columns: 220px minmax(0, 720px);
  justify-content: center;
  column-gap: clamp(40px, 5vw, 80px);
  max-width: calc(1140px + 2 * var(--lx-gutter));
}

.article-author-row.has-toc .article-author {
  grid-column: 2;
}

.article-toc {
  position: relative;
}

/* Beside the table of contents, figures stay inside the text column. */
.article-layout.has-toc :deep(.blog-prose__figure) {
  margin-inline: 0;
}

.article-toc__inner {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 24px);
  display: grid;
  gap: 0.15rem;
  padding-left: 1rem;
  border-left: 1px solid var(--lx-line-2);
}

.article-toc__label {
  margin-bottom: 0.75rem;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.article-toc__link {
  padding: 0.4rem 0;
  font-size: var(--lx-fs-sm);
  line-height: 1.4;
  color: var(--lx-text-2);
  text-decoration: none;
  transition: color 0.3s ease;
}

.article-toc__link:hover {
  color: var(--lx-text);
}

.article-author {
  padding-top: 2rem;
  border-top: 1px solid var(--lx-line-2);
}

/* Related posts */
.article-related {
  padding-top: 0;
}

.article-related__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(40px, 4vw, 56px) clamp(24px, 3vw, 40px);
}

@media (max-width: 1023px) {
  .article-layout.has-toc,
  .article-author-row.has-toc {
    grid-template-columns: minmax(0, 1fr);
    max-width: calc(720px + 2 * var(--lx-gutter));
  }

  .article-author-row.has-toc .article-author {
    grid-column: 1;
  }

  .article-toc {
    display: none;
  }

  .article-related__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .article-cover {
    aspect-ratio: 16 / 10;
    border-radius: var(--lx-radius);
  }

  .article-related__grid {
    grid-template-columns: 1fr;
  }
}
</style>
