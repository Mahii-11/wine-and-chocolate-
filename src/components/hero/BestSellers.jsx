import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Marquee from "../ui/Marquee";
import { getBestSellers } from "../../services/api";

function CardSkeleton() {
  return (
    <div className="w-[220px] shrink-0 sm:w-[250px] xl:w-[270px]">
      <div className="aspect-square animate-pulse bg-[#e9e9e9]" />
      <div className="mx-auto mt-4 h-4 w-3/4 animate-pulse bg-[#e9e9e9]" />
      <div className="mx-auto mt-3 h-4 w-1/3 animate-pulse bg-[#e9e9e9]" />
    </div>
  );
}

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getBestSellers()
      .then((list) => active && setProducts(list))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  // Fetch finished but nothing to show (error or empty list): hide the whole section
  if (!loading && products.length === 0) return null;

  return (
    <Section className="bg-[#f6f6f6]">
      <SectionHeader
        eyebrow="Customer Favorites"
        title="Best-Selling Gift Baskets"
        text="Explore our best-selling gift baskets and turn every occasion into an unforgettable moment."
      />

      {loading ? (
        <div className="mt-8 flex gap-4 overflow-hidden lg:mt-10 lg:gap-5">
          {Array.from({ length: 6 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <Marquee
          items={products}
          secondsPerItem={4}
          pauseOnHover
          fade="from-[#f6f6f6]"
          className="mt-8 lg:mt-10"
          render={(product) => <ProductCard product={product} />}
        />
      )}
    </Section>
  );
}

export default BestSellers;
