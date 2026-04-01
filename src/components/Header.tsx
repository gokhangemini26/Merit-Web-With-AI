"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "About Us", href: "/" },
  { label: "Process", href: "/process" },
  { label: "Products", href: "/products" },
  { label: "Clients", href: "/clients" },
  { label: "Social Responsibility", href: "/social-responsibility" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

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
