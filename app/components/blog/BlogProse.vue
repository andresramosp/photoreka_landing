<template>
  <article class="blog-prose">
    <template v-for="(block, i) in blocks" :key="i">
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

      <figure v-else-if="block.type === 'image'" class="blog-prose__figure">
        <div
          class="blog-prose__media"
          :style="block.ratio ? { aspectRatio: block.ratio } : undefined"
        >
          <div v-if="block.placeholder" class="blog-prose__placeholder">
            <n-icon size="26"><ImageOutline /></n-icon>
            <span>{{ block.alt }}</span>
          </div>
          <img v-else :src="block.src" :alt="block.alt" loading="lazy" />
        </div>
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>

      <aside
        v-else-if="block.type === 'callout'"
        class="blog-prose__callout"
        :class="`blog-prose__callout--${block.variant || 'info'}`"
      >
        <span class="blog-prose__callout-icon" aria-hidden="true">
          <n-icon size="18">
            <BulbOutline v-if="block.variant === 'tip'" />
            <AlertCircleOutline v-else-if="block.variant === 'warning'" />
            <InformationCircleOutline v-else />
          </n-icon>
        </span>
        <div>
          <strong v-if="block.title">{{ block.title }}</strong>
          <p v-html="block.html"></p>
        </div>
      </aside>

      <div v-else-if="block.type === 'cta'" class="blog-prose__cta">
        <div class="blog-prose__cta-aura" aria-hidden="true" />
        <p v-if="block.eyebrow" class="lx-eyebrow">
          <span class="lx-eyebrow__dot" aria-hidden="true" />
          <span>{{ block.eyebrow }}</span>
        </p>
        <h3 class="blog-prose__cta-title">{{ block.title }}</h3>
        <p v-if="block.text" class="blog-prose__cta-text">{{ block.text }}</p>
        <LxButton
          :icon="block.action === 'link' ? 'arrow' : 'play'"
          @click="emit('cta', block)"
        >
          {{ block.buttonLabel }}
        </LxButton>
      </div>
    </template>
  </article>
</template>

<script setup>
import {
  ImageOutline,
  BulbOutline,
  AlertCircleOutline,
  InformationCircleOutline,
} from "@vicons/ionicons5";

// Long-form reading column for a blog post. Renders the BlogBlock types of
// app/config/blog.ts; paragraphs and callouts carry trusted HTML from that
// file. Emits `cta(block)` so the page decides what each action does.
defineProps({
  blocks: { type: Array, required: true },
});

const emit = defineEmits(["cta"]);
</script>

<style scoped>
.blog-prose {
  font-size: 1.08rem;
  line-height: 1.8;
  color: var(--lx-text-2);
}

.blog-prose > * + * {
  margin-top: 1.5rem;
}

.blog-prose p {
  text-wrap: pretty;
}

.blog-prose :deep(strong) {
  color: var(--lx-text);
  font-weight: 600;
}

.blog-prose :deep(em) {
  color: var(--lx-text);
}

.blog-prose :deep(a) {
  color: var(--lx-text);
  text-decoration: underline;
  text-decoration-color: var(--lx-line-3);
  text-underline-offset: 0.22em;
  transition: text-decoration-color 0.3s ease;
}

.blog-prose :deep(a:hover) {
  text-decoration-color: var(--lx-accent);
}

.blog-prose :deep(code) {
  padding: 0.1em 0.35em;
  border-radius: 6px;
  background: var(--lx-surface-3);
  font-size: 0.9em;
  color: var(--lx-text);
}

/* Headings: the page's nav is fixed, so anchors land below it. */
.blog-prose h2,
.blog-prose h3 {
  margin: 0;
  font-family: var(--lx-font-display);
  color: var(--lx-text);
  text-wrap: balance;
  scroll-margin-top: calc(var(--lx-nav-offset) + 24px);
}

.blog-prose h2 {
  font-weight: 360;
  font-size: clamp(1.75rem, 2.6vw, 2.25rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.blog-prose > h2:not(:first-child) {
  margin-top: 3.5rem;
}

.blog-prose h3 {
  font-weight: 400;
  font-size: clamp(1.3rem, 1.8vw, 1.5rem);
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.blog-prose > h3:not(:first-child) {
  margin-top: 2.5rem;
}

.blog-prose > h2 + *,
.blog-prose > h3 + * {
  margin-top: 1.1rem;
}

/* Lists: a small lit dot for bullets, accent numerals for ordered. */
.blog-prose ul,
.blog-prose ol {
  display: grid;
  gap: 0.7rem;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
}

.blog-prose li {
  position: relative;
  padding-left: 1.9rem;
}

.blog-prose ul li::before {
  content: "";
  position: absolute;
  left: 0.35rem;
  top: 0.72em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--lx-accent-grad);
  box-shadow: 0 0 10px color-mix(in srgb, var(--lx-accent) 60%, transparent);
}

.blog-prose ol {
  counter-reset: blog-ol;
}

.blog-prose ol li {
  counter-increment: blog-ol;
}

.blog-prose ol li::before {
  content: counter(blog-ol, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 0.15em;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: var(--lx-accent);
}

/* Quotes: a lit rule and the display serif in italics. */
.blog-prose blockquote {
  position: relative;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
  padding: 0.2rem 0 0.2rem 1.6rem;
}

.blog-prose > blockquote {
  margin-top: 2.5rem;
}

.blog-prose > blockquote + * {
  margin-top: 2.5rem;
}

.blog-prose blockquote::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  border-radius: 2px;
  background: var(--lx-accent-grad);
  box-shadow: 0 0 14px var(--lx-accent);
}

.blog-prose blockquote p {
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 340;
  font-size: clamp(1.35rem, 2vw, 1.65rem);
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: var(--lx-text);
}

.blog-prose blockquote cite {
  display: block;
  margin-top: 0.9rem;
  font-style: normal;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

/* Figures break slightly out of the reading column on wide screens. */
.blog-prose__figure {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
}

.blog-prose > .blog-prose__figure {
  margin-top: 2.5rem;
}

.blog-prose > .blog-prose__figure + * {
  margin-top: 2.5rem;
}

@media (min-width: 1100px) {
  .blog-prose__figure {
    margin-inline: -64px;
  }
}

.blog-prose__media {
  position: relative;
  overflow: hidden;
  border-radius: var(--lx-radius);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface-2);
  box-shadow: var(--lx-shadow-lg);
}

.blog-prose__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-prose__placeholder {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0.5rem;
  min-height: 220px;
  height: 100%;
  padding: 1.5rem;
  text-align: center;
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

.blog-prose__figure figcaption {
  margin-top: 0.9rem;
  text-align: center;
  font-size: var(--lx-fs-sm);
  line-height: 1.6;
  color: var(--lx-text-3);
}

/* Callouts */
.blog-prose__callout {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 1rem;
  padding: 1.35rem 1.5rem;
  border-radius: var(--lx-radius);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface);
  box-shadow: var(--lx-highlight);
  font-size: 0.98rem;
  line-height: 1.7;
}

.blog-prose > .blog-prose__callout {
  margin-top: 2.25rem;
}

.blog-prose > .blog-prose__callout + * {
  margin-top: 2.25rem;
}

.blog-prose__callout-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
  color: var(--lx-accent);
}

.blog-prose__callout strong {
  display: block;
  margin-bottom: 0.3rem;
  color: var(--lx-text);
}

.blog-prose__callout--tip .blog-prose__callout-icon {
  color: var(--lx-ok);
}

.blog-prose__callout--warning .blog-prose__callout-icon {
  color: var(--lx-warm);
}

.blog-prose__callout--warning {
  border-color: color-mix(in srgb, var(--lx-warm) 35%, transparent);
}

/* Inline call to action */
.blog-prose__cta {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  justify-items: start;
  gap: 1rem;
  padding: clamp(28px, 4vw, 44px);
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface);
  box-shadow: var(--lx-shadow-md), var(--lx-highlight);
}

.blog-prose > .blog-prose__cta {
  margin-top: 3rem;
}

.blog-prose > .blog-prose__cta + * {
  margin-top: 3rem;
}

.blog-prose__cta-aura {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    60% 80% at 0% 0%,
    var(--lx-glow-1),
    transparent 70%
  );
}

.blog-prose__cta-title {
  margin: 0;
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--lx-text);
}

.blog-prose__cta-text {
  font-size: 0.98rem;
  line-height: 1.7;
}

.blog-prose__cta :deep(.lx-btn) {
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .blog-prose {
    font-size: 1.02rem;
    line-height: 1.75;
  }

  .blog-prose__callout {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
</style>
