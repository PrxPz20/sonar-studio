import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { ClosingCta } from "@/components/closing-cta";
import { PageHeader } from "@/components/page-header";
import { ProofMedia } from "@/components/proof-media";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Proof beats promises", "A real AI-search case study, documented with unedited before and after screenshots.", "/results");

export default function ResultsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Results", path: "/results" }])} />
      <PageHeader title="Proof beats promises." actions={<ButtonLink href="/contact">Get results like these</ButtonLink>}>
        <p>Anyone can claim they understand AI search. Here's a real business, a real rebuild, and the screenshots to show what changed.</p>
      </PageHeader>
      <section className="content-section section-dark">
        <div className="shell">
          <div className="case-grid">
            <h2 className="content-heading">From invisible to recommended.</h2>
            <div>
              <div className="case-part"><h3>The problem.</h3><p>A vehicle repair garage with a real reputation and years of experience, but a website that told search engines and AI almost nothing. When customers asked ChatGPT to recommend a mechanic for their car, the garage never came up. Competitors did.</p></div>
              <div className="case-part"><h3>What we did.</h3><p>We rebuilt the website from the ground up — clear service pages, structured data describing exactly what the garage does and where, answer-first content written the way customers actually ask their questions, and the technical foundations that let an AI quote a business with confidence.</p></div>
              <div className="case-part"><h3>The result.</h3><p>After the rebuild, ChatGPT recommends the garage by name when customers ask for that service in that area. Same business. Same mechanics. A website that finally speaks the language search engines and AI understand.</p></div>
            </div>
          </div>
          <div style={{ marginTop: 72 }}><ProofMedia /></div>
          <div className="button-row"><ButtonLink href="/contact">Start your project</ButtonLink><ButtonLink href="/services" secondary>See the services</ButtonLink></div>
        </div>
      </section>
      <section className="content-section section-deep"><div className="shell future-result"><h2 className="content-heading">More results, as they land.</h2><p>Sonar Studio is a new studio, and every project gets documented the same way — honestly, with real screenshots. This is where they'll appear.</p></div></section>
      <ClosingCta title="Want to be the next result?" body="I'll show you exactly where you stand today, free, in three minutes." secondary="See the services" secondaryHref="/services" />
    </main>
  );
}
