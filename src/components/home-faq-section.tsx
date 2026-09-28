"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { FaqItem } from "@/lib/content";

function BlurredStagger({ text }: { text: string }) {
  return (
    <p className="home-faq-stagger">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <span
            className="home-faq-letter"
            key={`${char}-${index}`}
            style={{ "--letter-delay": `${Math.min(index * 12, 1600)}ms` } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
    </p>
  );
}

export function HomeFaqSection({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="home-faq-section section-deep" id="faq">
      <div className="shell home-faq-layout">
        <div className="home-faq-intro">
          <h2>Questions, answered.</h2>
          <Link className="text-link" href="/contact">
            Still have a question? Get in touch
            <span className="text-link-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="home-faq-list">
          {items.map((item, index) => {
            const isOpen = open === index;
            const triggerId = `home-faq-trigger-${index}`;
            const panelId = `home-faq-panel-${index}`;

            return (
              <div className="home-faq-item" data-open={isOpen} key={item.question}>
                <h3>
                  <button
                    id={triggerId}
                    className="home-faq-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="home-faq-toggle" aria-hidden="true" />
                  </button>
                </h3>

                <div
                  id={panelId}
                  className="home-faq-answer"
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                >
                  <div className="home-faq-answer-clip">
                    <div className="home-faq-answer-content">
                      <BlurredStagger text={item.answer} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
