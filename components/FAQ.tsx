"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { Plus, Quote, User } from "lucide-react";

export default function FAQ() {
    const { lang } = useLang();
    const t = dict[lang].faq;
    const [open, setOpen] = useState<number | null>(0);

    const toggle = (i: number, q: string) => {
        const isOpen = open === i;
        setOpen(isOpen ? null : i);
        if (!isOpen) trackEvent("faq_open", { question: q });
    };

    return (
        <section id="faq" className="py-20 px-5 bg-cream">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
                        {t.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.title}</h2>
                </div>

                {/* Danh sách FAQ */}
                <div className="space-y-3 mb-16">
                    {t.items.map((it, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-pink-100 overflow-hidden transition-colors hover:border-pink-300">
                            <button
                                onClick={() => toggle(i, it.q)}
                                className="w-full flex justify-between items-center gap-4 p-5 text-left font-semibold hover:bg-pink-50/50 transition"
                            >
                                <span>{it.q}</span>
                                <motion.div
                                    animate={{ rotate: open === i ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-pink-500 shrink-0"
                                >
                                    <Plus className="w-5 h-5" />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                                            {it.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Testimonial nhỏ (theo template Mailman) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-pink-500 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-pink-200"
                >
                    <Quote className="absolute top-6 right-6 w-16 h-16 text-white/20" />
                    <p className="text-lg sm:text-xl font-medium italic relative z-10">
                        "LOVERA thực sự thay đổi cách tụi mình kỷ niệm tình yêu. Những ngày bên nhau giờ đây thật ý nghĩa và ngọt ngào hơn bao giờ hết."
                    </p>
                    <div className="mt-6 flex items-center gap-3 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-bold">Lucas Bralitz</div>
                            <div className="text-pink-100 text-sm">Founder, GenZ Love Club</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}