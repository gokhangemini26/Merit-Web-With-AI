import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertBadges } from "@/components/CertBadges";
import { SocialSection } from "@/components/SocialSection";

export default function SocialResponsibilityPage() {
  return (
    <div className="merit-page">
      <Header />
      <main>
        <SocialSection />
      </main>
      <Footer />
      <CertBadges />
    </div>
  );
}
