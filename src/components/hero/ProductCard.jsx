import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { addItem } from "../../cart/cartSlice";
import { money } from "../../utils/money";

function ProductCard({ product, onAdd }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saving = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <article className="group flex h-full w-[220px] shrink-0 flex-col bg-white sm:w-[250px] xl:w-[270px]">
      <Link to={product.to} className="relative block overflow-hidden bg-[#f4f4f4]">
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {saving > 0 && (
          <span className="absolute left-3 top-3 bg-brand-gold px-2 py-0.5 font-serif text-[10px] font-bold uppercase tracking-wider text-white">
            Save {money(saving)}
          </span>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-dark opacity-0 transition hover:bg-brand-dark hover:text-white group-hover:opacity-100"
        >
          <FiHeart size={16} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 text-center">
        <h3 className="line-clamp-2 min-h-[40px] font-serif text-[13px] font-semibold leading-5 text-brand-dark">
          <Link to={product.to} className="transition hover:text-brand-gold">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 flex items-baseline justify-center gap-2 font-serif">
          <span className="text-[16px] font-bold text-brand-dark">{money(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">{money(product.oldPrice)}</span>
          )}
        </p>

        <button
          type="button"
          onClick={() => {
            if (onAdd) return onAdd(product);
            // Variable products need their options chosen on the details page
            if (product.isVariable) return navigate(product.to);
            return dispatch(addItem(product));
          }}
          className="mx-auto mt-3 flex w-[85%] items-center justify-center gap-2 rounded-full bg-brand-dark py-2 font-sans text-[11px] font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-brand-gold"
        >
          <FiShoppingCart size={13} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
