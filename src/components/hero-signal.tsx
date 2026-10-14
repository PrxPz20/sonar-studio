"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import BlackHole from "./ui/black-hole";
import { Particles } from "./ui/particles";

type SignalApi = {
  play(): void;
  pause(): void;
  setProgress(value: number): void;
  readonly progress: number;
};

const PARTICLE_TRANSITION_PROGRESS = 0.58;

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
  const [complete, setComplete] = useState(false);
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [blackHoleReady, setBlackHoleReady] = useState(false);
  const [constrained, setConstrained] = useState(false);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const showFinale = reduced || mobile || connection?.saveData;
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      if (showFinale) {
        setConstrained(true);
        setComplete(true);
        setShowBlackHole(true);
      }
      else setEnabled(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const control = (method: "play" | "pause") => {
      if (method === "play" && finished.current) return;
      frame.current?.contentWindow?.SonarSignal?.[method]();
    };
    const onVisibility = () => control(document.hidden ? "pause" : "play");
    document.addEventListener("visibilitychange", onVisibility);
    let retireTimer = 0;
    let revealTimer = 0;
    const finishWatcher = window.setInterval(() => {
      const signal = frame.current?.contentWindow?.SonarSignal;
      if (!signal || signal.progress < PARTICLE_TRANSITION_PROGRESS) return;
      finished.current = true;
      setComplete(true);
      revealTimer = window.setTimeout(() => setShowBlackHole(true), 520);
      retireTimer = window.setTimeout(() => {
        signal.pause();
        setEnabled(false);
      }, 720);
      window.clearInterval(finishWatcher);
    }, 100);

    const api: SignalApi = {
      play: () => control("play"),
      pause: () => control("pause"),
      setProgress: (value) => frame.current?.contentWindow?.SonarSignal?.setProgress(value),
      get progress() { return frame.current?.contentWindow?.SonarSignal?.progress || 0; },
    };
    window.SonarHero = api;
    return () => {
      window.clearInterval(finishWatcher);
      window.clearTimeout(retireTimer);
      window.clearTimeout(revealTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      if (window.SonarHero === api) delete window.SonarHero;
    };
  }, [enabled]);

  return (
    <div
      className="hero-signal"
      ref={host}
      data-complete={complete}
      aria-hidden="true"
    >
      {showBlackHole && (
        <div className="hero-black-hole" data-ready={blackHoleReady}>
          <BlackHole
            className="black-hole-art"
            focus={constrained ? [0.7, 0.56] : [0.78, 0.576]}
            fov={51}
            roll={-20}
            scrim="left"
            scrimStrength={0.9}
            starBrightness={0}
            steps={constrained ? 160 : 200}
            resolution={constrained ? 0.42 : 0.5}
            maxDpr={1}
            maxFps={20}
            paused={constrained}
            onReady={() => setBlackHoleReady(true)}
          />
        </div>
      )}
      {complete && <Particles className="hero-particles" density={1.35} />}
      <div className="signal-fallback"><span /><span /><span /><span /></div>
      {enabled && (
        <iframe
          ref={frame}
          className="signal-frame"
          src="/visuals/sonar-signal/Sonar_Signal_Animation_dc.html"
          title=""
          tabIndex={-1}
          loading="eager"
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
