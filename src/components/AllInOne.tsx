import { Link } from "react-router-dom";
import FitText from "./FitText";
import { BIG_WORD } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

function WidePic({ slot, alt }: { slot: string; alt: string }) {
  return (
    <div className="media-fill rounded-none">
      <picture>
        <source
          type="image/webp"
          srcSet={`/images/${slot}-640.webp 640w, /images/${slot}-1024.webp 1024w, /images/${slot}-1600.webp 1600w`}
          sizes="(max-width: 899px) 88vw, 41cqw"
        />
        <img
          src={`/images/${slot}-1600.jpg`}
          srcSet={`/images/${slot}-640.jpg 640w, /images/${slot}-1024.jpg 1024w, /images/${slot}-1600.jpg 1600w`}
          sizes="(max-width: 899px) 88vw, 41cqw"
          alt={alt}
          width={1600}
          height={820}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

export default function AllInOne() {
  const t = useT();
  const a = t.allInOne;

  return (
    <section
      id="all-in-one"
      data-theme="light"
      className="relative w-full bg-page"
      style={{
        scrollMarginTop: "5rem",
        marginTop: "clamp(24px, calc(var(--u) * 5), 72px)",
      }}
      aria-labelledby="allinone-title"
    >
      <div className="stage">
        <div
          className="relative hidden min-[900px]:block"
          style={{ height: "clamp(520px, calc(var(--u) * 70.2), 980px)" }}
        >
          <h2
            id="allinone-title"
            className="reveal absolute z-20 font-sans font-medium text-ink-green"
            style={{
              left: "7.7%",
              top: "8.5%",
              width: "33%",
              fontSize: "clamp(24px, calc(var(--u) * 3.6), 48px)",
              lineHeight: 1.1,
            }}
          >
            {a.titleLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < a.titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p
            className="reveal absolute z-20 text-ink"
            style={{
              left: "7.7%",
              top: "19.5%",
              width: "33%",
              fontSize: "clamp(13px, calc(var(--u) * 1.35), 16px)",
              lineHeight: 1.4,
            }}
          >
            {a.lead}
          </p>

          <div
            className="reveal absolute z-30 overflow-hidden rounded-none"
            style={{ left: "43.9%", top: "6.8%", width: "41%", height: "30%" }}
            data-el="allinone-a"
          >
            <WidePic slot="allinone_a" alt={t.alts.allinone_a} />
          </div>

          <div
            className="pointer-events-none absolute z-10 overflow-hidden text-sage-soft"
            style={{
              left: "4%",
              top: "34%",
              width: "92%",
              lineHeight: 0.8,
            }}
            data-el="big-word"
            aria-hidden
          >
            <FitText text={BIG_WORD} targetCqw={86} className="text-sage-soft" wide={false} />
          </div>

          <div
            className="reveal absolute z-30 overflow-hidden rounded-none"
            style={{ left: "15.5%", top: "56.5%", width: "41%", height: "32.5%" }}
            data-el="allinone-b"
          >
            <WidePic slot="allinone_b" alt={t.alts.allinone_b} />
          </div>

          <p
            className="reveal absolute z-20 text-ink"
            style={{
              left: "58.1%",
              top: "68%",
              width: "32.7%",
              fontSize: "clamp(13px, calc(var(--u) * 1.35), 16px)",
              lineHeight: 1.45,
              textShadow: "0 0 12px var(--page), 0 0 20px var(--page)",
            }}
          >
            {a.body}
          </p>

          <Link
            to="/catalogue"
            data-el="catalogue-btn"
            className="reveal absolute z-20 inline-flex items-center justify-center rounded-full border border-outline font-sans font-medium text-outline transition-opacity hover:opacity-80"
            style={{
              left: "58.1%",
              top: "86%",
              width: "clamp(110px, calc(var(--u) * 12.9), 160px)",
              height: "clamp(40px, calc(var(--u) * 3.5), 48px)",
              fontSize: "clamp(12px, calc(var(--u) * 1.4), 14px)",
            }}
          >
            {a.cta}
          </Link>
        </div>

        <div className="relative flex flex-col gap-6 px-[6vw] py-12 min-[900px]:hidden">
          <div className="reveal">
            <h2
              className="font-sans font-medium text-ink-green"
              style={{ fontSize: "clamp(26px, 7vw, 36px)", lineHeight: 1.1 }}
            >
              {a.title}
            </h2>
            <p className="mt-3 text-[14px] leading-[1.4] text-ink">{a.lead}</p>
          </div>

          <div className="reveal relative ml-auto aspect-[1.95/1] w-[88vw] overflow-hidden rounded-none">
            <WidePic slot="allinone_a" alt={t.alts.allinone_a} />
          </div>

          <div className="relative">
            <div className="relative z-0 w-[88vw] text-sage-soft" aria-hidden>
              <FitText text={BIG_WORD} targetCqw={88} className="text-sage-soft" wide={false} />
            </div>
            <div className="reveal relative z-10 -mt-[10vw] aspect-[1.8/1] w-[88vw] -translate-x-[3vw] overflow-hidden rounded-none">
              <WidePic slot="allinone_b" alt={t.alts.allinone_b} />
            </div>
          </div>

          <p className="reveal text-[14px] leading-[1.4] text-ink">{a.body}</p>
          <Link
            to="/catalogue"
            className="reveal inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-outline px-8 font-medium text-outline"
          >
            {a.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
