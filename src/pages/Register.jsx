import { useState } from "react";
import { Link, useNavigate } from "react-router";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import { RadioOption } from "../components/checkout/CheckoutUi.jsx";
import {
  AccountButton,
  AccountHeading,
  AccountInput,
  AccountRow,
  PasswordInput,
} from "../components/account/AccountUi.jsx";

function Register() {
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useState("no");
  const [error, setError] = useState("");

  const register = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    if (form.get("reg_password") !== form.get("reg_confirm")) {
      setError("Password confirmation does not match password.");
      return;
    }
    setError("");
    // No auth backend yet: send the new customer to the login page.
    navigate("/sign-in");
  };

  return (
    <>
      <ShopPageHeader title="Register Account" breadcrumb={[{ label: "Register" }]} />

      <section className="mx-auto max-w-[1810px] px-4 pb-20 pt-8 sm:px-6 xl:px-10">
        <p className="font-serif text-[15px] text-[#222]">
          If you already have an account with us, please login at the{" "}
          <Link to="/sign-in" className="font-bold underline transition hover:text-brand-gold">
            login page
          </Link>
          .
        </p>

        <form onSubmit={register} className="mt-9 max-w-[1030px]">
          <AccountHeading>Your Personal Details</AccountHeading>
          <div className="mt-7 space-y-4">
            <AccountRow id="reg_first_name" label="First Name" required>
              <AccountInput id="reg_first_name" placeholder="Enter your first name" autoComplete="given-name" required />
            </AccountRow>
            <AccountRow id="reg_last_name" label="Last Name" required>
              <AccountInput id="reg_last_name" placeholder="Enter your last name" autoComplete="family-name" required />
            </AccountRow>
            <AccountRow id="reg_email" label="E-Mail" required>
              <AccountInput id="reg_email" type="email" placeholder="example@domain.com" autoComplete="email" required />
            </AccountRow>
            <AccountRow id="reg_phone" label="Telephone" required>
              <AccountInput id="reg_phone" type="tel" placeholder="e.g. +1 234 567 890" autoComplete="tel" required />
            </AccountRow>
          </div>

          <AccountHeading className="mt-12">Your Password</AccountHeading>
          <div className="mt-7 space-y-4">
            <AccountRow id="reg_password" label="Password" required>
              <PasswordInput id="reg_password" placeholder="••••••••" autoComplete="new-password" required />
            </AccountRow>
            <AccountRow id="reg_confirm" label="Confirm" required>
              <PasswordInput id="reg_confirm" placeholder="Re-enter password" autoComplete="new-password" required />
            </AccountRow>
          </div>

          <AccountHeading className="mt-12">Security &amp; Preferences</AccountHeading>
          <div className="mt-7 grid items-center gap-2 sm:grid-cols-[150px_1fr] sm:gap-4">
            <span className="font-serif text-[14px] text-[#222]">Subscribe</span>
            <div className="flex items-center gap-8">
              <RadioOption name="reg_subscribe" value="yes" checked={subscribe === "yes"} onChange={setSubscribe}>
                Yes
              </RadioOption>
              <RadioOption name="reg_subscribe" value="no" checked={subscribe === "no"} onChange={setSubscribe}>
                No
              </RadioOption>
            </div>
          </div>

          <label className="mt-9 flex cursor-pointer items-center gap-2.5 font-serif text-[13px] text-[#222]">
            <input type="checkbox" required className="h-[16px] w-[16px] cursor-pointer accent-[#111]" />
            <span>
              I have read and agree to the{" "}
              <Link to="/privacy-policy" className="underline transition hover:text-brand-gold">
                Privacy Policy
              </Link>
            </span>
          </label>

          {error && (
            <p role="alert" className="mt-4 font-serif text-[13px] text-brand-red">
              {error}
            </p>
          )}

          <div className="mt-8 flex justify-end">
            <AccountButton type="submit" className="rounded-full">
              Register
            </AccountButton>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
