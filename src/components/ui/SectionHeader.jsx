import { motion } from "motion/react";

/**
 * Centered eyebrow + title + gold rule + description used by every section.
 * `onLoad` animates immediately (for a section visible on first paint);
 * otherwise it animates when scrolled into view.
 */
function SectionHeader({ eyebrow, title, text, onLoad = false }) {
  const reveal = onLoad
    ? { animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6 },
      };

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      {...reveal}
      className="mx-auto max-w-3xl text-center"
    >
      {eyebrow && (
        <p className="font-serif text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-serif text-2xl font-bold uppercase tracking-wide text-brand-dark sm:text-3xl lg:text-[34px]">
        {title}
      </h2>
      <span className="mx-auto mt-3 block h-[2px] w-14 bg-brand-gold" />
      {text && (
        <p className="mt-4 font-serif text-[15px] leading-relaxed text-gray-700 sm:text-base lg:text-[17px]">
          {text}
        </p>
      )}
    </motion.header>
  );
}

export default SectionHeader;
