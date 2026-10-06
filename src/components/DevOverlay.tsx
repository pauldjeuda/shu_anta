import { useEffect, useState } from "react";

/**
 * Dev-only overlay: activate with ?overlay=1
 * Keys: O toggle, [ ] opacity
 */
export default function DevOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("overlay") === "1") setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "o" || e.key === "O") setVisible((v) => !v);
      if (e.key === "[") setOpacity((o) => Math.max(0.1, o - 0.1));
      if (e.key === "]") setOpacity((o) => Math.min(1, o + 0.1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);

  if (!enabled || !visible) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[100] mx-auto hidden w-full max-w-[1440px] min-[900px]:block"
      aria-hidden
    >
      <img
        src="/design/reference-card.png"
        alt=""
        className="h-full w-full object-contain object-top"
        style={{
          opacity,
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
