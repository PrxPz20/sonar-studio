"use client";

import { useEffect, useRef, useState } from "react";

type SignalApi = {
  play(): void;
  pause(): void;
  setProgress(value: number): void;
  readonly progress: number;
};

declare global {
  interface Window {
    SonarSignal?: SignalApi;
    SonarHero?: SignalApi;
  }
}

export function HeroSignal() {
  const frame = useRef<HTMLIFrameElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || mobile || connection?.saveData) return;

    let cancelled = false;
    fetch("/visuals/sonar-signal/Sonar_Signal_Animation_dc.html", { method: "HEAD" })
      .then((response) => {
        if (!cancelled && response.ok) setEnabled(true);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!enabled || !host.current) return;
    const control = (method: "play" | "pause") => {
      frame.current?.contentWindow?.SonarSignal?.[method]();
    };
    const observer = new IntersectionObserver(([entry]) => control(entry.isIntersecting ? "play" : "pause"), { threshold: 0.05 });
    observer.observe(host.current);
    const onVisibility = () => control(document.hidden ? "pause" : "play");
    document.addEventListener("visibilitychange", onVisibility);

    const api: SignalApi = {
      play: () => control("play"),
      pause: () => control("pause"),
      setProgress: (value) => frame.current?.contentWindow?.SonarSignal?.setProgress(value),
      get progress() { return frame.current?.contentWindow?.SonarSignal?.progress || 0; },
    };
    window.SonarHero = api;
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (window.SonarHero === api) delete window.SonarHero;
    };
  }, [enabled]);

  return (
    <div className="hero-signal" ref={host} aria-hidden="true">
      <div className="signal-fallback"><span /><span /><span /><span /></div>
      {enabled && (
        <iframe
          ref={frame}
          className="signal-frame"
          src="/visuals/sonar-signal/Sonar_Signal_Animation_dc.html"
          title=""
          tabIndex={-1}
          onLoad={() => frame.current?.contentWindow?.SonarSignal?.play()}
        />
      )}
    </div>
  );
}
