import { useState } from "react";
import { shippingInfo } from "./productDetailsData";


// YouTube / Vimeo links become an embedded player, anything else is treated as a video file
const embedUrl = (url) => {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  return vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : null;
};

function ProductVideo({ url, name }) {
  const embed = embedUrl(url);
  return embed ? (
    <iframe
      src={embed}
      title={`${name} video`}
      allowFullScreen
      loading="lazy"
      className="aspect-video w-full max-w-[720px] border-0"
    />
  ) : (
    <video src={url} controls className="aspect-video w-full max-w-[720px] bg-black" />
  );
}

function ProductTabs({ product }) {
  const [active, setActive] = useState("Description");
  const tabs = [
    "Description",
    ...(product.specifications.length ? ["Specifications"] : []),
    ...(product.video ? ["Video"] : []),
    "Shipping",
    "Reviews",
  ];

  return (
    <section className="mt-14">
      <div className="flex gap-6 border-b border-[#e6e6e6] sm:gap-8">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={`-mb-px border-b-2 pb-2 font-serif text-[16px] font-bold transition ${
              active === t ? "border-[#d9a641] text-[#222]" : "border-transparent text-[#444] hover:text-brand-gold"
            }`}
          >
            {t === "Reviews" ? "Reviews (0)" : t}
          </button>
        ))}
      </div>

      <div className="px-3 pt-6 font-serif text-[13px] leading-[24px] text-[#1b2a4a] sm:text-[14px]">
        {active === "Description" &&
          (product.description || product.shortDescription ? (
            // HTML written in the admin panel (trusted source), rendered as-is
            <div dangerouslySetInnerHTML={{ __html: product.description || product.shortDescription }} />
          ) : (
            <p>No description available for this product.</p>
          ))}

        {active === "Specifications" && (
          <table className="w-full max-w-[720px] border-collapse">
            <tbody>
              {product.specifications.map((s) => (
                <tr key={s.name} className="border-b border-[#e6e6e6]">
                  <th className="w-[40%] bg-[#fafafa] px-4 py-2.5 text-left font-bold text-[#222]">{s.name}</th>
                  <td className="px-4 py-2.5">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {active === "Video" && <ProductVideo url={product.video} name={product.name} />}

        {active === "Shipping" && (
          <div className="space-y-4">
            {shippingInfo.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        )}

        {active === "Reviews" && (
          <div>
            <p>There are no reviews for this product yet.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 max-w-[640px] space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input placeholder="Your Name" required className="h-10 border border-[#e6e6e6] bg-[#fafafa] px-3 text-[13px] focus:border-[#d9a641] focus:outline-none" />
                <select defaultValue="5" className="h-10 border border-[#e6e6e6] bg-[#fafafa] px-3 text-[13px] focus:outline-none">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{"★".repeat(n)}{"☆".repeat(5 - n)}</option>
                  ))}
                </select>
              </div>
              <textarea rows={4} placeholder="Your Review" required className="w-full border border-[#e6e6e6] bg-[#fafafa] px-3 py-2 text-[13px] focus:border-[#d9a641] focus:outline-none" />
              <button type="submit" className="h-10 bg-black px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-brand-gold">
                Write a Review
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductTabs;
