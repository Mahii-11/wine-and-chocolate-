import { P, PolicyPage, SiteLink } from "../components/policy/PolicyUi.jsx";

function ReturnPolicy() {
  return (
    <PolicyPage title="Return Policy">
      <P>
        <SiteLink /> (A Unit of Gift22 Inc wineandchampagnegifts.com) is committed to making your shopping
        experience a pleasant one. If you are not satisfied with your order, Please let us know and we will work
        with you to make the situation right.
      </P>
      <P>
        Should any product be damaged during shipping or received wrong item, Please Email us so we can pursue a
        claim with the shipping company and send you a replacement product. If you receive a bottle that is leaking,
        please contact our Customer Service department at{" "}
        <a href="mailto:contact@wineandchampagnegifts.com" className="transition hover:text-brand-gold">
          contact@wineandchampagnegifts.com
        </a>
        . Please note that extreme fluctuation in temperature may cause the cork or stopper to expand and retract
        and causing leakage in some bottles.
      </P>
      <P>
        Shipping returns are determined on a per-order basis. Refunds will be provided for the products only and not
        for the shipping costs unless it was an error on our part. There is a 15% restocking fee.
      </P>
      <P>
        <strong>Note:</strong> Our standard return policy allows for returns within 90 days of purchase. However,
        during the holiday season (November 12, 2026 &ndash; February 28, 2027), this return period is extended to
        120 days to accommodate for gifts and seasonal purchases.
      </P>
      <P>
        For any questions, please contact us at{" "}
        <a href="tel:+17036269045" className="transition hover:text-brand-gold">
          703-626-9045
        </a>
        .
      </P>
    </PolicyPage>
  );
}

export default ReturnPolicy;
