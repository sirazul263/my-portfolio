type Props = {
  words: { text: string; accent?: boolean }[];
  delay?: number;
  className?: string;
};

/**
 * Staggered word-by-word rise for hero headlines. Pure CSS so the text is
 * painted (and counted as LCP) without waiting for hydration.
 */
export function WordReveal({ words, delay = 0, className }: Props) {
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word.text}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <span
              className={
                word.accent
                  ? "serif-italic inline-block animate-word-rise pr-[0.06em] text-accent"
                  : "inline-block animate-word-rise"
              }
              style={{ animationDelay: `${delay + i * 0.06}s` }}
            >
              {word.text}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
