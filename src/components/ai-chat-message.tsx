"use client";

import Image from "next/image";
import { CopyIcon, PauseIcon, PlayIcon, RefreshCcwIcon, ShareIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const responses = [
  {
    name: "ChatGPT",
    icon: "/brand/openai-icon.svg",
    answer: "I found one strong match inside Agios Dometios. Closest and best first call: Milikouros Car Services — a local garage with clear evidence for ECU programming and performance tuning.",
  },
  {
    name: "Claude",
    icon: "/brand/claude-icon.svg",
    answer: "Milikouros Car Services appears to be the strongest local fit. Its website provides clear evidence of ECU programming, vehicle diagnostics and performance tuning in Agios Dometios.",
  },
  {
    name: "Gemini",
    icon: "/brand/gemini-icon.svg",
    answer: "Top nearby match: Milikouros Car Services in Agios Dometios. The business has clear local relevance and dedicated information about ECU programming and performance tuning.",
  },
  {
    name: "Perplexity",
    icon: "/brand/perplexity-icon.svg",
    answer: "The best-supported result I found is Milikouros Car Services. Available information connects the Agios Dometios garage with ECU programming, diagnostics and performance tuning.",
  },
] as const;

type Phase = "idle" | "thinking" | "typing" | "complete" | "switching";

const actions = [
  { label: "Retry", icon: RefreshCcwIcon },
  { label: "Like", icon: ThumbsUpIcon },
  { label: "Dislike", icon: ThumbsDownIcon },
  { label: "Copy", icon: CopyIcon },
  { label: "Share", icon: ShareIcon },
] as const;

export function AIChatMessage() {
  const messageRef = useRef<HTMLDivElement>(null);
  const delayTimer = useRef(0);
  const typingTimer = useRef(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [reaction, setReaction] = useState<"Like" | "Dislike" | null>(null);
  const [actionStatus, setActionStatus] = useState("");
  const currentResponse = responses[currentIndex];

  const clearTyping = useCallback(() => {
    window.clearTimeout(delayTimer.current);
    window.clearInterval(typingTimer.current);
  }, []);

  const typeAnswer = useCallback((answer: string, delay: number) => {
    clearTyping();
    setText("");
    setPhase("thinking");
    delayTimer.current = window.setTimeout(() => {
      let character = 0;
      setPhase("typing");
      typingTimer.current = window.setInterval(() => {
        character = Math.min(answer.length, character + 2);
        setText(answer.slice(0, character));
        if (character === answer.length) {
          window.clearInterval(typingTimer.current);
          setPhase("complete");
        }
      }, 28);
    }, delay);
  }, [clearTyping]);

  useEffect(() => {
    const message = messageRef.current;
    if (!message) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      message.dataset.motion = "visible";
      const frame = requestAnimationFrame(() => {
        setReducedMotion(true);
        setText(responses[0].answer);
        setPhase("complete");
      });
      return () => cancelAnimationFrame(frame);
    }

    const start = () => {
      message.dataset.motion = "visible";
      typeAnswer(responses[0].answer, 1450);
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return clearTyping;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      start();
    }, { threshold: 0.3 });

    observer.observe(message);
    return () => {
      observer.disconnect();
      clearTyping();
    };
  }, [clearTyping, typeAnswer]);

  useEffect(() => {
    if (phase !== "complete" || paused || reducedMotion) return;
    const holdTimer = window.setTimeout(() => setPhase("switching"), 4200);
    return () => window.clearTimeout(holdTimer);
  }, [phase, paused, reducedMotion]);

  useEffect(() => {
    if (phase !== "switching" || paused || reducedMotion) return;
    const swapTimer = window.setTimeout(() => {
      const nextIndex = (currentIndex + 1) % responses.length;
      setCurrentIndex(nextIndex);
      setReaction(null);
      setActionStatus("");
      typeAnswer(responses[nextIndex].answer, 450);
    }, 320);
    return () => window.clearTimeout(swapTimer);
  }, [currentIndex, paused, phase, reducedMotion, typeAnswer]);

  const handleAction = (label: typeof actions[number]["label"]) => {
    setActionStatus("");
    if (label === "Retry") {
      typeAnswer(currentResponse.answer, 250);
      setActionStatus("Response regenerated.");
      return;
    }
    if (label === "Like" || label === "Dislike") {
      setReaction((current) => current === label ? null : label);
      setActionStatus(`${label} feedback updated.`);
    }
  };

  return (
    <div className="ai-chat-demo" ref={messageRef} role="group" aria-label="AI recommendation examples" data-motion="ready">
      <div className="ai-chat-user">
        <span className="ai-chat-user-avatar" aria-hidden="true">U</span>
        <div className="ai-chat-user-bubble">
          <p>In Nicosia — Agios Dometios, which mechanic garage does car programming and tuning?</p>
        </div>
      </div>

      <div className="ai-chat-assistant" data-phase={phase} aria-label={`${currentResponse.name} response`}>
        <div className="ai-chat-assistant-meta">
          <span className="ai-chat-avatar" aria-hidden="true">
            <Image src={currentResponse.icon} alt="" width={24} height={24} />
          </span>
          <span>{currentResponse.name}</span>
        </div>
        <div className="ai-chat-response">
          {phase === "thinking" ? (
            <span className="ai-chat-thinking" aria-hidden="true"><i /><i /><i /></span>
          ) : (
            <p aria-hidden="true">{text}{phase === "typing" && <span className="ai-chat-cursor" />}</p>
          )}
          <span className="sr-only">{currentResponse.answer}</span>
        </div>
        <div className="ai-chat-actions" data-visible={phase === "complete"} aria-label="Response actions">
          {!reducedMotion && (
            <button
              type="button"
              aria-label={paused ? "Resume rotating responses" : "Pause rotating responses"}
              aria-pressed={paused}
              data-active={paused}
              onClick={() => {
                setPaused((current) => !current);
                setActionStatus(paused ? "Response rotation resumed." : "Response rotation paused.");
              }}
            >
              {paused ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
            </button>
          )}
          {actions.map(({ label, icon: Icon }) => label === "Copy" || label === "Share" ? (
            <span className="ai-chat-action-static" key={label} aria-hidden="true">
              <Icon />
            </span>
          ) : (
              <button
                type="button"
                key={label}
                aria-label={label}
                aria-pressed={label === "Like" || label === "Dislike" ? reaction === label : undefined}
                data-active={reaction === label}
                onClick={() => handleAction(label)}
              >
                <Icon aria-hidden="true" />
              </button>
            ))}
        </div>
        <span className="sr-only" role="status" aria-live="polite">{actionStatus}</span>
      </div>
    </div>
  );
}
