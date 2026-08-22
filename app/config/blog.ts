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
    slug: "photoprism-vs-photoreka",
    title:
      "PhotoPrism vs Photoreka: Self-Hosting Your Archive vs. Making Sense of It",
    excerpt:
      "PhotoPrism is the best self-hosted photo library you can run: open source, browser-based, AI labels, face recognition, your hardware, your rules. It solves ownership beautifully. An honest look at why that still leaves the harder problem untouched.",
    description:
      "An honest comparison of Photoreka and PhotoPrism: labels and captions vs semantic embeddings, quality scores vs artistic scoring, self-hosted storage vs a curation layer that never takes custody of your files.",
    keywords:
      "photoprism alternative, photoprism vs photoreka, photoreka vs photoprism, photoprism ai search, photoprism labels captions, self-hosted photo library, photoprism curation, ai photo curation, ai photo organizer, immich photoprism alternative, photo management without self-hosting",
    category: "Comparisons",
    tags: ["Comparisons", "PhotoPrism", "AI Photo Organizer", "Photo Curation"],
    coverImage: "/blog/photoreka_vs_photoprism.png",
    // coverPlaceholder: true,
    publishedAt: "2026-08-21",
    readingMinutes: 8,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "<strong>PhotoPrism</strong> deserves the praise it gets. It's open source, it runs on your own hardware, it has a genuinely good browser interface that works on every device you own, and it does real computer vision: TensorFlow classification for labels, an ONNX face detector feeding FaceNet embeddings clustered into people, places and maps from GPS data, and — more recently — caption generation through Ollama or OpenAI, so the AI layer can run entirely on your own machine if you want it to. For anyone who wants Google Photos without Google, it's one of the two or three serious answers.",
      },
      {
        type: "p",
        html: "So the comparison here isn't about which is better software. It's about a distinction that gets blurred constantly: <strong>PhotoPrism solves ownership. It doesn't solve judgment.</strong> Those are different problems, and knowing which one is actually hurting you decides whether the next thing you install is a server or something else entirely.",
      },
      {
        type: "h2",
        text: "What PhotoPrism Does Well",
        id: "what-photoprism-does-well",
      },
      {
        type: "p",
        html: "An honest comparison starts here. PhotoPrism is the strongest expression of a good idea: <strong>your photo library should be a service you run, not a service you rent</strong>. The Community edition is free and AGPL-licensed. It indexes originals in place, generates thumbnails and sidecars, exposes everything through a fast web UI and WebDAV, handles video, supports multiple users so a whole household can share one library, and scales to whatever your disks can hold. Nothing is sent anywhere unless you deliberately point the vision layer at an external API. If your concern is that a company will change its pricing, its terms, or its mind about your family photos, PhotoPrism removes that company from the equation entirely.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Who should just run PhotoPrism",
        html: "If your problem is <em>where my photos live and who controls them</em> — you want a private, self-hosted library with faces, places, albums, video, and access from every device, and you're comfortable maintaining a Docker container — install PhotoPrism. It's very good at that, and nothing in this article suggests otherwise. The rest of this piece is about a problem it wasn't built for.",
      },
      {
        type: "h2",
        text: "Where the Walls Are",
        id: "where-the-walls-are",
      },
      {
        type: "p",
        html: "PhotoPrism's architecture makes one central bet: <strong>turn pictures into words, then search the words.</strong> Labels, captions, keywords, EXIF fields, places, people — all of it becomes text in a database, and the search box queries that text. It's a sound design, and it has a ceiling.",
      },
      {
        type: "list",
        items: [
          "A caption is a lossy summary written before you knew the question. 'Two people walking on a beach' is accurate and useless when what you're actually looking for is the frame where the light went strange and the gesture landed. The photograph contains that. The sentence doesn't.",
          "Labels are a vocabulary, and vocabularies have edges. Classification models return classes they were trained on. Nothing in that list corresponds to 'tension', 'restraint', or 'the composition I keep accidentally repeating'.",
          "The quality score is a junk filter, not a judgment. PhotoPrism scores photos 1–5 and hides anything under 3 pending review — the goal being to keep screenshots, memes, and broken files out of your library. It even goes up when you add a location or hit like. It's explicitly not about whether the picture is any good.",
          "The unit is the memory, not the body of work. Moments, albums, people, trips. Excellent for a family archive; it has no concept of a portfolio, a sequence, or an artistic through-line.",
          "The price isn't money, it's operations. Docker, storage planning, indexing runs, upgrades, backups you actually test. That's a real, recurring cost paid in your time — and if the container is down, so is your library.",
          "It takes custody. PhotoPrism wants to be where the photos live: its volumes, its folder conventions, its sidecars, its database. That's the deal you sign for everything it gives you.",
        ],
      },
      {
        type: "h2",
        text: "Photoreka's Different Starting Point",
        id: "photorekas-different-starting-point",
      },
      {
        type: "p",
        html: "Photoreka isn't a place to put photos, and never asks to be. It's an intelligence layer that comes to the archive you already have.<br /><br /><strong>1. It searches the image, not a description of the image.</strong> Every photo becomes an embedding — a numerical description of composition, light, palette, subject, and mood. There's no caption in between to lose the thing you were actually looking for.<br /><br /><strong>2. Nothing to host, nothing to maintain.</strong> It runs in the browser on Windows, Mac, and Linux, and connects to Lightroom Classic (via an official plugin), Google Photos, Dropbox, and local files. Analysis happens in the cloud from compressed previews; your full-resolution originals stay exactly where they are. No container, no backup strategy, no 2am indexing job.<br /><br /><strong>3. Curation is the destination, not a feature.</strong> Finding is step one. Photoreka is built for what comes after: scoring, choosing, ranking, and sequencing the work that matters.",
      },
      {
        type: "quote",
        text: "PhotoPrism answers 'is my archive safe, private, and mine?'. That's a question about custody. It has never once told a photographer which forty pictures are the good ones.",
      },
      {
        type: "h2",
        text: "Feature by Feature",
        id: "feature-by-feature",
      },
      {
        type: "h3",
        text: "Search",
        id: "search",
      },
      {
        type: "p",
        html: "PhotoPrism's search is a well-built filter language over indexed text and metadata: labels, captions, titles, keywords, people, colors, cameras, countries, dates, with AND/NOT operators. It's precise and fast within its vocabulary. Photoreka's <a href='/ai_photo_search'>search</a> works against the image itself, in three explicit modes: <strong>Broad</strong> (pure embedding similarity, for moods and styles), <strong>Adaptive</strong> (expands cultural references like 'Blade Runner-inspired' into their implicit visual vocabulary), and <strong>Precise</strong> (a logical inference layer that <em>verifies</em> each result against your conditions — 'exactly three people, one looking away' means exactly that). There's no query length limit, so a long, specific description isn't silently truncated.",
      },
      {
        type: "p",
        html: "The practical difference: in PhotoPrism, your query has to survive being matched against a caption someone's model wrote months ago. In Photoreka, the query meets the photograph.",
      },
      {
        type: "h3",
        text: "Quality Scores vs. Artistic Scoring",
        id: "quality-vs-scoring",
      },
      {
        type: "p",
        html: "PhotoPrism's 1–5 score exists to decide what deserves to be <em>in</em> your library. Photoreka's <a href='/photo_scoring'>scoring</a> exists to decide what deserves to be <em>seen</em>, and keeps the dimensions separate rather than collapsing them into one number: aesthetics, composition, narrative strength, originality, visual games, humor, candidness, plus subject clarity and commercial intent for commercial work. That separation is the point — the same catalog ranks differently for a gallery submission than for a stock pitch, and a single global score can't express that.",
      },
      {
        type: "h3",
        text: "Beyond Organization",
        id: "beyond-organization",
      },
      {
        type: "p",
        html: "Here the two products stop overlapping entirely. Photoreka includes a <a href='/photography_portfolio_builder'>portfolio builder</a> that selects and sequences 10–40 images under coherence constraints (visual, chromatic, narrative), a <a href='/photo_chat'>conversational assistant</a> that can critique your portfolio and track how your work evolves, <a href='/photo_reports'>style and pattern reports</a>, and a <a href='/photo_3D_atlas'>2D/3D atlas</a> that renders your entire archive as a navigable space rather than an infinite scroll. PhotoPrism has no equivalent, and shouldn't be criticized for it — a library server's job ends where the editing decisions begin.",
      },
      {
        type: "h3",
        text: "Where PhotoPrism Still Wins",
        id: "where-photoprism-still-wins",
      },
      {
        type: "p",
        html: "Fairness requires this section. PhotoPrism is <strong>free and open source</strong>, with no per-analysis cost and no vendor at all. It can run <strong>fully offline</strong>, vision layer included, which is decisive if cloud analysis is a hard no. It handles <strong>video</strong>; Photoreka is photography-only. It does <strong>face recognition and people management</strong>, which Photoreka doesn't. It serves <strong>multiple users</strong> from one library, syncs over WebDAV, works as a PWA on your phone, and — crucially — it can actually <em>be</em> your storage. Photoreka can't replace any of that, because it isn't trying to.",
      },
      {
        type: "h2",
        text: "Two Different Anxieties",
        id: "two-different-anxieties",
      },
      {
        type: "p",
        html: "Most photographers evaluating these tools are carrying one of two very different worries. The first is <em>I don't trust anyone else with my archive</em> — that's a custody problem, and PhotoPrism is a great answer to it. The second is <em>I have forty thousand photographs and no idea which ones matter</em> — that's a judgment problem, and no amount of self-hosting touches it. A perfectly private, perfectly backed-up, perfectly labeled library where you still can't tell which twenty frames are your best work is a solved storage problem sitting on top of an unsolved curation problem.",
      },
      {
        type: "list",
        items: [
          "Choose PhotoPrism if: you want a private self-hosted library you fully control, you need video, faces, maps, and multi-user access, and you're happy to run and maintain a server.",
          "Choose Photoreka if: hosting isn't the thing you want to spend time on, you'd rather search the image than a caption of it, and your real goal isn't storing the archive — it's curating it: scoring, selecting, sequencing, and understanding a body of work.",
          "Use both if: PhotoPrism is already the vault and what's missing isn't safety or access, but the ability to look at everything you've shot and say which of it is worth showing.",
        ],
      },
      {
        type: "cta",
        eyebrow: "See it on a real archive",
        title: "Try Photoreka's demo — no server required",
        text: "Semantic search, artistic scores, and the 3D Atlas on a real catalog, straight from the browser.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
      {
        type: "p",
        html: "One last note on philosophy. PhotoPrism's bet — that your photographs shouldn't be hostage to somebody else's business model — is one we take seriously, which is why Photoreka never moves your originals or asks to become their home. Where we differ is on what happens next. Owning your archive is necessary. It just isn't sufficient. Storage is the floor. <strong>Curation is the point.</strong>",
      },
    ],
  },
  {
    slug: "digikam-vs-photoreka",
    title:
      "digiKam vs Photoreka: Free Local Cataloging, or AI Curation on Top of It?",
    excerpt:
      "digiKam is free, open source, cross-platform, and after twenty years it's probably the most capable photo database a photographer can install without paying anything. So why would you add Photoreka? An honest comparison of what tags can do — and where they stop.",
    description:
      "An honest comparison of Photoreka and digiKam: auto-tagging vs semantic embeddings, image quality scanning vs artistic scoring, local database vs browser-based analysis, and where the two tools actually complement each other.",
    keywords:
      "digikam alternative, digikam vs photoreka, photoreka vs digikam, digikam ai tagging, digikam natural language search, digikam autotags, free photo management software, ai photo curation, ai photo organizer, digikam image quality sorter, open source photo manager alternative",
    category: "Comparisons",
    tags: ["Comparisons", "digiKam", "AI Photo Organizer", "Photo Curation"],
    coverImage: "/blog/photoreka_vs_digikam.png",
    // coverPlaceholder: true,
    publishedAt: "2026-08-21",
    readingMinutes: 8,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Let's be clear about what we're comparing against: <strong>digiKam</strong> is remarkable. Twenty years of development, fully open source, free forever, running natively on Windows, macOS, and Linux, with a real database behind it, RAW support, video, geotagging, face recognition, a batch queue manager, and metadata written straight back into XMP sidecars so nothing is ever locked inside a proprietary catalog. If your requirement is <em>own your archive completely, pay nothing, depend on no company</em>, digiKam has no serious rival.",
      },
      {
        type: "p",
        html: "So this article isn't going to argue that digiKam is bad software, because it isn't. It's going to argue something narrower and, we think, more useful: <strong>digiKam is a cataloging tool, and cataloging is not curation.</strong> Once you see where that line falls, it becomes fairly obvious which of the two solves your actual problem — and why plenty of photographers end up using both.",
      },
      {
        type: "h2",
        text: "What digiKam Does Well",
        id: "what-digikam-does-well",
      },
      {
        type: "p",
        html: "An honest comparison starts here. digiKam's core strength is being a <strong>complete, self-hosted digital asset manager</strong>: SQLite or MariaDB under the hood, hierarchical tags, ratings, color and pick labels, versioning, and a metadata engine that survives you switching software. Its AI features have come a long way, too — recent versions do face detection and recognition with an ensemble classifier, auto-tag assignment powered by YOLOv11 and EfficientNet models, and an Image Quality Scanner that flags images by blur, noise, exposure, and compression. The 9.x line even adds natural-language search built on a <em>local</em> LLM, so nothing leaves your machine.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Who should just use digiKam",
        html: "If your priority is a free, offline, open-source catalog you fully control — no cloud, no account, no vendor — and your daily problem is <em>filing and retrieving</em> photos by people, dates, places, and keywords, install digiKam. It's excellent at that job and we'd never suggest otherwise. The rest of this article is about a different job.",
      },
      {
        type: "h2",
        text: "Where the Walls Are",
        id: "where-the-walls-are",
      },
      {
        type: "p",
        html: "Every wall below follows from the same architectural decision: digiKam's intelligence lives in the <strong>database</strong>. Everything it knows about a photo has to become a tag, a label, or a field first — and whatever can't be written into a field, it can't know.",
      },
      {
        type: "list",
        items: [
          "Auto-tagging produces labels, not understanding. Object detection returns 'dog', 'car', 'person', 'beach'. It will never return 'the loneliness of a bus station at 6am', because that isn't a class in a detection model.",
          "Natural-language search compiles to metadata filters. digiKam's LLM search is genuinely clever, but it translates your sentence into structured criteria — dates, ratings, labels, keywords — and runs it against the database. It can only ever find what someone, or something, already recorded.",
          "Image quality is technical, not artistic. The Quality Scanner measures blur, noise, exposure, and compression. It can tell you a frame is sharp. It cannot tell you it's good.",
          "One database, one machine. The catalog lives on a specific computer. Sharing it across machines means shared storage, a MySQL/MariaDB setup, and maintenance you now own.",
          "It organizes; it doesn't curate. There's no scoring across artistic dimensions, no portfolio sequencing, no conversational review of a body of work, no view of the whole archive as a single space.",
          "The learning curve is real. digiKam's density is the price of its power, and plenty of photographers bounce off it before that power pays off.",
        ],
      },
      {
        type: "h2",
        text: "Photoreka's Different Starting Point",
        id: "photorekas-different-starting-point",
      },
      {
        type: "p",
        html: "Photoreka doesn't try to be a better database — it deliberately isn't one. It's an intelligence layer that sits on top of the files you already have, wherever they already are.<br /><br /><strong>1. Meaning instead of labels.</strong> Every photo becomes an embedding: a numerical description of composition, light, palette, subject, and mood. Search runs against that meaning, so a frame nobody ever tagged still surfaces for the right query.<br /><br /><strong>2. Browser-based, nothing to install or maintain.</strong> It runs on Windows, Mac, and Linux, and connects to Lightroom Classic (via an official plugin), Google Photos, Dropbox, and local files. Analysis happens in the cloud from compressed previews; your full-resolution originals never leave your machine.<br /><br /><strong>3. Curation is the destination, not a feature.</strong> Organizing is step one. Photoreka is built for what comes after: scoring, choosing, ranking, and sequencing the work that matters.",
      },
      {
        type: "quote",
        text: "digiKam answers 'where is it, and who's in it?'. That's retrieval. The question that decides whether a body of work goes anywhere is 'which ones — and in what order?'",
      },
      {
        type: "h2",
        text: "Feature by Feature",
        id: "feature-by-feature",
      },
      {
        type: "h3",
        text: "Search",
        id: "search",
      },
      {
        type: "p",
        html: "digiKam offers keyword search, a powerful advanced-search builder, similarity search, and now local-LLM natural language search — all of it ultimately resolved against database fields. Photoreka's <a href='/ai_photo_search'>search</a> runs against the image itself, in three explicit modes: <strong>Broad</strong> (pure embedding similarity, for moods and styles), <strong>Adaptive</strong> (expands cultural references like 'Blade Runner-inspired' into their implicit visual vocabulary), and <strong>Precise</strong> (a logical inference layer that <em>verifies</em> each result against your conditions — 'exactly three people, one looking away' means exactly that). There's no query length limit, so a long, specific description isn't silently truncated.",
      },
      {
        type: "p",
        html: "The practical difference is simple: in digiKam, a photo you never tagged is a photo you can't find by description. In Photoreka, nothing needs tagging first — the archive becomes searchable the moment it's analyzed.",
      },
      {
        type: "h3",
        text: "Quality Scanning vs. Artistic Scoring",
        id: "quality-vs-scoring",
      },
      {
        type: "p",
        html: "This is the sharpest contrast between the two tools. digiKam's Image Quality Scanner assigns pick labels based on measurable defects — blurry, noisy, badly exposed, over-compressed. That's genuinely useful for a first culling pass. Photoreka's <a href='/photo_scoring'>scoring</a> asks an entirely different question, and keeps the dimensions separate: aesthetics, composition, narrative strength, originality, visual games, humor, candidness, plus subject clarity and commercial intent for commercial work. A technically flawless photograph can score badly, and a slightly soft one can score brilliantly — which is exactly how editors actually choose.",
      },
      {
        type: "h3",
        text: "Beyond Organization",
        id: "beyond-organization",
      },
      {
        type: "p",
        html: "Here the two products stop overlapping altogether. Photoreka includes a <a href='/photography_portfolio_builder'>portfolio builder</a> that selects and sequences 10–40 images under coherence constraints (visual, chromatic, narrative), a <a href='/photo_chat'>conversational assistant</a> that can critique your portfolio and track how your work evolves, <a href='/photo_reports'>style and pattern reports</a>, and a <a href='/photo_3D_atlas'>2D/3D atlas</a> that renders your entire archive as a navigable space instead of a scrolling grid. digiKam has no equivalent to any of these, because none of them were ever part of what a DAM is for.",
      },
      {
        type: "h3",
        text: "Where digiKam Still Wins",
        id: "where-digikam-still-wins",
      },
      {
        type: "p",
        html: "Fairness requires this section, and here it's a long one. digiKam is <strong>free and open source</strong> — no per-batch cost, no account, no company that can change its mind. It processes <strong>everything locally</strong>, which is decisive if cloud analysis is a hard no for you. It handles <strong>video</strong>; Photoreka is photography-only. It does <strong>face recognition</strong> and named-person management, which Photoreka doesn't. It edits RAW files, runs batch conversions, writes metadata back into your files, and watches folders continuously rather than working in analysis batches. If any of those are load-bearing in your workflow, no amount of semantic search replaces them.",
      },
      {
        type: "h2",
        text: "They're Not Really Competing",
        id: "not-really-competing",
      },
      {
        type: "p",
        html: "The most honest conclusion we can offer is that many photographers shouldn't be choosing at all. digiKam is a great <em>system of record</em>: it owns the files, the tags, the faces, the backups, the metadata that has to survive the next twenty years. Photoreka is a <em>thinking layer</em>: point it at those same photos to find what you can't put into keywords, score a body of work across artistic dimensions, and build a sequence out of it. Neither one moves your originals. Neither one asks you to migrate anything.",
      },
      {
        type: "list",
        items: [
          "Choose digiKam if: you want free and open source, everything must stay offline, you need video, RAW editing, or face recognition, and your problem is filing and retrieving photos reliably.",
          "Choose Photoreka if: you'd rather search by meaning than by tags you'd have to write first, you need artistic scoring instead of technical quality flags, or your real goal isn't organizing the archive — it's curating it.",
          "Use both if: digiKam is already your catalog and what you're missing isn't storage or metadata but judgment — which photographs are strongest, what they say together, and in what order they should be seen.",
        ],
      },
      {
        type: "cta",
        eyebrow: "See it on a real archive",
        title: "Try Photoreka's demo — nothing to install",
        text: "Semantic search, artistic scores, and the 3D Atlas on a real catalog, straight from the browser.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
      {
        type: "p",
        html: "One last note on philosophy. digiKam's twenty-year bet — that photographers should own their catalog, their metadata, and their files outright — is a bet we agree with, which is why Photoreka never moves or takes custody of your originals either. Where we differ is on what an archive is <em>for</em>. A perfectly tagged catalog is still a beautifully organized pile of photographs. Organization is the floor. <strong>Curation is the point.</strong>",
      },
    ],
  },
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
