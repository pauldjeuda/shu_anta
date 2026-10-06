import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useLocale, useT } from "../i18n/LocaleContext";

export default function BlogPage() {
  const t = useT();
  const { locale } = useLocale();
  const page = t.pages.blog;

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
        <div className="stage grid gap-10">
          {t.blogPosts.map((post) => (
            <article
              key={post.slug}
              className="grid gap-6 border-b border-[rgba(47,58,38,0.12)] pb-10 min-[800px]:grid-cols-[0.9fr_1.1fr] min-[800px]:items-center"
            >
              <Link to={`/blog/${post.slug}`} className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Link>
              <div>
                <time
                  className="font-sans uppercase tracking-[0.12em] text-sage"
                  style={{ fontSize: "11px" }}
                  dateTime={post.date}
                >
                  {new Date(post.date).toLocaleDateString(
                    locale === "en" ? "en-US" : "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </time>
                <h2
                  className="mt-2 font-display text-ink-green"
                  style={{ fontSize: "clamp(24px, 2.8vw, 34px)", lineHeight: 1.15 }}
                >
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p
                  className="mt-3 font-sans text-ink opacity-80"
                  style={{ fontSize: "15px", lineHeight: 1.55 }}
                >
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-4 inline-block font-sans text-ink-green underline decoration-sage/60 underline-offset-4"
                  style={{ fontSize: "13px" }}
                >
                  {t.ui.readArticle}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function BlogArticlePage() {
  const { slug } = useParams();
  const t = useT();
  const post = t.blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="bg-page px-6 py-32 text-center" data-theme="light">
        <p className="font-display text-ink-green text-3xl">{t.ui.articleMissing}</p>
        <Link to="/blog" className="mt-4 inline-block underline">
          {t.ui.backBlog}
        </Link>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={t.pages.blog.eyebrow}
        title={post.title}
        lead={post.excerpt}
        image={post.image}
        tone="photo"
      />
      <article
        data-theme="light"
        className="bg-page"
        style={{
          paddingBlock: "clamp(36px, 5vw, 64px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage mx-auto max-w-2xl">
          {post.body.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mb-5 font-sans text-ink opacity-90"
              style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7 }}
            >
              {p}
            </p>
          ))}
          <Link
            to="/blog"
            className="mt-6 inline-block font-sans text-ink-green underline decoration-sage/60 underline-offset-4"
          >
            ← {t.ui.backBlog}
          </Link>
        </div>
      </article>
    </>
  );
}
