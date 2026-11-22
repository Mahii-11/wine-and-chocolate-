import { Link } from "react-router";

const link = "text-[#1a4fc4] underline underline-offset-2 transition hover:text-brand-gold";

/** Long-form copy under the product grid. */
function ShopSeoContent() {
  return (
    <section className="mt-16 font-serif text-[16px] leading-[27px] text-[#222]">
      <h2 className="mb-3 text-[20px] font-bold">Shop Unique Wine &amp; Champagne Graduation Basket !</h2>
      <p className="mb-6">
        Graduation Day marks the beginnings of new adventures in a student’s life, and this day calls for a grand
        celebration with a party and a dozen gift items. If you are looking for gifts that will definitely be liked by
        all the graduating students, you are at the right place. We provide you with our unique collection of wine and
        champagne gift baskets that you can buy at affordable prices. Our collection includes all popular brands
        including <Link to="/shop?brand=veuve-clicquot" className={link}>Veuve Clicquot</Link>,{" "}
        <Link to="/shop?brand=josh-cellars" className={link}>Josh Cellars</Link>,{" "}
        <Link to="/shop" className={link}>Meiomi</Link>,{" "}
        <Link to="/shop?brand=dom-perignon" className={link}>Dom Perignon</Link>, and{" "}
        <Link to="/shop?brand=krug" className={link}>Krug</Link>- that are fit for gifting purposes. On public demand,
        these gift baskets are paired up with delicious multi-flavoured{" "}
        <Link to="/shop?brand=godiva" className={link}>Godiva chocolates</Link>, promising fresh roses, beautiful
        heart-shaped wooden pick, and all the items you would like to buy for your friends, seniors, or your children.
        Have a look at these graduation gift baskets and buy them for the lovely graduates, wishing them good luck for
        their life ahead.
      </p>

      <h2 className="mb-3 text-[20px] font-bold">
        Congratulate the Graduating Batch with wallet-friendly Graduation Gift Baskets.
      </h2>
      <p className="mb-6">
        Since all of us have infinite unforgettable memories that we want to preserve through our lifetime, you can get
        some of these memories or related keywords added on a personalized note and get them attached along with the
        champagne gifts and wine gift baskets. We provide you with the graduation baskets having multiple products in
        different price ranges that make it budget-friendly for the students to buy. Order the one that you feel will
        be liked the best by your friends or seniors among the wide collection of{" "}
        <Link to="/champagne-gifts" className={`${link} font-bold`}>champagne gift baskets</Link> and{" "}
        <Link to="/gift-baskets" className={`${link} font-bold`}>wine gift baskets</Link> available.
      </p>
      <p>
        Graduation is a once in a lifetime event, so make sure to make the celebration special by gifting the graceful
        and elegant graduation gift baskets available at our online store.
      </p>
    </section>
  );
}

export default ShopSeoContent;
