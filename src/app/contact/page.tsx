import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Tell me about your business", "Request a free, personal teardown of your business's visibility in search and AI.", "/contact");

export default function ContactPage() {
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  return (
    <main>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHeader title="Tell me about your business."><p>Fill this in and I'll come back to you personally — usually within a day, and often with a free teardown showing exactly where you stand in search and AI.</p></PageHeader>
      <section className="content-section section-deep"><div className="shell contact-layout"><ContactForm /><aside className="contact-aside"><h2 className="content-heading">No mystery, no sales pitch.</h2><div className="next-step"><span>01</span><h3>I reply personally.</h3><p>Usually within a day. A real answer from the person who'd do the work.</p></div><div className="next-step"><span>02</span><h3>You get a free teardown.</h3><p>A short video showing where your business is invisible, and who's being recommended instead.</p></div><div className="next-step"><span>03</span><h3>We scope it, if it fits.</h3><p>If it makes sense, we agree the scope and price in writing before anything starts.</p></div></aside></div></section>
      <section className="content-section section-dark"><div className="shell reach-grid"><h2 className="content-heading">Also reachable at</h2><div className="reach-links"><a href="mailto:hello@sonarstudio.net">hello@sonarstudio.net</a>{instagram && <a href={instagram}>Instagram</a>}{linkedin && <a href={linkedin}>LinkedIn</a>}<p>Based in Cyprus. Working with businesses across the UK, Ireland and beyond.</p></div></div></section>
    </main>
  );
}
