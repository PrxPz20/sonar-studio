import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return <main className="not-found"><div><h1>404</h1><h2>No signal at this address.</h2><p className="section-copy">The page may have moved, or the address may be incomplete.</p><ButtonLink href="/" icon="home">Return home</ButtonLink></div></main>;
}
