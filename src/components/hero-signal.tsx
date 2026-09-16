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
  const finished = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || mobile || connection?.saveData) return;

    const frameId = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!enabled || !host.current) return;
    const control = (method: "play" | "pause") => {
      if (method === "play" && finished.current) return;
      frame.current?.contentWindow?.SonarSignal?.[method]();
    };
    const observer = new IntersectionObserver(([entry]) => control(entry.isIntersecting ? "play" : "pause"), { threshold: 0.05 });
    observer.observe(host.current);
    const onVisibility = () => control(document.hidden ? "pause" : "play");
    document.addEventListener("visibilitychange", onVisibility);
    const finishTimer = window.setTimeout(() => {
      finished.current = true;
      control("pause");
    }, 12_000);

    const api: SignalApi = {
      play: () => control("play"),
      pause: () => control("pause"),
      setProgress: (value) => frame.current?.contentWindow?.SonarSignal?.setProgress(value),
      get progress() { return frame.current?.contentWindow?.SonarSignal?.progress || 0; },
    };
    window.SonarHero = api;
    return () => {
      observer.disconnect();
      window.clearTimeout(finishTimer);
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
          onLoad={() => {
            const signal = frame.current?.contentWindow?.SonarSignal;
            if (finished.current) signal?.pause();
            else signal?.play();
          }}
        />
      )}
    </div>
  );
}
