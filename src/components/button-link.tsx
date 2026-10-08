import Link from "next/link";
import {
  BadgeCheckIcon,
  HouseIcon,
  PanelsTopLeftIcon,
  ScanSearchIcon,
  SendIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

type ButtonIconName = "about" | "home" | "project" | "proof" | "services" | "signal";

const icons: Record<ButtonIconName, LucideIcon> = {
  about: UserRoundIcon,
  home: HouseIcon,
  project: SendIcon,
  proof: BadgeCheckIcon,
  services: PanelsTopLeftIcon,
  signal: ScanSearchIcon,
};

function inferIcon(href: string, children: ReactNode): ButtonIconName {
  const label = typeof children === "string" ? children.toLowerCase() : "";
  if (label.includes("teardown")) return "signal";
  if (label.includes("proof") || label.includes("result")) return "proof";
  if (label.includes("about")) return "about";
  if (label.includes("service")) return "services";
  if (label.includes("home")) return "home";
  if (href === "/") return "home";
  if (href.startsWith("/results")) return "proof";
  if (href.startsWith("/about")) return "about";
  if (href.startsWith("/services")) return "services";
  if (href.includes("teardown")) return "signal";
  return "project";
}

export function ButtonLink({
  href,
  children,
  secondary = false,
  icon,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  icon?: ButtonIconName;
}) {
  const Icon = icons[icon ?? inferIcon(href, children)];

  return (
    <Link className={`button ${secondary ? "button-secondary" : "button-primary"}`} href={href}>
      <span className="button-label">{children}</span>
      <span className="button-icon-shell" aria-hidden="true"><Icon className="button-icon" strokeWidth={1.8} /></span>
    </Link>
  );
}
