import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Toast = { id: number; message: string };

type ToastContextValue = {
  push: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const seq = useRef(0);

  const push = useCallback((message: string) => {
    const id = ++seq.current;
    setToasts((t) => [...t.slice(-2), { id, message }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return createElement(
    ToastContext.Provider,
    { value },
    children,
    createElement(ToastViewport, { toasts }),
  );
}

function ToastViewport({ toasts }: { toasts: Toast[] }) {
  return createElement(
    "div",
    {
      className: "pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-2",
      "aria-live": "polite",
    },
    toasts.map((t) =>
      createElement(
        "div",
        {
          key: t.id,
          className:
            "pointer-events-auto max-w-[280px] border border-[rgba(47,58,38,0.12)] bg-[rgba(238,236,232,0.96)] px-4 py-3 font-sans text-ink-green shadow-[0_8px_28px_rgba(47,58,38,0.16)] backdrop-blur-md",
          style: {
            fontSize: "13px",
            borderRadius: "14px",
            animation: "shu-toast-in 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          },
          role: "status",
        },
        t.message,
      ),
    ),
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/** Injecte l’animation une fois */
export function ToastStyles() {
  useEffect(() => {
    if (document.getElementById("shu-toast-style")) return;
    const s = document.createElement("style");
    s.id = "shu-toast-style";
    s.textContent = `
      @keyframes shu-toast-in {
        from { opacity: 0; transform: translateY(10px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}
