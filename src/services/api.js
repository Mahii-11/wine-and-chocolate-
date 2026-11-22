export const BASE_URL =
  import.meta.env.VITE_API_URL || "https://backendwine.bdtechdemo.online/api/";

/* Common request helper */
const fetchData = async (endpoint, option = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...option,
    });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error.message);
    throw error;
  }
};

// GET all-brand-data -> { status, data: [ { id, name, slug, image } ] }
export const getAllBrands = async () => {
  const res = await fetchData("all-brand-data");
  if (!(res.status ?? res.success)) {
    throw new Error("All brands fetch unsuccessful");
  }
  const list = Array.isArray(res?.data) ? res.data : res?.data?.data;
  return list || [];
};

// GET setting-data -> { status, data: { logo, email, phone, address, copyright, site_description } }
export const getSiteSettings = async () => {
  const res = await fetchData("setting-data");
  if (!(res.status ?? res.success)) {
    throw new Error("Site settings fetch unsuccessful");
  }
  return res.data || {};
};

// GET social-data -> { status, data: [ { id, link, icon: "bi bi-facebook" } ] }
export const getSocialLinks = async () => {
  const res = await fetchData("social-data");
  if (!(res.status ?? res.success)) {
    throw new Error("Social links fetch unsuccessful");
  }
  return res.data || [];
};

// GET brand-data -> { status, data: [ { id, name, slug, image } ] }
export const getBrands = async () => {
  const res = await fetchData("brand-data");
  if (!(res.status ?? res.success)) {
    throw new Error("Brands fetch unsuccessful");
  }
  const list = Array.isArray(res?.data) ? res.data : res?.data?.data;
  return list || [];
};

// API product -> shape used by the product cards (hero/ProductCard, cart).
// Single product: `price` is the regular price, `offer_price` the discounted one.
// Variable product: min_price / min_offer_price are used ("from" price).
const toCardProduct = (p) => {
  const isVariable = p.type !== "single" && p.min_price != null;
  const regular = Number(isVariable ? p.min_price : p.price) || 0;
  const offer = Number(isVariable ? p.min_offer_price : p.offer_price) || 0;
  const hasOffer = offer > 0 && offer < regular;

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    type: p.type,
    isVariable,
    image: p.image,
    price: hasOffer ? offer : regular,
    oldPrice: hasOffer ? regular : undefined,
    discountPercent: hasOffer ? Number(p.discount_percent) || 0 : 0,
    to: `/products/${p.slug}`,
  };
};

// GET best-seller-products -> { status, data: [ { id, name, slug, type, image, min_price, max_price,
//                                                  min_offer_price, max_offer_price, price, offer_price, discount_percent } ] }
export const getBestSellers = async () => {
  const res = await fetchData("best-seller-products");
  if (!(res.status ?? res.success)) {
    throw new Error("Best sellers fetch unsuccessful");
  }
  const list = Array.isArray(res?.data) ? res.data : res?.data?.data;
  return (list || []).map(toCardProduct);
};

// Specifications arrive as a list of { name | title | key | label, value | description | text } rows
// (or a { name: value } map); anything without both a name and a value is dropped.
const toSpecifications = (specs) => {
  const rows = Array.isArray(specs)
    ? specs.map((s) => ({
        name: s?.name ?? s?.title ?? s?.key ?? s?.label ?? "",
        value: s?.value ?? s?.description ?? s?.text ?? "",
      }))
    : Object.entries(specs || {}).map(([name, value]) => ({ name, value }));
  return rows.filter((r) => r.name && r.value && typeof r.value !== "object");
};

const toGalleryUrl = (g) => (typeof g === "string" ? g : g?.image || g?.url || g?.path || "");

// product-details `data` -> shape used by the product details page
const toProductDetails = (p) => ({
  ...toCardProduct(p),
  images: [...new Set([p.image, ...(p.gallery || []).map(toGalleryUrl)].filter(Boolean))],
  shortDescription: p.short_description || "",
  description: p.description || "",
  sku: p.sku || "",
  stockQty: p.stock_qty ?? null,
  inStock: p.in_stock ?? (p.stock_qty ?? 1) > 0,
  brand: p.brand ? { name: p.brand.name, slug: p.brand.slug, logo: p.brand.logo || "" } : null,
  freeShipping: Boolean(p.is_free_shipping),
  views: Number(p.view_count) || 0,
  video: typeof p.video === "string" ? p.video : p.video?.url || "",
  flashSale: p.flash_sale || null,
  // Category > sub category > child category (whichever exist), used for the breadcrumb
  categories: [p.category, p.sub_category, p.child_category].filter(Boolean),
  specifications: toSpecifications(p.specifications),
  seo: { title: p.seo?.title || "", description: p.seo?.description || "" },
  relatedProducts: (p.related_products || []).map(toCardProduct),
});

// GET product-details/{slug} -> { status, data: { id, name, slug, type, image, price, offer_price,
//   min_price, max_price, min_offer_price, max_offer_price, short_description, description (HTML),
//   sku, in_stock, stock_qty, category, sub_category, child_category, brand { id, name, slug, logo },
//   gallery, specifications, seo, url, related_products } }
// Resolves to null when the product does not exist.
export const getProductDetails = async (slug) => {
  const response = await fetch(`${BASE_URL}product-details/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }
  const res = await response.json();
  if (!(res.status ?? res.success) || !res.data) return null;
  return toProductDetails(res.data);
};

// Collection endpoints share one shape (serial can be a number or a string):
// { status, data: [ { id, serial, level, category_id, sub_category_id,
//                     child_category_id, name, slug, image (can be null) } ] }
const getCollection = async (endpoint) => {
  const res = await fetchData(endpoint);
  if (!(res.status ?? res.success)) {
    throw new Error(`${endpoint} fetch unsuccessful`);
  }
  const list = Array.isArray(res?.data) ? res.data : res?.data?.data;
  return (list || [])
    .sort((a, b) => Number(a.serial ?? 0) - Number(b.serial ?? 0))
    .map((c) => ({
      id: c.id,
      label: c.name,
      slug: c.slug,
      image: c.image || "",
      to: `/shop/${c.slug}`,
    }));
};

// GET gift-collections-data
export const getGiftCollections = () => getCollection("gift-collections-data");

// GET special-offerings-data
export const getSpecialOfferings = () => getCollection("special-offerings-data");

// GET offer-banner -> { status, data: { offer_banner: "<image url>" } }
export const getOfferBanner = async () => {
  const res = await fetchData("offer-banner");
  if (!(res.status ?? res.success)) {
    throw new Error("Offer banner fetch unsuccessful");
  }
  return res?.data?.offer_banner || "";
};

// GET slider-data -> { status, data: [ { id, serial, status, title, sub_title, btn_text, image } ] }
export const getSliders = async () => {
  const res = await fetchData("slider-data");
  if (!(res.status ?? res.success)) {
    throw new Error("Slider fetch unsuccessful");
  }
  const list = Array.isArray(res?.data) ? res.data : res?.data?.data;
  return (list || [])
    .filter((item) => item.status === undefined || Number(item.status) === 1)
    .sort((a, b) => (a.serial ?? 0) - (b.serial ?? 0));
};

// POST checkout (multipart form-data). Guest order, or logged-in order when a token is saved.
//   name, phone, address, [address_id], shipping_method, payment_method ("cash_on_delivery"),
//   items[i][product_id], items[i][quantity], [items[i][size_id]], [items[i][color_id]]
// 201 -> { status, msg, data: { id, invoice_no, total, thank_you_url,
//          summary: { items: [ { product_id, name, slug, image, quantity, unit_price, regular_price,
//                                discount_per_unit, line_total } ], subtotal, coupon_code, coupon_discount,
//                     shipping_method: { id, name }, shipping_fee, total } } }
// Resolves to `data`. Throws an Error with a customer-readable message on failure.
export const createOrder = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}checkout`, {
    method: "POST",
    headers: { Accept: "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
    body: formData,
  });

  const res = await response.json().catch(() => null);

  // Never show raw server / database errors to customers
  if (response.status >= 500 || !res) {
    throw new Error("Something went wrong on our side. Please try again in a moment.");
  }
  if (!response.ok || res.status === false) {
    const firstValidation = res.errors ? Object.values(res.errors).flat()[0] : null;
    throw new Error(firstValidation || res.msg || res.message || "We couldn't place your order.");
  }
  return res.data;
};
