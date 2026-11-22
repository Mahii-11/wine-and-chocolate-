import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity, openCartPopup } from "../cart/cartSlice";
import { money } from "../utils/money";

/** Header cart trigger: live count + subtotal, opens the cart drawer. */
function CartButton({ compact = false }) {
  const dispatch = useDispatch();
  const count = useSelector(getTotalCartQuantity);
  const subtotal = useSelector(getTotalCartPrice);
  const openCart = () => dispatch(openCartPopup());

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${count} items`}
      className={`flex items-center transition hover:text-brand-gold ${compact ? "gap-3" : "gap-4"}`}
    >
      <span
        className={`hidden font-serif font-semibold md:inline ${compact ? "text-[16px]" : "text-[16px] xl:text-[18px]"}`}
      >
        {count} item(s) - {money(subtotal)}
      </span>
      <span className="relative">
        <FiShoppingCart className={compact ? "h-6 w-6" : "h-6 w-6 lg:h-7 lg:w-7"} strokeWidth={2.2} />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
          {count}
        </span>
      </span>
    </button>
  );
}

export default CartButton;
