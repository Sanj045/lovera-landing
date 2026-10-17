"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { Star, Quote, User } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
    const { lang } = useLang();
    const t = dict[lang].testimonials;

    // Số liệu thành công (The Result)
    const resultStats = [
        { value: "83%", label: lang === "vi" ? "Tỷ lệ tương tác trung bình" : "Average click rate" },
        { value: "5/5", label: lang === "vi" ? "Đánh giá trên Trustpilot" : "Rating on Trustpilot" },
        { value: "500+", label: lang === "vi" ? "Cặp đôi đồng hành" : "Couples joined" },
        { value: "1M+", label: lang === "vi" ? "Kỷ niệm được lưu giữ" : "Memories saved" },
    ];

    return (
        <section id="testimonials" className="py-20 px-5 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
                        {t.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.title}</h2>
                </div>

                {/* 1. Dải Stats Kết quả */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {resultStats.map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center border border-pink-100 shadow-sm"
                        >
                            <div className="text-3xl font-extrabold text-pink-600 mb-2">{stat.value}</div>
                            <div className="text-xs text-gray-600 font-medium leading-snug">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 2. Lưới Reviews */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {t.items.map((item, i) => {
                        // Thẻ ở giữa (index 1) sẽ to hơn và nổi bật hơn một chút
                        const isFeatured = i === 1;

                        return (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className={`relative rounded-3xl p-7 border transition-all duration-300 flex flex-col ${isFeatured
                                        ? "bg-pink-500 text-white border-pink-500 shadow-xl shadow-pink-200 md:-translate-y-4"
                                        : "bg-white text-gray-800 border-pink-100 shadow-sm hover:shadow-lg"
                                    }`}
                            >
                                <Quote className={`w-10 h-10 mb-4 ${isFeatured ? "text-white/30" : "text-pink-100"}`} />

                                <div className="flex-1">
                                    <p className={`leading-relaxed mb-6 ${isFeatured ? "text-pink-50 font-medium" : "text-gray-600"}`}>
                                        "{item.quote}"
                                    </p>
                                </div>

                                {/* Đánh giá sao */}
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`w-4 h-4 fill-current ${isFeatured ? "text-yellow-300" : "text-yellow-400"}`} />
                                    ))}
                                </div>

                                {/* Thông tin người dùng */}
                                <div className="flex items-center gap-3 pt-4 border-t border-current/10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isFeatured ? "bg-white/20 text-white" : "bg-pink-100 text-pink-500"}`}>
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{item.name}</div>
                                        <div className={`text-xs ${isFeatured ? "text-pink-100" : "text-gray-400"}`}>{item.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}