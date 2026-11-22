import { useState } from "react";
import { SelectField, TextField } from "./CheckoutUi";
import { countries, regionsByCountry } from "./checkoutData";

/**
 * Billing / shipping address block. `prefix` namespaces the field ids so both
 * forms can live on the same page. `extraTelephone` adds the shipping-only phone field.
 */
function AddressFields({ prefix, extraTelephone = false }) {
  const [country, setCountry] = useState("United States");
  const [region, setRegion] = useState("");

  const id = (name) => `${prefix}_${name}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextField id={id("first_name")} label="First Name" required autoComplete="given-name" />
        <TextField id={id("last_name")} label="Last Name" required autoComplete="family-name" />
      </div>

      {extraTelephone && (
        <TextField
          id={id("telephone")}
          label="Telephone (Required for same day delivery and gift wrap)"
          placeholder="Telephone"
          type="tel"
          autoComplete="tel"
        />
      )}

      <TextField id={id("company")} label="Company" autoComplete="organization" />
      <TextField id={id("address_1")} label="Address 1" placeholder="Address 1" required autoComplete="address-line1" />
      <TextField id={id("address_2")} label="Address 2" placeholder="Address 2" autoComplete="address-line2" />

      <div className="grid grid-cols-2 gap-4">
        <TextField id={id("city")} label="City" required autoComplete="address-level2" />
        <TextField id={id("postcode")} label="Post Code" required autoComplete="postal-code" />
      </div>

      <SelectField
        id={id("country")}
        label="Country"
        required
        value={country}
        onChange={(v) => {
          setCountry(v);
          setRegion("");
        }}
        options={countries}
      />
      <SelectField
        id={id("region")}
        label="Region / State"
        required
        value={region}
        onChange={setRegion}
        options={regionsByCountry[country] ?? []}
        placeholder="--- Please Select Region ---"
      />
    </div>
  );
}

export default AddressFields;
