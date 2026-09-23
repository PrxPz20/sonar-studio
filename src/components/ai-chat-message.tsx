"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const answer = "I found one strong match inside Agios Dometios. Closest and best first call: Milikouros Car Services — a local garage with clear evidence for ECU programming and performance tuning.";

type Phase = "idle" | "thinking" | "typing" | "complete";

export function AIChatMessage() {
  const messageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");

  useEffect(() => {
    const message = messageRef.current;
    if (!message) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      message.dataset.motion = "visible";
      const frame = requestAnimationFrame(() => {
        setText(answer);
        setPhase("complete");
      });
      return () => cancelAnimationFrame(frame);
    }

    let delayTimer = 0;
    let typingTimer = 0;
    const start = () => {
      message.dataset.motion = "visible";
      setPhase("thinking");
      delayTimer = window.setTimeout(() => {
        let character = 0;
        setPhase("typing");
        typingTimer = window.setInterval(() => {
          character = Math.min(answer.length, character + 2);
          setText(answer.slice(0, character));
          if (character === answer.length) {
            window.clearInterval(typingTimer);
            setPhase("complete");
          }
        }, 28);
      }, 1450);
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return () => {
        window.clearTimeout(delayTimer);
        window.clearInterval(typingTimer);
      };
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      start();
    }, { threshold: 0.3 });

    observer.observe(message);
    return () => {
      observer.disconnect();
      window.clearTimeout(delayTimer);
      window.clearInterval(typingTimer);
    };
  }, []);

  return (
    <div className="ai-chat-demo" ref={messageRef} role="group" aria-label="Example ChatGPT recommendation" data-motion="ready">
      <div className="ai-chat-user">
        <p>In Nicosia — Agios Dometios, which mechanic garage does car programming and tuning?</p>
      </div>

      <div className="ai-chat-assistant" data-phase={phase}>
        <span className="ai-chat-avatar" aria-hidden="true">
          <Image src="/brand/openai-icon.svg" alt="" width={24} height={24} />
        </span>
        <div className="ai-chat-response">
          {phase === "thinking" ? (
            <span className="ai-chat-thinking" aria-hidden="true"><i /><i /><i /></span>
          ) : (
            <p aria-hidden="true">{text}{phase === "typing" && <span className="ai-chat-cursor" />}</p>
          )}
          <span className="sr-only">{answer}</span>
        </div>
      </div>
    </div>
  );
}
