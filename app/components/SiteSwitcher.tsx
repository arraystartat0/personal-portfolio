import Link from "next/link";
import { otherSites } from "../lib/sites";

type SiteSwitcherProps = {
  /** Slug of the site currently being viewed, so it can offer the other two. */
  current: string;
  /** "compact" offers only the hub; "full" also lists the sibling sites. */
  variant?: "compact" | "full";
  className?: string;
  linkClassName?: string;
};

/**
 * The way back out of a site. Each site styles it in its own language by
 * passing class names, so the control is shared but the look never is.
 */
export default function SiteSwitcher({
  current,
  variant = "compact",
  className,
  linkClassName,
}: SiteSwitcherProps) {
  return (
    <nav aria-label="Switch portfolio" className={className}>
      <Link href="/" className={linkClassName}>
        Other portfolios
      </Link>
      {variant === "full" &&
        otherSites(current).map((site) => (
          <Link key={site.slug} href={site.href} className={linkClassName}>
            {site.discipline}
          </Link>
        ))}
    </nav>
  );
}
