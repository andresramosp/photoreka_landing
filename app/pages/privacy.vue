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

    <!-- Privacy Content -->
    <div class="terms-container">
      <div class="terms-content">
        <h1 class="terms-title">Privacy &amp; Image Policy</h1>
        <p class="terms-effective">Last updated: July 27, 2026</p>

        <section class="terms-section">
          <h2>1. Introduction</h2>
          <p>
            This Privacy &amp; Image Policy explains how Photoreka ("the
            Platform") collects, uses, stores, and protects your personal data
            and images. This policy should be read in conjunction with our
            <NuxtLink to="/terms">Terms of Service</NuxtLink>.
          </p>
          <p>
            By using Photoreka, you acknowledge and agree to the practices
            described in this policy. If you do not agree, you must not use the
            Platform.
          </p>
        </section>

        <section class="terms-section">
          <h2>2. Data We Collect</h2>
          <p>We collect the following categories of information:</p>
          <ul>
            <li>
              <strong>Account information:</strong> email address, name, and
              authentication data when you create an account. If you sign up or
              sign in using Google, we receive your email address, name, profile
              picture, and Google account identifier from your Google account —
              see the
              <em>Google User Data and Limited Use</em> section below.
            </li>
            <li>
              <strong>Images:</strong> photographs you upload to the Platform
              for analysis and curation, including photos you choose to import
              from Google Photos or Google Drive.
            </li>
            <li>
              <strong>Image metadata:</strong> EXIF data, camera settings,
              geolocation (if present in your files), and AI-generated tags,
              scores, and analysis results.
            </li>
            <li>
              <strong>Usage data:</strong> interaction logs, feature usage, and
              session information to improve the Platform.
            </li>
            <li>
              <strong>Device information:</strong> browser type, operating
              system, and screen resolution for compatibility purposes.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>3. Image Ownership</h2>
          <ul>
            <li>
              You retain 100% ownership and copyright of all images you upload.
            </li>
            <li>
              Photoreka does not claim any ownership rights over your images.
            </li>
            <li>
              Photoreka does not sell, license, or redistribute your images
              without your explicit consent.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>4. Image Storage — Not a Storage Service</h2>
          <ul>
            <li>
              <strong>Photoreka is not a storage or backup service.</strong> The
              Platform does not replace, substitute, or serve as backup for your
              original photo storage system (local drives, external hard drives,
              cloud services, or any other storage solution).
            </li>
            <li>
              Only reduced, medium-quality versions of your images are stored on
              secure servers (Cloudflare R2) for analysis, search, and preview
              functionalities.
            </li>
            <li>
              Original, full-resolution images are never permanently stored on
              our servers.
            </li>
            <li>
              <strong
                >You must always maintain your own independent copies and
                backups of your original files.</strong
              >
              Photoreka assumes no responsibility for the loss, corruption, or
              unavailability of images or derived data on the Platform.
            </li>
            <li>
              All data is encrypted in transit (TLS) and at rest (AES-256).
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>5. Image Processing with AI</h2>
          <ul>
            <li>
              Images are analyzed to extract narrative and contextual tags,
              aesthetic scores, and other visual and technical attributes.
            </li>
            <li>
              Images are only analyzed; they are not edited, transformed, or
              altered in any way during processing.
            </li>
            <li>
              Processing uses proprietary AI models and third-party AI models
              (including Google and OpenAI services) under paid or enterprise
              plans whose terms provide that submitted content is not used to
              train their models.
            </li>
            <li>
              Images may be temporarily transmitted to these providers solely
              for the requested functionality and under confidentiality
              agreements. According to the providers' enterprise data processing
              policies, uploaded images are not used for model training and are
              not retained beyond what is necessary to provide the requested
              service.
            </li>
            <li>
              <strong>Consent Regarding AI Processing:</strong> By using
              Photoreka, you acknowledge and accept that your images will be
              processed using AI models as described above. If you do not agree
              to such processing, you should refrain from uploading images or
              using the Platform.
            </li>
            <li>
              <strong>AI Provider Restrictions:</strong> Some third-party AI
              providers apply their own automated safety and content policies.
              As a result, certain images may be rejected or only partially
              processed, even when they are lawful or intended for legitimate
              artistic, documentary, journalistic, or educational purposes. In
              such cases, some Photoreka analysis features may be unavailable or
              produce incomplete results. These determinations are made
              automatically by the third-party providers and do not necessarily
              reflect Photoreka's own assessment of the content.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>6. How We Use Your Data</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>
              Provide, maintain, and improve Platform functionalities (search,
              curation, scoring, visualization).
            </li>
            <li>
              Generate AI-powered analysis, tags, and scores for your images.
            </li>
            <li>
              Communicate with you about your account, updates, and support
              inquiries.
            </li>
            <li>
              Monitor and analyze usage patterns to improve user experience.
            </li>
            <li>Ensure security and prevent fraud or abuse.</li>
          </ul>
          <p>
            We do <strong>not</strong> use your images or personal data for
            advertising, marketing to third parties, or any purpose unrelated to
            providing the Platform's core functionalities.
          </p>
        </section>

        <section class="terms-section">
          <h2>7. Sharing and Third Parties</h2>
          <ul>
            <li>
              Your images are never shared publicly or with unauthorized third
              parties.
            </li>
            <li>
              Third-party service providers (e.g., AI processing providers,
              cloud infrastructure) may access images only as strictly necessary
              for Platform functionality and under binding confidentiality and
              data processing agreements.
            </li>
            <li>
              We may disclose information if required by law, legal process, or
              governmental request.
            </li>
            <li>
              In the event of a merger, acquisition, or asset sale, your data
              may be transferred as part of the transaction, subject to the same
              privacy protections.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>8. Data Retention and Deletion</h2>
          <ul>
            <li>You can delete your images from the Platform at any time.</li>
            <li>
              Upon deletion, stored copies and all derived data (tags, scores,
              embeddings) are permanently removed within 30 days, except where
              legal retention obligations apply.
            </li>
            <li>
              Upon account deletion, all associated data is removed following
              the same 30-day process.
            </li>
            <li>
              Anonymized, aggregated usage statistics that cannot be linked back
              to individual users may be retained for analytical purposes.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>9. Google User Data and Limited Use</h2>
          <p>
            Photoreka offers "Sign in with Google" as an optional
            authentication method, and lets you import photos directly from
            Google Photos and Google Drive. This section describes specifically
            how we handle data obtained through Google APIs.
          </p>
          <p>
            <strong>What we access.</strong> We request only the following
            scopes, each tied to a specific user-facing feature:
          </p>
          <ul>
            <li>
              <strong>userinfo.email</strong> — your Google account email
              address, used as your unique account identifier and for
              account-related communication.
            </li>
            <li>
              <strong>userinfo.profile</strong> — your name, profile picture,
              and Google account identifier, used to create and display your
              Photoreka user profile.
            </li>
            <li>
              <strong>photospicker.mediaitems.readonly</strong> — read-only
              access to
              <strong
                >only the photos you explicitly select in the Google Photos
                picker</strong
              >, so you can import them into your Photoreka workspace. The
              picker is provided and displayed by Google; Photoreka never sees,
              browses, or has access to the rest of your Google Photos library.
            </li>
            <li>
              <strong>drive.file</strong> — access limited to
              <strong
                >only the individual files you explicitly select in the Google
                Drive picker</strong
              >, so you can import them into your Photoreka workspace. Photoreka
              cannot see, list, or access any other file in your Drive.
            </li>
          </ul>
          <p>
            We do not request access to Gmail, Google Calendar, Google
            Contacts, or any other Google service, and we do not request broad
            library or full-drive scopes. Both import features use Google's own
            picker interfaces specifically so that access is limited to the
            items you choose, one selection at a time.
          </p>
          <p>
            <strong>How we use it.</strong> Account data (email, name, profile
            picture) is used exclusively to create and authenticate your
            account, populate your user profile, and contact you about your
            account. Photos and files you import from Google Photos or Google
            Drive are treated exactly like images you upload directly: a
            reduced, medium-quality copy is stored to power search, curation,
            scoring, and visualization, and the image is analyzed to generate
            tags and scores as described in the Image Processing with AI section
            above. Google user data is never used for advertising, credit, or
            lending purposes.
          </p>
          <p>
            <strong>How we share it.</strong> Google user data is not sold,
            transferred, or disclosed to any third party, except to cloud
            infrastructure providers strictly necessary to operate the Platform
            and bound by data processing agreements, or where required by law.
            We never transfer Google user data to data brokers, advertising
            networks, credit or lending providers, or any party for purposes
            unrelated to providing user-facing features of Photoreka.
          </p>
          <p>
            <strong>AI and machine learning.</strong> Google user data —
            including photos imported from Google Photos or Google Drive and
            any tags, scores, or embeddings derived from them — is never used
            to develop, improve, or train generalized artificial intelligence
            or machine learning models, and is never transferred to any
            third-party service that would use it to train its models. Imported
            photos are analyzed by the AI providers described in the Image
            Processing with AI section above under paid or enterprise plans
            whose terms provide that submitted content is not used for model
            training. This analysis exists solely to deliver the Platform
            features you requested.
          </p>
          <p>
            <strong>Retention and revocation.</strong> Google user data is
            retained only while your Photoreka account is active, and is
            deleted within 30 days of account deletion as described in the Data
            Retention and Deletion section above. You may revoke Photoreka's
            access to your Google account at any time at
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener"
              >myaccount.google.com/permissions</a
            >.
          </p>
          <p>
            <strong>Limited Use disclosure.</strong> Photoreka's use and
            transfer of information received from Google APIs to any other app
            will adhere to the
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener"
              >Google API Services User Data Policy</a
            >, including the Limited Use requirements.
          </p>
        </section>

        <section class="terms-section">
          <h2>10. Sensitive and Personal Images Disclaimer</h2>
          <p>
            Photoreka is intended solely for the management and analysis of
            artistic or documentary photographic bodies of work suitable for
            public or professional presentation. The Platform is
            <strong>not recommended</strong> for the storage or processing of
            sensitive, private, or personal images.
          </p>
          <p>
            Users are strongly advised not to upload images containing personal,
            confidential, or sensitive content. Photoreka expressly disclaims
            any responsibility for potential data breaches or unauthorized
            disclosures of such content. By using Photoreka, you acknowledge
            that the Platform is not liable for any consequences arising from
            the upload of sensitive or personal images.
          </p>
          <p>
            Users are responsible for ensuring that uploaded images comply with
            applicable laws and that they have the necessary rights and
            permissions to process such content through the Platform. Users
            should refrain from uploading content that is illegal or otherwise
            prohibited under applicable law.
          </p>
        </section>

        <section class="terms-section">
          <h2>11. Cookies and Analytics</h2>
          <ul>
            <li>
              Photoreka uses essential cookies required for the Platform to
              function (authentication, session management).
            </li>
            <li>
              We use Google Analytics to understand aggregate usage patterns and
              improve the service. These tools collect anonymized data only and
              are never linked to your images.
            </li>
            <li>
              We do not use advertising cookies or tracking pixels from third
              parties.
            </li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>12. Your Rights (GDPR / CCPA)</h2>
          <p>
            Depending on your jurisdiction, you may have the following rights
            regarding your personal data:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of the personal data we
              hold about you.
            </li>
            <li>
              <strong>Rectification:</strong> Request correction of inaccurate
              or incomplete data.
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal data
              and images.
            </li>
            <li>
              <strong>Portability:</strong> Request your data in a structured,
              machine-readable format.
            </li>
            <li>
              <strong>Restriction:</strong> Request restriction of processing
              under certain circumstances.
            </li>
            <li>
              <strong>Objection:</strong> Object to certain types of data
              processing.
            </li>
            <li>
              <strong>Withdrawal of consent:</strong> Withdraw consent at any
              time where processing is based on consent.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at
            <a href="mailto:hello@photoreka.com">hello@photoreka.com</a>. We
            will respond within 30 days.
          </p>
        </section>

        <section class="terms-section">
          <h2>13. Data Security</h2>
          <ul>
            <li>
              All data is encrypted in transit using TLS and at rest using
              AES-256 encryption.
            </li>
            <li>
              Access to user data is restricted to authorized personnel only, on
              a need-to-know basis.
            </li>
            <li>
              We regularly review and update our security practices to protect
              against unauthorized access, alteration, or destruction.
            </li>
            <li>
              While we take reasonable measures to protect your data, no method
              of electronic storage or transmission is 100% secure. We cannot
              guarantee absolute security.
            </li>
          </ul>
        </section>

        <!-- <section class="terms-section">
          <h2>13. Children's Privacy</h2>
          <p>
            Photoreka is not intended for use by individuals under the age of
            16. We do not knowingly collect personal data from children. If we
            become aware that we have collected data from a child under 16, we
            will take steps to delete it promptly.
          </p>
        </section> -->

        <section class="terms-section">
          <h2>14. Changes to This Policy</h2>
          <p>
            We may update this Privacy &amp; Image Policy from time to time.
            Material changes will be communicated via the Platform or email.
            Your continued use of the Platform after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section class="terms-section">
          <h2>15. Contact</h2>
          <p>
            If you have any questions about this Privacy &amp; Image Policy or
            wish to exercise your data rights, please contact us at
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
useSEO("privacy");

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

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

/* Content */
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
  }

  .terms-section h2 {
    font-size: var(--fs-lg);
  }

  .nav-container {
    padding: 0 16px;
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
}
</style>
