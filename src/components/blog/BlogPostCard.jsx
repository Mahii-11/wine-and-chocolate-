import { Link } from "react-router";
import { FiArrowRight, FiEye, FiMessageCircle, FiUser } from "react-icons/fi";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function BlogPostCard({ post }) {
  const date = new Date(post.date);
  const to = `/blog/${post.slug}`;

  return (
    <article className="grid gap-5 sm:grid-cols-[minmax(0,390px)_1fr] sm:gap-7">
      <Link to={to} className="relative block aspect-[3/2] w-full overflow-hidden bg-[#f4f4f4]">
        <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute left-0 top-0 flex h-[56px] w-[56px] flex-col items-center justify-center bg-[#d4a24c] text-white">
          <span className="font-serif text-[22px] font-bold leading-none">{date.getDate()}</span>
          <span className="mt-0.5 font-sans text-[10px] font-bold uppercase leading-none tracking-wide">
            {MONTHS[date.getMonth()]}
          </span>
        </span>
      </Link>

      <div className="min-w-0">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 font-serif text-[11px] text-[#6b6b6b]">
          <li className="flex items-center gap-1.5">
            <FiUser size={11} />
            {post.author}
          </li>
          <li className="flex items-center gap-1.5">
            <FiMessageCircle size={11} />
            {post.comments}
          </li>
          <li className="flex items-center gap-1.5">
            <FiEye size={11} />
            {post.views}
          </li>
        </ul>

        <h2 className="mt-4 font-serif text-[19px] font-bold leading-[1.35] text-[#141a2e] sm:text-[22px]">
          <Link to={to} className="transition hover:text-brand-gold">
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 line-clamp-3 font-serif text-[14px] leading-[23px] text-[#555]">{post.excerpt}</p>

        <Link
          to={to}
          className="mt-5 inline-flex h-[44px] items-center gap-3 bg-[#f1f1f1] px-4 font-serif text-[12px] font-bold uppercase tracking-[0.02em] text-[#222] transition hover:bg-black hover:text-white"
        >
          Read the full blog
          <FiArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export default BlogPostCard;
