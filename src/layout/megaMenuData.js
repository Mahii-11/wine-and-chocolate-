// Mega menu content keyed by the main nav link's `to`.
// Each menu has a left list of `groups`; a group holds one or more link `columns`
// (each with a heading) and an optional `recommended` strip for the black footer bar.

const slug = (label) =>
  "/shop/" +
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const links = (labels) => labels.map((label) => ({ label, to: slug(label) }));

const recommended = [
  { label: "Birthday Gifts", to: "/shop/birthday-gifts" },
  { label: "Veuve Clicquot Gift Sets", to: "/shop?brand=veuve-clicquot" },
  { label: "Personalized Bottles", to: "/shop/personalized-gifts" },
  { label: "Napa Valley Wine Gifts", to: "/shop/napa-valley-wine-gifts" },
  { label: "Moet & Chandon Gift Basket", to: "/shop?brand=moet-chandon" },
];

export const megaMenus = {
  "/gifts-by": {
    groups: [
      {
        label: "Gifts By Occasions",
        columns: [
          {
            title: "Gifts By Occasions",
            span: 3,
            links: links([
              "Graduation Gifts", "Wedding Gifts", "Anniversary Gifts",
              "Birthday Gifts", "Congratulations Gifts", "Engagement Gifts",
              "Housewarming Gifts", "Christmas Gifts", "Bosses Day Gifts",
              "Thanksgiving Gifts", "Retirement Gifts", "Father's Day Gifts",
              "Women's Day Gifts", "Valentine's Day Gifts", "Galentine's Day Gifts",
              "Halloween Gifts", "Holiday Gifts", "New Year's Gifts",
              "Easter Gifts", "Mother's Day Gifts",
            ]),
          },
          {
            title: "Care Packages",
            links: links(["Get Well Soon Gifts", "Sympathy Gifts", "Spa Gift Baskets", "Divorce Gifts"]),
          },
        ],
      },
      {
        label: "Personalized Gifts",
        columns: [
          {
            title: "Personalized Gifts",
            span: 2,
            links: links([
              "Engraved Champagne Bottles", "Engraved Wine Bottles", "Custom Label Wine",
              "Monogram Gift Boxes", "Photo Wine Labels", "Personalized Flutes",
              "Engraved Decanters", "Custom Corporate Logo Gifts",
            ]),
          },
          { title: "Popular Picks", links: links(["Engraved Dom Pérignon", "Engraved Veuve Clicquot", "Engraved Moët & Chandon"]) },
        ],
      },
      {
        label: "Wine Collections",
        columns: [
          {
            title: "Wine Collections",
            span: 2,
            links: links([
              "Red Wine Gifts", "White Wine Gifts", "Rosé Wine Gifts", "Sparkling Wine Gifts",
              "Two Bottle Wine Gifts", "Three Bottle Wine Gifts", "Wine & Chocolate Gifts", "Wine & Cheese Gifts",
            ]),
          },
          { title: "Top Rated", links: links(["Caymus Gift Baskets", "Silver Oak Gift Baskets", "Opus One Gifts"]) },
        ],
      },
      {
        label: "Wine & Glassware Gifts",
        columns: [
          {
            title: "Wine & Glassware Gifts",
            span: 2,
            links: links(["Wine & Flute Sets", "Champagne & Tiffany Flutes", "Decanter Gift Sets", "Riedel Glassware Gifts", "Wine Tool Gift Boxes"]),
          },
          { title: "Occasions", links: links(["Wedding Toast Sets", "Housewarming Glassware", "Anniversary Flute Sets"]) },
        ],
      },
      {
        label: "Luxury Gifts",
        columns: [
          {
            title: "Luxury Gifts",
            span: 2,
            links: links(["Dom Pérignon Gifts", "Krug Gifts", "Louis Roederer Cristal Gifts", "Opus One Gifts", "Luxury Wine & Caviar", "VIP Gift Hampers"]),
          },
          { title: "By Budget", links: links(["Gifts Over $500", "Gifts Over $1000"]) },
        ],
      },
      {
        label: "Gifts By Origin",
        columns: [
          {
            title: "Gifts By Origin",
            span: 2,
            links: links(["Napa Valley Wine Gifts", "Sonoma Wine Gifts", "French Wine Gifts", "Italian Wine Gifts", "Spanish Wine Gifts", "Australian Wine Gifts", "Champagne Region Gifts"]),
          },
          { title: "Featured Regions", links: links(["Bordeaux Gifts", "Tuscany Gifts", "Rioja Gifts"]) },
        ],
      },
      {
        label: "Gifts By Grape Types",
        columns: [
          {
            title: "Gifts By Grape Types",
            span: 2,
            links: links(["Cabernet Sauvignon Gifts", "Chardonnay Gifts", "Pinot Noir Gifts", "Merlot Gifts", "Sauvignon Blanc Gifts", "Prosecco Gifts", "Riesling Gifts", "Zinfandel Gifts"]),
          },
          { title: "Sparkling", links: links(["Champagne Gifts", "Prosecco Gifts", "Cava Gifts"]) },
        ],
      },
      {
        label: "Shop By Price",
        columns: [
          {
            title: "Shop By Price",
            span: 2,
            links: links(["Gifts Under $50", "Gifts Under $100", "Gifts Under $150", "Gifts Under $200", "Gifts Under $300", "Gifts Under $500"]),
          },
          { title: "Deals", links: links(["Sale Gift Baskets", "Clearance Wine Gifts"]) },
        ],
      },
      {
        label: "Shop By Size",
        columns: [
          {
            title: "Shop By Size",
            span: 2,
            links: links(["Mini Champagne Gifts", "Half Bottle Gifts", "Standard 750ml Gifts", "Magnum Gifts", "Jeroboam Gifts"]),
          },
          { title: "Sets", links: links(["Single Bottle Gift Boxes", "Two Bottle Gift Boxes", "Mixed Case Gifts"]) },
        ],
      },
    ],
    recommended,
  },

  "/gift-baskets": {
    groups: [
      {
        label: "Wine Gift Baskets",
        columns: [
          {
            title: "Wine Gift Baskets",
            span: 2,
            links: links(["Red Wine Gift Baskets", "White Wine Gift Baskets", "Wine & Cheese Gift Baskets", "Wine & Chocolate Gift Baskets", "Gourmet Wine Baskets", "Two Bottle Wine Baskets"]),
          },
          { title: "Best Sellers", links: links(["Caymus Napa Valley Wine Gift Basket", "Silver Oak Gift Basket", "Cakebread Cellars Gift Basket"]) },
        ],
      },
      {
        label: "Champagne Gift Baskets",
        columns: [
          {
            title: "Champagne Gift Baskets",
            span: 2,
            links: links(["Veuve Clicquot Gift Baskets", "Dom Pérignon Gift Baskets", "Moët & Chandon Gift Baskets", "Champagne & Chocolate Baskets", "Champagne & Flute Sets", "Rosé Champagne Baskets"]),
          },
          { title: "Luxury", links: links(["Krug Gift Baskets", "Cristal Gift Baskets"]) },
        ],
      },
      {
        label: "Prosecco Gift Baskets",
        columns: [
          { title: "Prosecco Gift Baskets", span: 2, links: links(["La Marca Prosecco Gifts", "Prosecco & Chocolate Baskets", "Prosecco & Flute Sets", "Mimosa Gift Baskets"]) },
          { title: "Also Popular", links: links(["Sparkling Rosé Gifts", "Cava Gift Baskets"]) },
        ],
      },
      {
        label: "Gourmet Gift Baskets",
        columns: [
          { title: "Gourmet Gift Baskets", span: 2, links: links(["Cheese Gift Baskets", "Chocolate Gift Baskets", "Godiva Gift Baskets", "Snack Gift Baskets", "Fruit & Wine Baskets"]) },
          { title: "Seasonal", links: links(["Holiday Gift Baskets", "Thanksgiving Baskets"]) },
        ],
      },
    ],
    recommended,
  },

  "/corporate-gifts": {
    groups: [
      {
        label: "Corporate Gifting",
        columns: [
          {
            title: "Corporate Gifting",
            span: 2,
            links: links(["Client Appreciation Gifts", "Employee Appreciation Gifts", "Welcome Gifts for New Employees", "Holiday Corporate Gifts", "Executive Gift Baskets", "Branded Gift Boxes"]),
          },
          { title: "Services", links: [{ label: "Bulk Order Inquiry", to: "/bulk-orders" }, { label: "Download Bulk Order Form", to: "/bulk-order-form" }, { label: "Corporate Account", to: "/sign-in" }] },
        ],
      },
      {
        label: "Events & Thank You",
        columns: [
          { title: "Events & Thank You", span: 2, links: links(["Thank You Gift Baskets", "Conference Gifts", "Closing Gifts for Realtors", "Referral Gifts", "Retirement Gifts"]) },
          { title: "By Industry", links: links(["Real Estate Gifts", "Law Firm Gifts", "Healthcare Gifts"]) },
        ],
      },
    ],
    recommended,
  },
};
