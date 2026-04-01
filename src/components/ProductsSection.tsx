"use client";

import { useState } from "react";
import Image from "next/image";
import { PageTitle } from "@/components/PageTitle";

const slides = [
  {
    brand: "AXEL ARIGATO",
    badge: "🌿 ORGANIC COTTON",
    imageSrc: "/images/clients/axel-arigato.png",
    imageAlt: "Axel Arigato product",
  },
  {
    brand: "ERMENEGILDO ZEGNA",
    badge: "✨ PREMIUM WOOL",
    imageSrc: "/images/clients/ermenegildo-zegna.png",
    imageAlt: "Ermenegildo Zegna product",
  },
  {
    brand: "HACKETT LONDON",
    badge: "👔 SLIM FIT",
    imageSrc: "/images/clients/hackett.png",
    imageAlt: "Hackett London product",
  },
];

export function ProductsSection() {
  const [current, setCurrent] = useState(0);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  const prev = () => setCurrent((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === slides.length - 1 ? 0 : i + 1));

  const slide = slides[current];

  return (
    <section
      style={{
        maxWidth: 570,
        margin: "0 auto",
        padding: "0 24px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PageTitle title="PRODUCTS" />
      <p
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.7,
          marginBottom: 32,
          maxWidth: 480,
        }}
      >
        We have unique access to a selection of highly specialized manufacturers
        of fabrics and materials. We combine these highly specialized materials
        to produce the highest quality polo shirts, t-shirts, sweatshirts, and
        hoodies. You can see some of the products we&apos;ve made below.
      </p>
      <div
        className="carousel"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          width: "100%",
        }}
      >
        <button
          className="prev"
          onClick={prev}
          onMouseEnter={() => setPrevHover(true)}
          onMouseLeave={() => setPrevHover(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "#ffffff",
            fontSize: 36,
            fontWeight: 300,
            cursor: "pointer",
            padding: "0 8px",
            opacity: prevHover ? 1 : 0.8,
          }}
        >
          ‹
        </button>
        <div
          className="slide"
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 4,
            padding: 16,
            textAlign: "center",
          }}
        >
          <div className="slide-inner">
            <p
              className="brand"
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: 2,
                textTransform: "uppercase",
                margin: "0 0 4px 0",
              }}
            >
              {slide.brand}
            </p>
            <span
              className="badge"
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              {slide.badge}
            </span>
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              width={200}
              height={220}
              style={{
                objectFit: "contain",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>
        </div>
        <button
          className="next"
          onClick={next}
          onMouseEnter={() => setNextHover(true)}
          onMouseLeave={() => setNextHover(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "#ffffff",
            fontSize: 36,
            fontWeight: 300,
            cursor: "pointer",
            padding: "0 8px",
            opacity: nextHover ? 1 : 0.8,
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}
