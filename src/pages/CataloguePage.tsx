import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { CategoryLinkCard } from "../components/ProductCard";
import ProductCard from "../components/ProductCard";
import {
  CATEGORIES,
  PRODUCTS,
  productsByCategory,
  type CategoryId,
} from "../content/catalog";
import { useT } from "../i18n/LocaleContext";

const CAT_IDS = Object.keys(CATEGORIES) as CategoryId[];

export default function CataloguePage() {
  const t = useT();
  const page = t.pages.catalogue;

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image="/images/hero_catalogue.jpg"
        tone="photo"
      />
      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingBlock: "clamp(36px, 5vw, 64px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage">
          <div className="grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3">
            {CAT_IDS.map((id) => {
              const c = { ...CATEGORIES[id], ...t.categories[id] };
              return (
                <CategoryLinkCard
                  key={id}
                  to={c.path}
                  label={c.label}
                  image={c.cover}
                  count={productsByCategory(id).length}
                />
              );
            })}
          </div>

          <div className="mt-14 flex items-end justify-between gap-4">
            <h2
              className="font-display text-ink-green"
              style={{ fontSize: "clamp(26px, 3vw, 36px)" }}
            >
              {t.ui.allCare}
            </h2>
            <Link
              to="/panier"
              className="hidden font-sans text-ink-green underline decoration-sage/50 underline-offset-4 sm:inline"
              style={{ fontSize: "13px" }}
            >
              {t.ui.viewCart}
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 min-[520px]:grid-cols-2 min-[900px]:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
