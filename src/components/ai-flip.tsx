import Image from "next/image";

const aiTools = [
  { name: "ChatGPT", icon: "/brand/openai-icon.svg", iconClass: "ai-flip-icon-openai" },
  { name: "Claude", icon: "/brand/claude-icon.svg", iconClass: "" },
  { name: "Gemini", icon: "/brand/gemini-icon.svg", iconClass: "" },
  { name: "Perplexity", icon: "/brand/perplexity-icon.svg", iconClass: "" },
] as const;

export function AIFlip() {
  return (
    <span className="ai-flip">
      <span className="ai-flip-visual" aria-hidden="true">
        <span className="ai-flip-words">
          <span className="ai-flip-sizer">
            <Image className="ai-flip-icon" src="/brand/perplexity-icon.svg" alt="" width={24} height={24} />
            Perplexity
          </span>
          {aiTools.map((tool) => (
            <span className="ai-flip-item" key={tool.name}>
              <Image className={`ai-flip-icon ${tool.iconClass}`} src={tool.icon} alt="" width={24} height={24} />
              {tool.name}
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only">ChatGPT, Claude, Gemini, or Perplexity</span>
    </span>
  );
}
