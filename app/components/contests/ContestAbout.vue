<template>
  <div class="pc-about">
    <ContestSectionHead :title="`About ${contest.name}`" />
    <p class="pc-about__lead">{{ description.about }}</p>
    <section v-if="description.rewards" class="pc-about__part">
      <h3>What the jury rewards</h3>
      <p>{{ description.rewards }}</p>
    </section>
    <section v-if="description.audience" class="pc-about__part">
      <h3>Who it is for</h3>
      <p>{{ description.audience }}</p>
    </section>
  </div>
</template>

<script setup>
import ContestSectionHead from "./ContestSectionHead.vue";

// Rendered only for a contest whose description has been approved.
const props = defineProps({
  contest: { type: Object, required: true },
});

const description = computed(() => props.contest.description);
</script>

<style scoped>
.pc-about {
  margin-bottom: clamp(40px, 5vw, 72px);
}

.pc-about p {
  max-width: 44em;
  margin: 0;
  font-size: var(--lx-fs-body);
  line-height: 1.7;
  color: var(--lx-text-2);
}

.pc-about .pc-about__lead {
  font-size: var(--lx-fs-lead);
  line-height: 1.6;
  color: var(--lx-text);
}

.pc-about__part {
  margin-top: clamp(22px, 2.4vw, 32px);
}

.pc-about__part h3 {
  margin: 0 0 0.5rem;
  font-family: var(--lx-font-sans);
  font-size: var(--lx-fs-body);
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--lx-text);
}
</style>
