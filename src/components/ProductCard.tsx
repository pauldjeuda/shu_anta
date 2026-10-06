import { Link } from "react-router-dom";
import { formatPrice, type Product } from "../content/catalog";
import { useCart } from "../cart/CartContext";
import { useToast } from "./CartToast";
import { localizeProduct, useLocale, useT } from "../i18n/LocaleContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product: raw }: Props) {
  const { add } = useCart();
  const { push } = useToast();
  const t = useT();
  const { locale } = useLocale();
  const product = localizeProduct(raw, t);

  const onAdd = () => {
    add(product.id);
    push(t.ui.added.replace("{name}", product.name));
  };

  return (
    <article className="group flex flex-col">
      <Link
        to={`/produit/${product.id}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-[rgba(47,58,38,0.06)]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        {product.tags?.[0] && (
          <p
            className="mb-1 font-sans uppercase tracking-[0.12em] text-sage"
            style={{ fontSize: "11px" }}
          >
            {product.tags[0]}
          </p>
        )}
        <h3
          className="font-display text-ink-green"
          style={{ fontSize: "clamp(18px, 1.8vw, 22px)", lineHeight: 1.2 }}
        >
          <Link to={`/produit/${product.id}`} className="hover:opacity-80">
            {product.name}
          </Link>
        </h3>
        <p
          className="mt-1.5 flex-1 font-sans text-ink opacity-75"
          style={{ fontSize: "13px", lineHeight: 1.45 }}
        >
          {product.short}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span
            className="font-sans font-medium text-ink-green"
            style={{ fontSize: "14px" }}
          >
            {formatPrice(product.price, locale)}
          </span>
          <div className="flex items-center gap-3">
            <Link
              to={`/produit/${product.id}`}
              className="font-sans text-ink-green underline decoration-sage/60 underline-offset-4 transition-opacity hover:opacity-70"
              style={{ fontSize: "13px" }}
            >
              {t.ui.seeMore}
            </Link>
            <button
              type="button"
              onClick={onAdd}
              className="font-sans text-ink-green underline decoration-sage/60 underline-offset-4 transition-opacity hover:opacity-70"
              style={{ fontSize: "13px" }}
            >
              {t.ui.add}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CategoryLinkCard({
  to,
  label,
  image,
  count,
}: {
  to: string;
  label: string;
  image: string;
  count?: number;
}) {
  const t = useT();
  return (
    <Link to={to} className="group relative block aspect-[5/4] overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 30%, rgba(47,58,38,.72) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <h3
          className="font-display"
          style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
        >
          {label}
        </h3>
        {typeof count === "number" && (
          <p className="mt-1 font-sans opacity-80" style={{ fontSize: "13px" }}>
            {count === 1
              ? t.ui.careOne
              : t.ui.careMany.replace("{n}", String(count))}
          </p>
        )}
      </div>
    </Link>
  );
}
