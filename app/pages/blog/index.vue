<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="blog-page">
        <!-- Navigation Header -->
        <nav class="premium-nav">
          <div class="nav-container">
            <div class="nav-brand">
              <NuxtLink to="/">
                <AppLogo layout="horizontal" :height="40" />
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
              <n-button text @click="goToHome" class="back-link">
                <template #icon>
                  <n-icon><ArrowBackOutline /></n-icon>
                </template>
                Back to Home
              </n-button>
            </div>
          </div>
        </nav>

        <!-- Hero -->
        <section class="blog-hero">
          <div class="hero-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
          </div>
          <div class="section-container">
            <div class="blog-hero-badge">
              <n-icon size="15"><BookOutline /></n-icon>
              Photoreka Journal
            </div>
            <h1 class="blog-hero-title">
              Notes on <span class="gradient-text">AI &amp; photography</span>
            </h1>
            <p class="blog-hero-subtitle">
              Technical write-ups and field notes on curation, computer vision,
              and what it actually takes to make sense of a photographic body of
              work.
            </p>
          </div>
        </section>

        <!-- Posts grid -->
        <section class="posts-section">
          <div class="section-container">
            <div class="posts-grid">
              <NuxtLink
                v-for="post in posts"
                :key="post.slug"
                :to="`/blog/${post.slug}`"
                class="post-card"
              >
                <div class="post-cover">
                  <div
                    v-if="post.coverPlaceholder"
                    class="post-cover-placeholder"
                  >
                    <n-icon size="28"><ImageOutline /></n-icon>
                    <span>Cover placeholder</span>
                  </div>
                  <img
                    v-else
                    :src="post.coverImage"
                    :alt="post.title"
                    class="post-cover-img"
                  />
                  <span class="post-category">{{ post.category }}</span>
                </div>
                <div class="post-body">
                  <h2 class="post-title">{{ post.title }}</h2>
                  <p class="post-excerpt">{{ post.excerpt }}</p>
                  <div class="post-meta">
                    <span class="post-meta-item">
                      <n-icon size="14"><CalendarOutline /></n-icon>
                      {{ formatBlogDate(post.publishedAt) }}
                    </span>
                    <span class="post-meta-item">
                      <n-icon size="14"><TimeOutline /></n-icon>
                      {{ post.readingMinutes }} min read
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {
  SunnyOutline,
  MoonOutline,
  ArrowBackOutline,
  BookOutline,
  ImageOutline,
  CalendarOutline,
  TimeOutline,
} from "@vicons/ionicons5";
import { getAllPosts, formatBlogDate } from "~/config/blog";
import { seoConfig } from "~/config/seo";
import { trackUserAction } from "~/utils/analytics";

const posts = getAllPosts();

useSEO("blog", {
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Photoreka Blog",
      url: `${seoConfig.siteUrl}/blog`,
      description: seoConfig.pages.blog.description,
      publisher: {
        "@type": "Organization",
        name: "Photoreka",
        url: seoConfig.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${seoConfig.siteUrl}/logos/marca/vertical-claim-light.png`,
        },
      },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `${seoConfig.siteUrl}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
      })),
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
  themeMode,
  toggleTheme: baseToggleTheme,
  canToggleTheme,
  initTheme,
} = useTheme();

const toggleTheme = () => baseToggleTheme();

const goToHome = () => {
  trackUserAction("navigate_to_home", "blog_index");
  navigateTo("/");
};

onMounted(() => {
  initTheme();
});
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: var(--premium-bg-primary, var(--premium-bg));
  color: var(--premium-text-primary);
}

/* Nav (shared pattern across sub-pages) */
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
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-toggle:hover {
  background: var(--premium-bg-hover);
}

/* Hero */
.blog-hero {
  position: relative;
  padding: 9rem 2rem 5rem;
  overflow: hidden;
  text-align: center;
}
.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.18;
  will-change: transform;
}
.orb-1 {
  width: 700px;
  height: 700px;
  background: linear-gradient(135deg, #06b6d4, #2563eb);
  top: -300px;
  right: -200px;
}
.orb-2 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  bottom: -300px;
  left: -250px;
}
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.blog-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 50px;
  font-size: var(--fs-sm);
  font-weight: var(--font-weight-semibold);
  color: #06b6d4;
  margin-bottom: 1.5rem;
}
.blog-hero-title {
  font-size: var(--fs-hero-sm);
  font-weight: var(--font-weight-black);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tighter);
  margin: 0 0 1rem;
}
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.blog-hero-subtitle {
  max-width: 640px;
  margin: 0 auto;
  font-size: var(--fs-subheading);
  color: var(--premium-text-secondary);
  line-height: var(--line-height-loose);
}

/* Posts grid */
.posts-section {
  padding: 1rem 2rem 6rem;
}
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}
.post-card {
  display: flex;
  flex-direction: column;
  background: var(--premium-bg-card, var(--premium-surface));
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  border-color: var(--premium-primary);
}
.post-cover {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--premium-bg-elevated);
  border-bottom: 1px solid var(--premium-border);
}
.post-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.post-cover-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--premium-text-tertiary);
  font-size: var(--fs-xs);
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.03) 0,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 12px
  );
}
.post-category {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.3rem 0.7rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  border-radius: 50px;
  font-size: var(--fs-xs);
  font-weight: var(--font-weight-semibold);
  color: #fff;
}
.post-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.5rem;
  flex: 1;
}
.post-title {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
  line-height: var(--line-height-tight);
}
.post-excerpt {
  color: var(--premium-text-secondary);
  font-size: var(--fs-base);
  line-height: var(--line-height-relaxed);
  margin: 0;
  flex: 1;
}
.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: var(--fs-xs);
  color: var(--premium-text-tertiary);
}
.post-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

@media (max-width: 640px) {
  .blog-hero {
    padding: 7rem 1.25rem 3rem;
  }
  .posts-section {
    padding: 1rem 1.25rem 4rem;
  }
}
</style>
