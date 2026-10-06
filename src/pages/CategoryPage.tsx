import PageHero from "../components/PageHero";
import ProductCard from "../components/ProductCard";
import {
  CATEGORIES,
  productsByCategory,
  type CategoryId,
} from "../content/catalog";
import { useT } from "../i18n/LocaleContext";

type Props = { id: CategoryId };

export default function CategoryPage({ id }: Props) {
  const t = useT();
  const catMeta = CATEGORIES[id];
  const cat = { ...catMeta, ...t.categories[id] };
  const products = productsByCategory(id);

  return (
    <>
      <PageHero
        eyebrow={t.ui.collection}
        title={cat.title}
        lead={cat.lead}
        image={cat.cover}
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
        <div className="stage">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 min-[520px]:grid-cols-2 min-[900px]:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
