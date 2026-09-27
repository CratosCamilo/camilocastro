type SealProps = {
  /** Glyphs stacked top to bottom. Defaults to 戦え (tatakae — “fight”). */
  glyphs?: string[];
  className?: string;
};

/** The vermilion hanko. Decorative: its meaning is always stated in text nearby. */
export function Seal({ glyphs = ["戦", "え"], className }: SealProps) {
  return (
    <span className={["seal", className].filter(Boolean).join(" ")} aria-hidden="true" lang="ja">
      {glyphs.map((g) => (
        <span key={g} className="seal__glyph">
          {g}
        </span>
      ))}
    </span>
  );
}
