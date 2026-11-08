// Cookie consent: the visitor's choice and its Google Consent Mode v2 signals.

export interface ConsentChoice {
  analytics: boolean;
  ads: boolean;
}

type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "photoreka-cookie-consent";
const ANALYTICS_COOKIES = /^(_ga|_gid|_gat)/;
const ADS_COOKIES = /^_gcl/;

const isBrowser = typeof window !== "undefined";

export function readConsentChoice(): ConsentChoice | null {
  if (!isBrowser) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { analytics: !!parsed.analytics, ads: !!parsed.ads };
  } catch {
    return null;
  }
}

// No choice yet means everything denied: tags run cookieless until the visitor accepts.
export function consentSignals(
  choice: ConsentChoice | null,
): Record<string, ConsentValue> {
  const value = (on: boolean | undefined): ConsentValue =>
    on ? "granted" : "denied";
  return {
    analytics_storage: value(choice?.analytics),
    ad_storage: value(choice?.ads),
    ad_user_data: value(choice?.ads),
    ad_personalization: value(choice?.ads),
  };
}

// Consent Mode stops new cookies but leaves the old ones; a withdrawn consent
// has to remove them, on every domain level GA may have written them to.
function clearCookies(pattern: RegExp): void {
  const parts = window.location.hostname.split(".");
  const domains = parts.map((_, i) => parts.slice(i).join("."));

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !pattern.test(name)) return;
    const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = expired;
    domains.forEach((domain) => {
      document.cookie = `${expired}; domain=.${domain}`;
    });
  });
}

export function saveConsentChoice(choice: ConsentChoice): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...choice, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // Without storage the banner simply asks again on the next visit.
  }

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", consentSignals(choice));
  }

  if (!choice.analytics) clearCookies(ANALYTICS_COOKIES);
  if (!choice.ads) clearCookies(ADS_COOKIES);
}
