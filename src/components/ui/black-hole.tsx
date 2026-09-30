import Image from "next/image";

export function BlackHole() {
  return (
    <div className="black-hole-art" aria-hidden="true">
      <Image className="black-hole-glow" src="/visuals/black-hole.png" alt="" fill sizes="100vw" />
      <Image className="black-hole-core" src="/visuals/black-hole.png" alt="" fill sizes="100vw" />
    </div>
  );
}

export default BlackHole;
