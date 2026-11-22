import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import FilterSidebar from "../components/shop/FilterSidebar.jsx";
import ShopProductCard from "../components/shop/ShopProductCard.jsx";
import ShopSeoContent from "../components/shop/ShopSeoContent.jsx";
import {
  shopProducts,
  sortOptions,
  pageSizeOptions,
  shopPages,
  defaultShopPage,
} from "../components/shop/shopProductsData.js";

const selectClass =
  "h-[28px] cursor-pointer border border-gray-400 bg-white px-2 font-serif text-[14px] text-[#222] focus:outline-none focus:ring-1 focus:ring-brand-gold";

const sorters = {
  default: () => 0,
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

function Shop() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const page = shopPages[slug] ?? defaultShopPage;

  const priceBounds = useMemo(() => {
    const prices = shopProducts.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, []);

  const [priceRange, setPriceRange] = useState(priceBounds);
  const [selectedBrands, setSelectedBrands] = useState(() => {
    const fromUrl = searchParams.get("brand");
    return fromUrl ? [fromUrl] : [];
  });
  const [sort, setSort] = useState("default");
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [visibleCount, setVisibleCount] = useState(pageSizeOptions[0]);

  const filtered = useMemo(() => {
    const [min, max] = priceRange;
    return shopProducts
      .filter((p) => p.price >= min && p.price <= max)
      .filter((p) => selectedBrands.length === 0 || selectedBrands.includes(p.brand))
      .sort(sorters[sort]);
  }, [priceRange, selectedBrands, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const toggleBrand = (id) => {
    setSelectedBrands((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));
    setVisibleCount(pageSize);
  };

  const changePrice = (range) => {
    setPriceRange(range);
    setVisibleCount(pageSize);
  };

  const clearFilters = () => {
    setPriceRange(priceBounds);
    setSelectedBrands([]);
    setSort("default");
    setVisibleCount(pageSize);
  };

  const changePageSize = (n) => {
    setPageSize(n);
    setVisibleCount(n);
  };

  return (
    <>
      <ShopPageHeader title={page.title} breadcrumb={page.breadcrumb} />

      <div className="mx-auto max-w-[1730px] px-4 pb-14 pt-6">
        <div className="flex flex-col gap-10 lg:flex-row">
          <FilterSidebar
            priceBounds={priceBounds}
            priceRange={priceRange}
            onPriceChange={changePrice}
            selectedBrands={selectedBrands}
            onToggleBrand={toggleBrand}
            onClear={clearFilters}
          />

          <div className="min-w-0 flex-1">
            <div className="font-serif text-[15px] leading-[28px] text-[#222] sm:text-[16px]">
              {page.intro.map((text) => (
                <p key={text} className="mb-4 last:mb-0">
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-end gap-x-7 gap-y-3 font-serif text-[14px] text-[#555]">
              <span>
                {visible.length} of {filtered.length} products
              </span>
              <label className="flex items-center gap-3">
                Sort by:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className={`${selectClass} w-[112px]`}
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3">
                Show:
                <select
                  value={pageSize}
                  onChange={(e) => changePageSize(Number(e.target.value))}
                  className={`${selectClass} w-[66px]`}
                >
                  {pageSizeOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {visible.length > 0 ? (
              <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-[34px] xl:gap-y-12">
                {visible.map((product) => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="mt-16 text-center font-serif text-[16px] text-[#555]">
                No products match the selected filters.
              </p>
            )}

            <div className="mt-14 flex flex-col items-center">
              {hasMore && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((n) => n + pageSize)}
                  className="h-[46px] rounded-full bg-black px-9 font-serif text-[14px] font-bold uppercase tracking-[0.04em] text-white transition-colors duration-300 hover:bg-brand-gold"
                >
                  Load More Products
                </button>
              )}
              <p className="mt-3 font-serif text-[14px] text-[#555]">
                Showing {visible.length} of {filtered.length} products
              </p>
            </div>

            <ShopSeoContent />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
