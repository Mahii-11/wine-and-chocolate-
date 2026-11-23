// Static copy and options for the shop page. Products and brands come from the API.

export const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name (A - Z)" },
  { value: "name-desc", label: "Name (Z - A)" },
  { value: "price-asc", label: "Price (Low > High)" },
  { value: "price-desc", label: "Price (High > Low)" },
];

export const pageSizeOptions = [24, 48, 96];

// Page copy. Keyed by route slug so the same page can serve several categories.
export const shopPages = {
  "graduation-gifts": {
    title: "Graduation Wine And Champagne Gift Basket",
    breadcrumb: [{ label: "Gifts By Occasions", to: "/gifts-by" }, { label: "Graduation Gifts" }],
    intro: [
      "Graduation day is a milestone worth celebrating. Surprise your graduate with a memorable gift that captures their achievements and new beginnings. Whether you choose a sophisticated champagne gift set, a luxurious wine gift basket, or beautifully curated gift boxes, you’ll find the ideal way to honor their success. Let them toast to their bright future with our curated selection of Graduation Champagne and Wine Gifts.",
      "Cheers to new adventures and endless possibilities!",
    ],
  },
};

export const defaultShopPage = shopPages["graduation-gifts"];
