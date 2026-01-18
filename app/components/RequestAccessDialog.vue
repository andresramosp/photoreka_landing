<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    title="Join the Waiting List"
    :mask-closable="true"
    :closable="true"
    :auto-focus="false"
    :icon="undefined"
    style="width: 740px; max-width: 90vw"
  >
    <template #icon>
      <n-icon size="24" color="#2563eb">
        <KeyOutline />
      </n-icon>
    </template>

    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">Join the Waiting List</span>
      </div>
    </template>

    <div class="dialog-content">
      <p class="intro-text">
        Photoreka is currently rolling out access in small batches. New users
        are invited progressively in groups of 20, so we can closely monitor
        quality and performance.
      </p>

      <p class="intro-text">
        Leave your email below to join the waiting list. We will notify you as
        soon as your batch is ready.
      </p>

      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        size="medium"
        label-placement="top"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="Email Address" path="email" required>
          <n-input
            v-model:value="formData.email"
            type="email"
            placeholder="your.email@example.com"
            :disabled="loading"
          />
        </n-form-item>

        <n-form-item label="Portfolio / Social link" path="portfolioLink">
          <n-input
            v-model:value="formData.portfolioLink"
            placeholder="https://your-portfolio.com or Instagram"
            :disabled="loading"
          />
          <template #feedback>
            <span class="optional-text">
              Optional. Helps us prioritize photographers with active work.
            </span>
          </template>
        </n-form-item>

        <n-form-item path="hasLargeCollection" class="switch-form-item">
          <div class="switch-container">
            <span class="switch-label">
              I manage a photo collection larger than 500 images
            </span>
            <n-switch
              v-model:value="formData.hasLargeCollection"
              :disabled="loading"
              size="medium"
            />
          </div>
          <template #feedback v-if="!formData.hasLargeCollection">
            <span class="info-message">
              Photoreka is optimized for large libraries, but smaller
              collections are still welcome on the waiting list.
            </span>
          </template>
        </n-form-item>
      </n-form>
    </div>

    <template #action>
      <div class="dialog-actions">
        <n-button @click="handleCancel" :disabled="loading">Cancel</n-button>
        <n-button
          type="primary"
          @click="handleSubmit"
          :loading="loading"
          :disabled="!isFormValid"
        >
          <template #icon>
            <n-icon><SendOutline /></n-icon>
          </template>
          Join Waiting List
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import {
  NModal,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NIcon,
  NSwitch,
  useMessage,
} from "naive-ui";
import { KeyOutline, RocketOutline, SendOutline } from "@vicons/ionicons5";
import { trackEvent, trackUserAction } from "~/utils/analytics";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:show", "success"]);

const message = useMessage();
const formRef = ref(null);
const loading = ref(false);

const visible = computed({
  get: () => props.show,
  set: (value) => emit("update:show", value),
});

const formData = reactive({
  email: "",
  portfolioLink: "",
  hasLargeCollection: true,
});

const rules = {
  email: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Please enter a valid email address" },
  ],
};

const isFormValid = computed(() => {
  return formData.email && formData.email.includes("@");
});

const handleCancel = () => {
  trackUserAction("cancel", "waiting_list_dialog");
  visible.value = false;
};

const handleSubmit = async () => {
  try {
    await formRef.value?.validate();
    loading.value = true;

    trackEvent("form_submit_attempt", {
      form_type: "waiting_list",
      has_portfolio: !!formData.portfolioLink,
      has_large_collection: formData.hasLargeCollection,
    });

    const config = useRuntimeConfig();
    await $fetch("/api/landing/waiting-list", {
      method: "POST",
      baseURL: config.public.mainApiBaseUrl,
      body: {
        email: formData.email,
        portfolioLink: formData.portfolioLink || null,
        hasLargeCollection: formData.hasLargeCollection,
      },
    });

    trackEvent("form_submit_success", {
      form_type: "waiting_list",
    });

    message.success(
      "You are on the waiting list. We will notify you when your batch opens.",
    );

    formData.email = "";
    formData.portfolioLink = "";
    formData.hasLargeCollection = true;

    visible.value = false;
    emit("success");
  } catch (error) {
    console.error("Error submitting waiting list:", error);

    trackEvent("form_submit_error", {
      form_type: "waiting_list",
      error_status: error.response?.status || "unknown",
    });

    if (error.response?.status === 409) {
      message.warning("This email is already on the waiting list.");
    } else {
      message.error("Failed to join the waiting list. Please try again later.");
    }
  } finally {
    loading.value = false;
  }
};

watch(visible, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      formData.email = "";
      formData.portfolioLink = "";
      formData.hasLargeCollection = true;
    }, 300);
  }
});
</script>

<style scoped>
.dialog-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
}

.dialog-content {
  padding: 0;
}

.intro-text {
  line-height: 1.6;
  font-size: 14px;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.optional-text {
  font-size: 12px;
  font-style: italic;
}

.info-message {
  font-size: 12px;
  font-style: italic;
}

.switch-form-item :deep(.n-form-item-label) {
  display: none;
}

.switch-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.switch-label {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 600px) {
  .dialog-actions {
    flex-direction: column-reverse;
  }

  .intro-text {
    font-size: 13px;
  }
}
</style>
