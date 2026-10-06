import PageHero from "../components/PageHero";
import { useT } from "../i18n/LocaleContext";

export default function BoutiquesPage() {
  const t = useT();
  const page = t.pages.boutiques;

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image="/images/ig/atelier.jpg"
        tone="photo"
      />
      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingBlock: "clamp(36px, 5vw, 72px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage grid gap-10">
          {t.shops.map((shop, i) => (
            <article
              key={shop.city}
              className={`grid gap-6 min-[800px]:grid-cols-2 min-[800px]:items-center ${
                i % 2 === 1 ? "min-[800px]:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={shop.image}
                  alt={`SHU ANTA — ${shop.city}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className={i % 2 === 1 ? "min-[800px]:pr-8" : "min-[800px]:pl-8"}
              >
                <p
                  className="font-sans uppercase tracking-[0.14em] text-sage"
                  style={{ fontSize: "11px" }}
                >
                  {shop.role}
                </p>
                <h2
                  className="mt-2 font-display text-ink-green"
                  style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
                >
                  {shop.city}
                </h2>
                <p
                  className="mt-4 font-sans text-ink opacity-85"
                  style={{ fontSize: "15px", lineHeight: 1.55 }}
                >
                  {shop.address}
                </p>
                <p className="mt-3 font-sans text-ink-green" style={{ fontSize: "15px" }}>
                  <a href={`tel:${shop.phone.replace(/\s/g, "")}`}>{shop.phone}</a>
                </p>
                <p
                  className="mt-2 font-sans text-ink opacity-70"
                  style={{ fontSize: "13px" }}
                >
                  {shop.hours}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
