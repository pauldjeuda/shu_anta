import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useT } from "../i18n/LocaleContext";

export default function SpaPage() {
  const t = useT();
  const page = t.pages.spa;

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image="/images/ig/eau-micellaire.jpg"
        tone="photo"
      />
      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingBlock: "clamp(40px, 6vw, 80px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage">
          <div className="grid gap-10 min-[800px]:grid-cols-3">
            {page.services.map((s) => (
              <div key={s.title}>
                <h2
                  className="font-display text-ink-green"
                  style={{ fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: 1.2 }}
                >
                  {s.title}
                </h2>
                <p
                  className="mt-3 font-sans text-ink opacity-80"
                  style={{ fontSize: "14px", lineHeight: 1.55 }}
                >
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 min-[900px]:grid-cols-[1fr_1.1fr] min-[900px]:items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/ig/creme-main.jpg"
                alt="SHU ANTA"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2
                className="font-display text-ink-green"
                style={{ fontSize: "clamp(26px, 3vw, 36px)" }}
              >
                {page.bookTitle}
              </h2>
              <p
                className="mt-4 font-sans text-ink opacity-85"
                style={{ fontSize: "15px", lineHeight: 1.55 }}
              >
                {page.bookText}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a
                  href="tel:+237699195546"
                  className="font-sans text-ink-green underline decoration-sage/60 underline-offset-4"
                >
                  {t.footer.contact.yaounde} · +237 6 99 19 55 46
                </a>
                <Link
                  to="/routine-visage"
                  className="font-sans text-ink-green underline decoration-sage/60 underline-offset-4"
                >
                  {t.ui.faceRoutine}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
