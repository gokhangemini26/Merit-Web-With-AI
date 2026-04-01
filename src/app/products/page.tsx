import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertBadges } from "@/components/CertBadges";
import { ProductsSection } from "@/components/ProductsSection";

export default function ProductsPage() {
  return (
    <div className="merit-page">
      <Header />
      <main>
        <ProductsSection />
      </main>
      <Footer />
      <CertBadges />
    </div>
  );
}
