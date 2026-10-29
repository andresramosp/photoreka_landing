<template>
  <h1 v-split="100" class="lx-title lx-title--display lx-hero__title">
    Make full sense of
    <em class="lx-accent">your photographic body of work</em>
  </h1>
</template>

<style scoped>
/* Variants size the headline through --hero-title-size; phones always get
   the same size, set here so it wins over any variant. */
.lx-hero__title {
  font-size: var(--hero-title-size, clamp(3rem, min(6.9vw, 11.6svh), 6.5rem));
}

.lx-hero__title .lx-accent {
  font-weight: 360;
}

@media (max-width: 640px) {
  .lx-hero__title {
    font-size: clamp(2.5rem, 11vw, 3rem);
  }
}
</style>
