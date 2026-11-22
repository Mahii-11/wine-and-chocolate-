import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { AnimatePresence } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import { mainLinks } from "./navData";
import { megaMenus } from "./megaMenuData";
import MegaMenu from "./MegaMenu";

/**
 * Desktop nav. Items with a mega menu open it on hover/focus with a short
 * close delay so the pointer can move into the panel; Escape or clicking a
 * link closes it. `menuOffset` is the gap from the link to the panel.
 */
function Navbar({ menuOffset = 34 }) {
  const [open, setOpen] = useState(null);
  const closeTimer = useRef(null);

  const show = (key) => {
    clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-3 2xl:gap-5 min-[1800px]:gap-6">
        {mainLinks.map(({ to, label, dropdown }) => {
          const menu = dropdown ? megaMenus[to] : null;
          const isOpen = open === to;
          return (
            <li
              key={to}
              className="static"
              onMouseEnter={menu ? () => show(to) : undefined}
              onMouseLeave={menu ? hide : undefined}
              onFocus={menu ? () => show(to) : undefined}
              onBlur={menu ? hide : undefined}
            >
              <NavLink
                to={to}
                aria-haspopup={menu ? "true" : undefined}
                aria-expanded={menu ? isOpen : undefined}
                className={({ isActive }) =>
                  `group flex items-center gap-1 whitespace-nowrap py-2 font-serif text-[13px] uppercase tracking-wide transition 2xl:text-[14px] min-[1800px]:text-[16px] ${
                    isOpen ? "text-brand-red" : isActive ? "text-brand-gold" : "text-brand-dark hover:text-brand-gold"
                  }`
                }
              >
                {label}
                {dropdown && (
                  <FiChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </NavLink>

              <AnimatePresence>
                {menu && isOpen && (
                  <MegaMenu key={to} menu={menu} offset={menuOffset} onNavigate={() => setOpen(null)} />
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
