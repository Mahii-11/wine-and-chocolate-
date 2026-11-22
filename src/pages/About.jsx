import { Link } from "react-router";
import ShopPageHeader from "../components/shop/ShopPageHeader.jsx";

const growth = ["2023: Over 43% growth", "2024: Nearly 48% growth", "2025: Over 60% growth"];

const occasions = [
  { label: "Christmas wine gifts", to: "/shop/christmas-gift-baskets" },
  { label: "Birthday wine gifts", to: "/shop/birthday-gift-baskets" },
  { label: "Anniversary champagne gifts", to: "/shop/anniversary-gift-baskets" },
  { label: "Wedding celebration gifts", to: "/shop/wedding-gift-baskets" },
  { label: "Housewarming wine gifts", to: "/shop/housewarming-gift-baskets" },
  { label: "Congratulations gifts", to: "/shop/congratulations-gift-baskets" },
];

const reasons = [
  "Wine gifts starting at just $49",
  "100% customer satisfaction",
  "Our Commitment to Quality",
  "On time delivery and 24x7 live chat support",
  "Unique hand-painted and engraved wine bottles",
  "Reliable wine gift delivery across the United States",
  "Corporate gifting solutions for businesses",
  "Curated collections of premium and affordable wine gift baskets",
  "Elegant champagne gifts for celebrations and milestones",
];

/* Typography helpers so every block on the page shares the same rhythm. */
const H2 = ({ children }) => (
  <h2 className="mb-3 mt-8 font-serif text-[19px] font-bold leading-snug text-[#111] sm:text-[20px]">
    {children}
  </h2>
);
const H3 = ({ children }) => (
  <h3 className="mb-3 mt-6 font-serif text-[16px] font-bold leading-snug text-[#111] sm:text-[17px]">
    {children}
  </h3>
);
const P = ({ children }) => (
  <p className="mb-4 font-serif text-[14px] leading-[26px] text-[#222] sm:text-[15px] sm:leading-[28px]">
    {children}
  </p>
);
const List = ({ items, links = false }) => (
  <ul className="mb-4 list-disc space-y-1 pl-5 font-serif text-[14px] leading-[26px] text-[#222] sm:text-[15px] marker:text-[#222]">
    {items.map((item) =>
      links ? (
        <li key={item.label}>
          <Link to={item.to} className="text-[#1a73c7] transition hover:text-brand-gold hover:underline">
            {item.label}
          </Link>
        </li>
      ) : (
        <li key={item}>{item}</li>
      )
    )}
  </ul>
);

function About() {
  return (
    <>
      <ShopPageHeader title="About Us" breadcrumb={[{ label: "About Us" }]} />

      <section className="mx-auto max-w-[1810px] px-4 pb-16 pt-10 sm:px-6 xl:px-10">
        <h1 className="mb-3 font-serif text-[19px] font-bold leading-snug text-[#111] sm:text-[20px]">
          About Wine &amp; Champagne Gifts (A Unit of Gift22 Inc Wineandchampagnegifts.com)
        </h1>
        <P>
          Wine &amp; Champagne Gifts is one of the best online gifting platform headquartered in Vienna, Virginia,
          United States, specializing in all types of wine gift baskets, champagne gifts, and gift delivery across the
          United States. Our mission is to help people celebrate life&apos;s most meaningful moments with elegant gifts
          that create lasting memories.
        </P>
        <P>
          Whether you are sending a gift for a birthday, anniversary, holiday celebration, wedding, corporate milestone,
          or any other special occasion, Wine &amp; Champagne Gifts makes it easy to deliver something truly memorable.
          Our carefully curated collection includes premium wines, iconic champagne brands, gourmet gift baskets, and
          beautifully customized bottles designed to elevate every celebration.
        </P>
        <P>
          With thousands of satisfied customers every month across the world, Wine &amp; Champagne Gifts has become a
          go-to destination for anyone looking to send thoughtful, luxurious, and affordable wine gifts to friends,
          family, colleagues, or clients in the USA.
        </P>

        <H2>Our Story: Turning Distance into Connection</H2>
        <P>
          Wine has always been associated with celebration, connection, and meaningful moments shared with loved ones.
          The inspiration behind Wine &amp; Champagne Gifts came during one of the most challenging times in modern
          history, the global COVID-19 pandemic.
        </P>
        <P>
          Founded in 2020, Wine &amp; Champagne Gifts was created with a clear purpose to help people stay connected
          even when they were miles apart. During the pandemic, when meeting loved ones wasn&apos;t possible, birthdays
          were missed, anniversaries were celebrated from a distance, and special moments felt incomplete. In those
          times, a thoughtful gift became more than just a gesture, it became a way to say &quot;I&apos;m with
          you,&quot; even from another city or country. Wine &amp; Champagne Gifts was built to bridge that distance,
          helping people share love, emotions, and celebrations no matter where they are.
        </P>
        <P>
          Recognizing this need, we built Wine &amp; Champagne Gifts as a platform where people could easily send
          premium and affordable wine gift baskets and champagne gift baskets anywhere in the United States.
        </P>
        <P>
          We started as a simple idea and quickly grew into a trusted gifting platform that helps thousands of people
          to celebrate special moments, even when they cannot be there in person. At Wine &amp; Champagne Gifts, we have
          built a strong reputation in wine gifting across the United States, driven by customer trust and consistent
          performance. Over the years, we have achieved an average year-on-year growth of over 50%, reflecting our
          commitment to quality and reliability.
        </P>
        <P>Our recent growth highlights this momentum:</P>
        <List items={growth} />
        <P>
          This consistent upward trajectory demonstrates our focus on delivering exceptional online wine delivery
          services. As we continue to grow, we remain committed to ensuring every gift is delivered with care,
          elegance, and a seamless customer experience.
        </P>

        <H2>What We Offer</H2>
        <P>
          At Wine &amp; Champagne Gifts, we believe every celebration deserves something exceptional. Our collection
          features carefully curated gifts designed to suit a wide range of occasions, tastes, and gifting needs.
        </P>

        <H3>Premium And Affordable Wine Gift Baskets</H3>
        <P>
          Our wine gift baskets combine handpicked wines with gourmet treats, chocolates, and artisan snacks to create
          an unforgettable gifting experience. Featuring a collection of 170+ wine brands sourced from renowned wine
          regions around the world, each basket is thoughtfully curated for quality and elegance. These sophisticated
          wine baskets are perfect for birthdays, anniversaries, thank-you gifts, or simply celebrating life&apos;s
          special moments.
        </P>

        <H3>Budget Friendly to Luxury Champagne Gifts</H3>
        <P>
          Champagne has always been the ultimate symbol of celebration. Our collection of luxury champagne gifts
          features world-renowned champagne brands like Veuve Clicquot, Dom Perignon, Krug, Ruinart, Pommery, Pol
          Roger, Moet &amp; Chandon, Louis Roederer, and many more. All are perfectly paired with gourmet delights,
          accessories, Godiva chocolates, cheese and elegant gift packaging. Whether you&apos;re looking for an
          affordable yet elegant champagne gift starting from just $29 or an ultra-luxury champagne gift reaching up to
          $3000, our collection is designed to suit every occasion and budget while maintaining a premium feel.
        </P>

        <H3>Corporate Wine Gifts Solution</H3>
        <P>
          Businesses across the United States trust Wine &amp; Champagne Gifts for corporate wine gifts that leave a
          lasting impression, and we are proud to have served some of the world&apos;s most recognized brands,
          including Louis Vuitton, Shopify, WWE, HBO, Netflix, Deloitte, and Amazon.
        </P>
        <P>
          Corporate gifting is an important way to strengthen relationships with clients, reward employees, and
          celebrate business milestones. Our corporate wine gift baskets are designed to help companies express
          appreciation with elegance and professionalism.
        </P>

        <H2>Holiday &amp; Special Occasion Gifts for Every Recipient</H2>
        <P>
          Throughout the year, Wine &amp; Champagne Gifts offers a wide range of gifts tailored for special occasions,
          including:
        </P>
        <List items={occasions} links />
        <P>
          One of the most unique features of Wine &amp; Champagne Gifts is our range of customized gifting solutions,
          designed to add a personal and memorable touch to every celebration. We offer themed hand-painted wine and
          champagne bottles, along with custom engraving options that can include names, special dates, and even
          company logos for corporate gifting. In addition, our vinyl printing services allow for creative and
          detailed designs, making each bottle truly one-of-a-kind. These beautifully customized bottles transform a
          wine or champagne gift into something far more meaningful.
        </P>

        <H2>Making Online Gifting Simple and Meaningful</H2>
        <P>
          Sending a gift should be easy, convenient, and enjoyable. That&apos;s why Wine &amp; Champagne Gifts is
          designed to provide a seamless online shopping experience. Customers can easily browse curated collections,
          choose the perfect wine or champagne gift, and send it directly to recipients across the United States. With
          elegant packaging and carefully selected products, every gift is designed to create a memorable unboxing
          experience.
        </P>

        <H2>Why Customers Choose Wine &amp; Champagne Gifts</H2>
        <List items={reasons} />
      </section>
    </>
  );
}

export default About;
