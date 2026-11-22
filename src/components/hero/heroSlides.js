// Edit this file to change hero slides. Images live in /public/images.

export const bannerSlides = [
  {
    id: "holiday",
    image: "/images/holiday-banner.avif",
    alt: "Holiday wine and champagne gift baskets",
    title: "Wine & Champagne Gifts",
    subtitle: "Celebrate Holiday Season with Gifts that Impress.",
    cta: "Shop Now",
    to: "/holiday-gifts",
    theme: "light",
  },
  {
    id: "corporate",
    image: "/images/engraving-gift-box.jpeg",
    alt: "Engraved corporate wine gift box",
    title: "Corporate Gift Boxes",
    subtitle: "Engraved sets that say thank you in style.",
    cta: "Explore Corporate",
    to: "/corporate-gifts",
    theme: "dark",
  },
  {
    id: "baskets",
    image: "/images/holiday-banner.avif",
    alt: "Gourmet gift baskets with wine",
    title: "Gourmet Gift Baskets",
    subtitle: "Hand-packed baskets delivered nationwide.",
    cta: "View Baskets",
    to: "/gift-baskets",
    theme: "light",
  },
];

// Image-only slides. The whole image links to `to`; `alt` doubles as the link label.
export const sideSlides = [
  {
    id: "personalized",
    image: "/images/engraving-gift-box.jpeg",
    alt: "Personalized wine and champagne gift sets",
    to: "/personalized-gifts",
  },
  {
    id: "bulk",
    image: "/images/holiday-banner.avif",
    alt: "Bulk orders for teams and clients",
    to: "/bulk-orders",
  },
];
