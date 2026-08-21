import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ClosingCta } from "@/components/closing-cta";
import { Faq } from "@/components/faq";
import { HeroSignal } from "@/components/hero-signal";
import { ProofMedia } from "@/components/proof-media";
import { TransducerStage } from "@/components/transducer-stage";
import { homeFaqs, tiers } from "@/lib/content";
import { faqSchema, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Get found when customers ask AI",
  "Websites engineered to be recommended by ChatGPT, Google and the AI engines your customers use.",
  "/",
);

export default function Home() {
  return (
    <main>
      <JsonLd data={faqSchema(homeFaqs)} />
      <section className="hero">
        <HeroSignal />
        <div className="hero-content">
          <div>
            <h1>Get found when your customers ask AI.</h1>
            <p className="hero-copy">We build websites engineered to be recommended by ChatGPT, Google and every AI engine your customers now use to decide who to trust.</p>
            <div className="button-row"><ButtonLink href="/contact">Get a free teardown</ButtonLink><ButtonLink href="/results" secondary>See the proof</ButtonLink></div>
          </div>
        </div>
      </section>

      <section className="section-deep section-pad">
        <div className="shell shift-grid">
          <h2>Your customers stopped scrolling. Now they just ask.</h2>
          <div className="shift-copy">
            <p className="section-copy">More and more people open ChatGPT or Google and ask it to recommend a business. In seconds they get a shortlist of names, and they call one. If your business isn't on that list, you were never in the running. Most websites are completely invisible to these engines — not because the business isn't good, but because nothing on the site tells an AI what it does, where it does it, or why it should be trusted. That's the gap we close.</p>
            <Link className="text-link" href="/insights">How AI decides who to recommend →</Link>
          </div>
        </div>
      </section>

      <section className="proof-section section-dark">
        <div className="shell">
          <div className="proof-intro">
            <h2>We made AI recommend a real business.</h2>
            <div>
              <p>Before the rebuild, this vehicle repair garage didn't appear when people asked ChatGPT to recommend a mechanic for their car. After the rebuild, it does — by name. Same business, same service, same town. A different website.</p>
              <div className="button-row"><ButtonLink href="/results">See the full case study</ButtonLink><ButtonLink href="/contact" secondary>Get the same for your business</ButtonLink></div>
            </div>
          </div>
          <ProofMedia />
        </div>
      </section>

      <section className="section-mist section-pad">
        <div className="shell">
          <div className="tier-intro"><h2>One outcome. Three ways in.</h2><p>Every build is engineered for AI search, Google and conversion from the first line of code. Choose the scope that fits where your business is right now.</p></div>
          <div className="tier-stack">
            {tiers.map((tier) => (
              <article className={`tier-row ${tier.recommended ? "recommended" : ""}`} key={tier.name}>
                <div><p className="tier-name">{tier.name}</p>{tier.recommended && <span className="recommended-tag">the recommended option — most businesses choose this</span>}</div>
                <p className="tier-outcome">{tier.outcome}.</p><p className="tier-summary">{tier.summary}</p><Link className="text-link" href="/contact">Start your project →</Link>
              </article>
            ))}
          </div>
          <div className="button-row"><ButtonLink href="/contact">Start your project</ButtonLink><ButtonLink href="/services" secondary>Compare what's included</ButtonLink></div>
        </div>
      </section>

      <section className="section-deep section-pad">
        <div className="shell process-grid">
          <TransducerStage />
          <div className="process-copy">
            <h2>Three steps. No jargon.</h2>
            <div className="steps">
              <div className="step"><span className="step-number">01</span><div><h3>Free teardown.</h3><p>I record a short video showing exactly where your business is invisible, who is being recommended instead of you, and what it's costing you.</p></div></div>
              <div className="step"><span className="step-number">02</span><div><h3>Build and optimise.</h3><p>I design, build and engineer your website so that search engines and AI can read it, trust it and recommend it.</p></div></div>
              <div className="step"><span className="step-number">03</span><div><h3>Get recommended.</h3><p>You start appearing when your customers search — and when they ask AI who to go to.</p></div></div>
            </div>
            <ButtonLink href="/contact">Get your free teardown</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-dark section-pad">
        <div className="shell why-grid">
          <div className="why-copy"><h2>Agency-quality. Without agency prices.</h2><p>Sonar Studio is one specialist, not a chain of account managers. You work directly with the person who designs, builds and optimises your website. That means sharper work, faster turnarounds, and a price that undercuts agencies charging triple for less.</p><div className="button-row"><ButtonLink href="/contact">Start your project</ButtonLink><ButtonLink href="/about" secondary>About Sonar</ButtonLink></div></div>
          <div className="why-points">
            {["A direct line to the person building your site", "An AI-search specialist, not a generalist", "Remote and fast — no meetings unless you want them", "A proven result, not a promise"].map((point, index) => <div className="why-point" key={point}><span>0{index + 1}</span><span>{point}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section-deep section-pad">
        <div className="shell faq-layout"><div><h2>Questions, answered.</h2><Link className="text-link" href="/contact">Still have a question? Get in touch →</Link></div><Faq items={homeFaqs} /></div>
      </section>

      <ClosingCta title="Let's make you the one that gets found." body="Send me your details and I'll record you a free three-minute teardown showing exactly where you stand. No obligation, no sales call." secondary="See the results first" />
    </main>
  );
}
