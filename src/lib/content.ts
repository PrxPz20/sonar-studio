export const site = {
  name: "Sonar Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sonarstudio.net",
  email: "hello@sonarstudio.net",
  description:
    "Sonar Studio builds websites engineered to be found by Google and recommended by AI engines.",
} as const;

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const homeFaqs = [
  {
    question: "What is AI-search optimisation?",
    answer:
      "It's building your website so AI engines can understand and recommend it. When someone asks ChatGPT or Google to suggest a business, those engines read websites to decide who to name. Optimising for that means structuring your content, data and pages so an AI can confidently quote you as the answer.",
  },
  {
    question: "Will this get me recommended by ChatGPT?",
    answer:
      "It dramatically improves your chances, but nobody can guarantee an AI's output. What I can promise is a proven method, real technical work, and honest monitoring of whether you're being mentioned. I've done it before for a real business, and I'll show you the receipts.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "It depends on scope — how many pages, whether you need booking, automation or ongoing content. Every project is quoted individually after we talk, and it will be meaningfully less than an agency charges for the same work. Send an enquiry and you'll get a straight answer.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most websites take two to five weeks from kickoff, depending on scope and how quickly content and feedback come back.",
  },
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "Any business that needs to be found — trades, clinics, professional services, hospitality, e-commerce and local services. If your customers search for what you do, this applies to you.",
  },
  {
    question: "I already have a website. Can you just optimise it?",
    answer:
      "Yes. If the site is solid, I can optimise it for AI and search without rebuilding it. If it isn't, I'll tell you honestly.",
  },
  {
    question: "Where are you based, and does it matter?",
    answer:
      "I'm based in Cyprus and work remotely with businesses across the UK, Ireland and beyond. Everything happens over email, video and screen-share, so location makes no difference to the work.",
  },
] as const;

export const serviceFaqs = [
  {
    question: "What do you need from me to start?",
    answer:
      "Your logo and brand assets if you have them, any existing content or photos, and a short conversation about what your business does and who you want to reach. If you don't have content, I'll help you write it.",
  },
  {
    question: "How many revisions do I get?",
    answer:
      "Two full rounds of revisions on the design, plus small refinements throughout the build. I'd rather get it right than count rounds.",
  },
  {
    question: "Who owns the website?",
    answer:
      "You do. The site, the domain and the content are yours. There's no lock-in, and I'll hand over everything if you ever want to move on.",
  },
  {
    question: "Can you work with my existing website?",
    answer:
      "Often yes. If the foundations are sound, optimisation alone can make a real difference. I'll look at it in the teardown and tell you honestly which route makes sense.",
  },
  {
    question: "How do payments work?",
    answer:
      "A deposit to start, the balance on launch. Invoices in euros or pounds. Everything agreed in writing before any work begins.",
  },
] as const;

export const articles = [
  {
    slug: "how-businesses-get-recommended-by-chatgpt",
    title: "How businesses get recommended by ChatGPT",
    description:
      "What AI engines actually read on a website, and why most sites give them nothing to work with.",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-21",
  },
  {
    slug: "why-your-website-is-invisible-to-ai",
    title: "Why your website is invisible to AI",
    description:
      "The five most common reasons an AI can't confidently name your business, and how each one is fixed.",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-21",
  },
  {
    slug: "seo-geo-aeo-explained",
    title: "SEO, GEO and AEO explained",
    description:
      "Three acronyms, one goal: being the answer. What each means in plain English, and why they now work together.",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-21",
  },
] as const;

export type FaqItem = { readonly question: string; readonly answer: string };
