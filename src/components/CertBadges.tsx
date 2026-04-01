export function CertBadges() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 100,
      }}
    >
      <img
        src="/images/badges/amfori-bsci.png"
        alt="amfori BSCI"
        style={{ width: "73px", height: "73px", objectFit: "contain" }}
      />
      <img
        src="/images/badges/gots.png"
        alt="GOTS certification"
        style={{ width: "73px", height: "73px", objectFit: "contain" }}
      />
    </div>
  );
}
