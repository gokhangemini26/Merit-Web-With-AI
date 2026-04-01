import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertBadges } from "@/components/CertBadges";
import { ProcessSection } from "@/components/ProcessSection";

export default function ProcessPage() {
  return (
    <div className="merit-page">
      <Header />
      <main>
        <ProcessSection />
      </main>
      <Footer />
      <CertBadges />
    </div>
  );
}
