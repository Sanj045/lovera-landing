"use client";
import { useLang } from "@/context/LanguageContext";
import { dict } from "@/lib/i18n";
import { Heart } from "lucide-react";

export default function Footer() {
    const { lang } = useLang();
    const t = dict[lang].footer;
    return (
        <footer className="bg-white border-t border-pink-100 px-5 py-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 font-extrabold text-xl">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 grid place-items-center text-white">
                            <Heart className="w-4 h-4 fill-white" />
                        </span>
                        <span className="gradient-text">LOVERA</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-3 max-w-xs">{t.tagline}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-sm mb-3">{t.product}</h4>
                    <ul className="text-sm text-gray-500 space-y-2">
                        <li><a href="#features" className="hover:text-pink-500">{t.links.features}</a></li>
                        <li><a href="#" className="hover:text-pink-500">{t.links.pricing}</a></li>
                        <li><a href="#faq" className="hover:text-pink-500">{t.links.faq}</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-sm mb-3">{t.company}</h4>
                    <ul className="text-sm text-gray-500 space-y-2">
                        <li><a href="#" className="hover:text-pink-500">{t.links.about}</a></li>
                        <li><a href="#" className="hover:text-pink-500">{t.links.blog}</a></li>
                        <li><a href="#" className="hover:text-pink-500">{t.links.contact}</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-6xl mx-auto border-t border-pink-100 mt-10 pt-6 text-center text-xs text-gray-400">
                {t.copyright}
            </div>
        </footer>
    );
}