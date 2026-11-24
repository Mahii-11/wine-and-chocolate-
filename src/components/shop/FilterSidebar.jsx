import { useState } from "react";
import { FiChevronUp, FiXCircle } from "react-icons/fi";
import PriceRange from "./PriceRange";

const labelClass = "font-serif text-[14px] font-bold uppercase tracking-[0.12em] text-[#222]";

function Collapsible({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between border-b border-gray-200 py-4 pl-3 pr-4"
      >
        <span className={labelClass}>{title}</span>
        <FiChevronUp
          size={18}
          className={`text-[#d9a641] transition-transform duration-300 ${open ? "" : "rotate-180"}`}
        />
      </button>
      {open && children}
    </div>
  );
}

function BrandThumb({ brand }) {
  return (
    <span className="flex h-[44px] w-[66px] shrink-0 items-center justify-center border border-gray-200 bg-white p-1">
      {brand.logo ? (
        <img src={brand.logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
      ) : (
        <span className="text-center font-serif text-[9px] leading-[11px] text-[#444]">{brand.name}</span>
      )}
    </span>
  );
}

function CategoryButton({ active, depth, count, onClick, expandable, open, onToggle, children }) {
  return (
    <div
      style={{ paddingLeft: 12 + depth * 16 }}
      className="flex w-full items-center border-b border-gray-200 pr-2"
    >
      <button
        type="button"
        onClick={onClick}
        className={`flex flex-1 items-center justify-start gap-2 py-[9px] text-left font-serif text-[15px] leading-5 transition hover:text-brand-gold ${
          active ? "font-bold text-black" : "text-[#333]"
        }`}
      >
        <span>
          {children}
          {count != null && <span className="ml-2 text-[13px] font-normal text-[#888]">({count})</span>}
        </span>
      </button>
      {expandable ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={open ? "Collapse" : "Expand"}
          className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center"
        >
          <FiChevronUp
            size={18}
            className={`text-[#d9a641] transition-transform duration-300 ${open ? "" : "rotate-180"}`}
          />
        </button>
      ) : (
        <span className="ml-2 w-6 shrink-0" />
      )}
    </div>
  );
}

// Category > sub category > child category; a level expands once its parent is selected
function CategoryTree({ categories, selected, onSelect }) {
  const { category, subCategory, childCategory } = selected;
  // Manual arrow toggles win over the default (open while selected)
  const [manual, setManual] = useState({});
  // Any change of selection (sidebar, menu or back button) re-opens the selected path
  const selKey = `${category}|${subCategory}|${childCategory}`;
  const [prevSelKey, setPrevSelKey] = useState(selKey);
  if (prevSelKey !== selKey) {
    setPrevSelKey(selKey);
    setManual({});
  }
  const isOpen = (key, selectedNow) => manual[key] ?? selectedNow;
  const toggle = (key, selectedNow) => setManual((m) => ({ ...m, [key]: !isOpen(key, selectedNow) }));
  const pick = (...args) => {
    setManual({});
    onSelect(...args);
  };
  return (
    <div className="shop-scroll max-h-[390px] overflow-y-auto">
      {categories.map((cat) => {
        const catKey = `c:${cat.slug}`;
        const catOpen = isOpen(catKey, category === cat.slug);
        return (
          <div key={cat.id}>
            <CategoryButton
              depth={0}
              count={cat.products_count}
              active={category === cat.slug && !subCategory}
              expandable={(cat.sub_categories || []).length > 0}
              open={catOpen}
              onToggle={() => toggle(catKey, category === cat.slug)}
              onClick={() => pick(cat.slug)}
            >
              {cat.name}
            </CategoryButton>
            {catOpen &&
              (cat.sub_categories || []).map((sub) => {
                const subKey = `s:${sub.slug}`;
                const subOpen = isOpen(subKey, subCategory === sub.slug);
                return (
                  <div key={sub.id}>
                    <CategoryButton
                      depth={1}
                      count={sub.products_count}
                      active={subCategory === sub.slug && !childCategory}
                      expandable={(sub.child_categories || []).length > 0}
                      open={subOpen}
                      onToggle={() => toggle(subKey, subCategory === sub.slug)}
                      onClick={() => pick(cat.slug, sub.slug)}
                    >
                      {sub.name}
                    </CategoryButton>
                    {subOpen &&
                      (sub.child_categories || []).map((child) => (
                        <CategoryButton
                          key={child.id}
                          depth={2}
                          count={child.products_count}
                          active={childCategory === child.slug}
                          onClick={() => pick(cat.slug, sub.slug, child.slug)}
                        >
                          {child.name}
                        </CategoryButton>
                      ))}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

function FilterSidebar({
  brands,
  priceBounds,
  priceRange,
  onPriceChange,
  selectedBrands,
  onToggleBrand,
  onClear,
  categories = [],
  selectedCategory = {},
  onSelectCategory,
}) {
  return (
    <aside className="w-full lg:w-[255px] lg:shrink-0">
      <div className="flex items-center justify-between border-b border-gray-200 pl-3 pr-2">
        <span className={`${labelClass} inline-block border-b-2 border-[#d9a641] pb-2 pt-[10px]`}>Filter</span>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 font-serif text-[15px] text-[#555] transition hover:text-black"
        >
          <FiXCircle size={16} />
          Clear
        </button>
      </div>

      {categories.length > 0 && (
        <div className="mt-5">
          <Collapsible title="Categories">
            <CategoryTree categories={categories} selected={selectedCategory} onSelect={onSelectCategory} />
          </Collapsible>
        </div>
      )}

      {priceBounds && priceBounds[1] > priceBounds[0] && (
        <div className="mt-7">
          <Collapsible title="Price">
            <div className="px-2 pb-6 pt-9">
              <PriceRange bounds={priceBounds} value={priceRange} onChange={onPriceChange} />
            </div>
          </Collapsible>
        </div>
      )}

      <div className="mt-7">
        <Collapsible title="Brands">
          <ul className="shop-scroll max-h-[390px] overflow-y-auto">
            {brands.map((brand) => {
              const checked = selectedBrands.includes(brand.id);
              return (
                <li key={brand.id} className="border-b border-gray-200">
                  <label className="flex cursor-pointer items-center gap-4 py-[10px] pl-3 pr-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleBrand(brand.id)}
                      className="h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[3px] border border-gray-400 bg-white checked:border-black checked:bg-black checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><path fill=%22none%22 stroke=%22white%22 stroke-width=%222.2%22 d=%22M3.5 8.5l3 3 6-6%22/></svg>')] checked:bg-center checked:bg-no-repeat"
                    />
                    <BrandThumb brand={brand} />
                    <span className="font-serif text-[15px] leading-5 text-[#333]">{brand.name}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </Collapsible>
      </div>
    </aside>
  );
}

export default FilterSidebar;
