"use client";

import Link from "next/link";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./brand";
import { ButtonLink } from "./button-link";
import { navigation, site } from "@/lib/content";

export function SiteFooter() {
  const footer = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const element = footer.current;
    if (!element) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    if (motionQuery.matches || !("IntersectionObserver" in window)) {
      element.dataset.motion = "visible";
      return () => motionQuery.removeEventListener("change", updateMotion);
    }

    element.dataset.motion = "ready";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.motion = "visible";
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px 12% 0px" });

    observer.observe(element);
    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="footer-curtain" ref={footer}>
      <footer className="site-footer">
        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-stage shell">
          <div className="footer-word" aria-hidden="true">SONAR</div>
          <div className="footer-focus">
            <div className="footer-brand"><Brand /></div>
            <h2>Get found when your customers ask AI.</h2>
            <ButtonLink href="/contact">Get a free teardown</ButtonLink>
          </div>

          <div className="footer-link-area">
            <nav className="footer-menu" aria-label="Footer navigation">
              <Link href="/">Home</Link>
              {navigation.filter((item) => item.href !== "/contact").map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </nav>
            <a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>

        <div className="footer-meta shell">
          <p>Based in Cyprus. Working with the UK, Ireland and beyond.</p>
          <div className="footer-meta-links">
            <span>© 2026 Sonar Studio</span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
          <button className="footer-top" type="button" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUpIcon aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  );
}
