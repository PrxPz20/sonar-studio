import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Sonar Studio home">
      <Image
        className="brand-image"
        src="/brand/sonar-wordmark-white.svg"
        alt=""
        width={272}
        height={89}
        unoptimized
      />
    </Link>
  );
}
