import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiTruck } from "react-icons/fi";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import CheckoutCartTable from "../components/checkout/CheckoutCartTable.jsx";
import OrderConfirmation from "../components/checkout/OrderConfirmation.jsx";
import { CheckoutCard, RadioOption, TextField } from "../components/checkout/CheckoutUi.jsx";
import { PAYMENT_METHOD, SHIPPING_METHODS } from "../components/checkout/checkoutData.js";
import PriceChangeNotice from "../components/cart/PriceChangeNotice.jsx";
import { clearCart, getCart, getTotalCartPrice, refreshCartPrices } from "../cart/cartSlice";
import { createOrder } from "../services/api";

/*
 * Hidden until the checkout API supports them (it only takes name, phone, address, shipping_method,
 * payment_method and items): Login / Register / Guest choice, E-Mail, first / last name split,
 * Billing + Shipping address blocks (components/checkout/AddressFields.jsx), coupon, "is this order a
 * gift", card payment fields, order instructions, tax. The original markup is kept in the comments below.
 * Needs back for the address blocks: import AddressFields from "../components/checkout/AddressFields.jsx";
 * Needs back for the coupon / payment cards: Label (CheckoutUi), FiCreditCard and FiLock (react-icons/fi).
 */

const breadcrumb = [{ label: "Account", to: "/sign-in" }, { label: "Checkout" }];

function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector(getCart);
  const subtotal = useSelector(getTotalCartPrice);
  const hasItems = items.length > 0;
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_METHODS[0].id);
  const [pricesChecked, setPricesChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  // Re-check live prices / stock (and real product ids) before the order is sent
  useEffect(() => {
    if (!hasItems) return undefined;
    let alive = true;
    dispatch(refreshCartPrices()).finally(() => alive && setPricesChecked(true));
    return () => {
      alive = false;
    };
  }, [hasItems, dispatch]);

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!hasItems || submitting) return;

    const form = new FormData(e.currentTarget);
    const body = new FormData();
    body.append("name", String(form.get("name")).trim());
    body.append("phone", String(form.get("phone")).trim());
    body.append("address", String(form.get("address")).trim());
    body.append("shipping_method", shippingMethod);
    body.append("payment_method", PAYMENT_METHOD);
    items.forEach((item, i) => {
      body.append(`items[${i}][product_id]`, item.id);
      body.append(`items[${i}][quantity]`, item.quantity);
    });

    setSubmitting(true);
    setError("");
    try {
      const order = await createOrder(body);
      dispatch(clearCart());
      setPlacedOrder(order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <>
        <ShopPageHeader title="Order Confirmed" breadcrumb={[{ label: "Checkout", to: "/checkout" }, { label: "Success" }]} />
        <OrderConfirmation order={placedOrder} />
      </>
    );
  }

  return (
    <>
      <ShopPageHeader title="Checkout" breadcrumb={breadcrumb} />

      <form onSubmit={placeOrder} className="bg-[#f5f5f5]">
        <div className="mx-auto grid max-w-[1340px] gap-6 px-4 py-8 lg:grid-cols-[1fr_1.8fr] lg:py-10">
          {/* Left column */}
          <div className="min-w-0 space-y-6">
            {/*
            <CheckoutCard title="Login or Register">
              <div className="space-y-3">
                <RadioOption name="account" value="login" checked={accountType === "login"} onChange={setAccountType}>
                  Login
                </RadioOption>
                <RadioOption name="account" value="register" checked={accountType === "register"} onChange={setAccountType}>
                  Register
                </RadioOption>
                <RadioOption name="account" value="guest" checked={accountType === "guest"} onChange={setAccountType}>
                  Guest
                </RadioOption>
              </div>
              (login form: E-Mail + Password + Login button)
            </CheckoutCard>
            */}

            <CheckoutCard title="Your Details">
              <div className="space-y-4">
                <TextField id="name" label="Full Name" required autoComplete="name" />
                <TextField id="phone" label="Phone Number" type="tel" required autoComplete="tel" placeholder="01XXXXXXXXX" />
                <TextField id="address" label="Full Address" required autoComplete="street-address" placeholder="House, road, area, city" />
                {/*
                <TextField id="email" label="E-Mail" type="email" required autoComplete="email" />
                (register: Password + Password Confirm)
                */}
              </div>
            </CheckoutCard>

            {/*
            <CheckoutCard title="Your Billing Address">
              <AddressFields prefix="billing" />
            </CheckoutCard>

            <CheckoutCard title="Shipping Address">
              <AddressFields prefix="shipping" extraTelephone />
            </CheckoutCard>
            */}
          </div>

          {/* Right column */}
          <div className="min-w-0 space-y-6 self-start">
            <CheckoutCard title="Shipping Method">
              <div className="space-y-3">
                {SHIPPING_METHODS.map((method) => (
                  <RadioOption
                    key={method.id}
                    name="shipping_method"
                    value={method.id}
                    checked={shippingMethod === method.id}
                    onChange={setShippingMethod}
                  >
                    <span className="flex items-center gap-2">
                      <FiTruck size={16} className="shrink-0 text-[#777]" />
                      {method.name} <span className="text-[#777]">({method.note})</span>
                    </span>
                  </RadioOption>
                ))}
              </div>
              <p className="mt-3 font-serif text-[12px] text-[#777]">The shipping fee is added when you place the order.</p>
            </CheckoutCard>

            {/*
            <CheckoutCard title="Coupon / Voucher / Reward">
              (coupon input + Apply button: needs the coupon request field name and a coupon check endpoint)
            </CheckoutCard>

            <CheckoutCard>
              (Is this order a gift? No / Yes)
            </CheckoutCard>
            */}

            <CheckoutCard title="Shopping Cart">
              <PriceChangeNotice className="mb-4" />
              <CheckoutCartTable subtotal={subtotal} />
            </CheckoutCard>

            <CheckoutCard title="Payment Method">
              <div className="rounded-[4px] border border-[#e6c877] bg-[#fdf8ec] px-5 py-4">
                <RadioOption name="payment" value={PAYMENT_METHOD} checked onChange={() => {}}>
                  <span className="font-semibold">Cash on Delivery</span>
                </RadioOption>
                {/*
                (Credit / Debit Card option with card_number, card_expiry, card_cvc inputs)
                */}
              </div>
            </CheckoutCard>

            <CheckoutCard>
              {/*
              <textarea name="comment" rows={4} placeholder="Add a special note or delivery instructions here" ... />
              */}
              {error && (
                <p role="alert" className="mb-4 border border-red-200 bg-red-50 px-4 py-3 font-serif text-[13px] text-red-700">
                  {error}
                </p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!hasItems || !pricesChecked || submitting}
                  className="h-11 bg-black px-8 font-serif text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Placing order…" : "Place Order"}
                </button>
              </div>
            </CheckoutCard>
          </div>
        </div>
      </form>
    </>
  );
}

export default Checkout;
