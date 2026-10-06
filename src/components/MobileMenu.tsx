import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useT } from "../i18n/LocaleContext";

type Props = {
  open: boolean;
  onClose: () => void;
  ink?: "dark" | "cream";
};

export default function MobileMenu({ open, onClose, ink = "dark" }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const t = useT();

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => firstLink.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target)) {
        const btn = (e.target as HTMLElement)?.closest?.(
          "[aria-controls='mobile-menu']",
        );
        if (!btn) onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open, onClose]);

  const isDark = ink === "dark";
  const panelTone = isDark
    ? "bg-[rgba(238,236,232,0.92)] text-[var(--ink-green)] border-[rgba(47,58,38,0.12)]"
    : "bg-[rgba(47,58,38,0.88)] text-[var(--cream)] border-[rgba(255,255,255,0.2)]";
  const linkHover = isDark
    ? "hover:bg-[rgba(47,58,38,0.06)]"
    : "hover:bg-[rgba(255,255,255,0.08)]";

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      className={`absolute left-0 right-0 z-[55] origin-top overflow-hidden border backdrop-blur-[16px] backdrop-saturate-[120%] lg:hidden ${panelTone}`}
      style={{
        top: "calc(100% + 10px)",
        borderRadius: "22px",
        boxShadow: "0 12px 40px rgba(47,58,38,0.14), 0 2px 8px rgba(47,58,38,0.06)",
        maxHeight: open ? "420px" : "0px",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)",
        pointerEvents: open ? "auto" : "none",
        transition:
          "max-height 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease, transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      role="menu"
      aria-hidden={!open}
      aria-label="Menu"
    >
      <nav className="flex flex-col px-2 py-2" aria-label="Menu mobile">
        {t.navItems.map((item, i) => (
          <Link
            key={item.path}
            ref={i === 0 ? firstLink : undefined}
            to={item.path}
            role="menuitem"
            onClick={onClose}
            className={`rounded-2xl px-4 py-3.5 font-sans font-medium transition-colors duration-200 ${linkHover}`}
            style={{
              fontSize: "15px",
              letterSpacing: "0.01em",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-6px)",
              transition: `opacity 320ms ease ${60 + i * 40}ms, transform 360ms cubic-bezier(0.22, 1, 0.36, 1) ${60 + i * 40}ms`,
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
