import { ref, onMounted } from "vue";

export function useMobileDevice() {
  const isMobile = ref(false);

  onMounted(() => {
    isMobile.value = isMobileDevice();
  });

  return {
    isMobile,
  };
}
