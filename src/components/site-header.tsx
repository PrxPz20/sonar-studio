"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Brand } from "./brand";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function open() {
    dialogRef.current?.showModal();
    closeButtonRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  useEffect(() => close(), [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/contact">Get a free teardown</Link>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label="Open menu"
          onClick={open}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <dialog className="mobile-menu" ref={dialogRef} onClose={() => menuButtonRef.current?.focus()} onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <Brand />
            <button ref={closeButtonRef} type="button" onClick={close} aria-label="Close menu" className="menu-close">Close</button>
          </div>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}<span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <Link className="button button-primary" href="/contact">Get a free teardown <span aria-hidden="true">→</span></Link>
        </div>
      </dialog>
    </header>
  );
}
