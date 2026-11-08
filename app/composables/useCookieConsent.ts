import {
  readConsentChoice,
  saveConsentChoice,
  type ConsentChoice,
} from "~/utils/consent";

// Shared by the banner and the footer's "Cookie settings" link.
export const useCookieConsent = () => {
  const isOpen = useState("cookie-consent-open", () => false);
  const isCustomizing = useState("cookie-consent-customizing", () => false);
  const draft = useState<ConsentChoice>("cookie-consent-draft", () => ({
    analytics: false,
    ads: false,
  }));

  const askIfUndecided = () => {
    if (!readConsentChoice()) isOpen.value = true;
  };

  const startCustomizing = () => {
    draft.value = readConsentChoice() ?? { analytics: false, ads: false };
    isCustomizing.value = true;
  };

  const openSettings = () => {
    startCustomizing();
    isOpen.value = true;
  };

  const decide = (choice: ConsentChoice) => {
    saveConsentChoice(choice);
    isOpen.value = false;
    isCustomizing.value = false;
  };

  return {
    isOpen,
    isCustomizing,
    draft,
    askIfUndecided,
    startCustomizing,
    openSettings,
    acceptAll: () => decide({ analytics: true, ads: true }),
    rejectAll: () => decide({ analytics: false, ads: false }),
    saveDraft: () => decide({ ...draft.value }),
  };
};
