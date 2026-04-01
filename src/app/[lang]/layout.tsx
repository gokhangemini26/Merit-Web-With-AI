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
