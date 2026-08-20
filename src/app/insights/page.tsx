import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { PageHeader } from "@/components/page-header";
import { articles } from "@/lib/content";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("How businesses get found in the age of AI", "Plain-English guides to AI recommendations, GEO, AEO and search visibility.", "/insights");

export default function InsightsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <PageHeader title="How businesses get found in the age of AI." actions={<ButtonLink href="/contact">Get a free teardown</ButtonLink>}>
        <p>Teardowns, guides and plain-English breakdowns of how AI engines decide who to recommend — and what you can do about it.</p>
      </PageHeader>
      <section className="content-section section-dark"><div className="shell article-index">{articles.map((article, index) => <Link className="article-link" href={`/insights/${article.slug}`} key={article.slug}><span>0{index + 1}</span><div><h2>{article.title}</h2><p>{article.description}</p></div><span aria-hidden="true">↗</span></Link>)}</div></section>
    </main>
  );
}
