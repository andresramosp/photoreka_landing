/**
 * Contenido del blog (data-driven, sin CMS externo).
 * Cada post es un objeto en `blogPosts`. El layout vive en
 * app/pages/blog/index.vue (listado) y app/pages/blog/[slug].vue (artículo),
 * que renderizan `content` genéricamente según el `type` de cada bloque.
 */

export interface BlogAuthor {
  name: string;
  role?: string;
}

export type BlogBlock =
  | { type: "p"; html: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | {
      type: "image";
      alt: string;
      caption?: string;
      src?: string;
      placeholder?: boolean;
      ratio?: string;
    }
  | {
      type: "callout";
      variant?: "info" | "tip" | "warning";
      title?: string;
      html: string;
    }
  | {
      type: "cta";
      eyebrow?: string;
      title: string;
      text?: string;
      buttonLabel: string;
      action: "demo" | "signup" | "link";
      href?: string;
    };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  keywords?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  coverPlaceholder?: boolean;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  author: BlogAuthor;
  toc?: boolean;
  hidden?: boolean;
  content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "peakto-alternative-windows",
    title:
      "Looking for Peakto on Windows? Photoreka vs Peakto for AI Photo Curation",
    excerpt:
      "Peakto is one of the most interesting AI photo organizers of the last few years — and it's Mac-only, subscription-priced. An honest comparison for photographers who want AI-powered organization and curation on Windows, Linux, or simply without a monthly fee.",
    description:
      "An honest comparison of Photoreka and Peakto (CYME): platform support, pricing model, AI search depth, aesthetic scoring, and curation tools. For photographers looking for a Peakto alternative on Windows or without a subscription.",
    keywords:
      "peakto alternative, peakto windows, peakto alternative windows, photoreka vs peakto, cyme peakto alternative, ai photo organizer windows, photo curation software windows, peakto vs, ai photo organizer without subscription, excire foto alternative",
    category: "Comparisons",
    tags: ["Comparisons", "Peakto", "AI Photo Organizer", "Photo Curation"],
    coverImage: "/blog/photoreka_vs_peakto.png",
    publishedAt: "2026-07-10",
    readingMinutes: 7,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Let's start with credit where it's due: <strong>Peakto</strong>, by French developer CYME, is one of the most genuinely interesting photo tools of the last few years. It pioneered an idea we deeply agree with — that photographers don't need another place to <em>store</em> photos, they need an intelligence layer that understands the photos they already have. If you're reading this, you've probably seen Peakto's AI-sorted Panorama view or its aesthetic scoring and thought: <em>this is what my archive needs</em>.",
      },
      {
        type: "p",
        html: "And then you hit one of two walls. Either you opened the download page and found it's <strong>Mac-only</strong>, or you looked at the <strong>subscription pricing</strong> and did the multi-year math. This article is for photographers who want what Peakto promises — AI-powered organization and curation on top of an existing library — but on Windows, on Linux, or simply without a monthly fee.",
      },
      {
        type: "h2",
        text: "What Peakto Does Well",
        id: "what-peakto-does-well",
      },
      {
        type: "p",
        html: "An honest comparison starts here. Peakto's core strength is being a <strong>meta-catalog for the Mac ecosystem</strong>: it indexes Apple Photos, Lightroom Classic, Capture One, Luminar, DxO PhotoLab, and plain folders into one searchable view — without moving or duplicating your originals. If your library is scattered across three or more Mac apps accumulated over a decade, Peakto is genuinely the only tool built to unify them in place. It also processes everything locally, handles video alongside stills, and its AI-generated albums and aesthetic scores are solid.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Who should just buy Peakto",
        html: "If you're a Mac user whose main pain is <em>fragmentation</em> — photos split across Apple Photos, Lightroom, and Capture One catalogs — and you want a local desktop app that unifies them, Peakto is a good choice and we're happy to say so. The rest of this article is about a different problem.",
      },
      {
        type: "h2",
        text: "Where the Walls Are",
        id: "where-the-walls-are",
      },
      {
        type: "list",
        items: [
          "Mac-only. There is no Windows or Linux version, and none has been announced. Roughly two out of three photographers edit on Windows.",
          "Subscription-priced. The intelligence layer over your own archive stops working the month you stop paying.",
          "Organization-first, curation-second. Peakto excels at unifying and finding, but it is not built around the next step: scoring a body of work across artistic dimensions, sequencing a portfolio, or interrogating your archive in conversation.",
          "Single-mode AI search. Search is associative — great for 'show me something like this', with no way to enforce precise, verifiable conditions.",
        ],
      },
      {
        type: "h2",
        text: "Photoreka's Different Starting Point",
        id: "photorekas-different-starting-point",
      },
      {
        type: "p",
        html: "Photoreka shares Peakto's founding conviction — <strong>your files stay where they are; the intelligence comes to them</strong> — but makes three structurally different choices.<br /><br /><strong>1. Web-based, so platform stops mattering.</strong> Photoreka runs in the browser on Windows, Mac, and Linux. It connects to Lightroom Classic (via an official plugin), Google Photos, Dropbox, and local files. Analysis runs in the cloud from compressed previews; your full-resolution originals never leave your machine.<br /><br /><strong>2. Pay per batch, not per month.</strong> You pay once to analyze a set of photos. The resulting organization — tags, scores, embeddings, maps — is yours; there's no monthly fee to keep accessing it.<br /><br /><strong>3. Curation is the destination, not a feature.</strong> Organizing is step one. Photoreka is built for what comes after: choosing, ranking, and sequencing the work that matters.",
      },
      {
        type: "quote",
        text: "An organizer answers 'where is it?'. A curation tool answers 'which ones — and in what order?'. Most archives are stuck on the first question when the second one is the one that pays.",
      },
      {
        type: "h2",
        text: "Feature by Feature",
        id: "feature-by-feature",
      },
      {
        type: "h3",
        text: "AI Search",
        id: "ai-search",
      },
      {
        type: "p",
        html: "Both tools offer semantic search over untagged photos. Peakto's is single-mode and associative. Photoreka offers <a href='/ai_photo_search'>three explicit modes</a>: <strong>Broad</strong> (pure embedding similarity, for moods and styles), <strong>Adaptive</strong> (expands cultural references like 'Blade Runner-inspired' into their implicit visual vocabulary), and <strong>Precise</strong> (a logical inference layer that <em>verifies</em> each result against your conditions — 'exactly three people, one looking away' means exactly that). There is no query length limit, unlike CLIP-based tools that silently truncate long descriptions at ~77 tokens.",
      },
      {
        type: "h3",
        text: "Scoring and Aesthetic Analysis",
        id: "scoring-and-aesthetic-analysis",
      },
      {
        type: "p",
        html: "Peakto computes an aesthetic score that blends aesthetics, composition, and technique into a global number used by its Panorama view. Photoreka's <a href='/photo_scoring'>scoring</a> keeps the dimensions separate — aesthetics, composition, narrative strength, originality, visual games, humor, candidness, plus subject clarity and commercial intent for commercial work — so you can rank the same catalog differently for a gallery submission than for a stock pitch.",
      },
      {
        type: "h3",
        text: "Beyond Organization",
        id: "beyond-organization",
      },
      {
        type: "p",
        html: "This is where the two products stop overlapping. Photoreka includes a <a href='/photography_portfolio_builder'>portfolio builder</a> that selects and sequences 10–40 images under coherence constraints (visual, chromatic, narrative), a <a href='/photo_chat'>conversational assistant</a> that can critique your portfolio and track your evolution over time, <a href='/photo_reports'>style and pattern reports</a>, and a <a href='/photo_3D_atlas'>2D/3D atlas</a> that renders the entire archive as a navigable space. Peakto's Panorama offers a taste of that spatial idea; the Atlas is built around it.",
      },
      {
        type: "h3",
        text: "Where Peakto Still Wins",
        id: "where-peakto-still-wins",
      },
      {
        type: "p",
        html: "Fairness requires this section. Peakto indexes <em>more Mac apps</em> (Apple Photos, Capture One, Luminar, DxO) than Photoreka connects to. It handles video; Photoreka is photography-only. It processes everything locally, which matters if cloud analysis is a hard no for you. And as a native desktop app, it can watch folders continuously rather than working in analysis batches.",
      },
      {
        type: "h2",
        text: "The Short Version",
        id: "the-short-version",
      },
      {
        type: "list",
        items: [
          "Choose Peakto if: you're Mac-only, your problem is fragmentation across Apple Photos / Capture One / Luminar catalogs, you need video support, or local-only processing is non-negotiable.",
          "Choose Photoreka if: you're on Windows or Linux (or move between machines), you'd rather pay per photo batch than per month, or your real goal isn't just organizing the archive — it's curating it: scoring, selecting, sequencing, and understanding a body of work.",
        ],
      },
      {
        type: "cta",
        eyebrow: "See it on your own archive",
        title: "Try Photoreka's demo — no Mac required",
        text: "Search, scores, and the 3D Atlas on a real catalog, straight from the browser.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
      {
        type: "p",
        html: "One last note on philosophy: we think CYME is right that the future of photo management is an intelligence layer over storage you already own. The disagreement is about where that layer should live (any browser, not one OS), how it should be paid for (once per analysis, not forever), and what it should ultimately be for. Organization is the floor. <strong>Curation is the point.</strong>",
      },
    ],
  },
  {
    slug: "catalog-3d-universe-not-a-grid",
    title:
      "Your Catalog Is a Universe, Not a Grid: The Case for the 2D/3D Atlas",
    excerpt:
      "Grids and folders show you fifty photos at a time, ordered by filename. Your catalog isn't a list — it has shape, density, and gaps that no scrollbar can reveal. On why nothing else renders an entire archive as a navigable space, and what happens when you finally see your work from the outside.",
    description:
      "An essay on why grid views and infinite scroll fail large photo catalogs, how the 2D and 3D Atlas map an entire archive by visual similarity using AI embeddings and UMAP, and why no existing photo tool offers a navigable view of a whole body of work.",
    keywords:
      "3d atlas, 2d atlas, photo catalog visualization, umap photography, ai photo clustering, catalog map, photo organization software, visual similarity clustering, photography portfolio tool",
    category: "Curation Philosophy",
    tags: ["3D Atlas", "2D Atlas", "Photo Organization", "Data Visualization"],
    coverImage: "/atlas/2d.png",
    publishedAt: "2026-07-04",
    readingMinutes: 8,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Open almost any photo tool and the interface makes the same quiet assumption: your catalog is a list. A very long list, paginated or infinite-scrolled, but structurally no different from a spreadsheet — fifty thumbnails per screen, click, fifty more. That's an interface built for one job: retrieval. Find the file, open the file. It was never built for the other job a serious archive eventually demands of you — understanding what you've actually made — and a scrollbar, no matter how smooth, cannot do that job for you.",
      },
      {
        type: "h2",
        text: "The Scrollbar Was Never a View",
        id: "the-scrollbar-was-never-a-view",
      },
      {
        type: "p",
        html: "Scroll far enough through five thousand photos and you stop seeing individual images — you start seeing a blur of near-identical thumbnails, punctuated by the occasional one that catches your eye by accident. Whatever sits next to whatever in that scroll is decided by filename or import date, not by anything about the photographs themselves. Photo #412 and photo #4,891 might be the two most visually related frames in your entire career — same light, same gesture, same quiet mood shot four years apart — and the interface will never once put them side by side, because a list has no concept of 'side by side' beyond the order you loaded it in.",
      },
      {
        type: "p",
        html: "This is the same failure as the folder, just wearing different clothes. A folder forces you to decide a category before you can find anything in it. A grid forces you to decide an order — usually chronological — before you can look at anything in it. Both flatten a catalog that is, in reality, not linear at all. A body of work has shape: dense regions where you keep returning to the same kind of image, sparse regions you've barely touched, clusters that turn out to be more connected to each other than you'd have guessed. None of that shape survives being poured into a list.",
      },
      {
        type: "h2",
        text: "A Catalog Is a Space, Not a List",
        id: "a-catalog-is-a-space",
      },
      {
        type: "p",
        html: "The Atlas — available in both 2D and 3D — starts from a different premise: don't flatten the catalog, map it. Every photograph is run through computer vision to extract a high-dimensional embedding, a numerical description of what it visually is: composition, color palette, subject matter, lighting, mood. That embedding is then projected down into two or three dimensions with UMAP (Uniform Manifold Approximation and Projection), a dimensionality-reduction technique built specifically to preserve relationships during the drop: images that are visually alike end up near each other in the final space, images that are unalike end up far apart.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why it looks like a satellite photo",
        html: "Open the 2D Atlas and the resemblance to a night-time satellite image isn't a stylistic choice — it's an honest visualization. Bright, dense patches are regions where your camera keeps returning to the same kind of frame: same light, same subject, same visual language, shot again and again until it forms a landmass. The dark space between those patches is real too. It isn't a rendering gap — it's the visual territory you simply haven't photographed, an accurate map of the gaps in a body of work, not just its concentrations.",
      },
      {
        type: "image",
        alt: "2D Atlas overview showing distinct bright clusters of photo thumbnails separated by dark, empty space",
        caption:
          "A full catalog rendered as a map: dense clusters where the work concentrates, dark space where it doesn't.",
        src: "/atlas/2d_detail.png",
      },
      {
        type: "h2",
        text: "Two Ways to Fly",
        id: "two-ways-to-fly",
      },
      {
        type: "p",
        html: "The 2D Atlas is the map you'd check before a trip: a flat, top-down view of the entire catalog at once, built for spotting continents and gaps in a single glance. It's the fastest way to answer 'what does my archive actually look like,' because it shows you everything at the same scale, at the same time.<br /><br />The 3D Atlas is the trip itself. Same underlying space, same embeddings, same clusters — but now you're inside it, flying between regions, rotating a cluster to see it from another angle, diving into a dense patch until individual photographs resolve out of the blur. Where the 2D view answers 'what shape is my catalog,' the 3D view answers 'what does it feel like to actually stand inside that region of my own work.'",
      },
      {
        type: "quote",
        text: "A grid asks you to look at your photographs one at a time, in an order someone else decided. A map lets you decide where you want to go.",
      },
      {
        type: "p",
        html: "Both modes share the same navigation logic, and it isn't limited to raw visual similarity. The same catalog can be organized by different lenses depending on what you're trying to see:",
      },
      {
        type: "list",
        items: [
          "Contextual — grouped by content and subject matter",
          "Narrative — arranged by time and story, so a project or a year unfolds in order",
          "Visual Accents — clustered by standout visual elements rather than overall similarity",
          "Overall Style — organized by the aesthetic and stylistic fingerprint of each image",
        ],
      },
      {
        type: "cta",
        eyebrow: "See it live",
        title: "Fly through a real catalog",
        text: "Explore a live 3D Atlas built from an actual photography archive — no upload required.",
        buttonLabel: "Try the Atlas",
        action: "demo",
      },
      {
        type: "h2",
        text: "What a Map Reveals That a List Never Could",
        id: "what-a-map-reveals",
      },
      {
        type: "p",
        html: "This is where the Atlas stops being a navigation convenience and starts being something closer to a mirror. Switch to Narrative mode and watch a decade of work arrange itself by time: you can see a stylistic shift happen mid-catalog — the moment your compositions got tighter, or your color palette went from saturated to desaturated — as an actual, visible migration across the map, not a fact you'd have to reconstruct from memory.",
      },
      {
        type: "p",
        html: "Switch to Overall Style and a photograph you took for a client in one country will sometimes land right next to one you took for yourself in another, four years apart, because the model can see something about your eye that you filed under two completely unrelated projects. That's not something you can stumble into by scrolling. It requires the whole catalog to exist in the same space at the same time, so that distance itself becomes information — and, for once, you're the one looking at your own work from the outside, instead of trying to remember it from the inside.",
      },
      {
        type: "image",
        alt: "3D Atlas flythrough showing navigation between two distinct visual clusters in an immersive 3D space",
        caption:
          "Flying from one region of a catalog to another in the 3D Atlas.",
        src: "/atlas/3d_detail.png",
      },
      {
        type: "h2",
        text: "Nobody Else Shows You the Whole Thing",
        id: "nobody-else-shows-you-the-whole-thing",
      },
      {
        type: "p",
        html: "This isn't a case of doing an existing feature better — it's hard to compare because the feature doesn't really exist elsewhere. Lightroom's smart collections, Google Photos' object clustering, and visual-similarity tools like Excire all work adjacent to this problem, but they all answer a narrower question: 'what else looks like this one photo I've selected.' That's useful, and it's a different problem from the one this piece is about. It's still a query, run one photo or one phrase at a time — never a view of the entire archive at once, rendered as a single, continuous, explorable space.<br /><br />None of the major cataloging tools — Lightroom Classic, Capture One, Google Photos, Mylio, digiKam — render your whole catalog as a place you can actually enter. They browse. The Atlas is a first attempt at letting you see the shape of everything you've ever shot, all at once, from the outside.",
      },

      {
        type: "h2",
        text: "From Region to Sequence",
        id: "from-region-to-sequence",
      },
      {
        type: "p",
        html: "Seeing the shape of an archive is the destination for some photographers and the starting point for others. Once a region of the map reveals itself — a cluster of images that share a mood, a light, a subject — it becomes raw material: the start of a sequence, a portfolio section, or an exhibition wall, built from photographs that belong together because a space said so, not because a filename happened to put them in the same export folder.",
      },
      {
        type: "p",
        html: "A folder can only tell you where you put something. A grid can only show you what's next in line. Neither was ever built to answer the question that actually matters once an archive gets large enough to outgrow memory: not 'where is this photo,' but <strong>'what does all of this, together, actually look like — and what does it say about the work?'</strong> That's not a retrieval problem anymore. It's a map.",
      },
    ],
  },
  {
    slug: "folders-are-a-failed-metaphor",
    hidden: true,
    title: "Folders Are a Failed Metaphor: The Case for AI Photo Search",
    excerpt:
      "Folders and keyword tags organize static categories, not fluid meaning. Here is why semantic AI search is replacing them and changing how we view our archives.",
    description:
      "An essay on why folders fail photographers, how semantic AI photo search works, and how Photoreka compares to Excire, Google Photos, Mylio, and DigiKam.",
    keywords:
      "ai photo search, semantic photo search, photo organization, excire alternative, google photos alternative, mylio alternative, digikam alternative, photo curation philosophy, computer vision photography",
    category: "Curation Philosophy",
    tags: ["Photo Curation", "AI Photo Search", "Semantic Search"],
    coverPlaceholder: true,
    publishedAt: "2026-07-04",
    readingMinutes: 4,
    author: {
      name: "Photoreka Team",
      role: "Product",
    },
    toc: true,
    content: [
      {
        type: "p",
        html: "Every photographer eventually faces the same crisis: an ever-growing archive where finding a specific image feels impossible. The problem isn't that the photo is missing, but that our filing systems have nothing to do with how we actually look for images.",
      },
      {
        type: "h2",
        text: "The Filing Cabinet Problem",
        id: "the-filing-cabinet-problem",
      },
      {
        type: "p",
        html: "Folders and tags work for static data—dates, clients, locations—but fail when you look for something subjective. How do you find a photograph that conveys 'solitude' or a specific cinematic mood? A photo's meaning isn't fixed, and no tagging system can anticipate every future search query you might invent.",
      },
      {
        type: "quote",
        text: "A folder answers the question you asked when you created it. It cannot answer the question you didn't know you'd ask two years later.",
      },
      {
        type: "h2",
        text: "Meaning, Not Metadata",
        id: "meaning-not-metadata",
      },
      {
        type: "p",
        html: "Semantic search changes the paradigm. Instead of relying on manual tags, computer vision analyzes the actual content—composition, light, mood—and converts it into an <strong>embedding</strong>. The system matches your search query to these visual meanings, surfacing relevant images even if they were never tagged.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Embeddings, briefly",
        html: "Think of an embedding as a coordinate. Photos with similar meanings are placed close together in a mathematical space. Search simply finds what's nearby.",
      },
      {
        type: "p",
        html: "The result is magical: you can type <em>'a lone figure walking into fog'</em> and instantly surface a photograph filed under an unrelated client name, taken years ago, and never tagged with those words.",
      },
      {
        type: "image",
        alt: "Screenshot placeholder: semantic search results for a mood-based query like 'a lone figure walking into fog'",
        caption:
          "Search results for a query that was never written anywhere near the photo.",
        placeholder: true,
      },
      {
        type: "h2",
        text: "Honesty About Precision",
        id: "honesty-about-precision",
      },
      {
        type: "p",
        html: "Current search tools fail in two directions. Exact-tag search is too rigid. Pure embedding search (like Excire) is too broad, often confusing cats with dogs because they share a semantic field. Others rely on a single AI model (like CLIP) that truncates complex descriptions after 50 words. Consumer tools like Google Photos are great for basic objects, but fail at compositional intent.",
      },
      {
        type: "p",
        html: "Photoreka solves this by separating the tasks into three distinct modes. <strong>Broad</strong> search uses associative similarity for chasing a mood. <strong>Adaptive</strong> search expands cultural references (e.g., <em>'Blade Runner-inspired'</em> automatically looks for neon and wet asphalt). <strong>Precise</strong> search uses a reasoning model to strictly enforce your conditions—asking for exactly three people yields exactly three people, no exceptions.",
      },
      {
        type: "image",
        alt: "Screenshot placeholder: Broad, Adaptive, and Precise search modes shown side by side for the same query",
        caption: "The same query, three different kinds of answers.",
        placeholder: true,
      },
      {
        type: "h2",
        text: "What This Frees You to Do",
        id: "what-this-frees-you-to-do",
      },
      {
        type: "p",
        html: "When retrieval no longer depends on your memory, you can finally stop:",
      },
      {
        type: "list",
        items: [
          "Pre-tagging every photo by mood or subject",
          "Building overly complex folder taxonomies",
          "Relying on memory to find a specific client or year",
          "Endlessly scrolling through catalogs to spot an image visually",
        ],
      },
      {
        type: "p",
        html: "Organization becomes about broad structure, while retrieval becomes a fluid conversation with your archive.",
      },
      {
        type: "h2",
        text: "The Archive as a Body of Work",
        id: "the-archive-as-a-body-of-work",
      },
      {
        type: "p",
        html: "Searching by meaning reveals unconscious patterns in your work. Searching for <em>'harsh midday shadow'</em> might connect a street photo, a portrait, and a travel shot. It shows you the style that recurs across thousands of independent decisions—a revelation that folders completely obscure.",
      },
      {
        type: "h2",
        text: "Beyond Search",
        id: "beyond-search",
      },
      {
        type: "p",
        html: "Folders were just a proxy for retrieving meaning from pixels. Now that AI can read the meaning directly, that proxy is obsolete. The goal is no longer just finding a file faster; it's finally understanding what you have actually created.",
      },
    ],
  },
  {
    slug: "chatlab-a-conversation-with-your-entire-archive",
    title: "ChatLab: A Conversation with Your Entire Photo Archive",
    excerpt:
      "We wanted to talk to an entire catalog—not just a single photo—and we couldn't find anything that could do it. That's how ChatLab was born: an agent built on frontier models that knows your archive, actually sees your photos, and orchestrates the rest of Photoreka's tools.",
    description:
      "What ChatLab is and how it works: an agentic chat powered by frontier models, RAG, and tools for search, pattern analysis, and scoring that treats a photographic library as a whole—it sees the actual photos, not just metadata, and acts as the orchestrator of the entire organization suite.",
    keywords:
      "ai photo chat, chat with photo library, agentic ai photography, ai photo curation, rag photography, photo catalog assistant, llm photo analysis, conversational photo curation, ai photo critique",
    category: "Inside Photoreka",
    tags: ["ChatLab", "AI Agents", "RAG", "Photo Curation"],
    // coverPlaceholder: true,
    coverImage: "/blog/chatlab.png",
    publishedAt: "2026-07-16",
    readingMinutes: 5,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "There are questions no photo search engine has ever been able to answer. <em>“What does this archive say about me as a photographer?” “Where am I repeating myself?” “Which of my photos from this year could stand up in a serious competition?”</em> These aren't searches: they have no keywords and return no ranked list. They're questions about the whole body of work—and until now, the only intelligence capable of answering them was another photographer with hours to spare and your entire archive in mind.",
      },
      {
        type: "p",
        html: "<a href='/photo_chat'>ChatLab</a> was born from a very specific need: we wanted to talk to an entire catalog—not just one photo, but a complete body of work. And when we looked for someone already doing it, the surprise was: nobody was. Yes, some chatbots can describe a single image quite well; none knows your catalog, your style, or your evolution. So we built it inside Photoreka, on the same architectural principles that power modern AI agents: frontier models, RAG, and a solid toolkit.",
      },
      {
        type: "h2",
        text: "An Archive Is a Whole, Not Just a Folder of Files",
        id: "an-archive-is-a-whole",
      },
      {
        type: "p",
        html: "The core idea is easy to state: your style is not contained in any single photo. It is an <strong>emergent property of the collection</strong>—it lives in what you keep repeating without realizing it, in how your palette has changed over three years, in the distance between what you think you photograph and what you actually photograph. None of that is visible from the local perspective of traditional tools: one photo, one folder, one search at a time.",
      },
      {
        type: "p",
        html: "ChatLab works across your entire catalog. It can measure proportions (<em>“Do I photograph more men or women?”</em>), trace your evolution over time, read clusters and imbalances that no individual image contains, and combine all of that with the <a href='/photo_scoring'>artistic scores</a> assigned to each photo. It doesn't answer with impressions—it answers with your entire archive in hand.",
      },
      {
        type: "image",
        alt: "Example conversation with ChatLab: a compound query combining semantic search, filters, and ranking, followed by the chat's answer with a curated photo selection",
        caption: "Example Conversation with ChatLab",
        src: "/chatlab/conversacion.png",
      },
      {
        type: "h2",
        text: "What You Can Ask It",
        id: "what-you-can-ask",
      },
      {
        type: "list",
        items: [
          "Compound curation: “my best vertical black-and-white photos with elderly people, ranked by composition.” A single sentence combining semantic search, tags, filters, and ranking—things that normally live across four different screens.",
          "Collection-wide questions: “What subjects dominate my archive?”, “Do I have more motorcycles or cars?”, “Which year was I the most daring?”",
          "An outside perspective: “Look up this year's categories for award X and tell me which of my photos fit.” The agent searches the web and turns the criteria into a search across your catalog.",
          "Revealing contradictions: “Photos that make a strong first impression but say nothing”—high aesthetics, low narrative. Or the opposite: hidden gems that score highly on storytelling but usually go unnoticed.",
          "Critique with the photo in front of it: attach an image and ask for an honest reading—or ask it to find its sisters by palette, narrative, or visual similarity.",
        ],
      },

      {
        type: "h2",
        text: "One Catalog, Two Ways of Seeing It",
        id: "one-catalog-two-views",
      },
      {
        type: "p",
        html: "This idea of treating an archive as a whole isn't unique to ChatLab: it's the principle that organizes all of Photoreka, and the <a href='/photo_3D_atlas'>2D/3D Atlas</a> is its most visual expression. The Atlas turns your catalog into a navigable map—a universe of points where similar images cluster together and different ones drift apart—allowing you to <strong>see</strong> the overall shape of your work at a glance: where it concentrates, where the gaps are, what clusters exist. That same map is one of the spaces ChatLab can explore on your behalf when you ask about the archive as a whole. But the chat goes further: beyond the spatial view, it combines tags, scores, temporal evolution, and even web information when needed, then answers with a judgment built from all of that—not just by pointing at a region of the map.",
      },
      {
        type: "image",
        alt: "2D Atlas displaying the entire catalog as a map of clusters alongside a ChatLab conversation asking about those same regions",
        caption:
          "The 2D Atlas: the closest visual representation of how ChatLab sees your entire archive.",
        src: "/atlas/2d.png",
      },
      {
        type: "h2",
        text: "How It Works Under the Hood",
        id: "how-it-works",
      },
      {
        type: "p",
        html: "Internally, ChatLab works in two stages: first it gathers evidence, then it judges. In the first stage it has access to the same arsenal of tools you would use through the interface—semantic search, tag filters, patterns and clusters, scoring, even web search—and combines them, sometimes in parallel and sometimes sequentially, until it has solid evidence to answer your question. A real example: for <em>“my best vertical black-and-white photos with elderly people, ranked by composition”</em>, it combines semantic search by subject and composition, filters by orientation and palette, and a final ranking by score—three different tools, one answer.",
      },
      {
        type: "p",
        html: "Once the evidence is on the table, the second stage begins: a frontier model with visual capabilities examines the actual photos—not just their data—compares them side by side, and writes the final answer, grouping the results and giving each selection a meaningful name. It only talks about photos that those tools have genuinely returned, so if nothing matches, it simply says so.",
      },
      {
        type: "image",
        alt: "Diagram of ChatLab's internal pipeline: an investigative stage orchestrating catalog tools followed by a curator stage with visual access to thumbnails",
        caption:
          "The mechanism, simplified: an investigator gathering evidence with catalog tools, and a curator with eyes judging it—placeholder, final diagram pending.",
        src: "/chatlab/diagram.png",
      },
      {
        type: "h2",
        text: "An Eye That Adapts to Your Style",
        id: "an-eye-that-adapts",
      },
      {
        type: "p",
        html: "A good editor doesn't judge a documentary essay the same way as a commercial portfolio—and neither does ChatLab. Its criteria adapt to each photographer's profile: in street photography it gives more weight to spontaneity, visual play, and originality; in documentary work, to message and narrative; in commercial photography, to subject clarity and intent. And the stored scores are only a starting point, not the verdict: each photo was originally evaluated in isolation, and <strong>side-by-side comparison is exactly what the conversation adds</strong>.",
      },
      {
        type: "h2",
        text: "The Chat That Orchestrates Everything Else",
        id: "the-chat-that-orchestrates",
      },
      {
        type: "p",
        html: "Building assistants for other products taught us a lesson that keeps repeating itself: when a dashboard has a chat, users eventually gravitate toward the chat. The same happens with ChatLab, and it makes sense—it can do, to a large extent, almost everything you'd do in a photo organizer: search, compare, group, analyze. To be fair, there are limits: each response can only cover so much, and every conversation consumes frontier-model tokens, so for large-scale exploration the dedicated tools—<a href='/ai_photo_search'>Search</a>, the <a href='/photo_3D_atlas'>Atlas</a>, the Workspace—remain more efficient and, above all, give you greater control. But its role as the <strong>orchestrator of the entire organizer</strong> is undeniable.",
      },
      {
        type: "p",
        html: "That orchestration goes both ways. Outward: beneath every response you'll find <strong>one-click actions</strong>—create a collection using the name the curator already suggested, turn a group into a series, send the selection to another tool—all with your confirmation. Inward: ChatLab uses the exact same tools available through the interface—the same search, the same patterns, clusters, tag distribution, and scoring. It isn't a chat built <em>on top of</em> Photoreka: it's built <em>from</em> Photoreka.",
      },
      {
        type: "image",
        alt: "Suggested actions beneath a ChatLab response: create collection, add to series, open in Workspace",
        caption:
          "The conversation flows back into the application: one-click actions beneath every answer, always requiring confirmation—placeholder, screenshot pending.",
        src: "/chatlab/actions.png",
      },
      {
        type: "quote",
        text: "A search engine gives you what you ask for. A curator argues with you about what you ask for. That difference—between a list of results and judgment—is what ChatLab is here to provide.",
      },
      {
        type: "callout",
        variant: "info",
        title: "What ChatLab Isn't",
        html: "It doesn't modify your library on its own: every action requires your confirmation. It works with limited selections (around 20 photos per response): a carefully considered starting point, not a full inventory. And its interpretation is a <strong>second opinion</strong>, not the final word—the best curation emerges from the collaboration between the system and your own eye.",
      },
      {
        type: "h2",
        text: "What's Next",
        id: "whats-next",
      },
      {
        type: "p",
        html: "ChatLab is growing rapidly. New tools for the agent are on the way, and we're exploring a <strong>multi-agent</strong> approach that will allow it to 'see' far more photos in a single conversation: multiple curators examining different regions of the catalog in parallel and combining their insights. The direction is clear: every month, the chat gets to know your archive a little better.",
      },
      {
        type: "cta",
        eyebrow: "Try It on a Real Archive",
        title: "Talk to a Real Photo Catalog",
        text: "The demo includes ChatLab running on a real photographic archive: ask questions, request curated selections, challenge its answers.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
      {
        type: "p",
        html: "We don't promise magic. We promise something rarer: a conversation partner that knows your entire archive, actually looks at your photos, and turns every answer into real work inside the application. That conversation didn't exist before—and it's the one we'd wanted to have with our own archive for years.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts]
    .filter((post) => !post.hidden)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && !post.hidden);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
