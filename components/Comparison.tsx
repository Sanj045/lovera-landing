"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { X, Check, Star } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Comparison() {
    const { lang } = useLang();
    const t = dict[lang].comparison;

    return (
        <section id="comparison" className="py-20 px-5 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
                        {t.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.title}</h2>
                    <p className="text-gray-500 mt-3">{t.subtitle}</p>
                </div>

                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Others Column */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200"
                    >
                        <h3 className="text-xl font-bold text-gray-500 mb-6 text-center">
                            {t.othersLabel}
                        </h3>
                        <div className="space-y-4">
                            {t.negative.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
                                >
                                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                                        <X className="w-5 h-5" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* LOVERA Column */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-pink-50 rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-xl shadow-pink-100 relative mt-4 md:mt-0"
                    >
                        {/* Best Choice Badge */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 fill-white" /> Best Choice
                        </div>

                        <h3 className="text-xl font-bold text-pink-600 mb-6 text-center mt-2">
                            {t.oursLabel}
                        </h3>
                        <div className="space-y-4">
                            {t.positive.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-pink-100 hover:border-pink-300 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-5 h-5" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}