import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { FiArrowRight, FiImage } from "react-icons/fi";
import { getGiftCollections } from "../../services/api";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const GRID = "mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:mt-10 lg:grid-cols-5 lg:gap-x-5";

function CategoryCard({ item, index }) {
  return (
    <motion.li
      variants={reveal}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={item.to} className="group block">
        <div className="relative aspect-square overflow-hidden bg-[#f4f4f4]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              <FiImage size={40} />
            </div>
          )}
          <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-brand-gold/60" />
        </div>

        <div className="relative z-10 mx-3 -mt-7 flex min-h-[76px] flex-col justify-center border border-gray-100 bg-white px-3 py-3 text-center transition-transform duration-300 group-hover:-translate-y-1 sm:mx-4">
          <h3 className="font-serif text-[13px] font-bold uppercase tracking-[0.14em] text-brand-dark sm:text-sm">
            {item.label}
          </h3>
          <span className="mt-1 flex items-center justify-center gap-1 font-serif text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
            Shop now
            <FiArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

function GiftCategories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getGiftCollections()
      .then((list) => active && setItems(list))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  // Fetch finished but nothing to show (error or empty list): hide the whole section
  if (!loading && items.length === 0) return null;

  return (
    <Section className="bg-white">
      <SectionHeader
        onLoad
        eyebrow="Curated Collections"
        title="Send Wine & Champagne Gifts Online"
        text="We're the go-to online shop for top-notch wines, champagnes and scrumptious gift baskets. Trust us, we've got the flavor, the sparkle, and quality products. Shop now and make every celebration count!"
      />

      {loading ? (
        <div className={GRID}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i}>
              <div className="aspect-square animate-pulse bg-[#e9e9e9]" />
              <div className="mx-3 -mt-7 h-[76px] animate-pulse border border-gray-100 bg-white sm:mx-4" />
            </div>
          ))}
        </div>
      ) : (
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className={GRID}
        >
          {items.map((item, i) => (
            <CategoryCard key={item.id} item={item} index={i} />
          ))}
        </motion.ul>
      )}
    </Section>
  );
}

export default GiftCategories;
