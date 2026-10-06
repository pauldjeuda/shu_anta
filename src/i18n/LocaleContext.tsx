import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en } from "./en";
import { fr } from "./fr";
import type { Locale, Messages } from "./types";

const STORAGE_KEY = "shu-anta-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const catalogs: Record<Locale, Messages> = { fr, en };

function readStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "en" || raw === "fr") return raw;
  } catch {
    /* ignore */
  }
  return "fr";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window !== "undefined" ? readStoredLocale() : "fr",
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "fr" ? "en" : "fr"));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useT(): Messages {
  const { locale } = useLocale();
  return catalogs[locale];
}

export function localizeProduct<
  T extends {
    id: string;
    name: string;
    short: string;
    details: string[];
    tags?: string[];
  },
>(p: T, t: Messages): T {
  const overlay = t.products[p.id];
  if (!overlay) return p;
  return { ...p, ...overlay };
}
