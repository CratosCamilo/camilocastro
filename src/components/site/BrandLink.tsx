"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type BrandLinkProps = { href: string; className?: string; label: string; children: ReactNode };

/**
 * Home link in the header. From another page it navigates as usual; on the home page
 * itself it scrolls back to the top (a same-URL navigation would do nothing) and
 * drops any #section left in the address bar.
 */
export function BrandLink({ href, className, label, children }: BrandLinkProps) {
  const pathname = usePathname();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== href) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    if (window.location.hash) window.history.replaceState(window.history.state, "", href);
  };

  return (
    <Link href={href} className={className} aria-label={label} onClick={onClick}>
      {children}
    </Link>
  );
}
