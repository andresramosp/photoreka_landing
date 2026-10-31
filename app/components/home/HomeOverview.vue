<template>
  <!-- Stacked on purpose: the hero right above is already a text/media
       split, so a second one would read as a repeated hero. -->
  <section id="overview" class="lx-section">
    <div class="lx-container lx-container--narrow">
      <SectionIntro eyebrow="Overview" align="center">
        <template #title>
          Your catalog, understood <em class="lx-accent">as a whole</em>
        </template>
        <p>
          Photoreka reads your <strong>entire library</strong> at once and
          learns how your photos relate, surfacing the
          <strong>themes</strong>, <strong>patterns</strong> and
          <strong>connections</strong> that folders and grids keep hidden.
        </p>
      </SectionIntro>
    </div>

    <!-- Wider than the intro so the video carries the section. -->
    <div class="lx-container">
      <div
        v-reveal="{ variant: 'scale', delay: 120 }"
        v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
      >
        <!-- Each frame only plays while visible, so the hidden one never
             starts. -->
        <ShotFrame
          class="lx-zoom overview-video--desktop"
          video="/videos/canvas_desktop.mp4"
          alt="Photoreka infinite canvas clustering photos automatically"
          label="Photoreka — Canvas"
          ratio="16 / 9"
        />
        <ShotFrame
          class="overview-video--mobile"
          video="/videos/canvas_mobile.mp4"
          alt="Photoreka infinite canvas clustering photos automatically"
          label="Photoreka — Canvas"
          ratio="4 / 5"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.overview-video--mobile {
  display: none;
}

@media (max-width: 760px) {
  .overview-video--desktop {
    display: none;
  }

  .overview-video--mobile {
    display: block;
  }
}
</style>
