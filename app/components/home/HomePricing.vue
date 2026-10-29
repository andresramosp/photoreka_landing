<template>
  <section id="pricing" class="lx-section">
    <div class="lx-container">
      <SectionIntro eyebrow="Pricing" align="center">
        <template #title>
          Simple, <em class="lx-accent">one-time</em> pricing
        </template>
        <p>
          Pay once to analyze your photos — no subscription. Slide to size your
          package: the more you analyze, the less you pay per photo. Slots never
          expire.
        </p>
      </SectionIntro>
      <div v-reveal="120">
        <PricingSlider :visible="true" @get-started="emit('signup')" />
      </div>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(["signup"]);
</script>
