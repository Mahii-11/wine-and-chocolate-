import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import ProductGallery from "../components/product/ProductGallery.jsx";
import ProductOptions from "../components/product/ProductOptions.jsx";
import ProductTabs from "../components/product/ProductTabs.jsx";
import RelatedProducts from "../components/product/RelatedProducts.jsx";
import { getProductDetails } from "../services/api";
import useDocumentMeta from "../utils/useDocumentMeta";

const infoCopy = {
  "greeting-card":
    "Every basket ships with a complimentary standard greeting card. Add your message above and we will hand write it for you.",
  "secure-delivery":
    "Baskets are packed in protective wrap, shipped in a sturdy outer box and require an adult signature (21+) on delivery.",
};

function Notice({ title, text }) {
  return (
    <>
      <ShopPageHeader title={title} breadcrumb={[{ label: "Shop", to: "/shop" }, { label: title }]} />
      <div className="mx-auto max-w-[640px] px-4 py-20 text-center font-serif">
        <p className="text-[16px] text-[#555]">{text}</p>
        <Link to="/shop" className="mt-8 inline-flex h-11 items-center rounded-full bg-black px-8 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-brand-gold">
          Back to Shop
        </Link>
      </div>
    </>
  );
}

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-[1660px] px-4 pb-16 pt-8 lg:pt-10">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16 xl:gap-24">
        <div className="aspect-square animate-pulse bg-[#ececec]" />
        <div className="space-y-4">
          <div className="h-8 w-1/3 animate-pulse bg-[#ececec]" />
          <div className="h-48 animate-pulse bg-[#ececec]" />
          <div className="h-11 animate-pulse bg-[#ececec]" />
        </div>
      </div>
    </div>
  );
}

function ProductDetailsContent({ slug }) {
  const [state, setState] = useState({ status: "loading", product: null });
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let active = true;
    getProductDetails(slug)
      .then((product) => active && setState(product ? { status: "ready", product } : { status: "missing", product: null }))
      .catch(() => active && setState({ status: "error", product: null }));
    return () => {
      active = false;
    };
  }, [slug]);

  useDocumentMeta(state.product?.seo.title || state.product?.name, state.product?.seo.description);

  if (state.status === "loading") return <DetailsSkeleton />;

  if (state.status === "missing") {
    return (
      <Notice
        title="Product Not Found"
        text="We couldn't find that gift basket. It may have been moved or is no longer available."
      />
    );
  }

  if (state.status === "error") {
    return (
      <Notice
        title="Something Went Wrong"
        text="We couldn't load this product right now. Please check your connection and try again."
      />
    );
  }

  const { product } = state;
  const breadcrumb = [
    ...product.categories.map((c) => ({ label: c.name, to: `/shop/${c.slug}` })),
    { label: product.name },
  ];

  return (
    <>
      <ShopPageHeader title={product.name} breadcrumb={breadcrumb} />

      <div className="mx-auto max-w-[1660px] px-4 pb-16 pt-6 lg:pt-8">
        {/* Desktop: one shared height (about one screen), so both columns start and end on the same lines */}
        <div className="grid items-stretch gap-8 lg:h-[clamp(480px,calc(100vh_-_150px),680px)] lg:grid-cols-[1fr_1.25fr] lg:gap-14 xl:gap-20">
          <div className="flex min-h-0 flex-col">
            <ProductGallery product={product} onInfo={(id) => setInfo((cur) => (cur === id ? null : id))} />
            {info && (
              <p className="mt-3 border border-[#e6c877] bg-[#fdf8ec] px-4 py-3 font-serif text-[12px] leading-5 text-[#333]">
                {infoCopy[info]}
              </p>
            )}
          </div>
          <ProductOptions product={product} />
        </div>

        <ProductTabs product={product} />
        <RelatedProducts product={product} />
      </div>
    </>
  );
}

function ProductDetails() {
  const { slug } = useParams();
  // `key` resets all state when navigating from one product to another
  return <ProductDetailsContent key={slug} slug={slug} />;
}

export default ProductDetails;
