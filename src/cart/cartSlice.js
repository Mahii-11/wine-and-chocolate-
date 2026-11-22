import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductDetails } from "../services/api";

/*
 * Cart line: { id, slug, name, image, to, sku, unitPrice, oldPrice, extras, quantity, totalPrice,
 *              variant_id, options, stockQty }
 *  - a line is identified by `slug + variant_id` (variant_id is 0 unless engraving / card options were chosen)
 *  - unitPrice already includes `extras` (engraving, greeting card)
 */
const initialState = {
  cart: [],
  showCartPopup: false,
  lastAdded: null,
  // Notes about lines changed by refreshCartPrices (price changed, out of stock, no longer sold)
  priceChanges: [],
};

/*
 * The cart is stored in the browser, so its prices can be stale (or edited by the visitor).
 * Re-read the live price / stock of every product in the cart from the product API.
 * Products that no longer exist or are out of stock are removed. Network errors are ignored.
 * The server must still recalculate the total when the order is placed.
 */
export const refreshCartPrices = createAsyncThunk("cart/refreshPrices", async (_, { getState }) => {
  const slugs = [...new Set(getCart(getState()).map((item) => item.slug))];

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const product = await getProductDetails(slug);
        if (!product || !product.inStock) return { slug, removed: true };
        return { slug, id: product.id, price: product.price, oldPrice: product.oldPrice, stockQty: product.stockQty };
      } catch {
        return null;
      }
    })
  );

  return results.filter(Boolean);
});

const slugOf = (p) => p.slug || p.to?.split("/").filter(Boolean).pop() || String(p.id);
const maxQty = (item) => item.stockQty ?? Infinity;
const findLine = (state, { slug, variant_id = 0 }) =>
  state.cart.find((item) => item.slug === slug && item.variant_id === variant_id);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const p = action.payload;
      const slug = slugOf(p);
      const variant_id = p.variant_id ?? 0;
      const unitPrice = Number(p.price) || 0;
      const quantity = Math.max(1, p.quantity ?? 1);
      const existing = findLine(state, { slug, variant_id });
      let added;

      if (existing) {
        const next = Math.min(existing.quantity + quantity, maxQty(existing));
        added = next - existing.quantity;
        existing.quantity = next;
        existing.totalPrice = next * existing.unitPrice;
      } else {
        const stockQty = p.stockQty ?? null;
        const qty = Math.min(quantity, stockQty ?? Infinity);
        added = qty;
        state.cart.push({
          id: p.id,
          slug,
          name: p.name,
          image: p.image || "",
          to: p.to || `/products/${slug}`,
          sku: p.sku || "",
          unitPrice,
          oldPrice: p.oldPrice ?? undefined,
          extras: p.extras ?? 0,
          quantity: qty,
          totalPrice: qty * unitPrice,
          variant_id,
          options: p.options ?? null,
          stockQty,
        });
      }

      // Drives the "Added to cart" toast; skipped when nothing was added (stock limit reached)
      if (!p.silent && added > 0) {
        state.lastAdded = {
          nonce: (state.lastAdded?.nonce ?? 0) + 1,
          name: p.name,
          image: p.image || "",
          to: p.to || `/products/${slug}`,
          price: unitPrice,
          quantity: added,
        };
      }
    },

    deleteItem(state, action) {
      const { slug, variant_id = 0 } = action.payload;
      state.cart = state.cart.filter((item) => !(item.slug === slug && item.variant_id === variant_id));
    },

    increaseItemQuantity(state, action) {
      const item = findLine(state, action.payload);
      if (item && item.quantity < maxQty(item)) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    decreaseItemQuantity(state, action) {
      const item = findLine(state, action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    // Typed quantity (checkout table input): clamped to 1..stock
    setItemQuantity(state, action) {
      const { quantity, ...key } = action.payload;
      const item = findLine(state, key);
      if (!item) return;
      item.quantity = Math.min(maxQty(item), Math.max(1, Math.floor(Number(quantity)) || 1));
      item.totalPrice = item.quantity * item.unitPrice;
    },

    clearCart(state) {
      state.cart = [];
      state.priceChanges = [];
    },

    // Used to sync the cart from another browser tab
    replaceCart(state, action) {
      state.cart = Array.isArray(action.payload) ? action.payload : [];
    },

    openCartPopup(state) {
      state.showCartPopup = true;
    },

    hideCartPopup(state) {
      state.showCartPopup = false;
    },

    dismissLastAdded(state) {
      state.lastAdded = null;
    },

    dismissPriceChanges(state) {
      state.priceChanges = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(refreshCartPrices.fulfilled, (state, action) => {
      const changes = [];

      for (const result of action.payload) {
        const lines = state.cart.filter((item) => item.slug === result.slug);

        if (result.removed) {
          lines.forEach((item) => changes.push({ type: "removed", name: item.name }));
          state.cart = state.cart.filter((item) => item.slug !== result.slug);
          continue;
        }

        for (const item of lines) {
          item.id = result.id; // the order API needs the real product id
          const unitPrice = result.price + item.extras;
          if (unitPrice !== item.unitPrice) {
            changes.push({ type: "price", name: item.name, from: item.unitPrice, to: unitPrice });
          }
          item.unitPrice = unitPrice;
          item.oldPrice = result.oldPrice ? result.oldPrice + item.extras : undefined;
          item.stockQty = result.stockQty;
          if (item.quantity > maxQty(item)) {
            changes.push({ type: "stock", name: item.name, to: item.stockQty });
            item.quantity = item.stockQty;
          }
          item.totalPrice = item.quantity * item.unitPrice;
        }
      }

      // Never clear here: a second refresh with no changes must not hide the first one's notice
      if (changes.length) state.priceChanges = [...state.priceChanges, ...changes];
    });
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  setItemQuantity,
  clearCart,
  replaceCart,
  openCartPopup,
  hideCartPopup,
  dismissLastAdded,
  dismissPriceChanges,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const getCart = (state) => state.cart?.cart ?? [];

export const getTotalCartQuantity = (state) =>
  getCart(state).reduce((sum, item) => sum + (item.quantity || 0), 0);

export const getTotalCartPrice = (state) =>
  getCart(state).reduce((sum, item) => sum + (item.totalPrice || 0), 0);

export const getTotalSavings = (state) =>
  getCart(state).reduce(
    (sum, item) => sum + (item.oldPrice > item.unitPrice ? (item.oldPrice - item.unitPrice) * item.quantity : 0),
    0
  );

export const getShowCartPopup = (state) => state.cart?.showCartPopup ?? false;

export const getLastAdded = (state) => state.cart?.lastAdded ?? null;

export const getPriceChanges = (state) => state.cart?.priceChanges ?? [];
