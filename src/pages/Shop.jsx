import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import FilterSidebar from "../components/shop/FilterSidebar.jsx";
import ShopProductCard from "../components/shop/ShopProductCard.jsx";
import ShopSeoContent from "../components/shop/ShopSeoContent.jsx";
import { getAllBrands, getMenuData, getShopProducts } from "../services/api";
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
  const navigate = useNavigate();
  // Category / sub category / child category / brand are all filtered by slug (kept in the URL)
  const category = searchParams.get("category") || slug || "";
  const subCategory = searchParams.get("sub_category") || "";
  const childCategory = searchParams.get("child_category") || "";
  const brandParam = searchParams.get("brand") || "";
  const [brands, setBrands] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);

  // Title + breadcrumb follow the selected category > sub category > child category chain
  const catNode = categoryTree.find((c) => c.slug === category);
  const subNode = catNode?.sub_categories?.find((s) => s.slug === subCategory);
  const childNode = subNode?.child_categories?.find((c) => c.slug === childCategory);
  const chain = [
    category && { label: catNode?.name ?? titleFromSlug(category), to: `/shop?category=${category}` },
    subCategory && {
      label: subNode?.name ?? titleFromSlug(subCategory),
      to: `/shop?category=${category}&sub_category=${subCategory}`,
    },
    childCategory && { label: childNode?.name ?? titleFromSlug(childCategory) },
  ].filter(Boolean);
  const page =
    (!searchParams.size && shopPages[slug]) ||
    (chain.length
      ? {
          title: chain[chain.length - 1].label,
          breadcrumb: [{ label: "Shop", to: "/shop" }, ...chain],
          intro: [],
        }
      : defaultShopPage);
  const selectedBrands = useMemo(() => (brandParam ? [brandParam] : []), [brandParam]);

  const [priceBounds, setPriceBounds] = useState(null);
  const [priceRange, setPriceRange] = useState(null); // slider value while dragging
  const [appliedPrice, setAppliedPrice] = useState(null); // debounced value sent to the API

  // A different category/brand has its own price range: drop the old slider selection
  const filterKey = [category, subCategory, childCategory, brandParam].join("|");
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setPriceRange(null);
    setAppliedPrice(null);
  }

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
            .map((b) => ({ id: b.slug, name: b.name, slug: b.slug, logo: b.image })),
        ),
      )
      .catch(() => {});
    // Full tree (every category, sub and child) comes from menu-data. `shop/products` filters only list
    // categories that have products, so it is used just for the product counts.
    Promise.all([getMenuData(), getShopProducts({ perPage: 1 }).catch(() => ({ categories: [] }))])
      .then(([menu, shop]) => {
        const counts = {};
        const walk = (list, ...path) =>
          list.forEach((c) => {
            counts[[...path, c.slug].join("/")] = c.products_count;
            walk(c.sub_categories || c.child_categories || [], ...path, c.slug);
          });
        walk(shop.categories);
        setCategoryTree(
          menu.map((cat) => ({
            ...cat,
            products_count: counts[cat.slug] ?? 0,
            sub_categories: (cat.sub_categories || []).map((sub) => ({
              ...sub,
              products_count: counts[`${cat.slug}/${sub.slug}`] ?? 0,
              child_categories: (sub.child_categories || []).map((c) => ({
                ...c,
                products_count: counts[`${cat.slug}/${sub.slug}/${c.slug}`] ?? 0,
              })),
            })),
          })),
        );
      })
      .catch(() => {});
  }, []);

  // Rewrite the URL with the given filter slugs (empty values are dropped)
  const applyFilters = (next) => {
    const q = new URLSearchParams();
    const all = {
      category,
      sub_category: subCategory,
      child_category: childCategory,
      brand: brandParam,
      ...next,
    };
    Object.entries(all).forEach(([k, v]) => v && q.set(k, v));
    const search = q.toString();
    navigate({ pathname: "/shop", search: search ? `?${search}` : "" });
  };

  // Debounce the price slider so dragging doesn't fire a request per step
  useEffect(() => {
    if (!priceRange) return;
    const t = setTimeout(() => setAppliedPrice(priceRange), 400);
    return () => clearTimeout(t);
  }, [priceRange]);

  const [min, max] = appliedPrice ?? [];

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    getShopProducts({
      category,
      subCategory,
      childCategory,
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
  }, [category, subCategory, childCategory, brandParam, min, max, pageSize]);

  const total = meta.total ?? products.length;
  const hasMore = (meta.current_page ?? 1) < (meta.last_page ?? 1);
  const sorted = useMemo(() => [...products].sort(sorters[sort]), [products, sort]);

  const loadMore = () => {
    setLoadingMore(true);
    getShopProducts({
      category,
      subCategory,
      childCategory,
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
  const toggleBrand = (id) => applyFilters({ brand: brandParam === id ? "" : id });

  const selectCategory = (cat, sub = "", child = "") =>
    applyFilters({ category: cat, sub_category: sub, child_category: child });

  const clearFilters = () => {
    if (searchParams.size || slug) navigate("/shop");
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
            categories={categoryTree}
            selectedCategory={{ category, subCategory, childCategory }}
            onSelectCategory={selectCategory}
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
