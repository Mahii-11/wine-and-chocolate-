import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getBrands } from "../../services/api";

function BrandLogo({ brand }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span className="flex h-full w-full items-center justify-center rounded-md border border-[#f0d7a0] bg-[#f7f1e4] text-center text-[13px] font-semibold tracking-[0.12em] text-black sm:text-[15px]">
        {brand.name}
      </span>
    );
  }

  return (
    <img
      src={brand.image}
      alt={`${brand.name} logo`}
      loading="lazy"
      onError={() => setHasError(true)}
      className="h-full max-h-[68px] w-full max-w-[170px] object-contain transition-transform duration-300 ease-out group-hover:scale-105"
    />
  );
}

export default function BrandsSection() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getBrands()
      .then((list) => active && setBrands(list))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-[1548px]">
        {/* Header Section */}
        <div className="mb-14 text-center sm:mb-[58px]">
          <h2 className="font-serif text-[22px] font-bold uppercase leading-tight tracking-[0.045em] text-black sm:text-[28px]">
            Shop Gift Baskets From 150+ Brands
          </h2>
          <p className="mt-2 font-serif text-[17px] leading-snug text-black sm:text-[20px]">
            Uncork Exceptional Flavours
          </p>
          <p className="mt-1 font-serif text-[14px] leading-snug text-neutral-700 sm:text-[17px]">
            Shop the Finest Champagne and Wine Featured Brands Online, and Elevate The Tasting Experience.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6 lg:grid-cols-7 lg:gap-x-[27px] lg:gap-y-[27px]">
          {loading &&
            Array.from({ length: 14 }, (_, i) => (
              <div
                key={i}
                className="h-[88px] animate-pulse rounded-[5px] border border-[#f0d7a0] bg-[#f7f1e4] sm:h-[103px]"
              />
            ))}
          {!loading && brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brands/${brand.slug}`}
              aria-label={`Shop ${brand.name} gift baskets`}
              className="group flex h-[88px] items-center justify-center rounded-[5px] border border-[#f0d7a0] bg-white px-4 py-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d5b46e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#d5b46e] sm:h-[103px] sm:px-5"
            >
              <BrandLogo key={brand.image} brand={brand} />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center sm:mt-[62px]">
          <Link
            to="/brands"
            className="inline-flex min-h-[46px] min-w-[190px] items-center justify-center rounded-[16px] border border-black bg-white px-8 py-3 font-serif text-[12px] font-bold uppercase tracking-[0.16em] text-black shadow-[0_2px_4px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d5b46e] focus:ring-offset-2"
          >
            View All Brands
          </Link>
        </div>
      </div>
    </section>
  );
}