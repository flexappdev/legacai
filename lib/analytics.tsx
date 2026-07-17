import Script from "next/script";

/**
 * GA4 wrapper — xmas/lib/analytics.ts pattern.
 * Reads NEXT_PUBLIC_GA_ID (G-XXXXXXXX). If unset, tracking is a no-op.
 * Flip live via `/abc-ga sync legacai G-XXXXXXXX`.
 */

export const GA_ID: string = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function isAnalyticsEnabled(): boolean {
  return /^G-[A-Z0-9]+$/i.test(GA_ID);
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (!isAnalyticsEnabled()) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

export function Analytics() {
  if (!isAnalyticsEnabled()) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'granted',
          });
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
