import { useEffect, useState } from "react";
import { getClients } from "../../services/api";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import Marquee from "../ui/Marquee";

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    let active = true;
    getClients()
      .then((list) => active && setClients(list))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Nothing to show (loading, error or empty list): hide the whole section
  if (clients.length === 0) return null;

  return (
    <Section className="bg-white">
      <SectionHeader
        eyebrow="Preferred by Connoisseurs"
        title="Our Esteemed Clients"
        text="Serving a distinguished community of high-end clients who set the standard for excellence."
      />

      <Marquee
        items={clients}
        secondsPerItem={3}
        fade="from-white"
        gapClassName="gap-10 sm:gap-14 lg:gap-20"
        className="mt-8 lg:mt-10"
        render={(client) => (
          <img
            src={client.logo}
            alt="Client logo"
            loading="lazy"
            draggable={false}
            className="h-10 w-auto max-w-[140px] object-contain grayscale transition duration-300 hover:grayscale-0 sm:h-12 sm:max-w-[170px] lg:h-14 lg:max-w-[200px]"
          />
        )}
      />
    </Section>
  );
}

export default Clients;
