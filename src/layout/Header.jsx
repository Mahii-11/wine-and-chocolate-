import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FiMenu, FiSearch } from "react-icons/fi";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Logo from "./Logo";
import CategoryBar from "./CategoryBar";
import CartButton from "./CartButton";
import MobileMenu from "./MobileMenu";
import useHeaderHeight from "./useHeaderHeight";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useHeaderHeight();
  const isHome = useLocation().pathname === "/";

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 120);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header ref={headerRef} className="relative">
      <TopBar />

      <div className="border-b-[3px] border-brand-red bg-white">
        <div className="relative mx-auto flex h-[68px] max-w-[1900px] items-center justify-between px-4 lg:grid lg:h-[88px] lg:grid-cols-[1fr_11rem_1fr]">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 justify-self-start p-2 transition hover:text-brand-gold xl:hidden"
          >
            <FiMenu size={28} />
          </button>

          <Navbar menuOffset={26} />

          <div aria-hidden="true" className="hidden lg:block" />

          <div className="flex items-center gap-4 sm:gap-6 lg:justify-end lg:gap-8">
            <button type="button" aria-label="Search" className="transition hover:text-brand-gold">
              <FiSearch className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={2.2} />
            </button>
            <CartButton />
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 md:top-4 lg:top-5">
        <Logo />
      </div>

      {isHome && <CategoryBar />}

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {isScrolled && (
        <div className="fixed inset-x-0 top-0 z-30 border-b border-black/10 bg-white shadow-md">
          <div className="relative mx-auto flex h-[64px] max-w-[1900px] items-center justify-between gap-4 px-4 lg:h-[72px] lg:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="p-2 transition hover:text-brand-gold xl:hidden"
              >
                <FiMenu size={24} />
              </button>
              <Logo compact />
            </div>

            <Navbar menuOffset={18} />

            <div className="flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
              <button type="button" aria-label="Search" className="transition hover:text-brand-gold">
                <FiSearch className="h-5 w-5" strokeWidth={2.2} />
              </button>
              <CartButton compact />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
