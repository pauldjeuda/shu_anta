import { useEffect, useRef, useState } from "react";

type FitTextProps = {
  text: string;
  /** Largeur cible en % de .stage (ex. 95) */
  targetCqw: number;
  className?: string;
  as?: "h1" | "p" | "span" | "div";
  /** Appliquer le léger élargissement didone (défaut true) */
  wide?: boolean;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
};

/**
 * Calcule font-size via mesure DOM réelle (pas canvas) pour coller à Bodoni chargée.
 */
export default function FitText({
  text,
  targetCqw,
  className = "",
  as: Tag = "div",
  wide = true,
  ...aria
}: FitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const probe = document.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    Object.assign(probe.style, {
      position: "absolute",
      left: "-9999px",
      top: "0",
      visibility: "hidden",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      margin: "0",
      padding: "0",
      letterSpacing: "-0.01em",
      fontFamily: "var(--font-display)",
      fontWeight: "400",
      lineHeight: "0.8",
      transform: wide ? "scaleX(1.03)" : "none",
      transformOrigin: "left center",
    });
    document.body.appendChild(probe);

    const fit = () => {
      const parent = el.closest(".stage") as HTMLElement | null;
      const stageW = parent?.clientWidth || window.innerWidth;
      const target = (targetCqw / 100) * stageW;
      if (target <= 0) return;

      probe.textContent = text;
      let lo = 8;
      let hi = Math.max(stageW * 0.9, 120);
      let best = lo;

      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        probe.style.fontSize = `${mid}px`;
        const w = probe.getBoundingClientRect().width;
        if (w <= target) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }

      // Marge de sécurité (scaleX + anti-débordement horizontal)
      el.style.fontSize = `${best * 0.96}px`;
      if (!cancelled) setReady(true);
    };

    const run = async () => {
      try {
        await document.fonts.ready;
      } catch {
        /* ignore */
      }
      fit();
    };

    run();
    const ro = new ResizeObserver(fit);
    const stage = el.closest(".stage");
    if (stage) ro.observe(stage);
    else ro.observe(document.documentElement);
    window.addEventListener("resize", fit);

    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("resize", fit);
      probe.remove();
    };
  }, [text, targetCqw, wide]);

  return (
    <Tag
      ref={ref as never}
      className={`font-display whitespace-nowrap ${wide ? "font-display-wide" : ""} ${className}`}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 120ms ease",
        transformOrigin: "center bottom",
      }}
      {...aria}
    >
      {text}
    </Tag>
  );
}
