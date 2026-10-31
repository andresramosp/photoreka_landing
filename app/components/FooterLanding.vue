<template>
  <footer class="premium-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-column">
          <AppLogo layout="horizontal" :with-claim="true" size="small" />
          <p class="footer-description">
            The AI curation layer for your photo archive. Search, score, explore
            in 3D, and build portfolios with AI—on top of the storage you
            already use.
          </p>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">FIND &amp; ORGANIZE</h4>
          <NuxtLink to="/ai_photo_organizer" class="footer-link"
            >AI Photo Organizer</NuxtLink
          >
          <NuxtLink to="/ai_photo_search" class="footer-link"
            >AI Photo Search</NuxtLink
          >
          <NuxtLink to="/photo_tag_cloud" class="footer-link"
            >Photo Tag Cloud</NuxtLink
          >
          <NuxtLink to="/photo_3D_atlas" class="footer-link"
            >3D Photo Atlas</NuxtLink
          >
          <NuxtLink to="/lightroom_search_plugin" class="footer-link"
            >Lightroom Plugin</NuxtLink
          >
        </div>

        <div class="footer-column">
          <h4 class="footer-title">SELECT &amp; SCORE</h4>
          <NuxtLink to="/ai_photo_culling" class="footer-link"
            >AI Photo Culling</NuxtLink
          >
          <NuxtLink to="/photo_scoring" class="footer-link"
            >Photo Scoring &amp; Ranking</NuxtLink
          >
          <NuxtLink to="/ai_photo_picks" class="footer-link"
            >Picks: Find Your Best Photos</NuxtLink
          >
          <NuxtLink to="/photo_reports" class="footer-link"
            >Style Analysis Reports</NuxtLink
          >
          <NuxtLink to="/photo_chat" class="footer-link"
            >AI Photo Assistant</NuxtLink
          >
        </div>

        <div class="footer-column">
          <h4 class="footer-title">CREATE &amp; LOCATE</h4>
          <NuxtLink to="/ai_photo_storyboard" class="footer-link"
            >AI Photo Storyboard</NuxtLink
          >
          <NuxtLink to="/photography_portfolio_builder" class="footer-link"
            >Portfolio Builder</NuxtLink
          >
          <NuxtLink to="/ai_geo_inference" class="footer-link"
            >AI Geo Inference</NuxtLink
          >
          <NuxtLink to="/ai_geo_recovery" class="footer-link"
            >AI Bulk Geotagging</NuxtLink
          >
          <NuxtLink to="/framer" class="footer-link"
            >Free Photo Framer</NuxtLink
          >
        </div>

        <div class="footer-column">
          <h4 class="footer-title">COMPANY</h4>
          <NuxtLink to="/blog" class="footer-link">Blog</NuxtLink>
          <a
            href="https://www.instagram.com/photoreka_curation_lab/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link footer-social"
          >
            <n-icon size="18"><LogoInstagram /></n-icon>
            <span>Instagram</span>
          </a>
          <a
            href="mailto:hello@photoreka.com"
            class="footer-link footer-social"
          >
            <n-icon size="18"><MailOutline /></n-icon>
            <span>hello@photoreka.com</span>
          </a>
          <NuxtLink to="/terms" class="footer-link">Terms of Service</NuxtLink>
          <NuxtLink to="/privacy" class="footer-link"
            >Privacy &amp; Image Policy</NuxtLink
          >
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ new Date().getFullYear() }} Photoreka. All rights reserved.
        </p>
      </div>
    </div>
    <!-- <div class="footer-wordmark" aria-hidden="true">
      <AppLogo layout="horizontal" :with-claim="false" />
    </div> -->
  </footer>
</template>

<script setup>
import { LogoInstagram, MailOutline } from "@vicons/ionicons5";
import AppLogo from "~/components/AppLogo.vue";
</script>

<style scoped>
/* Styled with the lx landing tokens (assets/landing-system.scss). */
.premium-footer {
  position: relative;
  overflow: hidden;
  background: var(--lx-bg);
  padding: clamp(64px, 8vw, 104px) 0 0;
  margin-top: auto;
  border-top: 1px solid var(--lx-line);
  font-family: var(--lx-font-sans);
}

.footer-container {
  max-width: calc(var(--lx-container) + 2 * var(--lx-gutter));
  margin: 0 auto;
  padding: 0 var(--lx-gutter);
}

.footer-content {
  display: grid;
  grid-template-columns: 1.4fr repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 56px;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-column:first-child {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}

.footer-column h4 {
  margin: 0 0 18px 0;
}

.footer-description {
  max-width: 30em;
  margin: 0;
  color: var(--lx-text-2);
  line-height: 1.75;
  font-size: var(--lx-fs-sm);
}

.footer-title {
  font-family: var(--lx-font-sans);
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--lx-text-3);
  margin: 0;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  color: var(--lx-text-2);
  text-decoration: none;
  margin-bottom: 10px;
  transition:
    color 0.3s ease,
    transform 0.5s var(--lx-ease);
  cursor: pointer;
  font-size: var(--lx-fs-sm);
}

.footer-link:hover {
  color: var(--lx-text);
  transform: translateX(3px);
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--lx-line);
  text-align: left;
}

.footer-copyright {
  color: var(--lx-text-3);
  font-size: var(--lx-fs-xs);
  margin: 0;
}

.footer-wordmark {
  margin-top: clamp(16px, 3vw, 40px);
  padding: 0 16px clamp(24px, 4vw, 56px);
  display: flex;
  justify-content: center;
  opacity: 0.09;
  -webkit-mask-image: linear-gradient(180deg, #000 30%, transparent 100%);
  mask-image: linear-gradient(180deg, #000 30%, transparent 100%);
  user-select: none;
  pointer-events: none;
}

.footer-wordmark :deep(.photoreka-logo) {
  width: 100%;
}

/* AppLogo caps its height at 35px on mobile with !important. */
.footer-wordmark :deep(.logo-image) {
  width: min(1100px, 100%);
  height: auto !important;
}

/* Mobile Responsive */
@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-column:first-child {
    grid-column: 1 / -1;
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
