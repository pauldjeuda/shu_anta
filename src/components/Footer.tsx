import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, Clock, Globe } from "lucide-react";
import Logo from "./Logo";
import FooterWaves from "./FooterWaves";
import { BRAND, FOOTER } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

function FooterLink({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} style={style}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useT();
  const f = t.footer;

  return (
    <div className="relative w-full">
      <FooterWaves />

      <footer
        className="relative w-full overflow-x-hidden bg-footer text-cream"
        data-theme="dark"
      >
        <div
          className="stage"
          style={{
            paddingTop: "clamp(28px, calc(var(--u) * 5), 56px)",
            paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
            paddingBottom: 0,
          }}
        >
          <div className="grid grid-cols-1 gap-10 min-[480px]:grid-cols-2 min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-3">
                <Logo part="mark" theme="dark" className="h-9 w-9 object-contain" />
                <span
                  className="font-display text-[26px] tracking-tight"
                  style={{ transform: "none", lineHeight: 1 }}
                >
                  SA
                </span>
              </div>
              <p
                className="mb-2 max-w-sm font-sans"
                style={{
                  fontSize: "clamp(13px, calc(var(--u) * 1.4), 15px)",
                  lineHeight: 1.45,
                  opacity: 0.9,
                }}
              >
                {f.tagline}
              </p>
              <p
                className="mb-5 max-w-sm font-sans"
                style={{
                  fontSize: "clamp(12px, calc(var(--u) * 1.25), 14px)",
                  lineHeight: 1.45,
                  opacity: 0.72,
                }}
              >
                {f.about}
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={FOOTER.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100"
                  style={{ fontSize: "clamp(13px, calc(var(--u) * 1.35), 14px)" }}
                >
                  <Instagram strokeWidth={1.4} className="h-4 w-4 shrink-0" />
                  {FOOTER.instagram.handle}
                </a>
                <a
                  href={FOOTER.website.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100"
                  style={{ fontSize: "clamp(13px, calc(var(--u) * 1.35), 14px)" }}
                >
                  <Globe strokeWidth={1.4} className="h-4 w-4 shrink-0" />
                  {FOOTER.website.label}
                </a>
              </div>
            </div>

            <div className="min-w-0">
              <h3
                className="mb-3 font-sans font-medium"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.5), 15px)", opacity: 0.6 }}
              >
                {f.shopTitle}
              </h3>
              <ul className="space-y-2">
                {f.shop.map((l) => (
                  <li key={l.label}>
                    <FooterLink
                      href={l.href}
                      className="font-sans opacity-[0.88] transition hover:underline hover:opacity-100"
                      style={{ fontSize: "clamp(13px, calc(var(--u) * 1.35), 14px)" }}
                    >
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h3
                className="mb-3 font-sans font-medium"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.5), 15px)", opacity: 0.6 }}
              >
                {f.brandTitle}
              </h3>
              <ul className="space-y-2">
                {f.brand.map((l) => (
                  <li key={l.label}>
                    <FooterLink
                      href={l.href}
                      className="font-sans opacity-[0.88] transition hover:underline hover:opacity-100"
                      style={{ fontSize: "clamp(13px, calc(var(--u) * 1.35), 14px)" }}
                    >
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
              <p
                className="mt-4 font-sans"
                style={{ fontSize: "clamp(12px, calc(var(--u) * 1.2), 13px)", opacity: 0.65 }}
              >
                {f.contact.presence} : {f.contact.cities}
              </p>
            </div>

            <div className="min-w-0">
              <h3
                className="mb-3 font-sans font-medium"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.5), 15px)", opacity: 0.6 }}
              >
                {f.findUs}
              </h3>
              <ul
                className="space-y-3 font-sans"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.3), 14px)" }}
              >
                <li className="flex gap-2.5 opacity-90">
                  <MapPin strokeWidth={1.4} className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                  <span>
                    <span className="block font-medium opacity-100">{f.contact.city}</span>
                    <span className="mt-0.5 block opacity-75">{f.contact.address}</span>
                  </span>
                </li>
                {FOOTER.contact.phone && (
                  <li>
                    <a
                      href={`tel:${FOOTER.contact.phone.replace(/\s/g, "")}`}
                      className="flex gap-2.5 opacity-90 transition hover:opacity-100"
                    >
                      <Phone strokeWidth={1.4} className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                      <span>
                        <span className="block">
                          {f.contact.yaounde} · {FOOTER.contact.phone}
                        </span>
                        {FOOTER.contact.phoneDouala && (
                          <span className="mt-0.5 block opacity-75">
                            {f.contact.douala} · {FOOTER.contact.phoneDouala}
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                )}
                {f.contact.hours && (
                  <li className="flex gap-2.5 opacity-90">
                    <Clock strokeWidth={1.4} className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                    <span>{f.contact.hours}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div
            className="mt-[clamp(28px,calc(var(--u)*5),56px)] flex flex-col gap-3 border-t border-[rgba(244,240,232,0.18)] pt-5 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between"
            style={{ fontSize: "clamp(12px, calc(var(--u) * 1.2), 13px)", opacity: 0.6 }}
          >
            <p>{f.rights.replace("{year}", String(year))}</p>
            <p>
              {f.legal.map((l, i) => (
                <span key={l.label}>
                  {i > 0 && " · "}
                  <FooterLink href={l.href} className="hover:underline hover:opacity-100">
                    {l.label}
                  </FooterLink>
                </span>
              ))}
            </p>
          </div>

          <div
            className="relative mx-auto max-w-full"
            style={{
              marginTop: "clamp(20px, 2.5vw, 36px)",
              paddingBottom: "0.7cm",
            }}
            aria-hidden
          >
            <p
              className="font-display pointer-events-none select-none text-center text-sage"
              style={{
                fontSize: "clamp(56px, 10vw, 128px)",
                lineHeight: 0.85,
                letterSpacing: "-0.01em",
                opacity: 0.38,
                whiteSpace: "nowrap",
              }}
            >
              {BRAND}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
