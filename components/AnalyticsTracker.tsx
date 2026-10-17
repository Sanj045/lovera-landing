"use client";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function AnalyticsTracker() {
    const scrollFired = useRef<Set<number>>(new Set());
    const timeFired = useRef<Set<number>>(new Set());

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const scrolled = ((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100;
            [25, 50, 75, 90].forEach((m) => {
                if (scrolled >= m && !scrollFired.current.has(m)) {
                    scrollFired.current.add(m);
                    trackEvent("scroll_depth", { percent: m });
                }
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        const timers = [30, 60, 120, 180].map((s) =>
            setTimeout(() => {
                if (!timeFired.current.has(s)) {
                    timeFired.current.add(s);
                    trackEvent("time_on_page", { seconds: s });
                }
            }, s * 1000)
        );

        return () => {
            window.removeEventListener("scroll", onScroll);
            timers.forEach(clearTimeout);
        };
    }, []);

    return null;
}