import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { deleteItem, getCart, setItemQuantity } from "../../cart/cartSlice";
import { money } from "../../utils/money";

const th = "px-3 py-3 font-serif text-[11px] font-bold uppercase tracking-[0.08em] text-[#333]";

function CheckoutCartTable({ subtotal }) {
  const dispatch = useDispatch();
  const items = useSelector(getCart);
  const lineKey = (item) => ({ slug: item.slug, variant_id: item.variant_id });
  const setQty = (item, quantity) => dispatch(setItemQuantity({ ...lineKey(item), quantity }));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <tr className="border-y border-[#e6e6e6] bg-[#fafafa] text-left">
            <th className={`${th} w-[90px] text-center`}>Image</th>
            <th className={th}>Product</th>
            <th className={`${th} w-[100px] text-center`}>Model</th>
            <th className={`${th} w-[130px] text-center`}>Qty</th>
            <th className={`${th} w-[100px] text-right`}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="py-10 text-center font-serif text-[14px] text-[#666]">
                Your shopping cart is empty.{" "}
                <Link to="/shop" className="text-[#1a4fc4] underline">
                  Continue shopping
                </Link>
              </td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={`${item.slug}-${item.variant_id}`} className="border-b border-[#e6e6e6] align-middle">
              <td className="px-3 py-4">
                <Link to={item.to} className="block h-[66px] w-[66px] bg-[#f4f4f4]">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </Link>
              </td>
              <td className="px-3 py-4">
                <Link to={item.to} className="font-serif text-[13px] font-semibold leading-5 text-[#1a4fc4] hover:underline">
                  {item.name}
                </Link>
                {item.options && (
                  <p className="mt-1 font-serif text-[12px] text-[#777]">
                    {[item.options.engraved && "Engraved bottle", item.options.card, item.options.message && `Message: "${item.options.message}"`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
                {item.oldPrice && (
                  <p className="mt-1 font-serif text-[12px] text-[#777]">
                    Regular price <span className="line-through">{money(item.oldPrice)}</span>, you save{" "}
                    {money(item.oldPrice - item.unitPrice)}
                  </p>
                )}
              </td>
              <td className="px-3 py-4 text-center font-serif text-[12px] text-[#555]">
                {item.sku || item.id}
              </td>
              <td className="px-3 py-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-9 items-stretch border border-[#e0e0e0] bg-white">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      max={item.stockQty ?? undefined}
                      onChange={(e) => setQty(item, e.target.value)}
                      aria-label={`Quantity for ${item.name}`}
                      className="w-10 bg-transparent text-center font-serif text-[13px] [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <div className="flex flex-col border-l border-[#e0e0e0]">
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(item, item.quantity + 1)}
                        className="flex flex-1 items-center justify-center px-1 text-[#555] hover:bg-black hover:text-white"
                      >
                        <FiChevronUp size={11} />
                      </button>
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(item, item.quantity - 1)}
                        className="flex flex-1 items-center justify-center border-t border-[#e0e0e0] px-1 text-[#555] hover:bg-black hover:text-white"
                      >
                        <FiChevronDown size={11} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => dispatch(deleteItem(lineKey(item)))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white transition hover:bg-black"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              </td>
              <td className="px-3 py-4 text-right font-serif text-[13px] font-semibold text-[#222]">
                {money(item.totalPrice)}
              </td>
            </tr>
          ))}
        </tbody>
        {items.length > 0 && (
          <tfoot className="font-serif text-[13px] text-[#333]">
            {[
              ["Sub-Total:", money(subtotal)],
              ["Shipping:", "Added when you place the order"],
            ].map(([label, value]) => (
              <tr key={label} className="border-b border-[#e6e6e6] bg-[#fafafa]">
                <td colSpan={4} className="px-3 py-2.5 text-right font-bold">
                  {label}
                </td>
                <td className="px-3 py-2.5 text-right">{value}</td>
              </tr>
            ))}
            {/* Total row hidden: the server adds the shipping fee, the final total is shown after the order is placed.
            <tr> ... Total: {money(total)} </tr> */}
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default CheckoutCartTable;
