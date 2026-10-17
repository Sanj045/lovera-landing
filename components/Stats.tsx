"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";

// Component con xử lý đếm số
function AnimatedNumber({ value }: { value: string }) {
    // Tách phần số và phần ký tự (+, k, M, ★, ...)
    const match = value.match(/^([\d.,]+)(.*)$/);
    const numStr = match ? match[1].replace(/,/g, "") : "0";
    const suffix = match ? match[2] : "";
    const target = parseFloat(numStr) || 0;

    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (inView) {
            motionValue.set(target);
        }
    }, [inView, target, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            // Format số (thêm dấu phẩy nếu cần)
            const formatted = latest.toFixed(value.includes(".") ? 1 : 0);
            const withCommas = Number(formatted).toLocaleString("en-US");
            setDisplay(withCommas);
        });
    }, [springValue, value]);

    return <span ref={ref}>{display}{suffix}</span>;
}

export default function Stats() {
    const { lang } = useLang();
    const t = dict[lang].stats;

    // Dùng số trần để dễ parse, component sẽ tự format lại thành 1,000+
    const items = [
        { n: "1000+", l: t.users },
        { n: "10M+", l: t.days },
        { n: "4.9★", l: t.rating },
        { n: "50k+", l: t.plans },
    ];

    return (
        <section className="py-12 px-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-pink-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
                {items.map((it) => (
                    <div key={it.l}>
                        <div className="text-3xl font-extrabold gradient-text">
                            <AnimatedNumber value={it.n} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{it.l}</div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}