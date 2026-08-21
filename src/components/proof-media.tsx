import Image from "next/image";

export function ProofMedia() {
  return (
    <figure className="proof-media">
      <div className="proof-shot proof-before">
        <Image className="proof-image" src="/brand/milikouros_before.webp" alt="ChatGPT recommendations before the website rebuild" width={3600} height={2338} sizes="(max-width: 767px) calc(100vw - 32px), 42vw" />
        <span className="proof-label">Before</span>
      </div>
      <div className="proof-shot proof-after">
        <Image className="proof-image" src="/brand/milikouros_after.webp" alt="ChatGPT recommending Milikouros Car Services after the website rebuild" width={3594} height={2338} sizes="(max-width: 767px) calc(100vw - 32px), 58vw" />
        <span className="proof-label">After</span>
      </div>
      <figcaption>Before and after. Real screenshots, unedited.</figcaption>
    </figure>
  );
}
