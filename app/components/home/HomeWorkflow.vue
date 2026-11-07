<template>
  <!-- Where Photoreka sits in a photographer's workflow: a left-to-right
       track (stacked on phones) whose frame strips thin out stage by stage.
       Only Photoreka's stage is a raised panel. -->
  <section id="workflow" class="lx-section">
    <div class="lx-container">
      <SectionIntro eyebrow="The missing step">
        <template #title>
          Culling apps filter volume. Photoreka reads
          <em class="lx-accent">bodies of work</em>
        </template>
        <p>
          Between the shoot and the finished work there's a step most
          photographers have felt without naming. It used to happen on a table
          or the floor, with the prints spread out to see
          <strong>the work as a whole</strong>.
        </p>
        <p>
          Photoreka is that table for your whole catalog: it reads your keepers
          as one body of work, and that's where <strong>curation</strong>
          begins.
        </p>
      </SectionIntro>

      <ol class="lx-flow">
        <li
          v-for="(stage, index) in stages"
          :key="stage.key"
          v-reveal="index * 90"
          class="lx-flow__stage"
          :class="[`lx-flow__stage--${stage.key}`, { 'is-ours': stage.ours }]"
        >
          <span v-if="stage.ours" class="lx-flow__glow" aria-hidden="true" />

          <h3 class="lx-flow__step">
            <span class="lx-flow__num">{{
              String(index + 1).padStart(2, "0")
            }}</span>
            <span class="lx-flow__name" :class="{ 'lx-accent': stage.ours }">{{
              stage.step
            }}</span>
          </h3>

          <FrameStrip :kind="stage.strip" class="lx-flow__frames" />

          <p class="lx-flow__title">{{ stage.title }}</p>
          <p class="lx-flow__meta">{{ stage.meta }}</p>
          <p class="lx-flow__text">{{ stage.text }}</p>

          <ul
            v-if="stage.tools"
            class="lx-flow__tools"
            :aria-label="stage.toolsLabel"
          >
            <li
              v-for="tool in stage.tools"
              :key="tool.name"
              :class="{
                'is-wordmark': tool.wordmark,
                'is-mark': tool.mark,
                'is-brand': tool.brand,
              }"
            >
              <AppLogo
                v-if="tool.brand"
                layout="horizontal"
                :height="22"
                class="lx-flow__brand"
              />
              <component
                :is="tool.icon"
                v-else-if="tool.icon"
                class="lx-flow__tool-icon"
                aria-hidden="true"
              />
              <img
                v-else
                :src="tool.logo"
                :alt="tool.wordmark || tool.mark ? tool.name : ''"
                :width="tool.wordmark || tool.mark ? null : 16"
                :height="tool.wordmark || tool.mark ? null : 16"
                loading="lazy"
                :class="{ 'is-mono': tool.mono }"
              />
              <template v-if="!tool.wordmark && !tool.mark && !tool.brand">{{
                tool.name
              }}</template>
            </li>
          </ul>
        </li>
      </ol>

      <p v-reveal class="lx-flow__note">
        Libraries like Lightroom, Excire, Peakto or Mylio are built to keep and
        find everything you shot. Photoreka is built for the photos you kept—up
        to <strong>50,000</strong> of them—because it reads every photo against
        all the others: originality, patterns and gaps only show up in a body of
        work, not in a memory card.
      </p>
    </div>
  </section>
</template>

<script setup>
import { BookOutline, HandLeftOutline, PersonOutline } from "@vicons/ionicons5";

const stages = [
  {
    key: "shoot",
    step: "Shoot",
    title: "The fieldwork",
    meta: "Thousands per session",
    text: "Bursts, near-misses and repeats. A memory card keeps everything, even what you'll never show.",
    strip: "raw",
    toolsLabel: "Cameras",
    tools: [
      {
        name: "Canon",
        logo: "/logos/cameras/canon.svg",
        mono: true,
        wordmark: true,
      },
      {
        name: "Nikon",
        logo: "/logos/cameras/nikon.svg",
        mono: true,
        wordmark: true,
      },
      {
        name: "Sony",
        logo: "/logos/cameras/sony.svg",
        mono: true,
        wordmark: true,
      },
      {
        name: "Fujifilm",
        logo: "/logos/cameras/fujifilm.svg",
        mono: true,
        wordmark: true,
      },
      { name: "Leica", logo: "/logos/cameras/leica-red.svg", mark: true },
      { name: "iPhone", logo: "/logos/cameras/apple.svg", mono: true },
    ],
  },
  {
    key: "filter",
    step: "Filter",
    title: "The technical first pass",
    meta: "The ones that make the cut",
    text: "Clear failures out: blinks, blur, duplicates. The best of each burst kept.",
    strip: "filtered",
    toolsLabel: "Ways to filter a shoot",
    tools: [
      { name: "By hand", icon: HandLeftOutline },
      { name: "Aftershoot", logo: "/logos/aftershoot.webp" },
      { name: "Imagen", logo: "/logos/imagen.webp" },
      {
        name: "Narrative Select",
        logo: "/logos/narrative_select.webp",
        mono: true,
      },
      // { name: "FilterPixel", logo: "/logos/filterpixel.svg" },
    ],
  },
  {
    key: "edit",
    ours: true,
    step: "Curate",
    title: "The editorial overview",
    meta: "Your body of work",
    text: "Where your catalog is read as a whole: its patterns understood, every photo critiqued, the work curated.",
    strip: "scored",
    toolsLabel: "AI curation tool",
    tools: [{ name: "Photoreka", brand: true }],
  },
  {
    key: "show",
    step: "Show",
    title: "The showcase",
    meta: "The few that matter",
    text: "A portfolio, a photobook, an exhibition, a contest entry or a client selection—chosen, and in order.",
    strip: "final",
    toolsLabel: "Where photographers publish their work",
    tools: [
      { name: "Instagram", logo: "/logos/instagram.webp" },
      { name: "Flickr", logo: "/logos/flickr.svg" },
      { name: "Your client", icon: PersonOutline },
      { name: "A photobook", icon: BookOutline },
      // { name: "Pixieset", logo: "/logos/pixieset.webp", mono: true },
    ],
  },
];
</script>

<style scoped>
.lx-flow {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns:
    minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.45fr)
    minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

/* Every stage shares the track's rows (number, strip, title, meta, text,
   tools), so the tool chips start at the same height in every column. */
.lx-flow__stage {
  position: relative;
  display: grid;
  grid-row: span 6;
  grid-template-rows: subgrid;
  row-gap: 0;
  padding: 30px 18px 0 4px;
}

/* Photoreka's stage: the only raised surface on the track. */
.lx-flow__stage.is-ours {
  padding: 30px 30px 32px;
  overflow: hidden;
  isolation: isolate;
  border-radius: 24px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--lx-accent) 9%, var(--lx-surface)) 0%,
    var(--lx-surface) 60%
  );
  border: 1px solid color-mix(in srgb, var(--lx-accent) 35%, var(--lx-line-2));
  box-shadow: var(--lx-shadow-md), var(--lx-highlight);
}

.lx-flow__glow {
  position: absolute;
  top: -90px;
  right: -60px;
  z-index: -1;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: var(--lx-accent);
  filter: blur(80px);
  opacity: 0.18;
  pointer-events: none;
}

/* ---------- Frame strips ---------- */

.lx-flow__frames {
  /* Three rows of 8px frames: the tallest strip (the shoot) above 640px. */
  height: 32px;
  margin-bottom: 1.4rem;
}

/* With the four stages in one row, each strip waits for the previous one,
   so the frames read as flowing left to right through the phases. */
@media (min-width: 1081px) {
  .lx-flow__stage--shoot .lx-flow__frames {
    --lx-frames-start: 450ms;
  }

  .lx-flow__stage--filter .lx-flow__frames {
    --lx-frames-start: 1000ms;
  }

  .lx-flow__stage--edit .lx-flow__frames {
    --lx-frames-start: 1550ms;
  }

  .lx-flow__stage--show .lx-flow__frames {
    --lx-frames-start: 2100ms;
  }
}

/* ---------- Copy ---------- */

.lx-flow__step {
  margin: 0 0 1.3rem;
  font-weight: inherit;
}

/* The rule after each number chains into the next column, drawing the
   track across the row. */
.lx-flow__num {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.7rem;
  font-family: var(--lx-font-sans);
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.2em;
  font-variant-numeric: tabular-nums;
  color: var(--lx-text-2);
}

.lx-flow__num::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--lx-line-2);
}

.is-ours .lx-flow__num {
  color: var(--lx-accent);
}

.lx-flow__name {
  display: block;
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: var(--lx-fs-h3);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.lx-flow__name.lx-accent {
  font-weight: 300;
}

.lx-flow__title {
  margin: 0;
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.15rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--lx-text);
}

/* Styled like the stage number: a count that captions the strip, not prose. */
.lx-flow__meta {
  margin-top: 0.55rem;
  font-family: var(--lx-font-sans);
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--lx-text-2);
}

.is-ours .lx-flow__meta {
  color: var(--lx-accent);
}

.lx-flow__text {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--lx-text-2);
  text-wrap: pretty;
}

.lx-flow__tools {
  list-style: none;
  margin: 1.1rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.lx-flow__tools li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.28rem 0.65rem 0.28rem 0.4rem;
  border-radius: 999px;
  font-size: var(--lx-fs-xs);
  line-height: 1.3;
  color: var(--lx-text-2);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface);
}

.lx-flow__tools img,
.lx-flow__tools .lx-flow__tool-icon {
  flex: none;
  width: 16px;
  height: 16px;
  object-fit: contain;
  border-radius: 4px;
}

/* Camera wordmarks spell the name themselves: logo only, at cap height, with
   the padding making up the 16px a square logo would take. */
.lx-flow__tools li.is-wordmark {
  padding: calc(0.28rem + 2.5px) 0.65rem;
}

.lx-flow__tools li.is-wordmark img {
  width: auto;
  height: 11px;
  border-radius: 0;
}

/* Leica's red dot carries the name too, but needs more height to read. */
.lx-flow__tools li.is-mark {
  padding: calc(0.28rem - 1px) 0.5rem;
}

.lx-flow__tools li.is-mark img {
  width: 18px;
  height: 18px;
  border-radius: 0;
}

/* The wordmark in Photoreka's logo is small: a taller logo, less padding,
   same chip height. */
.lx-flow__tools li.is-brand {
  padding: calc(0.28rem - 3px) 0.65rem;
}

.lx-flow__tools .lx-flow__brand {
  opacity: 1;
}

/* AppLogo forces 35px on phones; a chip keeps its own height. */
.lx-flow__tools :deep(.logo-image) {
  height: 22px !important;
}

/* Narrative's mark is black on transparent: it would vanish on the dark theme. */
.lx-flow__tools img.is-mono {
  filter: invert(1);
}

[data-theme="light"] .lx-flow__tools img.is-mono {
  filter: none;
}

.lx-flow__note {
  max-width: 760px;
  margin-top: clamp(48px, 6vw, 72px);
  padding-left: 1.2rem;
  border-left: 2px solid var(--lx-line-3);
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--lx-text-2);
}

.lx-flow__note strong {
  color: var(--lx-text);
}

/* ---------- Responsive ---------- */

@media (max-width: 1080px) {
  .lx-flow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 16px;
  }
}

/* Phones: a vertical track, Photoreka's panel breaking out of it. */
@media (max-width: 640px) {
  .lx-flow {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .lx-flow__stage {
    padding: 0 0 36px 22px;
    border-left: 1px solid var(--lx-line-2);
  }

  .lx-flow__stage.is-ours {
    margin: 0 0 36px;
    padding: 26px 22px 28px;
    border-left: 1px solid
      color-mix(in srgb, var(--lx-accent) 35%, var(--lx-line-2));
  }

  .lx-flow__stage--show {
    padding-bottom: 0;
  }

  .lx-flow__num::after {
    display: none;
  }

  .lx-flow__frames {
    height: auto;
    margin-bottom: 1.1rem;
  }
}
</style>
