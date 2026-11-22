import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/** Builds e.g. [1,2,3,4,5,"…",19] around the current page. */
function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total]);
  for (let p = current - 2; p <= current + 2; p++) if (p > 1 && p < total) pages.add(p);
  if (current <= 4) [2, 3, 4, 5].forEach((p) => pages.add(p));
  if (current >= total - 3) [total - 4, total - 3, total - 2, total - 1].forEach((p) => pages.add(p));
  const sorted = [...pages].sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

const cell = "flex h-[40px] min-w-[40px] items-center justify-center border font-serif text-[14px] transition";
const idle = "border-[#e0e0e0] bg-white text-[#333] hover:border-black";

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-[10px]">
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${cell} ${idle} disabled:cursor-not-allowed disabled:text-[#c4c4c4] disabled:hover:border-[#e0e0e0]`}
      >
        <FiChevronLeft size={16} />
      </button>

      {pageList(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className={`${cell} border-[#e0e0e0] bg-white text-[#777]`}>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${cell} ${
              p === page ? "border-[#d4a24c] bg-[#d4a24c] text-white" : idle
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${cell} ${idle} disabled:cursor-not-allowed disabled:text-[#c4c4c4] disabled:hover:border-[#e0e0e0]`}
      >
        <FiChevronRight size={16} />
      </button>
    </nav>
  );
}

export default Pagination;
