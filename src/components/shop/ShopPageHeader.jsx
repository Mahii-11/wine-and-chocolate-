import { Link } from "react-router";
import { FiHome } from "react-icons/fi";

/** Grey title band with the page title, short gold rule and breadcrumb. */
function ShopPageHeader({ title, breadcrumb = [] }) {
  return (
    <div className="bg-[#f1f1f1]">
      <div className="mx-auto max-w-[1730px] px-4 pb-[26px] pt-[30px] text-center">
        <h1 className="font-serif text-[22px] font-bold leading-tight text-[#222] sm:text-[26px]">
          {title}
        </h1>
        <span className="mx-auto mt-2 block h-[2px] w-[95px] bg-[#d9a641]" />

        <nav aria-label="Breadcrumb" className="mt-5">
          <ol className="flex flex-wrap items-center justify-center gap-x-3 font-serif text-[14px] text-[#555] sm:text-[15px]">
            <li>
              <Link to="/" aria-label="Home" className="flex items-center transition hover:text-black">
                <FiHome size={18} />
              </Link>
            </li>
            {breadcrumb.map((item, i) => {
              const last = i === breadcrumb.length - 1;
              return (
                <li key={item.label} className="flex items-center gap-x-3">
                  <span className="text-gray-400">/</span>
                  {last || !item.to ? (
                    <span className={last ? "text-[#222]" : ""}>{item.label}</span>
                  ) : (
                    <Link to={item.to} className="transition hover:text-black">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default ShopPageHeader;
