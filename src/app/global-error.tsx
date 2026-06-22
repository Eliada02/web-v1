"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <body
        style={{
          minHeight: "100vh",
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "var(--font-sans), system-ui, -apple-system, Segoe UI, sans-serif",
          background: "#ffffff",
          color: "#000080",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#e2620c",
              margin: 0,
            }}
          >
            Errore
          </p>
          <h1
            style={{
              marginTop: "0.75rem",
              fontSize: "1.875rem",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Qualcosa è andato storto.
          </h1>
          <p style={{ marginTop: "1rem", color: "#5b5b73" }}>
            Si è verificato un errore imprevisto. Riprova oppure ricarica la
            pagina.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              border: "none",
              background: "#e2620c",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.75rem 1.5rem",
              cursor: "pointer",
            }}
          >
            Riprova
          </button>
        </div>
      </body>
    </html>
  );
}
