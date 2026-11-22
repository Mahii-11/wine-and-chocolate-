import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getOfferBanner } from "../../services/api";

function HeroSideCard() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getOfferBanner()
      .then((url) => active && setImage(url))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe6e1] md:aspect-auto md:h-full md:min-h-0">
      {loading ? (
        <div className="h-full w-full animate-pulse bg-black/10" />
      ) : image ? (
        <Link to="/shop" aria-label="Special offer" className="block h-full w-full">
          <img
            src={image}
            alt="Special offer"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </Link>
      ) : null}
    </div>
  );
}

export default HeroSideCard;
