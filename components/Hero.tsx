"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Star, User, Heart, MessageCircle } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
    const { lang } = useLang();
    const t = dict[lang].hero;

    // Form states
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    // Parallax refs & values
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const handleCta = (loc: string, target: string) => {
        trackEvent("cta_click", { location: loc, label: target });
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Khách", email, interested: "yes" }),
            });
            if (!res.ok) throw new Error();
            setStatus("success");
            trackEvent("form_submit", { form: "hero_short", lang });
        } catch {
            setStatus("error");
            trackEvent("form_error", { form: "hero_short" });
        }
    };

    return (
        <section ref={sectionRef} className="relative pt-32 pb-20 px-5 overflow-hidden">
            {/* Background Blob with Parallax */}
            <motion.div
                style={{ y: yBg }}
                className="absolute top-20 -left-20 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 pointer-events-none"
            />
            <motion.div
                style={{ y: yBg }}
                className="absolute -bottom-20 -right-20 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-40 pointer-events-none"
            />

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Column: Text & Form */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center lg:text-left"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
                        <Heart className="w-3.5 h-3.5 fill-pink-500" />
                        {t.badge}
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                        {t.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="gradient-text">{t.title.split(" ").slice(-1)}</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="mt-5 text-gray-600 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                        {t.subtitle}
                    </motion.p>

                    {/* Hero Form ngắn */}
                    <motion.div variants={itemVariants} className="mt-8">
                        {status === "success" ? (
                            <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl inline-block border border-green-200">
                                {t.heroForm.success}
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.heroForm.placeholder}
                                    className="flex-1 px-5 py-3.5 rounded-full border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-gray-700 bg-white shadow-sm transition"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-pink-200 transition disabled:opacity-60 whitespace-nowrap"
                                >
                                    {status === "loading" ? "..." : t.heroForm.button}
                                </button>
                            </form>
                        )}
                        {status === "error" && <p className="text-red-500 text-sm mt-2">{t.heroForm.success}</p>}
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-pink-400">
                                    <User className="w-5 h-5" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                +1k
                            </div>
                        </div>
                        <div className="text-sm">
                            <div className="flex items-center gap-1 text-yellow-400 mb-1 justify-center sm:justify-start">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-500 font-medium">{t.socialProof.rating}</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Phone Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-72 bg-white rounded-[3rem] shadow-2xl p-4 border-[8px] border-gray-900 animate-float">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>

                        <div className="relative bg-cream rounded-[2rem] overflow-hidden pt-8 pb-4">
                            <div className="text-center pt-2 pb-4">
                                <div className="text-xs text-gray-400 font-medium">Chúng ta đã bên nhau</div>
                                <div className="text-5xl font-extrabold gradient-text mt-1">520</div>
                                <div className="text-xs text-gray-400 mt-1">ngày</div>
                            </div>

                            <div className="bg-gradient-to-br from-pink-100 to-pink-200 mx-4 rounded-2xl p-4 h-40 flex flex-col items-center justify-center gap-2">
                                <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
                                <span className="text-sm font-semibold text-pink-600">Khu vườn tình yêu</span>
                            </div>

                            <div className="mt-4 mx-4 space-y-2">
                                <div className="bg-white rounded-xl px-3 py-2 text-xs text-gray-600 shadow-sm flex items-center gap-2">
                                    <MessageCircle className="w-3.5 h-3.5 text-pink-400" />
                                    Hẹn hò cuối tuần?
                                </div>
                                <div className="bg-pink-500 rounded-xl px-3 py-2 text-xs text-white shadow-sm ml-4">
                                    Quán cà phê view đẹp nhé!
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}