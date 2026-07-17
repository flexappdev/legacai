import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(150deg, #175E54, #0F4A42)",
          borderRadius: "22%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            bottom: 12,
            borderRadius: "20%",
            border: "3px solid rgba(255,255,255,0.35)",
          }}
        />
        <span
          style={{
            fontFamily:
              "Georgia, 'Playfair Display', 'Times New Roman', serif",
            fontStyle: "italic",
            fontWeight: 700,
            color: "#FDFBF6",
            fontSize: 118,
            lineHeight: 1,
            marginTop: -8,
          }}
        >
          L
        </span>
      </div>
    ),
    { ...size },
  );
}
