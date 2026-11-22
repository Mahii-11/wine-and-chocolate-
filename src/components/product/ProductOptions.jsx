import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { FiChevronDown, FiChevronUp, FiHeart, FiShoppingCart } from "react-icons/fi";
import { addItem } from "../../cart/cartSlice";
import { money } from "../../utils/money";

function ProductOptions({ product }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  // Quantity can never exceed the stock the API reports
  const maxQty = product.stockQty ?? Infinity;
  const clampQty = (n) => Math.min(maxQty, Math.max(1, n));

  const add = () => {
    dispatch(
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        to: product.to,
        sku: product.sku,
        price: product.price,
        oldPrice: product.oldPrice,
        quantity: qty,
        stockQty: product.stockQty,
      })
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f6f6f6]">
      {/* Price + identifiers */}
      <div className="flex shrink-0 flex-wrap items-start justify-between gap-4 border-b border-white px-5 py-4">
        <div className="flex gap-5">
          <div>
            <p className="font-serif text-[26px] font-bold leading-none text-[#222]">{money(product.price)}</p>
            {product.flashSale && (
              <p className="mt-2 inline-block bg-brand-red px-2 py-0.5 font-serif text-[10px] font-bold uppercase tracking-wide text-white">
                {product.flashSale.title || product.flashSale.name || "Flash Sale"}
              </p>
            )}
            {product.oldPrice && (
              <p className="mt-2 flex items-center gap-2 font-serif text-[13px]">
                <span className="text-[#888] line-through">{money(product.oldPrice)}</span>
                {product.discountPercent > 0 && (
                  <span className="bg-brand-gold px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    {product.discountPercent}% off
                  </span>
                )}
              </p>
            )}
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 font-serif text-[11px] text-[#333]">
            <div className="flex gap-1">
              <dt className="font-bold">Stock:</dt>
              <dd className={`font-bold ${product.inStock ? "text-[#1e8a3c]" : "text-brand-red"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
                {product.inStock && product.stockQty != null && (
                  <span className={`ml-1 font-normal ${product.stockQty <= 10 ? "text-brand-red" : "text-[#555]"}`}>
                    ({product.stockQty <= 10 ? `Only ${product.stockQty} left` : `${product.stockQty} available`})
                  </span>
                )}
              </dd>
            </div>
            <div className="flex gap-1"><dt className="font-bold">Product ID:</dt><dd>{product.id}</dd></div>
            {product.sku && <div className="flex gap-1"><dt className="font-bold">SKU:</dt><dd>{product.sku}</dd></div>}
            {product.brand && <div className="flex gap-1"><dt className="font-bold">Brand:</dt><dd>{product.brand.name}</dd></div>}
            {product.categories.length > 0 && (
              <div className="col-span-2 flex flex-wrap gap-1">
                <dt className="font-bold">Category:</dt>
                <dd>
                  {product.categories.map((c, i) => (
                    <span key={c.id}>
                      {i > 0 && " › "}
                      <Link to={`/shop/${c.slug}`} className="hover:text-brand-gold hover:underline">{c.name}</Link>
                    </span>
                  ))}
                </dd>
              </div>
            )}
            <div className="flex gap-1">
              <dt className="font-bold">Shipping:</dt>
              <dd className={product.freeShipping ? "font-bold text-[#1e8a3c]" : ""}>
                {product.freeShipping ? "Free Shipping" : "Shipping fee applies"}
              </dd>
            </div>
            <div className="flex gap-1"><dt className="font-bold">Views:</dt><dd>{product.views}</dd></div>
          </dl>
        </div>
        {product.brand && (
          <div className="flex h-[56px] w-[118px] items-center justify-center border border-[#e6e6e6] bg-white px-3">
            {product.brand.logo ? (
              <img src={product.brand.logo} alt={product.brand.name} className="max-h-full max-w-full object-contain" />
            ) : (
              <span className="text-center font-serif text-[12px] font-bold uppercase tracking-wide text-[#222]">{product.brand.name}</span>
            )}
          </div>
        )}
      </div>

      {/* Short description written in the admin panel (trusted source), rendered as-is */}
      <div
        className="min-h-0 flex-1 overflow-y-auto px-5 py-4 font-serif text-[13px] leading-6 text-[#333]"
        dangerouslySetInnerHTML={{ __html: product.shortDescription }}
      />

      {/*
        Engraving (+$40), greeting card message and greeting card choice are hidden: the checkout API
        has no field for them, so the server would not charge for them. Restore when the backend supports
        it (the original block is kept at the bottom of this file; cartSlice already handles
        `extras`, `variant_id` and `options`).
      */}

      {/* Qty + add to cart */}
      <div className="flex shrink-0 items-stretch bg-white">
        <div className="flex border border-[#222]">
          <input
            type="number"
            min={1}
            value={qty}
            max={maxQty}
            onChange={(e) => setQty(clampQty(Number(e.target.value) || 1))}
            aria-label="Quantity"
            className="h-12 w-12 text-center font-serif text-[13px] [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <div className="flex flex-col border-l border-[#222]">
            <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => clampQty(q + 1))} className="flex flex-1 items-center justify-center px-1.5 hover:bg-black hover:text-white">
              <FiChevronUp size={12} />
            </button>
            <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex flex-1 items-center justify-center border-t border-[#222] px-1.5 hover:bg-black hover:text-white">
              <FiChevronDown size={12} />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={add}
          disabled={!product.inStock}
          className="flex h-12 flex-1 items-center justify-center gap-2 bg-black font-serif text-[12px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:bg-[#9a9a9a] disabled:hover:bg-[#9a9a9a]"
        >
          <FiShoppingCart size={14} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
        <button
          type="button"
          onClick={() => setWished((w) => !w)}
          aria-pressed={wished}
          aria-label="Add to wishlist"
          className={`flex w-12 items-center justify-center border border-l-0 border-[#222] transition ${wished ? "bg-brand-red text-white" : "hover:bg-black hover:text-white"}`}
        >
          <FiHeart size={16} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

export default ProductOptions;

/*
 * ---- Hidden until the checkout API supports them (see the note in the component) ----
 *
 * Needs back: import { ENGRAVING_PRICE, MESSAGE_MAX, greetingCards } from "./productDetailsData";
 *             const label = "font-serif text-[12px] font-bold text-[#222]";
 *             state: engrave, message, card; extras = (engrave ? ENGRAVING_PRICE : 0) + selected card price;
 *             addItem payload: price: product.price + extras, extras, variant_id and options
 *
 *       <div className="space-y-5 px-5 py-5">
 *         <div>
 *           <p className={label}>Engrave The Bottle</p>
 *           <div className="mt-2 inline-flex border border-[#d6d6d6] bg-white">
 *             {[
 *               { v: true, text: `Yes (+${money(ENGRAVING_PRICE).replace(".00", "")})` },
 *               { v: false, text: "No" },
 *             ].map((o, i) => (
 *               <button
 *                 key={String(o.v)}
 *                 type="button"
 *                 onClick={() => setEngrave(o.v)}
 *                 className={`h-[30px] px-4 font-serif text-[11px] font-bold transition ${i > 0 ? "border-l border-[#d6d6d6]" : ""} ${
 *                   engrave === o.v ? "bg-[#222] text-white" : "text-[#222] hover:bg-[#f1f1f1]"
 *                 }`}
 *               >
 *                 {o.v ? <>Yes <span className={engrave ? "text-[#f1d99f]" : "text-brand-red"}>(+$40)</span></> : o.text}
 *               </button>
 *             ))}
 *           </div>
 *         </div>
 * 
 *         <div>
 *           <p className={label}>
 *             Message on Greeting Card{" "}
 *             <span className="font-normal text-[#777]">(Maximum {MESSAGE_MAX} Characters)</span>
 *           </p>
 *           <textarea
 *             value={message}
 *             maxLength={MESSAGE_MAX}
 *             onChange={(e) => setMessage(e.target.value)}
 *             placeholder="Message on Greeting Card"
 *             rows={3}
 *             className="mt-2 w-full resize-y border border-[#d6d6d6] bg-white px-3 py-2 font-serif text-[12px] placeholder:text-[#9a9a9a] focus:border-[#d9a641] focus:outline-none"
 *           />
 *           <p className="mt-1 text-right font-serif text-[10px] text-[#888]">{message.length}/{MESSAGE_MAX}</p>
 *         </div>
 * 
 *         <div>
 *           <p className={label}>
 *             Choose a Greeting Card : {money(greetingCards[1].price)} (Standard Greeting Card is Free){" "}
 *             <span className="text-brand-red">*</span>
 *           </p>
 *           <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
 *             {greetingCards.map((c) => {
 *               const Icon = c.icon;
 *               const active = c.id === card;
 *               return (
 *                 <button
 *                   key={c.id}
 *                   type="button"
 *                   onClick={() => setCard(c.id)}
 *                   aria-pressed={active}
 *                   className={`flex flex-col items-center rounded-[3px] border px-2 py-3 text-center transition ${
 *                     active ? "border-[#d9a641] bg-white" : "border-transparent hover:border-[#e0d3b0]"
 *                   }`}
 *                 >
 *                   <span className="flex h-[48px] w-[58px] items-center justify-center border border-[#e6e6e6] bg-white text-[#c9961f]">
 *                     <Icon size={20} />
 *                   </span>
 *                   <span className="mt-2 font-serif text-[10px] leading-[13px] text-[#333]">{c.label}</span>
 *                   <span className="mt-1 font-serif text-[10px] font-semibold text-[#c9961f]">
 *                     {c.price ? `+${money(c.price)}` : " "}
 *                   </span>
 *                 </button>
 *               );
 *             })}
 *           </div>
 *         </div>
 *       </div>
 */
