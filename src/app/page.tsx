import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertBadges } from "@/components/CertBadges";
import { AboutSection } from "@/components/AboutSection";

export default function HomePage() {
  return (
    <div className="merit-page">
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
      <CertBadges />
    </div>
  );
}
