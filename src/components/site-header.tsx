"use client";

import Link from "next/link";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Brand } from "./brand";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activeIndex = navigation.findIndex(({ href }) => pathname === href || pathname.startsWith(`${href}/`));
  const highlightIndex = hoveredIndex ?? activeIndex;
  const navigationStyle = { "--nav-index": Math.max(highlightIndex, 0) } as CSSProperties;

  function open() {
    dialogRef.current?.showModal();
    setMenuOpen(true);
    closeButtonRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  useEffect(() => close(), [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 32);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-condensed" : ""}`}>
      <div className="navigation-shell">
        <Brand />
        <nav
          className="navigation-track"
          aria-label="Primary navigation"
          data-highlight-visible={highlightIndex >= 0}
          style={navigationStyle}
          onPointerLeave={() => setHoveredIndex(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHoveredIndex(null);
          }}
        >
          <span className="navigation-highlight" aria-hidden="true" />
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              className="navigation-link"
              href={item.href}
              aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
              onPointerEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-primary navigation-cta" href="/contact">
          <span>Free teardown</span>
        </Link>
        <button
          ref={menuButtonRef}
          className="navigation-toggle"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={open}
        >
          <MenuIcon aria-hidden="true" />
        </button>
      </div>
      <dialog id="mobile-navigation" className="navigation-dialog" ref={dialogRef} aria-label="Mobile navigation" onClose={() => {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }} onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}>
        <div className="navigation-dialog-inner">
          <div className="navigation-dialog-top">
            <Brand />
            <button ref={closeButtonRef} type="button" onClick={close} aria-label="Close menu" className="navigation-close"><XIcon aria-hidden="true" /></button>
          </div>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}>
                <span className="navigation-dialog-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
                <ArrowUpRightIcon aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link className="button button-primary navigation-dialog-cta" href="/contact">
            <span><small>Not sure where to start?</small>Get a free teardown</span>
          </Link>
        </div>
      </dialog>
    </header>
  );
}
