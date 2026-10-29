<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav
          source="framer_page"
          :links="[{ label: 'Features', target: 'features' }]"
        />

        <PageHero>
          <template #title>
            Frame
            <em class="lx-accent">your photos beautifully</em>
            - all at once
          </template>
          <p>
            Tired of framing photos one by one? Free Framer handles unlimited
            batch processing. Upload dozens or hundreds of photos, apply
            professional frames to all of them instantly, and export in bulk.
            No limits. No watermarks. Completely free.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToFreeTool">
              Launch Free Framer
            </LxButton>
            <span class="lx-status">No signup required</span>
          </template>
          <template #visual>
            <ShotFrame
              src="/home/free_framer.png"
              alt="Free Framer interface preview"
              label="Photoreka — Free Framer"
              ratio="16 / 9"
              loading="eager"
            />
          </template>
        </PageHero>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Stop framing photos <em class="lx-accent">one by one</em>
              </template>
              <p>
                Process hundreds of photos at once, not one at a time. The only
                free tool with truly unlimited batch processing.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <PageCta>
          <template #title>
            Stop wasting time on
            <em class="lx-accent">one photo at a time</em>
          </template>
          <p>
            Frame your entire photo collection in minutes, not hours. Upload as
            many photos as you want, apply professional frames in bulk, and
            export everything at once. Zero limits. Zero cost.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToFreeTool">
              Launch Free Framer Now
            </LxButton>
          </template>
          <template #links>
            Want more powerful tools?
            <a @click="goToHome">Explore Photoreka's full platform</a>
          </template>
        </PageCta>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { markRaw } from "vue";
import {
  StopOutline,
  ColorPaletteOutline,
  ImagesOutline,
  DownloadOutline,
  ResizeOutline,
  ShareSocialOutline,
  BriefcaseOutline,
  LogoInstagram,
  BookOutline,
  SpeedometerOutline,
} from "@vicons/ionicons5";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("framer");

// Inject inline script to prevent FOUC
useHead({
  script: [
    {
      children: `(function(){try{const t=localStorage.getItem('photoreka-theme-mode')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
      tagPosition: "head",
      type: "text/javascript",
    },
  ],
});

const {
  naiveTheme: currentTheme,
  naiveThemeOverrides: themeOverrides,
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

// Features data
const features = [
  {
    icon: markRaw(ImagesOutline),
    title: "Unlimited Batch Processing",
    description:
      "Upload 10, 50, or 500 photos — no limits. Apply frames to all of them at once and export in bulk. What takes hours in other tools takes seconds here. Completely free with zero restrictions.",
    color: "#22c55e",
  },
  {
    icon: markRaw(StopOutline),
    title: "Multiple Frame Styles",
    description:
      "Choose from classic borders, modern minimalist frames, polaroid style, and more. Each style is designed to enhance your photos.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(ColorPaletteOutline),
    title: "Custom Colors",
    description:
      "Pick any color for your frames to match your brand or aesthetic. Full color picker with presets and recent colors.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(ResizeOutline),
    title: "Flexible Sizing",
    description:
      "Adjust frame width, padding, and aspect ratios. Create exactly the look you want with precise controls.",
    color: "#2563eb",
  },
  {
    icon: markRaw(DownloadOutline),
    title: "High Quality Export",
    description:
      "Download your framed photos in full resolution. Supports JPEG and PNG formats with quality settings.",
    color: "#ec4899",
  },
  {
    icon: markRaw(SpeedometerOutline),
    title: "Instant Preview",
    description:
      "See changes in real-time as you adjust frame styles and colors. No waiting, no rendering delays.",
    color: "#06b6d4",
  },
];

// Not rendered at the moment; kept for when these sections come back.
// Steps data
const steps = ref([
  {
    title: "Upload Your Photos",
    description:
      "Click to upload or drag and drop your images. Supports all common image formats including JPEG, PNG, and TIFF.",
  },
  {
    title: "Choose Frame Style",
    description:
      "Browse through our collection of frame styles. From minimal borders to artistic frames, find the perfect match.",
  },
  {
    title: "Customize & Adjust",
    description:
      "Pick colors, adjust sizes, and fine-tune the look. See changes instantly with our real-time preview.",
  },
  {
    title: "Download & Share",
    description:
      "Export your framed photos in high quality. Download individually or as a batch — ready to share anywhere.",
  },
]);

// Use cases data
const usecases = ref([
  {
    icon: markRaw(LogoInstagram),
    title: "Social Media",
    description:
      "Create eye-catching posts for Instagram, Facebook, and other platforms. Frames make your photos stand out.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
  },
  {
    icon: markRaw(BriefcaseOutline),
    title: "Portfolio",
    description:
      "Present your work professionally. Add consistent frames to your portfolio images for a cohesive look.",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
  },
  {
    icon: markRaw(BookOutline),
    title: "Photo Books",
    description:
      "Prepare photos for printing in albums and books. Frames add a polished, finished appearance.",
    gradient: "linear-gradient(135deg, #2563eb 0%, #0284c7 100%)",
  },
  {
    icon: markRaw(ShareSocialOutline),
    title: "Presentations",
    description:
      "Enhance slides and presentations with framed photos. Professional frames elevate your visual storytelling.",
    gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  },
]);

// Gallery items
const galleryItems = ref([
  {
    image: "/home/free_framer.png",
    alt: "Classic frame example",
    label: "Classic Border",
  },
  {
    image: "/home/free_framer.png",
    alt: "Modern frame example",
    label: "Modern Minimal",
  },
  {
    image: "/home/free_framer.png",
    alt: "Polaroid style frame",
    label: "Polaroid Style",
  },
  {
    image: "/home/free_framer.png",
    alt: "Custom color frame",
    label: "Custom Colors",
  },
]);

// FAQs data
const faqs = ref([
  {
    question: "Is Free Framer really free?",
    answer:
      "Yes, completely free. No hidden costs, no subscriptions, no account required. All features are available to everyone at no charge.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed. Simply visit the tool, upload your photos, and start framing. Your work is private and stays in your browser.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "Free Framer supports all common image formats including JPEG, PNG, TIFF, WebP, and more. Upload photos from any camera or device.",
  },
  {
    question: "Can I use framed photos commercially?",
    answer:
      "Yes. The frames we add don't impose any copyright. You retain all rights to your photos and can use them for any purpose, including commercial projects.",
  },
  {
    question: "How many photos can I frame at once?",
    answer:
      "There's no limit. Upload 10, 50, 100, or even 500 photos at once. Unlike other tools that charge for batch processing or limit you to a handful of images, Free Framer handles unlimited bulk framing completely free. For optimal performance, we process them efficiently in batches, but you can queue as many as you need.",
  },
  {
    question: "Are my photos stored on your servers?",
    answer:
      "No. All processing happens in your browser. Your photos are never uploaded to our servers. Once you close the page, everything is cleared from memory.",
  },
  {
    question: "Can I undo changes?",
    answer:
      "Yes. You can undo frame applications and revert to the original image at any time before downloading.",
  },
  {
    question:
      "Why is batch processing free here when other tools charge for it?",
    answer:
      "Most photo framing tools limit batch processing to paid plans because it's a premium feature. We believe photographers shouldn't have to pay or waste time editing photos one by one. Free Framer is built to handle bulk operations efficiently, and we're keeping it completely free for everyone.",
  },
  {
    question: "What quality are the exported images?",
    answer:
      "Exported images maintain the original photo quality. You can download in full resolution with your choice of JPEG or PNG format.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

// Navigation methods
const goToHome = () => {
  trackUserAction("navigate_to_home", "framer_page");
  navigateTo("/");
};

const goToFreeTool = () => {
  trackUserAction("navigate_to_free_tool", "framer_page", "framer");
  const toolUrl = `${config.public.appUrl}/free-framer`;
  window.open(toolUrl, "_blank");
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();

  trackEvent("page_view", {
    page: "framer",
    page_title: "Free Framer - Professional Photo Frames",
  });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>
