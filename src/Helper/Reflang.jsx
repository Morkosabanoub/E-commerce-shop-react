
import { useState, useEffect } from "react";
import i18n from "./i18n";

export default function Reflang() {
  const [lang, setLang] = useState("en"); 

  useEffect(() => {
    let saved = localStorage.getItem("lang");

    
    if (!saved) {
      saved = "en";
      localStorage.setItem("lang", saved);
    }

    
    i18n.changeLanguage(saved);
    setLang(saved);

    const handleLangChange = (newLang) => {
      localStorage.setItem("lang", newLang);
      setLang(newLang);
    };

    i18n.on("languageChanged", handleLangChange);

    return () => i18n.off("languageChanged", handleLangChange);
  }, []);

  const changeLang = (newLang) => {
    
    i18n.changeLanguage(newLang);
  };

  return { lang, setLang: changeLang };
}
