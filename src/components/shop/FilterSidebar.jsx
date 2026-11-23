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

function FilterSidebar({ brands, priceBounds, priceRange, onPriceChange, selectedBrands, onToggleBrand, onClear }) {
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

      {priceBounds && priceBounds[1] > priceBounds[0] && (
        <div className="mt-5">
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
