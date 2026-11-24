import { useEffect, useState } from "react";
import { getMenuData } from "../services/api";
import { mainLinks } from "./navData";

const shopLink = (category, sub, child) => {
  const q = new URLSearchParams({ category });
  if (sub) q.set("sub_category", sub);
  if (child) q.set("child_category", child);
  return `/shop?${q}`;
};

// menu-data tree -> nav items. A category with sub categories becomes a mega menu:
// sub categories are the left list, each one's child categories fill the right column.
const toNavItems = (categories) =>
  categories.map((cat) => {
    const subs = cat.sub_categories || [];
    const item = { key: cat.slug, to: shopLink(cat.slug), label: cat.name, category: cat.slug, dropdown: subs.length > 0 };
    if (!subs.length) return item;
    item.menu = {
      groups: subs.map((sub) => {
        const children = sub.child_categories || [];
        const subTo = shopLink(cat.slug, sub.slug);
        return {
          label: sub.name,
          to: subTo,
          columns: [
            {
              title: sub.name,
              to: subTo,
              span: children.length > 8 ? 3 : children.length > 3 ? 2 : 1,
              links: children.length
                ? children.map((c) => ({ label: c.name, to: shopLink(cat.slug, sub.slug, c.slug) }))
                : [{ label: `All ${sub.name}`, to: subTo }],
            },
          ],
        };
      }),
    };
    return item;
  });

// Static items shown until (or if the request fails before) the API answers
const fallback = mainLinks.map((l) => ({ key: l.to, to: l.to, label: l.label, dropdown: false }));

let cache = null;

export default function useMainMenu() {
  const [items, setItems] = useState(cache || fallback);

  useEffect(() => {
    if (cache) return;
    let alive = true;
    getMenuData()
      .then((list) => {
        if (!list.length) return;
        cache = toNavItems(list);
        if (alive) setItems(cache);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return items;
}
