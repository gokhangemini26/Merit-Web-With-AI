import { PageTitle } from "@/components/PageTitle";

export function SocialSection() {
  return (
    <section
      style={{
        maxWidth: 570,
        margin: "0 auto",
        padding: "0 24px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PageTitle title="SOCIAL RESPONSIBILITY" />
      <div>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.7,
            marginBottom: 24,
            fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif",
          }}
        >
          We maintain full compliance with all applicable government regulations as well as our clients&apos; specific requirements. We are BSCI-certified(Grade A) and frequently collaborate with independent third-party quality assurance companies to continuously enhance our product quality and operational standards.
        </p>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.7,
            marginBottom: 24,
            fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif",
          }}
        >
          We are also GOTS-certified, ensuring that our organic cotton is sourced and processed according to the highest ethical and environmental standards — from seed to stitch, and ultimately to the finished product.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          marginTop: 32,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/badges/amfori-bsci.png"
          alt="amfori BSCI"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
        <img
          src="/images/badges/gots.png"
          alt="GOTS"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      </div>
    </section>
  );
}
