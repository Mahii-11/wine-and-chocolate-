import { useDispatch, useSelector } from "react-redux";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { dismissPriceChanges, getPriceChanges } from "../../cart/cartSlice";
import { money } from "../../utils/money";

const describe = (c) => {
  if (c.type === "removed") return `${c.name} is no longer available and was removed from your cart.`;
  if (c.type === "stock") return `Only ${c.to} of ${c.name} left in stock. Your quantity was updated.`;
  return `${c.name}: price changed from ${money(c.from)} to ${money(c.to)}.`;
};

/** Tells the customer what the live price / stock check changed in their cart. */
function PriceChangeNotice({ className = "" }) {
  const dispatch = useDispatch();
  const changes = useSelector(getPriceChanges);

  if (changes.length === 0) return null;

  return (
    <div role="status" className={`relative border border-[#e6c877] bg-[#fdf8ec] px-4 py-3 pr-10 ${className}`}>
      <p className="flex items-center gap-2 font-serif text-[12px] font-bold uppercase tracking-wide text-[#8a6a12]">
        <FiAlertTriangle size={14} />
        Your cart was updated
      </p>
      <ul className="mt-1.5 space-y-1 font-serif text-[12px] leading-5 text-[#333]">
        {changes.map((c, i) => (
          <li key={`${c.name}-${i}`}>{describe(c)}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => dispatch(dismissPriceChanges())}
        aria-label="Dismiss"
        className="absolute right-3 top-3 text-[#999] transition hover:text-[#111]"
      >
        <FiX size={16} />
      </button>
    </div>
  );
}

export default PriceChangeNotice;
