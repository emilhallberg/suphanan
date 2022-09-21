import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Lang } from "./utils/enums";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: Lang.SV,
    debug: false,
    defaultNS: "default",
    ns: ["default"],
    lowerCaseLng: true,
    supportedLngs: [Lang.SV],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
