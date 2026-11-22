// Products listed on the shop / category page.
// `brand` must match a brand `id` in shopBrandsData.js so the sidebar filter works.
// Images are the product shots available in /public/images.

const img = {
  domBasket: "/images/dom-perignon-and-bon-appetit-gourmet-gift-basket.jpeg",
  veuveBox: "/images/veuve-clicquot-brut-and-godiva-8-pc-chocolate-wooden-gift-box.jpeg",
  moetBasket: "/images/moet-gift-basket.jpeg",
  cakebread: "/images/cakebread-cellars-and-gourmet-delight-gift-basket.jpeg",
  stagsLeap: "/images/stags-leap-red-and-white-wine-gift-box.jpeg",
  silverOak: "/images/silver-oak-alexander-cabernet-and-bon-appetit-gourmet-gift-basket.jpeg",
  frenchBox: "/images/two-bottle-french-red-and-white-wine-gift-set.jpeg",
};

export const shopProducts = [
  { id: 1, name: "Veuve Clicquot And Godiva Chocolate Gift Set", price: 159, oldPrice: 189, brand: "veuve-clicquot", image: img.veuveBox },
  { id: 2, name: "Veuve Clicquot Champagne & Assorted Godiva Chocolates Basket", price: 199.99, brand: "veuve-clicquot", image: img.moetBasket },
  { id: 3, name: "Connoisseur Veuve Clicquot Champagne Gift Basket", price: 199, brand: "veuve-clicquot", image: img.cakebread },
  { id: 4, name: "Bon Appetit Gourmet Gift Basket & Veuve Clicquot Champagne", price: 199.99, brand: "veuve-clicquot", image: img.domBasket },
  { id: 5, name: "Dom Perignon & Assorted Godiva Chocolates Gift Basket", price: 450, brand: "dom-perignon", image: img.moetBasket },
  { id: 6, name: "Ruinart Rosé And Bon Appetit Gourmet Gift Basket", price: 279, brand: "ruinart", image: img.silverOak },
  { id: 7, name: "Dom Perignon Brut Champagne Gift Basket", price: 459, oldPrice: 499, brand: "dom-perignon", image: img.domBasket },
  { id: 8, name: "The Gourmet Delight La Marca Prosecco Gift Basket", price: 139.99, brand: "la-marca", image: img.cakebread },
  { id: 9, name: "Caymus Wine And Veuve Clicquot Brut Champagne Gift Box", price: 249, brand: "caymus", image: img.stagsLeap },
  { id: 10, name: "Moet & Chandon Imperial Brut Champagne And Gourmet Basket", price: 189, brand: "moet-chandon", image: img.silverOak },
  { id: 11, name: "Moet & Chandon Imperial Brut Champagne Gift Basket", price: 189.99, brand: "moet-chandon", image: img.moetBasket },
  { id: 12, name: "The Gourmet Delight Gift Basket With Dom Perignon Champagne", price: 459, oldPrice: 489.99, brand: "dom-perignon", image: img.cakebread },
  { id: 13, name: "Dom Pérignon And Godiva 8 Pc Chocolate Gift Box", price: 399.99, brand: "dom-perignon", image: img.veuveBox },
  { id: 14, name: "Caymus Napa Valley Wine Gift Basket", price: 249, oldPrice: 299, brand: "caymus", image: img.cakebread },
  { id: 15, name: "Caymus Cabernet Sauvignon Wine Gift Basket", price: 159, oldPrice: 179, brand: "caymus", image: img.silverOak },
  { id: 16, name: "Caymus Wine & Cheese Gift Basket", price: 199, brand: "caymus", image: img.domBasket },
  { id: 17, name: "Wine Treasures Of Napa Valley", price: 299, brand: "silver-oak", image: img.frenchBox },
  { id: 18, name: "Veuve Clicquot Champagne And Tiffany & Co. Flute Gift Set", price: 299, brand: "veuve-clicquot", image: img.veuveBox },
  { id: 19, name: "Dom Perignon Rose Champagne with Bon Appetit Gift Basket", price: 599, brand: "dom-perignon", image: img.domBasket },
  { id: 20, name: "Opus One Wine And Gourmet Delight Gift Basket", price: 549, brand: "opus-one", image: img.cakebread },
  { id: 21, name: "Dom Perignon Rose Champagne And Godiva Basket", price: 629, brand: "dom-perignon", image: img.moetBasket },
  { id: 22, name: "Laurent Perrier La Cuvee Brut Gift Set", price: 149, brand: "laurent-perrier", image: img.veuveBox },
  { id: 23, name: "Caymus Cabernet Sauvignon Wine & Godiva Celebration Basket", price: 229, brand: "caymus", image: img.silverOak },
  { id: 24, name: "Perrier Jouet Grand Brut And Godiva 26 Pc Gift Set", price: 129, brand: "perrier-jouet", image: img.stagsLeap },
  { id: 25, name: "Cakebread Cellars And Gourmet Delight Gift Basket", price: 249, brand: "cakebread-cellars", image: img.cakebread },
  { id: 26, name: "Silver Oak Alexander Cabernet And Bon Appetit Gourmet Gift Basket", price: 279, brand: "silver-oak", image: img.silverOak },
  { id: 27, name: "Stags Leap Red And White Wine Gift Box", price: 149, brand: "stags-leap", image: img.stagsLeap },
  { id: 28, name: "Two Bottle French Red And White Wine Gift Set", price: 99, brand: "louis-jadot", image: img.frenchBox },
  { id: 29, name: "Krug Grande Cuvee Champagne Gift Box", price: 399, brand: "krug", image: img.veuveBox },
  { id: 30, name: "Louis Roederer Collection Champagne And Godiva Basket", price: 189, oldPrice: 209, brand: "louis-roederer", image: img.moetBasket },
  { id: 31, name: "Penfolds Bin 389 And Gourmet Delight Gift Basket", price: 229, brand: "penfolds", image: img.domBasket },
  { id: 32, name: "Josh Cellars Cabernet And Bon Appetit Gift Basket", price: 119, brand: "josh-cellars", image: img.silverOak },
  { id: 33, name: "Billecart-Salmon Brut Reserve And Godiva Gift Box", price: 219, brand: "billecart-salmon", image: img.veuveBox },
  { id: 34, name: "Banfi Brunello And Gourmet Delight Gift Basket", price: 199, brand: "banfi", image: img.cakebread },
  { id: 35, name: "Austin Hope Cabernet Two Bottle Gift Box", price: 179, brand: "austin-hope", image: img.frenchBox },
  { id: 36, name: "Ancient Peaks Cabernet And Cheese Gift Basket", price: 139, brand: "ancient-peaks", image: img.silverOak },
].map((p) => ({ ...p, to: `/products/${slugify(p.name)}` }));

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
