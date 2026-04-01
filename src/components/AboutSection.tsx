"use client";

import { useState } from "react";
import { PageTitle } from "@/components/PageTitle";

export function AboutSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 570, margin: "0 auto", padding: "0 24px 60px" }}>
      <PageTitle title="ABOUT US" />
      <div>
        <p style={{ fontSize: 19, fontWeight: 400, color: "#ffffff", textAlign: "center", lineHeight: 1.7, marginBottom: 24, fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif" }}>
          We are an Istanbul-based jersey manufacturer specializing in high-quality and exclusive garments. With over 30 years of experience in the textile industry, we are committed to operating at the highest standards and continuously bringing the latest fabric innovations and industrial trends to our clients.
        </p>
        <p style={{ fontSize: 19, fontWeight: 400, color: "#ffffff", textAlign: "center", lineHeight: 1.7, marginBottom: 24, fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif" }}>
          Our team of highly skilled professionals is dedicated to meeting the day-to-day challenges of the industry with passion and expertise. At Merit, we strongly believe in the power of teamwork. We take pride in being actively involved in every project we undertake, ensuring excellence at every stage of production.
        </p>
      </div>
      <div style={{ marginTop: 8, display: "flex", justifyContent: "center" }}>
        <a
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
          Get in touch now!
        </a>
      </div>
    </section>
  );
}
