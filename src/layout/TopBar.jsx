import { Link } from "react-router";
import { FaPhoneAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { utilityLinks } from "./navData";
import useSocialLinks from "./useSocialLinks";
import useSiteSettings, { toTelHref } from "./useSiteSettings";

function TopBar() {
  const { links, loading } = useSocialLinks();
  const { settings, loading: settingsLoading } = useSiteSettings();
  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex h-12 max-w-[1900px] items-center justify-between px-4 lg:grid lg:h-[60px] lg:grid-cols-[1fr_11rem_1fr]">
      <div className="flex items-center gap-6 whitespace-nowrap font-serif text-[13px] tracking-wide lg:text-[14px] xl:gap-10 xl:text-[15px]">
          <a
            href={settings.phone ? toTelHref(settings.phone) : undefined}
            className="flex items-center gap-2 hover:text-yellow-500 lg:gap-3"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black lg:h-6 lg:w-6">
              <FaPhoneAlt className="h-2.5 w-2.5 lg:h-3 lg:w-3" />
            </span>
            {settingsLoading ? (
              <span className="inline-block h-4 w-28 animate-pulse rounded bg-white/25" />
            ) : (
              settings.phone
            )}
          </a>
          {utilityLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="hidden uppercase hover:text-yellow-500 lg:block">
              {label}
            </Link>
          ))}
        </div>

        <div aria-hidden="true" className="hidden lg:block" />

        <div className="flex items-center gap-5 lg:justify-end lg:gap-8">
          <ul className="hidden items-center gap-5 md:flex lg:gap-6">
            {loading &&
              [0, 1, 2].map((i) => (
                <li key={i} className="h-4 w-4 animate-pulse rounded-full bg-white/25" />
              ))}
            {links.map(({ id, icon: Icon, label, href }) => (
              <li key={id}>
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="transition hover:text-yellow-500"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
          <Link
            to="/sign-in"
            className="flex items-center gap-2 whitespace-nowrap font-serif text-[13px] uppercase tracking-wide hover:text-yellow-500 lg:text-[14px] xl:text-[15px]"
          >
            <FiUser size={18} />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
