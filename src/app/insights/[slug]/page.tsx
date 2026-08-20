import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, site, type FaqItem } from "@/lib/content";
import { breadcrumbs, faqSchema, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

const articleContent: Record<string, { sections: { heading: string; paragraphs: string[] }[]; faqs: FaqItem[] }> = {
  "how-businesses-get-recommended-by-chatgpt": {
    sections: [
      { heading: "What does ChatGPT read before it names a business?", paragraphs: ["AI engines build answers from information they can find, understand and corroborate. Your website is one of the clearest first-party sources available. It needs to state what you do, where you work, who you help and why the business is a credible answer.", "A vague homepage and a single services list make that job difficult. Individual, useful pages give an engine more specific evidence to retrieve and cite."] },
      { heading: "Why does structure matter as much as copy?", paragraphs: ["Structure tells a machine how the pieces relate. Clear headings, descriptive page titles, internal links and structured data turn a collection of marketing sentences into an understandable business entity.", "That does not mean writing for robots. The strongest pages answer real customer questions directly, then support the answer with useful detail."] },
      { heading: "What makes a business easier to recommend?", paragraphs: ["Consistency helps. The business name, services, location and contact details should agree across the website and credible external profiles. Specific service pages should describe the actual work rather than repeat broad claims.", "No method can guarantee a particular AI response. The goal is to remove ambiguity and give recommendation systems better evidence than the website provides today."] },
      { heading: "Where should you start?", paragraphs: ["Ask the same questions your customers ask, then inspect whether your website contains a direct, trustworthy answer. A free teardown can show where the gaps are before you decide whether optimisation or a rebuild makes sense."] },
    ],
    faqs: [
      { question: "Can a website guarantee a ChatGPT recommendation?", answer: "No. A website can improve the clarity and evidence available to AI engines, but nobody can guarantee a particular generated answer." },
      { question: "Does ChatGPT only use structured data?", answer: "No. Structured data helps describe the business, while clear page content, headings, internal links and external corroboration all contribute useful signals." },
      { question: "Do I need a separate page for every service?", answer: "Usually, important services benefit from focused pages because each page can answer the specific questions customers ask about that service." },
    ],
  },
  "why-your-website-is-invisible-to-ai": {
    sections: [
      { heading: "Does the site clearly say what the business does?", paragraphs: ["Many homepages lead with a slogan and make the actual service difficult to find. An AI engine should not have to infer the offer from mood-setting copy. State the service plainly, then explain it."] },
      { heading: "Is the location specific enough?", paragraphs: ["A business can be relevant and still disappear from a local recommendation if its service area is unclear. Put accurate location and area-served information in visible copy, metadata and structured data."] },
      { heading: "Are the important services trapped on one page?", paragraphs: ["One crowded services page gives every offer very little context. Focused pages create room for a direct answer, supporting detail, related questions and internal links."] },
      { heading: "Can the engine identify a trustworthy entity?", paragraphs: ["Consistent names, contact details, profiles and business information make it easier to connect references to the same organisation. Contradictions create uncertainty, and uncertain answers are less useful to recommendation systems."] },
      { heading: "Is the technical foundation getting in the way?", paragraphs: ["Slow rendering, missing metadata, confusing heading order and pages that depend entirely on client-side scripts can weaken discovery. Clean server-rendered HTML gives crawlers a reliable version of the content immediately.", "The fix starts with diagnosis. Review the site as both a customer and a machine-readable source, then address the gaps that block understanding first."] },
    ],
    faqs: [
      { question: "Why can Google find my site while AI does not recommend it?", answer: "Ranking for a branded query is different from being selected as a confident answer to a recommendation question. The site may lack specific service, location or trust information." },
      { question: "Can an existing website be optimised without rebuilding it?", answer: "Yes. If its structure and technical foundation are sound, focused content, metadata and structured data improvements may be enough." },
      { question: "What is the first thing to fix?", answer: "Start with clarity. Make sure the site states exactly what the business does, where it operates and which page answers each important customer question." },
    ],
  },
  "seo-geo-aeo-explained": {
    sections: [
      { heading: "What is SEO?", paragraphs: ["Search engine optimisation helps pages become discoverable and competitive in conventional search results. It covers technical quality, relevant content, authority, local signals and the experience visitors have after they arrive."] },
      { heading: "What is GEO?", paragraphs: ["Generative engine optimisation focuses on how AI systems retrieve, understand and reuse information when generating an answer. The practical work includes clear entity information, useful source content, corroboration and formats that are easy to quote accurately."] },
      { heading: "What is AEO?", paragraphs: ["Answer engine optimisation shapes content around direct questions and useful answers. It predates the current AI wave, but the principle is now more important: lead with the answer, then provide the context that makes it credible."] },
      { heading: "Why do all three work together?", paragraphs: ["They share the same foundation. A technically clean site with specific pages, direct answers and consistent business information is easier for search engines to rank and for AI engines to understand.", "Treating them as separate tricks creates fragmented work. Build one strong source of truth for customers, search crawlers and recommendation systems."] },
      { heading: "What should a business prioritise?", paragraphs: ["Prioritise the questions that lead to an enquiry. Give each important service a clear home, answer the decision-making questions, connect the pages properly and describe the business consistently across the web."] },
    ],
    faqs: [
      { question: "Does GEO replace SEO?", answer: "No. GEO builds on the same discoverability, technical quality and content foundations that make SEO effective." },
      { question: "Is AEO just adding an FAQ section?", answer: "No. FAQs can help, but AEO is the broader practice of giving direct, well-supported answers throughout the site." },
      { question: "Which one should a small business start with?", answer: "Start with a clean shared foundation: clear services, accurate local information, direct answers, structured data and technically sound pages." },
    ],
  },
};

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article ? pageMetadata(article.title, article.description, `/insights/${slug}`) : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  const content = articleContent[slug];
  if (!article || !content) notFound();
  const url = `${site.url}/insights/${slug}`;
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: article.title, path: `/insights/${slug}` }])} />
      <JsonLd data={faqSchema(content.faqs)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, mainEntityOfPage: url, author: { "@id": `${site.url}/#organization` }, publisher: { "@id": `${site.url}/#organization` } }} />
      <article className="article-shell">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/insights">Insights</Link> / {article.title}</nav>
        <h1>{article.title}</h1><p className="article-dek">{article.description}</p>
        <div className="article-body">
          {content.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <h2>What should you do next?</h2><p>If you want to see how these principles apply to your current site, <Link href="/contact">request a free teardown</Link>. You can also compare the three <Link href="/services">website scopes</Link> or review the documented <Link href="/results">case study</Link>.</p>
        </div>
      </article>
    </main>
  );
}
