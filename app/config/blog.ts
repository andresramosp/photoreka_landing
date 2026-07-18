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
    coverPlaceholder: true,
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
    coverPlaceholder: true,
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
          "A full catalog rendered as a map: dense clusters where the work concentrates, dark space where it doesn't — placeholder, screenshot to be added.",
        placeholder: true,
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
        text: "Nobody Else Shows You the Whole Thing",
        id: "nobody-else-shows-you-the-whole-thing",
      },
      {
        type: "p",
        html: "This isn't a case of doing an existing feature better — it's hard to compare because the feature doesn't really exist elsewhere. Lightroom's smart collections, Google Photos' object clustering, and visual-similarity tools like Excire all work adjacent to this problem, but they all answer a narrower question: 'what else looks like this one photo I've selected.' That's useful, and it's a different problem from the one this piece is about. It's still a query, run one photo or one phrase at a time — never a view of the entire archive at once, rendered as a single, continuous, explorable space.<br /><br />None of the major cataloging tools — Lightroom Classic, Capture One, Google Photos, Mylio, digiKam — render your whole catalog as a place you can actually enter. They browse. The Atlas is a first attempt at letting you see the shape of everything you've ever shot, all at once, from the outside.",
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
          "Flying from one region of a catalog to another in the 3D Atlas — placeholder, screenshot to be added.",
        placeholder: true,
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
          "Search results for a query that was never written anywhere near the photo — placeholder, screenshot to be added.",
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
        caption:
          "The same query, three different kinds of answers — placeholder, screenshot to be added.",
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
    title: "ChatLab: una conversación con todo tu archivo fotográfico a la vez",
    excerpt:
      "Queríamos poder hablar con un catálogo entero — no con una foto suelta — y no encontramos nada ahí fuera que lo hiciera. Así nació ChatLab: un agente sobre modelos frontera que conoce tu archivo, ve tus fotos de verdad y orquesta el resto de herramientas de Photoreka.",
    description:
      "Qué es ChatLab y cómo funciona: un chat agéntico con modelos frontera, RAG y herramientas de búsqueda, análisis de patrones y scoring que trata una librería fotográfica como un todo — ve las fotos reales, no solo metadatos, y actúa como orquestador del organizador completo.",
    keywords:
      "ai photo chat, chat with photo library, agentic ai photography, ai photo curation, rag photography, photo catalog assistant, llm photo analysis, conversational photo curation, ai photo critique",
    category: "Inside Photoreka",
    tags: ["ChatLab", "AI Agents", "RAG", "Photo Curation"],
    coverPlaceholder: true,
    publishedAt: "2026-07-16",
    readingMinutes: 5,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Hay preguntas que ningún buscador de fotos ha sabido responder nunca. <em>«¿Qué dice este archivo de mí como fotógrafo?» «¿Dónde me estoy repitiendo?» «¿Cuáles de mis fotos de este año aguantarían una convocatoria seria?»</em> No son consultas: no tienen palabras clave ni devuelven una lista ordenada. Son preguntas de conjunto — y hasta ahora, la única inteligencia capaz de responderlas era otro fotógrafo con horas por delante y tu catálogo entero en la cabeza.",
      },
      {
        type: "p",
        html: "<a href='/photo_chat'>ChatLab</a> nació de una necesidad muy concreta: queríamos poder hablar con todo un catálogo — no con una foto, con el cuerpo de trabajo completo. Y al buscar quién lo hacía ya, la sorpresa: no había nada. Sí, algunos chats describen con soltura una foto suelta; ninguno conoce tu catálogo, tu estilo ni tu evolución. Así que lo construimos dentro de Photoreka, sobre la misma arquitectura que mueve a los agentes de IA modernos: modelos frontera, RAG y un buen juego de herramientas.",
      },
      {
        type: "h2",
        text: "Un archivo es un todo, no una carpeta de ficheros",
        id: "un-archivo-es-un-todo",
      },
      {
        type: "p",
        html: "La idea central es fácil de enunciar: tu estilo no está en ninguna foto concreta. Es una <strong>propiedad emergente del conjunto</strong> — vive en lo que repites sin saberlo, en cómo ha cambiado tu paleta en tres años, en la distancia entre lo que crees que fotografías y lo que fotografías de verdad. Nada de eso es visible desde el ángulo local de las herramientas tradicionales: una foto, una carpeta, una búsqueda cada vez.",
      },
      {
        type: "p",
        html: "ChatLab trabaja sobre el catálogo completo. Puede medir proporciones (<em>«¿fotografío más a hombres o a mujeres?»</em>), rastrear tu evolución por épocas, leer clusters y desequilibrios que ninguna imagen individual contiene, y cruzarlo todo con las <a href='/photo_scoring'>puntuaciones artísticas</a> de cada foto. No responde con impresiones: responde con el archivo entero en la mano.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Agente, RAG y embeddings, en tres frases",
        html: "Un modelo de lenguaje no sabe nada de tus fotos: si le preguntas «a pelo», inventa con elegancia. <strong>RAG</strong> (Retrieval-Augmented Generation) lo arregla recuperando datos reales antes de responder — descripciones, etiquetas, puntuaciones y <strong>embeddings</strong>: coordenadas matemáticas donde la distancia significa parecido. Y un <strong>agente</strong> va más allá: dispone de herramientas — buscar por estilo, filtrar por puntuación, medir temas, muestrear por épocas, consultar la web — y decide él mismo cuáles usar y en qué orden, leyendo cada resultado antes del siguiente paso.",
      },
      {
        type: "image",
        alt: "ChatLab respondiendo a una petición de curación con varios grupos de fotos etiquetados",
        caption:
          "Una petición, varios grupos con criterio: la respuesta no es una lista de resultados, es una selección argumentada — placeholder, captura pendiente.",
        placeholder: true,
      },
      {
        type: "h2",
        text: "Qué se le puede pedir",
        id: "que-se-le-puede-pedir",
      },
      {
        type: "list",
        items: [
          "Curación compuesta: «mis mejores verticales en blanco y negro con gente mayor, ordenadas por composición». Una frase que combina búsqueda semántica, etiquetas, filtros y ranking — cosas que normalmente viven en cuatro pantallas distintas.",
          "Preguntas de conjunto: «¿qué temas dominan mi archivo?», «¿tengo más motos o coches?», «¿en qué año fui más arriesgado?».",
          "Mirada exterior: «busca las categorías de este año del premio X y dime qué fotos mías encajan». El agente consulta la web y convierte los criterios en una búsqueda sobre tu catálogo.",
          "Contradicciones reveladoras: «fotos que impresionan a primera vista pero no cuentan nada» — estética alta, narrativa baja. O la inversa: joyas ocultas que puntúan alto en historia y pasan desapercibidas.",
          "Crítica con la foto delante: adjunta una imagen y pide una lectura honesta — o pídele sus hermanas: por paleta, por narrativa o por parecido visual.",
        ],
      },
      {
        type: "h2",
        text: "Cómo funciona por dentro",
        id: "como-funciona-por-dentro",
      },
      {
        type: "p",
        html: "La arquitectura tiene dos fases. La primera es un <strong>investigador</strong>: un modelo rápido cuyo único trabajo es decidir qué herramientas llamar — en paralelo cuando son independientes, en cadena cuando una alimenta a la otra — y reunir evidencia. Tiene prohibido juzgar. La segunda es un <strong>curador</strong>: un modelo frontera con capacidad visual que recibe toda esa evidencia y — esto es lo importante — <strong>ve las fotos de verdad</strong>: miniaturas reales, no solo metadatos, lado a lado, antes de escribir una sola línea. Verifica, descarta lo tangencial, agrupa y le pone nombre a cada grupo.",
      },
      {
        type: "p",
        html: "Una regla de hierro lo gobierna todo: el curador solo puede hablar de fotos que las herramientas hayan devuelto de verdad. Si una búsqueda vuelve vacía, la respuesta lo dice — no rellena el hueco con fotos imaginarias. Cada afirmación tiene una foto real detrás.",
      },
      {
        type: "image",
        alt: "Diagrama del pipeline interno de ChatLab: una fase investigadora que orquesta las herramientas del catálogo y una fase curadora con acceso visual a las miniaturas",
        caption:
          "El mecanismo, simplificado: un investigador que reúne evidencia con las herramientas del catálogo, y un curador con ojos que la juzga — placeholder, diagrama pendiente.",
        placeholder: true,
      },
      {
        type: "h2",
        text: "Un ojo que se adapta a tu perfil",
        id: "un-ojo-que-se-adapta",
      },
      {
        type: "p",
        html: "Un buen editor no juzga igual un ensayo documental que un book comercial, y ChatLab tampoco. Sus criterios se adaptan al perfil de cada fotógrafo: en fotografía de calle pesan más la espontaneidad, los juegos visuales y la originalidad; en documental, el mensaje y la narrativa; en trabajo comercial, la claridad del sujeto y la intención. Y las puntuaciones almacenadas son punto de partida, no sentencia: cada foto fue puntuada en soledad, y <strong>la comparación lado a lado es exactamente lo que la conversación añade</strong>.",
      },
      {
        type: "h2",
        text: "El chat que orquesta todo lo demás",
        id: "el-chat-que-orquesta",
      },
      {
        type: "p",
        html: "Construyendo asistentes para otros productos aprendimos una lección que se repite siempre: cuando un dashboard tiene chat, el usuario acaba yendo al chat. Con ChatLab pasa igual, y tiene sentido — puede hacer, en cierta medida, casi todo lo que harías en un organizador de fotos: buscar, comparar, agrupar, analizar. Seamos francos con los matices: su alcance por respuesta es acotado, y cada conversación consume tokens de modelos frontera, así que para la exploración masiva las herramientas dedicadas — <a href='/ai_photo_search'>Search</a>, el <a href='/photo_3D_atlas'>Atlas</a>, el Workspace — siguen siendo más eficientes y, sobre todo, te dan más control. Pero su papel de <strong>orquestador de todo el organizador</strong> es innegable.",
      },
      {
        type: "p",
        html: "Esa orquestación va en las dos direcciones. Hacia fuera: bajo cada respuesta aparecen <strong>acciones de un clic</strong> — crear una colección con el nombre que el curador ya propuso, convertir un grupo en serie, llevar la selección a otra herramienta — siempre con tu confirmación. Y hacia dentro: ChatLab usa las mismas herramientas que la interfaz te ofrece a ti — la misma búsqueda, los mismos patrones, clusters, distribución de etiquetas y scoring. No es un chat construido <em>encima</em> de Photoreka: está hecho <em>de</em> Photoreka.",
      },
      {
        type: "image",
        alt: "Acciones sugeridas bajo una respuesta de ChatLab: crear colección, añadir a una serie, abrir en Workspace",
        caption:
          "La conversación desemboca en la aplicación: acciones de un clic bajo cada respuesta, siempre con confirmación — placeholder, captura pendiente.",
        placeholder: true,
      },
      {
        type: "quote",
        text: "Un buscador te devuelve lo que pides. Un curador discute contigo lo que pides. Esa diferencia — entre una lista de resultados y un criterio — es la que ChatLab viene a cubrir.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Lo que ChatLab no es",
        html: "No modifica tu librería por su cuenta: toda acción pide tu confirmación. Trabaja con selecciones acotadas (~20 fotos por respuesta): un punto de partida con criterio, no un inventario. Y su lectura es una <strong>segunda opinión</strong>, no la última palabra — la mejor curación sale de la simbiosis entre el sistema y tu ojo.",
      },
      {
        type: "h2",
        text: "Lo que viene",
        id: "lo-que-viene",
      },
      {
        type: "p",
        html: "ChatLab está en pleno crecimiento. Hay nuevas herramientas en camino para el agente, y estamos explorando un enfoque <strong>multi-agente</strong> que le permita «ver» muchas más fotos por conversación: varios curadores mirando en paralelo regiones distintas del catálogo y poniendo su lectura en común. La dirección es clara: cada mes que pasa, el chat conoce tu archivo un poco mejor.",
      },
      {
        type: "cta",
        eyebrow: "Pruébalo con un archivo real",
        title: "Habla con un catálogo de verdad",
        text: "La demo incluye ChatLab sobre un archivo fotográfico real: pregunta, pide selecciones, discútele las respuestas.",
        buttonLabel: "Probar la demo",
        action: "demo",
      },
      {
        type: "p",
        html: "No prometemos magia. Prometemos algo más raro: un interlocutor que conoce tu catálogo entero, que mira tus fotos de verdad y que convierte cada respuesta en trabajo real dentro de la aplicación. Esa conversación no existía ahí fuera — y era la que llevábamos años queriendo tener con nuestro propio archivo.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
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
