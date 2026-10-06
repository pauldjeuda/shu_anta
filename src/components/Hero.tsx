import FitText from "./FitText";
import { BRAND } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

export default function Hero() {
  const t = useT();
  return (
    <section
      id="hero"
      data-theme="photo"
      data-nav-ink="dark"
      className="relative w-full overflow-hidden rounded-none"
      aria-label="SHU ANTA"
    >
      <div className="pointer-events-none absolute inset-0 rounded-none">
        <picture className="absolute inset-0 block h-full w-full">
          <source
            type="image/webp"
            srcSet="/images/hero_bg-640.webp?v=5 640w, /images/hero_bg-1024.webp?v=5 1024w, /images/hero_bg-1600.webp?v=5 1600w, /images/hero_bg-2400.webp?v=5 2400w"
            sizes="100vw"
          />
          <img
            src="/images/hero_bg-1600.jpg?v=5"
            srcSet="/images/hero_bg-640.jpg?v=5 640w, /images/hero_bg-1024.jpg?v=5 1024w, /images/hero_bg-1600.jpg?v=5 1600w, /images/hero_bg-2400.jpg?v=5 2400w"
            sizes="100vw"
            alt={t.alts.hero_bg}
            width={2400}
            height={1500}
            className="absolute inset-0 h-full w-full max-w-none rounded-none object-cover object-[52%_28%]"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 rounded-none"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,.10), rgba(0,0,0,.03) 35%, rgba(0,0,0,.35) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div
        className="stage relative rounded-none"
        style={{
          // Desktop : un peu plus haut pour laisser respirer le wordmark
          height: "min(82vh, 56vw)",
          minHeight: "420px",
        }}
      >
        <div
          className="absolute inset-x-0 bottom-0 overflow-visible"
          style={{ height: "clamp(110px, 34%, 260px)" }}
        >
          <div className="absolute left-[2.5%] right-[2.5%] bottom-0 flex justify-center">
            <FitText
              as="h1"
              text={BRAND}
              targetCqw={90}
              className="text-cream"
              aria-label="SHU ANTA"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 899px) {
          #hero .stage {
            height: min(72vh, 78vw) !important;
            min-height: 380px !important;
          }
        }
        @media (max-width: 599px) {
          #hero .stage {
            height: min(70vh, 100vw) !important;
            min-height: 420px !important;
          }
          #hero img { object-position: 55% 26%; }
        }
      `}</style>
    </section>
  );
}
