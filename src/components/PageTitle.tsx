export function PageTitle({ title }: { title: string }) {
  return (
    <div style={{ textAlign: "center", paddingTop: "40px", marginBottom: "0" }}>
      <h2
        style={{
          fontSize: "35px",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "8px",
          fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif",
          margin: "0 0 8px 0",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: "240px",
          height: "2px",
          backgroundColor: "#e63946",
          margin: "0 auto 32px",
        }}
      />
    </div>
  );
}
