<template>
  <NuxtLink
    :to="`/blog/${post.slug}`"
    class="blog-card"
    :class="{ 'blog-card--featured': featured }"
  >
    <div class="blog-card__media">
      <div v-if="post.coverPlaceholder" class="blog-card__placeholder">
        <n-icon size="26"><ImageOutline /></n-icon>
        <span>Cover placeholder</span>
      </div>
      <img
        v-else
        :src="post.coverImage"
        :alt="post.title"
        :loading="featured ? 'eager' : 'lazy'"
        decoding="async"
      />
    </div>

    <div class="blog-card__body">
      <p class="lx-eyebrow blog-card__meta">
        <span class="blog-card__category">{{ post.category }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ formatBlogDate(post.publishedAt) }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ post.readingMinutes }} min read</span>
      </p>
      <h3 class="blog-card__title">{{ post.title }}</h3>
      <p class="blog-card__excerpt">{{ post.excerpt }}</p>
      <span class="lx-link blog-card__more">
        Read article
        <n-icon size="15"><ArrowForwardOutline /></n-icon>
      </span>
    </div>
  </NuxtLink>
</template>

<script setup>
import { ArrowForwardOutline, ImageOutline } from "@vicons/ionicons5";
import { formatBlogDate } from "~/config/blog";

// One post in the blog listing and in "More from the blog". The featured
// variant lays cover and text side by side.
defineProps({
  post: { type: Object, required: true },
  featured: { type: Boolean, default: false },
});
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  color: inherit;
  text-decoration: none;
}

.blog-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: var(--lx-radius);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface-2);
  box-shadow: var(--lx-shadow-md);
}

.blog-card__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s var(--lx-ease);
}

.blog-card:hover .blog-card__media img {
  transform: scale(1.035);
}

.blog-card__placeholder {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0.5rem;
  height: 100%;
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

.blog-card__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
}

.blog-card__meta {
  flex-wrap: wrap;
  gap: 0.5rem;
  line-height: 1.6;
  letter-spacing: 0.14em;
}

.blog-card__category {
  color: var(--lx-accent);
}

.blog-card__title {
  margin: 0;
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: clamp(1.35rem, 1.8vw, 1.6rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--lx-text);
  text-wrap: balance;
  transition: color 0.3s ease;
}

.blog-card__excerpt {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.7;
  color: var(--lx-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__more {
  margin-top: 0.2rem;
  font-size: var(--lx-fs-sm);
}

.blog-card:hover .blog-card__more::after {
  transform: scaleX(1);
  opacity: 1;
}

.blog-card:hover .blog-card__more :deep(svg) {
  transform: translateX(3px);
}

/* Featured: cover and text side by side, larger title. */
.blog-card--featured {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: clamp(28px, 4vw, 64px);
  align-items: center;
}

.blog-card--featured .blog-card__title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.blog-card--featured .blog-card__excerpt {
  font-size: 1rem;
  -webkit-line-clamp: 5;
}

@media (max-width: 860px) {
  .blog-card--featured {
    display: flex;
  }
}
</style>
