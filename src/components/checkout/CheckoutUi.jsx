import { FiChevronDown } from "react-icons/fi";

/** White card with the gold-underlined uppercase heading used across the checkout. */
export function CheckoutCard({ title, children, className = "" }) {
  return (
    <section className={`bg-white px-6 py-6 sm:px-7 ${className}`}>
      {title && (
        <h2 className="mb-6 inline-block border-b-2 border-[#d9a641] pb-2 font-serif text-[13px] font-bold uppercase tracking-[0.12em] text-[#222]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-serif text-[11px] font-bold uppercase tracking-[0.06em] text-[#333]"
    >
      {children}
      {required && <span className="ml-0.5 text-brand-red">*</span>}
    </label>
  );
}

const fieldClass =
  "h-10 w-full border border-[#e6e6e6] bg-[#fafafa] px-3 font-serif text-[13px] text-[#222] placeholder:text-[#9a9a9a] transition focus:border-[#d9a641] focus:bg-white focus:outline-none";

export function TextField({ id, label, required, type = "text", placeholder, autoComplete }) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder ?? label}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  );
}

export function SelectField({ id, label, required, value, onChange, options, placeholder }) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`${fieldClass} cursor-pointer appearance-none pr-9`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <FiChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#555]"
        />
      </div>
    </div>
  );
}

/** Round radio with the gold fill used in the reference design. */
export function RadioOption({ name, value, checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 font-serif text-[13px] text-[#333]">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-[#9a9a9a] bg-white peer-checked:border-[#c9961f] peer-checked:[&>span]:opacity-100">
        <span className="h-[9px] w-[9px] rounded-full bg-[#c9961f] opacity-0 transition" />
      </span>
      {children}
    </label>
  );
}
