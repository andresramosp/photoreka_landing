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
    slug: "ask-photos-vs-photoreka-chatlab",
    title: "Ask Photos vs Photoreka ChatLab: Chat With Your Photo Library",
    excerpt:
      "Google's Ask Photos lets you talk to your camera roll in plain language. Photoreka's ChatLab lets you talk to a curated body of work. They share a verb and almost nothing else. An honest comparison of what each one knows about your photos, the questions each can answer, and when to use both.",
    description:
      "Ask Photos vs Photoreka ChatLab: two ways to chat with your photo library. What Google's Gemini-powered search does well, what a photographer's AI assistant adds, and when to use both.",
    keywords:
      "ask photos, google photos ask photos, ask photos vs photoreka, ask photos alternative, chat with your photo library, chat with my photos ai, ai that answers questions about my photos, ai photo assistant, gemini google photos search, chat with photo catalog, photoreka chatlab",
    category: "Comparisons",
    tags: [
      "Comparisons",
      "Ask Photos",
      "Google Photos",
      "ChatLab",
      "AI Photo Assistant",
    ],
    coverImage: "/blog/ask_photos_vs_chatlab.png",
    publishedAt: "2026-11-11",
    readingMinutes: 8,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "“Chat with your photos” used to be a demo at a developer conference. In 2026 it is a button. Google Photos now has <strong>Ask Photos</strong>, a Gemini-powered way to search and question your library in plain language, and a growing crowd of apps let you upload one picture and talk to it. Photographers, meanwhile, have started asking a different question of their archives: not <em>where is that photo</em>, but <em>what is this body of work, and which of it is any good?</em>",
      },
      {
        type: "p",
        html: "That second question is what <a href='/photo_chat/'>ChatLab</a>, Photoreka's AI photo assistant, was built for. So it is worth being precise about how it compares with Ask Photos, because the two share a verb and very little else. This is not a review of which chat is smarter. It is a map of which questions each one can answer.",
      },
      {
        type: "callout",
        variant: "info",
        title: "The short answer",
        html: "Ask Photos is the best way to talk to a camera roll: it finds moments, people and places in your backed-up Google Photos library, chats about a single picture and edits it on request. ChatLab talks to a curated catalog of up to 50,000 photos that have already been scored on eight artistic criteria, and answers editorial questions: which frames are strongest, what you keep repeating, how your style has changed and in what order a set should go. Family archive: Ask Photos. Body of work: ChatLab. Many photographers will end up with both.",
      },
      {
        type: "h2",
        text: "What Ask Photos Is (and Isn't)",
        id: "what-ask-photos-is",
      },
      {
        type: "p",
        html: "Ask Photos is Google's conversational layer on top of Google Photos search, powered by Gemini. Instead of typing “beach”, you describe what you want or ask a question, and it answers using what Google already knows about your library: the people in your face groups, places, dates, and what its models see in the frames. According to Google's own help pages and tips, you can:",
      },
      {
        type: "list",
        items: [
          "Search by describing: “find my photos that feel like spring”, “photos that'd make great phone backgrounds”.",
          "Ask questions about photos and albums and follow up in the same thread: “what did I eat on my trip to Barcelona?”, then narrow the results down.",
          "Tap Ask on a single photo to chat about it, identify what is in it (“what flowers are these?”, “what hiking trail is this?”) or find similar photos.",
          "Edit by describing the change: “can you remove my sunglasses?”.",
          "Give it facts to use later, through a Remember List.",
        ],
      },
      {
        type: "p",
        html: "For complex questions it first shows a page of relevant results and keeps refining them in the background, and you can switch back to classic search at any time. Google is candid that the feature is experimental and can be wrong. There are also practical conditions: it only works on photos that are backed up to Google Photos, it is rolling out to a limited list of countries and languages, it lives in the Google Photos app on Android and iOS, and onboarding asks you to confirm your own face group. A November 2026 teardown by Android Authority found multi-step tasks in testing (search, enhance, create an album and a collage in one request), but Google has not announced them, so treat that as a direction rather than a feature.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Who should just use Ask Photos",
        html: "If your photos live in Google Photos because that is where your phone puts them, and the questions you ask are about life (who, where, when, what was that dish) rather than about photography, Ask Photos is the right tool and it is already in your pocket. Nothing below suggests otherwise.",
      },
      {
        type: "h2",
        text: "The Unit of Work: a Moment vs a Body of Work",
        id: "moment-vs-body-of-work",
      },
      {
        type: "p",
        html: "The real difference is not the model behind the chat. It is what each product thinks a photo library <em>is</em>. For Google Photos the library is a record of your life, and the unit is the moment: a trip, a birthday, a person, a dish. Every feature, from face groups to Memories, exists to retrieve moments, and Ask Photos is the most fluent retriever Google has built. For Photoreka the library is a body of work, and the unit is the photographer: the frames you kept, what they say together, where they are strong and where they repeat themselves. We wrote about why that matters in <a href='/blog/can-ai-review-a-photography-portfolio/'>Can AI review a photography portfolio?</a>: a review judges the set, not twenty frames in a row.",
      },
      {
        type: "p",
        html: "That changes what has to be known about each photo before the conversation starts. Ask Photos knows faces, places, dates and what is in the picture. When a photo enters Photoreka it is scored from 1 to 10 on eight artistic criteria (aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity), embedded so it can be found by meaning rather than by label, and placed in relation to every other photo in the catalog. ChatLab reasons over that layer. It can tell you that a frame sits in your top 5% for composition but your bottom half for originality, because that number exists before you ask.",
      },
      {
        type: "image",
        alt: "Two kinds of question to a photo library: above, a camera-roll question that retrieves one moment, the photo with sunflowers on the tube; below, a body-of-work question that returns six street photographs in a deliberate order, with notes on what recurs, the palette and where to open and close",
        caption: "Same verb, different questions: retrieving a moment vs reading a body of work",
        src: "/blog/ask_photos_vs_chatlab_questions.webp",
      },
      {
        type: "h2",
        text: "How Deep the Analysis Goes",
        id: "how-deep-the-analysis-goes",
      },
      {
        type: "p",
        html: "This is the part that matters most to photographers, so it deserves precision rather than a sales line. Google describes Ask Photos as Gemini understanding “what is happening in each photo”, on top of what Google Photos search already extracts: objects, places, faces and text read from the image. It can pick a “best” photo from a trip or suggest frames for a highlight, but Google publishes no criteria for that choice, shows no score, and does not explain why one frame beat another. User complaints point the same way: the answer is a short curated page of results rather than an account of your work, and a recent teardown describes the current product as “a glorified conversational search bar”. It is very good at the question it was built for, which is retrieval.",
      },
      {
        type: "p",
        html: "Photoreka starts from a different kind of analysis, done on every photo before you ask anything:",
      },
      {
        type: "list",
        items: [
          "Eight artistic scores per photo, from 1 to 10: aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity. They are stored, so any two photos in your catalog can be compared on any criterion, and a ranking always comes with a stated reason.",
          "Judgment relative to you. Each photo is judged against the rest of your catalog, not against the internet, which is why ChatLab can say “this is in your top 5% for composition and your bottom half for originality”.",
          "A semantic index of each image rather than a list of labels, so “the frame where the light went strange” is a valid search and “golden light portraits, but not the ones from the wedding” is a valid filter.",
          "Catalog-level statistics: which subjects, distances, lighting and palettes dominate your work, and how each has moved year by year.",
          "Near-duplicate detection, so a review is not distorted by twelve versions of the same moment.",
          "Sequencing with explicit coherence modes (visual, chromatic, narrative), so “order these for a wall” returns an order with a logic you can argue with.",
        ],
      },
      {
        type: "p",
        html: "The practical difference shows up in the answer. Ask a camera roll for your best photo of Lisbon and you get a nice photo of Lisbon. Ask ChatLab and you get the frame, its score on each criterion, how it compares with the rest of the trip, which near-duplicates it beat and why, and an offer to build the sequence around it. One is a search result. The other is the start of an edit.",
      },
      {
        type: "h2",
        text: "Side by Side",
        id: "side-by-side",
      },
      {
        type: "list",
        items: [
          "Library: Ask Photos works on your backed-up Google Photos library, whatever its size. ChatLab works on a catalog you build in Photoreka from Lightroom Classic, local folders, Google Photos, Google Drive or Dropbox, designed for a body of work of up to 50,000 photos.",
          "What it knows about each photo: Ask Photos uses faces, places, dates and what Gemini sees in the image. ChatLab uses eight artistic scores, semantic embeddings, metadata and, when a question needs it, the image itself.",
          "Places: both know where a photo was taken when the file carries GPS, which phone photos always do. Camera and archive photos usually don't, and there Photoreka goes further: Geo Recovery infers the location from the image itself, lets you check each marker on a map and writes the coordinates back into the EXIF, so “my work from the Atlantic coast” is a valid question even for a 2009 DSLR folder.",
          "Questions it is built for: Ask Photos answers “find”, “what is this” and “edit this”. ChatLab answers “which are my strongest”, “what do I keep repeating”, “how has my work changed since 2022”, “sequence these for a wall”.",
          "The answer: Ask Photos returns a page of results, refined as you talk, plus a text reply. ChatLab returns text plus a ranked, intentionally ordered set of your photos, where the order itself is part of the answer: a quality ranking, a narrative sequence, a before and after.",
          "Editing: Ask Photos edits pixels on request. ChatLab does not touch your files; it selects, orders, compares and explains.",
          "Where it runs: Ask Photos is in the Google Photos app on Android and iOS, in supported countries and languages. ChatLab runs in the browser wherever Photoreka does, and answers in the language you write in.",
          "Custody: Google Photos already holds your backup, so Ask Photos adds nothing new to hand over. Photoreka works from compressed previews and never asks to become your storage.",
          "Price: Ask Photos is included with Google Photos. ChatLab is part of Photoreka, which is free to start.",
        ],
      },
      {
        type: "h2",
        text: "Questions Each One Answers Well",
        id: "questions-each-one-answers",
      },
      {
        type: "h3",
        text: "Things to ask Ask Photos",
        id: "things-to-ask-ask-photos",
      },
      {
        type: "list",
        items: [
          "What did I eat on my trip to Barcelona?",
          "What themes have we had for Lena's birthday parties?",
          "Which of these would make a good phone background?",
          "What is the name of this trail?",
          "Remove the sunglasses from this one.",
        ],
      },
      {
        type: "h3",
        text: "Things to ask ChatLab",
        id: "things-to-ask-chatlab",
      },
      {
        type: "list",
        items: [
          "Pick my ten strongest frames from the last two years and tell me why.",
          "What subjects, distances and kinds of light do I keep returning to?",
          "How has my work changed since 2022, with examples from each year?",
          "Build a twelve-image sequence for a wall from my Vietnam trip.",
          "Where is this project weak, and what would an editor ask me to shoot next?",
        ],
      },
      {
        type: "p",
        html: "Notice the shape of the two lists. The first asks the library to remember something you once knew. The second asks it to notice something you don't yet know about yourself. Both are legitimate uses of a photo library. They need different machinery, and a search box that understands sentences, however good, is still the first kind.",
      },
      {
        type: "h2",
        text: "Where Ask Photos Still Wins",
        id: "where-ask-photos-still-wins",
      },
      {
        type: "p",
        html: "Fairness first. Ask Photos <strong>knows who people are</strong>; Photoreka does no face recognition. It <strong>edits</strong>. It handles <strong>video</strong>; Photoreka is photography only. It works on the whole camera roll, <strong>including the frames you would never keep</strong>, which is precisely the part ChatLab is not designed for. And it comes with a product you probably already use. If what you want is a better memory, Ask Photos is a better memory.",
      },
      {
        type: "h2",
        text: "Use Both",
        id: "use-both",
      },
      {
        type: "p",
        html: "The two are not competing for the same photos. Google Photos is a good home for the camera roll: everything, backed up, searchable by the events of your life. The body of work is a subset of that, the frames you would actually show, and it deserves a different kind of attention. Photoreka connects to Google Photos through Google's own photo picker, so you choose the albums or photos that belong to the work and leave the rest where it is. From then on ChatLab has your catalog and Ask Photos has your life. We explain why that split is deliberate in <a href='/blog/culling-is-not-editing/'>Culling is not editing</a>.",
      },
      {
        type: "list",
        items: [
          "Choose Ask Photos if: your photos are a record of your life, they live in Google Photos, and your questions are who, where, when and what.",
          "Choose ChatLab if: you are a photographer with a body of work, and your questions are which, why, how it has changed and in what order.",
          "Use both if: Google Photos is the backup, and what is missing is not a memory but a judgment.",
        ],
      },
      {
        type: "cta",
        eyebrow: "Try it on a real catalog",
        title: "Chat with a photographer's library, no account needed",
        text: "ChatLab's demo runs on a real body of work: ask for the strongest frames, a sequence or an honest review.",
        buttonLabel: "Open the ChatLab demo",
        action: "link",
        href: "https://app.photoreka.com/demo/chat-lab",
      },
      {
        type: "p",
        html: "One last thought on the phrase itself. “Chat with your photos” is going to mean more and more things: a chatbot that describes one upload, a search box that understands sentences, an assistant that has read your whole archive. They are not rungs on one ladder; they are answers to different questions. The useful move is to know which question you are asking. If it is “where is that photo”, you already have the right tool. If it is “what is this work, and which of it is good”, that is what <a href='/photo_chat/'>chatting with your photo library in Photoreka</a> is for.",
      },
    ],
  },
  {
    slug: "can-ai-review-a-photography-portfolio",
    title:
      "Can AI Review a Photography Portfolio? What It Sees and What It Misses",
    excerpt:
      "Photographers are pasting their work into chatbots and asking for a portfolio review. An honest look at what AI can judge from a few uploaded frames, where it falls short, how to brief it well, and what changes when the AI can read your whole body of work.",
    description:
      "Can AI review a photography portfolio? What chatbots judge well, where they fall short, prompts that work, and how an AI assistant reviews a whole archive.",
    keywords:
      "ai portfolio review, ai photography portfolio review, can ai review my photography portfolio, chatgpt portfolio review photography, ai photography feedback, photography portfolio review online, ai photo assistant, ai portfolio critique, portfolio review prompts",
    category: "Photography Tips",
    tags: ["Portfolio Review", "AI Photo Assistant", "ChatLab", "Body of Work"],
    coverImage: "/blog/ai_portfolio_review.png",
    publishedAt: "2026-11-11",
    readingMinutes: 7,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "A portfolio review used to mean a table at a festival, twenty minutes on the clock, and a stranger turning your prints over one by one. It was expensive, hard to book and occasionally brutal. So it is no surprise that photographers have started doing the obvious thing: pasting their photos into a chatbot and typing <em>review my portfolio</em>.",
      },
      {
        type: "p",
        html: "Does it work? Partly. AI can now look at photographs and say sensible things about them. But <strong>a portfolio review is not twenty photo critiques in a row</strong>, and that difference decides whether what you get back is useful or just pleasant to read.",
      },
      {
        type: "callout",
        variant: "info",
        title: "The short answer",
        html: "AI is already good at critiquing a single frame, and decent at comparing a handful. A real portfolio review judges the set: what the photos say together, what is repeated, what is missing and in what order they should go. An AI can only do that if it sees the whole set and, ideally, the archive the set was chosen from.",
      },
      {
        type: "h2",
        text: "What a Portfolio Review Actually Reviews",
        id: "what-a-review-reviews",
      },
      {
        type: "p",
        html: "A human reviewer rarely spends the session telling you that a horizon is tilted. They look at the set and ask different questions:",
      },
      {
        type: "list",
        items: [
          "Coherence: do these photos belong to the same photographer, or to five different ones?",
          "Voice: what do you keep returning to — a subject, a distance, a kind of light?",
          "The edit: which frames are carrying the set, and which are only there because you like them?",
          "Gaps: what is missing that the project needs?",
          "Sequence: which photo opens, which closes, and does the order build anything?",
        ],
      },
      {
        type: "p",
        html: "This is editing in the picture editor's sense, and <a href='/blog/culling-is-not-editing/'>it is a different job from culling</a> or from rating photos one at a time. Twenty individually strong photos can still add up to a weak portfolio.",
      },
      {
        type: "image",
        alt: "Two panels comparing a single-photo critique with a portfolio review: above, one photograph with notes on composition, light and a weakness; below, six photographs from the same series with notes on what recurs, the palette, what is missing and the order",
        caption:
          "A photo critique judges one frame. A portfolio review reads what the frames say together.",
        src: "/blog/portfolio_review_frame_vs_set.webp",
      },
      {
        type: "h2",
        text: "What a General Chatbot Does Well",
        id: "what-chatbots-do-well",
      },
      {
        type: "p",
        html: "General assistants such as ChatGPT, Gemini or Claude accept images, and they are genuinely useful for some things:",
      },
      {
        type: "list",
        items: [
          "Describing how a frame is built: lines, balance, where the eye lands.",
          "Putting words to something you felt but could not name, which is half of what a critique is for.",
          "Comparing two or three versions of the same picture and arguing for one.",
          "Drafting the text around the work: an artist statement, captions, a project description.",
          "Being available at two in the morning, with no ego involved.",
        ],
      },
      {
        type: "p",
        html: "If nobody has ever looked at your photographs critically, this alone is worth doing.",
      },
      {
        type: "h2",
        text: "Where It Falls Short",
        id: "where-it-falls-short",
      },
      {
        type: "p",
        html: "The limits are not about intelligence. They are about what the assistant can see and what it has to compare against.",
      },
      {
        type: "p",
        html: "<strong>It only sees what you upload.</strong> A chat takes a limited number of images at a time, so you end up showing ten or twenty frames. That is already your own edit, and the review cannot question choices you made before the conversation started.",
      },
      {
        type: "p",
        html: "<strong>It has no archive to compare against.</strong> It cannot tell whether that backlit silhouette is a one-off or your fortieth, whether your work was stronger two years ago, or which better frame you left in the folder.",
      },
      {
        type: "p",
        html: "<strong>It tends to be kind.</strong> In our experience, chat assistants lean towards encouragement unless you explicitly ask for the opposite. Praise is pleasant and teaches you little.",
      },
      {
        type: "p",
        html: "<strong>It is not consistent.</strong> Ask the same question twice and you may get a different favourite. There is no fixed yardstick behind the answer, so small differences between photos are mostly noise.",
      },
      {
        type: "p",
        html: "<strong>It drifts back to single frames.</strong> Unless you insist, the answer is a list of comments photo by photo: a critique, not a review.",
      },
      {
        type: "h2",
        text: "How to Get a Useful Review from Any AI",
        id: "prompts-that-work",
      },
      {
        type: "p",
        html: "Several of these limits can be softened with a better brief. Treat the assistant like a reviewer who knows nothing about you:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Say what the set is for: a gallery submission, a client-facing website, a book dummy, a grant. A portfolio is only good or bad for a purpose.",
          "State your intent in two sentences, then ask whether the photos deliver it.",
          "Ask for the three weakest frames and why, before any praise.",
          "Ask what is repeated and what is missing, not what is good.",
          "Ask for an opening image, a closing image and one pairing, with reasons.",
          "Ask it to argue against its own selection. The second answer is usually the more honest one.",
          "Run the same prompt twice and trust what both answers agree on.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "A prompt to copy",
        html: "“These 15 photographs are my edit for [purpose]. My intent is [two sentences]. Do not comment on the photos one by one. Tell me what the set says as a whole, which three frames weaken it and why, what is missing, and which image should open and which should close.”",
      },
      {
        type: "h2",
        text: "What Changes When the AI Can See the Whole Archive",
        id: "whole-archive",
      },
      {
        type: "p",
        html: "The deeper fix is not a better prompt but a different setup: an assistant that already knows your body of work before you ask. That is what an <a href='/photo_chat/'>AI photo assistant</a> built on top of a photo library does. In Photoreka it is called ChatLab. Every photo in your catalog has already been scored from 1 to 10 on eight artistic criteria (aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity) and indexed so it can be found by description. The conversation starts from there, not from an upload button.",
      },
      {
        type: "p",
        html: "That changes which questions can be answered at all:",
      },
      {
        type: "list",
        items: [
          "“What are my strengths and weaknesses as a photographer?”",
          "“How has my style changed since 2022?”",
          "“What subjects do I photograph the most?”",
          "“Pick my strongest images for an exhibition and tell me why each one is there.”",
          "“Build a narrative sequence from my Venice trip.”",
        ],
      },
      {
        type: "p",
        html: "The answer comes back as text plus an ordered set of your own photos, so every claim points at evidence you can open. And because the selection is made from the whole catalog, it can bring back frames you would never have uploaded to a chat, simply because you had forgotten them.",
      },
      {
        type: "image",
        alt: "Photoreka ChatLab building a portfolio step by step: the assistant proposes an Urban Reflections theme, explains why each of the first five photos opens the sequence and suggests next actions",
        caption:
          "ChatLab choosing a theme from a real catalog and explaining why each of the first five photos earns its place.",
        src: "/chatlab/dashboard.webp",
      },
      {
        type: "p",
        html: "It has limits too, and they are worth knowing. It works on a body of work of up to 50,000 photos, and it gives better answers on an archive that has already had its first pass than on an unfiltered dump of everything you ever shot. It remembers the conversation within a session, not across sessions. And art is subjective: the scores are a consistent yardstick, not the truth. If you want to know how it works under the hood, we wrote about it in <a href='/blog/chatlab-a-conversation-with-your-entire-archive/'>ChatLab: a conversation with your entire photo archive</a>.",
      },
      {
        type: "h2",
        text: "What AI Still Can't Replace",
        id: "what-ai-cant-replace",
      },
      {
        type: "p",
        html: "A human reviewer brings things no model has. They know which galleries are tired of which subjects, what an editor commissioned last year, what the jury of a particular grant responds to. They can ask why you made the work and watch you answer. And they can be moved by your photographs, which is the whole point of showing them.",
      },
      {
        type: "p",
        html: "The sensible way to use AI is before that meeting, not instead of it. Arrive with a tighter edit, a considered sequence and one clear sentence about what the work is. Twenty minutes with a good reviewer go a lot further when you are not spending fifteen of them discovering that half the set is the same picture.",
      },
      {
        type: "h2",
        text: "A 30-Minute AI Portfolio Review",
        id: "thirty-minute-review",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Decide what the portfolio is for and write your intent in two sentences.",
          "Pull a long list of 30 to 40 candidates from the whole archive, not only from the last year.",
          "Ask what the long list has in common and what is repeated.",
          "Cut to 15 to 20. Ask for the three weakest frames and remove at least one.",
          "Ask for an opener, a closer and the order in between, then rearrange it yourself.",
          "Sleep on it, and show the result to a person.",
        ],
      },
      {
        type: "p",
        html: "Step three is the same exercise we describe in <a href='/blog/how-to-find-your-photography-style/'>how to find your photography style</a>, and step five has its own guide: <a href='/blog/how-to-sequence-photos/'>how to sequence photos</a>. If what you need is a verdict on individual frames rather than on the set, <a href='/ai_photo_picks/'>Photoreka Picks</a> scores each photo on the same eight criteria and writes a short critique of every one.",
      },
      {
        type: "cta",
        eyebrow: "Try it on a real body of work",
        title: "Ask ChatLab to review a real portfolio",
        text: "The demo runs ChatLab on a real, already-curated archive: ask for strengths and weaknesses, a selection for an exhibition or a sequence. Nothing to install.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
    ],
  },
  {
    slug: "culling-is-not-editing",
    title:
      "Culling Is Not Editing: Why Your Body of Work Needs a Different Kind of AI",
    excerpt:
      "AI culling tools are brilliant at one job: getting a shoot from thousands of frames to the keepers. Then a different job begins — deciding which photographs matter and in what order. Why those are two jobs, why they need different tools, and why Photoreka is built mainly for the second one.",
    description:
      "Culling vs editing in photography: what AI culling tools like Aftershoot, Narrative Select, FilterPixel, Imagen, Excire and Lightroom Assisted Culling do, what changes when the unit is a body of work, and why Photoreka is built for the final cull and the edit, on up to 50,000 photos.",
    keywords:
      "culling vs editing, photo culling vs selecting, photography editing process, what to do after culling, after culling photos, ai culling, ai photo culling, aftershoot alternative, narrative select alternative, photo selection software for photographers, body of work photography, ai photo curation, photo editing selection, how to edit a photography project",
    category: "Curation Philosophy",
    tags: ["Photo Curation", "AI Culling", "Photo Editing", "Body of Work"],
    coverImage: "/blog/culling_vs_editing.png",
    publishedAt: "2026-11-05",
    readingMinutes: 9,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Photographers use two words almost interchangeably: <strong>culling</strong> and <strong>editing</strong>. In a picture editor's vocabulary they mean different things. Culling is throwing away what failed. Editing — <em>the edit</em> — is choosing the photographs that carry a piece of work and deciding the order they're seen in. Software has become extraordinary at the first job. The second one is still mostly done by hand, late at night, by photographers scrolling through years of keepers and trusting their memory.",
      },
      {
        type: "p",
        html: "We make <a href='/ai_photo_organizer/'>Photoreka</a>, so read this as an argument from one side. It explains where we think the line between the two jobs falls, what the best culling tools do on their side of it, and why we built Photoreka mainly for the other side — including why it's designed for bodies of work of up to 50,000 photos rather than for every frame you've ever shot. Details about other products come from their own sites and from our comparisons, checked in November 2026.",
      },
      {
        type: "h2",
        text: "Two Jobs, Two Moments",
        id: "two-jobs",
      },
      {
        type: "p",
        html: "<strong>Culling</strong> happens right after the shoot. Its unit is the shoot itself: everything on the card. Its question is <em>can I use this frame?</em>, and its criteria are mostly local and technical — focus, open eyes, exposure, near-duplicates, the best frame of each burst. The output is a set of keepers, and for client work, a gallery.",
      },
      {
        type: "p",
        html: "<strong>Editing</strong> happens later, often much later. Its unit is a body of work: a project, a series, a year, sometimes a career. Its question is <em>which of these deserve to be seen, and how do they work together?</em> Its criteria are about meaning and relationships — what a photograph says, whether it's original against everything else you've made, how it reads next to the photograph before it. The output is a portfolio, a photobook, an exhibition, a contest entry.",
      },
      {
        type: "list",
        items: [
          "Culling — input: everything you shot. Question: is this frame usable? Judged against: the other frames of the same moment. Output: keepers.",
          "Editing — input: the keepers, usually from many shoots. Question: which photographs matter, and in what order? Judged against: the rest of your work. Output: a series, a portfolio, a book, a show.",
        ],
      },
      {
        type: "quote",
        text: "Culling asks whether a frame can be used. Editing asks whether a photograph deserves to be seen — and what it says next to the others.",
      },
      {
        type: "h2",
        text: "What Culling Tools Do — and Do Well",
        id: "what-culling-tools-do",
      },
      {
        type: "p",
        html: "The culling category is mature, and the leading tools are genuinely good. <strong>Aftershoot</strong> flags blurry frames, closed eyes and blown exposures, groups duplicates and surfaces the frames where every face looks its best, all locally on your computer. <strong>Narrative Select</strong> groups a shoot into scenes, shows face close-ups, checks eyes and focus, and its AI First Pass ranks each frame within its scene with a reason. <strong>FilterPixel</strong> goes furthest on ranking: its DeepCull mode judges frames by the logic of the shoot — expressions, peak action, emotional impact — and explains each pick. <strong>Imagen</strong> catches blinks, groups similar images, flags focus and exposure problems and can cull to an exact number. And <strong>Lightroom</strong>'s own Assisted Culling now scores subject and eye focus and flags exposure across a batch.",
      },
      {
        type: "p",
        html: "It would be wrong to say these tools only look at pixels. Excire's best-shot selection weighs aesthetics alongside sharpness and expressions, and Excire Search adds aesthetic ratings; Peakto computes an aesthetic score that blends aesthetics, composition and technique; FilterPixel reasons about emotional impact. What they share is the unit. Each of them is built to answer <em>which is the best frame of this moment, this sequence, this shoot?</em> — a score per frame that helps you cut. We compared them in detail in <a href='/blog/best-ai-culling-software/'>the best AI culling software in 2026</a>.",
      },
      {
        type: "callout",
        variant: "info",
        title: "If you shoot volume, use one",
        html: "Wedding, event, sports and session photographers should be using a dedicated culler, and nothing in this article argues otherwise. The point is narrower: those tools finish exactly where a different problem begins.",
      },
      {
        type: "h2",
        text: "What Changes When the Unit Is the Body of Work",
        id: "body-of-work",
      },
      {
        type: "p",
        html: "Once the technical failures are gone, every frame left is usable — and that is precisely when the hard decisions start. A whole set of questions simply doesn't exist at the level of one frame or one burst:",
      },
      {
        type: "list",
        items: [
          "Narrative: whether a photograph says something rather than just showing something — and whether two photographs are saying the same thing.",
          "Originality against yourself: a frame can be fresh in general and still be the fortieth version of a picture you keep taking.",
          "Sequence: an opener, pairs that talk to each other, a rhythm, an ending. The same twenty photographs in a different order are a different piece of work.",
          "Coherence: visual, chromatic or narrative — whatever makes twenty photographs read as one body of work instead of a pile of good pictures.",
          "Patterns and gaps: what you keep returning to, what you've never photographed, how your eye has changed over the years.",
        ],
      },
      {
        type: "p",
        html: "None of these can be judged by looking at a single image. They need the whole set in view at once, and they need that set to be intentional. Three hundred near-identical frames of the same ceremony would dominate every pattern in an archive; blinks and missed focus would pollute every ranking. That's why editing comes after culling — whoever, or whatever, does each one.",
      },
      {
        type: "h2",
        text: "Where Photoreka Sits",
        id: "where-photoreka-sits",
      },
      {
        type: "p",
        html: "We built Photoreka mainly for the second job, because when we looked for a tool built around it we couldn't find one: the AI products we tried were culling assistants, organizers, or raters that judge one photo at a time. Photoreka doesn't check focus or look for blinks. It assumes the technical first pass is done, works on what you kept, and flags the near-duplicates that slipped through it.",
      },
      {
        type: "p",
        html: "<strong>It judges each photograph on separate criteria.</strong> Every photo is <a href='/photo_scoring/'>scored</a> from 1 to 10 on eight artistic criteria — aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity — kept separate, so a quiet documentary frame and a graphic street photo can each rank where they belong. Your profile (street, documentary, landscape, commercial and others) shifts how they're weighted, and the commercial profile swaps in subject clarity and commercial intent.",
      },
      {
        type: "p",
        html: "<strong>It runs the second pass for you.</strong> <a href='/ai_photo_culling/'>Photoreka's AI culling</a> ranks your keepers by those criteria instead of sorting them into keep and reject. <a href='/ai_photo_picks/'>Photoreka Picks</a> does the same on any folder of up to 5,000 photos without an account, and writes a short critique of every frame, the way an editor would in a portfolio review.",
      },
      {
        type: "p",
        html: "<strong>It works on the set as a whole.</strong> The <a href='/photography_portfolio_builder/'>portfolio builder</a> selects and sequences 10–40 images under a coherence mode you choose, from visual to narrative. The <a href='/ai_photo_storyboard/'>storyboard canvas</a> lets you arrange a sequence by hand with an assistant that sees the board. <a href='/photo_chat/'>ChatLab</a> answers questions no single photo can — what dominates your work, where you repeat yourself, how you've changed — with criteria adapted to your profile. And the <a href='/ai_photo_organizer/#atlas'>2D/3D Atlas</a> and style reports show the patterns and gaps of everything you kept.",
      },
      {
        type: "h2",
        text: "Why Up to 50,000 Photos",
        id: "why-50000-photos",
      },
      {
        type: "p",
        html: "Photoreka is built for bodies of work of up to 50,000 photos. That number is a design decision, not an engineering apology, and there are three reasons behind it:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "It's the scale of a body of work. Fifty thousand keepers is, for most photographers, many years of selected work — far more than a portfolio, a book or even a long project will ever draw on. It isn't the scale of every frame you've ever shot, and it isn't meant to be.",
          "Whole-set tools need an intentional set. The map of your catalog, the pattern reports, the rankings and the portfolio builder read your photos together. Noise doesn't just waste time there: bursts, blinks and test shots change the answer.",
          "Depth costs something per photo. Eight criteria, rich descriptions, embeddings for three search modes: that's far more analysis per frame than a keep-or-reject decision. It's why Photoreka is paid once per photo analyzed, with no subscription — and why it makes sense to spend that analysis on the photographs you decided to keep.",
        ],
      },
      {
        type: "p",
        html: "So if your archive is bigger than that, the order is simple: run the technical first pass outside it — with Aftershoot, Narrative Select, Excire, Lightroom's Assisted Culling or by hand — and bring the keepers to Photoreka. Most of what you shot was never meant to be edited; the photographs that were deserve more attention than a technical filter can give them.",
      },
      {
        type: "h2",
        text: "A Workflow That Uses Both",
        id: "workflow",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Shoot.",
          "Filter the shoot, by hand or with a tool built for it: technical failures out, the best frame of each burst kept. For client work, deliver from here.",
          "Bring the keepers — a project, a year, or the selects of a whole career — into Photoreka, from Lightroom Classic, Google Photos, Google Drive, Dropbox or local folders.",
          "Finish the cull there, then score, search and explore them as one body of work: what's strongest, what repeats, what's missing.",
          "Edit: choose the photographs that carry the work, and put them in order.",
          "Send it out: a portfolio, a photobook, an exhibition, a contest entry.",
        ],
      },
      {
        type: "p",
        html: "If you'd rather do the edit by hand, the method still applies. We describe the choosing in <a href='/blog/how-to-pick-your-best-photos/'>how to pick your best photos from hundreds of shots</a> and the ordering in <a href='/blog/how-to-sequence-photos/'>how to sequence photos for a series, a photobook or a portfolio</a>.",
      },
      {
        type: "cta",
        eyebrow: "See it on a real body of work",
        title: "Try Photoreka's demo — nothing to install",
        text: "Artistic scores, the 3D Atlas, ChatLab and the portfolio builder on a real, already-culled archive, straight from the browser.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
      {
        type: "p",
        html: "Culling tools judge frames. Editing reads a body of work. The first job made photographers faster; the second is the one that decides whether the work goes anywhere — and it's the one we built Photoreka to help with. Culling is the floor. <strong>Curation is the point.</strong>",
      },
    ],
  },
  {
    slug: "how-to-sequence-photos",
    title:
      "How to Sequence Photos: A Practical Method for Series, Photobooks and Portfolios",
    excerpt:
      "Two photographers can choose the same twenty photographs and make two different pieces of work. The difference is the order. A step-by-step method to sequence a photo series, a photobook or a portfolio: openers and closers, pairs, rhythm, coherence, and how to test it.",
    description:
      "A practical guide to photo sequencing: how to order photographs for a series, a photobook, a portfolio or a contest entry — choosing the opener and the closer, building pairs, pacing and rhythm, visual vs narrative coherence, and testing the sequence.",
    keywords:
      "photo sequencing, how to sequence photos, sequencing photographs, how to sequence a photo series, photobook sequencing, photo book sequencing, portfolio sequencing, how to order photos in a portfolio, photo series order, photography editing and sequencing, photo storyboard, ai portfolio builder",
    category: "Photography Tips",
    tags: ["Photo Sequencing", "Photobook", "Portfolio", "Photo Editing"],
    coverImage: "/blog/photo_sequencing.png",
    publishedAt: "2026-11-05",
    readingMinutes: 8,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Two photographers can choose exactly the same twenty photographs and end up with two different pieces of work. The difference is the order. <strong>Sequencing</strong> is the part of editing where photographs start talking to each other: an image changes meaning depending on what comes before it and what follows. A strong picture in the wrong place goes quiet; an ordinary one in the right place can carry a whole series.",
      },
      {
        type: "p",
        html: "This is a method you can use with small prints on a table, a Lightroom collection or any tool you like. It assumes you've already chosen your candidates — if not, start with <a href='/blog/how-to-pick-your-best-photos/'>how to pick your best photos</a> — and at the end we show where software genuinely helps.",
      },
      {
        type: "h2",
        text: "Before You Start: Know What the Set Is For",
        id: "what-the-set-is-for",
      },
      {
        type: "p",
        html: "A sequence is only right in relation to how it will be seen. The same photographs need a different order on a wall, in a book and in a ten-second portfolio review:",
      },
      {
        type: "list",
        items: [
          "A series or project (8–20 images): one argument, made image by image. Every photograph has to earn its place in that argument.",
          "A photobook: dozens of images, read two at a time across spreads, with room to breathe. Pacing matters as much as content.",
          "A portfolio (10–20 images): range inside one coherent voice. Curators and clients decide fast, so the first three images do most of the work.",
          "A contest series (often 5–10 images): judged as a whole and quickly. Repetition is punished.",
          "An exhibition wall: read in space, in no guaranteed order. Neighbours matter more than the line from first to last.",
        ],
      },
      {
        type: "p",
        html: "Then write one sentence describing what the set is about. If you can't, the problem is the selection, not the order — no sequence will rescue a set that doesn't know what it's saying.",
      },
      {
        type: "h2",
        text: "Step 1: Make Every Photo Visible at Once",
        id: "see-everything",
      },
      {
        type: "p",
        html: "Sequencing is about relationships, and you can't see relationships one image at a time. Print the candidates small and at the same size, and spread them on a table or the floor — or use a digital canvas where every photo stays visible and can be moved freely. Avoid filmstrips and fixed grids at this stage: they already suggest an order, usually the one you shot in, before you've chosen one.",
      },
      {
        type: "h2",
        text: "Step 2: Group Before You Order",
        id: "group-before-order",
      },
      {
        type: "p",
        html: "Sort the photographs into loose piles by what connects them: subject, light, colour, mood, place, gesture, scale. Don't force it; let the piles form. Two things become visible. Big piles show what you keep doing, and usually what the work is really about. Orphans — images that belong to no pile — are either the most surprising pictures in the set or the first ones to cut.",
      },
      {
        type: "h2",
        text: "Step 3: Choose the Opener and the Closer",
        id: "opener-and-closer",
      },
      {
        type: "p",
        html: "The <strong>opener</strong> sets the tone and makes a promise. It doesn't have to be your best photograph; it has to tell the viewer how to read the rest. Many editors deliberately avoid opening with the strongest image, so the sequence has somewhere to climb. In a portfolio, though, where attention is short, a strong opener is non-negotiable.",
      },
      {
        type: "p",
        html: "The <strong>closer</strong> should feel like an ending: a resolution, an open question, or a quieter image that lets the work settle. A useful test is whether the last photograph changes how you remember the first. If it doesn't, you've stopped rather than finished.",
      },
      {
        type: "h2",
        text: "Step 4: Build Pairs",
        id: "build-pairs",
      },
      {
        type: "p",
        html: "In a book, photographs are seen two at a time; in a portfolio or a slideshow, one after the other. Either way, the basic unit of a sequence is the <strong>pair</strong>: what happens in the viewer's head between one image and the next. Pairs tend to work in four ways:",
      },
      {
        type: "list",
        items: [
          "Rhyme: a shape, a gesture or a colour that repeats across two different scenes.",
          "Contrast: crowded and empty, near and far, light and dark, loud and quiet.",
          "Continuation: the second image seems to pick up where the first one left off.",
          "Tension: two photographs that don't obviously belong together, so the viewer has to work out why they're side by side.",
        ],
      },
      {
        type: "p",
        html: "Avoid pairs that say the same thing in the same way. Two photographs with the same idea don't reinforce each other; they cancel each other out. When that happens, keep the stronger one and let the other go — it may belong in a different sequence.",
      },
      {
        type: "h2",
        text: "Step 5: Work the Rhythm",
        id: "rhythm",
      },
      {
        type: "p",
        html: "Read the sequence as music. Vary scale (wide, medium, close), density (busy and empty frames), tone (bright and dark) and energy. Five similar images in a row read as a stall; a sequence that never repeats anything reads as a scrapbook. Think in phrases: a few images that develop one idea, a pause, then the next idea. In a photobook, a single image on a spread or a blank page works as punctuation.",
      },
      {
        type: "h2",
        text: "Step 6: Choose Your Kind of Coherence",
        id: "coherence",
      },
      {
        type: "p",
        html: "Something has to hold the sequence together, and it's worth naming what, because each choice changes the order:",
      },
      {
        type: "list",
        items: [
          "Visual coherence: similar framing, composition or treatment, so the set looks like one body of work.",
          "Chromatic coherence: a palette that carries through, or shifts on purpose as the sequence moves.",
          "Narrative coherence: a story or an argument that develops. Chronology is the simplest version, and rarely the best one.",
          "Conceptual coherence: images linked by an idea rather than by look, place or time.",
        ],
      },
      {
        type: "p",
        html: "Visual coherence makes a set <em>look</em> unified; narrative coherence makes it <em>say</em> something. Strong sequences usually lean firmly on one and let the other vary, which is what keeps them from being either monotonous or random.",
      },
      {
        type: "h2",
        text: "Step 7: Test It Cold",
        id: "test-it",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Leave the sequence alone for a day or two, then go through it at the speed a stranger would.",
          "Read it backwards. Weak transitions become obvious when the order is unfamiliar.",
          "Remove each image in turn. If the sequence loses nothing, the image goes.",
          "Show it to someone without explaining it and ask what it's about. If their answer is far from your one-sentence description, the order isn't doing its job yet.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Four common traps",
        html: "<strong>Chronology by default:</strong> the order you shot in is rarely the order that reads best. <strong>Front-loading:</strong> all the strongest images in the first half, so the second half sags. <strong>Rhymes that become a trick:</strong> one visual echo is a discovery; five in a row are a gimmick. <strong>Protecting a favourite:</strong> keeping a photograph you love that the sequence doesn't need.",
      },
      {
        type: "h2",
        text: "Where Software Helps",
        id: "where-software-helps",
      },
      {
        type: "p",
        html: "Sequencing is judgment, and no software should make the final call. But two steps are slow by hand: finding the right candidates across years of work, and trying many orders quickly. That's where Photoreka helps, on the photographs you've already kept — it's built for <a href='/blog/culling-is-not-editing/'>the edit after the first pass</a>, not for the first pass itself.",
      },
      {
        type: "p",
        html: "<a href='/photography_portfolio_builder/'>Photoreka's portfolio builder</a> selects and sequences 10–40 images from your catalog under the coherence mode you choose — from visual to narrative — after scoring every candidate on eight artistic criteria, so you start from a reasoned draft instead of an empty table. <a href='/ai_photo_storyboard/'>The storyboard canvas</a> is the digital version of the table itself: an infinite canvas where you arrange photos by hand, let Photoreka cluster them by narrative, colour or score, drop an image to surface visually similar ones, and ask an assistant that sees the board what's missing.",
      },
      {
        type: "image",
        alt: "Photoreka's storyboard canvas with photos arranged freely on the board and a chat panel suggesting photos that share their mood and subject",
        caption:
          "Laying out candidates on Photoreka's storyboard canvas, with an assistant that sees the board and suggests what could join it.",
        src: "/canvas/hero_3.webp",
      },
      {
        type: "cta",
        eyebrow: "Try it on a real catalog",
        title: "Build a sequenced portfolio from a real archive",
        text: "The demo includes the portfolio builder and the storyboard canvas on a real body of work. Nothing to install.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
      {
        type: "p",
        html: "A selection tells the viewer what you saw. A sequence tells them what you think about it. Spend as long on the order as you spent on the choosing — and if the set is headed for a competition, our guide to <a href='/blog/how-to-choose-photos-for-a-photo-contest/'>choosing photos for a photo contest</a> covers how juries read a series.",
      },
    ],
  },
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
        html: "<strong>Limits, honestly:</strong> Picks doesn't judge faces or profile pictures, and it isn't a client-delivery culling tool. It accepts JPEG, PNG and WebP, so RAW files need exporting first. The jury doesn't know a contest's theme or rules, so the final call against a brief is yours. And it's built for one-off batches: if you want scores kept on your body of work permanently, that's Photoreka's <a href='/photo_scoring/'>Photo Scoring</a>, part of a full account.",
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
        html: "Whatever you use, treat the ranking as a shortlist, not a verdict. The AI's job is to get you from 2,000 frames to 50 worth looking at closely. Choosing the final 12 — and the order they're seen in — is still editing, and editing is yours. We wrote more about that last step in <a href='/blog/how-to-pick-your-best-photos/'>how to pick your best photos from hundreds of shots</a>, about <a href='/blog/how-to-sequence-photos/'>how to sequence the final set</a>, and about why <a href='/blog/culling-is-not-editing/'>culling is not editing</a>.",
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
    updatedAt: "2026-11-11",
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
        html: "This is an honest comparison of the four tools that lead the category, plus where Photoreka fits in the same workflow. Photoreka sits, on purpose, <strong>after</strong> the first pass. It doesn't look for closed eyes or missed focus, because the four tools below already do that well — if your job is delivering a gallery by Thursday, pick one of them. Photoreka starts where they stop, with the frames you kept, and answers the other question: which of your good photos are actually your best, and how they work together. We explain that split in <a href='/blog/culling-is-not-editing/'>culling is not editing</a>. Features and prices below were checked on each vendor's own site at the time of writing (November 2026); they change often, so confirm before you buy.",
      },
      {
        type: "callout",
        variant: "info",
        title: "The short version",
        html: "Shooting weddings and events and want a fast, offline cull? <strong>Aftershoot</strong> or <strong>Narrative Select</strong>. Want genre-aware ranking with a reason for every frame? <strong>FilterPixel</strong>. Already editing with Imagen? Its <strong>culling add-on</strong> is the easy choice. Choosing your strongest images for a portfolio, a contest or a book rather than delivering a gallery? That's where <a href='/ai_photo_picks/'>Photoreka Picks</a> and <a href='/ai_photo_culling/'>Photoreka's AI photo culling</a> come in.",
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
        html: "Here's where Photoreka sits. It doesn't detect blinks or check every face for focus, and its quick tool doesn't read RAW files — by design, because that's the first pass and the four tools above own it. If your Monday problem is turning 4,000 wedding frames into a 600-image gallery, use one of them. Photoreka works on the second pass, and on a different question: <strong>out of photographs that are all usable, which ones are actually your best?</strong> That's the question behind a portfolio, a contest entry, a photobook, a print sale or a year-end review — and it's the one keep/reject culling was never designed to answer.",
      },
      {
        type: "h3",
        text: "Picks: a Ranking Pass on Any Folder",
        id: "photoreka-picks",
      },
      {
        type: "p",
        html: "<a href='/ai_photo_picks/'>Photoreka Picks</a> is the quickest way to run that second pass. Drop up to 5,000 photos in the browser and an AI jury scores every frame on eight artistic criteria — aesthetics, composition, storytelling, originality, message, humor, visual games and spontaneity — writes a one- or two-sentence critique for each, and ranks the set. Switch between juries (overall, street, documentary, landscape, portrait, travel, fine art, plus award juries that only keep photos above a high bar) and the ranking reorders itself. A few hundred photos take a few minutes; 5,000 take under half an hour.",
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
        text: "Photoreka: Scoring a Whole Body of Work",
        id: "photoreka-catalog",
      },
      {
        type: "p",
        html: "The full Photoreka app does the same kind of judgment permanently, across a body of work of up to 50,000 photos. Every photo is scored from 1 to 10 on eight separate artistic criteria — aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity (see <a href='/photo_scoring/'>photo scoring</a>) — so you can sort a catalog by what matters for the project at hand, and combine scores with <a href='/ai_photo_search/'>natural-language search</a>: 'my strongest black-and-white portraits from last summer'. Near-duplicate detection flags over-shot sequences. It runs in the browser on Windows, Mac and Linux, connects to Lightroom Classic through an official plugin as well as Google Photos, Google Drive, Dropbox and local files, analyzes roughly 1,000 photos an hour from compressed previews, and is paid once per batch of photos analyzed, with no subscription.",
      },
      {
        type: "p",
        html: "<strong>What it deliberately leaves out:</strong> blink and eye detection, per-face focus checks, video and editing. That's first-pass territory, and the dedicated cullers do it better. Picks groups only exact copies, not bursts, and analysis happens in the cloud, so you need a connection. The app is sized for the same reason: up to 50,000 photos, because the rankings, the map of your catalog, the pattern reports and the portfolio builder all work across the whole set, and they only mean something when that set is already intentional. Photoreka does the passes that come after the technical one — the reasoning is in <a href='/blog/culling-is-not-editing/'>culling is not editing</a>.",
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
          "Choose Photoreka if: the problem isn't one shoot but a body of work you've already culled — years of keepers — and you want artistic scores you can search, filter and revisit over time.",
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
    updatedAt: "2026-11-11",
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
        html: "This guide compares the tools we think a working photographer should consider in 2026, for what they actually do today. One disclosure up front: we make Photoreka, an <a href='/ai_photo_organizer/'>AI photo organizer</a> that is on the list. We've tried to describe every tool — ours included — by its real strengths and its real limits, and we checked competitor details against their official sites at the time of writing (November 2026). Prices and features move fast, so confirm before you buy.",
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
          "Photoreka: a browser-based layer on top of the storage you already have, built for the photos you kept — search by description, artistic scoring and sequencing for a body of work of up to 50,000 photos.",
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
        html: "What it adds is <strong>finding and judging</strong>. <a href='/ai_photo_search/'>Search</a> works against the image itself, in three modes (Broad, Adaptive and Precise) with no query length limit. Every photo is <a href='/photo_scoring/'>scored</a> from 1 to 10 on eight artistic criteria — aesthetic quality, composition, storytelling, originality and more — kept separate, so you can rank the same catalog differently for a gallery submission than for a client pitch. You also get automatic tags, near-duplicate detection, a 2D/3D map that groups the whole library by visual similarity, and a world map that uses AI to estimate where photos without GPS were taken.",
      },
      {
        type: "p",
        html: "<strong>What it isn't:</strong> a backup, a video library or a people manager — there's no face recognition, and the analysis happens in the cloud, so it isn't for anyone who needs everything offline. It's sized on purpose for a body of work of up to 50,000 photos: the frames you kept, not every snapshot you took. That's what lets it judge, map and sequence the set as a whole instead of just indexing it; we explain the choice in <a href='/blog/culling-is-not-editing/'>culling is not editing</a>. <strong>Pricing:</strong> no subscription; you pay once per batch of photos analyzed. At the time of writing (November 2026), 500 photos cost €9.90, 2,500 cost €36 and 10,000 cost €89, and new accounts get 100 photos and 500 credits free. If you only want an AI jury to rank one folder, <a href='/ai_photo_picks/'>Photoreka Picks</a> does that without an account.",
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
        html: "Plenty of photographers end up with two: one tool that <em>keeps</em> the archive and one that helps them <em>judge</em> it. That isn't indecision — those really are different jobs, done at different moments: the keeper holds everything you shot, the judge works on what you decided to keep. The tools that try to do both usually do one of them better.",
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
    updatedAt: "2026-11-05",
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
        html: "Excire's culling, aesthetic ratings and face-sharpness checks are designed to get you from a full card to a clean selection quickly — and Lightroom Classic's own Assisted Culling now covers part of that ground too. Photoreka's <a href='/photo_scoring/'>scoring</a> answers a different question. It scores every photo from 1 to 10 on eight separate artistic criteria — aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity, with subject clarity and commercial intent taking two of those places in the commercial profile — and lets you sort by any one of them. It doesn't check sharpness at all: a motion-blurred street frame with real energy can rank high on storytelling while it would fail a culler's focus check, which is how editors actually choose. Both tools detect duplicates.",
      },
      {
        type: "h3",
        text: "Seeing the Whole Catalog",
        id: "seeing-the-whole-catalog",
      },
      {
        type: "p",
        html: "Here the two products stop overlapping. From Lightroom Classic you can launch Photoreka's <a href='/ai_photo_organizer/#atlas'>3D Atlas</a>, which places your whole catalog in a navigable space clustered by visual similarity — the fastest way we know to see what you actually photograph, as opposed to what you think you photograph. On the web platform the same analysis feeds a <a href='/photography_portfolio_builder/'>portfolio builder</a> that selects and sequences a set under visual and narrative constraints, and an <a href='/photo_chat/'>AI photo assistant</a> for reviewing a body of work. Excire has no equivalent to these, and isn't trying to.",
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
        html: "The two also work at different moments. Excire's culling is built for the shoot, before anything has been kept. Photoreka is built for what comes after: a body of work of up to 50,000 photos, the scale at which a map of your catalog, a ranking or a sequence still says something about you rather than about your memory card. So if your catalog holds a decade of unculled weddings, the order is simple: run a first pass — with Excire, Lightroom's Assisted Culling or by hand — then bring the keepers to Photoreka. We explain why we built it that way in <a href='/blog/culling-is-not-editing/'>culling is not editing</a>.",
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
    updatedAt: "2026-11-05",
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
        html: "PhotoPrism's 1–5 score exists to decide what deserves to be <em>in</em> your library. Photoreka's <a href='/photo_scoring/'>scoring</a> exists to decide what deserves to be <em>seen</em>, and keeps eight criteria separate rather than collapsing them into one number: aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity, with subject clarity and commercial intent swapped in for commercial work. That separation is the point — the same catalog ranks differently for a gallery submission than for a stock pitch, and a single global score can't express that.",
      },
      {
        type: "h3",
        text: "Beyond Organization",
        id: "beyond-organization",
      },
      {
        type: "p",
        html: "Here the two products stop overlapping entirely. Photoreka includes a <a href='/photography_portfolio_builder/'>portfolio builder</a> that selects and sequences 10–40 images under coherence constraints (visual, chromatic, narrative), an <a href='/photo_chat/'>AI photo assistant</a> that can critique your portfolio and track how your work evolves, <a href='/ai_photo_organizer/#reports'>style and pattern reports</a>, and a <a href='/ai_photo_organizer/#atlas'>2D/3D atlas</a> that renders your entire archive as a navigable space rather than an infinite scroll. PhotoPrism has no equivalent, and shouldn't be criticized for it — a library server's job ends where the editing decisions begin.",
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
        html: "Most photographers evaluating these tools are carrying one of two very different worries. The first is <em>I don't trust anyone else with my archive</em> — that's a custody problem, and PhotoPrism is a great answer to it. The second is <em>I have forty thousand photographs and no idea which ones matter</em> — that's a judgment problem, and no amount of self-hosting touches it. A perfectly private, perfectly backed-up, perfectly labeled library where you still can't tell which twenty frames are your best work is a solved storage problem sitting on top of an unsolved curation problem. That second worry is the one Photoreka was built for, and forty thousand photographs is close to the scale it's designed around: a body of work of up to 50,000 photos, the frames you kept rather than every file you own. We explain that choice in <a href='/blog/culling-is-not-editing/'>culling is not editing</a>.",
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
    updatedAt: "2026-11-05",
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
        html: "This is the sharpest contrast between the two tools. digiKam's Image Quality Scanner assigns pick labels based on measurable defects — blurry, noisy, badly exposed, over-compressed. That's genuinely useful for a first culling pass. Photoreka's <a href='/photo_scoring/'>scoring</a> asks an entirely different question, and keeps eight criteria separate: aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity, with subject clarity and commercial intent swapped in for commercial work. It doesn't measure blur or noise at all. A technically flawless photograph can score badly, and a slightly soft one can score brilliantly — which is exactly how editors actually choose.",
      },
      {
        type: "h3",
        text: "Beyond Organization",
        id: "beyond-organization",
      },
      {
        type: "p",
        html: "Here the two products stop overlapping altogether. Photoreka includes a <a href='/photography_portfolio_builder/'>portfolio builder</a> that selects and sequences 10–40 images under coherence constraints (visual, chromatic, narrative), an <a href='/photo_chat/'>AI photo assistant</a> that can critique your portfolio and track how your work evolves, <a href='/ai_photo_organizer/#reports'>style and pattern reports</a>, and a <a href='/ai_photo_organizer/#atlas'>2D/3D atlas</a> that renders your entire archive as a navigable space instead of a scrolling grid. digiKam has no equivalent to any of these, because none of them were ever part of what a DAM is for.",
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
        html: "The most honest conclusion we can offer is that many photographers shouldn't be choosing at all. digiKam is a great <em>system of record</em>: it owns the files, the tags, the faces, the backups, the metadata that has to survive the next twenty years. Photoreka is a <em>thinking layer</em>: point it at the photographs you've decided to keep — digiKam's Quality Scanner is a perfectly good <a href='/blog/culling-is-not-editing/'>first, technical pass</a> for getting there — to find what you can't put into keywords, score a body of work across artistic dimensions, and build a sequence out of it. Neither one moves your originals. Neither one asks you to migrate anything.",
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
    updatedAt: "2026-11-05",
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
        html: "Peakto computes an aesthetic score that blends aesthetics, composition, and technique into a global number used by its Panorama view. Photoreka's <a href='/photo_scoring/'>scoring</a> keeps eight criteria separate — aesthetic quality, composition, storytelling, originality, message, humor, visual games and spontaneity, with subject clarity and commercial intent swapped in for commercial work — so you can rank the same catalog differently for a gallery submission than for a stock pitch. Peakto's score helps you pick the better frame; Photoreka's criteria are built for judging a <a href='/blog/culling-is-not-editing/'>body of work rather than a single frame</a>.",
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
        html: "Seeing the shape of an archive is the destination for some photographers and the starting point for others. Once a region of the map reveals itself — a cluster of images that share a mood, a light, a subject — it becomes raw material: the start of a <a href='/blog/how-to-sequence-photos/'>sequence</a>, a portfolio section, or an exhibition wall, built from photographs that belong together because a space said so, not because a filename happened to put them in the same export folder.",
      },
      {
        type: "p",
        html: "A folder can only tell you where you put something. A grid can only show you what's next in line. Neither was ever built to answer the question that actually matters once an archive gets large enough to outgrow memory: not 'where is this photo,' but <strong>'what does all of this, together, actually look like — and what does it say about the work?'</strong> That's not a retrieval problem anymore. It's an <a href='/blog/culling-is-not-editing/'>editing problem</a>, and it starts with a map.",
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
        html: "The core idea is easy to state: your style is not contained in any single photo. It is an <strong>emergent property of the collection</strong>—it lives in what you keep repeating without realizing it, in how your palette has changed over three years, in the distance between what you think you photograph and what you actually photograph. None of that is visible from the local perspective of traditional tools: one photo, one folder, one search at a time. It's also why ChatLab works best on a body of work rather than on a raw dump of every frame: a collection only has a style once someone has chosen what belongs in it — the argument we make in <a href='/blog/culling-is-not-editing/'>culling is not editing</a>.",
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
        html: "If the contest accepts series, judge the set as a whole. A series is only as strong as its weakest image, and juries notice repetition fast: two photos that make the same point weaken each other. Look for consistency of tone and treatment, a <a href='/blog/how-to-sequence-photos/'>sequence that builds</a>, and a final image that closes the story. When in doubt, a tight series of five beats a loose series of ten.",
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
    updatedAt: "2026-11-05",
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
        html: "The most common mistake is trying to do two jobs at once. <strong>Culling</strong> is removing what failed: missed focus, motion blur, closed eyes, bad exposure, and the twenty near-identical frames of the same burst. <strong>Selecting</strong> is choosing what is genuinely good among what remains. Culling is fast and mostly technical; selecting is slow and mostly artistic — it's what picture editors simply call editing, and <a href='/blog/culling-is-not-editing/'>it isn't the same job as culling</a>. Mixing them makes both worse: you agonise over obvious rejects and rush the decisions that matter.",
      },
      {
        type: "h2",
        text: "Pass One: Cull Fast",
        id: "cull-fast",
      },
      {
        type: "p",
        html: "Go through everything once, quickly, with one rule: reject only what is clearly broken or redundant. Use a single flag or a one-star rating and do not stop to compare. For bursts and sequences, keep the best one or two frames of each moment and drop the rest. Expect to remove half of the shoot or more. If you work in a catalog such as Lightroom, this is also where <a href='/blog/best-ai-culling-software/'>AI culling tools</a> — Aftershoot, Narrative Select or Lightroom's own Assisted Culling — save the most time, because technical defects are exactly what software detects well.",
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
        html: "Use it as a second opinion, not a verdict. The value is not that the AI is always right, but that it looks at every frame with the same eye, never gets tired at photo 600, and has no memory of how cold it was when you took the shot. If you want the same second pass permanently across your body of work, that is what <a href='/ai_photo_culling/'>Photoreka's AI culling</a> and <a href='/photo_scoring/'>Photo Scoring</a> do inside an account, on up to 50,000 of the photos you kept. And once you have your final set, <a href='/blog/how-to-sequence-photos/'>putting it in order</a> is the last step of the edit.",
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
  {
    slug: "how-to-add-gps-location-to-photos",
    title:
      "How to Add GPS Location to Photos Already Taken (Even Without a GPS Camera)",
    excerpt:
      "Your camera never recorded where you were, and now your archive is a map with no pins. Four ways to geotag photos after the fact — a GPS track, a map and your memory, a visual search, or AI that reads the place from the picture — and how to choose between them.",
    description:
      "How to add GPS coordinates to photos already taken: match a GPX track in Lightroom Classic or exiftool, place photos on a map by hand, or use AI visual geolocation when you have no track at all. Includes scanned slides, RAW files and privacy tips.",
    keywords:
      "how to add gps location to photos, add gps to photos already taken, how to geotag photos already taken, geotag photos without gps, add location to old photos, add gps data to photos, add gps coordinates to photos in bulk, geotag photos lightroom classic, lightroom tracklog gpx, exiftool geotag gpx, geotag scanned slides, add location to scanned photos, geotag dslr photos without gps, ai photo geolocation, bulk exif gps editor",
    category: "Photography Tips",
    tags: ["Geotagging", "EXIF GPS", "Lightroom Classic", "Geo Recovery"],
    coverImage: "/blog/geotag_photos.webp",
    publishedAt: "2026-11-09",
    readingMinutes: 8,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Most cameras ever sold never recorded where a photo was taken. If you shot with a DSLR, a mirrorless body without a phone link, or film you later scanned, your archive probably holds thousands of photos with a date and no place. That gap matters more than it seems: location is how most people remember a trip, how catalogs build their map view, and one of the fastest ways to find a photo years later. <strong>You can add it afterwards.</strong> The right method depends on what you still have: a GPS track, your memory, or only the photos themselves.",
      },
      {
        type: "h2",
        text: "What Geotagging Actually Writes",
        id: "what-geotagging-writes",
      },
      {
        type: "p",
        html: "Geotagging means writing GPS coordinates — latitude, longitude and, optionally, altitude — into the EXIF metadata of the image file. Once they are there, every EXIF-aware app (Lightroom, Capture One, Apple Photos, Google Photos, Windows Explorer) can show the photo on a map, and the location travels with the file wherever you copy it.",
      },
      {
        type: "p",
        html: "One trap is worth knowing before you start: <strong>some apps store the location only in their own catalog, not in the file.</strong> Lightroom Classic, for example, keeps metadata changes in its catalog until you save metadata to the file or turn on automatic XMP writing, and for proprietary RAW formats it writes an XMP sidecar next to the original instead of touching it. If you want the location to survive a change of software, make sure it ends up in the file or in its sidecar.",
      },
      {
        type: "h2",
        text: "Choose a Method by What You Still Have",
        id: "choose-a-method",
      },
      {
        type: "list",
        items: [
          "A GPS track from your phone, a watch or a logger, recorded while you were shooting: match it to the photos by time. It is the most precise method.",
          "Your memory of where each set was taken: place the photos on a map by hand, or write the coordinates in bulk.",
          "One mystery photo of a known landmark: a visual search will usually name the place in seconds.",
          "Nothing but the photos, and far too many to place by hand: AI visual geolocation reads the place from the image itself.",
        ],
      },
      {
        type: "h2",
        text: "Method 1: Match a GPS Track to Your Photos",
        id: "gps-track",
      },
      {
        type: "p",
        html: "If a GPS logger was running while you shot — a tracking app on your phone, a sports watch, a dedicated logger — you already know where every photo was taken. That information simply lives in a separate file, usually a GPX. Geotagging software compares each photo's capture time with the track and gives the photo the position you were at in that moment.",
      },
      {
        type: "p",
        html: "In <strong>Lightroom Classic</strong>, open the Map module, load the GPX file with Map → Tracklog → Load Tracklog, select the photos and choose Auto-Tag Selected Photos. On the command line, <a href='https://exiftool.org/geotag.html' target='_blank' rel='noopener'>exiftool</a> does the same for a whole folder with <code>exiftool -geotag track.gpx ./photos</code>. digiKam's Geolocation Editor and HoudahGeo on the Mac offer the same matching with a map preview.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Check the camera clock first",
        html: "Track matching only works if the camera clock and the track agree, and camera clocks drift or stay on home time when you travel. The classic trick: at the start of a trip, photograph your phone's clock with the camera. The difference between the time shown on screen and the time recorded in that photo is the offset to enter in Lightroom (Map → Tracklog → Set Time Zone Offset) or in exiftool before matching.",
      },
      {
        type: "h2",
        text: "Method 2: Place Photos on a Map by Hand",
        id: "map-by-hand",
      },
      {
        type: "p",
        html: "If you remember where you were, a map is enough. In Lightroom Classic's Map module you can drag a selection of photos onto the map, or search for a place, right-click it and add its coordinates to the selected photos. digiKam, Mylio and Apple Photos have similar tools. When a whole folder was shot in one place, exiftool writes the coordinates in a single line, for example <code>exiftool -GPSLatitude=40.4168 -GPSLatitudeRef=N -GPSLongitude=3.7038 -GPSLongitudeRef=W ./madrid</code>.",
      },
      {
        type: "p",
        html: "This works well for a trip you remember day by day. It stops working at scale: placing ten years of travel folder by folder is a weekend you will never find, and memory fails exactly where you need it most — which of the three villages on that road was this one?",
      },
      {
        type: "h2",
        text: "Method 3: One Mystery Photo? Try a Visual Search",
        id: "visual-search",
      },
      {
        type: "p",
        html: "For a single photo of something recognisable — a cathedral, a bridge, a famous viewpoint — a visual search such as Google Lens often names the place in seconds. It is free and perfect for the odd mystery shot. It is not a geotagging workflow, though: it works one image at a time, it names a landmark instead of writing coordinates into your file, and it has little to say about a street, a beach or a mountain road that isn't famous.",
      },
      {
        type: "h2",
        text: "Method 4: No Track, No Memory: AI Visual Geolocation",
        id: "ai-geolocation",
      },
      {
        type: "p",
        html: "The hardest case is also the most common one: an archive with no track and a fading memory. Years of DSLR travel, an inherited collection, a box of scanned slides. Here the only source of location is the photograph itself. AI visual geolocation reads the same clues a well-travelled person would: architecture and building materials, street signs and the script they are written in, road markings, vegetation, the shape of the landscape, the quality of the light.",
      },
      {
        type: "p",
        html: "Honest expectations matter, because this is inference, not measurement:",
      },
      {
        type: "list",
        items: [
          "Precision is usually city or district level. A recognisable landmark can place a photo on a specific square or street, but that is the exception. City level is enough for a map of your archive, for search and for captions, though not for finding the exact spot where the tripod stood.",
          "Outdoor photos with context work best: streets, buildings, landscapes and signage, in wide or medium framing and in daylight.",
          "Portraits, interiors, studio, macro and abstract shots carry little geographic information and usually can't be placed.",
          "A good tool says 'unknown' instead of guessing. A wrong pin is worse than no pin, because you will trust it later.",
          "You should review and correct every placement on a map before anything is written into your files.",
        ],
      },
      {
        type: "p",
        html: "On a large batch this is where AI earns its place. A person can place a hundred photos in an evening; a model goes through thousands, and you only fix the pins that look wrong.",
      },
      {
        type: "image",
        alt: "World map showing clusters of photo thumbnails placed across Europe, Africa, Asia and Australia by AI visual geolocation",
        caption:
          "A travel archive with no GPS data, placed on the world map by AI visual geolocation.",
        src: "/ai_geoinference/1.webp",
      },
      {
        type: "h2",
        text: "Scanned Slides and Negatives",
        id: "scanned-film",
      },
      {
        type: "p",
        html: "Film scans are a special case, because the file carries the date of the scan, not the day you took the photo. That rules out track matching even if you had a track. Your options are the box label and your memory, a map by hand, or visual geolocation, which doesn't care when the scan was made. If you also want to fix the capture date (in Lightroom Classic, Metadata → Edit Capture Time), do it in the same session, so the archive ends up both dated and placed.",
      },
      {
        type: "h2",
        text: "Geotag Your Photos with Photoreka",
        id: "photoreka",
      },
      {
        type: "p",
        html: "Photoreka has two tools for this, depending on whether you want a one-off job or locations inside your catalog.",
      },
      {
        type: "p",
        html: "<a href='/ai_geo_recovery/'>Geo Recovery</a> is the one-off option, with no account. You drop a batch of JPEG, PNG or WebP files into the browser; your originals stay on your device and only small thumbnails are sent for analysis. The AI places every photo it can locate on a map, marks the rest as unknown, and lets you move any pin or search for the right place by name. When you download, you get your original files back with the GPS coordinates written into their EXIF. It costs €0.012 per photo, VAT included, with a €2.40 minimum per batch, paid once. If you aren't sure your photos are suitable, you can test up to 10 of them for free first. RAW files aren't supported yet; for those, use the track or map methods above, or geotag the JPEGs you export.",
      },
      {
        type: "p",
        html: "If you already use Photoreka, <a href='/ai_geo_inference/'>AI Geo-Inference</a> does the same job inside your catalog. It places photos without GPS on your world map, shows a free forecast of how many are likely to be located before you spend any credits, and works on photos synced from Lightroom Classic. It enriches your catalog rather than rewriting your files.",
      },
      {
        type: "image",
        alt: "Adjust location dialog on a city map, showing a street portrait, the place the AI inferred and a search box to choose a different location",
        caption:
          "Every placement can be corrected: search for the right place by name and your choice replaces the AI's guess.",
        src: "/ai_geoinference/5.webp",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Location works both ways",
        html: "Coordinates are useful in your archive and risky in public. A photo shared with GPS in its EXIF can reveal where you live, or where a nest or a quiet spot is. Many platforms strip location on upload, but a file sent by email or shared from a cloud folder keeps it. When you export for the web, remove it: in Lightroom Classic, tick Remove Location Info in the Metadata section of the Export dialog.",
      },
      {
        type: "cta",
        eyebrow: "Geotag photos already taken",
        title: "Put your archive back on the map",
        text: "Test up to 10 photos for free, then geotag the whole batch: review every pin and download your originals with GPS in their EXIF. No account, no subscription.",
        buttonLabel: "Try Geo Recovery",
        action: "link",
        href: "/ai_geo_recovery/",
      },
    ],
  },
  {
    slug: "how-to-find-your-photography-style",
    title:
      "How to Find Your Photography Style (It's Already in Your Archive)",
    excerpt:
      "Every guide gives the same advice: look back at your work and notice what you repeat. Almost none explains how to do that with 20,000 photos. A practical method to find, describe and develop your photography style from the photos you've already taken.",
    description:
      "A practical method to find your photography style: audit what you already shoot, break style into subject, light, colour, composition and mood, put it into words for a bio or portfolio, and develop it on purpose.",
    keywords:
      "how to find your photography style, find your photography style, photography style, how to describe your photography style, develop your photography style, what is my photography style, personal photography style, how to find your style in photography, photographic voice, signature photography style, photography style examples, understand my photography style, photography style analysis, ai photography style analysis",
    category: "Photography Tips",
    tags: ["Photography Style", "Body of Work", "ChatLab", "Reports"],
    coverImage: "/blog/photography_style.webp",
    publishedAt: "2026-11-09",
    readingMinutes: 8,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "Style is what people recognise in your photos before they read your name. Most advice on finding it comes down to one instruction: look back at your work and notice what you keep doing. It's good advice, but it assumes you can actually see your work. With a few hundred photos you can. With twenty thousand spread across folders, drives and years, you see your last shoot and a handful of favourites, and the pattern stays invisible. <strong>Your style already exists; the hard part is seeing it.</strong>",
      },
      {
        type: "h2",
        text: "Style Is What You Repeat, Not What You Admire",
        id: "style-is-repetition",
      },
      {
        type: "p",
        html: "There are two lists in every photographer's head. One is the work you admire: the photographers you follow, the books on your shelf. The other is the work you actually make. Style lives in the second list. It is the sum of the decisions you take without thinking — where you stand, when you press the shutter, what you leave out of the frame — repeated across hundreds of photos.",
      },
      {
        type: "p",
        html: "That is why style is found rather than chosen. Your influences tell you where you'd like to go; your archive tells you where you are. The two rarely match, and the gap between them is useful information, not a failure.",
      },
      {
        type: "h2",
        text: "The Five Layers of a Style",
        id: "five-layers",
      },
      {
        type: "p",
        html: "“Style” is too vague to analyse in one go. Break it into layers and look at each one separately:",
      },
      {
        type: "list",
        items: [
          "Subject: what you point the camera at — people, streets, landscapes, details — and, just as telling, what you never photograph.",
          "Light: hard or soft, golden hour or midday, backlight, night, flash.",
          "Colour and tone: your palette, warm or cold, saturated or muted, colour or black and white, high or low contrast.",
          "Composition: how close you stand, how much empty space you leave, symmetry or tension, a centred subject or one pushed to the edge, a single layer or several.",
          "Moment and mood: the decisive instant or stillness; humour, melancholy, tension, intimacy.",
        ],
      },
      {
        type: "p",
        html: "Editing sits on top of all five, but it is the thinnest layer. A preset can give a set of photos a common look; it can't give them a common way of seeing. If your photos only look alike after the preset, the style is in the preset, not in you.",
      },
      {
        type: "h2",
        text: "Step 1: Audit What You Actually Shoot",
        id: "audit",
      },
      {
        type: "p",
        html: "Start from the photos you kept over the last two or three years, not from everything on the card: rejects are noise. Pick thirty to fifty favourites by instinct, without thinking too hard, and lay them out together — a grid in your catalog, a contact sheet, prints on a table. Then go layer by layer and write down what dominates.",
      },
      {
        type: "p",
        html: "Count instead of judging. “Twelve of forty are backlit” or “almost nothing is shot closer than three metres” is far more useful than “I like moody light”. Numbers expose habits you would never describe on your own.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Borrow a stranger's eyes",
        html: "Show twenty of those photos to someone who doesn't know your work and ask them to describe the set in three words. The words they repeat are how your work reads from the outside — which is exactly what a style is.",
      },
      {
        type: "h2",
        text: "Step 2: Look Across Years, Not Across One Shoot",
        id: "across-years",
      },
      {
        type: "p",
        html: "A single trip always has a look, because the place imposes it. Style is what survives a change of place and subject: the same distance, the same light, the same palette in Lisbon and in your own neighbourhood. Compare shoots from different years and different genres, and keep only what appears in all of them.",
      },
      {
        type: "p",
        html: "Do the same across time. Put a year from your early work next to the last twelve months. What did you drop? What appeared and stayed? Style is not fixed, and seeing its direction is often more useful than seeing where it stands today.",
      },
      {
        type: "h2",
        text: "Step 3: Put Your Style into Words",
        id: "describe-your-style",
      },
      {
        type: "p",
        html: "Sooner or later you need a sentence: for a bio, an artist statement, a portfolio introduction, a client brief or a contest entry. A simple structure works: <strong>subject + light or colour + composition + mood</strong>. For example:",
      },
      {
        type: "list",
        items: [
          "“Quiet urban scenes in soft, low light, framed from a distance with plenty of empty space.”",
          "“Close, warm, candid portraits of people at work, in available light.”",
          "“Graphic black-and-white street photography built on hard shadows and layered frames.”",
        ],
      },
      {
        type: "p",
        html: "Avoid a genre label on its own (“I'm a street photographer”) and adjectives that describe everyone (“authentic”, “unique”, “timeless”). The test for a good description: could a stranger pick your photos out of a pile using only your sentence?",
      },
      {
        type: "h2",
        text: "Step 4: Develop It on Purpose",
        id: "develop",
      },
      {
        type: "list",
        items: [
          "Edit tighter. Style becomes visible when you stop showing the photos that don't belong.",
          "Shoot a project with a constraint: one lens, one neighbourhood, one season. Constraints force you to repeat decisions, and repetition is what a style is made of.",
          "Build series, not single images. A series reveals consistency, or the lack of it, faster than anything else.",
          "Look at the gaps. What you never shoot is information too. Try it on purpose once and see whether it belongs.",
          "Repeat the audit every year and compare the two descriptions.",
        ],
      },
      {
        type: "p",
        html: "For the first and third points, our guides on <a href='/blog/how-to-pick-your-best-photos/'>how to pick your best photos</a> and <a href='/blog/how-to-sequence-photos/'>how to sequence photos</a> cover the method step by step.",
      },
      {
        type: "h2",
        text: "Common Traps",
        id: "common-traps",
      },
      {
        type: "list",
        items: [
          "Confusing a preset with a style.",
          "Copying a photographer you admire instead of finding what you genuinely share with them.",
          "Forcing consistency too early: style needs volume before it shows.",
          "Judging only from your latest shoot, which reflects the place more than you.",
        ],
      },
      {
        type: "h2",
        text: "Seeing a Whole Archive at Once",
        id: "whole-archive",
      },
      {
        type: "p",
        html: "The audit above works with fifty photos. It breaks with twenty thousand, which is exactly where a long-term style shows. This is where software can help — not by telling you what your style should be, but by showing what you already do across everything you kept.",
      },
      {
        type: "p",
        html: "Photoreka analyses every photo you keep — subject, light, colour, composition and mood, plus eight artistic scores — and gives you several ways to look at the result.",
      },
      {
        type: "p",
        html: "The <a href='/blog/catalog-3d-universe-not-a-grid/'>2D/3D Atlas</a> places your whole catalog on one map, grouped by what the images actually look like: the dense regions are the work you keep returning to, and the empty space is the work you haven't made yet.",
      },
      {
        type: "image",
        alt: "2D Atlas of a photo catalog with clusters of thumbnails on a dark map and a side panel listing detected patterns such as People On Pathways and Red Rock Canyons",
        caption:
          "The Atlas groups a catalog by visual and stylistic similarity and names the patterns it finds.",
        src: "/report/2.webp",
      },
      {
        type: "p",
        html: "Reports summarise your dominant colour profiles, moods and recurring motifs, your strengths and gaps across the scoring criteria, and how your scores evolved month by month. They also name the narrative and contextual patterns that run through your work, each with example photos.",
      },
      {
        type: "image",
        alt: "Report showing narrative patterns such as Marketplace Narratives and Metropolitan Pathways, each with a written description and example photos",
        caption:
          "Narrative and contextual patterns detected across a collection: the recurring themes, written out with examples.",
        src: "/report/3.webp",
      },
      {
        type: "p",
        html: "And you can simply ask. <a href='/photo_chat/'>ChatLab</a> answers questions such as “Which collection best represents my style?”, “How has my style changed since 2022?” or “What's my most common lighting?” with your own photos as evidence. On the <a href='/ai_photo_storyboard/'>storyboard canvas</a>, an assistant that sees the board describes what holds a set of photos together — a useful first draft of the sentence from step 3.",
      },
      {
        type: "image",
        alt: "Storyboard canvas with street portraits laid out on a board and a chat panel describing the set as an exploration of urban experience that balances intimate portraiture with layered compositions",
        caption:
          "Asked about a board of portraits, the assistant puts its common thread into words and suggests photos from the archive that fit it.",
        src: "/canvas/chatlab.webp",
      },
      {
        type: "p",
        html: "Treat it as the stranger from step 1, but one who has looked at every photo instead of twenty. The sentence that describes your style is still yours to write. It works best on a curated body of work: first insights appear from around a hundred photos, and patterns over time become meaningful with a few hundred spread across years.",
      },
      {
        type: "cta",
        eyebrow: "See your style from the outside",
        title: "Explore a real photographer's catalog",
        text: "The demo includes the Atlas, a style report and ChatLab on a real, already-curated archive. Nothing to install.",
        buttonLabel: "Try the Demo",
        action: "demo",
      },
    ],
  },
  {
    slug: "white-border-instagram-photos",
    title:
      "How to Add White Borders to Instagram Photos — in Bulk and Without Cropping",
    excerpt:
      "You framed a landscape in 3:2 and Instagram wants to cut the sides off. A white border keeps the whole photo and makes every post in a carousel the same shape. Which canvas size to pick, the ways to add borders, and how to frame a whole batch at once for free.",
    description:
      "How to post full photos on Instagram without cropping: why photographers add white borders, which aspect ratio to use (4:5, 3:4, 1:1, 9:16), how to handle mixed carousels, and how to add borders to many photos at once for free.",
    keywords:
      "white border instagram, add white border to photos for instagram, how to post full photo on instagram without cropping, instagram border, white frame instagram photo, add border to multiple photos at once, batch add white border to photos, bulk photo border free, instagram 4:5 border, instagram 3:4 photo, instagram carousel different sizes, post landscape photo on instagram without cropping, white border app alternative, free photo framer online",
    category: "Photography Tips",
    tags: ["Instagram", "White Borders", "Free Framer", "Batch Editing"],
    coverImage: "/blog/instagram_white_borders.webp",
    publishedAt: "2026-11-09",
    readingMinutes: 6,
    author: { name: "Photoreka Team", role: "Product" },
    toc: true,
    content: [
      {
        type: "p",
        html: "You composed a landscape in 3:2, every centimetre of it on purpose, and Instagram offers to cut off the sides. The white border is the photographers' answer: place the whole photo on a canvas of the shape Instagram likes, fill the rest with white, and nothing gets cropped. It is simple, it looks deliberate — and done one photo at a time it eats an evening. <strong>Here is how to choose the canvas and frame a whole batch in one go.</strong>",
      },
      {
        type: "h2",
        text: "Why Photographers Add White Borders",
        id: "why-white-borders",
      },
      {
        type: "list",
        items: [
          "No cropping. The audience sees the photo as you framed it, not Instagram's guess at the important part.",
          "Mixed carousels stay intact. Instagram gives every slide of a carousel the shape of the first one. Put verticals and horizontals on the same canvas and none of them loses its edges.",
          "A consistent feed. Every post has the same shape and the same margin, which reads like a gallery wall instead of a pile of crops.",
          "Breathing room. The white separates the photo from the posts around it, so the eye stays on the image for a moment longer.",
        ],
      },
      {
        type: "h2",
        text: "Pick the Right Canvas Shape",
        id: "aspect-ratio",
      },
      {
        type: "p",
        html: "The border is defined by the canvas, not by the photo. Choose the canvas shape first and keep it for the whole post:",
      },
      {
        type: "list",
        items: [
          "4:5 (portrait): the classic tall feed format and the safest default. It takes much more vertical space in the feed than a square or a horizontal post.",
          "3:4 (vertical): the same shape as the thumbnails on your profile grid, so the grid shows the whole post, border included, instead of trimming it.",
          "1:1 (square): the original Instagram format. It takes the least space in the feed but gives the most uniform, old-school grid.",
          "9:16 (story): for stories, where an unframed horizontal photo looks lost in the middle of the screen.",
        ],
      },
      {
        type: "p",
        html: "A horizontal photo on a vertical canvas will always have more white above and below than on the sides; that is the trade-off for not cropping. What makes it look intentional is a <strong>consistent margin</strong>: the same thin border on the sides of every photo, whatever its orientation.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "One canvas per carousel",
        html: "Decide the canvas before you frame, and frame every photo of the carousel with the same ratio and the same margin. Mixing a 4:5 border with an unframed square makes the second slide look like a mistake.",
      },
      {
        type: "h2",
        text: "Ways to Add the Border",
        id: "ways-to-add-borders",
      },
      {
        type: "h3",
        text: "Phone apps",
        id: "phone-apps",
      },
      {
        type: "p",
        html: "Apps such as White Border or Whitagram are quick for a single photo straight from the camera roll. For batches they are less generous: free versions usually cap how many photos you can frame at once, show ads or ask for a purchase to unlock batch export. Fine for one post a week, tedious for a trip.",
      },
      {
        type: "h3",
        text: "Photoshop or Lightroom",
        id: "photoshop-lightroom",
      },
      {
        type: "p",
        html: "In Photoshop you can record an action that enlarges the canvas and run it with File → Automate → Batch. It works, but the canvas you need depends on each photo's shape, so one action rarely fits both verticals and horizontals. Lightroom Classic has no border option in its export dialog; you need an export plugin such as LR/Mogrify, or the Print module's Print to JPEG workaround, one layout at a time.",
      },
      {
        type: "h3",
        text: "A free batch tool in the browser",
        id: "batch-tool",
      },
      {
        type: "p",
        html: "<a href='/framer/'>Free Framer</a> is the tool we built for exactly this job. You drop as many photos as you like, choose a canvas — Instagram presets for 1:1, 3:4, 4:5 and 9:16, plus classic, cinema and print ratios — set the margin and the frame colour, and download everything as a ZIP. There is no account, no watermark and no batch limit, and the photos are processed in your browser instead of being uploaded to a server.",
      },
      {
        type: "image",
        alt: "Free Framer interface with a grid of canvas presets for Instagram, Facebook, X and LinkedIn, a preview of a photo with a white border, a margin slider and frame colour swatches",
        caption:
          "Free Framer: choose a canvas preset, set the margin and colour, and every selected photo gets the same frame.",
        src: "/home/free_framer.webp",
      },
      {
        type: "h2",
        text: "Step by Step with Free Framer",
        id: "step-by-step",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Free Framer and drop the photos for the post — or a whole month of posts.",
          "Choose the Instagram preset: 4:5 or 3:4 for the feed, 9:16 for stories.",
          "Set the margin, and check one horizontal and one vertical photo in the preview before going further.",
          "Pick the frame colour: white for a gallery look, black for night and moody work, or grey, warm grey, cream or beige.",
          "Download all the framed photos as a ZIP and post them.",
        ],
      },
      {
        type: "h2",
        text: "Before You Post: Choose the Photos",
        id: "choose-the-photos",
      },
      {
        type: "p",
        html: "A border makes a photo look finished; it doesn't make it better. The decision that matters more is which photos earn a post, and in what order the slides of a carousel should go. Our guides on <a href='/blog/how-to-pick-your-best-photos/'>how to pick your best photos</a> and <a href='/blog/how-to-sequence-photos/'>how to sequence photos</a> cover both. If you want a second opinion before posting, <a href='/ai_photo_picks/'>Photoreka Picks</a> ranks your photos with an AI jury and explains each score in a short critique, and the first 10 photos are free.",
      },
      {
        type: "cta",
        eyebrow: "Frame a whole batch",
        title: "White borders for every photo, in one go",
        text: "Instagram presets, any number of photos, one ZIP. Free, no account, no watermark.",
        buttonLabel: "Open Free Framer",
        action: "link",
        href: "/framer/",
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
