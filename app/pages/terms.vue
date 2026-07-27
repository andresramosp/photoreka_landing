<template>
  <div class="terms-page">
    <!-- Navigation Header -->
    <nav class="landing-nav">
      <div class="nav-container">
        <div class="nav-brand">
          <div class="logo">
            <NuxtLink to="/">
              <AppLogo layout="horizontal" :height="45" />
            </NuxtLink>
          </div>
        </div>
        <div class="nav-actions">
          <n-button text @click="goHome"> Back to Home </n-button>
        </div>
      </div>
    </nav>

    <!-- Terms Content -->
    <div class="terms-container">
      <div class="terms-content">
        <h1 class="terms-title">Terms of Service</h1>
        <p class="terms-effective">Last updated: July 27, 2026</p>

        <section class="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Photoreka ("the Platform"), you agree to be
            bound by these Terms of Service. If you do not agree, you must not
            use the Platform. Your continued use constitutes acceptance of any
            future modifications to these terms.
          </p>
          <p>
            These Terms of Service should be read in conjunction with our
            <NuxtLink to="/privacy">Privacy &amp; Image Policy</NuxtLink>, which
            governs how we handle your data and images.
          </p>
        </section>

        <section class="terms-section">
          <h2>2. Description of Service</h2>
          <p>
            Photoreka is an AI-powered photo curation platform designed for
            photographers. The Platform provides tools for photo search,
            analysis, curation, scoring, and visualization using artificial
            intelligence technologies. The service is intended exclusively for
            artistic or documentary photographic bodies of work.
          </p>
          <p>
            <strong>Photoreka is not a storage service.</strong> The Platform
            does not replace, substitute, or serve as a backup for your original
            photo storage system (local drives, cloud services, or any other
            storage solution). Only reduced, medium-quality versions of your
            images are stored on our servers for the sole purpose of enabling
            analysis, search, and preview functionalities. You must always
            maintain your own independent copies and backups of your original
            files.
          </p>
          <p>
            Where you choose to sign in using Google, or to import photos from
            Google Photos or Google Drive, those integrations are additionally
            subject to the Google Terms of Service. Photoreka's use
            and transfer of information received from Google APIs to any other
            app will adhere to the
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener"
              >Google API Services User Data Policy</a
            >, including the Limited Use requirements. See our
            <NuxtLink to="/privacy">Privacy &amp; Image Policy</NuxtLink> for
            details on what Google user data we access and how it is used.
          </p>
        </section>

        <section class="terms-section">
          <h2>3. Account Registration and Security</h2>
          <ul>
            <li>
              You must provide accurate and complete information when creating
              an account.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities under your account.
            </li>
            <li>
              You must notify Photoreka immediately of any unauthorized use of
              your account.
            </li>
            <li>
              Photoreka reserves the right to suspend or terminate accounts that
              violate these terms.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>4. User Responsibilities</h2>
          <ul>
            <li>
              You must ensure that any content uploaded does not infringe
              third-party intellectual property rights.
            </li>
            <li>
              You are solely responsible for the legality and appropriateness of
              all content you upload.
            </li>
            <li>
              You agree not to use the Platform for any unlawful purpose or in
              violation of any applicable laws or regulations.
            </li>
            <li>
              You agree not to attempt to reverse engineer, decompile, or
              disassemble any part of the Platform.
            </li>
            <li>
              You agree not to use automated scripts, bots, or other means to
              access the Platform in a manner that could impair its operation.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>5. Intellectual Property</h2>
          <ul>
            <li>
              You retain 100% ownership and copyright of all images you upload.
            </li>
            <li>
              By uploading images, you grant Photoreka a limited, non-exclusive,
              revocable license to store, process, and analyze your images
              solely to provide Platform functionalities.
            </li>
            <li>
              Photoreka does not sell, license, or redistribute your images
              without your explicit consent.
            </li>
            <li>
              All Photoreka branding, software, AI models, interfaces, and
              platform technology remain the exclusive property of Photoreka.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>6. Prohibited Content</h2>
          <p>
            Photoreka strictly prohibits the upload of the following types of
            content:
          </p>
          <ul>
            <li>Synthetic or AI-generated photos.</li>
            <li>Drawings, illustrations, or non-photographic graphics.</li>
            <li>
              Photos containing violent, erotic, sexually explicit, or adult
              content.
            </li>
            <li>
              Content that promotes hatred, discrimination, or harassment.
            </li>
            <li>Content that violates any applicable law or regulation.</li>
          </ul>
          <p>
            If such content is detected, we reserve the right to immediately
            revoke your access to the Platform and permanently delete the
            violating content without prior notice or refund.
          </p>
        </section>

        <section class="terms-section">
          <h2>7. Service Availability and Modifications</h2>
          <ul>
            <li>
              Photoreka reserves the right to modify, suspend, or discontinue
              any part of the service at any time, with or without notice.
            </li>
            <li>
              We do not guarantee uninterrupted or error-free access to the
              Platform. Scheduled maintenance and occasional downtime may occur.
            </li>
            <li>
              We may update these Terms of Service from time to time. Material
              changes will be communicated via the Platform or email.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>8. Disclaimer of Warranties</h2>
          <p>
            The Platform and all services are provided
            <strong>"as is"</strong> and <strong>"as available"</strong> without
            warranties of any kind, whether express or implied, including but
            not limited to implied warranties of merchantability, fitness for a
            particular purpose, and non-infringement.
          </p>
          <p>
            Photoreka does not warrant that AI-generated tags, scores, or
            analysis results will be accurate, complete, or error-free.
          </p>
          <p>
            <strong
              >Photoreka does not guarantee the preservation, integrity, or
              availability of any images stored on the Platform.</strong
            >
            Since only reduced-quality copies are stored, data loss on Photoreka
            does not imply loss of your originals. Photoreka assumes no
            responsibility whatsoever for the loss, corruption, or
            unavailability of images or derived data on the Platform. You are
            solely responsible for maintaining backups of your original files.
          </p>
        </section>

        <section class="terms-section">
          <h2>9. Limitation of Liability</h2>
          <ul>
            <li>
              To the maximum extent permitted by law, Photoreka shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising from the use of or inability to use the
              Platform.
            </li>
            <li>
              Photoreka's total liability for any claim shall not exceed the
              amount you paid to Photoreka in the twelve (12) months preceding
              the event giving rise to the claim.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Photoreka, its officers,
            employees, and agents from any claims, damages, or expenses
            (including reasonable attorney's fees) arising from your use of the
            Platform, your violation of these Terms, or your infringement of any
            third-party rights.
          </p>
        </section>

        <section class="terms-section">
          <h2>11. Termination</h2>
          <ul>
            <li>
              You may terminate your account at any time by contacting us at
              <a href="mailto:hello@photoreka.com">hello@photoreka.com</a>.
            </li>
            <li>
              Photoreka may terminate or suspend your access at any time for
              violation of these terms or for any other reason at our sole
              discretion.
            </li>
            <li>
              Upon termination, your right to use the Platform ceases
              immediately. Provisions that by their nature should survive
              termination (including intellectual property, limitation of
              liability, and indemnification) shall survive.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the European Union and the applicable national laws
            where Photoreka operates, without regard to conflict of law
            principles. Any disputes shall be resolved in the competent courts
            of the jurisdiction where Photoreka is established.
          </p>
        </section>

        <section class="terms-section">
          <h2>13. Contact</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at
            <a href="mailto:hello@photoreka.com">hello@photoreka.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NButton } from "naive-ui";
import AppLogo from "@/components/AppLogo.vue";

// SEO Configuration
useSEO("terms");

const goHome = () => {
  navigateTo("/");
};
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #0f0f13 0%, #16161a 100%);
  color: var(--text-primary);
}

/* Navigation */
.landing-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 19, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}

.nav-brand .logo {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex-shrink: 0;
}
.nav-brand .logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

/* Terms Content */
.terms-container {
  padding-top: 100px;
  padding-bottom: 60px;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.terms-content {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.terms-title {
  font-size: var(--fs-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 12px;
  color: var(--text-primary);
  text-align: center;
  line-height: var(--line-height-tight);
}

.terms-effective {
  text-align: center;
  color: var(--text-tertiary);
  font-size: var(--fs-sm);
  margin-bottom: 40px;
}

.terms-section {
  margin-bottom: 32px;
}

.terms-section h2 {
  font-size: var(--fs-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 16px;
  color: var(--text-primary);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 8px;
}

.terms-section p {
  color: var(--text-secondary);
  line-height: var(--line-height-loose);
  margin-bottom: 16px;
}

.terms-section p a,
.terms-section li a {
  color: var(--primary-color);
  text-decoration: underline;
}

.terms-section ul {
  margin: 0;
  padding-left: 20px;
}

.terms-section li {
  color: var(--text-secondary);
  line-height: var(--line-height-loose);
  margin-bottom: 8px;
}

/* Footer */
.landing-footer {
  background: #0a0a0e;
  padding: 48px 0 24px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  margin-bottom: 32px;
}

.footer-brand .logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.footer-description {
  color: var(--text-secondary);
  line-height: var(--line-height-loose);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.link-title {
  font-weight: var(--font-weight-semibold);
  margin-bottom: 16px;
  color: var(--text-primary);
}

.link {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.2s ease;
  cursor: pointer;
}

.link:hover {
  color: var(--primary-color);
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.copyright {
  color: var(--text-tertiary);
  font-size: var(--fs-sm);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .terms-container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .terms-content {
    padding: 24px;
  }

  .terms-title {
    font-size: var(--fs-3xl);
    margin-bottom: 32px;
  }

  .terms-section h2 {
    font-size: var(--fs-lg);
  }

  .nav-container {
    padding: 0 16px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .terms-container {
    padding-left: 12px;
    padding-right: 12px;
  }

  .terms-content {
    padding: 20px;
  }

  .terms-title {
    font-size: var(--fs-xl);
  }

  .terms-section h2 {
    font-size: var(--fs-md);
  }

  .nav-container {
    padding: 0 12px;
  }

  .footer-container {
    padding: 0 12px;
  }
}
</style>
