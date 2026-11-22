import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

/** Bold serif heading with the short gold rule under it, used on the account pages. */
export function AccountHeading({ children, className = "" }) {
  return (
    <h2 className={`font-serif text-[22px] font-bold text-[#222] sm:text-[24px] ${className}`}>
      {children}
      <span className="mt-2 block h-[2px] w-[44px] bg-[#d9a641]" />
    </h2>
  );
}

export const accountInputClass =
  "h-[46px] w-full border border-[#e3e3e3] bg-white px-3.5 font-serif text-[14px] text-[#222] placeholder:text-[#9a9a9a] transition focus:border-[#d9a641] focus:outline-none";

/** Label on the left, input on the right (stacked on small screens). */
export function AccountRow({ id, label, required, children }) {
  return (
    <div className="grid items-center gap-2 sm:grid-cols-[150px_1fr] sm:gap-4">
      <label htmlFor={id} className="font-serif text-[14px] text-[#222]">
        {label}
        {required && <span className="ml-1 text-brand-red">*</span>}
      </label>
      {children}
    </div>
  );
}

export function AccountInput({ id, type = "text", placeholder, required, autoComplete }) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={accountInputClass}
    />
  );
}

/** Password input with the show/hide eye toggle. */
export function PasswordInput({ id, placeholder = "Password", required, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={show ? "text" : "password"}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${accountInputClass} pr-11`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a9a] transition hover:text-[#222]"
      >
        {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
      </button>
    </div>
  );
}

export function AccountButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`flex h-[50px] items-center justify-center bg-[#111] px-10 font-serif text-[13px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-brand-gold ${className}`}
    >
      {children}
    </button>
  );
}
