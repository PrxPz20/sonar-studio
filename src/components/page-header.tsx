import type { ReactNode } from "react";

export function PageHeader({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="page-hero section-dark">
      <div className="shell page-hero-grid">
        <div className="page-hero-index" aria-hidden="true"><span /></div>
        <div>
          <h1>{title}</h1>
          <div className="page-hero-copy">{children}</div>
          {actions && <div className="button-row">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
