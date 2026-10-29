<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page">
        <PageNav source="blog_page" />

        <HeroShell class="blog-hero">
          <div class="lx-container">
            <SectionIntro eyebrow="Photoreka Journal" tag="h1" size="display">
              <template #title>
                Notes on <em class="lx-accent">AI &amp; photography</em>
              </template>
              <p>
                Technical write-ups and field notes on curation, computer
                vision, and what it actually takes to make sense of a
                photographic body of work.
              </p>
            </SectionIntro>
          </div>
        </HeroShell>

        <section class="lx-section blog-list">
          <div class="lx-container">
            <BlogCard
              v-if="featured"
              v-reveal="{ variant: 'scale' }"
              :post="featured"
              featured
              class="blog-list__featured"
            />
            <div v-if="rest.length" class="blog-list__grid">
              <BlogCard
                v-for="(post, index) in rest"
                :key="post.slug"
                v-reveal="(index % 3) * 90"
                :post="post"
              />
            </div>
          </div>
        </section>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import HeroShell from "~/components/hero/HeroShell.vue";
import BlogCard from "~/components/blog/BlogCard.vue";
import { getAllPosts } from "~/config/blog";
import { seoConfig } from "~/config/seo";

const posts = getAllPosts();
const [featured, ...rest] = posts;

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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

onMounted(() => {
  initTheme();
  smoothScroll.enable();
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
.blog-hero {
  --hero-top: clamp(136px, 18svh, 184px);
  --hero-bottom: 0px;
}

.blog-hero :deep(.lx-intro) {
  margin-bottom: 0;
  max-width: 900px;
}

.blog-hero :deep(.lx-title--display) {
  font-size: clamp(2.8rem, 6vw, 5.4rem);
}

.blog-list {
  padding-top: clamp(56px, 7vw, 96px);
}

.blog-list__featured {
  padding-bottom: clamp(48px, 6vw, 80px);
  margin-bottom: clamp(48px, 6vw, 80px);
  border-bottom: 1px solid var(--lx-line);
}

.blog-list__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(40px, 4vw, 56px) clamp(24px, 3vw, 40px);
}

@media (max-width: 1023px) {
  .blog-list__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .blog-list__grid {
    grid-template-columns: 1fr;
  }
}
</style>
