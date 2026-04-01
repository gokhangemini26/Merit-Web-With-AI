"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageTitle } from "@/components/PageTitle";
import { useSpotlight } from "@/components/SpotlightProvider";

export function AboutSection() {
  const t = useTranslations("home");
  const { highlightId } = useSpotlight();
  const [hovered, setHovered] = useState(false);
  const isHighlighted = highlightId === "about";

  return (
    <section id="about" className={isHighlighted ? "relative z-[90] transition-all duration-500" : ""} style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 570, margin: "0 auto", padding: "0 24px 60px" }}>
      <PageTitle title={t("title")} />
      <div>
        <p style={{ fontSize: 19, fontWeight: 400, color: "#ffffff", textAlign: "center", lineHeight: 1.7, marginBottom: 24, fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif" }}>
          {t("desc1")}
        </p>
        <p style={{ fontSize: 19, fontWeight: 400, color: "#ffffff", textAlign: "center", lineHeight: 1.7, marginBottom: 24, fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif" }}>
          {t("desc2")}
        </p>
      </div>
      <div style={{ marginTop: 8, display: "flex", justifyContent: "center" }}>
        <Link
          href="/contact"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-block",
            border: "1px solid #ffffff",
            borderRadius: 30,
            padding: "12px 32px",
            color: hovered ? "#002e5d" : "#ffffff",
            backgroundColor: hovered ? "#ffffff" : "transparent",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
            transition: "background-color 0.2s, color 0.2s",
          }}
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
