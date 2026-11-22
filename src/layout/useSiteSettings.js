import { useEffect, useState } from "react";
import { getSiteSettings } from "../services/api";

// One request shared by every component that needs the site settings
// (logo, phone, email, copyright, description).
let request = null;

const loadSettings = () => {
  if (!request) {
    request = getSiteSettings().catch((err) => {
      request = null; // allow a retry on the next mount
      throw err;
    });
  }
  return request;
};

export default function useSiteSettings() {
  const [state, setState] = useState({ settings: {}, loading: true });

  useEffect(() => {
    let active = true;
    loadSettings()
      .then((settings) => active && setState({ settings, loading: false }))
      .catch(() => active && setState({ settings: {}, loading: false }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}

/** "703-626-9045" -> "tel:7036269045" */
export const toTelHref = (phone = "") => `tel:${phone.replace(/[^\d+]/g, "")}`;
