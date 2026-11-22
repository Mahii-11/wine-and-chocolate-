import { useEffect, useState } from "react";
import { Link } from "react-router";
import { money } from "../../utils/money";
import { getBestSellers } from "../../services/api";

function RelatedProducts({ product }) {
  const [topSelling, setTopSelling] = useState([]);
  const [active, setActive] = useState("related");

  useEffect(() => {
    let alive = true;
    getBestSellers()
      .then((list) => alive && setTopSelling(list.filter((p) => p.id !== product.id).slice(0, 6)))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [product.id]);

  // Only tabs that have products are shown
  const tabs = [
    { id: "related", label: "Related Products", list: product.relatedProducts.slice(0, 6) },
    { id: "top", label: "Top Selling Items", list: topSelling },
  ].filter((t) => t.list.length > 0);

  if (tabs.length === 0) return null;

  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="mt-12">
      <div className={`grid ${tabs.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {tabs.map((t) => {
          const on = t.id === current.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`relative h-[40px] font-serif text-[11px] font-bold uppercase tracking-[0.14em] transition sm:text-[12px] ${
                on ? "bg-[#c9a33b] text-white" : "bg-[#2c3545] text-white hover:bg-[#3a4559]"
              }`}
            >
              {t.label}
              {on && (
                <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[7px] border-x-transparent border-t-[#c9a33b]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-2 no-scrollbar xl:grid xl:grid-cols-6 xl:overflow-visible">
        {current.list.map((p) => (
          <article key={p.id} className="flex w-[200px] shrink-0 flex-col border border-[#e6e6e6] bg-white p-2 xl:w-auto">
            <Link to={p.to} className="block aspect-square overflow-hidden bg-[#f4f4f4]">
              {p.image && <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />}
            </Link>
            <h3 className="mt-3 line-clamp-2 min-h-[36px] px-1 text-center font-serif text-[12px] font-bold leading-[18px] text-[#222]">
              <Link to={p.to} className="transition hover:text-brand-gold">{p.name}</Link>
            </h3>
            <p className="mb-1 mt-2 text-center font-serif text-[12px] font-bold text-[#222]">
              {money(p.price)}
              {p.oldPrice && <span className="ml-1.5 text-[10px] font-normal text-brand-red line-through">{money(p.oldPrice)}</span>}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
