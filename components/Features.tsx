"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { Sprout, CalendarHeart, Bot } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Features() {
    const { lang } = useLang();
    const t = dict[lang].features;

    return (
        <section id="features" className="py-20 px-5 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
                        {t.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.title}</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t.subtitle}</p>
                </div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {/* Thẻ lớn: Khu vườn tình yêu (Chiếm 2 cột) */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-8 border border-pink-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
                    >
                        <div className="relative z-10 md:w-2/3">
                            <div className="w-14 h-14 rounded-2xl bg-white text-pink-500 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <Sprout className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                {t.items.garden.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {t.items.garden.desc}
                            </p>

                            {/* Fake Line Chart Animation */}
                            <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-white w-full max-w-sm">
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>Lượt tương tác</span>
                                    <span className="text-pink-500 font-bold">+124%</span>
                                </div>
                                <svg viewBox="0 0 200 60" className="w-full h-16 overflow-visible">
                                    <motion.path
                                        d="M0 50 Q 25 30, 50 40 T 100 15 T 150 30 T 200 10"
                                        fill="none"
                                        stroke="#F85D8F"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -bottom-10 -right-10 text-pink-200 opacity-50 transform group-hover:scale-110 transition-transform duration-500">
                            <Sprout className="w-64 h-64" strokeWidth={1} />
                        </div>
                    </motion.div>

                    {/* Thẻ nhỏ 1: Đếm ngày yêu */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <CalendarHeart className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            {t.items.counter.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            {t.items.counter.desc}
                        </p>

                        {/* Fake UI */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                            <div className="text-xs text-gray-400">Đã bên nhau</div>
                            <div className="text-3xl font-extrabold gradient-text mt-1">520</div>
                            <div className="text-xs text-gray-400 mt-1">ngày</div>
                        </div>
                    </motion.div>

                    {/* Thẻ nhỏ 2: AI Chatbox (Đã sửa lại nằm ngang toàn bộ hàng dưới) */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="md:col-span-3 bg-white rounded-3xl p-8 border border-pink-100 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-purple-100 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Bot className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {t.items.ai.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {t.items.ai.desc}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}