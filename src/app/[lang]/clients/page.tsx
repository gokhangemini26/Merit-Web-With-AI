import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertBadges } from "@/components/CertBadges";
import { ClientsSection } from "@/components/ClientsSection";

export default function ClientsPage() {
  return (
    <div className="merit-page">
      <Header />
      <main>
        <ClientsSection />
      </main>
      <Footer />
      <CertBadges />
    </div>
  );
}
