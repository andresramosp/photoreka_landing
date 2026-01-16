<template>
  <footer class="premium-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-column">
          <AppLogo layout="horizontal" :with-claim="true" size="small" />
        </div>

        <div class="footer-column">
          <h4 class="footer-title">LEGAL</h4>
          <a @click="goToTerms" class="footer-link"> Terms and Image Policy </a>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">CONTACT</h4>
          <a
            href="https://www.instagram.com/photoreka_curation_lab/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link footer-social"
          >
            <n-icon size="18"><LogoInstagram /></n-icon>
            <span>@photoreka_curation_lab</span>
          </a>
          <a
            href="mailto:hello@photoreka.com"
            class="footer-link footer-social"
          >
            <n-icon size="18"><MailOutline /></n-icon>
            <span>hello@photoreka.com</span>
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ new Date().getFullYear() }} Photoreka. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { LogoInstagram, MailOutline } from "@vicons/ionicons5";
import AppLogo from "~/components/AppLogo.vue";

const goToTerms = () => {
  navigateTo("/terms");
};
</script>

<style scoped>
.premium-footer {
  background: #0a0a0e;
  padding: 48px 0 24px;
  margin-top: auto;
  border-top: 1px solid var(--border-color);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 32px;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-column:first-child {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-column h4 {
  margin: 0 0 16px 0;
}

.footer-description {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 14px;
}

.footer-title {
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
  margin: 0;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.2s ease;
  cursor: pointer;
  font-size: 14px;
}

.footer-link:hover {
  color: var(--primary-color);
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.footer-copyright {
  color: var(--text-tertiary);
  font-size: 14px;
  margin: 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-container {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .premium-footer {
    padding: 32px 0 16px;
  }

  .footer-container {
    padding: 0 12px;
  }

  .footer-content {
    gap: 24px;
  }
}
</style>
