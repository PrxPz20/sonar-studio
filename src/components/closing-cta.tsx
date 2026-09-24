import { ButtonLink } from "./button-link";

export function ClosingCta({
  title,
  body,
  primary = "Get my free teardown",
  primaryHref = "/contact",
  secondary,
  secondaryHref = "/results",
}: {
  title: string;
  body?: string;
  primary?: string;
  primaryHref?: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="closing-cta">
      <div className="shell closing-grid">
        <div>
          <h2>{title}</h2>
          {body && <p>{body}</p>}
        </div>
        <div className="button-row">
          <ButtonLink href={primaryHref}>{primary}</ButtonLink>
          {secondary && <ButtonLink href={secondaryHref} secondary>{secondary}</ButtonLink>}
        </div>
      </div>
    </section>
  );
}
