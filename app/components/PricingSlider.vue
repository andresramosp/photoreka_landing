<template>
  <div v-if="packages.length" class="pricing-slider" :class="{ visible }">
    <div v-if="promotion && promoLabel" class="pricing-promo">
      <n-icon size="15"><PricetagOutline /></n-icon>
      <span>{{ promoLabel }}</span>
    </div>

    <div class="pricing-card">
      <div class="pricing-readout">
        <div class="pricing-photos">
          <span class="pricing-photos-num">
            <RollingNumber :value="`+${selected.photos.toLocaleString('en-US')}`" />
          </span>
          <span class="pricing-photos-label">photos analyzed</span>
        </div>

        <div class="pricing-price-col">
          <div class="pricing-price-row">
            <span
              v-if="finalPrice !== null"
              class="pricing-price-old"
              >€{{ selected.priceEur.toFixed(2) }}</span
            >
            <span class="pricing-price">
              <RollingNumber :value="`€${(finalPrice ?? selected.priceEur).toFixed(2)}`" />
            </span>
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

      <LxButton block class="pricing-cta" @click="$emit('get-started', selected)">
        Get started
      </LxButton>

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
  max-width: 680px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 1s var(--lx-ease),
    transform 1.2s var(--lx-ease);
}
.pricing-slider.visible {
  opacity: 1;
  transform: translateY(0);
}

.pricing-promo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: fit-content;
  margin: 0 auto 1.25rem;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--lx-ok) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--lx-ok) 32%, transparent);
  color: var(--lx-ok);
  font-size: var(--lx-fs-xs);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.pricing-card {
  position: relative;
  overflow: hidden;
  background: var(--lx-surface);
  border: 1px solid var(--lx-line-2);
  border-radius: 32px;
  padding: clamp(28px, 4vw, 48px);
  box-shadow: var(--lx-shadow-lg), var(--lx-highlight);
}

/* Soft brand light in the top corner of the card. */
.pricing-card::before {
  content: "";
  position: absolute;
  top: -40%;
  right: -20%;
  width: 70%;
  height: 90%;
  background: radial-gradient(closest-side, var(--lx-glow-1), transparent);
  pointer-events: none;
}

.pricing-readout {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.pricing-photos {
  display: flex;
  flex-direction: column;
}
.pricing-photos-num {
  font-family: var(--lx-font-display);
  font-size: clamp(2.8rem, 6vw, 4.4rem);
  font-weight: 340;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--lx-text);
}
.pricing-photos-label {
  margin-top: 0.6rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.pricing-price-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.pricing-price-row {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}
.pricing-price {
  font-family: var(--lx-font-display);
  font-size: clamp(1.9rem, 3.6vw, 2.6rem);
  font-weight: 380;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--lx-text);
}
.pricing-price-old {
  font-size: var(--lx-fs-body);
  color: var(--lx-text-3);
  text-decoration: line-through;
}
.pricing-unit {
  margin-top: 0.6rem;
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-2);
}

.pricing-track {
  position: relative;
  padding: 0 0.25rem;
  margin-bottom: 2.25rem;
}

.pricing-track :deep(.n-slider-rail__fill) {
  background: var(--lx-accent-grad);
}

.pricing-track :deep(.n-slider-handle) {
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--lx-accent) 25%, transparent),
    0 6px 16px rgba(0, 0, 0, 0.35);
}

.pricing-meta {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  justify-content: center;
  padding: 1.25rem 0;
  margin-bottom: 1.75rem;
  border-block: 1px solid var(--lx-line);
}
.pricing-meta-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}
.pricing-meta-item strong {
  color: var(--lx-text);
  font-weight: 600;
}
.pricing-meta-icon {
  color: var(--lx-accent);
}

.pricing-cta {
  margin-bottom: 1rem;
}

.pricing-note {
  text-align: center;
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
  margin: 0;
}

@media (max-width: 560px) {
  .pricing-readout {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .pricing-price-col {
    align-items: flex-start;
  }
}
</style>
