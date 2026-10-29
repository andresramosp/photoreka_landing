<template>
  <p class="lx-eyebrow lx-hero__trust">
    <span class="lx-eyebrow__dot" aria-hidden="true" />
    <span>The AI curation layer for your photo archive</span>
    <span class="lx-hero__stars">★★★★★</span>
  </p>
</template>

<style scoped>
.lx-hero__stars {
  color: var(--lx-warm);
  letter-spacing: 0.12em;
}

@media (max-width: 640px) {
  /* The eyebrow wraps as running text, stars trailing the last word. */
  .lx-hero__trust {
    display: block;
    line-height: 1.7;
  }

  .lx-hero__trust .lx-eyebrow__dot {
    display: inline-block;
    vertical-align: 0.15em;
    margin-right: 0.6rem;
  }

  .lx-hero__stars {
    margin-left: 0.5rem;
    white-space: nowrap;
  }
}
</style>
