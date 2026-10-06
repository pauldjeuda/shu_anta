import { Link } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import PageHero from "../components/PageHero";
import { useCart } from "../cart/CartContext";
import { formatPrice } from "../content/catalog";
import { localizeProduct, useLocale, useT } from "../i18n/LocaleContext";

export default function CartPage() {
  const { items, total, setQty, remove, clear, count } = useCart();
  const t = useT();
  const { locale } = useLocale();
  const page = t.pages.cart;

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
        <div className="stage mx-auto max-w-3xl">
          {count === 0 ? (
            <div className="py-8 text-center">
              <p className="font-display text-2xl text-ink-green">
                {t.ui.emptyCart}
              </p>
              <Link
                to="/catalogue"
                className="mt-4 inline-block font-sans text-ink-green underline decoration-sage/60 underline-offset-4"
              >
                {t.ui.browseCatalogue}
              </Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-[rgba(47,58,38,0.12)]">
                {items.map(({ product: raw, qty }) => {
                  const product = localizeProduct(raw, t);
                  return (
                  <li
                    key={product.id}
                    className="flex flex-col gap-4 py-5 min-[560px]:flex-row min-[560px]:items-center"
                  >
                    <Link
                      to={`/produit/${product.id}`}
                      className="h-24 w-24 shrink-0 overflow-hidden bg-[rgba(47,58,38,0.06)]"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <h2
                        className="font-display text-ink-green"
                        style={{ fontSize: "20px", lineHeight: 1.2 }}
                      >
                        <Link to={`/produit/${product.id}`}>{product.name}</Link>
                      </h2>
                      <p className="mt-1 font-sans text-sm text-ink opacity-70">
                        {formatPrice(product.price, locale)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 items-center border border-[rgba(47,58,38,0.2)]"
                        role="group"
                        aria-label={`${t.ui.qty} — ${product.name}`}
                      >
                        <button
                          type="button"
                          aria-label={t.ui.decrease}
                          onClick={() => setQty(product.id, qty - 1)}
                          className="flex h-full w-10 items-center justify-center text-ink-green transition-opacity hover:opacity-70"
                        >
                          <Minus strokeWidth={1.5} className="h-4 w-4" />
                        </button>
                        <span
                          className="min-w-[2rem] text-center font-sans text-ink-green"
                          style={{ fontSize: "14px" }}
                          aria-live="polite"
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label={t.ui.increase}
                          onClick={() => setQty(product.id, qty + 1)}
                          className="flex h-full w-10 items-center justify-center text-ink-green transition-opacity hover:opacity-70"
                        >
                          <Plus strokeWidth={1.5} className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="font-sans text-sm text-ink-green underline opacity-70 hover:opacity-100"
                      >
                        {t.ui.remove}
                      </button>
                    </div>
                  </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-col gap-4 border-t border-[rgba(47,58,38,0.16)] pt-6 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
                <p className="font-display text-2xl text-ink-green">
                  {t.ui.total} · {formatPrice(total, locale)}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={clear}
                    className="font-sans text-sm text-ink-green underline opacity-70"
                  >
                    {t.ui.clear}
                  </button>
                  <a
                    href="tel:+237699195546"
                    className="inline-flex h-11 items-center bg-ink-green px-6 font-sans text-cream"
                    style={{ fontSize: "14px" }}
                  >
                    {t.ui.orderPhone}
                  </a>
                </div>
              </div>
              <p className="mt-4 font-sans text-sm text-ink opacity-65">
                {t.ui.cartNote}
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
