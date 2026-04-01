export function Footer() {
  return (
    <footer
      style={{
        paddingTop: "30px",
        paddingBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "0 32px",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 400,
          }}
        >
          <img
            src="/images/icons/pin.png"
            alt=""
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
          <span>Istanbul, Turkey</span>
        </div>
        <div
          style={{
            width: "1px",
            height: "40px",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "0 32px",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 400,
          }}
        >
          <img
            src="/images/icons/email.png"
            alt=""
            style={{ width: "24px", height: "20px", objectFit: "contain" }}
          />
          <a
            href="mailto:contact@meritteks.com"
            style={{ color: "#ffffff", textDecoration: "none", fontSize: "13px" }}
          >
            contact@meritteks.com
          </a>
        </div>
        <div
          style={{
            width: "1px",
            height: "40px",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "0 32px",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 400,
          }}
        >
          <img
            src="/images/icons/phone.png"
            alt=""
            style={{ width: "19px", height: "20px", objectFit: "contain" }}
          />
          <span>+90 216 425 71 46</span>
        </div>
      </div>
      <p
        style={{
          position: "fixed",
          bottom: "8px",
          left: "16px",
          fontSize: "13px",
          fontWeight: 400,
          color: "#ffffff",
          margin: 0,
        }}
      >
        © 2026 Merit. All rights reserved.
      </p>
    </footer>
  );
}
