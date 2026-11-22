import { NavLink } from "react-router";
import { categories } from "./navData";

function CategoryBar() {
  return (
    <div className="no-scrollbar overflow-x-auto bg-[#efefef]">
      <ul className="mx-auto flex h-12 w-max min-w-full items-center justify-center px-4 font-serif text-[11px] font-bold uppercase tracking-[0.06em] lg:h-12 lg:text-[12px] 2xl:text-[13px] min-[1800px]:text-[14px]">
        {categories.map(({ to, label }, i) => (
          <li key={to} className="flex shrink-0 items-center">
            {i > 0 && <span className="mx-3 text-gray-400 lg:mx-4 min-[1800px]:mx-5">|</span>}
            <NavLink
              to={to}
              className={({ isActive }) =>
                `whitespace-nowrap transition hover:text-brand-red ${
                  isActive ? "text-brand-red" : "text-brand-dark"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryBar;
