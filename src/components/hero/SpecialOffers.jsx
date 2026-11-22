import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import { getSpecialOfferings } from "../../services/api";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const GRID = "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5";
const BANNER_SIZE = "aspect-[16/9] sm:aspect-[2/1] lg:aspect-[1.9/1]";

function OfferBanner({ offer, index }) {
  return (
    <motion.li
      variants={reveal}
      className="sm:last:col-span-2 lg:last:col-span-1"
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={offer.to}
        className={`group relative block overflow-hidden bg-[#1a1a1a] ${BANNER_SIZE}`}
      >
        {/* No image yet: the dark background keeps the title and button readable */}
        {offer.image && (
          <img
            src={offer.image}
            alt={offer.label}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-8 lg:px-10">
          <h3 className="max-w-[60%] font-serif text-lg font-bold uppercase leading-tight tracking-wide text-white sm:text-xl xl:text-[24px]">
            {offer.label}
          </h3>
          <span className="mt-4 inline-flex w-max items-center gap-2 bg-white px-6 py-2.5 font-serif text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-dark transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-white sm:px-7 sm:py-3 sm:text-[13px]">
            Shop Now
            <FiArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

function SpecialOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSpecialOfferings()
      .then((list) => active && setOffers(list))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  // Fetch finished but nothing to show (error or empty list): hide the whole section
  if (!loading && offers.length === 0) return null;

  return (
    <Section className="bg-white">
      <SectionHeader
        eyebrow="Ready to Gift"
        title="Special Gift Offerings"
        text="Choose a ready to gift set or personalize your own with names and dates."
      />

      {loading ? (
        <div className={GRID}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={`animate-pulse bg-[#e9e9e9] ${BANNER_SIZE}`} />
          ))}
        </div>
      ) : (
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className={GRID}
        >
          {offers.map((offer, i) => (
            <OfferBanner key={offer.id} offer={offer} index={i} />
          ))}
        </motion.ul>
      )}
    </Section>
  );
}

export default SpecialOffers;
