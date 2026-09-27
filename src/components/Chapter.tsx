import { pad } from "@/lib/i18n";

type ChapterProps = {
  n?: number;
  label: string;
  /** Each entry is set on its own line. */
  lines: readonly string[];
  jp?: string;
  lede?: string;
  titleId: string;
  as?: "h2" | "h3";
  variant?: "main" | "sub";
};

/** A chapter opening: heavy rule, number, stacked condensed title and a vertical kanji label. */
export function Chapter({ n, label, lines, jp, lede, titleId, as: Tag = "h2", variant = "main" }: ChapterProps) {
  return (
    <header className={variant === "sub" ? "chapter chapter--sub" : "chapter"}>
      <div className="chapter__meta">
        <span className="mono chapter__no">
          {label}
          {n !== undefined ? ` ${pad(n)}` : ""}
        </span>
      </div>
      <Tag id={titleId} className="chapter__title" data-reveal="lines">
        {lines.map((line) => (
          <span key={line} className="line">
            <span className="line__inner">{line}</span>
          </span>
        ))}
      </Tag>
      {jp && (
        <span className="chapter__jp" aria-hidden="true" lang="ja">
          {jp}
        </span>
      )}
      {lede && (
        <p className="chapter__lede" data-reveal>
          {lede}
        </p>
      )}
    </header>
  );
}
