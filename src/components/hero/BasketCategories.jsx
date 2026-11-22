import { Link } from "react-router";
import { motion } from "motion/react";
import { FiChevronRight } from "react-icons/fi";
import { basketCategories } from "./basketCategoriesData";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function CategoryPanel({ panel, index }) {
  return (
    <motion.li
      variants={reveal}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col border border-gray-200 bg-white"
    >
      <h3 className="bg-brand-dark px-6 py-4 font-serif text-[15px] font-semibold uppercase tracking-[0.08em] text-white sm:text-base">
        {panel.heading}
      </h3>

      <div className="grid flex-1 grid-cols-[1fr_auto] items-start gap-4 px-6 py-5">
        <ul className="space-y-1">
          {panel.links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="group flex items-center gap-2 py-1.5 font-serif text-[15px] text-brand-dark transition-colors hover:text-brand-gold"
              >
                <FiChevronRight
                  size={13}
                  className="shrink-0 text-gray-400 transition-all group-hover:translate-x-0.5 group-hover:text-brand-gold"
                />
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              to={panel.viewMore}
              className="group inline-flex items-center gap-2 font-serif text-[15px] font-semibold text-brand-gold transition-colors hover:text-brand-dark"
            >
              <FiChevronRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
              View More
            </Link>
          </li>
        </ul>

        <Link to={panel.viewMore} className="block w-28 overflow-hidden sm:w-36 xl:w-44">
          <div className="aspect-square">
            <img
              src={panel.image}
              alt={panel.imageAlt}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </Link>
      </div>
    </motion.li>
  );
}

function BasketCategories() {
  return (
    <Section className="bg-[#f6f6f6]">
      <SectionHeader
        eyebrow="Browse by Need"
        title="Explore Basket Categories"
        text="Shop wine and champagne gift baskets for all needs."
      />

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5"
      >
        {basketCategories.map((panel, i) => (
          <CategoryPanel key={panel.id} panel={panel} index={i} />
        ))}
      </motion.ul>
    </Section>
  );
}

export default BasketCategories;
