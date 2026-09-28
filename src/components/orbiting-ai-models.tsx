import Image from "next/image";
import type { CSSProperties } from "react";

const orbits = [
  {
    duration: 18,
    direction: "cw",
    models: [
      { name: "ChatGPT", icon: "/brand/openai-icon.svg", angle: -58, className: "ai-orbit-icon-openai" },
      { name: "Gemini", icon: "/brand/gemini-icon.svg", angle: 34, className: "" },
    ],
  },
  {
    duration: 24,
    direction: "ccw",
    models: [
      { name: "Claude", icon: "/brand/claude-icon.svg", angle: -82, className: "" },
    ],
  },
  {
    duration: 30,
    direction: "cw",
    models: [
      { name: "Perplexity", icon: "/brand/perplexity-icon.svg", angle: -24, className: "" },
    ],
  },
] as const;

type OrbitStyle = CSSProperties & {
  "--orbit-angle": string;
  "--counter-angle": string;
  "--orbit-duration": string;
};

export function OrbitingAiModels() {
  return (
    <div className="ai-orbit-stage" aria-hidden="true">
      <div className="ai-orbit-core" />
      {orbits.map((orbit, orbitIndex) => (
        <div className={`ai-orbit-ring ai-orbit-ring-${orbitIndex + 1}`} key={orbit.duration}>
          {orbit.models.flatMap((model) => [model, { ...model, angle: model.angle + 180 }]).map((model, modelIndex) => {
            const style: OrbitStyle = {
              "--orbit-angle": `${model.angle}deg`,
              "--counter-angle": `${-model.angle}deg`,
              "--orbit-duration": `${orbit.duration}s`,
            };

            return (
              <span className={`ai-orbit-arm ai-orbit-${orbit.direction}`} style={style} key={`${model.name}-${modelIndex}`}>
                <span className={`ai-orbit-icon-shell ai-orbit-counter-${orbit.direction}`}>
                  <Image className={model.className} src={model.icon} alt="" width={28} height={28} />
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
