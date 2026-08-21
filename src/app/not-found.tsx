import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><div><h1>404</h1><h2>No signal at this address.</h2><p className="section-copy">The page may have moved, or the address may be incomplete.</p><Link className="button button-primary" href="/">Return home <span aria-hidden="true">→</span></Link></div></main>;
}
