import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import Slider from "./Slider";
import { getSliders } from "../../services/api";

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

function BannerSlide({ slide }) {
  const dark = slide.theme === "dark";
  return (
    <div className="relative h-full w-full">
      <img
        src={slide.image}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-right"
        draggable={false}
      />
      <div
        className={`relative z-10 flex h-full max-w-lg flex-col justify-center px-6 sm:px-10 lg:px-14 min-[1800px]:max-w-2xl min-[1800px]:px-24 ${
          dark ? "text-white" : "text-brand-dark"
        }`}
      >
        <motion.h1
          {...fade(0.1)}
          className="font-serif text-2xl font-semibold leading-tight sm:text-3xl xl:text-[34px]"
        >
          {slide.title}
        </motion.h1>
        <motion.p
          {...fade(0.25)}
          className="mt-4 max-w-xs font-serif text-base sm:mt-6 sm:max-w-sm sm:text-lg xl:mt-8 xl:text-[20px]"
        >
          {slide.subtitle}
        </motion.p>
        <motion.div {...fade(0.4)} className="mt-6 sm:mt-8 xl:mt-10">
          <Link
            to={slide.to}
            className="inline-block rounded bg-brand-gold px-7 py-3 font-serif text-sm font-bold uppercase tracking-wider text-white transition hover:bg-black sm:px-10 sm:py-4 sm:text-[16px]"
          >
            {slide.cta}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function BannerSkeleton() {
  return (
    <div className="flex h-full w-full animate-pulse flex-col justify-center gap-5 px-6 sm:px-10 lg:px-14">
      <div className="h-8 w-3/5 max-w-sm rounded bg-black/10 sm:h-10" />
      <div className="h-5 w-2/5 max-w-xs rounded bg-black/10" />
      <div className="h-5 w-1/3 max-w-[16rem] rounded bg-black/10" />
      <div className="mt-4 h-11 w-36 rounded bg-black/10 sm:h-14 sm:w-44" />
    </div>
  );
}

function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSliders()
      .then((list) => {
        if (!active) return;
        setSlides(
          list.map((s) => ({
            id: s.id,
            image: s.image,
            alt: s.title,
            title: s.title,
            subtitle: s.sub_title,
            cta: s.btn_text,
            to: s.link || "/shop",
            theme: s.theme || "light",
          })),
        );
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative aspect-square overflow-hidden bg-[#ebe6e1] sm:aspect-video md:aspect-auto md:h-full md:min-h-0">
      {loading ? (
        <BannerSkeleton />
      ) : slides.length > 0 ? (
        <Slider slides={slides} interval={3000} render={(s) => <BannerSlide slide={s} />} />
      ) : null}
    </div>
  );
}

export default HeroBanner;
