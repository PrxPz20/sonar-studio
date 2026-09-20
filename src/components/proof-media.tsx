"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const proofImages = {
  before: {
    src: "/brand/milikouros_before.webp",
    alt: "ChatGPT recommendations before the website rebuild",
    label: "Before",
    width: 3600,
  },
  after: {
    src: "/brand/milikouros_after.webp",
    alt: "ChatGPT recommending Milikouros Car Services after the website rebuild",
    label: "After",
    width: 3594,
  },
} as const;

type ProofKey = keyof typeof proofImages;

export function ProofMedia() {
  const media = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [activeProof, setActiveProof] = useState<ProofKey>("after");

  function openProof(proof: ProofKey, trigger: HTMLButtonElement) {
    opener.current = trigger;
    setActiveProof(proof);
    dialog.current?.showModal();
    closeButton.current?.focus();
  }

  const activeImage = proofImages[activeProof];

  useEffect(() => {
    const element = media.current;
    if (!element || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
    <>
      <figure className="proof-media" ref={media}>
        <div className="proof-card-track">
          {(Object.keys(proofImages) as ProofKey[]).map((proof) => {
            const image = proofImages[proof];
            return (
              <button
                className={`proof-shot proof-${proof}`}
                type="button"
                aria-haspopup="dialog"
                aria-label={`View full ${image.label.toLowerCase()} screenshot`}
                onClick={(event) => openProof(proof, event.currentTarget)}
                key={proof}
              >
                <Image className="proof-image" src={image.src} alt={image.alt} width={image.width} height={2338} sizes="(max-width: 767px) 82vw, 50vw" />
                <span className="proof-label">{image.label}</span>
                <span className="proof-view" aria-hidden="true">View full screenshot ↗</span>
              </button>
            );
          })}
        </div>
        <figcaption>Before and after. Real screenshots, unedited.</figcaption>
      </figure>

      <dialog
        className="proof-dialog"
        ref={dialog}
        aria-label={`${activeImage.label} result screenshot`}
        onClose={() => opener.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="proof-dialog-toolbar">
          <p><strong>{activeImage.label}</strong> · Full screenshot. Scroll to inspect.</p>
          <button ref={closeButton} type="button" onClick={() => dialog.current?.close()} aria-label="Close full screenshot">Close</button>
        </div>
        <div className="proof-dialog-scroll">
          <Image className="proof-dialog-image" src={activeImage.src} alt={activeImage.alt} width={activeImage.width} height={2338} sizes="1200px" priority />
        </div>
      </dialog>
    </>
  );
}
