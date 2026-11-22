import { motion } from "motion/react";
import { FiDownload } from "react-icons/fi";
import { phone } from "../../layout/navData";

const email = "contact@wineandchampagnegifts.com";
const formUrl = "/downloads/bulk-order-form.pdf"; // put the PDF in /public/downloads

function BulkOrderBanner() {
  return (
    <section className="bg-brand-dark text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-[1900px] flex-col gap-5 px-3 py-7 sm:px-6 md:flex-row md:items-center md:justify-between md:py-8 lg:px-12 xl:px-24"
      >
        <div className="text-center md:text-left">
          <h2 className="font-serif text-xl font-bold uppercase tracking-wide sm:text-2xl lg:text-[28px]">
            Need help with a large order?
          </h2>
          <p className="mt-1.5 font-serif text-sm text-white/85 sm:text-[15px]">
            Send your inquiries at{" "}
            <a href={`mailto:${email}`} className="break-all text-brand-gold hover:underline">
              {email}
            </a>{" "}
            or call us{" "}
            <a href={phone.href} className="whitespace-nowrap text-brand-gold hover:underline">
              +1.{phone.display}
            </a>
          </p>
        </div>

        <a
          href={formUrl}
          download
          className="group inline-flex shrink-0 items-center justify-center gap-3 border border-white px-6 py-3 font-serif text-[12px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-white hover:text-brand-dark sm:px-8 sm:py-3.5 sm:text-[13px]"
        >
          <FiDownload size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          Download Bulk Order Form
        </a>
      </motion.div>
    </section>
  );
}

export default BulkOrderBanner;
