// Three link panels under "Explore Basket Categories".
// `image` sits on the right of each panel; square-ish images look best.

export const basketCategories = [
  {
    id: "occasions",
    heading: "Gifts by Occasions",
    image: "/images/holiday-banner.avif",
    imageAlt: "Wine bottles for every occasion",
    viewMore: "/gifts-by-occasion",
    links: [
      { label: "Thanksgiving Gifts", to: "/thanksgiving-gifts" },
      { label: "Holiday Gifts", to: "/holiday-gifts" },
      { label: "Christmas Wine Gifts", to: "/christmas-gifts" },
      { label: "New Year's Gifts", to: "/new-year-gift-baskets" },
      { label: "Congratulations Gifts", to: "/congratulations-gifts" },
    ],
  },
  {
    id: "origin",
    heading: "Gifts by Wine Origin",
    image: "/images/engraving-gift-box.jpeg",
    imageAlt: "Wines from around the world",
    viewMore: "/gifts-by-origin",
    links: [
      { label: "Australian Wine Gifts", to: "/australian-wine-gifts" },
      { label: "Spanish Wine Gifts", to: "/spanish-wine-gifts" },
      { label: "French Wine Gifts", to: "/french-wine-gifts" },
      { label: "Italian Wine Gifts", to: "/italian-wine-gifts" },
      { label: "Napa Valley Wine Gifts", to: "/napa-valley-wine-gifts" },
    ],
  },
  {
    id: "price",
    heading: "Gifts by Price",
    image: "/images/holiday-banner.avif",
    imageAlt: "Gifts under $49",
    viewMore: "/gifts-by-price",
    links: [
      { label: "Under $49", to: "/gifts-under-49" },
      { label: "Under $79", to: "/gifts-under-79" },
      { label: "Under $99", to: "/gifts-under-99" },
      { label: "$100 - $199", to: "/gifts-100-199" },
      { label: "$200 - $499", to: "/gifts-200-499" },
    ],
  },
];
