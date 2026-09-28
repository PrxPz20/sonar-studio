"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "./button-link";

export function ClosingCta({
  title,
  body,
  primary = "Get my free teardown",
  primaryHref = "/contact",
  secondary,
  secondaryHref = "/results",
}: {
  title: string;
  body?: string;
  primary?: string;
  primaryHref?: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = panel.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    element.dataset.motion = "ready";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.motion = "visible";
      observer.disconnect();
    }, { threshold: 0.24, rootMargin: "0px 0px -8% 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="closing-cta" id="closing-cta">
      <div className="shell">
        <div className="closing-grid" ref={panel}>
          <div className="closing-content">
            <h2>{title}</h2>
          </div>

          <div className="closing-trace" aria-hidden="true">
            <svg viewBox="0 0 1200 128" preserveAspectRatio="none">
              <path className="closing-trace-base" d="M0 64H252C284 64 288 20 320 20S356 108 388 108 424 64 456 64H1200" />
              <path className="closing-trace-active" pathLength="1" d="M0 64H252C284 64 288 20 320 20S356 108 388 108 424 64 456 64H1200" />
              <circle className="closing-trace-blip" cx="456" cy="64" r="5" />
            </svg>
          </div>

          <div className={`closing-lower${body ? "" : " closing-lower-actions-only"}`}>
            {body && <p>{body}</p>}
            <div className="button-row">
              <ButtonLink href={primaryHref}>{primary}</ButtonLink>
              {secondary && <ButtonLink href={secondaryHref} secondary>{secondary}</ButtonLink>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
