<template>
  <span class="lx-roll" :aria-label="value">
    <span
      v-for="(ch, i) in chars"
      :key="chars.length - i"
      class="lx-roll__slot"
      aria-hidden="true"
    >
      <span
        v-if="isDigit(ch)"
        class="lx-roll__reel"
        :style="{
          transform: `translate3d(0, ${-Number(ch) * 10}%, 0)`,
          transitionDelay: `${(chars.length - i) * 35}ms`,
        }"
      >
        <span v-for="d in 10" :key="d">{{ d - 1 }}</span>
      </span>
      <span v-else>{{ ch }}</span>
    </span>
  </span>
</template>

<script setup>
// Odometer-style number: each digit is a reel of 0–9 that rolls to its
// value, so changing the value animates digit by digit.
const props = defineProps({
  value: { type: String, required: true },
});

const chars = computed(() => [...props.value]);
const isDigit = (ch) => ch >= "0" && ch <= "9";
</script>

<style scoped>
.lx-roll {
  display: inline-flex;
  font-variant-numeric: tabular-nums;
}

.lx-roll__slot {
  display: inline-block;
  height: 1em;
  line-height: 1;
  overflow: hidden;
}

.lx-roll__reel {
  display: flex;
  flex-direction: column;
  transition: transform 1s var(--lx-ease);
}

.lx-roll__reel > span {
  height: 1em;
}
</style>
