"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PRINT_DURATION = 1600;

/**
 * One observer for the whole page. Elements opt in with `data-reveal` (fade/slide)
 * or `data-print` (halftone print-in); they get `data-inview` once, then panels get
 * `data-revealed` so the mask is dropped and never costs a repaint again.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview]), [data-print]:not([data-inview])"),
    );
    const settle = (el: HTMLElement) => {
      el.setAttribute("data-inview", "");
      if (el.hasAttribute("data-print")) {
        const delay = Number.parseInt(el.style.getPropertyValue("--delay") || "0", 10) || 0;
        window.setTimeout(() => el.setAttribute("data-revealed", ""), PRINT_DURATION + delay);
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => {
        el.setAttribute("data-inview", "");
        el.setAttribute("data-revealed", "");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          settle(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
