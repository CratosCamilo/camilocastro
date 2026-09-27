import { focusLinePaths, type FocusLineOptions } from "@/lib/focus-lines";

/** Manga focus lines (集中線) as static SVG — three paths, three ink densities. */
export function FocusLines({ className, ...options }: FocusLineOptions & { className?: string }) {
  const [light, medium, dense] = focusLinePaths(options);
  return (
    <svg
      className={className}
      viewBox={`0 0 ${options.width} ${options.height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path d={light} fill="currentColor" opacity="0.45" />
      <path d={medium} fill="currentColor" opacity="0.75" />
      <path d={dense} fill="currentColor" />
    </svg>
  );
}
