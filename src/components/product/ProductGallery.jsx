import { useState } from "react";
import { Link } from "react-router";
import { FiDownload, FiHelpCircle, FiImage, FiMail, FiShield } from "react-icons/fi";
import { infoTabs } from "./productDetailsData";

const icons = { "greeting-card": FiMail, "secure-delivery": FiShield, "bulk-form": FiDownload, faqs: FiHelpCircle };

function ProductGallery({ product, onInfo }) {
  const [selected, setSelected] = useState(0);
  const images = product.images;
  const current = images[selected] ?? images[0];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border border-[#e6e6e6] bg-white p-3 lg:flex lg:min-h-0 lg:flex-1">
        <div className="relative aspect-square w-full overflow-hidden bg-white lg:aspect-auto lg:flex-1">
          {current ? (
            <img src={current} alt={product.name} className="absolute inset-0 h-full w-full object-contain" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f4] text-gray-300">
              <FiImage size={56} />
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails only when the product has more than one image */}
      {images.length > 1 && (
        <ul className="mt-3 flex shrink-0 gap-2 overflow-x-auto no-scrollbar">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === selected}
                className={`block h-18 w-18 border bg-white p-1 transition ${
                  i === selected ? "border-[#d9a641]" : "border-[#e6e6e6] hover:border-[#e0d3b0]"
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-4 grid shrink-0 grid-cols-2 border border-[#e6e6e6] sm:grid-cols-4">
        {infoTabs.map((tab, i) => {
          const Icon = icons[tab.id];
          const cls = `flex h-[48px] w-full items-center justify-center gap-2 font-serif text-[12px] font-semibold text-[#222] transition hover:bg-[#faf6ec] ${
            i > 0 ? "border-l border-[#e6e6e6]" : ""
          } ${i >= 2 ? "border-t border-[#e6e6e6] sm:border-t-0" : ""} ${i === 2 ? "border-l-0 sm:border-l" : ""}`;
          return (
            <li key={tab.id}>
              {tab.to ? (
                <Link to={tab.to} className={cls}>
                  <Icon size={14} className="text-[#c9961f]" />
                  {tab.label}
                </Link>
              ) : (
                <button type="button" onClick={() => onInfo?.(tab.id)} className={cls}>
                  <Icon size={14} className="text-[#c9961f]" />
                  {tab.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductGallery;
