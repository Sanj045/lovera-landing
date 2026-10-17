"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { PartyPopper } from "lucide-react";

export default function Newsletter() {
    const { lang } = useLang();
    const t = dict[lang].newsletter;
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Giả lập gọi API (sẽ nâng cấp sau)
        setTimeout(() => {
            setStatus("success");
            trackEvent("newsletter_submit", { email, lang });
        }, 1000);
    };

    return (
        <section className="py-16 px-5 bg-pink-50 border-t border-pink-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
            >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                    {t.title}
                </h2>
                <p className="text-gray-500 mt-3 text-sm sm:text-base">
                    {t.subtitle}
                </p>

                {status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 bg-white border border-pink-200 rounded-2xl p-6 shadow-sm inline-flex flex-col items-center"
                    >
                        <PartyPopper className="w-10 h-10 text-pink-500 mb-2" />
                        <p className="font-semibold text-pink-600 mt-1">{t.success}</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.placeholder}
                            className="flex-1 px-5 py-3.5 rounded-full border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-gray-700 transition-all bg-white"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-pink-200 transition disabled:opacity-60 whitespace-nowrap"
                        >
                            {status === "loading" ? "..." : t.button}
                        </button>
                    </form>
                )}
            </motion.div>
        </section>
    );
}