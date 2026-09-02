<template>
  <div v-if="packages.length" class="pricing-slider" :class="{ visible }">
    <div v-if="promotion && promoLabel" class="pricing-promo">
      <n-icon size="15"><PricetagOutline /></n-icon>
      <span>{{ promoLabel }}</span>
    </div>

    <div class="pricing-card">
      <div class="pricing-readout">
        <div class="pricing-photos">
          <span class="pricing-photos-num">+{{ selected.photos.toLocaleString("en-US") }}</span>
          <span class="pricing-photos-label">photos analyzed</span>
        </div>

        <div class="pricing-price-col">
          <div class="pricing-price-row">
            <span
              v-if="finalPrice !== null"
              class="pricing-price-old"
              >€{{ selected.priceEur.toFixed(2) }}</span
            >
            <span class="pricing-price">€{{ (finalPrice ?? selected.priceEur).toFixed(2) }}</span>
          </div>
          <span class="pricing-unit">{{ centsPerPhoto }} cents / photo</span>
        </div>
      </div>

      <div class="pricing-track">
        <n-slider
          :value="selectedIndex"
          @update:value="selectedIndex = $event"
          :min="0"
          :max="packages.length - 1"
          :step="1"
          :marks="marks"
          :tooltip="false"
        />
      </div>

      <div class="pricing-meta">
        <div class="pricing-meta-item">
          <n-icon size="16" class="pricing-meta-icon"><LayersOutline /></n-icon>
          <span
            ><strong>{{ selected.photos.toLocaleString("en-US") }}</strong> photo analysis
            slots</span
          >
        </div>
        <div v-if="selected.credits > 0" class="pricing-meta-item">
          <n-icon size="16" class="pricing-meta-icon"><SparklesOutline /></n-icon>
          <span
            ><strong>{{ selected.credits.toLocaleString("en-US") }}</strong> bonus tool
            credits</span
          >
        </div>
        <div class="pricing-meta-item">
          <n-icon size="16" class="pricing-meta-icon"><InfiniteOutline /></n-icon>
          <span>Never expire</span>
        </div>
      </div>

      <n-button
        type="info"
        size="large"
        strong
        block
        class="pricing-cta"
        @click="$emit('get-started', selected)"
      >
        <template #icon>
          <n-icon><RocketOutline /></n-icon>
        </template>
        Get started
      </n-button>

      <p class="pricing-note">
        One-time purchase — photos are added to your account instantly. No subscription.
      </p>
    </div>
  </div>
</template>

<script setup>
import {
  LayersOutline,
  SparklesOutline,
  InfiniteOutline,
  RocketOutline,
  PricetagOutline,
} from "@vicons/ionicons5";

defineProps({
  visible: { type: Boolean, default: true },
});
defineEmits(["get-started"]);

const config = useRuntimeConfig();

const packages = ref([]);
const promotion = ref(null);
const selectedIndex = ref(0);

const selected = computed(() => packages.value[selectedIndex.value] ?? null);

const discountAmount = computed(() => {
  if (!selected.value || !promotion.value) return null;
  if (promotion.value.percentOff) {
    return (selected.value.priceEur * promotion.value.percentOff) / 100;
  }
  if (promotion.value.amountOff) {
    return promotion.value.amountOff / 100;
  }
  return null;
});

const finalPrice = computed(() =>
  discountAmount.value !== null
    ? Math.max(0, selected.value.priceEur - discountAmount.value)
    : null,
);

const centsPerPhoto = computed(() => {
  if (!selected.value || !selected.value.photos) return "0";
  const price = finalPrice.value ?? selected.value.priceEur;
  return ((price / selected.value.photos) * 100).toFixed(2);
});

const promoLabel = computed(() => {
  if (!promotion.value) return null;
  if (promotion.value.percentOff) return `${promotion.value.percentOff}% off — limited time`;
  if (promotion.value.amountOff)
    return `€${(promotion.value.amountOff / 100).toFixed(0)} off — limited time`;
  return null;
});

const marks = computed(() => {
  const out = {};
  packages.value.forEach((pkg, i) => {
    out[i] = formatShort(pkg.photos);
  });
  return out;
});

function formatShort(n) {
  if (n >= 1000) {
    const k = n / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return `${n}`;
}

onMounted(async () => {
  try {
    const data = await $fetch("/api/payments/packages", {
      baseURL: config.public.mainApiBaseUrl,
    });
    const list = (data?.photoPackages || [])
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder || a.photos - b.photos);
    packages.value = list;
    promotion.value = data?.promotion ?? null;
    // Default a un package intermedio si hay suficientes, para invitar a explorar.
    if (list.length > 2) selectedIndex.value = Math.min(2, list.length - 1);
  } catch (err) {
    console.error("[PricingSlider] Failed to fetch packages:", err);
  }
});
</script>

<style scoped>
.pricing-slider {
  max-width: 650px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.pricing-slider.visible {
  opacity: 1;
  transform: translateY(0);
}

.pricing-promo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: fit-content;
  margin: 0 auto 1rem;
  padding: 0.35rem 0.9rem;
  border-radius: 50px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #22c55e;
  font-size: var(--landing-fs-caption);
  font-weight: var(--font-weight-bold);
}

.pricing-card {
  background: var(--premium-bg);
  border: 1px solid var(--premium-border);
  border-radius: 24px;
  padding: 2.5rem 2.5rem 2rem;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
}

.pricing-readout {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.25rem;
}

.pricing-photos {
  display: flex;
  flex-direction: column;
}
.pricing-photos-num {
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  font-weight: var(--landing-fw-display);
  line-height: 1;
  background: linear-gradient(135deg, #ffffff 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
[data-theme="light"] .pricing-photos-num {
  background: linear-gradient(135deg, #1e40af 0%, #0284c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.pricing-photos-label {
  margin-top: 0.35rem;
  font-size: var(--landing-fs-sm);
  color: var(--premium-text-secondary);
}

.pricing-price-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.pricing-price-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}
.pricing-price {
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: var(--landing-fw-strong);
  color: var(--premium-text-primary);
}
.pricing-price-old {
  font-size: var(--landing-fs-body);
  color: var(--premium-text-secondary);
  text-decoration: line-through;
}
.pricing-unit {
  margin-top: 0.25rem;
  font-size: var(--landing-fs-caption);
  color: var(--premium-text-secondary);
}

.pricing-track {
  padding: 0 0.25rem;
  margin-bottom: 2rem;
}

.pricing-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  justify-content: center;
  margin-bottom: 1.75rem;
}
.pricing-meta-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: var(--landing-fs-sm);
  color: var(--premium-text-secondary);
}
.pricing-meta-item strong {
  color: var(--premium-text-primary);
  font-weight: var(--font-weight-semibold);
}
.pricing-meta-icon {
  color: var(--premium-primary);
}

.pricing-cta {
  margin-bottom: 0.9rem;
}

.pricing-note {
  text-align: center;
  font-size: var(--landing-fs-caption);
  color: var(--premium-text-secondary);
  margin: 0;
}

@media (max-width: 560px) {
  .pricing-card {
    padding: 1.75rem 1.25rem 1.5rem;
  }
  .pricing-readout {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .pricing-price-col {
    align-items: flex-start;
  }
}
</style>
