import { H, P, PolicyPage, UL } from "../components/policy/PolicyUi.jsx";

const linkClass = "text-[#1a73c7] transition hover:text-brand-gold hover:underline";

function TermsConditions() {
  return (
    <PolicyPage title="Terms & Conditions" crumb="Terms" wide>
      <P>
        Welcome to Wine &amp; Champagne Gifts. By accessing our website and placing an order, you agree to the
        following Terms &amp; Conditions. Please read them carefully before making a purchase.
      </P>

      <H>Age Requirement</H>
      <P>
        You must be at least 21 years of age to purchase wine, champagne, or any alcoholic product from our website.
        By placing an order, you represent to us that you are at least 21 years of age. We reserve the right to ask
        for proof of identity before processing an order. An adult (over the age of 21) signature with proof of age
        verification is required at the time of delivery. Someone over the age of 21 must be available to sign for
        the package. If no one is available at the time of delivery, the package will not be left unattended. We do
        not ship alcohol to PO Boxes or APO addresses.
      </P>

      <H>Carrier and Delivery Times</H>
      <P>
        We use UPS as our main shipping partner for alcoholic and non-alcoholic gift baskets. Approximate transit
        times:
      </P>
      <UL
        items={[
          "Ground Service – approximately 1–7 business days in transit",
          "3 Day Select – 3 business days in transit",
          "Next Day / 2nd Day Air – as selected at checkout",
        ]}
      />
      <P>
        All orders are confirmed via e-mail and processed within 2 business days. We will notify you by e-mail of
        any unexpected delays in processing or shipping during periods of extreme weather, excessive heat, or cold.
      </P>

      <H>Shipping Notes</H>
      <P>
        An adult signature (21+) with proof of age verification is required for delivery of alcoholic items.
        Requests to leave a package without a signature will not be honored. If you are unable to sign for your
        order at the time of delivery, you may arrange pickup at your local carrier facility. All shipping charges
        are non-refundable if a package is returned due to an incorrect address provided by the customer or an
        unavailable receiver. A reshipping fee may apply if the package needs to be reshipped or if a change of
        address is required after dispatch.
      </P>

      <H>Same-Day / Local Delivery</H>
      <P>
        We offer same-day delivery in Northern VA and Los Angeles for orders placed by the applicable cut-off time
        of 2:00 PM EST on business days (M&ndash;F). Local delivery charges vary by location and will be displayed at
        checkout. An adult (21+) signature is required for delivery of alcoholic items, even for local/same-day
        orders.
      </P>

      <H>Billing Information</H>
      <P>
        All payment details are verified before processing, and the billing address provided must correspond to the
        card used. If the billing address does not match, we will contact you before proceeding with the order.
      </P>

      <H>Payment Terms</H>
      <P>We accept the following payment methods for all orders placed on our website:</P>
      <UL items={["Visa", "MasterCard", "American Express", "Discover"]} />
      <P>
        All payments must be made in full at the time of placing the order, in U.S. Dollars. We use secure,
        encrypted payment gateways to process all transactions. We do not store your full card details on our
        servers. Orders will only be processed once payment has been successfully authorized.
      </P>

      <H>Limitation of Liability</H>
      <P>
        While we make every effort to ensure your order reaches you safely and on time, please note the following:
      </P>
      <UL
        items={[
          <>
            <strong>Carrier Delays:</strong> Once an order has been dispatched from our warehouse, it is handed over
            to our shipping carrier. Any delay in delivery caused by the carrier is beyond our control, and we shall
            not be held responsible for such delays.
          </>,
          <>
            <strong>Weather Delays:</strong> We are not responsible for delivery delays caused by weather
            conditions, natural events, or other circumstances beyond our reasonable control.
          </>,
          <>
            <strong>Lost Packages:</strong> In the rare event that your package is lost in transit before delivery,
            please contact our customer support team. We will investigate the matter and, upon confirmation, reship
            the same item to you at no additional charge.
          </>,
          <>
            <strong>Damaged Products:</strong> If your order arrives damaged, or you receive a damaged product due
            to mishandling during transit, please contact us with photos of the damaged item/packaging within 7 days
            of delivery. We will arrange a replacement for the affected item(s) at no additional cost to you.
          </>,
        ]}
      />
      <P>
        In no event shall Wine &amp; Champagne Gifts be liable for any indirect, incidental, or consequential damages
        arising from delayed, lost, or damaged shipments, beyond the remedies (reshipment/replacement) outlined
        above.
      </P>

      <H>Order Cancellations &amp; Changes</H>
      <P>
        Orders can be modified or cancelled free of charge as long as the request is made before the order has been
        dispatched. Once an order has been packed and handed over to the carrier for shipping, cancellation requests
        made after this point will be subject to a deduction of the shipping fee and a 15% restocking fee from your
        order total, and the remaining amount will be processed as a refund.
      </P>

      <H>Returns &amp; Refunds</H>
      <P>
        We offer a standard return policy that allows you to request a return within 90 days from your purchase
        date. Please note that gourmet food items (including chocolates, cheese, and other perishables) that have
        expired will not be accepted for return, regardless of the 90-day window. Items must be unused, unopened,
        and in their original condition to be eligible for a return, except in cases of damage or error on our part
        as outlined in the Limitation of Liability section above.
      </P>

      <H>Personalized / Custom Orders</H>
      <P>
        Items that are personalized, engraved, or hand-painted are made specifically to your order and are
        non-returnable and non-refundable, except in cases where the item arrives damaged or defective.
      </P>

      <H>Product Availability</H>
      <P>
        In the event of a seasonal shortage or unavailability of any item(s), we reserve the right to substitute it
        with an item of equal or greater value, or to contact you regarding alternatives.
      </P>

      <H>Corporate &amp; Bulk Orders</H>
      <P>
        Bulk and corporate orders are subject to separate terms regarding minimum order quantities, payment terms,
        and delivery timelines, as communicated at the time of order confirmation. Please download our Bulk Order
        Form or contact us directly for large order inquiries.
      </P>

      <H>Intellectual Property</H>
      <P>
        All content on this website, including text, images, logos, and graphics, is the property of Wine &amp;
        Champagne Gifts and may not be used, reproduced, or distributed without prior written consent.
      </P>

      <H>Governing Law</H>
      <P>
        These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the United
        States and the state in which our business is registered, without regard to conflict of law principles.
      </P>

      <H>Changes to These Terms</H>
      <P>
        We reserve the right to update or modify these Terms &amp; Conditions at any time without prior notice.
        Continued use of our website after any changes constitutes acceptance of the revised terms.
      </P>

      <H>Questions?</H>
      <P>
        If you have any questions about these Terms &amp; Conditions, please contact us:
        <br />
        Phone:{" "}
        <a href="tel:+17036269045" className={linkClass}>
          +1.703-626-9045
        </a>
        <br />
        E-mail:{" "}
        <a href="mailto:contact@wineandchampagnegifts.com" className={linkClass}>
          contact@wineandchampagnegifts.com
        </a>
      </P>

      <P>
        <strong>Note:</strong> We sell, deliver &amp; ship wine and champagne only where allowed by law. You must be
        21 years of age or older to purchase or receive an alcohol product from us. ID verification is required at
        the time of delivery.
      </P>
    </PolicyPage>
  );
}

export default TermsConditions;
