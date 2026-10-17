export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", name, params);
}