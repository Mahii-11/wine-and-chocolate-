import HeroBanner from "./HeroBanner";
import HeroSideCard from "./HeroSideCard";

/**
 * Below `md` the two panels stack and size themselves by aspect ratio.
 * From `md` up the section fills exactly the viewport left under the
 * header (`--header-h` is set by the Header), so the whole hero is
 * visible on the first screen without scrolling on any desktop size.
 */
function Hero() {
  return (
    <section className="mx-auto grid max-w-[1900px] grid-cols-1 gap-4 px-3 pt-4 pb-0 md:h-[calc(100dvh-var(--header-h,226px)-11rem)] md:min-h-[400px] md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] lg:gap-5 xl:grid-cols-[1fr_480px]">
      <HeroBanner />
      <HeroSideCard />
    </section>
  );
}

export default Hero;
