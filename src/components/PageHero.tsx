type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Image de fond optionnelle (photo) */
  image?: string;
  tone?: "light" | "photo";
};

export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  tone = "light",
}: Props) {
  const isPhoto = tone === "photo" && image;

  return (
    <section
      data-theme={isPhoto ? "photo" : "light"}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: isPhoto
          ? "clamp(280px, 42vw, 420px)"
          : "clamp(200px, 28vw, 300px)",
      }}
    >
      {isPhoto && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              /* Même légèreté que le hero d’accueil — pas d’assombrissement vert */
              background:
                "linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.02) 40%, rgba(0,0,0,.28) 100%)",
            }}
            aria-hidden
          />
        </>
      )}

      <div
        className={`stage relative flex h-full flex-col justify-end ${
          isPhoto ? "text-cream" : "text-ink-green"
        }`}
        style={{
          minHeight: "inherit",
          paddingTop: "clamp(96px, 12vw, 120px)",
          paddingBottom: "clamp(28px, 4vw, 48px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        {eyebrow && (
          <p
            className={`mb-2 font-sans uppercase tracking-[0.14em] ${
              isPhoto ? "opacity-90 drop-shadow-sm" : "opacity-70"
            }`}
            style={{ fontSize: "clamp(11px, 1.1vw, 12px)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={`font-display max-w-[16ch] tracking-tight ${
            isPhoto ? "drop-shadow-[0_1px_12px_rgba(0,0,0,0.25)]" : ""
          }`}
          style={{
            fontSize: "clamp(36px, 5.5vw, 64px)",
            lineHeight: 1.05,
          }}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={`mt-4 max-w-xl font-sans ${
              isPhoto ? "opacity-95 drop-shadow-sm" : "opacity-90"
            }`}
            style={{
              fontSize: "clamp(14px, 1.5vw, 17px)",
              lineHeight: 1.5,
            }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
