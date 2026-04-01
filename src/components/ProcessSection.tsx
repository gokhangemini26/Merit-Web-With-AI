import React from "react";
import { PageTitle } from "@/components/PageTitle";

const cards = [
  {
    icon: "/images/process/fabric-icon.png",
    title: "FABRIC SOURCING",
    description:
      "Fabrics are carefully sourced to match your specific requirements in composition, performance, and texture. We also offer custom dyeing to meet your exact color specifications, along with additional finishing treatments to enhance softness and overall quality.",
  },
  {
    icon: "/images/process/design-icon.png",
    title: "PROTOTYPES & SAMPLING",
    description:
      "For each order, we develop a prototype for your approval, giving you the opportunity to test and refine the functionality and fit of your design. Once the samples are approved, we proceed with bulk production, ensuring consistency and quality at every stage.",
  },
  {
    icon: "/images/process/tshirt-icon.png",
    title: "BULK MANUFACTURE",
    description:
      "Bulk production takes place on our dedicated production lines, where all items are manufactured to order and carefully monitored throughout each stage. Additional quality inspections are carried out during the finishing process, ensuring every product meets our standards before being carefully packaged for delivery.",
  },
];

export function ProcessSection() {
  return (
    <section
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
      <PageTitle title="PROCESS" />
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
        The production process at Merit consists of several carefully managed
        stages, each designed to ensure the highest standards of quality and
        efficiency.
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
