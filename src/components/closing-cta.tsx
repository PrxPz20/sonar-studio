"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "./button-link";
import { LoadingRadar } from "./loading-radar";

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
            {body && <p>{body}</p>}
            <div className="button-row">
              <ButtonLink href={primaryHref}>{primary}</ButtonLink>
              {secondary && <ButtonLink href={secondaryHref} secondary>{secondary}</ButtonLink>}
            </div>
          </div>

          <div className="closing-signal" aria-hidden="true">
            <LoadingRadar />
          </div>
        </div>
      </div>
    </section>
  );
}
