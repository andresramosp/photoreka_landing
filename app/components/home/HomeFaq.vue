<template>
  <FaqSection :faqs="faqs" @toggle="onToggle">
    <template #title>
      Frequently asked questions
      <em class="lx-accent">about Photoreka</em>
    </template>
    <p>
      Everything you need to know about using AI to curate and organize your
      photos
    </p>
    <template #answer="{ faq }">
      <p v-if="faq.hasHtml" v-html="faq.answer"></p>
      <p v-else-if="!faq.hasLink">{{ faq.answer }}</p>
      <p v-else>
        {{ faq.answer.split("Terms and Image Policy")[0] }}
        <a @click="goToTerms" class="lx-inline-link">Terms and Image Policy</a>
        {{
          faq.answer
            .split("Terms and Image Policy")
            .slice(1)
            .join("Terms and Image Policy")
        }}
      </p>
    </template>
  </FaqSection>
</template>

<script setup>
import { trackEvent, trackUserAction } from "~/utils/analytics";

const emit = defineEmits(["signup"]);

const faqs = [
  {
    question: "What is Photoreka and who is it for?",
    answer:
      "Photoreka is an AI-powered app to curate and organize your photos. Upload a specific project, a curated selection, or a significant portion of your archive—then search in natural language, score and rank your images, find patterns across your work, and explore your catalog in 3D. Built for street, documentary, artistic, portrait, landscape, and commercial photographers who take their work seriously.",
  },
  {
    question: "How does Photoreka organize and curate photos with AI?",
    answer:
      "Photoreka uses computer vision AI to analyze your photographs, identifying narrative and stylistic elements. This enables intelligent organization, advanced semantic search by natural language, automatic photo scoring and ranking, 3D catalog visualization, and AI-assisted portfolio curation—all without manual tagging. For detailed information on our image processing policies, please see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Does Photoreka work for commercial and product photography?",
    answer:
      "Yes. Alongside the artistic dimensions, commercial mode activates two extra scores: subject clarity—how cleanly the main subject reads—and commercial intent—how usable a frame is for a brand, catalog, or campaign. Commercial photographers use it to search an archive from a client brief, rank a shoot by what's actually sellable, and assemble a client-ready selection, across product, fashion, architecture, lifestyle, and wedding work. A separate commercial demo runs on its own catalog.",
  },
  {
    question: "Is Photoreka a storage platform?",
    answer:
      "Photoreka is an AI photo curation and organization tool, not a storage service. It focuses on helping you understand, search, score, and curate your photo library. It works alongside your existing storage—Lightroom Classic, Google Photos, Dropbox, or local files. For details about how we handle your images, see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Does Photoreka create or transform images?",
    answer:
      "No. Photoreka is dedicated exclusively to the analysis, organization, and curation of your photographic images. The platform does not generate synthetic images, alter, or transform your photos in any way. We do not support or endorse the creation or use of synthetic or manipulated images within Photoreka.",
  },
  {
    question: "What happens to my photos and who can see them?",
    answer:
      "We only store a reduced version of your images on secure servers—sufficient to facilitate searches and for common social media uses, but not for any other purpose. The analysis is performed using proprietary and third-party services under agreements that prevent retaining or reusing your photos. They are not shared with anyone and you always retain 100% of the rights to your work. For complete details, please read our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "What kind of photo catalog works best with Photoreka?",
    answer:
      "Photoreka is built for photographers who want to work with a curated body of work—not a raw dump of every file ever captured. Think of it as a studio, not a warehouse. The sweet spot is a catalog of up to 20,000 photos; up to 50,000 is workable but we recommend keeping it focused. Because the AI tools are built around curation—semantic search, visual clusters, scoring, sequencing—they work best when your archive already has a baseline of intentionality.",
  },
  {
    question: "Can I try Photoreka for free?",
    answer: `Analyzing your photos requires a single batch payment. Afterward, you can use most tools for free, with some daily/total limits, or purchase credits to work unlimitedly. <span style='color:var(--lx-accent);font-weight:600;'>During the <a href='#' style='color:inherit;text-decoration:underline;' onclick='event.preventDefault();window.__goToEarlyAccess && window.__goToEarlyAccess()'>early access</a> phase, a free photo package and usage credits will be offered.</span>`,
    hasHtml: true,
  },
];

const onToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    faq_index: index,
    action: isOpen ? "open" : "close",
    question: faqs[index]?.question?.substring(0, 50) + "..." || `FAQ ${index}`,
  });
};

const goToTerms = () => {
  trackUserAction("navigate_to_terms", "landing_page_premium");
  navigateTo("/terms");
};

// El enlace "early access" vive dentro del HTML de una respuesta (v-html),
// así que solo puede llegar aquí a través de window.
onMounted(() => {
  window.__goToEarlyAccess = () => emit("signup");
});

onBeforeUnmount(() => {
  delete window.__goToEarlyAccess;
});
</script>
