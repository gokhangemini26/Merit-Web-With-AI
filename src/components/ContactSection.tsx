"use client";

import { PageTitle } from "@/components/PageTitle";

export function ContactSection() {
  return (
    <section
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "0 24px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        .merit-input {
          width: 100%;
          background-color: rgba(0, 46, 93, 0.6);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 4px;
          padding: 10px 14px;
          color: rgba(255,255,255,0.7);
          font-size: 15px;
          font-weight: 400;
          outline: none;
          font-family: var(--font-poppins), Poppins, Arial, sans-serif;
          box-sizing: border-box;
        }
        .merit-input::placeholder {
          color: rgba(255,255,255,0.5);
        }
      `}</style>
      <PageTitle title="CONTACT" />
      <div
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: "#ffffff",
          textAlign: "center",
          marginBottom: 32,
          lineHeight: 1.7,
        }}
      >
        <p>Let&apos;s get in touch.</p>
        <p>Send us a message or give us a call.</p>
      </div>
      <form
        style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <input className="merit-input" placeholder="Name" />
        <input className="merit-input" placeholder="Email" />
        <input className="merit-input" placeholder="Phone" />
        <textarea
          className="merit-input"
          placeholder="Type your message here.."
          style={{ minHeight: 100, resize: "vertical" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#ffffff",
            color: "#002e5d",
            border: "none",
            borderRadius: 4,
            padding: "10px 32px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            alignSelf: "flex-start",
            marginTop: 4,
          }}
        >
          Submit
        </button>
      </form>
      <div
        style={{
          width: "100%",
          marginTop: 32,
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 4,
          overflow: "hidden",
          height: 200,
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.8!2d29.098!3d41.115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9b9c7f7e7e7%3A0x0!2sMerit%20Tekstil!5e0!3m2!1sen!2str!4v1"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        />
      </div>
    </section>
  );
}
