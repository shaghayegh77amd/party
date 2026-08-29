/**
 * A torn-paper transition between two sections.
 *
 * The jagged edge is a fixed (not random) polygon so server and client
 * render identically — no hydration mismatch. The shape is colored from
 * the jagged line down to the bottom, and transparent above it, so it can
 * either sit as an absolute overlay at the bottom of a full-bleed section
 * (revealing the next section's color cutting upward into it) or as a
 * normal-flow block directly above a section, with the color matching
 * that section so the tear looks like paper ripped from below.
 * `fillClassName` should match the background color of whichever section
 * this divider's color represents.
 */
const TEETH_Y = [24, 9, 28, 14, 32, 6, 21, 12, 30, 10, 25, 16, 34, 8, 19, 26, 22];
const VIEW_WIDTH = 480;
const VIEW_HEIGHT = 40;

function buildPath(): string {
  const step = VIEW_WIDTH / (TEETH_Y.length - 1);
  const top = TEETH_Y.map((y, i) => `${Math.round(i * step)},${y}`).join(" L");
  return `M0,${VIEW_HEIGHT} L${top} L${VIEW_WIDTH},${VIEW_HEIGHT} Z`;
}

const TORN_PATH = buildPath();

type TornDividerProps = {
  /** Tailwind text-color class supplying the torn shape's fill (e.g. "text-ivory-200"). */
  fillClassName: string;
  className?: string;
};

export function TornDivider({ fillClassName, className = "" }: TornDividerProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none h-8 w-full overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        className={`h-full w-full ${fillClassName} drop-shadow-[0_-2px_3px_rgba(0,0,0,0.08)]`}
      >
        <path d={TORN_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}
