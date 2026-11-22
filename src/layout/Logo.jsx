import { Link } from "react-router";
import { motion } from "motion/react";
import useSiteSettings from "./useSiteSettings";

function Logo({ compact = false }) {
  const { settings, loading } = useSiteSettings();

  return (
    <Link to="/" aria-label="Wine and Chocolate Gift home" className="block">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-center overflow-hidden rounded-full border border-yellow-500 bg-black ${
          compact
            ? "h-12 w-12"
            : "h-[78px] w-[78px] sm:h-[88px] sm:w-[88px] lg:h-[104px] lg:w-[104px]"
        }`}
      >
        {loading ? (
          <div className="h-full w-full animate-pulse bg-white/20" />
        ) : (
          <img
            src={settings.logo || "/images/wine-chocolate-gift-logo.jpeg"}
            alt="Wine and Chocolate Gift"
            className="h-full w-full object-contain"
          />
        )}
      </motion.div>
    </Link>
  );
}

export default Logo;
