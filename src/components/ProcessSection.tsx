"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PageTitle } from "@/components/PageTitle";
import { useSpotlight } from "@/components/SpotlightProvider";

export function ProcessSection() {
  const t = useTranslations("process");
  const { highlightId } = useSpotlight();
  const isHighlighted = highlightId === "process";

  const cards = [
    {
      icon: "/images/process/fabric-icon.png",
      title: t("steps.sourcing"),
      description: t("desc_sourcing"),
    },
    {
      icon: "/images/process/design-icon.png",
      title: t("steps.design"),
      description: t("desc_design"),
    },
    {
      icon: "/images/process/tshirt-icon.png",
      title: t("steps.cutting"),
      description: t("desc_manufacturing"),
    },
  ];

  return (
    <section
      id="process"
      className={isHighlighted ? "relative z-[90] transition-all duration-500" : ""}
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "0 24px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .process-cards-row { flex-direction: column; align-items: center; }
          .process-arrow { display: none; }
        }
      `}</style>
      <PageTitle title={t("title")} />
      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.7,
          maxWidth: 480,
          marginBottom: 48,
          fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif",
        }}
      >
        {t("desc")}
      </p>
      <div
        className="process-cards-row"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {cards.map((card, index) => (
          <React.Fragment key={card.title}>
            <div
              style={{
                width: 270,
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 8,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <img
                src={card.icon}
                alt={card.title}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  textAlign: "center",
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#ffffff",
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                {card.description}
              </div>
            </div>
            {index < cards.length - 1 && (
              <div
                className="process-arrow"
                style={{
                  color: "#ffffff",
                  fontSize: 24,
                  display: "flex",
                  alignItems: "center",
                  padding: "60px 16px 0",
                  opacity: 0.7,
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
