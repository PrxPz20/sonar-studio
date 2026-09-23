"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "./button-link";

const steps = [
  {
    title: "Free teardown.",
    body: "I record a short video showing exactly where your business is invisible, who is being recommended instead of you, and what it's costing you.",
  },
  {
    title: "Build and optimise.",
    body: "I design, build and engineer your website so that search engines and AI can read it, trust it and recommend it.",
  },
  {
    title: "Get recommended.",
    body: "You start appearing when your customers search — and when they ask AI who to go to.",
  },
] as const;

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const progressLine = progressRef.current;
      if (!section || !progressLine) return;

      const staticLayout = matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches;
      if (staticLayout) {
        progressLine.style.transform = "scaleY(1)";
        return;
      }

      const bounds = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      const nextStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));

      progressLine.style.transform = `scaleY(${progress})`;
      setActiveStep((current) => current === nextStep ? current : nextStep);
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    addEventListener("scroll", requestUpdate, { passive: true });
    addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", requestUpdate);
      removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="process-timeline section-deep" ref={sectionRef} aria-labelledby="process-timeline-title">
      <div className="process-timeline-sticky">
        <div className="shell process-timeline-grid">
          <header className="process-timeline-intro">
            <h2 id="process-timeline-title">Three steps. No jargon.</h2>
            <p className="process-timeline-count" aria-hidden="true">
              <strong>0{activeStep + 1}</strong><span>/ 03</span>
            </p>
          </header>

          <div className="process-timeline-rail" aria-hidden="true">
            <span className="process-timeline-progress" ref={progressRef} />
            <div className="process-timeline-markers">
              {steps.map((step, index) => (
                <span className={index <= activeStep ? "is-active" : ""} key={step.title} />
              ))}
            </div>
          </div>

          <div className="process-timeline-content">
            <ol className="process-timeline-scenes">
              {steps.map((step, index) => (
                <li
                  className={index === activeStep ? "is-active" : index < activeStep ? "is-before" : "is-after"}
                  aria-current={index === activeStep ? "step" : undefined}
                  key={step.title}
                >
                  <span className="process-timeline-number">0{index + 1}</span>
                  <div><h3>{step.title}</h3><p>{step.body}</p></div>
                </li>
              ))}
            </ol>
            <ButtonLink href="/contact">Get your free teardown</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
