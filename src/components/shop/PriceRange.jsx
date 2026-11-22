/**
 * Dual-handle price slider with the two "$" inputs under it.
 * `value` is [min, max]; `bounds` is the full [min, max] of the catalog.
 */
function PriceRange({ bounds, value, onChange }) {
  const [lo, hi] = bounds;
  const [min, max] = value;
  const span = Math.max(hi - lo, 1);
  const left = ((min - lo) / span) * 100;
  const right = ((max - lo) / span) * 100;

  const setMin = (n) => onChange([Math.min(Math.max(lo, n), max), max]);
  const setMax = (n) => onChange([min, Math.max(Math.min(hi, n), min)]);

  return (
    <div>
      <div className="dual-range relative mx-2 h-4">
        <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-black" />
        <div
          className="absolute top-1/2 h-[4px] -translate-y-1/2 bg-black"
          style={{ left: `${left}%`, right: `${100 - right}%` }}
        />
        <input
          type="range"
          aria-label="Minimum price"
          min={lo}
          max={hi}
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={lo}
          max={hi}
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
        />
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <PriceInput label="Minimum price" value={min} onCommit={setMin} />
        <span className="text-[#777]">—</span>
        <PriceInput label="Maximum price" value={max} onCommit={setMax} />
      </div>
    </div>
  );
}

function PriceInput({ label, value, onCommit }) {
  return (
    <label className="flex h-[32px] w-[97px] items-center rounded-[3px] border border-[#333] bg-white font-serif text-[14px] text-[#222]">
      <span className="pl-3 pr-1 text-[#666]">$</span>
      <input
        type="number"
        aria-label={label}
        value={value}
        onChange={(e) => onCommit(Number(e.target.value))}
        className="h-full w-full bg-transparent pr-3 text-center [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </label>
  );
}

export default PriceRange;
