"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navItems = [
    { label: t("about"), href: "/" },
    { label: t("process"), href: "/process" },
    { label: t("products"), href: "/products" },
    { label: t("clients"), href: "/clients" },
    { label: t("social"), href: "/social-responsibility" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header
      style={{
        paddingTop: "13px",
        height: "142px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <img
          src="/images/logo.png"
          alt="Merit Textile LTD."
          style={{ width: "180px", height: "auto" }}
        />
      </div>
      <nav style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            listStyle: "none",
            gap: 0,
            padding: 0,
            margin: 0,
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: isActive ? "#f0d5d5" : "#ffffff",
                    textDecoration: "none",
                    padding: "0 12px",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
