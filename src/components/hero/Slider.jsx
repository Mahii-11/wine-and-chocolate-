import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Generic fade/slide carousel.
 *
 * props:
 *  - slides:     array of items, each needs a unique `id`
 *  - render:     (slide, isActive) => ReactNode, fills the slide area
 *  - interval:   autoplay delay in ms (0 disables autoplay); never pauses on hover
 *  - className:  extra classes for the outer wrapper
 *  - arrows:     show prev/next buttons (default true)
 *  - dots:       show pagination dots (default true)
 *  - dark:       light controls on dark images (default false)
 */
function Slider({
  slides,
  render,
  interval = 3000,
  className = "",
  arrows = true,
  dots = true,
  dark = false,
}) {
  const [[index, direction], setState] = useState([0, 1]);
  const count = slides.length;
  const touchStart = useRef(null);

  const go = useCallback(
    (dir) => setState(([i]) => [(i + dir + count) % count, dir]),
    [count],
  );
  const goTo = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);

  useEffect(() => {
    if (!interval || count < 2) return undefined;
    const t = setInterval(() => go(1), interval);
    return () => clearInterval(t);
  }, [interval, count, go]);

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const slide = slides[index];
  const ctrl = dark
    ? "text-white border-white/70 hover:bg-white hover:text-black"
    : "text-brand-dark border-brand-dark/50 hover:bg-brand-dark hover:text-white";
  const dot = dark ? "bg-white" : "bg-brand-dark";

  return (
    <div
      className={`group relative h-full w-full overflow-hidden ${className}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {render(slide, true)}
        </motion.div>
      </AnimatePresence>

      {arrows && count > 1 && (
        <div className="absolute bottom-3 right-3 z-20 flex gap-2 sm:bottom-4 sm:right-4">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition ${ctrl}`}
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition ${ctrl}`}
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}

      {dots && count > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${dot} ${
                i === index ? "w-7 opacity-100" : "w-2 opacity-40 hover:opacity-70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
