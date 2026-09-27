"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to the hero as --mx / --my in [-1, 1].
 * Only for fine pointers and when motion is welcome; CSS does the rest.
 */
export function HeroParallax({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          el.style.setProperty("--mx", x.toFixed(3));
          el.style.setProperty("--my", y.toFixed(3));
        });
      }
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [targetId]);

  return null;
}
