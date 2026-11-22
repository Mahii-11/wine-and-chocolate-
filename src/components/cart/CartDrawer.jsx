import { useCallback, useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2, FiX } from "react-icons/fi";
import {
  decreaseItemQuantity,
  deleteItem,
  getCart,
  getShowCartPopup,
  getTotalCartPrice,
  getTotalCartQuantity,
  getTotalSavings,
  hideCartPopup,
  increaseItemQuantity,
  refreshCartPrices,
} from "../../cart/cartSlice";
import { money } from "../../utils/money";
import PriceChangeNotice from "./PriceChangeNotice.jsx";

function CartDrawer() {
  const dispatch = useDispatch();
  const items = useSelector(getCart);
  const count = useSelector(getTotalCartQuantity);
  const subtotal = useSelector(getTotalCartPrice);
  const savings = useSelector(getTotalSavings);
  const isOpen = useSelector(getShowCartPopup);
  const hasItems = items.length > 0;
  const closeCart = useCallback(() => dispatch(hideCartPopup()), [dispatch]);
  const lineKey = (item) => ({ slug: item.slug, variant_id: item.variant_id });

  // Re-check live prices / stock every time the drawer opens
  useEffect(() => {
    if (isOpen && hasItems) dispatch(refreshCartPrices());
  }, [isOpen, hasItems, dispatch]);

  // Lock page scroll and close on Escape while the drawer is open.
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/50"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[440px] flex-col bg-white text-brand-dark"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#d4af5c] px-6 py-5">
              <div>
                <h2 className="font-serif text-[18px] font-bold uppercase tracking-[0.12em]">Your Cart</h2>
                <p className="mt-1 font-serif text-[13px] text-gray-500">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 transition hover:border-black hover:bg-black hover:text-white"
              >
                <FiX size={18} />
              </button>
            </div>

            <PriceChangeNotice className="mx-6 mt-4" />

            {/*
              Free shipping progress is hidden: the free-shipping rule is not in the API yet, so the
              server decides the shipping fee at checkout. Needs back: FREE_SHIPPING_THRESHOLD (utils/money.js)
              and `remaining` / `progress` computed from the subtotal.
            {items.length > 0 && (
              <div className="border-b border-black/10 bg-[#faf6ec] px-6 py-4">
                <p className="font-serif text-[13px] text-brand-dark">
                  {remaining > 0 ? (
                    <>
                      You&apos;re <span className="font-bold text-brand-gold">{money(remaining)}</span> away from free
                      shipping
                    </>
                  ) : (
                    <span className="font-bold text-brand-gold">Congratulations! You&apos;ve unlocked free shipping.</span>
                  )}
                </p>
                <div className="mt-3 h-[5px] w-full overflow-hidden rounded-full bg-black/10">
                  <motion.div
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-[#d4af5c]"
                  />
                </div>
              </div>
            )}
            */}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af5c] text-brand-gold">
                    <FiShoppingBag size={30} />
                  </span>
                  <p className="mt-6 font-serif text-[18px] font-bold uppercase tracking-wide">Your cart is empty</p>
                  <p className="mt-2 max-w-[260px] font-serif text-[14px] text-gray-500">
                    Discover our curated wine and champagne gift baskets for every occasion.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-8 rounded-full bg-black px-8 py-3 font-serif text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-brand-gold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-black/10">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={`${item.slug}-${item.variant_id}`}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 py-5"
                      >
                        <Link to={item.to} onClick={closeCart} className="block h-[92px] w-[92px] shrink-0 bg-[#f4f4f4]">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="line-clamp-2 font-serif text-[14px] font-semibold leading-5">
                              <Link to={item.to} onClick={closeCart} className="transition hover:text-brand-gold">
                                {item.name}
                              </Link>
                            </h3>
                            <button
                              type="button"
                              onClick={() => dispatch(deleteItem(lineKey(item)))}
                              aria-label={`Remove ${item.name}`}
                              className="shrink-0 text-gray-400 transition hover:text-brand-red"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>

                          {item.options && (
                            <p className="mt-0.5 font-serif text-[11px] leading-4 text-gray-500">
                              {[item.options.engraved && "Engraved", item.options.card].filter(Boolean).join(" · ")}
                            </p>
                          )}

                          <p className="mt-1 font-serif text-[14px]">
                            <span className="font-bold">{money(item.unitPrice)}</span>
                            {item.oldPrice && (
                              <span className="ml-2 text-[12px] text-gray-400 line-through">{money(item.oldPrice)}</span>
                            )}
                          </p>

                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex h-8 items-center border border-black/20">
                              <button
                                type="button"
                                onClick={() => dispatch(decreaseItemQuantity(lineKey(item)))}
                                aria-label="Decrease quantity"
                                className="flex h-full w-8 items-center justify-center transition hover:bg-black hover:text-white"
                              >
                                <FiMinus size={12} />
                              </button>
                              <span className="w-9 text-center font-serif text-[13px] font-semibold">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => dispatch(increaseItemQuantity(lineKey(item)))}
                                aria-label="Increase quantity"
                                className="flex h-full w-8 items-center justify-center transition hover:bg-black hover:text-white"
                              >
                                <FiPlus size={12} />
                              </button>
                            </div>
                            <span className="font-serif text-[14px] font-bold">{money(item.totalPrice)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#d4af5c] px-6 pb-6 pt-5">
                {savings > 0 && (
                  <div className="flex items-center justify-between font-serif text-[13px] text-gray-500">
                    <span>You save</span>
                    <span className="font-semibold text-brand-gold">{money(savings)}</span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between font-serif">
                  <span className="text-[15px] font-bold uppercase tracking-[0.08em]">Subtotal</span>
                  <span className="text-[20px] font-bold">{money(subtotal)}</span>
                </div>
                <p className="mt-1 font-serif text-[12px] text-gray-500">
                  The shipping fee is added when you place the order.
                </p>

                {/* The drawer is the cart: there is no separate /cart page, so only Checkout is offered */}
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-black font-serif text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-brand-gold"
                >
                  Checkout
                </Link>

                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-4 block w-full text-center font-serif text-[13px] text-gray-600 underline underline-offset-4 transition hover:text-brand-gold"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
