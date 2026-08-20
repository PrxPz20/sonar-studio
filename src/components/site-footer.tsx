import Link from "next/link";
import { Brand } from "./brand";
import { navigation, site } from "@/lib/content";

export function SiteFooter() {
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  return (
    <footer className="site-footer">
      <div className="footer-main shell">
        <div className="footer-statement">
          <Brand />
          <p>Get found when your customers ask AI.</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Navigate</p>
            <Link href="/">Home</Link>
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {instagram && <a href={instagram} rel="noreferrer" target="_blank">Instagram</a>}
            {linkedin && <a href={linkedin} rel="noreferrer" target="_blank">LinkedIn</a>}
          </div>
        </div>
      </div>
      <div className="footer-bottom shell">
        <p>Based in Cyprus. Working with the UK, Ireland and beyond.</p>
        <div><span>© 2026 Sonar Studio</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
