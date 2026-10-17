"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { Target, Brain, Sprout, Lock, Gem, RefreshCw } from "lucide-react";

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

// Sử dụng SVG Icons thay vì Emoji
const strengthIcons = [
    <Target key="target" className="w-7 h-7" strokeWidth={2} />,
    <Brain key="brain" className="w-7 h-7" strokeWidth={2} />,
    <Sprout key="sprout" className="w-7 h-7" strokeWidth={2} />,
    <Lock key="lock" className="w-7 h-7" strokeWidth={2} />,
    <Gem key="gem" className="w-7 h-7" strokeWidth={2} />,
    <RefreshCw key="refresh" className="w-7 h-7" strokeWidth={2} />,
];

const strengthColors = [
    "bg-pink-100 text-pink-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-blue-100 text-blue-600",
    "bg-yellow-100 text-yellow-600",
    "bg-orange-100 text-orange-600",
];

export default function Strengths() {
    const { lang } = useLang();
    const t = dict[lang].strengths;

    return (
        <section id="strengths" className="py-20 px-5 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
                        {t.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.title}</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t.subtitle}</p>
                </div>

                {/* Grid 3x2 */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {t.items.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-pink-100 hover:border-pink-200 transition-all cursor-default"
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${strengthColors[i]} group-hover:scale-110 transition-transform`}
                            >
                                {strengthIcons[i]}
                            </div>
                            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                            <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}