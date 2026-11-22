import { useCallback, useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import { FiCheck, FiX } from "react-icons/fi";
import { dismissLastAdded, getLastAdded, openCartPopup } from "../../cart/cartSlice";
import { money } from "../../utils/money";
import { playAddToCartSound } from "./cartSound.js";

const DURATION_MS = 5000;

/** Top-right "Added to cart" notice shown after every Add to Cart click. */
function AddToCartToast() {
  const dispatch = useDispatch();
  const notice = useSelector(getLastAdded);
  const dismissNotice = useCallback(() => dispatch(dismissLastAdded()), [dispatch]);
  const openCart = () => dispatch(openCartPopup());

  // Sound + auto-dismiss; `notice.nonce` changes on every add so both restart.
  useEffect(() => {
    if (!notice) return undefined;
    playAddToCartSound();
    const t = setTimeout(dismissNotice, DURATION_MS);
    return () => clearTimeout(t);
  }, [notice, dismissNotice]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex justify-center px-3 sm:justify-end sm:px-5">
      <AnimatePresence>
        {notice && (
          <motion.div
            key={notice.nonce}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-full max-w-[480px] overflow-hidden border border-[#e5e5e5] bg-white"
          >
            {/* Countdown bar */}
            <div className="h-[3px] w-full bg-[#eee]">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
                className="h-full bg-[#c9961f]"
              />
            </div>

            <div className="relative flex gap-4 px-4 pb-5 pt-4">
              <button
                type="button"
                onClick={dismissNotice}
                aria-label="Dismiss"
                className="absolute right-3 top-3 text-[#999] transition hover:text-[#111]"
              >
                <FiX size={18} />
              </button>

              <Link
                to={notice.to}
                onClick={dismissNotice}
                className="flex h-[66px] w-[66px] shrink-0 items-center justify-center border border-[#e5e5e5] bg-white"
              >
                <img src={notice.image} alt="" className="max-h-full max-w-full object-contain" />
              </Link>

              <div className="min-w-0 flex-1 pr-6">
                <p className="flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#c9961f]">
                  <FiCheck size={13} strokeWidth={3} />
                  Added to cart
                </p>
                <p className="mt-1.5 line-clamp-2 font-serif text-[15px] font-bold leading-snug text-[#222]">
                  {notice.name}
                </p>
                <p className="mt-2 font-serif text-[15px] font-bold text-[#c9961f]">{money(notice.price)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  dismissNotice();
                  openCart();
                }}
                className="h-[42px] bg-[#f1f1f1] font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#444] transition hover:bg-[#e4e4e4] hover:text-[#111]"
              >
                View cart
              </button>
              <Link
                to="/checkout"
                onClick={dismissNotice}
                className="flex h-[42px] items-center justify-center bg-[#c9961f] font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#111]"
              >
                Checkout
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddToCartToast;
