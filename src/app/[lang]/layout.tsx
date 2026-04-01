import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { AIConsultant } from "@/components/AI-Consultant";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const poppins = localFont({
  src: [
    { path: "../../../public/fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Merit Textile LTD. | Premium Ready-to-Wear",
  description: "Istanbul-based jersey manufacturer specializing in high-quality and exclusive garments.",
  icons: { icon: "/seo/favicon.png" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { SpotlightProvider } from "@/components/SpotlightProvider";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{lang: string}>;
}) {
  const { lang } = await params;
  
  if (!routing.locales.includes(lang as any)) {
    notFound();
  }

  // Load messages on server
  const messages = await getMessages();

  return (
    <html lang={lang} className={`h-full ${poppins.variable}`}>
      <head>
        <style>{`
          @media (max-width: 1024px) {
            .lg\\:hidden, .lg-hidden { display: none !important; }
            .mobile-flex { display: flex !important; }
            .mobile-col { flex-direction: column !important; }
            .process-row { flex-direction: column !important; align-items: center !important; gap: 32px !important; }
            .process-card { width: 100% !important; max-width: 320px !important; margin-bottom: 20px; }
            .process-arrow { display: none !important; }
            .clients-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
            .merit-nav-desktop { display: none !important; }
            .hamburger-btn { display: flex !important; }
            .merit-header { height: auto !important; padding-bottom: 15px !important; }
            .footer-row { flex-direction: column !important; align-items: center !important; gap: 20px !important; }
            .footer-divider { display: none !important; }
          }
          @media (min-width: 1025px) {
            .mobile-only { display: none !important; }
            .lg-flex { display: flex !important; }
          }
          body { overflow-x: hidden !important; width: 100% !important; }
          html { overflow-x: hidden !important; }
        `}</style>
      </head>
      <body className="min-h-full">
        <NextIntlClientProvider messages={messages} locale={lang}>
          <SpotlightProvider>
            {children}
            <AIConsultant />
          </SpotlightProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
