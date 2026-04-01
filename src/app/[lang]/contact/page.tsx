import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertBadges } from "@/components/CertBadges";
import { ContactSection } from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="merit-page">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
      <CertBadges />
    </div>
  );
}
