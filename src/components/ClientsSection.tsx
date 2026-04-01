"use client";

import { useTranslations } from "next-intl";
import { PageTitle } from "@/components/PageTitle";
import { useSpotlight } from "@/components/SpotlightProvider";

const clients = [
  { src: "/images/clients/ermenegildo-zegna.png", alt: "Ermenegildo Zegna" },
  { src: "/images/clients/eden-park.png", alt: "Eden Park Paris" },
  { src: "/images/clients/fay.png", alt: "Fay" },
  { src: "/images/clients/hackett.png", alt: "Hackett London" },
  { src: "/images/clients/hartford.png", alt: "Hartford" },
  { src: "/images/clients/falke.png", alt: "FALKE" },
  { src: "/images/clients/beymen.png", alt: "BEYMEN" },
  { src: "/images/clients/network.png", alt: "NetWork" },
  { src: "/images/clients/axel-arigato.png", alt: "Axel Arigato" },
];

export function ClientsSection() {
  const t = useTranslations("clients");
  const { highlightId } = useSpotlight();
  const isHighlighted = highlightId === "clients";

  return (
    <section
      id="clients"
      className={isHighlighted ? "relative z-[90] transition-all duration-500" : ""}
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "0 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PageTitle title={t("title")} />
      <div className="text-base lg:text-lg font-normal text-white text-center leading-relaxed mb-12 font-[var(--font-poppins)]">
        <p>{t("desc1")}</p>
        <p>{t("desc2")}</p>
      </div>
      <div className="clients-grid grid grid-cols-3 w-full max-w-[900px]">
        {clients.map((client) => (
          <div
            key={client.alt}
            className="flex items-center justify-center min-h-[100px]"
          >
            <img
              src={client.src}
              alt={client.alt}
              className="max-w-[160px] max-h-[100px] object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
