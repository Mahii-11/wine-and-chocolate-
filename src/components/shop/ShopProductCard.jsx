import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { addItem } from "../../cart/cartSlice";
import { money } from "../../utils/money";

function ShopProductCard({ product, onAdd }) {
  const dispatch = useDispatch();
  const onSale = product.oldPrice && product.oldPrice > product.price;

  return (
    <article className="flex h-full flex-col">
      <Link to={product.to} className="relative block">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        {onSale && (
          <span className="absolute right-[10px] top-[10px] rounded-full bg-[#4a3b10] px-[11px] py-[3px] font-sans text-[11px] font-bold uppercase tracking-wide text-white">
            Sale
          </span>
        )}
      </Link>

      <h3 className="mt-6 min-h-[44px] text-center font-serif text-[15px] font-semibold leading-[22px] text-[#222] sm:text-[17px]">
        <Link to={product.to} className="transition hover:text-brand-gold">
          {product.name}
        </Link>
      </h3>

      <div className="mt-auto pt-8">
        <span className="mx-auto block h-px w-[70px] bg-gray-300" />
        <p className="mt-3 text-center font-serif leading-none">
          <span className="text-[20px] text-[#222]">{money(product.price)}</span>
          {onSale && (
            <span className="ml-2 text-[15px] text-gray-500 line-through">{money(product.oldPrice)}</span>
          )}
        </p>
        <button
          type="button"
          onClick={() => (onAdd ? onAdd(product) : dispatch(addItem(product)))}
          className="mt-3 flex h-[36px] w-full items-center justify-center gap-2 rounded-full bg-black font-serif text-[11px] font-bold uppercase tracking-[0.04em] text-white transition-colors duration-300 hover:bg-brand-gold sm:text-[12px]"
        >
          <FiShoppingCart size={13} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ShopProductCard;
