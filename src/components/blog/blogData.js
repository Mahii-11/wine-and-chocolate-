// Blog listing content. Replace with the blog API response; keep the same shape.

export const blogCategories = [
  { id: "all", label: "All Blogs" },
  { id: "gift-guides", label: "Gift Guides" },
  { id: "holidays", label: "Holidays And Occasions" },
  { id: "wine-guides", label: "Wine Guides & Pairings" },
  { id: "faqs", label: "Wine & Champagne FAQ's" },
  { id: "brands", label: "Brands & Regions" },
];

export const blogPosts = [
  {
    id: 1,
    slug: "welcome-gifts-for-new-employees",
    title: "Welcome Gifts for New Employees: 12 Wine, Champagne & Gift Ideas",
    excerpt:
      "Think back to your first day at a new job. You probably felt a little excited, a little nervous, and unsure where to sit at lunch. Now imagine walking to your desk and finding a beautiful gift box and a handwritten note that says, \"We're so glad you're here.\" That small moment sticks. It's...",
    image: "/images/engraving-gift-box.jpeg",
    date: "2026-11-03",
    author: "Admin",
    comments: 2,
    views: 41,
    category: "gift-guides",
  },
  {
    id: 2,
    slug: "how-to-hold-a-wine-glass",
    title: "How to Hold a Wine Glass: The Simple Guide to Looking and Feeling More Confident",
    excerpt:
      "You're at a dinner table, someone pours you a beautiful glass of wine, and suddenly you wonder: Am I holding this correctly? It's one of those little things about wine that nobody really teaches you. We read or learn about grapes,...",
    image: "/images/two-bottle-wine-gifts.jpeg",
    date: "2026-10-08",
    author: "Abott Megha",
    comments: 2,
    views: 85,
    category: "wine-guides",
  },
  {
    id: 3,
    slug: "champagne-magnum-gifts",
    title: "Champagne Magnum Gifts: The Complete Guide to Large-Format Champagne Bottles",
    excerpt:
      "Quick answer: A champagne magnum is a 1.5-litre bottle that holds the same as two standard 750 ml bottles and pours about 12 glasses. Bigger formats follow: the Jeroboam or double magnum (3 L, 4 bottles), Rehoboam (4.5 L), Methusel...",
    image: "/images/veuve-clicquot-brut-and-godiva-8-pc-chocolate-wooden-gift-box.jpeg",
    date: "2026-10-06",
    author: "Admin",
    comments: 2,
    views: 115,
    category: "gift-guides",
  },
  {
    id: 4,
    slug: "chardonnay-wine-guide",
    title: "Chardonnay Wine Guide: Everything You Need to Know About Chardonnay",
    excerpt:
      "Chardonnay is one of the world's most recognizable and widely planted white wine grapes. It is also one of the most misunderstood. Ask someone what Chardonnay tastes like and you may get completely different answers. One...",
    image: "/images/wedding-gift_set.jpeg",
    date: "2026-10-01",
    author: "Abott Megha",
    comments: 2,
    views: 76,
    category: "wine-guides",
  },
  {
    id: 5,
    slug: "dom-perignon-vs-veuve-clicquot",
    title: "Dom Pérignon vs Veuve Clicquot: Which Champagne Is Better?",
    excerpt:
      "Standing in front of the champagne shelf, looking at a bottle of Veuve Clicquot for around $70 and a Dom Pérignon for $250 or more? You're not the first person to wonder whether the pricier one is really that much better. These are...",
    image: "/images/dom-perignon-and-bon-appetit-gourmet-gift-basket.jpeg",
    date: "2026-10-01",
    author: "Admin",
    comments: 2,
    views: 235,
    category: "brands",
  },
  {
    id: 6,
    slug: "what-is-wine",
    title: "What is Wine? A Simple Guide to Understanding Wine",
    excerpt:
      "Wine can seem complicated when you first encounter words like vintage, appellation, tannin, varietal and terroir. But at its heart, wine is remarkably simple: wine is an alcoholic beverage made by fermenting grape juice. Th...",
    image: "/images/stags-leap-red-and-white-wine-gift-box.jpeg",
    date: "2026-09-30",
    author: "Abott Megha",
    comments: 2,
    views: 129,
    category: "faqs",
  },
  {
    id: 7,
    slug: "how-much-alcohol-is-in-wine",
    title: "How Much Alcohol Is in Wine? Understanding ABV & Factors",
    excerpt:
      "Wine is one of the world's most popular and loved alcoholic beverages, yet many people wonder about its alcohol content, and what if I tell you that, I've even been asked, \"Is wine alcohol?\" Whether you're choosing a bottle for dinn...",
    image: "/images/silver-oak-alexander-cabernet-and-bon-appetit-gourmet-gift-basket.jpeg",
    date: "2026-09-20",
    author: "Abott Megha",
    comments: 2,
    views: 141,
    category: "faqs",
  },
  {
    id: 8,
    slug: "different-types-of-rose-wine",
    title: "Different Types of Rosé Wine: A Simple Guide to Styles, Sweetness, and More",
    excerpt:
      "Rosé is no longer just the pretty pink wine we reach for on a sunny afternoon or on a girls' day out. From pale, bone-dry Provence rosé to rich Tavel, fruity White Zinfandel, and even sparkling rosé, there is a surprisingly wide world of pink...",
    image: "/images/two-bottle-french-red-and-white-wine-gift-set.jpeg",
    date: "2026-09-18",
    author: "Abott Megha",
    comments: 2,
    views: 109,
    category: "wine-guides",
  },
  {
    id: 9,
    slug: "best-vintage-champagne",
    title: "Best Vintage Champagne: Top Champagne Vintage Years to Know",
    excerpt:
      "We know of many different champagne types, but when it comes to vintage champagne, the year on the bottle can tell you far more than just when the grapes were harvested. A great vintage can produce wines with remarkable...",
    image: "/images/moet-gift-basket.jpeg",
    date: "2026-09-14",
    author: "Abott Megha",
    comments: 2,
    views: 151,
    category: "brands",
  },
  {
    id: 10,
    slug: "champagne-cocktail-recipe",
    title: "Champagne Cocktail Recipe: Elegant Champagne & Holiday Cocktails",
    excerpt:
      "Champagne? A drink that has always resonated with elegance and celebration. Beyond raising a celebratory toast, champagne is also known to create the most visually stunning, classy, and refreshing cocktails. Flavors from fruit peels or...",
    image: "/images/cakebread-cellars-and-gourmet-delight-gift-basket.jpeg",
    date: "2026-09-13",
    author: "Admin",
    comments: 2,
    views: 101,
    category: "holidays",
  },
];

export const BLOG_PAGE_SIZE = 10;

// Until the API returns a real total, the pager shows this many pages like the reference.
export const BLOG_TOTAL_PAGES = 19;
