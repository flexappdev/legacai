import { C, FONT } from "./legacai-tokens";

export function Mark({
  size = 38,
  color = C.accent,
  radius = 10,
}: {
  size?: number;
  color?: string;
  radius?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        flexShrink: 0,
        background: `linear-gradient(150deg, ${color}, ${color === C.accent ? C.accentDeep : color})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: `0 4px 14px ${color}30`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: radius - 4,
          border: "1px solid rgba(255,255,255,0.35)",
        }}
      />
      <span
        style={{
          fontFamily: FONT.display,
          fontStyle: "italic",
          fontWeight: 600,
          color: "#FDFBF6",
          fontSize: size * 0.55,
          lineHeight: 1,
          marginTop: -size * 0.04,
        }}
      >
        L
      </span>
    </div>
  );
}
