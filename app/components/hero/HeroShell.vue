<template>
  <section id="hero" class="lx-hero">
    <div class="lx-hero__aura" aria-hidden="true" />
    <slot />
  </section>
</template>

<style scoped>
/* Common frame of every hero variant. Each variant sets --hero-top and
   --hero-bottom on this root and lays out its own content inside. */
.lx-hero {
  position: relative;
  /* Kept in its own variable: postcss-calc can't parse a clamp() with var()
     inside a var() fallback inside calc() (see ui-zoom/). */
  --hero-top-default: clamp(152px, 22svh, 230px);
  padding-top: calc(
    var(--announcement-height, 0px) + var(--hero-top, var(--hero-top-default))
  );
  padding-bottom: var(--hero-bottom, clamp(16px, 3vw, 40px));
  transition: padding-top 0.35s ease;
}

/* Soft brand light falling from the top, behind the headline. */
.lx-hero__aura {
  position: absolute;
  inset: 0 0 auto;
  height: 1200px;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(48% 42% at 34% 4%, var(--lx-glow-1), transparent 72%),
    radial-gradient(34% 34% at 10% 16%, var(--lx-glow-2), transparent 72%),
    radial-gradient(60% 40% at 50% 62%, var(--lx-glow-1), transparent 70%);
}

@media (max-width: 640px) {
  .lx-hero {
    padding-top: clamp(88px, 12svh, 112px);
  }
}
</style>
