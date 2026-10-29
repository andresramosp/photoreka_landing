<template>
  <div class="lx-hero__cta" :class="`is-${align}`">
    <div v-reveal="520" class="lx-actions">
      <LxButton icon="play" @click="emit('demo')">Try the Demo</LxButton>
      <LxButton variant="ghost" @click="emit('signup')">
        {{ signupButtonLabel }}
      </LxButton>
    </div>
    <p v-reveal="600" class="lx-hero__alt">
      <span>Shooting commercial work?</span>
      <button class="lx-link" @click="emit('commercial-demo')">
        Try the commercial demo
        <n-icon size="15"><ArrowForwardOutline /></n-icon>
      </button>
    </p>
  </div>
</template>

<script setup>
import { ArrowForwardOutline } from "@vicons/ionicons5";

defineProps({
  /** start | center | end: where the buttons sit in their column */
  align: { type: String, default: "end" },
});

const emit = defineEmits(["demo", "signup", "commercial-demo"]);

const { signupButtonLabel } = useRegistrationMode();
</script>

<style scoped>
.lx-hero__cta {
  display: grid;
  gap: 0.9rem;
}

.is-start {
  justify-items: start;
}

.is-center {
  justify-items: center;
}

.is-end {
  justify-items: end;
}

.is-center .lx-actions,
.is-center .lx-hero__alt {
  justify-content: center;
}

.lx-hero__alt {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.7rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

.lx-hero__alt .lx-link {
  font-size: var(--lx-fs-sm);
}

@media (max-width: 1023px) {
  .lx-hero__cta {
    justify-items: stretch;
    width: 100%;
    max-width: 460px;
  }

  /* Both buttons share the row and wrap to full-width rows when they
     don't fit side by side. */
  .lx-hero__cta .lx-btn {
    flex: 1 1 auto;
    justify-content: space-between;
  }

  .lx-hero__alt {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 640px) {
  /* Tight enough for both buttons to share a row on a 390px phone. */
  .lx-hero__cta .lx-actions {
    gap: 0.5rem;
  }

  .lx-hero__cta .lx-btn {
    gap: 0.5rem;
    padding-left: 1rem;
    font-size: 0.88rem;
  }
}
</style>
