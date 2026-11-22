import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { FiX, FiChevronRight, FiUser } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { categories, mainLinks, utilityLinks } from "./navData";
import useSocialLinks from "./useSocialLinks";
import useSiteSettings, { toTelHref } from "./useSiteSettings";

const linkClass = ({ isActive }) =>
  `flex items-center justify-between border-b border-white/10 py-3.5 font-serif text-base uppercase tracking-wide transition hover:text-yellow-500 ${
    isActive ? "text-yellow-500" : "text-white"
  }`;

function MobileMenu({ open, onClose }) {
  const { pathname } = useLocation();
  const { links, loading } = useSocialLinks();
  const { settings, loading: settingsLoading } = useSiteSettings();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 xl:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-sm flex-col bg-black text-white shadow-2xl xl:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="font-serif text-lg italic text-yellow-500">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="rounded-full p-1 transition hover:bg-white/10"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-8">
              <ul>
                {mainLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink to={to} className={linkClass}>
                      {label}
                      <FiChevronRight size={18} className="text-white/50" />
                    </NavLink>
                  </li>
                ))}
              </ul>

              <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Occasions
              </p>
              <ul>
                {categories.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink to={to} className={linkClass}>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Help
              </p>
              <ul>
                {utilityLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink to={to} className={linkClass}>
                      {label}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <Link to="/sign-in" className={linkClass({ isActive: false })}>
                    <span className="flex items-center gap-2">
                      <FiUser size={18} /> Sign In
                    </span>
                  </Link>
                </li>
              </ul>

              <a
                href={settings.phone ? toTelHref(settings.phone) : undefined}
                className="mt-6 flex items-center justify-center gap-3 rounded bg-yellow-500 py-3 font-serif font-bold text-black transition hover:bg-yellow-400"
              >
                <FaPhoneAlt size={14} />
                {settingsLoading ? (
                  <span className="inline-block h-5 w-28 animate-pulse rounded bg-black/20" />
                ) : (
                  settings.phone
                )}
              </a>

              <ul className="mt-6 flex items-center justify-center gap-6">
                {loading &&
                  [0, 1, 2].map((i) => (
                    <li key={i} className="h-5 w-5 animate-pulse rounded-full bg-white/25" />
                  ))}
                {links.map(({ id, icon: Icon, label, href }) => (
                  <li key={id}>
                    <a
                      href={href}
                      aria-label={label}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="transition hover:text-yellow-500"
                    >
                      <Icon size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
