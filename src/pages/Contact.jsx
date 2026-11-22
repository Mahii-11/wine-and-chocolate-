import { useState } from "react";
import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";

const ADDRESS = "45681 Oakbrook CT STE 113 Sterling, VA 20166";
const MAP_EMBED = "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s45681+Oakbrook+CT+STE+113+Sterling,+VA+20166!6i16";

const fieldClass =
  "w-full border border-[#e6e6e6] bg-[#f5f5f5] px-3 font-serif text-[14px] text-[#222] placeholder:text-[#9a9a9a] transition focus:border-[#d9a641] focus:bg-white focus:outline-none";

function Field({ id, label, required, textarea, type = "text", placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-serif text-[15px] text-[#222]">
        {label}
        {required && <span className="ml-1 text-brand-red">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          required={required}
          placeholder={placeholder ?? label}
          rows={5}
          className={`${fieldClass} min-h-[110px] py-3`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder ?? label}
          className={`${fieldClass} h-[46px]`}
        />
      )}
    </div>
  );
}

function InfoRow({ title, children }) {
  return (
    <div className="mb-3">
      <h3 className="font-serif text-[14px] font-bold uppercase text-[#111]">{title}</h3>
      <p className="mt-1 font-serif text-[15px] text-[#222]">{children}</p>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <>
      <ShopPageHeader title="Contact Us" breadcrumb={[{ label: "Contact" }]} />

      <section className="mx-auto max-w-[1810px] px-4 pb-14 pt-8 sm:px-6 xl:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          {/* Form */}
          <div className="lg:border-r lg:border-[#e5e5e5] lg:pr-14">
            <h2 className="inline-block border-b-2 border-[#d9a641] pb-2 font-serif text-[20px] font-bold uppercase tracking-wide text-[#111]">
              Get in Touch
            </h2>

            <form onSubmit={submit} className="mt-8 space-y-5" noValidate={false}>
              <Field id="contact_name" label="Name" required />
              <Field id="contact_email" label="E-Mail" type="email" placeholder="E-Mail Address" required />
              <Field id="contact_phone" label="Phone" type="tel" placeholder="Phone Number" />
              <Field id="contact_message" label="Message" textarea required />

              <label className="flex cursor-pointer items-center gap-2 font-serif text-[15px] text-[#222]">
                <input
                  type="checkbox"
                  required
                  className="h-[14px] w-[14px] cursor-pointer border-[#999] accent-[#111]"
                />
                <span>
                  I have read and agree to the{" "}
                  <Link to="/privacy-policy" className="text-[#1a73c7] underline transition hover:text-brand-gold">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="flex h-[48px] w-full items-center justify-center gap-2 bg-[#111] font-serif text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-brand-gold"
              >
                Submit
                <FiArrowRight size={15} />
              </button>

              {sent && (
                <p role="status" className="font-serif text-[14px] text-brand-gold">
                  Thank you. Your message has been sent and we will get back to you shortly.
                </p>
              )}
            </form>
          </div>

          {/* Info + map */}
          <div className="lg:pl-14">
            <InfoRow title="Address">{ADDRESS}</InfoRow>
            <InfoRow title="E-Mail">
              <a href="mailto:contact@wineandchampagnegifts.com" className="transition hover:text-brand-gold">
                contact@wineandchampagnegifts.com
              </a>
            </InfoRow>
            <InfoRow title="Call Us/WhatsApp">
              Mobile:{" "}
              <a href="tel:+17036269045" className="transition hover:text-brand-gold">
                +1.703-626-9045
              </a>
            </InfoRow>

            <h3 className="mt-5 font-serif text-[14px] font-bold uppercase text-[#111]">Google Map Directions</h3>
            <div className="mt-4 aspect-[810/315] w-full overflow-hidden border border-[#e5e5e5] bg-[#f1f1f1]">
              <iframe
                title="Wine & Champagne Gifts location"
                src={MAP_EMBED}
                className="h-full w-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
