import Link from "next/link";

export function Brand({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand ${light ? "brand-light" : "brand-dark"}`} aria-label="Sonar Studio home">
      <span className="brand-pulse" aria-hidden="true" />
      <span>SONAR</span>
      <span className="brand-studio">STUDIO</span>
    </Link>
  );
}
