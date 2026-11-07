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
      "Photoreka is an AI app to curate the photos you kept. A first pass, by hand or with a tool like Aftershoot, gets you from a full memory card to your keepers; Photoreka finishes the cull and curates them—a project, a series or years of selects, up to 50,000 photos. Score them on 8 artistic criteria, search them in natural language, find the patterns across your work, explore them in 3D and turn them into sequenced portfolios. Built for street, documentary, artistic, portrait, landscape, and commercial photographers who take their work seriously.",
  },
  {
    question: "How is Photoreka different from Aftershoot, Imagen or Excire?",
    answer:
      "They're built for large volumes of photos. Aftershoot, Imagen, Narrative Select, FilterPixel and Lightroom's Assisted Culling spot the shots that failed—blinks, blur, missed focus—and suggest the strongest frame of each moment. Libraries like Excire, Peakto or Mylio keep everything you shot and find it by keyword, and some add an aesthetic score per photo. Photoreka works on more carefully curated catalogs—the photos you kept—which is what lets it go a level higher: curation and editorial judgment. It scores each photo on 8 artistic criteria—storytelling, originality, message and more—reads it against the rest of your work, and helps you see patterns, build sequences and critique the whole. Many photographers use both: one of them for the first pass, Photoreka for the final cull and the edit. More in <a href='/blog/culling-is-not-editing/' class='lx-inline-link'>Culling Is Not Editing</a>.",
    hasHtml: true,
  },
  {
    question: "Why up to 50,000 photos?",
    answer:
      "Because Photoreka is built for bodies of work, not memory cards. Every photo is read against all the others: originality is measured within your own catalog, and clusters, patterns and gaps emerge from the whole set. Bursts, blinks and near-duplicates would only drown that signal. Up to 50,000 photos leaves room for years of selects—bring the keepers of every shoot, a long-term project or a client archive, and Photoreka shows you what they say together.",
  },
  {
    question: "How much does Photoreka cost? Is there a free version?",
    answer: `There is no subscription. You pay once to analyze a batch of photos, and the price per photo drops as the batch grows: 500 photos cost €9.90, 2,500 cost €36 and 10,000 cost €89. Every package includes tool credits, and photo slots never expire. After the analysis, most tools are free within daily limits, and credits let you use them without limits. <span style='color:var(--lx-accent);font-weight:600;'>New accounts get a free welcome pack of 100 photos and 500 credits, so you can try Photoreka on your own work before paying — <a href='#' style='color:inherit;text-decoration:underline;' onclick='event.preventDefault();window.__goToEarlyAccess && window.__goToEarlyAccess()'>create a free account</a>.</span>`,
    hasHtml: true,
  },
  {
    question: "Does Photoreka work on Windows and Mac?",
    answer:
      "Yes. Photoreka runs in the browser, so it works on Windows, macOS and Linux with nothing to install. You can bring photos from local folders, Google Photos, Google Drive or Dropbox, or straight from your Lightroom Classic catalog with the official plugin for Windows and macOS.",
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
      "Yes. The commercial profile swaps two of the 8 criteria for subject clarity—how cleanly the main subject reads—and commercial intent—how usable a frame is for a brand, catalog, or campaign. Commercial photographers use it to search an archive from a client brief, rank their selects by what's actually sellable, and assemble a client-ready selection, across product, fashion, architecture, lifestyle, and wedding work. A separate commercial demo runs on its own catalog.",
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
  navigateTo("/terms/");
};

// El enlace "create a free account" vive dentro del HTML de una respuesta (v-html),
// así que solo puede llegar aquí a través de window.
onMounted(() => {
  window.__goToEarlyAccess = () => emit("signup");
});

onBeforeUnmount(() => {
  delete window.__goToEarlyAccess;
});
</script>
