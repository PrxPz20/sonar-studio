import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ClosingCta } from "@/components/closing-cta";
import { Faq } from "@/components/faq";
import { PageHeader } from "@/components/page-header";
import { serviceFaqs, tiers } from "@/lib/content";
import { breadcrumbs, faqSchema, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Websites built to be recommended", "AI-search-optimised websites in three scopes, plus ongoing care and growth.", "/services");

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <JsonLd data={faqSchema(serviceFaqs)} />
      <PageHeader title="Websites built to be recommended." actions={<><ButtonLink href="/contact">Start your project</ButtonLink><ButtonLink href="/contact" secondary>Get a free teardown</ButtonLink></>}>
        <p>Not just designed — engineered. For AI search, for Google, and for turning the people who find you into customers who contact you.</p>
      </PageHeader>

      <section className="content-section section-dark">
        <div className="shell">
          <h2 className="content-heading">Choose your scope.</h2>
          <p className="content-lead">The same engineering underpins all three. The difference is how far you want to go.</p>
          <div style={{ marginTop: 64 }}>
            {tiers.map((tier) => (
              <article className={`service-tier ${tier.recommended ? "recommended" : ""}`} key={tier.name}>
                <div><h3>{tier.name} · {tier.outcome}</h3>{tier.recommended && <span className="recommended-tag">Recommended</span>}</div>
                <p>{tier.audience}</p>
                <ul>{tier.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <ButtonLink href={`/contact?tier=${tier.name.toLowerCase()}`} secondary={!tier.recommended}>Enquire</ButtonLink>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/contact">Not sure which one? Get a free teardown and I'll tell you →</Link>
        </div>
      </section>

      <section className="content-section section-deep">
        <div className="shell">
          <h2 className="content-heading">Your website shouldn't stand still.</h2>
          <p className="content-lead">Search and AI change every single month. Competitors publish, engines update, and a site that was visible in January can be invisible by June. These plans keep that from happening.</p>
          <div className="plan-grid">
            <article className="plan-block"><h3>Care plan:</h3><p>Hosting, maintenance, security, backups, small content edits, and keeping your search presence healthy.</p></article>
            <article className="plan-block"><h3>Growth plan:</h3><p>Everything in Care, plus regular content, ongoing AI-search optimisation, automation monitoring, and a plain-English monthly report.</p><ButtonLink href="/contact">Add ongoing growth</ButtonLink></article>
          </div>
        </div>
      </section>

      <section className="content-section section-dark">
        <div className="shell difference-grid">
          <div><h2 className="content-heading">Most websites are built to look nice. Yours is built to be found.</h2><p className="content-lead">Good design is the price of entry. What actually brings you customers is being the answer when someone searches, or asks an AI who to trust. Every Sonar website is structured so that Google and AI engines can read it, understand it, and recommend it — using clean structured data, answer-ready content, and the technical signals most designers never touch.</p><ButtonLink href="/contact">Start your project</ButtonLink></div>
          <ul className="point-list"><li>AI-readable structure and schema markup</li><li>Answer-first content, written the way people actually ask</li><li>Fast, technically clean, mobile-first</li><li>Local signals so you win &quot;near me&quot; searches</li></ul>
        </div>
      </section>

      <section className="content-section section-deep">
        <div className="shell faq-layout"><h2>How working together actually goes.</h2><Faq items={serviceFaqs} /></div>
      </section>
      <ClosingCta title="Ready to be the one that gets found?" primary="Start your project" secondary="Get a free teardown" secondaryHref="/contact" />
    </main>
  );
}
