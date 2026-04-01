import { PageTitle } from "@/components/PageTitle";

const clients = [
  { src: "/images/clients/ermenegildo-zegna.png", alt: "Ermenegildo Zegna" },
  { src: "/images/clients/eden-park.png", alt: "Eden Park Paris" },
  { src: "/images/clients/fay.png", alt: "Fay" },
  { src: "/images/clients/hackett.png", alt: "Hackett London" },
  { src: "/images/clients/hartford.png", alt: "Hartford" },
  { src: "/images/clients/falke.png", alt: "FALKE" },
  { src: "/images/clients/beymen.png", alt: "BEYMEN" },
  { src: "/images/clients/network.png", alt: "NetWork" },
  { src: "/images/clients/axel-arigato.png", alt: "Axel Arigato" },
];

export function ClientsSection() {
  return (
    <section
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "0 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .clients-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .clients-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <PageTitle title="CLIENTS" />
      <div
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.7,
          marginBottom: 48,
          fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif",
        }}
      >
        <p>You&apos;re in good company.</p>
        <p>Trusted by the world&apos;s leading clothing retailers.</p>
      </div>
      <div
        className="clients-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px 60px",
          width: "100%",
          maxWidth: 900,
        }}
      >
        {clients.map((client) => (
          <div
            key={client.alt}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 100,
            }}
          >
            <img
              src={client.src}
              alt={client.alt}
              style={{
                maxWidth: 200,
                maxHeight: 100,
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
