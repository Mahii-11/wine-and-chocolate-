import ShopPageHeader from "../shop/ShopPageHeader.jsx";

export const SITE_URL = "https://www.wineandchampagnegifts.com";

/**
 * Shared shell for the plain-text policy pages (return, privacy, terms).
 * `wide` uses the full-width container with smaller body text, matching the
 * reference privacy and terms pages; the default is the narrower return-policy layout.
 */
export function PolicyPage({ title, crumb, wide = false, children }) {
  return (
    <>
      <ShopPageHeader title={title} breadcrumb={[{ label: crumb ?? title }]} />
      <section
        className={
          wide
            ? "policy policy-wide mx-auto max-w-[1810px] px-4 pb-14 pt-9 sm:px-6 xl:px-10"
            : "policy mx-auto max-w-[1430px] px-4 pb-16 pt-12 sm:px-6"
        }
      >
        {children}
      </section>
    </>
  );
}

export function H({ children }) {
  return <h2 className="mb-2 mt-7 font-serif text-[14px] font-bold leading-snug text-[#111] first:mt-0">{children}</h2>;
}

export function P({ bold = false, children }) {
  return (
    <p
      className={`mb-4 font-serif text-[16px] leading-[1.8] text-[#222] [.policy-wide_&]:text-[14px] [.policy-wide_&]:leading-[1.75] ${bold ? "font-bold" : ""}`}
    >
      {children}
    </p>
  );
}

export function UL({ items }) {
  return (
    <ul className="mb-4 list-disc space-y-1 pl-5 font-serif text-[14px] leading-[1.75] text-[#222] marker:text-[#222]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function SiteLink() {
  return (
    <a href={SITE_URL} className="text-[#1a73c7] transition hover:text-brand-gold hover:underline">
      www.wineandchampagnegifts.com
    </a>
  );
}
