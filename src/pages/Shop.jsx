import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import FilterSidebar from "../components/shop/FilterSidebar.jsx";
import ShopProductCard from "../components/shop/ShopProductCard.jsx";
import ShopSeoContent from "../components/shop/ShopSeoContent.jsx";
import { getAllBrands, getShopProducts } from "../services/api";
import {
  sortOptions,
  pageSizeOptions,
  shopPages,
  defaultShopPage,
} from "../components/shop/shopProductsData.js";

const selectClass =
  "h-[28px] cursor-pointer border border-gray-400 bg-white px-2 font-serif text-[14px] text-[#222] focus:outline-none focus:ring-1 focus:ring-brand-gold";

const GRID =
  "mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-[34px] xl:gap-y-12";

const sorters = {
  default: () => 0,
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

const titleFromSlug = (slug) => slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function Shop() {
  const { slug: routeSlug } = useParams();
  // /shop/products is the "all products" listing, not a category
  const slug = routeSlug === "products" ? undefined : routeSlug;
  const [searchParams] = useSearchParams();
  const brandParam = searchParams.get("brand");
  const page =
    shopPages[slug] ??
    (slug
      ? { title: titleFromSlug(slug), breadcrumb: [{ label: titleFromSlug(slug) }], intro: [] }
      : defaultShopPage);

  const [brands, setBrands] = useState([]);
  const [brandsLoaded, setBrandsLoaded] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [priceBounds, setPriceBounds] = useState(null);
  const [priceRange, setPriceRange] = useState(null); // slider value while dragging
  const [appliedPrice, setAppliedPrice] = useState(null); // debounced value sent to the API

  const [sort, setSort] = useState("default");
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getAllBrands()
      .then((list) =>
        setBrands(
          [...list]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((b) => ({ id: String(b.id), name: b.name, slug: b.slug, logo: b.image })),
        ),
      )
      .catch(() => {})
      .finally(() => setBrandsLoaded(true));
  }, []);

  // ?brand= may hold a brand slug or id (menu / SEO links): resolve it once brands are known
  useEffect(() => {
    if (!brandsLoaded) return;
    const match = brandParam && brands.find((b) => b.slug === brandParam || b.id === brandParam);
    setSelectedBrands(match ? [match.id] : []);
  }, [brandsLoaded, brandParam, brands]);

  // Debounce the price slider so dragging doesn't fire a request per step
  useEffect(() => {
    if (!priceRange) return;
    const t = setTimeout(() => setAppliedPrice(priceRange), 400);
    return () => clearTimeout(t);
  }, [priceRange]);

  const brandKey = selectedBrands.join(",");
  const [min, max] = appliedPrice ?? [];

  useEffect(() => {
    if (!brandsLoaded) return;
    const ctrl = new AbortController();
    setLoading(true);
    getShopProducts({
      category: slug,
      brands: selectedBrands,
      minPrice: min,
      maxPrice: max,
      perPage: pageSize,
      signal: ctrl.signal,
    })
      .then((res) => {
        setProducts(res.products);
        setMeta(res.meta);
        if (!appliedPrice && res.priceBounds) setPriceBounds(res.priceBounds);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setProducts([]);
        setMeta({});
        setLoading(false);
      });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsLoaded, slug, brandKey, min, max, pageSize]);

  const total = meta.total ?? products.length;
  const hasMore = (meta.current_page ?? 1) < (meta.last_page ?? 1);
  const sorted = useMemo(() => [...products].sort(sorters[sort]), [products, sort]);

  const loadMore = () => {
    setLoadingMore(true);
    getShopProducts({
      category: slug,
      brands: selectedBrands,
      minPrice: min,
      maxPrice: max,
      perPage: pageSize,
      page: (meta.current_page ?? 1) + 1,
    })
      .then((res) => {
        setProducts((prev) => [...prev, ...res.products]);
        setMeta(res.meta);
      })
      .catch(() => {})
      .finally(() => setLoadingMore(false));
  };

  // The API accepts a single brand id, so brands behave like a single-select
  const toggleBrand = (id) => setSelectedBrands((prev) => (prev.includes(id) ? [] : [id]));

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange(null);
    setAppliedPrice(null);
    setSort("default");
  };

  return (
    <>
      <ShopPageHeader title={page.title} breadcrumb={page.breadcrumb} />

      <div className="mx-auto max-w-[1730px] px-4 pb-14 pt-6">
        <div className="flex flex-col gap-10 lg:flex-row">
          <FilterSidebar
            brands={brands}
            priceBounds={priceBounds}
            priceRange={priceRange ?? priceBounds}
            onPriceChange={setPriceRange}
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
                {sorted.length} of {total} products
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
                  onChange={(e) => setPageSize(Number(e.target.value))}
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

            {loading ? (
              <div className={GRID}>
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="aspect-square animate-pulse bg-[#e9e9e9]" />
                ))}
              </div>
            ) : sorted.length > 0 ? (
              <div className={GRID}>
                {sorted.map((product) => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="mt-16 text-center font-serif text-[16px] text-[#555]">
                No products match the selected filters.
              </p>
            )}

            <div className="mt-14 flex flex-col items-center">
              {!loading && hasMore && (
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="h-[46px] rounded-full bg-black px-9 font-serif text-[14px] font-bold uppercase tracking-[0.04em] text-white transition-colors duration-300 hover:bg-brand-gold disabled:opacity-60"
                >
                  {loadingMore ? "Loading..." : "Load More Products"}
                </button>
              )}
              {!loading && (
                <p className="mt-3 font-serif text-[14px] text-[#555]">
                  Showing {sorted.length} of {total} products
                </p>
              )}
            </div>

            <ShopSeoContent />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
