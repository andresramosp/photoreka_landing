<template>
  <MediaSplitSection
    id="canvas"
    eyebrow="Interactive Canvas"
    video="/videos/canvas_desktop.mp4"
    mobile-video="/videos/canvas_mobile.mp4"
    alt="Photoreka infinite canvas clustering photos automatically"
    label="Photoreka — Canvas"
    learn-more-to="/ai_photo_storyboard"
    reverse
    @demo="goToDemo"
  >
    <template #title>
      Storyboard on an <em class="lx-accent">infinite canvas</em>
    </template>
    <p>
      Drag, arrange and sequence your photos freely, or let Photoreka
      <strong>cluster</strong> them automatically by
      <strong>narrative</strong>, <strong>color</strong>,
      <strong>score</strong> and more. Drop any image to surface similar shots
      from your archive, while a chat docked to the board tells you what the
      sequence is missing.
    </p>
  </MediaSplitSection>
</template>

<script setup>
import { trackUserAction } from "~/utils/analytics";

const goToDemo = () => {
  trackUserAction("navigate_to_canvas_demo", "landing_page_premium");
  window.open("https://app.photoreka.com/demo/canvas", "_blank");
};
</script>
