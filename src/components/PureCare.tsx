import { useT } from "../i18n/LocaleContext";

function Pic({
  slot,
  alt,
  ratio,
  className = "",
}: {
  slot: string;
  alt: string;
  ratio: number;
  className?: string;
}) {
  const h = Math.round(1200 / ratio);
  return (
    <div className={`media-fill ${className}`}>
      <picture>
        <source
          type="image/webp"
          srcSet={`/images/${slot}-640.webp?v=2 640w, /images/${slot}-1024.webp?v=2 1024w, /images/${slot}-1200.webp?v=2 1200w`}
          sizes="(max-width: 899px) 45vw, 27cqw"
        />
        <img
          src={`/images/${slot}-1200.jpg?v=2`}
          srcSet={`/images/${slot}-640.jpg?v=2 640w, /images/${slot}-1024.jpg?v=2 1024w, /images/${slot}-1200.jpg?v=2 1200w`}
          sizes="(max-width: 899px) 45vw, 27cqw"
          alt={alt}
          width={1200}
          height={h}
          className="absolute inset-0 h-full w-full max-w-none object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

export default function PureCare() {
  const t = useT();
  const c = t.pureCare;

  return (
    <section
      id="pure-care"
      data-theme="light"
      className="relative w-full bg-page"
      style={{ scrollMarginTop: "5rem", marginTop: "clamp(12px, calc(var(--u) * 1.6), 28px)" }}
      aria-labelledby="pure-care-title"
    >
      <div className="stage">
        <div
          className="hidden min-[900px]:grid"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            columnGap: "clamp(10px, calc(var(--u) * 1.6), 24px)",
            paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
            height: "clamp(320px, calc(var(--u) * 36.3), 580px)",
          }}
        >
          <div className="reveal relative h-full min-h-0 overflow-hidden rounded-none">
            <Pic slot="care_a" alt={t.alts.care_a} ratio={0.735} />
          </div>
          <div className="reveal relative h-full min-h-0 overflow-hidden rounded-none">
            <Pic slot="care_b" alt={t.alts.care_b} ratio={0.735} />
          </div>
          <div className="reveal flex h-full min-h-0 flex-col justify-between gap-4">
            <div>
              <h2
                id="pure-care-title"
                className="font-sans font-medium text-ink-green"
                style={{
                  fontSize: "clamp(22px, calc(var(--u) * 3.2), 42px)",
                  lineHeight: 1.1,
                  maxWidth: "26.7cqw",
                }}
              >
                {c.titleLines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < c.titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <div
                className="mt-3 space-y-2 text-ink"
                style={{
                  fontSize: "clamp(13px, calc(var(--u) * 1.35), 16px)",
                  lineHeight: 1.4,
                  maxWidth: "26.7cqw",
                }}
              >
                <p>{c.p1}</p>
                <p>{c.p2}</p>
              </div>
            </div>
            <div
              className="relative w-full shrink-0 overflow-hidden rounded-none"
              style={{ height: "clamp(100px, calc(var(--u) * 13), 180px)" }}
            >
              <Pic slot="care_c" alt={t.alts.care_c} ratio={2.05} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-[6vw] py-10 min-[900px]:hidden">
          <div className="grid grid-cols-2 gap-3">
            <div className="reveal relative aspect-[11/15] overflow-hidden rounded-none">
              <Pic slot="care_a" alt={t.alts.care_a} ratio={0.735} />
            </div>
            <div className="reveal relative aspect-[11/15] overflow-hidden rounded-none">
              <Pic slot="care_b" alt={t.alts.care_b} ratio={0.735} />
            </div>
          </div>
          <div className="reveal">
            <h2
              className="font-sans font-medium text-ink-green"
              style={{ fontSize: "clamp(24px, 6vw, 32px)", lineHeight: 1.1 }}
            >
              {c.title}
            </h2>
            <div className="mt-3 space-y-2 text-[14px] leading-[1.4] text-ink">
              <p>{c.p1}</p>
              <p>{c.p2}</p>
            </div>
          </div>
          <div className="reveal relative aspect-[2.05/1] w-full overflow-hidden rounded-none">
            <Pic slot="care_c" alt={t.alts.care_c} ratio={2.05} />
          </div>
        </div>
      </div>
    </section>
  );
}
