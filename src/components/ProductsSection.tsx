"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageTitle } from "@/components/PageTitle";
import { useSpotlight } from "@/components/SpotlightProvider";
import { useEffect } from "react";

export function ProductsSection() {
  const t = useTranslations("products");
  const { highlightId } = useSpotlight();
  const [current, setCurrent] = useState(0);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);
  const isHighlighted = highlightId === "products";

  const slides = [
    {
      brand: "AXEL ARIGATO",
      badge: t("badges.organic"),
      imageSrc: "/images/clients/axel-arigato.png",
      imageAlt: "Axel Arigato product",
    },
    {
      brand: "ERMENEGILDO ZEGNA",
      badge: t("badges.wool"),
      imageSrc: "/images/clients/ermenegildo-zegna.png",
      imageAlt: "Ermenegildo Zegna product",
    },
    {
      brand: "HACKETT LONDON",
      badge: t("badges.slim"),
      imageSrc: "/images/clients/hackett.png",
      imageAlt: "Hackett London product",
    },
  ];

  const prev = () => setCurrent((i: number) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setCurrent((i: number) => (i === slides.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const handleNext = () => next();
    window.addEventListener("merit:next-product", handleNext);
    return () => window.removeEventListener("merit:next-product", handleNext);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      id="products"
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
          .carousel { gap: 8px !important; }
          .carousel button { font-size: 24px !important; padding: 0 4px !important; }
          .slide-inner img { width: 150px !important; height: auto !important; }
          .slide { padding: 12px !important; }
        }
      `}</style>
      <PageTitle title={t("title")} />
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
        {t("desc")}
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
