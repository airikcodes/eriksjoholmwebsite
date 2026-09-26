"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Re-runs the pre-paint theme script (lib/theme-script.ts) when the route
// changes (client-side navigation doesn't re-execute inline scripts) and every
// five minutes so "auto" mode drifts through dawn/dusk without a reload.
export default function ThemeController() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __applyTheme?: () => void }).__applyTheme?.();
  }, [pathname]);

  useEffect(() => {
    const id = setInterval(() => {
      (window as unknown as { __applyTheme?: () => void }).__applyTheme?.();
    }, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return null;
}
