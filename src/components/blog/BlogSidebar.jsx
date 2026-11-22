import { FiChevronRight, FiSearch } from "react-icons/fi";
import { blogCategories } from "./blogData";

function BlogSidebar({ search, onSearch, activeCategory, onCategory }) {
  return (
    <aside className="w-full lg:w-[370px] lg:shrink-0">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex h-[48px] items-center border border-[#e6e6e6] bg-[#f5f5f5]"
      >
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Blog Search"
          aria-label="Blog search"
          className="h-full min-w-0 flex-1 bg-transparent px-4 font-serif text-[14px] text-[#222] placeholder:text-[#8a8a8a] focus:outline-none"
        />
        <button type="submit" aria-label="Search" className="flex h-full w-12 items-center justify-center text-[#555] transition hover:text-black">
          <FiSearch size={18} strokeWidth={2.4} />
        </button>
      </form>

      <h3 className="mt-10 inline-block border-b-2 border-[#d9a641] pb-1.5 font-serif text-[14px] font-bold uppercase tracking-[0.02em] text-[#222]">
        Blog Categories
      </h3>

      <ul className="mt-4">
        {blogCategories.map((cat) => {
          const active = cat.id === activeCategory;
          return (
            <li key={cat.id} className="border-b border-[#ececec]">
              <button
                type="button"
                onClick={() => onCategory(cat.id)}
                className={`flex w-full items-center gap-3 py-[18px] text-left font-serif text-[14px] transition hover:text-brand-gold ${
                  active ? "font-bold text-[#d4a24c]" : "text-[#333]"
                }`}
              >
                <FiChevronRight size={13} className="shrink-0 text-[#d4a24c]" />
                {cat.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default BlogSidebar;
