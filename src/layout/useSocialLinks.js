import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTelegramPlane,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { getSocialLinks } from "../services/api";

// The backend sends icon-font classes (e.g. "bi bi-facebook", "fab fa-whatsapp-square").
// Match on the brand name inside that string and map it to a react-icons component.
const ICONS = [
  ["facebook", FaFacebookF, "Facebook"],
  ["instagram", FaInstagram, "Instagram"],
  ["twitter", FaXTwitter, "X"],
  ["linkedin", FaLinkedinIn, "LinkedIn"],
  ["youtube", FaYoutube, "YouTube"],
  ["whatsapp", FaWhatsapp, "WhatsApp"],
  ["tiktok", FaTiktok, "TikTok"],
  ["pinterest", FaPinterestP, "Pinterest"],
  ["telegram", FaTelegramPlane, "Telegram"],
];

const resolveIcon = (iconClass = "") => {
  const key = iconClass.toLowerCase();
  const match = ICONS.find(([name]) => key.includes(name)) ||
    (/(^|[\s-])x($|[\s-])/.test(key) ? ICONS[2] : null);
  return match
    ? { icon: match[1], label: match[2] }
    : { icon: FiLink, label: "Social link" };
};

/** Social links from the API: [{ id, icon, label, href }] */
export default function useSocialLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSocialLinks()
      .then((list) => {
        if (!active) return;
        setLinks(
          list.map((s) => ({ id: s.id, href: s.link || "#", ...resolveIcon(s.icon) })),
        );
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { links, loading };
}
