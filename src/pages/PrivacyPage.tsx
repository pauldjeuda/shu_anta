import PageHero from "../components/PageHero";
import { useT } from "../i18n/LocaleContext";

export default function PrivacyPage() {
  const t = useT();
  const page = t.pages.privacy;

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
      />
      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingBlock: "clamp(28px, 4vw, 56px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage mx-auto max-w-2xl space-y-8 font-sans text-ink">
          {page.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-ink-green text-2xl">{section.title}</h2>
              <p className="mt-3 opacity-85" style={{ lineHeight: 1.6 }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
