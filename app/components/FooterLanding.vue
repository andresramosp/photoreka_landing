<template>
  <footer class="premium-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-column">
          <AppLogo layout="horizontal" :with-claim="true" size="small" />
          <p class="footer-description">
            AI-powered app to curate and organize your photos. Search, score,
            explore in 3D, and build portfolios with AI.
          </p>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">AI TOOLS</h4>
          <NuxtLink to="/ai_photo_search" class="footer-link"
            >AI Photo Search</NuxtLink
          >
          <NuxtLink to="/ai_photo_culling" class="footer-link"
            >AI Photo Culling</NuxtLink
          >
          <NuxtLink to="/photo_scoring" class="footer-link"
            >Photo Scoring &amp; Ranking</NuxtLink
          >
          <NuxtLink to="/photo_chat" class="footer-link"
            >AI Photo Assistant</NuxtLink
          >
          <NuxtLink to="/photo_reports" class="footer-link"
            >Style Analysis Reports</NuxtLink
          >
          <NuxtLink to="/ai_geo_inference" class="footer-link"
            >AI Geo-Inference</NuxtLink
          >
          <NuxtLink to="/ai_geo_recovery" class="footer-link"
            >AI Bulk Geotagging</NuxtLink
          >
        </div>

        <div class="footer-column">
          <h4 class="footer-title">EXPLORE</h4>
          <NuxtLink to="/photo_3D_atlas" class="footer-link"
            >3D Photo Atlas</NuxtLink
          >
          <NuxtLink to="/photography_portfolio_builder" class="footer-link"
            >Portfolio Builder</NuxtLink
          >
          <NuxtLink to="/lightroom_search_plugin" class="footer-link"
            >Lightroom Plugin</NuxtLink
          >

          <NuxtLink to="/framer" class="footer-link"
            >Free Photo Framer</NuxtLink
          >
        </div>

        <div class="footer-column">
          <h4 class="footer-title">LEGAL</h4>
          <NuxtLink to="/terms" class="footer-link">Terms of Service</NuxtLink>
          <NuxtLink to="/privacy" class="footer-link"
            >Privacy &amp; Image Policy</NuxtLink
          >
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
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  gap: 32px;
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
  line-height: var(--line-height-loose);
  font-size: var(--fs-sm);
}

.footer-title {
  font-weight: var(--font-weight-semibold);
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
  font-size: var(--fs-sm);
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
  font-size: var(--fs-sm);
  margin: 0;
}

/* Mobile Responsive */
@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

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
