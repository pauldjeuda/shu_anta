import { Link, useParams } from "react-router-dom";
import {
  CATEGORIES,
  formatPrice,
  getProduct,
  productsByCategory,
} from "../content/catalog";
import { useCart } from "../cart/CartContext";
import { useToast } from "../components/CartToast";
import ProductCard from "../components/ProductCard";
import { localizeProduct, useLocale, useT } from "../i18n/LocaleContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const raw = id ? getProduct(id) : undefined;
  const { add } = useCart();
  const { push } = useToast();
  const t = useT();
  const { locale } = useLocale();

  if (!raw) {
    return (
      <section className="bg-page px-6 py-32 text-center" data-theme="light">
        <p className="font-display text-3xl text-ink-green">{t.ui.productMissing}</p>
        <Link to="/catalogue" className="mt-4 inline-block underline">
          {t.ui.backCatalogue}
        </Link>
      </section>
    );
  }

  const product = localizeProduct(raw, t);
  const cat = { ...CATEGORIES[product.category], ...t.categories[product.category] };
  const related = productsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const onAdd = () => {
    add(product.id);
    push(t.ui.added.replace("{name}", product.name));
  };

  return (
    <>
      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingTop: "clamp(96px, 12vw, 120px)",
          paddingBottom: "clamp(40px, 6vw, 72px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage grid gap-10 min-[900px]:grid-cols-2 min-[900px]:items-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-[rgba(47,58,38,0.06)]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p
              className="font-sans uppercase tracking-[0.14em] text-sage"
              style={{ fontSize: "11px" }}
            >
              <Link to={cat.path} className="hover:underline">
                {cat.label}
              </Link>
            </p>
            <h1
              className="mt-3 font-display text-ink-green"
              style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1 }}
            >
              {product.name}
            </h1>
            <p
              className="mt-4 font-sans font-medium text-ink-green"
              style={{ fontSize: "18px" }}
            >
              {formatPrice(product.price, locale)}
            </p>
            <p
              className="mt-5 font-sans text-ink opacity-85"
              style={{ fontSize: "15px", lineHeight: 1.6 }}
            >
              {product.short}
            </p>

            <div className="mt-8 space-y-4">
              {product.details.map((d) => (
                <p
                  key={d.slice(0, 32)}
                  className="font-sans text-ink opacity-80"
                  style={{ fontSize: "14px", lineHeight: 1.6 }}
                >
                  {d}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onAdd}
                className="inline-flex h-12 items-center bg-ink-green px-7 font-sans text-cream transition-opacity hover:opacity-90"
                style={{ fontSize: "14px" }}
              >
                {t.ui.addToCart}
              </button>
              <Link
                to="/panier"
                className="font-sans text-ink-green underline decoration-sage/60 underline-offset-4"
                style={{ fontSize: "13px" }}
              >
                {t.ui.viewCart}
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="stage mt-16">
            <h2
              className="font-display text-ink-green"
              style={{ fontSize: "clamp(24px, 2.8vw, 32px)" }}
            >
              {t.ui.sameCollection}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 min-[520px]:grid-cols-2 min-[900px]:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
