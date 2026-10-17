"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { UserPlus, HeartHandshake, Sprout, Camera } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Icon cho 4 bước
const stepIcons = [
    <UserPlus key="1" className="w-8 h-8" />,
    <HeartHandshake key="2" className="w-8 h-8" />,
    <Sprout key="3" className="w-8 h-8" />,
    <Camera key="4" className="w-8 h-8" />,
];

export default function Process() {
    const { lang } = useLang();
    const t = dict[lang].process;

    return (
        <section id="process" className="py-20 px-5 bg-cream overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
                        {t.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.title}</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t.subtitle}</p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Đường kẻ nối các bước (Desktop: Ngang, Mobile: Dọc) */}
                    <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-1 bg-pink-100 rounded-full z-0">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-pink-400 rounded-full origin-left"
                        />
                    </div>
                    <div className="md:hidden absolute left-10 top-[10%] bottom-[10%] w-1 bg-pink-100 rounded-full z-0">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full bg-pink-400 rounded-full origin-top"
                        />
                    </div>

                    {/* Các bước */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-4 gap-10 md:gap-6 relative z-10"
                    >
                        {t.steps.map((step, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-4 md:text-center group"
                            >
                                {/* Vòng tròn Icon */}
                                <div className="w-20 h-20 shrink-0 rounded-full bg-white border-4 border-pink-100 text-pink-500 flex items-center justify-center shadow-sm group-hover:border-pink-300 group-hover:scale-110 transition-all duration-300 z-10">
                                    {stepIcons[i]}
                                </div>

                                {/* Nội dung */}
                                <div>
                                    <div className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">
                                        Step 0{i + 1}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800">{step.title}</h3>
                                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 bg-pink-50 border border-pink-100 rounded-2xl p-6 text-center max-w-3xl mx-auto"
                >
                    <p className="text-gray-600 italic">
                        "{t.note}"
                    </p>
                </motion.div>
            </div>
        </section>
    );
}