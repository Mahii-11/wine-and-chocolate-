import Hero from "../components/hero/Hero";
import GiftCategories from "../components/hero/GiftCategories.jsx";
import BestSellers from "../components/hero/BestSellers.jsx";
import SpecialOffers from "../components/hero/SpecialOffers.jsx";
import BasketCategories from "../components/hero/BasketCategories.jsx";
import BulkOrderBanner from "../components/hero/BulkOrderBanner.jsx";
import Clients from "../components/hero/Clients.jsx";
import BrandsSection from "../components/hero/BrandsSection.jsx"

function Home() {
  return (
    <>
      <Hero />
      <GiftCategories />
      <BestSellers />
      <SpecialOffers />
      <BasketCategories />
      <BulkOrderBanner />
      <Clients />
      <BrandsSection />
    </>
  );
}

export default Home;
