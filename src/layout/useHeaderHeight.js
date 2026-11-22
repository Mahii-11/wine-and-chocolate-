import { useEffect, useRef } from "react";

/**
 * Measures the header and exposes its height as the CSS variable
 * `--header-h` on <html>, so sections below can size themselves to
 * the remaining viewport (e.g. a hero that fills the first screen).
 */
export default function useHeaderHeight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const root = document.documentElement;
    const apply = () => root.style.setProperty("--header-h", `${el.offsetHeight}px`);

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    window.addEventListener("resize", apply);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return ref;
}
