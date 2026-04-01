"use client";

import { useTranslations } from "next-intl";
import { PageTitle } from "@/components/PageTitle";
import { useSpotlight } from "@/components/SpotlightProvider";

export function SocialSection() {
  const t = useTranslations("social");
  const { highlightId } = useSpotlight();
  const isHighlighted = highlightId === "social";

  return (
    <section
      id="social"
      className={isHighlighted ? "relative z-[90] transition-all duration-500" : ""}
      style={{
        maxWidth: 570,
        margin: "0 auto",
        padding: "0 24px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .badges-row { flex-direction: column !important; gap: 32px !important; }
        }
      `}</style>
      <PageTitle title={t("title")} />
      <div>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.7,
            marginBottom: 24,
            fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif",
          }}
        >
          {t("desc1")}
        </p>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.7,
            marginBottom: 24,
            fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif",
          }}
        >
          {t("desc2")}
        </p>
      </div>
      <div
        className="badges-row"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          marginTop: 32,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/badges/amfori-bsci.png"
          alt="amfori BSCI"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
        <img
          src="/images/badges/gots.png"
          alt="GOTS"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      </div>
    </section>
  );
}
