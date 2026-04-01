"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: t("about"), href: "/" },
    { label: t("process"), href: "/process" },
    { label: t("products"), href: "/products" },
    { label: t("clients"), href: "/clients" },
    { label: t("social"), href: "/social-responsibility" },
    { label: t("contact"), href: "/contact" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="merit-header relative z-50 flex flex-col items-center pt-3 bg-transparent">
      <div className="mb-4 lg:mb-[15px] pt-4 lg:pt-0">
        <Link href="/" onClick={closeMenu}>
          <img
            src="/images/logo.png"
            alt="Merit Textile LTD."
            className="w-[120px] lg:w-[160px] h-auto"
          />
        </Link>
      </div>

      <button
        className="mobile-only absolute right-6 top-8 text-white z-[1100]"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <nav className="merit-nav-desktop lg-flex w-full justify-center">
        <ul className="flex flex-row list-none gap-0 p-0 m-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-bold text-[15px] px-3 uppercase tracking-wider transition-colors ${isActive ? 'text-[#f0d5d5]' : 'text-white hover:text-[#f0d5d5]'}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-[#002e5d] z-[1050] flex flex-col items-center justify-center p-6"
          >
            <ul className="list-none p-0 m-0 text-center space-y-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`text-2xl font-bold uppercase tracking-widest ${isActive ? 'text-[#f0d5d5]' : 'text-white'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
