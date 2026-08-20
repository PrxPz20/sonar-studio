import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageHeader } from "@/components/page-header";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("One specialist. Your whole project", "Meet the solo specialist behind Sonar Studio and the direct way every project runs.", "/about");

export default function AboutPage() {
  const points = ["You always talk to the person doing the work", "Lower overhead means a fairer price for the same quality", "Decisions in minutes, not in meetings", "A specialist focus on AI search, not a menu of everything"];
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHeader title="One specialist. Your whole project." actions={<><ButtonLink href="/contact">Work with me</ButtonLink><ButtonLink href="/results" secondary>See the results</ButtonLink></>}>
        <p>Sonar Studio is a solo studio. The person you speak to is the person who designs your website, writes the code, and makes sure AI can find it. No hand-offs, no account managers, no markup.</p>
      </PageHeader>
      <section className="content-section section-deep"><div className="shell about-statement"><div><h2>Why Sonar exists.</h2><p>Too many businesses pay an agency a small fortune for a website that looks perfectly fine and never actually gets found. Meanwhile, the way people choose a business has quietly changed. They ask an AI. They read the answer. They call the first name they're given. Sonar Studio exists to fix exactly that gap — to build websites that are engineered to be the name that gets given, at a price that doesn't require an agency budget.</p></div></div></section>
      <section className="content-section section-dark"><div className="shell"><h2 className="content-heading" style={{ marginBottom: 56 }}>Why one person beats an agency.</h2><div className="about-points">{points.map((point, index) => <div className="about-point" key={point}><span>0{index + 1}</span>{point}</div>)}</div></div></section>
      <section className="content-section section-deep"><div className="shell difference-grid"><h2 className="content-heading">Remote, clear, and honest.</h2><div><p className="content-lead">Everything happens over email, video and screen-share, so it makes no difference whether you're in London, Dublin or Limassol. Scope is agreed before anything starts. I'll tell you what your business actually needs — including when that's less than you were about to pay for.</p><ButtonLink href="/contact">Start a project</ButtonLink></div></div></section>
    </main>
  );
}
