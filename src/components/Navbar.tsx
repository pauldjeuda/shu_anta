import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { useCart } from "../cart/CartContext";
import { useLocale, useT } from "../i18n/LocaleContext";

/** Encre navbar : dark = texte/logo foncés, cream = texte/logo clairs */
type NavInk = "dark" | "cream";

function sampleImageLuminance(img: HTMLImageElement): number {
  try {
    const canvas = document.createElement("canvas");
    const w = 80;
    const h = 28;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx || !img.naturalWidth) return 0.5;
    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      Math.max(1, img.naturalHeight * 0.28),
      0,
      0,
      w,
      h,
    );
    const { data } = ctx.getImageData(0, 0, w, h);
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum += (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
    }
    return sum / (data.length / 4);
  } catch {
    return 0.5;
  }
}

export default function Navbar() {
  const [ink, setInk] = useState<NavInk>("dark");
  const [heroBright, setHeroBright] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const t = useT();
  const { locale, toggleLocale } = useLocale();
  const navId = useId();
  const barRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const img = document.querySelector("#hero img") as HTMLImageElement | null;
    if (!img) {
      setHeroBright(true);
      return;
    }

    const analyze = () => {
      const lum = sampleImageLuminance(img);
      const bright = lum >= 0.42;
      setHeroBright(bright);
      document.getElementById("hero")?.setAttribute(
        "data-nav-ink",
        bright ? "dark" : "cream",
      );
    };

    if (img.complete && img.naturalWidth) analyze();
    else img.addEventListener("load", analyze, { once: true });
  }, [location.pathname]);

  useEffect(() => {
    const resolveInk = (): NavInk => {
      const bar = barRef.current;
      const y = bar
        ? bar.getBoundingClientRect().top + bar.getBoundingClientRect().height / 2
        : 36;

      const themed = document.querySelectorAll<HTMLElement>("[data-theme]");
      let theme: string | null = null;
      themed.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) {
          theme = el.getAttribute("data-theme");
        }
      });

      const footer = document.querySelector("footer");
      if (footer) {
        const fr = footer.getBoundingClientRect();
        if (fr.top <= y && fr.bottom >= y) return "cream";
      }

      if (theme === "photo") {
        // Hero d’accueil : contraste selon luminosité image
        const hero = document.getElementById("hero");
        if (hero) {
          const hr = hero.getBoundingClientRect();
          if (hr.top <= y && hr.bottom >= y) {
            return heroBright ? "dark" : "cream";
          }
        }
        // Autres bandeaux photo high-key (comme l’accueil) → encre foncée
        return "dark";
      }
      if (theme === "dark") return "cream";
      return "dark";
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      setInk(resolveInk());
    };
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [heroBright, location.pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const logoTheme = ink === "cream" ? "photo" : "light";
  const glass =
    ink === "dark"
      ? "bg-[rgba(238,236,232,0.72)] text-[var(--ink-green)] border-[rgba(47,58,38,0.16)]"
      : "bg-[rgba(255,255,255,0.18)] text-[var(--cream)] border-[rgba(255,255,255,0.45)]";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className="pointer-events-auto relative mx-auto w-full max-w-[1600px]"
        style={{
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
          paddingTop: "clamp(10px, calc(var(--u) * 2.8), 22px)",
        }}
      >
        <div className="relative">
          <div
            ref={barRef}
            id={navId}
            className={`flex items-center gap-3 border backdrop-blur-[14px] backdrop-saturate-[120%] transition-[background-color,color,border-color] duration-300 ease-out ${glass}`}
            style={{
              height: "52px",
              borderRadius: "999px",
              paddingInline: "clamp(14px, calc(var(--u) * 2), 22px)",
            }}
            data-nav-ink={ink}
          >
            <Link
              to="/"
              className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden sm:h-9 sm:w-9"
              aria-label={`SHU ANTA — ${t.nav.home}`}
            >
              <Logo
                part="mark"
                theme={logoTheme}
                className="h-full w-full object-contain"
              />
            </Link>

            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-x-[clamp(10px,1.4vw,22px)] xl:gap-x-[clamp(14px,1.8vw,28px)] lg:flex"
              aria-label={t.nav.mainNav}
            >
              {t.navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `shrink-0 whitespace-nowrap font-sans font-normal transition-opacity hover:opacity-80 ${
                      isActive ? "opacity-100 underline underline-offset-4" : "opacity-90"
                    }`
                  }
                  style={{ fontSize: "clamp(11px, calc(var(--u) * 1.15), 14px)" }}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center lg:hidden"
                aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? (
                  <X strokeWidth={1.25} className="h-5 w-5" />
                ) : (
                  <Menu strokeWidth={1.25} className="h-5 w-5" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleLocale}
                className="flex h-10 min-w-10 items-center justify-center px-1.5 font-sans tracking-[0.06em]"
                style={{ fontSize: "11px" }}
                aria-label={t.nav.langSwitch}
              >
                <span className={locale === "fr" ? "opacity-100" : "opacity-40"}>FR</span>
                <span className="mx-0.5 opacity-35">/</span>
                <span className={locale === "en" ? "opacity-100" : "opacity-40"}>EN</span>
              </button>
              <Link
                to="/panier"
                className="relative flex h-10 w-10 items-center justify-center"
                aria-label={`${t.nav.cart}${count ? ` (${count})` : ""}`}
              >
                <ShoppingCart strokeWidth={1.25} className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sage text-[10px] text-white">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <MobileMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            ink={ink}
          />
        </div>
      </div>
    </header>
  );
}
