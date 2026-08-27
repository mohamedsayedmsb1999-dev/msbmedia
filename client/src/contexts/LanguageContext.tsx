import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type SiteLanguage = "ar" | "en";

type LanguageContextValue = { language: SiteLanguage; setLanguage: (language: SiteLanguage) => void };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>(() => (localStorage.getItem("msb-site-language") === "en" ? "en" : "ar"));

  useEffect(() => {
    localStorage.setItem("msb-site-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
