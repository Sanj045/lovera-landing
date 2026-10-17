"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { User, Mail, Send, Loader2, CheckCircle } from "lucide-react";

export default function WaitlistForm() {
    const { lang } = useLang();
    const t = dict[lang].form;

    const [form, setForm] = useState({ name: "", email: "", interested: "yes" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [started, setStarted] = useState(false);

    const onFocusFirst = () => {
        if (!started) {
            setStarted(true);
            trackEvent("form_start", { form: "waitlist_full" });
        }
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = t.required;
        if (!form.email.trim()) e.email = t.required;
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.invalidEmail;
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) {
            trackEvent("form_error", { form: "waitlist_full", reason: "validation" });
            return;
        }

        setStatus("loading");
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();

            setStatus("success");
            trackEvent("form_submit", { form: "waitlist_full", interested: form.interested, lang });
        } catch {
            setStatus("error");
            trackEvent("form_error", { form: "waitlist_full", reason: "server" });
        }
    };

    return (
        <section id="waitlist" className="py-24 px-5 bg-white">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-pink-200 relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 text-white">
                        <span className="inline-block text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-4">
                            {t.label}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">{t.title}</h2>
                        <p className="text-pink-50 mb-8">{t.subtitle}</p>

                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center flex flex-col items-center"
                            >
                                <CheckCircle className="w-12 h-12 text-green-300 mb-3" />
                                <p className="font-bold text-lg">{t.success}</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={onSubmit} className="space-y-5">
                                {/* Họ tên */}
                                <div>
                                    <label className="text-sm font-medium text-pink-50 ml-1 mb-1 block">{t.name}</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={form.name}
                                            onFocus={onFocusFirst}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder={t.namePh}
                                            className="w-full rounded-2xl pl-12 pr-4 py-3.5 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/60 transition-shadow bg-white/95"
                                        />
                                    </div>
                                    {errors.name && <p className="text-xs text-pink-100 mt-1 ml-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium text-pink-50 ml-1 mb-1 block">{t.email}</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={form.email}
                                            onFocus={onFocusFirst}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder={t.emailPh}
                                            className="w-full rounded-2xl pl-12 pr-4 py-3.5 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/60 transition-shadow bg-white/95"
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-pink-100 mt-1 ml-1">{errors.email}</p>}
                                </div>

                                {/* Quan tâm */}
                                <div>
                                    <label className="text-sm font-medium text-pink-50 ml-1 mb-2 block">{t.interested}</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {(["yes", "no"] as const).map((v) => (
                                            <button
                                                key={v}
                                                type="button"
                                                onClick={() => setForm({ ...form, interested: v })}
                                                className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${form.interested === v
                                                        ? "bg-white text-pink-600 border-white shadow-md"
                                                        : "border-white/40 text-white hover:bg-white/10"
                                                    }`}
                                            >
                                                {v === "yes" ? t.interestedYes : t.interestedNo}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Nút Submit */}
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full flex items-center justify-center gap-2 bg-white text-pink-600 font-bold py-4 rounded-2xl hover:bg-pink-50 transition disabled:opacity-70 mt-4"
                                >
                                    {status === "loading" ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> {t.submitting}</>
                                    ) : (
                                        <><Send className="w-5 h-5" /> {t.submit}</>
                                    )}
                                </button>

                                {status === "error" && <p className="text-sm text-pink-100 text-center mt-2">{t.error}</p>}
                                <p className="text-[11px] text-pink-100 text-center mt-3 leading-relaxed">{t.privacy}</p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}