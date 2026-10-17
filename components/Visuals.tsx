"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { Sprout, MessageCircle, Camera, ArrowRight } from "lucide-react";

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

const cardColors = [
    "from-pink-100 to-pink-200",
    "from-rose-100 to-rose-200",
    "from-orange-50 to-orange-100",
];

// Sử dụng SVG Icons thay vì Emoji
const cardIcons = [
    <Sprout key="sprout" className="w-16 h-16 text-pink-500 drop-shadow-md" strokeWidth={1.5} />,
    <MessageCircle key="chat" className="w-16 h-16 text-rose-500 drop-shadow-md" strokeWidth={1.5} />,
    <Camera key="camera" className="w-16 h-16 text-orange-500 drop-shadow-md" strokeWidth={1.5} />,
];

export default function Visuals() {
    const { lang } = useLang();
    const t = dict[lang].visuals;

    const handleCtaClick = () => {
        trackEvent("cta_click", { location: "visuals", label: "explore_now" });
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="visuals" className="py-20 px-5 bg-cream">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
                        {t.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.title}</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t.subtitle}</p>
                </div>

                {/* Mockup Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-8 mb-16"
                >
                    {t.items.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 hover:shadow-xl hover:shadow-pink-100 transition-all cursor-default"
                        >
                            {/* Fake App Screen */}
                            <div
                                className={`w-full h-48 rounded-2xl bg-gradient-to-br ${cardColors[i]} flex items-center justify-center mb-6 relative overflow-hidden`}
                            >
                                {cardIcons[i]}
                                {/* Decorative elements */}
                                <div className="absolute top-4 left-4 w-12 h-2 bg-white/40 rounded-full"></div>
                                <div className="absolute top-8 left-4 w-8 h-2 bg-white/30 rounded-full"></div>
                            </div>

                            <h3 className="font-bold text-lg text-gray-800 text-center">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm text-center mt-2">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Promise & CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center bg-pink-50 rounded-3xl p-8 sm:p-12 border border-pink-100"
                >
                    <p className="text-lg sm:text-xl font-medium text-gray-700 italic max-w-2xl mx-auto">
                        "{t.promise}"
                    </p>
                    <button
                        onClick={handleCtaClick}
                        className="mt-6 inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-pink-200 transition"
                    >
                        {t.cta} <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}