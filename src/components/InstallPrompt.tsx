import { useEffect, useState } from "react";
import { useT } from "../i18n/LocaleContext";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIos() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    ("standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

/**
 * Bannette d’installation PWA — Android (prompt natif) + iOS (geste Partager).
 */
export default function InstallPrompt() {
  const t = useT();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIos, setShowIos] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem("shu-anta-pwa-dismiss") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isStandalone() || dismissed) return;

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);

    // iOS : pas d’événement install — afficher l’aide après un court délai
    if (isIos()) {
      const id = window.setTimeout(() => setShowIos(true), 1800);
      return () => {
        window.clearTimeout(id);
        window.removeEventListener("beforeinstallprompt", onBip);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, [dismissed]);

  const visible = !dismissed && !isStandalone() && (Boolean(deferred) || showIos);
  if (!visible) return null;

  const dismiss = () => {
    setDismissed(true);
    setDeferred(null);
    setShowIos(false);
    try {
      localStorage.setItem("shu-anta-pwa-dismiss", "1");
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-[max(12px,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-label={t.pwa.installTitle}
    >
      <div
        className="mx-auto flex max-w-md items-start gap-3 border border-[rgba(47,58,38,0.14)] bg-[rgba(238,236,232,0.96)] px-4 py-3 text-ink-green shadow-[0_10px_32px_rgba(47,58,38,0.16)] backdrop-blur-md"
        style={{ borderRadius: "18px" }}
      >
        <div className="min-w-0 flex-1 font-sans" style={{ fontSize: "13px", lineHeight: 1.4 }}>
          <p className="font-medium">{t.pwa.installTitle}</p>
          <p className="mt-1 opacity-75">
            {showIos && !deferred ? t.pwa.iosHint : t.pwa.installText}
          </p>
          {deferred && (
            <button
              type="button"
              onClick={install}
              className="mt-2.5 inline-flex h-9 items-center bg-ink-green px-4 text-cream"
              style={{ fontSize: "12px" }}
            >
              {t.pwa.installCta}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 opacity-50 transition-opacity hover:opacity-100"
          aria-label={t.pwa.dismiss}
          style={{ fontSize: "18px", lineHeight: 1 }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
