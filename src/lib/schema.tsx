import { homeFaqs, site, tiers, type FaqItem } from "./content";

const socialProfiles = [
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
].filter((profile): profile is string => Boolean(profile));

const founderName = process.env.NEXT_PUBLIC_FOUNDER_NAME;

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      areaServed: ["GB", "IE", "CY"],
      knowsAbout: ["AI search optimisation", "AEO", "GEO", "SEO", "Web design"],
      ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
      ...(founderName
        ? { founder: { "@type": "Person", name: founderName } }
        : {}),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.name,
      url: site.url,
      email: site.email,
      areaServed: ["GB", "IE", "CY"],
      provider: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
    },
    ...tiers.map((tier) => ({
      "@type": "Service",
      name: `${tier.name} · ${tier.outcome}`,
      description: tier.summary,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: ["GB", "IE", "CY"],
    })),
  ],
};

export function faqSchema(faqs: readonly FaqItem[] = homeFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}
