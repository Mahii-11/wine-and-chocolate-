import { Link, useNavigate } from "react-router";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";
import {
  AccountButton,
  AccountHeading,
  AccountInput,
  AccountRow,
  PasswordInput,
} from "../components/account/AccountUi.jsx";

function SignIn() {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    // No auth backend yet: return to the home page after a "successful" login.
    navigate("/");
  };

  return (
    <>
      <ShopPageHeader title="Sign In" breadcrumb={[{ label: "Login" }]} />

      <section className="mx-auto max-w-[1340px] px-4 pb-20 pt-10 sm:px-6">
        <div className="grid gap-9 lg:grid-cols-2">
          {/* New customer */}
          <div className="bg-[#f1f1f1] px-6 py-9 sm:px-9">
            <AccountHeading>New Customer</AccountHeading>
            <p className="mt-6 font-serif text-[14px] leading-[26px] text-[#444]">
              By creating an account you will be able to shop faster, be up to date on an order&apos;s status, and
              keep track of the orders you have previously made.
            </p>
            <Link
              to="/register"
              className="mt-7 flex h-[50px] items-center justify-center bg-[#111] font-serif text-[13px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-brand-gold"
            >
              Continue
            </Link>
          </div>

          {/* Returning customer */}
          <div className="bg-[#f1f1f1] px-6 py-9 sm:px-9">
            <AccountHeading>Returning Customer</AccountHeading>
            <form onSubmit={login} className="mt-6 space-y-5">
              <AccountRow id="login_email" label="E-Mail Address">
                <AccountInput
                  id="login_email"
                  type="email"
                  placeholder="E-Mail Address"
                  autoComplete="email"
                  required
                />
              </AccountRow>
              <AccountRow id="login_password" label="Password">
                <PasswordInput id="login_password" autoComplete="current-password" required />
              </AccountRow>

              <div className="sm:pl-[166px]">
                <Link
                  to="/forgot-password"
                  className="font-serif text-[13px] text-brand-red transition hover:text-brand-gold"
                >
                  Forgotten Password
                </Link>
              </div>

              <AccountButton type="submit" className="w-full">
                Login
              </AccountButton>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
