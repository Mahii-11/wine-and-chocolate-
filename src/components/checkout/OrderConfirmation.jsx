import { Link } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import { money } from "../../utils/money";

/** Shown after the checkout API accepts the order. Every number comes from the server's response. */
function OrderConfirmation({ order }) {
  const summary = order.summary ?? {};
  const items = summary.items ?? [];
  const rows = [
    ["Sub-Total", money(summary.subtotal ?? 0)],
    ...(summary.coupon_discount > 0 ? [["Coupon discount", `-${money(summary.coupon_discount)}`]] : []),
    [
      summary.shipping_method?.name ? `Shipping (${summary.shipping_method.name})` : "Shipping",
      money(summary.shipping_fee ?? 0),
    ],
  ];

  return (
    <div className="bg-[#f5f5f5] py-16">
      <div className="mx-auto max-w-[640px] bg-white px-6 py-12 text-center sm:px-8">
        <FiCheckCircle size={56} className="mx-auto text-brand-gold" />
        <h2 className="mt-6 font-serif text-[24px] font-bold uppercase tracking-wide text-[#222]">Thank you for your order</h2>
        <p className="mt-3 font-serif text-[15px] leading-7 text-[#555]">
          Order <span className="font-bold text-[#222]">#{order.invoice_no}</span> has been received. Our team will
          contact you to confirm it.
        </p>

        {items.length > 0 && (
          <ul className="mt-8 divide-y divide-[#eee] border-y border-[#eee] text-left">
            {items.map((item) => (
              <li key={`${item.product_id}-${item.size_id}-${item.color_id}`} className="flex items-center gap-4 py-4">
                <span className="block h-[56px] w-[56px] shrink-0 bg-[#f4f4f4]">
                  {item.image && <img src={item.image} alt="" className="h-full w-full object-cover" />}
                </span>
                <div className="min-w-0 flex-1 font-serif">
                  <p className="line-clamp-2 text-[13px] font-semibold leading-5 text-[#222]">{item.name}</p>
                  <p className="mt-0.5 text-[12px] text-[#777]">
                    {item.quantity} × {money(item.unit_price)}
                  </p>
                </div>
                <span className="font-serif text-[13px] font-semibold text-[#222]">{money(item.line_total)}</span>
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-4 space-y-2 font-serif text-[13px] text-[#333]">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div className="flex justify-between border-t border-[#e6e6e6] pt-3 text-[16px] font-bold text-[#222]">
            <dt>Total</dt>
            <dd>{money(order.total)}</dd>
          </div>
        </dl>

        <Link
          to="/shop"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-black px-8 font-serif text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-brand-gold"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
