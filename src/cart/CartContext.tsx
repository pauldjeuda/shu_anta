import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "../content/catalog";

export type CartLine = { productId: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  items: { product: Product; qty: number }[];
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "shu-anta-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const add = (productId: string, qty = 1) => {
      setLines((prev) => {
        const i = prev.findIndex((l) => l.productId === productId);
        if (i === -1) return [...prev, { productId, qty }];
        return prev.map((l, idx) =>
          idx === i ? { ...l, qty: l.qty + qty } : l,
        );
      });
    };
    const remove = (productId: string) =>
      setLines((prev) => prev.filter((l) => l.productId !== productId));
    const setQty = (productId: string, qty: number) => {
      if (qty <= 0) remove(productId);
      else
        setLines((prev) =>
          prev.map((l) => (l.productId === productId ? { ...l, qty } : l)),
        );
    };
    const clear = () => setLines([]);
    const items = lines
      .map((l) => {
        const product = getProduct(l.productId);
        return product ? { product, qty: l.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    return { lines, count, add, remove, setQty, clear, items, total };
  }, [lines]);

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
