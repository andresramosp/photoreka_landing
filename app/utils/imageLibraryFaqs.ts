// Shared by app/pages/ai_image_library_search.vue and its FAQPage JSON-LD in
// config/seo.ts, so the structured data always matches the visible answers.
export const IMAGE_LIBRARY_FAQS = [
  {
    question: "What does Photoreka do for businesses and agencies?",
    answer:
      "Photoreka is an AI search and curation layer for a company's image library. It analyzes the images in the storage you already use and lets you find any of them by describing it, clean up near-duplicates, score shots for quality and commercial intent, recover missing locations, and assemble selections for campaigns, brochures, or catalogs.",
  },
  {
    question: "Is Photoreka a DAM (digital asset management) system?",
    answer:
      "No. A DAM manages permissions, licences, approvals, and distribution, and Photoreka does none of that. It makes the images you already have findable and rankable. That's why it fits next to your storage, or next to a DAM you already run, as the search layer those tools are missing.",
  },
  {
    question: "Can our whole team use the same account?",
    answer:
      "Not today. Each Photoreka account belongs to one person. The usual setup is that whoever manages the image library — a marketing, content, or e-commerce lead — runs the analysis and the searches, and hands colleagues the images they need.",
  },
  {
    question: "Do we have to move or re-upload our image library?",
    answer:
      "No. Connect Dropbox, Google Photos, or a Lightroom Classic catalog, or upload local files. Photoreka builds its analysis from compressed previews, so your originals stay exactly where they are, with the same folder structure.",
  },
  {
    question: "Does it work with Google Drive or SharePoint?",
    answer:
      "Not directly. Today the sources are Dropbox, Google Photos, Lightroom Classic, and local files. Images kept in Google Drive or SharePoint can be added by uploading them from a folder synced to your computer.",
  },
  {
    question: "How large an image library can Photoreka handle?",
    answer:
      "It works best with a curated library of up to about 20,000 images, and libraries of up to 50,000 have been tested. It's built for the working library a business actually uses — destination photos, product shoots, brand imagery — rather than millions of raw files.",
  },
  {
    question: "Does Photoreka add keywords or export metadata to our files?",
    answer:
      "No. Photoreka doesn't write keywords, captions, or IPTC metadata back to your files. It makes images searchable by what's in them, so nobody has to keyword them to find them later.",
  },
  {
    question: "Is our content kept private?",
    answer:
      "Yes. Photoreka stores only reduced versions of your images to power search and curation, analyzed under agreements that prevent retaining or reusing them. Your images are never shared, and you keep 100% of the rights.",
  },
  {
    question: "How does pricing work?",
    answer:
      "There is no monthly subscription. You pay once to analyze a batch of images; after that, most tools are free within daily limits, or unlimited with credits. During early access, a free photo package and usage credits are available.",
  },
];
