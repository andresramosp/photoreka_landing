/**
 * Returns helpers to adapt the UI depending on the registration mode configured
 * via the NUXT_PUBLIC_REGISTRATION_MODE environment variable.
 *
 * - 'waiting_list' (default): shows the RequestAccessDialog
 * - 'open': redirects to app.photoreka.com/auth in a new tab
 */
export const useRegistrationMode = () => {
  const config = useRuntimeConfig();

  const isOpenMode = computed(
    () => (config.public.registrationMode as string) === "open",
  );

  /** Label for short CTA buttons (e.g. hero "Waiting List" → "Create Account") */
  const signupButtonLabel = computed(() => "Create Account");

  /** Label for long CTA buttons (e.g. "Join Waiting List" → "Create Account") */
  const joinButtonLabel = computed(() => "Create Account");

  /** Call this instead of showing the RequestAccessDialog. */
  const openSignup = () => {
    if (isOpenMode.value) {
      window.open(`${config.public.appUrl}/auth`, "_blank");
    }
  };

  return { isOpenMode, signupButtonLabel, joinButtonLabel, openSignup };
};
