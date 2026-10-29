<template>
  <HeroShell class="lx-page-hero">
    <div class="lx-page-hero__layout">
      <div class="lx-page-hero__copy">
        <p v-if="eyebrow" v-reveal class="lx-eyebrow">
          <slot name="eyebrow-icon">
            <span class="lx-eyebrow__dot" aria-hidden="true" />
          </slot>
          <span>{{ eyebrow }}</span>
        </p>
        <h1 v-split="100" class="lx-title lx-page-hero__title">
          <slot name="title" />
        </h1>
        <div v-reveal="320" class="lx-lead lx-page-hero__lead">
          <slot />
        </div>
        <div v-if="$slots.actions" v-reveal="440" class="lx-actions">
          <slot name="actions" />
        </div>
        <div v-if="$slots.note" v-reveal="520" class="lx-page-hero__note">
          <slot name="note" />
        </div>
      </div>

      <div
        v-reveal="{ variant: 'scale', delay: 200 }"
        class="lx-page-hero__visual"
      >
        <slot name="visual" />
      </div>
    </div>
  </HeroShell>
</template>

<script setup>
import HeroShell from "~/components/hero/HeroShell.vue";

// Opening of a product page: copy on the left, a capture on the right.
defineProps({
  /** The `eyebrow-icon` slot can replace its dot, e.g. with a logo. */
  eyebrow: { type: String, default: "" },
});
</script>

<style scoped>
.lx-page-hero {
  --hero-top: clamp(128px, 17svh, 176px);
  --hero-bottom: clamp(48px, 7vw, 96px);
}

.lx-page-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr);
  gap: clamp(40px, 5vw, 80px);
  align-items: center;
  max-width: calc(var(--lx-container) + 2 * var(--lx-gutter));
  margin-inline: auto;
  padding-inline: var(--lx-gutter);
}

.lx-page-hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.9rem;
}

/* Long eyebrows wrap on phones; their lines need room. */
.lx-page-hero__copy > .lx-eyebrow {
  margin-bottom: -0.6rem;
  line-height: 1.6;
}

.lx-page-hero__title {
  font-size: clamp(2.7rem, min(4.4vw, 8.6svh), 4.5rem);
  line-height: 1;
  letter-spacing: -0.04em;
}

.lx-page-hero__lead {
  display: grid;
  gap: 1rem;
  max-width: 36em;
  font-size: 1.04rem;
}

.lx-page-hero__note {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.7rem;
  margin-top: -0.9rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

.lx-page-hero__note :deep(.lx-link) {
  font-size: var(--lx-fs-sm);
}

.lx-page-hero__visual {
  position: relative;
}

/* Brand light pooling behind the capture. */
.lx-page-hero__visual::before {
  content: "";
  position: absolute;
  inset: -12% -8%;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    closest-side,
    var(--lx-glow-1),
    transparent 100%
  );
}

@media (max-width: 1023px) {
  .lx-page-hero__layout {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  .lx-page-hero__visual {
    width: 100%;
    max-width: 760px;
  }
}

@media (max-width: 640px) {
  .lx-page-hero__copy {
    gap: 1.5rem;
  }

  .lx-page-hero__title {
    font-size: clamp(2.3rem, 10vw, 2.8rem);
  }

  .lx-page-hero__copy .lx-actions {
    width: 100%;
    gap: 0.5rem;
  }

  /* Both buttons share the row and wrap to full-width rows when they
     don't fit side by side, as in the home hero. */
  .lx-page-hero__copy .lx-actions > :slotted(.lx-btn) {
    flex: 1 1 auto;
    justify-content: space-between;
  }
}
</style>
