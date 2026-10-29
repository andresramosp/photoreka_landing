<template>
  <section class="lx-section lx-page-cta">
    <div class="lx-container">
      <div v-reveal="{ variant: 'scale' }" class="lx-page-cta__panel">
        <div class="lx-page-cta__aura" aria-hidden="true" />
        <SectionIntro align="center" flush>
          <template #title><slot name="title" /></template>
          <slot />
          <template #actions><slot name="actions" /></template>
        </SectionIntro>
        <p v-if="$slots.links" v-reveal="320" class="lx-page-cta__links">
          <slot name="links" />
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Closing call to action of a product page: one lit panel with the title,
// the main buttons and an optional row of related links.
</script>

<style scoped>
.lx-page-cta__panel {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(56px, 8vw, 112px) clamp(24px, 6vw, 96px);
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface);
  box-shadow: var(--lx-shadow-lg), var(--lx-highlight);
}

.lx-page-cta__aura {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(60% 70% at 50% 0%, var(--lx-glow-1), transparent 70%),
    radial-gradient(40% 50% at 85% 100%, var(--lx-glow-2), transparent 70%);
}

.lx-page-cta__panel :deep(.lx-intro) {
  max-width: 820px;
}

.lx-page-cta__panel :deep(.lx-actions) {
  justify-content: center;
  margin-top: 0.5rem;
}

.lx-page-cta__panel:has(.lx-page-cta__links) {
  padding-bottom: clamp(36px, 4vw, 56px);
}

.lx-page-cta__links {
  margin-top: 3rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--lx-line);
  text-align: center;
  font-size: var(--lx-fs-sm);
  line-height: 2;
  color: var(--lx-text-3);
}

.lx-page-cta__links :slotted(a) {
  color: var(--lx-text);
  text-decoration: underline;
  text-decoration-color: var(--lx-line-3);
  text-underline-offset: 0.22em;
  cursor: pointer;
  transition: text-decoration-color 0.3s ease;
}

.lx-page-cta__links :slotted(a:hover) {
  text-decoration-color: var(--lx-accent);
}

.lx-page-cta__links :slotted(.lx-sep) {
  margin-inline: 0.6rem;
  color: var(--lx-text-3);
}
</style>
