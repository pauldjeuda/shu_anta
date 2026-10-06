import { useEffect, useState } from "react";

type Variant = "auto" | "color" | "green" | "cream" | "sage";
type Part = "full" | "mark";

type LogoProps = {
  variant?: Variant;
  part?: Part;
  className?: string;
  theme?: "dark" | "light" | "photo";
};

const SRC: Record<string, string> = {
  "full-color": "/brand/logo-color.png",
  "full-green": "/brand/logo-green.png",
  "full-cream": "/brand/logo-cream.png",
  "full-sage": "/brand/logo-sage.png",
  "mark-color": "/brand/logo-mark-color.png",
  "mark-green": "/brand/logo-mark-green.png",
  "mark-cream": "/brand/logo-mark-cream.png",
  "mark-sage": "/brand/logo-mark-sage.png",
};

function resolveVariant(variant: Variant, theme: "dark" | "light" | "photo") {
  if (variant !== "auto") return variant;
  if (theme === "photo" || theme === "dark") return "cream";
  return "green";
}

export default function Logo({
  variant = "auto",
  part = "full",
  className = "",
  theme = "light",
}: LogoProps) {
  const [resolved, setResolved] = useState(() => resolveVariant(variant, theme));

  useEffect(() => {
    setResolved(resolveVariant(variant, theme));
  }, [variant, theme]);

  const key = `${part}-${resolved}`;
  const src = SRC[key] || SRC["full-green"];

  return (
    <img
      src={src}
      alt="SHU ANTA"
      className={`object-contain ${className}`}
      width={part === "mark" ? 64 : 160}
      height={part === "mark" ? 64 : 64}
      decoding="async"
    />
  );
}
