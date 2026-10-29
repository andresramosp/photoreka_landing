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

      <div
        v-reveal="{ variant: 'scale', delay: 120 }"
        v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
      >
        <ShotFrame
          class="lx-zoom"
          video="/videos/atlas_1.mp4"
          poster="/home/video_poster.jpg"
          alt="Photoreka mapping a whole photo catalog by visual similarity"
          label="Photoreka — Atlas"
          ratio="16 / 9"
        />
      </div>
    </div>
  </section>
</template>
