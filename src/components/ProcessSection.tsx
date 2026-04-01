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
      <PageTitle title={t("title")} />
      <p className="text-lg font-semibold text-white text-center leading-relaxed max-w-[480px] mb-12 font-[var(--font-poppins)]">
        {t("desc")}
      </p>
      
      <div className="process-row flex flex-row items-start justify-center w-full">
        {cards.map((card, index) => (
          <React.Fragment key={card.title}>
            <div className="process-card border border-white/30 rounded-lg p-6 flex flex-col items-center gap-3 transition-transform hover:scale-105 bg-white/5 backdrop-blur-sm">
              <img
                src={card.icon}
                alt={card.title}
                className="w-10 h-10 object-contain mb-2"
              />
              <div className="text-[14px] font-bold text-white uppercase tracking-wider text-center">
                {card.title}
              </div>
              <div className="text-[15px] font-normal text-white/80 text-center leading-relaxed">
                {card.description}
              </div>
            </div>
            {index < cards.length - 1 && (
              <div className="process-arrow lg-flex text-white text-2xl items-center px-4 pt-16 opacity-50">
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
