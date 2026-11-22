<template>
  <!-- Critique on a product page: never a banner on its own. The intro says
       how it follows from the page's product; the banner sells it. -->
  <section class="lx-section cqs" :class="{ 'cqs--continues': continues }">
    <div class="lx-container">
      <SectionIntro :eyebrow="eyebrow" align="center" size="md">
        <template #title>
          {{ title }} <em class="lx-accent">{{ accent }}</em>
        </template>
        <p>{{ lead }}</p>
      </SectionIntro>
      <CritiquePromo :source="source" />
    </div>
  </section>
</template>

<script setup>
import CritiquePromo from "~/components/critique/CritiquePromo.vue";

defineProps({
  /** Analytics label of the page hosting it. */
  source: { type: String, required: true },
  /** Numbered like the page's other sections; leave empty when it continues one. */
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  /** The italic end of the title. */
  accent: { type: String, required: true },
  lead: { type: String, required: true },
  /** Follows a section it belongs to (Picks): that one's bottom padding is enough. */
  continues: { type: Boolean, default: false },
});
</script>

<style scoped>
.cqs--continues {
  padding-top: 0;
}

/* Intro and banner read as one block. */
.cqs :deep(.lx-intro) {
  margin-bottom: clamp(28px, 3.5vw, 44px);
}
</style>
