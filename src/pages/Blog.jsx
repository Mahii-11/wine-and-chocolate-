import { useMemo, useState } from "react";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import BlogPostCard from "../components/blog/BlogPostCard.jsx";
import BlogSidebar from "../components/blog/BlogSidebar.jsx";
import Pagination from "../components/blog/Pagination.jsx";
import { BLOG_PAGE_SIZE, BLOG_TOTAL_PAGES, blogPosts } from "../components/blog/blogData.js";

function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogPosts.filter(
      (post) =>
        (category === "all" || post.category === category) &&
        (!q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q))
    );
  }, [search, category]);

  const isFiltered = search.trim() !== "" || category !== "all";
  // With static data the full list is one page; the reference pager length is kept for the unfiltered view.
  const totalPages = isFiltered ? Math.ceil(filtered.length / BLOG_PAGE_SIZE) : BLOG_TOTAL_PAGES;
  const visible = filtered.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);

  const changeCategory = (id) => {
    setCategory(id);
    setPage(1);
  };
  const changeSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <>
      <ShopPageHeader title="Blogs" breadcrumb={[{ label: "Blog" }]} />

      <div className="mx-auto max-w-[1430px] px-4 pb-16 pt-9">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-10">
          <div className="min-w-0 flex-1">
            {visible.length > 0 ? (
              <div className="space-y-12">
                {visible.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center font-serif text-[16px] text-[#555]">
                No blog posts match your search.
              </p>
            )}

            <div className="mt-14">
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
          </div>

          <BlogSidebar
            search={search}
            onSearch={changeSearch}
            activeCategory={category}
            onCategory={changeCategory}
          />
        </div>
      </div>
    </>
  );
}

export default Blog;
