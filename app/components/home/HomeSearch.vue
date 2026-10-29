<template>
  <MediaSplitSection
    id="ai_search"
    eyebrow="AI Photo Search"
    video="/videos/Search.mp4"
    poster="/home/video_poster.jpg"
    alt="Photoreka AI photo search by natural language"
    label="Photoreka — Search"
    learn-more-to="/ai_photo_search"
    @demo="goToDemo"
  >
    <template #title>
      Find any photo by <em class="lx-accent">describing it</em>
    </template>
    <p>
      Type what you remember and Photoreka finds it — no tagging, no folders.
      Three modes: <strong>Broad</strong> for open exploration,
      <strong>Adaptive</strong> for metaphorical and cultural references,
      <strong>Precise</strong> for conditions that need to be verified, not
      just approximated.
    </p>
  </MediaSplitSection>
</template>

<script setup>
import { trackUserAction } from "~/utils/analytics";

const goToDemo = () => {
  trackUserAction("navigate_to_search_demo", "landing_page_premium");
  window.open("https://app.photoreka.com/demo/search", "_blank");
};
</script>
