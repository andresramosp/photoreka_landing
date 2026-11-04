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
    slug: "best-ai-photo-rater",
    title:
      "AI Photo Raters Compared: The Best Ways to Rate and Rank Your Photos in 2026",
    excerpt:
      "Type 'rate my photo' into a search engine and you get dating-profile graders, camera-roll apps, wedding-culling software and research papers. They answer three very different questions. An honest guide to which AI photo rater or photo ranker fits yours.",
    description:
      "An honest comparison of AI photo raters and rankers: Photofeeler, rate-my-photo.com, Better Camera, SpectraSort, chatbots, AI culling tools and Photoreka Picks — and which question each one actually answers.",
    keywords:
      "ai photo rater, photo ranker, ai photo ranker, rate my photo, rate my photo ai, rate my picture, photo rating, photo rating app, image ranker, image rater, ai to choose best photos, pick the best photo, best photo picker ai, ai photo critique, photofeeler alternative, aftershoot alternative, narrative select alternative, rank photos with ai",
    category: "Comparisons",
    tags: ["Comparisons", "Photo Ranking", "AI Photo Critique", "Photoreka Picks"],
    coverImage: "/blog/ai_photo_raters.png",
    publishedAt: "2026-11-03",
    readingMinutes: 9,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Type <strong>rate my photo</strong> into a search engine and you get a strange mix of results: dating-profile graders, phone apps that put a number on your camera roll, wedding-culling software, research papers about aesthetic models. That's not because the web is confused. It's because the phrase hides three very different questions, and every tool worth considering was built to answer one of them — and usually only one.",
      },
      {
        type: "p",
        html: "We make one of these tools — <a href='/ai_photo_picks/'>Photoreka Picks</a>, an AI photo ranker for photographers — so read this as an informed comparison, not a neutral one. We've tried to be straight about where each alternative is the better choice, and we've only included what we could check on each product's own pages at the time of writing (November 2026).",
      },
      {
        type: "h2",
        text: "Three Questions Hiding Behind 'Rate My Photo'",
        id: "three-questions",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "How do I come across in this picture? This is the dating-profile, LinkedIn and social-media question. What's being judged is the person — trustworthy, confident, attractive — far more than the photograph.",
          "Is this a technically good photo? Sharp, well exposed, decently composed, eyes open. This is the camera-roll and client-delivery question, and it's the one AI answers most reliably.",
          "Which of these hundreds of frames are my best ones? This is the photographer's question: picking a portfolio, a contest entry, the twenty pictures worth showing from a trip. It's about storytelling, originality and intent, and it's the hardest to automate.",
        ],
      },
      {
        type: "p",
        html: "Use a tool built for the first question on the third, and you get a confident number that means nothing. Use a culling tool on a street photography archive, and it will happily reject your best frame because it's soft. So before comparing tools, it's worth knowing which question you're actually asking.",
      },
      {
        type: "h2",
        text: "Photofeeler: How You Come Across, Rated by People",
        id: "photofeeler",
      },
      {
        type: "p",
        html: "If your question is the first one, the most honest answer isn't an AI at all. <strong>Photofeeler</strong> shows your photo to real people, who score it on traits relevant to the context you choose: dating, business (think LinkedIn) or social profiles. You can earn a free test by voting on other people's photos, or buy credits for faster results.",
      },
      {
        type: "p",
        html: "Its strength is exactly that it doesn't pretend: how a face reads to strangers is a human judgment, and asking humans is the most direct way to measure it. Some of the AI graders that rank for the same searches describe themselves, in their own terms of use, as entertainment. <strong>Who it's for:</strong> anyone choosing a profile picture. <strong>What it isn't:</strong> a way to judge photography. A beautifully composed street photograph and a well-lit headshot are answering different questions — and so is Picks, which judges photographs, not the people in them.",
      },
      {
        type: "h2",
        text: "rate-my-photo.com: A Free Score for a Single Photo",
        id: "rate-my-photo-com",
      },
      {
        type: "p",
        html: "<strong>rate-my-photo.com</strong> is the simplest tool on this list: take or upload one photo and an AI model returns a score from 1 to 10 for its overall aesthetic quality. The site says the model was trained on more than 20,000 images annotated with human aesthetic scores, and it looks at the whole frame rather than just the face — a bad background can pull the score down. It's free, with no signup and no account, and photos are processed in memory rather than stored unless you choose to share a result.",
      },
      {
        type: "p",
        html: "<strong>Who it's for:</strong> curiosity, or a quick sanity check on one picture. <strong>Limits:</strong> it works one photo at a time and gives you a single overall number, so it won't sort a shoot, and it can't tell you <em>why</em> one frame beats another.",
      },
      {
        type: "h2",
        text: "On Your iPhone: Better Camera and SpectraSort",
        id: "iphone-apps",
      },
      {
        type: "p",
        html: "Two iPhone apps turn the same idea into a camera-roll tool. <strong>Compare Photos: Better Camera</strong> (listed as 'Ranker: Pick Best Photos') gives each selected photo an AI aesthetic score from 0 to 10 and sorts them so the strongest rise to the top; its built-in camera even shows a live score while you frame. It's free to download, with optional subscriptions — $0.99 a week or $9.99 a year at the time of writing — for full access and more processing.",
      },
      {
        type: "p",
        html: "<strong>SpectraSort</strong> runs entirely on the phone, with no account and nothing uploaded. It surfaces your sharpest, best-exposed, best-composed shots, removes duplicates, lets you search for a subject in plain words, and learns your taste as you use it. Sorting is free and unlimited; a paid Premium tier lifts the weekly limit on actions like sharing or deleting and adds finer quality controls.",
      },
      {
        type: "p",
        html: "<strong>Who they're for:</strong> cleaning up a phone library and finding the keeper among ten near-identical shots. <strong>Limits:</strong> they're built around the photos on your iPhone (both also list compatibility with Apple-silicon Macs), and their scores lean on technical and general aesthetic quality rather than the criteria an editor or a contest jury would use.",
      },
      {
        type: "h2",
        text: "General Chatbots: ChatGPT, Gemini and Claude",
        id: "chatbots",
      },
      {
        type: "p",
        html: "Plenty of people now simply upload a photo to a general AI assistant and ask for a rating. For a single image, this works better than you might expect: modern chatbots write articulate critiques, notice composition and light, and can respond to a brief ('is this strong enough for a documentary portfolio?').",
      },
      {
        type: "p",
        html: "The problems appear when you need a <em>ranking</em>. Ask twice and the number moves. Ask about photo 3 and photo 300 in different conversations and there's no guarantee they were judged on the same scale. And a chat window is built for a conversation, not for working through a folder of several hundred files. <strong>Who they're for:</strong> a second opinion on a handful of images. <strong>Limits:</strong> consistency and scale.",
      },
      {
        type: "h2",
        text: "AI Culling Tools: Aftershoot, Narrative Select and Co.",
        id: "ai-culling-tools",
      },
      {
        type: "p",
        html: "If you shoot weddings, events or portrait sessions, the 'AI to choose best photos' you want is probably a culling tool. <strong>Aftershoot</strong> covers culling, editing, retouching and delivery in one desktop app for Windows and macOS that works offline, so files never leave your machine; it offers 30 days of full access without a credit card. <strong>Narrative Select</strong> is another established option, with paid plans starting at $15 a month (or $10 a month billed yearly) at the time of writing, a free trial and no permanently free plan. FilterPixel and Imagen also offer AI culling.",
      },
      {
        type: "p",
        html: "These tools are excellent at their job, which is turning thousands of client frames into a deliverable set: grouping near-duplicates, flagging blur and closed eyes, keeping the best of each moment. <strong>Who they're for:</strong> working professionals with high-volume shoots and a client waiting. <strong>Limits:</strong> they're priced and designed for that workflow, and a deliverable set is not the same thing as an artistic ranking. The motion-blurred street frame with all the energy in it is precisely what a technical cull is built to throw away.",
      },
      {
        type: "h2",
        text: "Photoreka Picks: Ranking Your Own Work Like a Jury Would",
        id: "photoreka-picks",
      },
      {
        type: "p",
        html: "<a href='/ai_photo_picks/'>Picks</a> exists for the third question. You drop up to 5,000 photos — a whole trip, a year of street work, the shortlist for a contest — and an AI jury scores every frame from 1 to 10 on <strong>eight artistic criteria</strong>: aesthetics, composition, storytelling, originality, message, humor, visual games and spontaneity. Each photo also gets a one- or two-sentence <strong>critique</strong> naming what makes it work or what holds it back, the way an editor would say it in a portfolio review. A real example, for a street photograph in our demo set:",
      },
      {
        type: "quote",
        text: "The split frame between the smoking man and the sensuous waterfall painting is a clever visual rhyme; a slight step left to avoid cutting the right figure's arm would refine it further.",
        cite: "Picks jury",
      },
      {
        type: "p",
        html: "Then you rank. The <strong>Overall</strong> jury weighs aesthetics, composition, storytelling and originality; <strong>street, documentary, landscape, portrait, travel and fine art</strong> juries weigh them their own way and only rank the photos of their genre; <strong>award juries</strong> keep only the photos above a high bar. Identical copies are grouped and judged once, so duplicates don't crowd your top picks, and you can export the whole ranking as CSV.",
      },
      {
        type: "p",
        html: "The practical details: no account and no subscription; €0.012 per photo, VAT included, paid once per order with a €2.40 minimum — so 500 photos cost €6 and 5,000 cost €60. Only an 800-pixel thumbnail of each photo is sent for judging; your full-resolution files stay on your device. A private link to your ranking reaches your inbox, and thumbnails and results are deleted after 30 days and never used to train AI models. You can <a href='https://app.photoreka.com/picks?trial=1' target='_blank' rel='noopener'>try it free with 10 of your own photos</a>, critiques included, with no card and no account.",
      },
      {
        type: "p",
        html: "<strong>Limits, honestly:</strong> Picks doesn't judge faces or profile pictures, and it isn't a client-delivery culling tool. It accepts JPEG, PNG and WebP, so RAW files need exporting first. The jury doesn't know a contest's theme or rules, so the final call against a brief is yours. And it's built for one-off batches: if you want scores kept on your whole catalog permanently, that's Photoreka's <a href='/photo_scoring/'>Photo Scoring</a>, part of a full account.",
      },
      {
        type: "h2",
        text: "How AI Rating Actually Works — and Where It Breaks",
        id: "how-ai-rating-works",
      },
      {
        type: "p",
        html: "Almost every AI photo rater learned the same way: a model is shown large numbers of images alongside scores people gave them, and it learns to predict the score a new image would get. That's useful, and it has a built-in ceiling. The model learns what the <em>average</em> annotator liked, which tends to be pleasant, sharp, bright and conventional. Ask it to rate a deliberately unsettling documentary frame and it will often prefer a sunset.",
      },
      {
        type: "p",
        html: "The deeper issue is that <strong>a score is an opinion, not a measurement</strong>. A street photographer and a landscape editor would never pick the same frame from the same folder, and neither would be wrong. Collapsing everything into one global number hides that disagreement instead of showing it to you.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "What to look for in any photo rater",
        html: "Prefer tools that <strong>separate the criteria</strong> instead of returning one number, that <strong>explain</strong> each score in words, and that let you <strong>change the point of view</strong>. That's why Picks scores each photo once on eight criteria and then lets different juries weigh them: switch from the Overall jury to the Street jury and the ranking reorders itself, which is exactly how real juries behave.",
      },
      {
        type: "p",
        html: "Whatever you use, treat the ranking as a shortlist, not a verdict. The AI's job is to get you from 2,000 frames to 50 worth looking at closely. Choosing the final 12 — and the order they're seen in — is still editing, and editing is yours. We wrote more about that last step in <a href='/blog/how-to-pick-your-best-photos/'>how to pick your best photos from hundreds of shots</a>.",
      },
      {
        type: "h2",
        text: "Which One Should You Use?",
        id: "which-one-should-you-use",
      },
      {
        type: "list",
        items: [
          "Choose Photofeeler if: you're picking a dating, LinkedIn or social profile picture and want to know how real people read it.",
          "Choose rate-my-photo.com if: you want a free, instant score on a single photo and nothing more.",
          "Choose Better Camera or SpectraSort if: the photos live on your iPhone and you want the camera roll sorted by quality, with duplicates out of the way.",
          "Choose a general chatbot if: you want a written second opinion on two or three images and don't need them ranked on a consistent scale.",
          "Choose Aftershoot, Narrative Select or another culling tool if: you shoot weddings, events or sessions for clients and need a deliverable set fast.",
          "Choose Photoreka Picks if: you're a photographer choosing your own best work — a portfolio, a contest entry, the best of a trip or a year — and want artistic criteria, a critique for every frame and more than one jury's point of view.",
        ],
      },
      {
        type: "cta",
        eyebrow: "Try it on your own photos",
        title: "Let the Picks jury rank your best photos",
        text: "Eight artistic criteria, a critique for every frame and juries for street, documentary, landscape and more. Free with 10 photos, no account.",
        buttonLabel: "Try it free with 10 photos",
        action: "link",
        href: "https://app.photoreka.com/picks?trial=1",
      },
      {
        type: "p",
        html: "One last thought. The reason 'rate my photo' returns such a mess of results is that people rarely want a rating for its own sake. They want to make a decision: which picture goes on the profile, which frames go to the client, which twelve go into the portfolio or the competition. Pick the tool built for your decision, and the number starts to mean something. If that decision is a contest, our guide to <a href='/blog/how-to-choose-photos-for-a-photo-contest/'>choosing which photos to enter in a photography contest</a> is a good next read.",
      },
    ],
  },
  {
    slug: "best-ai-culling-software",
    title:
      "Best AI Culling Software in 2026: Aftershoot, Narrative Select, FilterPixel, Imagen and Photoreka Compared",
    excerpt:
      "AI culling has turned an evening of rejecting frames into a coffee break. An honest look at Aftershoot, Narrative Select, FilterPixel and Imagen — what each does best, where each stops — and where Photoreka fits, which is not where you might expect.",
    description:
      "An honest comparison of the best AI photo culling software in 2026: Aftershoot, Narrative Select, FilterPixel, Imagen and Photoreka. Blink and focus detection, duplicate grouping, local vs cloud processing, Lightroom integration, pricing models, and which tool fits which kind of photographer.",
    keywords:
      "ai culling, ai culling software, best ai photo culling software, ai photo culling, best photo culling software 2026, aftershoot alternative, narrative select alternative, filterpixel alternative, imagen culling alternative, aftershoot vs narrative select, photo culling app, wedding photo culling software, ai photo selection, choose best photos ai, photo ranker",
    category: "Comparisons",
    tags: ["Comparisons", "AI Culling", "Aftershoot", "Narrative Select", "Photo Selection"],
    coverImage: "/blog/ai_culling_software.png",
    publishedAt: "2026-11-03",
    readingMinutes: 9,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "<strong>AI culling</strong> has quietly become the most useful kind of AI in a photographer's workflow. Not the generative kind — the kind that looks at the 4,000 frames you shot on Saturday and tells you which 3,000 you never need to look at twice. Aftershoot, Narrative Select, FilterPixel and Imagen have turned that job from an evening into a coffee break, and for wedding and event photographers they're no longer optional.",
      },
      {
        type: "p",
        html: "This is an honest comparison of the four tools that lead the category, plus where Photoreka fits — and where it doesn't. We'll say it up front: <strong>Photoreka is not a wedding culler.</strong> It doesn't flag closed eyes, and if your job is delivering a gallery by Thursday you should pick one of the first four. What it does is the other half of culling: deciding which of your good photos are actually your best. Features and prices below were checked on each vendor's own site at the time of writing (November 2026); they change often, so confirm before you buy.",
      },
      {
        type: "callout",
        variant: "info",
        title: "The short version",
        html: "Shooting weddings and events and want a fast, offline cull? <strong>Aftershoot</strong> or <strong>Narrative Select</strong>. Want genre-aware ranking with a reason for every frame? <strong>FilterPixel</strong>. Already editing with Imagen? Its <strong>culling add-on</strong> is the easy choice. Choosing your strongest images for a portfolio, a contest or a book rather than delivering a gallery? That's where <a href='/ai_photo_picks/'>Photoreka Picks</a> and <a href='/ai_photo_culling/'>Photoreka</a> come in.",
      },
      {
        type: "h2",
        text: "What AI Culling Actually Does",
        id: "what-ai-culling-does",
      },
      {
        type: "p",
        html: "Every tool in this list does some version of the same three jobs. First, <strong>technical rejection</strong>: blurry frames, missed focus, closed eyes, blown exposures. Second, <strong>grouping</strong>: bursts and near-identical frames collapsed together, so you compare variations side by side instead of scrolling past them. Third, <strong>ranking</strong>: inside each group, a suggestion of which frame is the keeper. The selection then goes to Lightroom Classic or Capture One with ratings or flags attached.",
      },
      {
        type: "p",
        html: "The first two jobs are largely solved, and all four dedicated cullers handle them well. The third is where they differ — and where the question shifts from <em>is this frame usable?</em> to <em>is this frame good?</em> Keep that distinction in mind (we wrote more about it in <a href='/blog/how-to-pick-your-best-photos/'>how to pick your best photos</a>); it decides which tool you actually need.",
      },
      {
        type: "h2",
        text: "Aftershoot",
        id: "aftershoot",
      },
      {
        type: "p",
        html: "<strong>Aftershoot</strong> is the best-known name in the category, and it has grown from a culling app into a full post-production suite: AI culling, AI editing that learns your style, batch retouching and client galleries. Its culling runs <strong>locally on Windows and macOS</strong> — in Aftershoot's own words, images never leave your machine — so there are no uploads and no per-image fees.",
      },
      {
        type: "list",
        items: [
          "Flags blurry frames, closed eyes and blown exposures, and sorts them into groups you can review or ignore.",
          "Duplicate grouping that tries to separate true duplicates from intentional variations.",
          "Key face detection to surface the frames where everyone looks their best.",
          "Exports to Lightroom Classic and Capture One with ratings, labels and flags preserved.",
          "Flat pricing, not per image: AI culling starts at $10 a month, with a 30-day free trial and no card required (at the time of writing, November 2026).",
        ],
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> it's built around the high-volume shoot — weddings, events, sessions. It decides what's usable and helps you choose among similar frames, but it doesn't try to judge a photograph's artistic weight across a whole body of work. Local processing also means your computer does the work; Aftershoot lists 8 GB of RAM as the minimum. <strong>Best for:</strong> wedding and event photographers who want offline culling and editing in one subscription.",
      },
      {
        type: "h2",
        text: "Narrative Select",
        id: "narrative-select",
      },
      {
        type: "p",
        html: "<strong>Narrative Select</strong> starts from a slightly different philosophy: the AI assists, you decide. It groups a shoot into <strong>Scenes</strong> (similar frames from the same moment), shows face <strong>Close-ups</strong> so you can check every subject at a glance, and runs eye and focus assessments that tell you whether each face is sharp and whether eyes are open — with enough context to know a kiss isn't a missed blink. Its AI First Pass ranks each frame within its scene, from best in scene to undesirable, and shows the reason. Nothing is deleted for you.",
      },
      {
        type: "list",
        items: [
          "Runs on macOS and Windows, though some features, such as key element detection and the people filter, are Mac-only for now.",
          "Culling and AI assessments happen locally; nothing is uploaded unless you use a feature that needs it.",
          "Ships selections to Lightroom Classic on both platforms, and to Lightroom, Photoshop and Capture One on Mac.",
          "Plans from $15 a month, or $10 a month billed yearly, up to $79 a month for Ultra, with a free trial of Ultra and no credit card (at the time of writing, November 2026).",
        ],
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> the most useful culling features sit in the Standard tier and above, and Mac and Windows aren't at full parity yet. Like Aftershoot, its idea of 'best' is best within a moment: the strongest frame of this sequence, not the strongest photograph of your year. <strong>Best for:</strong> photographers who want fast, transparent assistance and prefer to keep the final call — especially on a Mac.",
      },
      {
        type: "h2",
        text: "FilterPixel",
        id: "filterpixel",
      },
      {
        type: "p",
        html: "<strong>FilterPixel</strong> pushes hardest on the ranking problem. Alongside a basic cull that groups similar images and filters on blur, focus, expressions and composition, it offers <strong>DeepCull</strong>, a genre-aware mode that evaluates frames by the logic of the shoot — expressions, moments, peak action, emotional impact — and shows you why it picked each one. Genre modes cover weddings, conferences, concerts and sports.",
      },
      {
        type: "list",
        items: [
          "Windows and Mac, with a dedicated macOS app.",
          "Your originals stay on your computer; only the embedded RAW preview is uploaded, and DeepCull analyses it in the cloud.",
          "Sends selections to Lightroom, Capture One or Photo Mechanic, and adds AI editing that can learn your style.",
          "Subscription pricing with a yearly allowance of DeepCull shoots: Standard is $14.99 a month billed annually, with unlimited basic culling and 20 DeepCull shoots a year, and extra shoots cost $7.99 each (at the time of writing, November 2026). There are free projects to try it first.",
        ],
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> the genre-aware mode is metered by shoot, so a heavy season means a higher tier or extra purchases, and the cloud step needs a connection. Its sense of quality is tuned to client genres: it knows what a strong first-dance frame looks like, not what makes a street photograph or a personal project land. <strong>Best for:</strong> event and wedding shooters who want a reasoned ranking, not just a reject pile.",
      },
      {
        type: "h2",
        text: "Imagen",
        id: "imagen",
      },
      {
        type: "p",
        html: "<strong>Imagen</strong> is first an AI editing service, and its culling is designed to sit next to that. It recognizes unintentional blinks (while treating some closed eyes, like a kiss, as keepers), groups similar images with a similarity threshold you control, flags out-of-focus and poorly exposed shots, and can <strong>cull to an exact number</strong> or percentage — handy when a contract promises a fixed gallery size.",
      },
      {
        type: "list",
        items: [
          "Windows 10 or later and macOS, on 64-bit machines.",
          "Cloud-based: it doesn't use your CPU or GPU, but it needs an internet connection.",
          "Integrates with Lightroom and uses Lightroom-style keyboard shortcuts.",
          "Culling is a flat-fee add-on to an Imagen editing plan with unlimited culling: $12 a month billed yearly or $18 billed monthly, plus two free culling projects (at the time of writing, November 2026).",
        ],
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> it makes most sense if you already edit with Imagen; as a stand-alone culler the add-on model is less natural. Working in the cloud trades local hardware requirements for upload time. <strong>Best for:</strong> Imagen editing customers who want culling in the same Lightroom pipeline.",
      },
      {
        type: "h2",
        text: "Photoreka and Photoreka Picks",
        id: "photoreka",
      },
      {
        type: "p",
        html: "Here's the honest positioning. Photoreka doesn't detect blinks or check every face for focus, and its quick tool doesn't read RAW files. If your Monday problem is turning 4,000 wedding frames into a 600-image gallery, the four tools above are built for that and we aren't. Photoreka works on a different question: <strong>out of photographs that are all usable, which ones are actually your best?</strong> That's the question behind a portfolio, a contest entry, a photobook, a print sale or a year-end review — and it's the one keep/reject culling was never designed to answer.",
      },
      {
        type: "h3",
        text: "Picks: a Ranking Pass on Any Folder",
        id: "photoreka-picks",
      },
      {
        type: "p",
        html: "<a href='/ai_photo_picks/'>Photoreka Picks</a> is the closest thing we make to a culling pass. Drop up to 5,000 photos in the browser and an AI jury scores every frame on eight artistic criteria — aesthetics, composition, storytelling, originality, message, humor, visual games and spontaneity — writes a one- or two-sentence critique for each, and ranks the set. Switch between juries (overall, street, documentary, landscape, portrait, travel, fine art, plus award juries that only keep photos above a high bar) and the ranking reorders itself. A few hundred photos take a few minutes; 5,000 take under half an hour.",
      },
      {
        type: "list",
        items: [
          "No account and no subscription: €0.012 per photo, VAT included, with a €2.40 minimum per order.",
          "A free trial with 10 of your own photos, critiques included, no card.",
          "Only an 800-pixel thumbnail of each photo is sent; your full-resolution originals stay on your device.",
          "Identical copies are grouped and judged once; the ranking can be exported as CSV.",
          "Thumbnails and results are deleted after 30 days and never used to train AI models.",
          "JPEG, PNG and WebP only, so export RAW files to JPEG first.",
        ],
      },
      {
        type: "h3",
        text: "Photoreka: Scoring a Whole Catalog",
        id: "photoreka-catalog",
      },
      {
        type: "p",
        html: "The full Photoreka app does the same kind of judgment permanently, across your whole archive. Every photo is scored on separate dimensions — aesthetics, composition, narrative strength, originality and more (see <a href='/photo_scoring/'>photo scoring</a>) — so you can sort a catalog by what matters for the project at hand, and combine scores with <a href='/ai_photo_search/'>natural-language search</a>: 'my strongest black-and-white portraits from last summer'. Near-duplicate detection flags over-shot sequences. It runs in the browser on Windows, Mac and Linux, connects to Lightroom Classic through an official plugin as well as Google Photos, Google Drive, Dropbox and local files, analyzes roughly 1,000 photos an hour from compressed previews, and is paid once per batch of photos analyzed, with no subscription.",
      },
      {
        type: "p",
        html: "<strong>Limits, stated plainly:</strong> no blink or eye detection, no per-face focus checks, no video and no editing; Picks groups only exact copies, not bursts; and analysis happens in the cloud, so you need a connection. Photoreka is a second pass after the technical cull, or a first pass on work that has already been culled once.",
      },
      {
        type: "quote",
        text: "A culler answers 'can I deliver this frame?'. The question that decides whether a body of work goes anywhere is 'which of these deserve to be seen?'",
      },
      {
        type: "h2",
        text: "Where the Dedicated Cullers Still Win",
        id: "where-dedicated-cullers-win",
      },
      {
        type: "p",
        html: "Fairness requires this section, and it's a long one. For delivery work, Aftershoot, Narrative Select, FilterPixel and Imagen beat Photoreka on almost every axis that matters: they read RAW files directly, catch closed eyes and missed focus face by face, collapse bursts into scenes or groups, write ratings and flags straight into Lightroom Classic or Capture One, and most of them edit too. Aftershoot and Narrative Select do their AI work locally, which matters if uploading a client's wedding is a hard no. And their flat or tiered subscriptions make sense when you shoot every weekend, in a way that paying per photo wouldn't.",
      },
      {
        type: "h2",
        text: "How to Choose",
        id: "how-to-choose",
      },
      {
        type: "list",
        items: [
          "Choose Aftershoot if: you shoot weddings or events, want unlimited offline culling, and would like editing, retouching and client galleries from the same company.",
          "Choose Narrative Select if: you want the AI to assist rather than decide, value face close-ups and scene grouping, and work mostly on a Mac.",
          "Choose FilterPixel if: you want genre-aware ranking with a stated reason for every frame, and don't mind a cloud step on the previews.",
          "Choose Imagen if: you already edit with Imagen and want culling in the same Lightroom pipeline.",
          "Choose Photoreka Picks if: you have a folder of photos that are all usable and need to know which are strongest — for a portfolio, a contest or a book — without an account or a subscription.",
          "Choose Photoreka if: the problem isn't one shoot but a whole archive, and you want artistic scores you can search, filter and revisit over time.",
          "Use both if: a dedicated culler handles the technical pass on client work, and Photoreka handles the curatorial pass on your own.",
        ],
      },
      {
        type: "cta",
        eyebrow: "Try it on your own photos",
        title: "Rank 10 photos free with Photoreka Picks",
        text: "Eight artistic criteria, a written critique for every frame and a ranking by jury. No account, no card.",
        buttonLabel: "Try it free with 10 photos",
        action: "link",
        href: "https://app.photoreka.com/picks?trial=1",
      },
      {
        type: "p",
        html: "One last note on what culling is for. The tools in this article are extraordinary at removing the frames you'd never show, and every photographer who shoots volume should use one. That's the floor. The harder decision comes after — which ten photographs from a year of shooting actually say something — and no amount of blink detection makes it for you. <strong>Rejecting is a filter. Choosing is the work.</strong>",
      },
    ],
  },
  {
    slug: "best-ai-photo-organizer",
    title: "The Best AI Photo Organizers for Photographers in 2026",
    excerpt:
      "Excire Foto, Peakto, Mylio, Lightroom, Google Photos, digiKam, Immich, PhotoPrism and Photoreka all call themselves AI photo organizers — and they solve different problems. An honest guide to what each one actually does, where it stops, and who it's for.",
    description:
      "Honest 2026 comparison of AI photo organizers for photographers: Excire Foto, Peakto, Mylio, Lightroom, Google Photos, digiKam, Immich, PhotoPrism and Photoreka.",
    keywords:
      "ai photo organizer, best ai photo organizer, photo organizer ai, ai photo sorting, ai photo sorter, ai photo sorter alternative, ai photo organizer windows, ai photo management software, best photo organizer for photographers, excire foto alternative, peakto alternative, mylio alternative, lightroom ai search, google photos ask photos, immich vs photoprism, digikam ai, ai photo organizer without subscription",
    category: "Comparisons",
    tags: ["Comparisons", "AI Photo Organizer", "Photo Curation", "Photo Management"],
    coverImage: "/blog/ai_photo_organizers.png",
    publishedAt: "2026-11-03",
    readingMinutes: 11,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Search for an <strong>AI photo organizer</strong> and you get a list that mixes very different things: cloud backups with a clever search box, desktop catalogs with face recognition, self-hosted servers, and a few tools that try to tell you which pictures are actually good. They all wear the same label, and they solve different problems. Picking the wrong one usually means migrating a library into something that answers a question you weren't asking.",
      },
      {
        type: "p",
        html: "This guide compares the tools we think a working photographer should consider in 2026, for what they actually do today. One disclosure up front: we make <a href='/ai_photo_organizer/'>Photoreka</a>, which is on the list. We've tried to describe every tool — ours included — by its real strengths and its real limits, and we checked competitor details against their official sites at the time of writing (November 2026). Prices and features move fast, so confirm before you buy.",
      },
      {
        type: "h2",
        text: "Three Jobs Hiding Behind One Label",
        id: "three-jobs",
      },
      {
        type: "p",
        html: "Almost every tool here does some mix of three jobs, and the mix is what really separates them:",
      },
      {
        type: "list",
        items: [
          "Keeping: where the files live, how they sync between devices, how they're backed up. Google Photos, Mylio and the self-hosted servers are strongest here.",
          "Finding: getting back to a photo you never tagged — search by content or description, faces, places, duplicates. Most tools now do some of this.",
          "Judging: telling you which frames are strongest and how they work together. Few tools attempt it, and they define 'best' very differently.",
        ],
      },
      {
        type: "p",
        html: "Decide which of the three is actually hurting before you compare feature lists. A great keeper won't fix a judging problem, and a great judge won't back up your archive.",
      },
      {
        type: "h2",
        text: "The Short Version",
        id: "short-version",
      },
      {
        type: "list",
        items: [
          "Excire Foto: a local desktop app for Windows and Mac with AI keywords, faces, duplicates and best-shot selection, sold as a one-time license.",
          "Peakto: a Mac app that unifies Lightroom, Capture One, Apple Photos and plain folders into one local, searchable view.",
          "Mylio Photos: keeps your files on your own devices and syncs them peer-to-peer across Windows, Mac, iOS and Android.",
          "Adobe Lightroom: natural-language search arrived in Lightroom Desktop and Web in 2026, at full strength only for photos in Adobe's cloud.",
          "Google Photos: the most convenient everyday search and the Ask Photos assistant, if you're happy to upload everything to Google.",
          "digiKam: a free, open-source, offline catalog for Windows, Mac and Linux with faces, auto-tags and a technical quality scanner.",
          "Immich and PhotoPrism: self-hosted, open-source libraries with semantic search and faces, for people willing to run a server.",
          "Photoreka: a browser-based layer on top of the storage you already have, built for search by description and artistic scoring rather than storage.",
        ],
      },
      {
        type: "h2",
        text: "1. Excire Foto",
        id: "excire-foto",
      },
      {
        type: "p",
        html: "<strong>Excire Foto</strong> (currently Excire Foto 2027) is a standalone photo and video manager for Windows and macOS, and its defining choice is that <strong>everything runs locally</strong>: the AI analyzes your photos on your own computer, and Excire states it doesn't use a cloud at all. On top of that sits one of the broadest AI toolkits in this list — automatic keywording, free-text content search, face search (including by age group and expression), duplicate removal, and a 'find your best shots' selection that weighs aesthetics, sharpness and facial expressions, with a survey view and automatic grouping by people, scene or sequence to speed up culling.",
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> it's a desktop catalog, so the library lives on one computer and you work where that computer is. Its idea of a 'best shot' blends aesthetics with technical signals like sharpness and open eyes — very useful for culling a shoot, less so for deciding which frames carry a body of work. <strong>Pricing:</strong> a one-time license with no subscription; major version upgrades are paid, with a discount for existing customers. If you live in Lightroom Classic, the same company sells <strong>Excire Search</strong>, a plugin that brings its search and culling into Lightroom.",
      },
      {
        type: "p",
        html: "<strong>Best for:</strong> photographers who want serious AI organization on Windows or Mac, completely offline, paid once.",
      },
      {
        type: "h2",
        text: "2. Peakto",
        id: "peakto",
      },
      {
        type: "p",
        html: "<strong>Peakto</strong>, by the French developer CYME, solves fragmentation. It's a native Mac app that indexes Lightroom, Capture One, Luminar Neo, Apple Photos, Aperture and plain folders into a single view without moving your originals, then adds natural-language search, face tagging, color analysis and keyword suggestions — with the AI running locally on your Mac. It also takes video seriously, with tools aimed at editors, and a web app now lets you reach your library from any browser.",
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> the engine is a Mac app. The browser access is a window onto a library indexed on a Mac, not a Windows or Linux version of Peakto. <strong>Pricing:</strong> at the time of writing (November 2026), subscription plans billed monthly, yearly or every two years, plus a Standard lifetime license; higher tiers add collaboration features. We compared the two tools in detail in <a href='/blog/peakto-alternative-windows/'>Peakto vs Photoreka</a>.",
      },
      {
        type: "p",
        html: "<strong>Best for:</strong> Mac photographers whose work is scattered across several catalogs and editing apps, and creators who need the same tool for stills and footage.",
      },
      {
        type: "h2",
        text: "3. Mylio Photos",
        id: "mylio-photos",
      },
      {
        type: "p",
        html: "<strong>Mylio Photos</strong> is built on a different idea: your library should live on your own devices and follow you between them. It runs on Windows, macOS, iOS and Android, syncs peer-to-peer between your devices with no cloud upload required, and lets you decide where files are stored — locally, on external drives, or in its optional encrypted cloud. The AI side covers offline face recognition, search that needs no tagging, duplicate removal, and help rating and tagging photos faster.",
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> Mylio's AI is aimed at finding and tidying a lifetime of photos, videos and documents, not at judging photographs as work; it doesn't score images artistically. <strong>Pricing:</strong> you can start for free, and the full feature set sits on paid personal plans (individual or family), so check the current price on its site.",
      },
      {
        type: "p",
        html: "<strong>Best for:</strong> photographers who want one library across computer and phone without handing it to a big cloud provider.",
      },
      {
        type: "h2",
        text: "4. Adobe Lightroom",
        id: "adobe-lightroom",
      },
      {
        type: "p",
        html: "If you already pay for Adobe's Photography plan, check this one first. In 2026 <strong>Lightroom</strong> — the cloud-based Desktop and Web apps, not Lightroom Classic — gained <strong>natural-language search</strong>: describe a scene and it returns matching photos you never tagged. Lightroom Classic and Lightroom Desktop also have <strong>Assisted Culling</strong>, which scores subject and eye focus and flags exposure problems across a whole batch.",
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> the full visual search needs your photos in Adobe's cloud; on local photos, search is limited to the metadata stored in the files. Lightroom Classic, still where many professionals keep their catalog, doesn't get the new search at all. And culling here means rejecting technical failures, not ranking what's left. <strong>Pricing:</strong> part of an Adobe Creative Cloud subscription. Lightroom Classic users can fill the search gap with a plugin: Excire Search, or our own <a href='/lightroom_search_plugin/'>Lightroom Classic plugin</a>.",
      },
      {
        type: "p",
        html: "<strong>Best for:</strong> photographers already editing in Lightroom Desktop with their library synced to Adobe's cloud.",
      },
      {
        type: "h2",
        text: "5. Google Photos",
        id: "google-photos",
      },
      {
        type: "p",
        html: "<strong>Google Photos</strong> has the most polished everyday search of any tool here: type what you remember and it usually finds it, across people, places, things and text inside images. Its <strong>Ask Photos</strong> assistant, powered by Gemini, lets you ask questions about your library in plain conversation. It expanded to more than 100 countries in late 2025, but availability still depends on your country and language.",
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> Google Photos is storage first — anything you want to search has to be uploaded to Google, which is a non-starter for some photographers and impractical for large RAW archives. It's designed around memories (people, trips, highlights) rather than bodies of work, and it won't tell you which frames are your strongest. <strong>Pricing:</strong> 15 GB of free storage shared with your Google account, then a paid Google One plan for more.",
      },
      {
        type: "p",
        html: "<strong>Best for:</strong> personal and family photos, and photographers who already back up to Google and want effortless search. Photoreka can import from Google Photos if you'd like to curate on top of it.",
      },
      {
        type: "h2",
        text: "6. digiKam",
        id: "digikam",
      },
      {
        type: "p",
        html: "<strong>digiKam</strong> is the long-standing open-source answer: free, offline and native on Windows, macOS and Linux, with a real database, RAW and video support, face recognition, AI auto-tagging, and an Image Quality Scanner that flags blur, noise and bad exposure. The latest stable release at the time of writing is 9.1 (June 2026), and a natural-language search powered by a local LLM is on its way in 9.2 — it turns your sentence into metadata filters rather than looking at the images themselves.",
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> its intelligence lives in metadata — tags, labels and fields — and its quality checks are technical rather than artistic. It's powerful and dense, with a real learning curve. Our <a href='/blog/digikam-vs-photoreka/'>digiKam vs Photoreka</a> comparison goes deeper. <strong>Pricing:</strong> free.",
      },
      {
        type: "p",
        html: "<strong>Best for:</strong> photographers who want a free, offline, vendor-free catalog and are willing to invest time in learning it.",
      },
      {
        type: "h2",
        text: "7. Immich and PhotoPrism (Self-Hosted)",
        id: "immich-photoprism",
      },
      {
        type: "p",
        html: "If you'd rather run your own Google Photos, these are the two serious options. <strong>Immich</strong> is open source (AGPL), with mobile apps for Android and iOS, CLIP-based smart search for freeform descriptions, face recognition, and search by text inside images, location, camera and more. <strong>PhotoPrism</strong> is also open source and browser-based, with AI labels, face recognition and — more recently — captions generated through Ollama or the OpenAI API; its Community edition is free, with paid memberships for extra features.",
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> you're the operator — a server, storage, updates, backups you actually test, and enough memory for the machine-learning side. Both are built around memories and household libraries rather than portfolios, and neither scores photos as artwork. More in <a href='/blog/photoprism-vs-photoreka/'>PhotoPrism vs Photoreka</a>. <strong>Pricing:</strong> the software is free; you pay in hardware and time.",
      },
      {
        type: "p",
        html: "<strong>Best for:</strong> technically comfortable photographers who want full ownership and a private library on every device.",
      },
      {
        type: "h2",
        text: "8. Photoreka",
        id: "photoreka",
      },
      {
        type: "p",
        html: "<strong>Photoreka</strong> is our tool, so read this section with that in mind. It isn't a place to store photos. It's a browser-based layer that analyzes the library you already have — from local folders, Google Photos, Google Drive, Dropbox, or Lightroom Classic through an official plugin — and it works from compressed previews, so your originals stay exactly where they are. It runs the same way on Windows, macOS and Linux, with nothing to install.",
      },
      {
        type: "p",
        html: "What it adds is <strong>finding and judging</strong>. <a href='/ai_photo_search/'>Search</a> works against the image itself, in three modes (Broad, Adaptive and Precise) with no query length limit. Every photo gets <a href='/photo_scoring/'>scores</a> across 9+ dimensions — aesthetics, composition, narrative strength, originality and more — kept separate, so you can rank the same catalog differently for a gallery submission than for a client pitch. You also get automatic tags, near-duplicate detection, a 2D/3D map that groups the whole library by visual similarity, and a world map that uses AI to estimate where photos without GPS were taken.",
      },
      {
        type: "p",
        html: "<strong>Limits:</strong> no video, no face recognition or people management, and the analysis happens in the cloud, so it isn't for anyone who needs everything offline. It's built for a curated body of work — the sweet spot is up to 20,000 photos, with 50,000 workable — not for every phone snapshot you own. <strong>Pricing:</strong> no subscription; you pay once per batch of photos analyzed. At the time of writing (November 2026), 500 photos cost €9.90, 2,500 cost €36 and 10,000 cost €89, and new accounts get 100 photos and 500 credits free. If you only want an AI jury to rank one folder, <a href='/ai_photo_picks/'>Photoreka Picks</a> does that without an account.",
      },
      {
        type: "p",
        html: "<strong>Best for:</strong> photographers whose files are already stored somewhere and whose real problem is finding photos by what's in them and deciding which ones are worth showing.",
      },
      {
        type: "h2",
        text: "How to Choose",
        id: "how-to-choose",
      },
      {
        type: "p",
        html: "Start from the job, not from the feature list:",
      },
      {
        type: "list",
        items: [
          "Choose Excire Foto if: you want strong AI organization on Windows or Mac, everything offline, paid once.",
          "Choose Peakto if: you're on a Mac and your photos and videos are scattered across Lightroom, Capture One and Apple Photos.",
          "Choose Mylio Photos if: you want one library across your computer and phone, stored on your own devices.",
          "Choose Lightroom if: you already work in Lightroom Desktop with your photos synced to Adobe's cloud.",
          "Choose Google Photos if: convenience matters most and uploading everything to Google is fine with you.",
          "Choose digiKam if: you want free, open source and offline, and you'll put in the time to learn it.",
          "Choose Immich or PhotoPrism if: you want to own the whole stack and you're comfortable running a server.",
          "Choose Photoreka if: storage is already solved and what you need is to search by description and score your work artistically, on any operating system, without a subscription.",
        ],
      },
      {
        type: "p",
        html: "Plenty of photographers end up with two: one tool that <em>keeps</em> the archive and one that helps them <em>judge</em> it. That isn't indecision — those really are different jobs, and the tools that try to do both usually do one of them better.",
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
        html: "One last note. 'AI photo organizer' has become a label for everything from a backup service to a culling assistant, and the best tool on this list for someone else can be the wrong one for you. Ask which of the three jobs is actually hurting — keeping, finding or judging — and the shortlist usually writes itself. Organization is the floor. <strong>Curation is the point.</strong>",
      },
    ],
  },
  {
    slug: "excire-search-vs-photoreka",
    title: "Lightroom Classic AI Search: Excire Search vs Photoreka Compared",
    excerpt:
      "Lightroom Classic still can't find a photo you never keyworded, and Adobe's natural-language search only lives in the cloud-based Lightroom app. Two plugins fill the gap: Excire Search and Photoreka. An honest look at what each one does inside Classic — and where each one stops.",
    description:
      "An honest comparison of Excire Search and Photoreka for AI search in Lightroom Classic: prompt search vs three search modes, keywords written to the catalog vs a curation layer, local processing vs cloud analysis from previews, culling vs artistic scoring.",
    keywords:
      "lightroom ai search, lightroom classic ai search, lightroom ai plugin, lightroom classic natural language search, nlp lightroom, how to search in lightroom classic, excire search alternative, excire search vs photoreka, photoreka vs excire, excire foto alternative, lightroom semantic search plugin, ai photo search lightroom classic",
    category: "Comparisons",
    tags: ["Comparisons", "Excire", "Lightroom Classic", "AI Photo Search"],
    coverImage: "/blog/excire_vs_photoreka.png",
    publishedAt: "2026-11-03",
    readingMinutes: 9,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "If you've ever typed into Lightroom Classic's search bar and found nothing, you already know the rule: <strong>Classic can only find what someone wrote down</strong>. Keywords, captions, ratings, camera, date. The frame you remember as 'the girl with the red umbrella crossing in the rain' is invisible unless you keyworded it exactly that way years ago — and almost nobody did.",
      },
      {
        type: "p",
        html: "There are now two serious ways to fix that without leaving Classic: <strong>Excire Search</strong>, the long-standing AI plugin from Excire, and Photoreka's <a href='/lightroom_search_plugin/'>Lightroom Classic plugin</a>. They solve overlapping problems from very different starting points. This is an honest comparison of both — written by one of them, so we've tried to be especially careful with the other's strengths. First, though, the question most people actually search for.",
      },
      {
        type: "h2",
        text: "Can Lightroom Classic Search Photos by Description?",
        id: "can-lightroom-classic-search-by-description",
      },
      {
        type: "p",
        html: "Not natively, at the time of writing (November 2026). Lightroom Classic's search is the Library Filter bar — Text, Attribute and Metadata filters — plus keywords, Smart Collections and the People view, which uses face recognition to group the people you've named. It's precise and fast over whatever metadata exists. What it can't do is look at the pixels and match them to a sentence. Adobe keeps adding AI elsewhere in Classic: Assisted Culling scores open eyes and sharpness, and version 15.4 (June 2026) added automatic duplicate detection. Search by description isn't among those additions.",
      },
      {
        type: "p",
        html: "Adobe does have natural-language search — in <strong>Lightroom</strong>, the cloud-based app, not in Classic. Adobe's own tutorial shows queries like 'a man with an umbrella looking at a painting in a museum' or 'golden hour light on the water', and the release notes for the April 2026 desktop version (9.3) list natural-language search as a new feature. If your library already lives in Adobe's cloud ecosystem, try that first. If it lives in a Classic catalog, the answer today is a plugin.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "The short answer",
        html: "<strong>Lightroom Classic:</strong> keywords, filters and faces — no search by description. <strong>Lightroom (cloud):</strong> natural-language search on the photos in your cloud library. <strong>Lightroom Classic with a plugin:</strong> Excire Search or Photoreka, compared below.",
      },
      {
        type: "h2",
        text: "What Excire Search Does Well",
        id: "what-excire-search-does-well",
      },
      {
        type: "p",
        html: "An honest comparison starts here. <strong>Excire Search 2026</strong> is a mature, well-designed plugin that turns Lightroom Classic into something much closer to a modern, AI-indexed library. According to Excire, it offers prompt search ('backlit portrait', 'child in snow'), one-click similarity search, people search, duplicate and near-duplicate detection, automatic tagging that is <strong>written directly into your Lightroom catalog fields</strong>, aesthetic ratings to surface your best shots, AI-assisted culling that groups a shoot by scenes and people, automatic focus checking on faces, and — new in the 2026 version — video support. Everything runs locally on your computer, with no cloud involved at all.",
      },
      {
        type: "p",
        html: "It's also a straightforward purchase: a one-time license valid on both Mac and Windows, no subscription, with a 14-day trial. It requires Lightroom Classic 14 or newer and runs on macOS 11 or later and on Windows 10 and 11. For photographers who don't use Lightroom Classic, the same company sells <strong>Excire Foto</strong>, a standalone app.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Who should just use Excire Search",
        html: "If you want AI search and culling that lives entirely inside Lightroom Classic, works offline, never sends a pixel anywhere, and leaves real keywords behind in your catalog — and your daily problem is <em>finding and culling shoots</em>, especially weddings, events or anything with people — Excire Search is a very good answer. Nothing in this article argues otherwise.",
      },
      {
        type: "h2",
        text: "Where the Walls Are",
        id: "where-the-walls-are",
      },
      {
        type: "p",
        html: "Excire's design goal is a smarter Lightroom catalog. That's its strength, and it also sets its limits: what it understands about a photo ends up as tags, ratings, groups and filters inside Classic. A few consequences follow from that.",
      },
      {
        type: "list",
        items: [
          "Keywords are a vocabulary, and vocabularies have edges. Automatic tagging is excellent for 'beach', 'dog' or 'portrait'. It will never write 'the quiet tension just before the gesture lands', because that isn't a keyword — even though it's exactly what you'll remember.",
          "Long descriptions are undocumented territory. Excire's examples are short phrases, and it doesn't publish which model powers its prompt search or how it handles long, multi-condition descriptions. If you tend to remember photos in full sentences, test exactly that during the trial.",
          "Culling is built around the shoot. Grouping by scenes and people, checking face sharpness, picking the best frame of a sequence — that's what a wedding or event workflow needs. It says much less about which photographs, across ten years of work, actually belong together.",
          "It stays inside Lightroom Classic. Photos in Google Photos, Dropbox or a folder outside the catalog are out of reach unless you also buy Excire Foto, which is a separate app.",
          "It stops at finding. There's no sequencing, no portfolio building, no conversation about a body of work and no view of the whole archive at once.",
        ],
      },
      {
        type: "h2",
        text: "Photoreka's Different Starting Point",
        id: "photorekas-different-starting-point",
      },
      {
        type: "p",
        html: "Photoreka's plugin isn't trying to be a better Lightroom catalog. It's a bridge from your catalog to a curation platform that sits on top of it.<br /><br /><strong>1. Search by meaning, with a mode for each kind of question.</strong> Every photo becomes an embedding — a numerical description of composition, light, palette, subject and mood. You search it in three modes: <strong>Broad</strong> for moods and styles, <strong>Adaptive</strong> for cultural references like 'Blade Runner-inspired', and <strong>Precise</strong>, which verifies each candidate against your conditions instead of just ranking by similarity. There's no query length limit.<br /><br /><strong>2. Your catalog stays exactly as it is.</strong> The plugin reads your catalog and never modifies your originals, your collections or your metadata. It sends small previews and metadata to Photoreka for analysis in the cloud; your full-resolution files never leave your computer.<br /><br /><strong>3. Finding is step one.</strong> From Lightroom you can send photos to Photoreka in one click and keep going: artistic scoring, a 3D map of your whole catalog, portfolio sequencing, and an assistant you can talk to about your work.",
      },
      {
        type: "quote",
        text: "Excire Search makes Lightroom Classic better at answering 'where is that photo?'. Photoreka is built for the question that comes after: 'which of these matter — and in what order?'",
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
        html: "Both plugins search by visual content without needing keywords first. Excire combines prompt search with similarity search and people search, all inside the Lightroom interface. Photoreka's <a href='/ai_photo_search/'>search</a> adds the three explicit modes described above, accepts descriptions of any length, and lets you use any photo as a query to find visually similar ones. The difference shows most with specific, multi-part memories — 'two people on a bench, one looking away, late light' — where Precise mode checks each condition instead of returning whatever is closest.",
      },
      {
        type: "p",
        html: "Where Excire is clearly ahead is <strong>people</strong>. Photoreka doesn't do face recognition, so 'every photo of my sister' is a job for Excire, or for Lightroom Classic's own People view.",
      },
      {
        type: "h3",
        text: "Keywords and Your Catalog",
        id: "keywords-and-your-catalog",
      },
      {
        type: "p",
        html: "This is the most practical difference between the two. Excire writes its tags into your Lightroom catalog fields, so they work with Classic's own filters and travel with your catalog. Photoreka deliberately doesn't touch your catalog metadata: its analysis lives in Photoreka, and the plugin brings search results back into Lightroom. If you want AI keywords permanently stored inside your catalog, Excire is the tool for that.",
      },
      {
        type: "h3",
        text: "Culling vs. Artistic Scoring",
        id: "culling-vs-scoring",
      },
      {
        type: "p",
        html: "Excire's culling, aesthetic ratings and face-sharpness checks are designed to get you from a full card to a clean selection quickly — and Lightroom Classic's own Assisted Culling now covers part of that ground too. Photoreka's <a href='/photo_scoring/'>scoring</a> answers a different question. It scores every photo across separate artistic dimensions — aesthetics, composition, narrative strength, originality, visual games, humor and candidness, plus subject clarity and commercial intent in commercial mode — and lets you sort by any one of them. A motion-blurred street frame with real energy can rank high on narrative while failing a sharpness check, which is how editors actually choose. Both tools detect duplicates.",
      },
      {
        type: "h3",
        text: "Seeing the Whole Catalog",
        id: "seeing-the-whole-catalog",
      },
      {
        type: "p",
        html: "Here the two products stop overlapping. From Lightroom Classic you can launch Photoreka's <a href='/ai_photo_organizer/#atlas'>3D Atlas</a>, which places your whole catalog in a navigable space clustered by visual similarity — the fastest way we know to see what you actually photograph, as opposed to what you think you photograph. On the web platform the same analysis feeds a <a href='/photography_portfolio_builder/'>portfolio builder</a> that selects and sequences a set under visual and narrative constraints, and a <a href='/photo_chat/'>conversational assistant</a> for reviewing a body of work. Excire has no equivalent to these, and isn't trying to.",
      },
      {
        type: "h3",
        text: "Privacy, Workflow and Price",
        id: "privacy-workflow-and-price",
      },
      {
        type: "p",
        html: "Excire runs fully offline; nothing leaves your machine. Photoreka needs an internet connection for the initial analysis and for search, analyzes small previews in the cloud — typically around 1,000 photos an hour while you keep working in Lightroom — and keeps your originals local. Excire is a one-time license with a 14-day trial. Photoreka's plugin is free with a Photoreka account, and you pay once per batch of analyzed photos, with no subscription. Excire requires Lightroom Classic 14 or newer; Photoreka's plugin works from Lightroom Classic 13.0.",
      },
      {
        type: "p",
        html: "One more honest note, on scale. Photoreka is designed for a curated body of work rather than every frame you've ever shot: up to around 20,000 photos is the sweet spot, and 50,000 is workable. If your catalog holds a decade of unculled weddings, cull first — with Excire, Lightroom's Assisted Culling or by hand — and bring the keepers to Photoreka.",
      },
      {
        type: "h3",
        text: "Where Excire Search Still Wins",
        id: "where-excire-search-still-wins",
      },
      {
        type: "p",
        html: "Fairness requires this section. Excire processes <strong>everything locally</strong>, which settles the question if cloud analysis is a hard no for you. It writes <strong>keywords into your catalog</strong>. It does <strong>people search</strong>, which Photoreka doesn't. It handles <strong>video</strong>; Photoreka is photography-only. Its culling tools — scene grouping and face sharpness — are aimed squarely at high-volume shoots. And it lives entirely inside Lightroom, so there's no second interface to learn.",
      },
      {
        type: "h2",
        text: "Which One Fits Your Catalog?",
        id: "which-one-fits-your-catalog",
      },
      {
        type: "list",
        items: [
          "Choose Excire Search if: you want everything inside Lightroom Classic and offline, you need people search, video or keywords written into the catalog, and your main job is finding and culling shoots.",
          "Choose Photoreka if: you remember photos in sentences rather than keywords, you want artistic scoring instead of a technical first pass, or your real goal isn't finding one photo — it's understanding, ranking and sequencing a body of work.",
          "Use both if: Excire already keeps your catalog tagged and culled, and what's missing is the editorial layer on top — which of your photographs are strongest, and what they say together.",
        ],
      },
      {
        type: "cta",
        eyebrow: "See it on a real catalog",
        title: "Try Photoreka's demo — nothing to install",
        text: "Three search modes, artistic scores and the 3D Atlas on a real archive, straight from the browser.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
      {
        type: "p",
        html: "One last note on philosophy. Excire's bet — that AI should make your existing Lightroom catalog smarter without taking anything away from you — is a good one, and it's why Photoreka's plugin never rewrites your metadata or moves your files either. Where we differ is on what the catalog is <em>for</em>. A catalog where every photo can be found is a solved retrieval problem. Deciding which ones deserve to be seen is the part that's still yours. Search is the floor. <strong>Curation is the point.</strong>",
      },
    ],
  },
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
        html: "PhotoPrism's search is a well-built filter language over indexed text and metadata: labels, captions, titles, keywords, people, colors, cameras, countries, dates, with AND/NOT operators. It's precise and fast within its vocabulary. Photoreka's <a href='/ai_photo_search/'>search</a> works against the image itself, in three explicit modes: <strong>Broad</strong> (pure embedding similarity, for moods and styles), <strong>Adaptive</strong> (expands cultural references like 'Blade Runner-inspired' into their implicit visual vocabulary), and <strong>Precise</strong> (a logical inference layer that <em>verifies</em> each result against your conditions — 'exactly three people, one looking away' means exactly that). There's no query length limit, so a long, specific description isn't silently truncated.",
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
        html: "PhotoPrism's 1–5 score exists to decide what deserves to be <em>in</em> your library. Photoreka's <a href='/photo_scoring/'>scoring</a> exists to decide what deserves to be <em>seen</em>, and keeps the dimensions separate rather than collapsing them into one number: aesthetics, composition, narrative strength, originality, visual games, humor, candidness, plus subject clarity and commercial intent for commercial work. That separation is the point — the same catalog ranks differently for a gallery submission than for a stock pitch, and a single global score can't express that.",
      },
      {
        type: "h3",
        text: "Beyond Organization",
        id: "beyond-organization",
      },
      {
        type: "p",
        html: "Here the two products stop overlapping entirely. Photoreka includes a <a href='/photography_portfolio_builder/'>portfolio builder</a> that selects and sequences 10–40 images under coherence constraints (visual, chromatic, narrative), a <a href='/photo_chat/'>conversational assistant</a> that can critique your portfolio and track how your work evolves, <a href='/ai_photo_organizer/#reports'>style and pattern reports</a>, and a <a href='/ai_photo_organizer/#atlas'>2D/3D atlas</a> that renders your entire archive as a navigable space rather than an infinite scroll. PhotoPrism has no equivalent, and shouldn't be criticized for it — a library server's job ends where the editing decisions begin.",
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
        html: "An honest comparison starts here. digiKam's core strength is being a <strong>complete, self-hosted digital asset manager</strong>: SQLite or MariaDB under the hood, hierarchical tags, ratings, color and pick labels, versioning, and a metadata engine that survives you switching software. Its AI features have come a long way, too — recent versions do face detection and recognition with an ensemble classifier, auto-tag assignment powered by YOLOv11 and EfficientNet models, and an Image Quality Scanner that flags images by blur, noise, exposure, and compression. And the upcoming 9.2 release adds natural-language search built on a <em>local</em> LLM, so nothing leaves your machine.",
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
        html: "digiKam offers keyword search, a powerful advanced-search builder, similarity search, and, from version 9.2, local-LLM natural language search — all of it ultimately resolved against database fields. Photoreka's <a href='/ai_photo_search/'>search</a> runs against the image itself, in three explicit modes: <strong>Broad</strong> (pure embedding similarity, for moods and styles), <strong>Adaptive</strong> (expands cultural references like 'Blade Runner-inspired' into their implicit visual vocabulary), and <strong>Precise</strong> (a logical inference layer that <em>verifies</em> each result against your conditions — 'exactly three people, one looking away' means exactly that). There's no query length limit, so a long, specific description isn't silently truncated.",
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
        html: "This is the sharpest contrast between the two tools. digiKam's Image Quality Scanner assigns pick labels based on measurable defects — blurry, noisy, badly exposed, over-compressed. That's genuinely useful for a first culling pass. Photoreka's <a href='/photo_scoring/'>scoring</a> asks an entirely different question, and keeps the dimensions separate: aesthetics, composition, narrative strength, originality, visual games, humor, candidness, plus subject clarity and commercial intent for commercial work. A technically flawless photograph can score badly, and a slightly soft one can score brilliantly — which is exactly how editors actually choose.",
      },
      {
        type: "h3",
        text: "Beyond Organization",
        id: "beyond-organization",
      },
      {
        type: "p",
        html: "Here the two products stop overlapping altogether. Photoreka includes a <a href='/photography_portfolio_builder/'>portfolio builder</a> that selects and sequences 10–40 images under coherence constraints (visual, chromatic, narrative), a <a href='/photo_chat/'>conversational assistant</a> that can critique your portfolio and track how your work evolves, <a href='/ai_photo_organizer/#reports'>style and pattern reports</a>, and a <a href='/ai_photo_organizer/#atlas'>2D/3D atlas</a> that renders your entire archive as a navigable space instead of a scrolling grid. digiKam has no equivalent to any of these, because none of them were ever part of what a DAM is for.",
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
          "Mac-only at its core. There is no Windows or Linux version of the app. A newer web app lets you reach a library from any browser, but the library still has to be indexed and analyzed by Peakto on a Mac. Roughly two out of three photographers edit on Windows.",
          "Mostly subscription-priced. There is a Standard lifetime license, but the main plans are monthly, yearly or two-yearly subscriptions, so the intelligence layer over your own archive tends to become a recurring cost.",
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
        html: "Both tools offer semantic search over untagged photos. Peakto's is single-mode and associative. Photoreka offers <a href='/ai_photo_search/'>three explicit modes</a>: <strong>Broad</strong> (pure embedding similarity, for moods and styles), <strong>Adaptive</strong> (expands cultural references like 'Blade Runner-inspired' into their implicit visual vocabulary), and <strong>Precise</strong> (a logical inference layer that <em>verifies</em> each result against your conditions — 'exactly three people, one looking away' means exactly that). There is no query length limit, unlike CLIP-based tools that silently truncate long descriptions at ~77 tokens.",
      },
      {
        type: "h3",
        text: "Scoring and Aesthetic Analysis",
        id: "scoring-and-aesthetic-analysis",
      },
      {
        type: "p",
        html: "Peakto computes an aesthetic score that blends aesthetics, composition, and technique into a global number used by its Panorama view. Photoreka's <a href='/photo_scoring/'>scoring</a> keeps the dimensions separate — aesthetics, composition, narrative strength, originality, visual games, humor, candidness, plus subject clarity and commercial intent for commercial work — so you can rank the same catalog differently for a gallery submission than for a stock pitch.",
      },
      {
        type: "h3",
        text: "Beyond Organization",
        id: "beyond-organization",
      },
      {
        type: "p",
        html: "This is where the two products stop overlapping. Photoreka includes a <a href='/photography_portfolio_builder/'>portfolio builder</a> that selects and sequences 10–40 images under coherence constraints (visual, chromatic, narrative), a <a href='/photo_chat/'>conversational assistant</a> that can critique your portfolio and track your evolution over time, <a href='/ai_photo_organizer/#reports'>style and pattern reports</a>, and a <a href='/ai_photo_organizer/#atlas'>2D/3D atlas</a> that renders the entire archive as a navigable space. Peakto's Panorama offers a taste of that spatial idea; the Atlas is built around it.",
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
        src: "/atlas/2d_detail.webp",
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
        src: "/atlas/3d_detail.webp",
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
        html: "<a href='/photo_chat/'>ChatLab</a> was born from a very specific need: we wanted to talk to an entire catalog—not just one photo, but a complete body of work. And when we looked for someone already doing it, the surprise was: nobody was. Yes, some chatbots can describe a single image quite well; none knows your catalog, your style, or your evolution. So we built it inside Photoreka, on the same architectural principles that power modern AI agents: frontier models, RAG, and a solid toolkit.",
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
        html: "ChatLab works across your entire catalog. It can measure proportions (<em>“Do I photograph more men or women?”</em>), trace your evolution over time, read clusters and imbalances that no individual image contains, and combine all of that with the <a href='/photo_scoring/'>artistic scores</a> assigned to each photo. It doesn't answer with impressions—it answers with your entire archive in hand.",
      },
      {
        type: "image",
        alt: "Example conversation with ChatLab: a compound query combining semantic search, filters, and ranking, followed by the chat's answer with a curated photo selection",
        caption: "Example Conversation with ChatLab",
        src: "/chatlab/conversacion.webp",
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
        html: "This idea of treating an archive as a whole isn't unique to ChatLab: it's the principle that organizes all of Photoreka, and the <a href='/ai_photo_organizer/#atlas'>2D/3D Atlas</a> is its most visual expression. The Atlas turns your catalog into a navigable map—a universe of points where similar images cluster together and different ones drift apart—allowing you to <strong>see</strong> the overall shape of your work at a glance: where it concentrates, where the gaps are, what clusters exist. That same map is one of the spaces ChatLab can explore on your behalf when you ask about the archive as a whole. But the chat goes further: beyond the spatial view, it combines tags, scores, temporal evolution, and even web information when needed, then answers with a judgment built from all of that—not just by pointing at a region of the map.",
      },
      {
        type: "image",
        alt: "2D Atlas displaying the entire catalog as a map of clusters alongside a ChatLab conversation asking about those same regions",
        caption:
          "The 2D Atlas: the closest visual representation of how ChatLab sees your entire archive.",
        src: "/atlas/2d.webp",
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
        src: "/chatlab/diagram.webp",
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
        html: "Building assistants for other products taught us a lesson that keeps repeating itself: when a dashboard has a chat, users eventually gravitate toward the chat. The same happens with ChatLab, and it makes sense—it can do, to a large extent, almost everything you'd do in a photo organizer: search, compare, group, analyze. To be fair, there are limits: each response can only cover so much, and every conversation consumes frontier-model tokens, so for large-scale exploration the dedicated tools—<a href='/ai_photo_search/'>Search</a>, the <a href='/ai_photo_organizer/#atlas'>Atlas</a>, the Workspace—remain more efficient and, above all, give you greater control. But its role as the <strong>orchestrator of the entire organizer</strong> is undeniable.",
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
        src: "/chatlab/actions.webp",
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
  {
    slug: "how-to-choose-photos-for-a-photo-contest",
    title: "How to Choose Which Photos to Enter in a Photography Contest",
    excerpt:
      "Most contest entries don't lose because they are bad photos. They lose because they were the wrong photos to send. A practical way to shortlist like a jury: read the brief first, pass the first-glance test, and get a critique instead of a vote.",
    description:
      "A practical guide to choosing your photography competition entries: how judges screen images, the thumbnail test, genre fit, originality, technical checks, series vs singles, and how AI can shortlist hundreds of photos.",
    keywords:
      "how to choose photos for a photo contest, which photo to enter in a photography competition, photography competition tips, photo contest entry selection, how photo contests are judged, choose best photos for competition, photography award submission tips, street photography competition entry, ai photo critique, ai photo picker",
    category: "Photography Tips",
    tags: ["Photo Contests", "Photo Selection", "Photo Critique", "Picks"],
    coverImage: "/blog/photo_contest_selection.png",
    publishedAt: "2026-10-09",
    readingMinutes: 7,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Most photographers spend weeks on a contest entry and about ten minutes choosing it. They open the folder, scroll until something feels right, and send the photo they remember best. The result is predictable: <strong>most entries don't lose because they are bad photos, they lose because they were the wrong photos to send.</strong> A strong frame in the wrong category, a beautiful image the jury has seen five hundred times, a picture that only works at full screen when the first round is judged on a grid of thumbnails.",
      },
      {
        type: "p",
        html: "Choosing well is a separate skill from shooting well, and it can be learned. This is the process we recommend, from reading the brief to sending the file.",
      },
      {
        type: "h2",
        text: "Read the Brief Before You Open Your Archive",
        id: "read-the-brief",
      },
      {
        type: "p",
        html: "The brief decides what a winning photo looks like before any judge does. Read it twice and write down, in your own words, what each category is really asking for. A “street” category that also accepts staged portraits is a different contest from one that requires candid moments. A theme such as “resilience” will be read literally by some juries and metaphorically by others; past winners are the best evidence of which one you are facing.",
      },
      {
        type: "list",
        items: [
          "Category definitions: what belongs, and what is explicitly excluded.",
          "Editing rules: many documentary and nature competitions forbid adding or removing elements, and some ask for the original raw file if you reach the final round.",
          "Rules on AI-generated or AI-edited images, which are now common and strictly enforced.",
          "Number of entries, whether a series is allowed, and whether entries can be previously published or awarded.",
          "Technical specs: file size, long edge, colour space, and naming conventions.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Look at the last two years of winners",
        html: "Not to copy them, but to calibrate. You will see which genres the jury rewards, how much post-processing they accept, and which subjects already won, which makes a near-identical entry much harder to justify.",
      },
      {
        type: "h2",
        text: "Build a Long List Fast, Without Filtering by Memory",
        id: "build-a-long-list",
      },
      {
        type: "p",
        html: "Your memory of a shoot is a poor index of your archive. You remember the photos that were hard to take, the trips that mattered, and the frames people praised, and none of those is the same as your strongest image. So start wide: pull every photo that could plausibly fit the brief into one folder, even the ones you are unsure about. For most photographers that means a long list of 30 to 100 candidates, sometimes drawn from several thousand frames.",
      },
      {
        type: "p",
        html: "This is the step where most people give up and fall back on the three photos they always send. If your archive is large, it is also where a tool helps most: an <a href='/ai_photo_picks/'>AI photo picker</a> can rank thousands of frames in minutes and surface strong images you had forgotten, so your long list is built from the whole archive rather than from what you happen to remember. We cover the general workflow in <a href='/blog/how-to-pick-your-best-photos/'>how to pick your best photos from hundreds of shots</a>.",
      },
      {
        type: "h2",
        text: "Pass the First-Glance Test",
        id: "first-glance-test",
      },
      {
        type: "p",
        html: "Large competitions receive thousands of entries, and the first round is usually a fast screening on a screen, often on a grid of small images. A judge may spend only a few seconds on each photo before deciding whether it moves on. <strong>Your photo has to earn a second look before it can win on its subtleties.</strong>",
      },
      {
        type: "p",
        html: "Test it the same way. Put your long list on a grid at thumbnail size, step back, and note which images still read: a clear subject, a strong shape, a striking light or colour, a gesture you understand instantly. Photos whose power depends on a small detail, a caption, or knowing the story behind them tend to fall at this stage, however good they are at full size.",
      },
      {
        type: "h2",
        text: "Judge the Frame, Not the Memory",
        id: "judge-the-frame",
      },
      {
        type: "p",
        html: "The hardest bias to escape is the back-story. You know how cold it was, how long you waited, how rare the moment felt. The jury knows none of that; they only see the rectangle. For each candidate, ask one question: <em>if a stranger had taken this, would I still put it on the shortlist?</em> If the answer depends on something outside the frame, the photo is probably weaker than it feels.",
      },
      {
        type: "h2",
        text: "Score Each Candidate Against What Juries Reward",
        id: "what-juries-reward",
      },
      {
        type: "p",
        html: "Every competition words it differently, but most juries weigh a similar set of qualities. Scoring your shortlist on them, even roughly from 1 to 10, forces you to compare photos on the same terms instead of on mood:",
      },
      {
        type: "list",
        items: [
          "Impact: does the photo stop you, and does it hold you after the first second?",
          "Composition: is every element in the frame working, with clean edges and a clear reading order?",
          "Storytelling and message: does the image say something, or only show something?",
          "Originality: has the jury seen this subject, from this angle, many times this year?",
          "Moment and spontaneity: in street and documentary work especially, is it a decisive moment or a well-lit scene?",
          "Technical execution: focus where it matters, controlled highlights, an edit that serves the image rather than announcing itself.",
        ],
      },
      {
        type: "p",
        html: "Then weigh those scores for the category. A street jury will forgive some noise for a perfect gesture; a landscape jury will not forgive blown highlights for a nice composition. The same photo can be a finalist in one category and an early cut in another, which is why it is worth checking where each candidate is strongest before deciding where to enter it.",
      },
      {
        type: "h2",
        text: "Ask for a Critique, Not a Vote",
        id: "critique-not-vote",
      },
      {
        type: "p",
        html: "Asking friends “which one do you like?” gives you a popularity vote, and popularity rewards bright colours, cute subjects and familiar views. What you need is a <strong>reason</strong>: what makes the frame work, and what holds it back. A critique such as “the split frame creates a clever visual rhyme, but the right edge cuts the figure's arm” tells you both whether to send the photo and how to improve it before you do. Ask a photographer you trust, a club, or a mentor, and ask them to explain their ranking.",
      },
      {
        type: "h2",
        text: "Singles vs Series",
        id: "singles-vs-series",
      },
      {
        type: "p",
        html: "If the contest accepts series, judge the set as a whole. A series is only as strong as its weakest image, and juries notice repetition fast: two photos that make the same point weaken each other. Look for consistency of tone and treatment, a sequence that builds, and a final image that closes the story. When in doubt, a tight series of five beats a loose series of ten.",
      },
      {
        type: "h2",
        text: "Final Technical Checks",
        id: "technical-checks",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "View the final file at 100% and look for sensor dust, halos from sharpening, and banding in skies.",
          "Check the edit against the rules: no added or removed elements if the category forbids it.",
          "Export to the exact specs, in the requested colour space, and keep the original raw file ready.",
          "Write the title and caption carefully; in documentary categories they are part of the entry.",
          "Re-read the deadline and the time zone.",
        ],
      },
      {
        type: "h2",
        text: "Where AI Fits in the Selection",
        id: "where-ai-fits",
      },
      {
        type: "p",
        html: "AI will not choose your entry for you, and it shouldn't: it does not know the theme, the jury, or what you are trying to say. Where it is genuinely useful is in the two slowest steps: <strong>going through the whole archive</strong> to build the long list, and giving you a <strong>consistent second opinion</strong> on each candidate. <a href='/ai_photo_picks/'>Photoreka Picks</a> does exactly that: you drop up to 5,000 photos, an AI jury scores every frame on eight artistic criteria and writes a short critique for each one, and you can rank the results through genre juries such as street or documentary, or through award juries that only keep photos above a high bar.",
      },
      {
        type: "cta",
        eyebrow: "Build your shortlist",
        title: "Let an AI jury pre-select your contest entries",
        text: "Try Picks free with 10 of your own photos: scores, a written critique for each frame and every jury. No account, no card.",
        buttonLabel: "Discover Picks",
        action: "link",
        href: "/ai_photo_picks/",
      },
      {
        type: "p",
        html: "Whatever tools you use, the principle is the same: read the brief, search the whole archive, test at a glance, and choose with reasons rather than memories. The photo that wins is often not the one you love most; it is the one that makes a stranger stop.",
      },
    ],
  },
  {
    slug: "how-to-pick-your-best-photos",
    title: "How to Pick Your Best Photos from Hundreds of Shots",
    excerpt:
      "You came back with 800 photos and you know there are ten great ones in there. A practical editing workflow to find them: separate culling from selecting, let the photos cool down, compare like with like, and choose with criteria instead of memories.",
    description:
      "A step-by-step workflow to pick your best photos from a trip, a shoot or a whole archive: culling vs selecting, the two-pass method, criteria for choosing, common traps, and how AI photo pickers can help.",
    keywords:
      "how to pick your best photos, how to choose best photos from a shoot, find my best photos, choose best photos from trip, photo selection workflow, photo editing selection tips, cull and select photos, how to choose photos for portfolio, ai photo picker, best photo selector",
    category: "Photography Tips",
    tags: ["Photo Selection", "Photo Culling", "Portfolio", "Picks"],
    coverImage: "/blog/pick_best_photos.png",
    publishedAt: "2026-10-09",
    readingMinutes: 6,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "You came back from a trip, a wedding or a long weekend of street photography with 800 frames. Somewhere in there are the ten photos you will still be proud of in five years, and most of them will never be seen, because the folder is too big to face. Choosing is the part of photography nobody teaches, and it matters as much as pressing the shutter: <strong>the photographer is judged by the photos they show, not the photos they took.</strong>",
      },
      {
        type: "h2",
        text: "Separate Culling from Selecting",
        id: "culling-vs-selecting",
      },
      {
        type: "p",
        html: "The most common mistake is trying to do two jobs at once. <strong>Culling</strong> is removing what failed: missed focus, motion blur, closed eyes, bad exposure, and the twenty near-identical frames of the same burst. <strong>Selecting</strong> is choosing what is genuinely good among what remains. Culling is fast and mostly technical; selecting is slow and mostly artistic. Mixing them makes both worse: you agonise over obvious rejects and rush the decisions that matter.",
      },
      {
        type: "h2",
        text: "Pass One: Cull Fast",
        id: "cull-fast",
      },
      {
        type: "p",
        html: "Go through everything once, quickly, with one rule: reject only what is clearly broken or redundant. Use a single flag or a one-star rating and do not stop to compare. For bursts and sequences, keep the best one or two frames of each moment and drop the rest. Expect to remove half of the shoot or more. If you work in a catalog such as Lightroom, this is also where <a href='/ai_photo_culling/'>AI culling tools</a> save the most time, because technical defects are exactly what software detects well.",
      },
      {
        type: "h2",
        text: "Let the Photos Cool Down",
        id: "cool-down",
      },
      {
        type: "p",
        html: "Right after a shoot, every photo is attached to a memory: the effort, the place, the people. That attachment is the enemy of a good selection. If you can, wait a few days before the second pass. Photos that still stand out after the excitement has faded are usually the real ones; photos you liked because of how they felt to take tend to fade with the memory.",
      },
      {
        type: "h2",
        text: "Pass Two: Select with Criteria",
        id: "select-with-criteria",
      },
      {
        type: "p",
        html: "Now slow down. For each remaining photo, ask the questions an editor would ask, rather than “do I like it?”:",
      },
      {
        type: "list",
        items: [
          "Aesthetics: is the light, colour and tone working for the image?",
          "Composition: does the eye know where to go, and is anything at the edges stealing attention?",
          "Storytelling: does the photo say something about the place, the person or the moment?",
          "Originality: is this your view, or the view everyone takes from the same spot?",
          "Moment: is there a gesture, an expression or a coincidence that will never happen again?",
        ],
      },
      {
        type: "p",
        html: "Giving each photo a rough score on these criteria sounds mechanical, but it does something useful: it makes you compare a landscape and a portrait on the same terms, and it exposes photos that are technically perfect but say nothing.",
      },
      {
        type: "h2",
        text: "Compare Like with Like",
        id: "compare-like-with-like",
      },
      {
        type: "p",
        html: "Put similar photos side by side: the three versions of the same street corner, the five portraits of the same person. Choose one per moment. Then compare the winners across moments. Seeing two frames together reveals differences you miss when viewing them one by one: a cleaner background, a better gesture, a horizon that is not quite level.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "The stranger test",
        html: "For every photo you keep, ask: if a stranger had taken this, would it still make my shortlist? If the answer depends on knowing the story behind it, it belongs in your personal album, not in your portfolio.",
      },
      {
        type: "h2",
        text: "Decide How Many You Need",
        id: "how-many",
      },
      {
        type: "p",
        html: "The right number depends on where the photos are going, and deciding it in advance makes the last cuts much easier:",
      },
      {
        type: "list",
        items: [
          "A social post or a message to friends: one to ten photos.",
          "A portfolio project or a series: usually ten to twenty images that work together.",
          "A photo book or a family album of a long trip: a larger edit, but still built from the strongest frame of each moment.",
          "A competition entry: the handful of images that fit the brief best.",
        ],
      },
      {
        type: "p",
        html: "Competitions are a special case, because the brief and the jury matter as much as the photo. We cover it in detail in <a href='/blog/how-to-choose-photos-for-a-photo-contest/'>how to choose which photos to enter in a photo contest</a>.",
      },
      {
        type: "h2",
        text: "Common Traps",
        id: "common-traps",
      },
      {
        type: "list",
        items: [
          "Keeping the photo that was hardest to take instead of the one that is best to look at.",
          "Choosing technical perfection over a strong moment with a little noise or softness.",
          "Keeping several near-identical frames because you cannot decide; they weaken each other.",
          "Selecting only from the last shoot and forgetting the strong photos already sitting in your archive.",
        ],
      },
      {
        type: "h2",
        text: "Where AI Can Help",
        id: "where-ai-can-help",
      },
      {
        type: "p",
        html: "There are two kinds of AI tools for this job, and they solve different steps. Culling tools look for technical defects and duplicates, which is ideal for pass one. AI photo pickers judge artistic qualities, which helps with pass two and with digging through a large archive. <a href='/ai_photo_picks/'>Photoreka Picks</a> is the second kind: you drop up to 5,000 photos, an AI jury scores each one on eight artistic criteria (aesthetics, composition, storytelling, originality, message, humor, visual games and spontaneity) and writes a one- or two-sentence critique explaining its score. You can then switch between street, documentary, landscape or award juries and watch the ranking reorder itself. Your originals never leave your device: only a small thumbnail of each photo is sent for judging.",
      },
      {
        type: "p",
        html: "Use it as a second opinion, not a verdict. The value is not that the AI is always right, but that it looks at every frame with the same eye, never gets tired at photo 600, and has no memory of how cold it was when you took the shot. If you want the same scoring permanently across your whole catalog, that is what <a href='/photo_scoring/'>Photoreka's Photo Scoring</a> does inside an account.",
      },
      {
        type: "cta",
        eyebrow: "Find your best photos",
        title: "Let an AI jury rank your next shoot",
        text: "Try Picks free with 10 of your own photos: scores on eight criteria and a written critique for every frame. No account, no card.",
        buttonLabel: "Discover Picks",
        action: "link",
        href: "/ai_photo_picks/",
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
