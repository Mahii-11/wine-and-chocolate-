import { FiCalendar, FiGift, FiHeart, FiMail, FiSun } from "react-icons/fi";

export const ENGRAVING_PRICE = 40;
export const GREETING_CARD_PRICE = 4.99;
export const MESSAGE_MAX = 100;

export const greetingCards = [
  { id: "standard", label: "Standard Greeting Card (Free)", price: 0, icon: FiMail },
  { id: "anniversary", label: "Happy Anniversary Greeting Card", price: GREETING_CARD_PRICE, icon: FiHeart },
  { id: "thankyou", label: "Thankyou Greeting Card", price: GREETING_CARD_PRICE, icon: FiGift },
  { id: "getwell", label: "Get Well Soon Greeting Card", price: GREETING_CARD_PRICE, icon: FiSun },
  { id: "birthday", label: "Happy Birthday Greeting Card", price: GREETING_CARD_PRICE, icon: FiCalendar },
];

export const infoTabs = [
  { id: "greeting-card", label: "Greeting Card" },
  { id: "secure-delivery", label: "Secure Delivery" },
  { id: "bulk-form", label: "Bulk Form", to: "/bulk-order-form" },
  { id: "faqs", label: "FAQs", to: "/faqs" },
];

// Same for every product, so it stays static (not part of the product API).
export const shippingInfo = [
  "Orders placed before 12 PM EST ship the same business day. Standard ground delivery takes 2 to 5 business days; expedited and same day options are shown at checkout.",
  "All alcohol shipments require an adult signature (21+) on delivery. We ship wine and champagne gift baskets wherever permitted by law.",
  "Each basket is hand packed with protective wrap and ice packs in warm months so chocolates arrive in perfect condition.",
];
