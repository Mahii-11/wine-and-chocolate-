import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import { getAllBrands } from "../services/api";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** Groups brands by first letter (non-letters go under "#"), sorted A-Z. */
function groupByLetter(brands) {
  const sorted = [...brands].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }),
  );
  const groups = {};
  sorted.forEach((brand) => {
    const first = brand.name.trim().charAt(0).toUpperCase();
    const key = /[A-Z]/.test(first) ? first : "#";
    (groups[key] ||= []).push(brand);
  });
  return groups;
}

function BrandTile({ brand }) {
  const [failed, setFailed] = useState(false);

  return (
    <Link to={`/brands/${brand.slug}`} className="group block">
      <div className="flex aspect-[1.9/1] items-center justify-center border border-[#e3e3e3] bg-[#f5f5f5] p-5 transition-colors duration-300 group-hover:border-[#d9a641]">
        {failed ? (
          <span className="text-center font-serif text-[15px] font-semibold text-[#444]">
            {brand.name}
          </span>
        ) : (
          <img
            src={brand.image}
            alt={`${brand.name} logo`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <p className="mt-3 text-center font-serif text-[14px] text-[#222] transition-colors group-hover:text-[#d9a641]">
        {brand.name}
      </p>
    </Link>
  );
}

function BrandsSkeleton() {
  return (
    <div className="animate-pulse">
      {[0, 1].map((s) => (
        <div key={s} className="mb-12">
          <div className="h-8 w-8 rounded bg-black/10" />
          <div className="mt-2 mb-6 h-[2px] w-11 bg-black/10" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i}>
                <div className="aspect-[1.9/1] bg-black/10" />
                <div className="mx-auto mt-3 h-4 w-2/3 rounded bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    getAllBrands()
      .then((list) => active && setBrands(list))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const groups = useMemo(() => groupByLetter(brands), [brands]);
  const letters = [...ALPHABET, "#"].filter((l) => groups[l]);

  return (
    <>
      <ShopPageHeader title="Brands" breadcrumb={[{ label: "Brands" }]} />

      <section className="mx-auto max-w-[1730px] px-4 py-8 sm:px-6 lg:px-[90px]">
        <nav
          aria-label="Brand index"
          className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-serif text-[15px]"
        >
          <span className="font-bold text-[#222]">Brand Index:</span>
          {ALPHABET.map((letter) =>
            groups[letter] ? (
              <a
                key={letter}
                href={`#brands-${letter}`}
                className="text-[#1a6bb5] transition hover:text-[#d9a641]"
              >
                {letter}
              </a>
            ) : (
              <span key={letter} className="text-[#bbb]">
                {letter}
              </span>
            ),
          )}
        </nav>

        {loading && <BrandsSkeleton />}

        {!loading && (error || letters.length === 0) && (
          <p className="py-16 text-center font-serif text-[16px] text-[#555]">
            {error ? "Could not load brands. Please try again later." : "No brands found."}
          </p>
        )}

        {!loading &&
          letters.map((letter) => (
            <div key={letter} id={`brands-${letter}`} className="mb-12 scroll-mt-40">
              <h2 className="relative pb-3 font-serif text-[30px] leading-none text-[#111] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-11 after:bg-[#d9a641]">
                {letter}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                {groups[letter].map((brand) => (
                  <BrandTile key={brand.id} brand={brand} />
                ))}
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

export default Brands;
