"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "vi" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx>({ lang: "vi", setLang: () => { } });

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>("vi");

    useEffect(() => {
        const saved = localStorage.getItem("lovera_lang") as Lang | null;
        if (saved) setLangState(saved);
    }, []);

    const setLang = (l: Lang) => {
        setLangState(l);
        localStorage.setItem("lovera_lang", l);
        document.documentElement.lang = l;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLang = () => useContext(LanguageContext);