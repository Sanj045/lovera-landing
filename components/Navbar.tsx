"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { Menu, X, Globe, Heart } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    const { lang, setLang } = useLang();
    const t = dict[lang].nav;
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const switchLang = (l: "vi" | "en") => {
        setLang(l);
        trackEvent("language_switch", { to: l });
    };

    const handleCta = () => {
        trackEvent("cta_click", { location: "navbar", label: "join_free" });
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
    };

    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
            <nav className="max-w-6xl mx-auto px-5 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 font-extrabold text-xl" onClick={() => setOpen(false)}>
                    <Image
                        src="/logo.png"
                        alt="LOVERA Logo"
                        width={32}
                        height={32}
                        className="w-12 h-12 object-contain"
                        priority
                    />
                    <span className="gradient-text">LOVERA</span>
                </a>

                {/* Desktop Nav - Đã xoá mục "Cách hoạt động" */}
                <div className="hidden md:flex items-center gap-7 text-sm font-medium">
                    <a href="#features" className="hover:text-pink-500 transition">{t.features}</a>
                    <a href="#faq" className="hover:text-pink-500 transition">{t.faq}</a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Language Switcher Desktop */}
                    <div className="hidden sm:flex items-center gap-1 rounded-full bg-pink-50 p-1 text-xs font-semibold">
                        <Globe className="w-4 h-4 text-pink-400 ml-2" />
                        {(["vi", "en"] as const).map((l) => (
                            <button
                                key={l}
                                onClick={() => switchLang(l)}
                                className={`px-3 py-1 rounded-full transition ${lang === l ? "bg-white text-pink-600 shadow-sm" : "text-gray-500 hover:text-pink-500"}`}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* CTA Desktop */}
                    <button
                        onClick={handleCta}
                        className="hidden sm:inline-flex bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-pink-200 transition"
                    >
                        {t.cta}
                    </button>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)} aria-label="menu">
                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Nav - Đã xoá mục "Cách hoạt động" */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-pink-100 overflow-hidden shadow-lg absolute top-full inset-x-0"
                    >
                        <div className="px-5 py-6 flex flex-col gap-4 text-sm font-medium text-gray-700">
                            <a href="#features" onClick={() => setOpen(false)}>{t.features}</a>
                            <a href="#faq" onClick={() => setOpen(false)}>{t.faq}</a>

                            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                <span className="text-xs text-gray-400">Language:</span>
                                {(["vi", "en"] as const).map((l) => (
                                    <button key={l} onClick={() => switchLang(l)} className={`px-3 py-1 rounded-full border ${lang === l ? "bg-pink-500 text-white border-pink-500" : "border-gray-200"}`}>
                                        {l.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleCta}
                                className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-pink-200 transition text-center"
                            >
                                {t.cta}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}