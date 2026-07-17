import { ImageResponse } from "next/og";

// Route metadata — Next.js generates /icon at build time.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(150deg, #175E54, #0F4A42)",
          borderRadius: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 2,
            right: 2,
            bottom: 2,
            borderRadius: "20%",
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        />
        <span
          style={{
            fontFamily:
              "Georgia, 'Playfair Display', 'Times New Roman', serif",
            fontStyle: "italic",
            fontWeight: 700,
            color: "#FDFBF6",
            fontSize: 22,
            lineHeight: 1,
            marginTop: -2,
          }}
        >
          L
        </span>
      </div>
    ),
    { ...size },
  );
}
