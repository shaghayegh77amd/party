type MonogramProps = {
  className?: string;
};

/**
 * Logo mark matching the reference: "SH" and "N" separated by a diagonal
 * slash, set in a serif face with no surrounding border/pill.
 */
export function Monogram({ className = "" }: MonogramProps) {
  return (
    <span className={`font-serif italic tracking-tight ${className}`} dir="ltr">
      SH ⁄ N
    </span>
  );
}
