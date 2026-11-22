import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Smoothly scrolls the window back to the top whenever the route changes
 * (e.g. clicking a footer link while scrolled down). Links with a `#hash`
 * are left alone so in-page anchors keep working.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
