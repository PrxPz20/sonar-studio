import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { ClosingCta } from "@/components/closing-cta";
import { Faq } from "@/components/faq";
import { PageHeader } from "@/components/page-header";
import { serviceFaqs } from "@/lib/content";
import { breadcrumbs, faqSchema, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Websites built to be recommended", "AI-search-optimised websites built around what each business actually needs.", "/services");

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <JsonLd data={faqSchema(serviceFaqs)} />
      <PageHeader title="Websites built to be recommended." actions={<><ButtonLink href="/contact?intent=project">Start your project</ButtonLink><ButtonLink href="/contact?intent=teardown" secondary>Get a free teardown</ButtonLink></>}>
        <p>Not just designed — engineered. For AI search, for Google, and for turning the people who find you into customers who contact you.</p>
      </PageHeader>

      <section className="content-section content-section-compact section-dark">
        <div className="shell difference-grid">
          <div><h2 className="content-heading">Most websites are built to look nice. Yours is built to be found.</h2><p className="content-lead">Good design is the price of entry. What actually brings you customers is being the answer when someone searches, or asks an AI who to trust. Every Sonar website is structured so that Google and AI engines can read it, understand it, and recommend it — using clean structured data, answer-ready content, and the technical signals most designers never touch.</p><ButtonLink href="/contact?intent=project">Start your project</ButtonLink></div>
          <ul className="point-list"><li>AI-readable structure and schema markup</li><li>Answer-first content, written the way people actually ask</li><li>Fast, technically clean, mobile-first</li><li>Local signals so you win &quot;near me&quot; searches</li></ul>
        </div>
      </section>

      <section className="content-section section-deep">
        <div className="shell faq-layout"><h2>How working together actually goes.</h2><Faq items={serviceFaqs} /></div>
      </section>
      <ClosingCta title="Ready to be the one that gets found?" primary="Start your project" primaryHref="/contact?intent=project" secondary="Get a free teardown" secondaryHref="/contact?intent=teardown" />
    </main>
  );
}
