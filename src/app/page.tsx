import type { Metadata } from "next";
import Link from "next/link";
import { AIChatMessage } from "@/components/ai-chat-message";
import { AIFlip } from "@/components/ai-flip";
import { AgencySection } from "@/components/agency-section";
import { ButtonLink } from "@/components/button-link";
import { ClosingCta } from "@/components/closing-cta";
import { Faq } from "@/components/faq";
import { HeroSignal } from "@/components/hero-signal";
import { ProcessTimeline } from "@/components/process-timeline";
import { ProofMedia } from "@/components/proof-media";
import { homeFaqs } from "@/lib/content";
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
            <h1>Get found when your customers ask <AIFlip /></h1>
            <p className="hero-copy">We build websites engineered to be recommended by ChatGPT, Google and every AI engine your customers now use to decide who to trust.</p>
            <div className="button-row"><ButtonLink href="/contact">Get a free teardown</ButtonLink><ButtonLink href="/results" secondary>See the proof</ButtonLink></div>
          </div>
        </div>
        <a className="hero-scroll-cue" href="#home-content" aria-label="Scroll to explore">
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10.5 12 15l5-4.5" />
          </svg>
        </a>
      </section>

      <div className="main-content-frame" id="home-content">
      <section className="section-deep section-pad">
        <div className="shell shift-grid">
          <h2>Your customers stopped scrolling. Now they just ask.</h2>
          <div className="shift-copy">
            <p className="section-copy">More and more people open ChatGPT or Google and ask it to recommend a business. In seconds they get a shortlist of names, and they call one. If your business isn't on that list, you were never in the running. Most websites are completely invisible to these engines — not because the business isn't good, but because nothing on the site tells an AI what it does, where it does it, or why it should be trusted. That's the gap we close.</p>
            <Link className="text-link" href="/insights">How AI decides who to recommend<span className="text-link-arrow" aria-hidden="true">→</span></Link>
          </div>
          <AIChatMessage />
        </div>
      </section>

      <section className="proof-section section-dark">
        <div className="shell proof-showcase">
          <h2>We made AI recommend a real business.</h2>
          <ProofMedia />
        </div>
      </section>

      <ProcessTimeline />

      <AgencySection />

      <section className="section-deep section-pad">
        <div className="shell faq-layout"><div><h2>Questions, answered.</h2><Link className="text-link" href="/contact">Still have a question? Get in touch<span className="text-link-arrow" aria-hidden="true">→</span></Link></div><Faq items={homeFaqs} /></div>
      </section>

      <ClosingCta title="Let's make you the one that gets found." body="Send me your details and I'll record you a free three-minute teardown showing exactly where you stand. No obligation, no sales call." secondary="See the results first" />
      </div>
    </main>
  );
}
