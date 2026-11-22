// Only the shipping method id the checkout API is known to accept so far.
// The label here is what the customer sees; the fee is NOT shown because the server decides it
// (the admin panel currently names method 21 "Inside Dhaka" with a fee of 60).
export const SHIPPING_METHODS = [{ id: "21", name: "Standard Delivery", note: "Delivery may take 3 to 5 days" }];

export const PAYMENT_METHOD = "cash_on_delivery";

// Used by the (currently unused) US address form, kept for when the API supports it.
export const countries = ["United States", "Canada"];

export const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
  "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export const canadaProvinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia",
  "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
];

export const regionsByCountry = {
  "United States": usStates,
  Canada: canadaProvinces,
};
