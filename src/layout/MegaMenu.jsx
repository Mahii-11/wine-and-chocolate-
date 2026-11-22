import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronRight } from "react-icons/fi";

const ease = [0.22, 1, 0.36, 1];

/**
 * Dropdown panel for one main nav item. Rendered inside the hovered <li>;
 * `offset` is the transparent bridge between the link and the panel so the
 * pointer can travel down without closing the menu.
 */
function MegaMenu({ menu, offset = 34, onNavigate }) {
  const [active, setActive] = useState(0);
  const group = menu.groups[active];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.28, ease }}
      style={{ paddingTop: offset }}
      className="absolute left-0 top-full z-40 w-[min(1270px,calc(100vw-2rem))]"
    >
      <div className="flex flex-col overflow-hidden bg-white text-brand-dark shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
        <div className="flex min-h-[470px]">
          {/* Left: groups */}
          <ul className="w-[248px] shrink-0 border-r border-[#efefef] py-2">
            {menu.groups.map((g, i) => {
              const on = i === active;
              return (
                <li key={g.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`relative flex h-[51px] w-full items-center justify-between pl-5 pr-4 text-left font-serif text-[16px] transition-colors duration-200 ${
                      on ? "bg-[#e9b857] font-bold text-black" : "text-[#222] hover:bg-[#faf6ec]"
                    }`}
                  >
                    {g.label}
                    <FiChevronRight size={12} className={on ? "text-black" : "text-[#c9961f]"} />
                    {on && (
                      <motion.span
                        layoutId="mega-active-caret"
                        className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[7px] border-x-transparent border-t-[#e9b857]"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right: columns for the active group */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={group.label}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.22, ease }}
              className="flex flex-1"
            >
              {group.columns.map((col, i) => (
                <section
                  key={col.title}
                  className={`px-9 pb-8 pt-7 ${i > 0 ? "border-l border-[#efefef]" : ""} ${col.span ? "flex-[2]" : "flex-1"}`}
                >
                  <h3 className="inline-block border-b-2 border-[#d9a641] pb-1 font-serif text-[16px] font-bold uppercase tracking-[0.02em] text-[#222]">
                    {col.title}
                  </h3>
                  <ul
                    className="mt-6 grid gap-x-8 gap-y-[11px]"
                    style={{ gridTemplateColumns: `repeat(${col.span ?? 1}, minmax(0, 1fr))` }}
                  >
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          to={l.to}
                          onClick={onNavigate}
                          className="block font-serif text-[15px] leading-6 text-[#333] transition hover:translate-x-0.5 hover:text-brand-gold"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {menu.recommended && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-black px-6 py-3 font-serif text-[15px] text-white">
            <span className="font-bold">Recommended:</span>
            {menu.recommended.map((r, i) => (
              <span key={r.label} className="flex items-center gap-3">
                {i > 0 && <span className="text-[10px] text-white/70">●</span>}
                <Link to={r.to} onClick={onNavigate} className="transition hover:text-[#f1d99f]">
                  {r.label}
                </Link>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MegaMenu;
