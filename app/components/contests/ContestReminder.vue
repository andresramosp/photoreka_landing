<template>
  <div class="pc-panel pc-remind">
    <div class="pc-remind__copy">
      <p class="pc-kicker">Email reminder</p>
      <h2 class="lx-title lx-title--md">{{ heading }}</h2>
      <p class="pc-remind__text">
        One email when entries open, and two more 14 and 3 days before the final deadline.
        Only for {{ contest.name }}.
      </p>
    </div>

    <form v-if="state !== 'done'" class="pc-remind__form" novalidate @submit.prevent="submit">
      <label class="pc-remind__label" :for="inputId">Email address</label>
      <div class="pc-remind__field">
        <input
          :id="inputId"
          v-model.trim="email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
          :aria-invalid="state === 'error'"
          :aria-describedby="`${inputId}-help`"
        />
        <LxButton icon="none" :class="{ 'is-busy': state === 'sending' }" @click="submit">
          {{ state === "sending" ? "Saving…" : "Remind me" }}
        </LxButton>
      </div>
      <p v-if="state === 'error'" class="pc-remind__error" role="alert">{{ error }}</p>
      <p :id="`${inputId}-help`" class="pc-remind__consent">
        We only use your address for these reminders, and every email has an unsubscribe link.
        See our <NuxtLink to="/privacy/" class="lx-inline-link">privacy policy</NuxtLink>.
      </p>
    </form>

    <p v-else class="pc-remind__done" role="status">
      <span class="lx-tick" aria-hidden="true" />
      Done. We will write to {{ email }} with the key dates of {{ contest.name }}.
    </p>
  </div>
</template>

<script setup>
import { contestStatus } from "~/utils/contests";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  contest: { type: Object, required: true },
  today: { type: String, required: true },
});

const config = useRuntimeConfig();
const inputId = useId();

const email = ref("");
const state = ref("idle");
const error = ref("");

const heading = computed(() => {
  const status = contestStatus(props.contest, props.today);
  if (status === "open") return "Don't miss the deadline.";
  return status === "upcoming" ? "Know the day entries open." : "Know when the next edition opens.";
});

async function submit() {
  if (state.value === "sending") return;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
    state.value = "error";
    error.value = "That email address does not look right.";
    return;
  }
  state.value = "sending";
  try {
    await $fetch(`/api/contests/${props.contest.slug}/reminders`, {
      method: "POST",
      baseURL: config.public.mainApiBaseUrl,
      body: { email: email.value },
    });
    state.value = "done";
    trackUserAction("contest_reminder_created", "photo_contest_detail", props.contest.slug);
  } catch (err) {
    const status = err?.response?.status ?? err?.statusCode;
    state.value = "error";
    error.value =
      status === 422
        ? "That email address does not look right."
        : status === 429
          ? "Too many requests from this connection. Please try again later."
          : "The reminder could not be saved. Please try again in a moment.";
  }
}
</script>

<style scoped>
.pc-remind {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 64px);
  align-items: center;
  padding: clamp(28px, 4vw, 56px);
}

.pc-remind__copy {
  display: grid;
  gap: 0.9rem;
}

.pc-remind__text {
  max-width: 34em;
  line-height: 1.65;
  color: var(--lx-text-2);
}

.pc-remind__form {
  display: grid;
  gap: 0.7rem;
}

.pc-remind__label {
  font-size: var(--lx-fs-xs);
  font-weight: 600;
  color: var(--lx-text-2);
}

.pc-remind__field {
  display: flex;
  gap: 0.5rem;
}

.pc-remind__field input {
  flex: 1;
  min-width: 0;
  height: 52px;
  padding: 0 1.2rem;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  background: var(--pc-tint);
  color: var(--lx-text);
  font: 500 1rem var(--lx-font-sans);
  outline: none;
  transition: border-color 0.3s ease;
}

.pc-remind__field input::placeholder {
  color: var(--lx-text-3);
}

.pc-remind__field input:focus {
  border-color: color-mix(in srgb, var(--pc-gold) 65%, transparent);
}

.pc-remind__field input[aria-invalid="true"] {
  border-color: #f87171;
}

.pc-remind__field .is-busy {
  opacity: 0.6;
  pointer-events: none;
}

.pc-remind__error {
  font-size: var(--lx-fs-sm);
  color: #b91c1c;
}

.pc-remind__consent {
  font-size: var(--lx-fs-xs);
  line-height: 1.6;
  color: var(--lx-text-3);
}

.pc-remind__done {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--lx-font-display);
  font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  font-weight: 360;
  line-height: 1.4;
  color: var(--lx-text);
}

@media (max-width: 860px) {
  .pc-remind {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .pc-remind__field {
    flex-direction: column;
  }

  .pc-remind__field :deep(.lx-btn) {
    justify-content: center;
  }
}
</style>
