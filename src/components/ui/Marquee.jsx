/**
 * Seamless infinite marquee. Renders `items` twice and slides the track by
 * half its width (see `animate-marquee` in index.css), so the loop never jumps.
 *
 *  - items:          array with unique `id`
 *  - render:         (item) => ReactNode
 *  - secondsPerItem: speed; lower is faster
 *  - pauseOnHover:   stop while the pointer is over the track
 *  - fade:           Tailwind color class pair for the edge fades, e.g. "from-white"
 *  - gapClassName:   gap between items
 */
function Marquee({
  items,
  render,
  secondsPerItem = 4,
  pauseOnHover = false,
  fade = "from-white",
  gapClassName = "gap-4 lg:gap-5",
  className = "",
}) {
  const track = [...items, ...items];
  const duration = `${items.length * secondsPerItem}s`;

  return (
    <div
      className={`group/marquee relative overflow-hidden ${className}`}
      style={{ "--marquee-duration": duration }}
    >
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r ${fade} to-transparent sm:w-16`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l ${fade} to-transparent sm:w-16`} />

      <ul
        className={`animate-marquee flex w-max items-center ${gapClassName} ${
          pauseOnHover ? "group-hover/marquee:[animation-play-state:paused]" : ""
        }`}
      >
        {track.map((item, i) => (
          <li key={`${item.id}-${i}`} aria-hidden={i >= items.length} className="shrink-0">
            {render(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Marquee;
