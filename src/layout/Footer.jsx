import { Link } from "react-router";
import { FiMessageCircle } from "react-icons/fi";
import useSiteSettings from "./useSiteSettings";

const companyLinks = [
  { label: "About Us", to: "/about-us" },
  { label: "Contact Us", to: "/contact-us" },
  { label: "Blog", to: "/blog" },
  { label: "Unboxing Videos", to: "/unboxing-videos" },
  { label: "Site Map", to: "/sitemap" },
  { label: "FAQ's", to: "/faqs" },
];

const serviceLinks = [
  { label: "Login", to: "/sign-in" },
  { label: "Track Order", to: "/track-order" },
  { label: "Coupon & Deals", to: "/deals" },
  { label: "Shipping & Delivery Policy", to: "/shipping-delivery-policy" },
  { label: "Return Policy", to: "/return-policy" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-conditions" },
];

const corporateLinks = [
  { label: "Corporate / Bulk Order Inquiry", to: "/bulk-orders" },
  { label: "Corporate Gift Baskets", to: "/corporate-gifts" },
  { label: "Download Bulk Order Form", to: "/bulk-order-form" },
  { label: "Brands", to: "/brands" },
];

const shopLinks = [
  { label: "Wine Gift Baskets", to: "/shop/wine-gift-baskets" },
  { label: "Champagne Gift Baskets", to: "/shop/champagne-gift-baskets" },
  { label: "Prosecco Gift Baskets", to: "/shop/prosecco-gift-baskets" },
  { label: "Holiday Gift Baskets", to: "/shop/holiday-gift-baskets" },
  { label: "Christmas Gift Baskets", to: "/shop/christmas-gift-baskets" },
  { label: "Birthday Gift Baskets", to: "/shop/birthday-gift-baskets" },
];

function Footer() {
  const { settings, loading } = useSiteSettings();

  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white">
      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-0 sm:px-6 lg:px-8">
        <div className="border-t-[1.5px] border-[#d4af5c] px-0 pt-8 sm:pt-10">
          <div className="mb-10 text-center">
            <h3 className="font-serif text-[17px] font-bold uppercase tracking-[0.03em] text-white sm:text-[20px] lg:text-[22px]">
              LET&apos;S STAY IN TOUCH
            </h3>
            <p className="mt-2 font-serif text-[13px] italic text-white/90 sm:text-[15px]">
              We&apos;ll shout you $10 off your first order.
            </p>

            <div className="mx-auto mt-8 flex max-w-[720px] items-stretch overflow-hidden rounded-[2px] border border-[#d4af5c] bg-white text-left">
              <div className="flex flex-1 items-center gap-3 px-4 py-4 text-black">
                <span className="text-lg text-black/70">✉</span>
                <input
                  aria-label="Email address"
                  type="email"
                  placeholder="YOUR E-MAIL ADDRESS"
                  className="w-full border-0 bg-transparent font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-black placeholder:text-black/55 focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 border-l border-[#d4af5c] bg-white px-6 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-black transition hover:bg-[#f3e6c2]"
              >
                <span className="text-base">✉</span>
                SUBSCRIBE
              </button>
            </div>
          </div>

          <div className="grid gap-8 border-t border-[#d4af5c]/80 pt-8 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr] lg:gap-10">
            <div className="flex flex-col items-start justify-start">
              {loading ? (
                <div className="mb-6 h-[220px] w-full max-w-[220px] animate-pulse rounded bg-white/10" />
              ) : (
                <img
                  src={settings.logo || "/images/wine-chocolate-gift-logo.jpeg"}
                  alt="Wine and Chocolate Gift"
                  className="mb-6 w-full max-w-[220px] object-contain"
                />
              )}

              {loading ? (
                <div className="h-5 w-[240px] animate-pulse rounded bg-white/10" />
              ) : (
                <p className="max-w-[260px] font-serif text-[13px] italic leading-relaxed text-white/90 sm:text-[14px]">
                  {settings.site_description}
                </p>
              )}

              <div className="mt-8 h-px w-[95%] bg-[#d4af5c]/80" />

              {loading ? (
                <div className="mt-6 h-7 w-[260px] animate-pulse rounded bg-white/10" />
              ) : (
                settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="mt-6 inline-flex items-center gap-3 font-serif text-[12px] font-semibold italic text-[#d4af5c] transition hover:text-[#f0d79b] sm:text-[13px]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d4af5c] text-sm text-[#d4af5c]">
                      ✉
                    </span>
                    {settings.email}
                  </a>
                )
              )}

              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-11 w-[110px] items-center justify-center rounded bg-white px-2 py-1.5 shadow-sm">
                  <span className="text-[10px] font-bold text-[#0a0a0a]">
                    <span className="text-[#00A1FF]">★</span> Trustpilot
                  </span>
                </div>
                <div className="flex h-11 w-[110px] items-center justify-center rounded bg-white px-2 py-1.5 shadow-sm">
                  <span className="text-[10px] font-bold text-[#0a0a0a]">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="relative pb-3 font-serif text-[16px] font-bold uppercase tracking-[0.02em] text-[#f1d99f] after:absolute after:bottom-0 after:left-0 after:h-px after:w-[110px] after:bg-[#d4af5c]">
                About
              </h4>
              <ul className="mt-5 space-y-2.5">
                {companyLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="group flex items-center gap-2.5 font-serif text-[13px] text-white/90 transition hover:text-[#f1d99f]">
                      <span className="text-[#d4af5c] transition group-hover:text-[#f1d99f]">›</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="relative pb-3 font-serif text-[16px] font-bold uppercase tracking-[0.02em] text-[#f1d99f] after:absolute after:bottom-0 after:left-0 after:h-px after:w-[110px] after:bg-[#d4af5c]">
                Customer Service
              </h4>
              <ul className="mt-5 space-y-2.5">
                {serviceLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="group flex items-center gap-2.5 font-serif text-[13px] text-white/90 transition hover:text-[#f1d99f]">
                      <span className="text-[#d4af5c] transition group-hover:text-[#f1d99f]">›</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="relative pb-3 font-serif text-[16px] font-bold uppercase tracking-[0.02em] text-[#f1d99f] after:absolute after:bottom-0 after:left-0 after:h-px after:w-[110px] after:bg-[#d4af5c]">
                Corporate Orders
              </h4>
              <ul className="mt-5 space-y-2.5">
                {corporateLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="group flex items-center gap-2.5 font-serif text-[13px] text-white/90 transition hover:text-[#f1d99f]">
                      <span className="text-[#d4af5c] transition group-hover:text-[#f1d99f]">›</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="relative pb-3 font-serif text-[16px] font-bold uppercase tracking-[0.02em] text-[#f1d99f] after:absolute after:bottom-0 after:left-0 after:h-px after:w-[110px] after:bg-[#d4af5c]">
                Shop With Us
              </h4>
              <ul className="mt-5 space-y-2.5">
                {shopLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="group flex items-center gap-2.5 font-serif text-[13px] text-white/90 transition hover:text-[#f1d99f]">
                      <span className="text-[#d4af5c] transition group-hover:text-[#f1d99f]">›</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-[#d4af5c]/80 pt-6">
            <div className="flex items-center justify-between gap-4 border-b border-[#d4af5c]/80 pb-5">
              <h5 className="font-serif text-[14px] font-bold uppercase tracking-[0.02em] text-[#f1d99f] sm:text-[15px]">
                Delivery To All Major States &amp; Cities
              </h5>
              <span className="text-xl text-[#d4af5c]">⌄</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-8 pb-5">
              {[
                { name: "VISA", bg: "#fff", text: "#1a1f71" },
                { name: "Mastercard", bg: "#fff", text: "#eb001b" },
                { name: "Amex", bg: "#fff", text: "#2e77bb" },
                { name: "Discover", bg: "#fff", text: "#ff6000" },
              ].map((card) => (
                <div
                  key={card.name}
                  className="flex h-11 w-[130px] items-center justify-center rounded border border-[#d4af5c]/60 bg-white text-[15px] font-bold shadow-sm"
                  style={{ color: card.text }}
                >
                  {card.name}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#d4af5c]/80 pt-7 text-center">
            <p className="mx-auto max-w-[1300px] font-serif text-[11.5px] leading-5 text-white/80 sm:text-[12.5px]">
              Trademark Notice: Vue Clicquot, Dom Pérignon, Moët &amp; Chandon, Caymus, Godiva and All other third-party brand names,
              product names, logos and trademarks referenced on this website are the property of their respective owners. Such trademarks
              are used to identify the genuine products offered for sale. Wine &amp; Champagne Gifts independently curates and assembles its
              gift baskets and is not sponsored, endorsed, authorized, or affiliated with the respective trademark owners unless expressly
              stated otherwise.
            </p>

            {loading ? (
              <div className="mx-auto mt-6 h-5 w-full max-w-[640px] animate-pulse rounded bg-white/10" />
            ) : (
              <p className="mt-5 font-serif text-[13px] font-bold text-[#f1d99f] sm:text-[14px]">
                {settings.copyright}
              </p>
            )}

            <p className="mt-4 font-serif text-[11.5px] leading-5 text-white/80 sm:text-[12.5px]">
              We sell, deliver &amp; ship wines where allowed by law. You must be 21 years of age or older to purchase or receive an
              alcohol product from us.
            </p>
            <p className="mt-2 font-serif text-[11.5px] leading-5 text-white/80 sm:text-[12.5px]">
              We will verify your ID during the delivery process.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <button
          type="button"
          aria-label="Chat with us"
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d4af5c] bg-[#e9c266] text-black shadow-lg transition hover:scale-105"
        >
          <FiMessageCircle size={22} strokeWidth={2.2} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
