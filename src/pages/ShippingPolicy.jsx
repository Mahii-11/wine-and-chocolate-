import { P, PolicyPage } from "../components/policy/PolicyUi.jsx";
import { deliveryRates } from "../components/policy/shippingData.js";

const link = "text-[#1a73c7] underline transition hover:text-brand-gold";
const Phone = () => (
  <a href="tel:+17036269045" className={link}>
    +1 703-626-9045
  </a>
);
const Email = () => (
  <a href="mailto:contact@wineandchampagnegifts.com" className={link}>
    contact@wineandchampagnegifts.com
  </a>
);

/** Centered bold section title used throughout this page. */
const Title = ({ children }) => (
  <h2 className="mb-4 mt-8 text-center font-serif text-[22px] font-bold text-[#222] sm:text-[24px]">{children}</h2>
);

const UL = ({ items }) => (
  <ul className="mb-4 list-disc space-y-1.5 pl-7 font-serif text-[16px] leading-[1.75] text-[#222] marker:text-[#222]">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

function ShippingPolicy() {
  return (
    <PolicyPage title="Shipping & Delivery Policy" crumb="Delivery">
      <P>
        Wine &amp; Champagne Gifts (A Unit of Gift22 Inc wineandchampagnegifts.com) is committed to bringing you the
        finest products and superior customer service. We take pride in making sure every order is delivered on time
        and in excellent condition, and we partner with professional shipping companies to do so.
      </P>
      <P>
        We strictly abide by the law and deliver all orders lawfully. Regular deliveries run Monday&ndash;Friday.
        Same-day delivery is available in Washington, D.C. and selected Northern Virginia areas, and in some of these
        locations it is also available on weekends.
      </P>
      <P>
        If the courier delivers your parcel to an access point, we will email you the pickup details. The parcel must
        be collected from the access point within 5 business days.
      </P>
      <P>
        Please review the guidelines below so we can deliver your gift smoothly. Any questions? Call <Phone /> or
        email <Email />; our customer service team will be happy to help.
      </P>
      <P bold>
        Attention: During periods of extreme heat, orders containing chocolate are processed and shipped only on
        Mondays, Tuesdays and Wednesdays to protect the quality of your gift.
      </P>

      <Title>Delivery Details</Title>
      <div className="mb-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-center font-serif text-[15px] text-[#222]">
          <thead>
            <tr className="bg-[#2b323b] text-white">
              {["Destination State", "Abbreviation", "Delivery Days", "Shipping Fee"].map((h) => (
                <th key={h} className="border border-[#3a424c] px-3 py-3 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deliveryRates.map(([state, abbr, days, fee]) => (
              <tr key={abbr} className="odd:bg-[#f1f1f1] even:bg-white">
                <td className="border border-[#e0e0e0] px-3 py-3">{state}</td>
                <td className="border border-[#e0e0e0] px-3 py-3">{abbr}</td>
                <td className="border border-[#e0e0e0] px-3 py-3">{days}</td>
                <td className="border border-[#e0e0e0] px-3 py-3">{fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        <strong>*Alcohol shipping restrictions:</strong> Due to state laws, we do not ship alcohol to Alaska (AK),
        Hawaii (HI), Utah (UT) or Delaware (DE). Chocolates, gift baskets and non-alcoholic gift baskets can still be
        shipped to these states. Additional restrictions may apply in MS, AL, AR, OK, IA, KS, and other states.
        Please contact us before ordering if you are unsure whether we can ship to your recipient&apos;s state.
      </P>

      <Title>Delivery Within California</Title>
      <P>
        Deliveries within California take 2&ndash;3 business days and cost $30. Same-day delivery is available in Los
        Angeles for $50. An adult aged 21 or older must be present to sign for the delivery.
      </P>

      <Title>Same-Day Delivery in Washington, D.C. &amp; Northern Virginia</Title>
      <P>
        We offer same-day delivery in Washington, D.C. and the following nearby areas: Ashburn, Sterling, Herndon,
        Reston, Tysons, Falls Church, Arlington, Leesburg, Potomac, McLean, Vienna, Oakton, Fairfax, Great Falls,
        Pimmit Hills, Clifton, Chantilly, Centreville and Annandale. Orders must be placed before 2:00 PM E.S.T, and
        the same-day delivery fee is $50. Weekend same-day delivery is available in some of these locations; please
        contact us to confirm availability for your recipient&apos;s address.
      </P>

      <Title>Delivery Within Virginia</Title>
      <P>
        In Northern Virginia, orders placed by 6:00 PM E.S.T are usually delivered within 24 to 48 hours. Deliveries
        to the rest of Virginia take 3 to 5 business days. Delivery within Virginia costs $20 to $50, depending on
        location and speed. An adult (21 or older) must sign for the delivery.
      </P>

      <Title>Age Requirement</Title>
      <P>
        You must be at least 21 years old to purchase wine gifts. By placing an order on our website, you confirm
        that you are at least 21. We reserve the right to ask for proof of identity before processing an order. An
        adult aged 21 or older must sign and show valid ID at the time of delivery. If no one aged 21 or older is
        available, the package will not be left.
      </P>

      <Title>Delivery Address Guidelines</Title>
      <P>Please complete all applicable fields.</P>
      <UL
        items={[
          "A phone number is required. We do not deliver to P.O. Boxes, APO addresses or outside the United States.",
          "Because our gifts contain alcohol, an adult signature is required on delivery.",
          "We deliver during business hours, so please use an address where the recipient or another adult will be available to sign for the parcel.",
          "For business addresses, we deliver to the reception desk. The recipient's name is always on the box, and delivery from reception to the recipient is the company's responsibility.",
          "Due to state laws, we do not ship alcohol to Alaska, Hawaii, Utah or Delaware; chocolates, gift baskets and non-alcoholic gift baskets can still be shipped there. Additional restrictions may apply in MS, AL, AR, OK, IA, KS, and other states.",
        ]}
      />

      <Title>Carrier and Delivery Times</Title>
      <P>UPS is our main carrier for shipments outside our local delivery areas. Delivery services we offer:</P>
      <UL
        items={[
          <>
            <strong>Ground Service:</strong> approximately 1-6 business days in transit
          </>,
          <>
            <strong>3 Day Select:</strong> 3 business days in transit
          </>,
          <>
            <strong>2nd Day Air:</strong> 2 business days in transit (on request)
          </>,
          <>
            <strong>Next Day Air:</strong> 1 business day in transit (on request)
          </>,
        ]}
      />
      <P>
        All orders are confirmed by email and processed within one business day. If there is a problem with your
        order, we will contact you by the end of the next business day, and we will email you promptly about any
        unexpected processing or shipping delays. During extreme heat or cold, we recommend 2nd Day Air or Next Day
        Air to protect your gift.
      </P>

      <Title>Wine &amp; Champagne Gifts&apos; Responsibilities</Title>
      <P>
        Wine &amp; Champagne Gifts is responsible for delivering your order on time according to the shipping method
        you select.
      </P>
      <P>We are not responsible for failed deliveries when:</P>
      <UL
        items={[
          "The customer provides an incorrect or outdated address.",
          "The gift recipient is on vacation or otherwise unavailable.",
          "The customer does not provide a corrected or new delivery address within 24 hours.",
          "The parcel is not collected from an access point within 5 business days.",
          "Severe weather conditions occur (snow, ice, floods, etc.).",
        ]}
      />
      <P>
        If the delivery company returns a gift for any of the reasons above (except severe weather), neither the
        gift nor the shipping will be refunded.
      </P>
      <P>
        You may ask us to reship the gift if you agree to pay for shipping again. If the original address was
        incorrect or outdated, we can reship only once you provide a new delivery address. An additional fee applies
        to reshipments.
      </P>

      <Title>Shipping Notes</Title>
      <P>
        An adult (21 or older) must sign and show proof of age at delivery. Requests to leave a package without a
        signature cannot be accepted. If you are unable to sign at the time of delivery, you can arrange to pick up
        the package at your local UPS facility, which will hold it for 5 business days.
      </P>
      <P>
        Shipping charges are non-refundable if a package is returned because of an incorrect address or an
        unavailable recipient. In both cases, UPS will contact the recipient or sender to resolve the issue; the
        recipient is responsible for providing the correct address and signing for the package. A reshipping fee
        applies if the package must be reshipped or the address changed.
      </P>

      <Title>Shipping Methods and Commitments</Title>
      <P>
        We email tracking information to every customer. For questions about tracking or the shipment of your order,
        call our customer service team at <Phone /> or email <Email />.
      </P>

      <Title>Billing Information</Title>
      <P>
        Orders placed on this website are not final, and your card is not charged automatically. We charge your card
        once your order has been packed and is complete. All cards are verified, and the billing address must match
        the card you use. If it does not match, we will let you know and will hold the order until we hear from you.
      </P>

      <Title>In-Store Pickup</Title>
      <P>In-store pickup is not available.</P>

      <Title>Questions?</Title>
      <P>If you have any other questions about our shipping policy, please contact us.</P>
      <P>
        <strong>Phone:</strong> <Phone />
      </P>
      <P>
        <strong>Email:</strong> <Email />
      </P>
      <P>
        <strong>Note:</strong> If an item is out of stock seasonally, we will substitute it with an item of equal or
        greater value.
      </P>
    </PolicyPage>
  );
}

export default ShippingPolicy;
