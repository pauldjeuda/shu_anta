/**
 * Transition page → footer : ondulations lentes et continues (2 tons).
 */
export default function FooterWaves() {
  return (
    <div
      className="footer-waves relative w-full overflow-hidden leading-none"
      style={{ height: "clamp(56px, 8vw, 96px)", background: "var(--page)" }}
      aria-hidden
    >
      <div className="footer-wave-track footer-wave-track--back">
        <WaveSvg fill="var(--sage-soft)" className="footer-wave-svg" />
        <WaveSvg fill="var(--sage-soft)" className="footer-wave-svg" />
      </div>
      <div className="footer-wave-track footer-wave-track--front">
        <WaveSvg fill="var(--footer)" className="footer-wave-svg" phase="front" />
        <WaveSvg fill="var(--footer)" className="footer-wave-svg" phase="front" />
      </div>

      <style>{`
        .footer-wave-track {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          width: 200%;
          height: 100%;
          will-change: transform;
        }
        .footer-wave-track--back {
          opacity: 0.95;
          animation: footer-wave-drift 42s linear infinite;
        }
        .footer-wave-track--front {
          animation: footer-wave-drift 56s linear infinite reverse;
          bottom: -2px;
        }
        .footer-wave-svg {
          display: block;
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
        }
        @keyframes footer-wave-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-wave-track--back,
          .footer-wave-track--front {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Vague sinusoïdale douce : y début = y fin pour un raccord seamless
 * (évite les pics aux jointures entre tuiles).
 */
function WaveSvg({
  fill,
  className,
  phase = "back",
}: {
  fill: string;
  className?: string;
  phase?: "back" | "front";
}) {
  // Courbes longues et peu profondes, extrémités alignées (y=68)
  const d =
    phase === "front"
      ? "M0,68 C160,68 200,42 360,42 C520,42 560,88 720,88 C880,88 920,50 1080,50 C1240,50 1280,68 1440,68 L1440,120 L0,120 Z"
      : "M0,68 C140,68 220,48 360,48 C500,48 580,82 720,82 C860,82 940,54 1080,54 C1220,54 1300,68 1440,68 L1440,120 L0,120 Z";

  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={fill} d={d} />
    </svg>
  );
}
