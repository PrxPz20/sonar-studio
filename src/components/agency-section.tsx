"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "./button-link";

const points = [
  "A direct line to the person building your site",
  "An AI-search specialist, not a generalist",
  "Remote and fast — no meetings unless you want them",
  "A proven result, not a promise",
] as const;

export function AgencySection() {
  const section = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    element.dataset.motion = "ready";

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.motion = "visible";
      observer.disconnect();
    }, { threshold: 0.22, rootMargin: "0px 0px -8% 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="agency-section section-dark section-pad">
      <div className="shell">
        <div className="agency-editorial" ref={section}>
          <div className="agency-intro">
            <h2>Agency-quality. Without agency prices.</h2>
            <div className="agency-copy">
              <p>Sonar Studio is one specialist, not a chain of account managers. You work directly with the person who designs, builds and optimises your website. That means sharper work, faster turnarounds, and a price that undercuts agencies charging triple for less.</p>
              <div className="button-row"><ButtonLink href="/contact">Start your project</ButtonLink><ButtonLink href="/about" secondary>About Sonar</ButtonLink></div>
            </div>
          </div>

          <ol className="agency-points">
            {points.map((point, index) => (
              <li className="agency-point" key={point}>
                <span className="agency-number">0{index + 1}</span>
                <span className="agency-statement">{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
