
import { useState, useEffect } from "react";
import Reflang from "../Helper/Reflang";

export default function UsePhone() {
  const [phones, setPhones] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { lang } = Reflang(); 

  useEffect(() => {
    setLoading(true);

    const storageKey = `phonesData_${lang}`;
    const cacheTimeKey = `phonesCacheTime_${lang}`;
    const cachedData = localStorage.getItem(storageKey);
    const cacheTime = localStorage.getItem(cacheTimeKey);
    const now = Date.now();
    const maxAge = 2 * 60 * 60 * 1000; 

    if (cachedData && cacheTime && now - cacheTime < maxAge) {
      try {
        const parsed = JSON.parse(cachedData).filter((b) => b?.name); 
        setPhones(parsed);
      } catch {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(cacheTimeKey);
      }
    }

    fetch(`https://phones-shop.onrender.com/api/translations/${lang}/phones`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const validData = Array.isArray(data)
          ? data.filter((b) => b?.name)
          : [];
        setPhones(validData);
        localStorage.setItem(storageKey, JSON.stringify(validData));
        localStorage.setItem(cacheTimeKey, Date.now());
      })
      .catch((err) => console.error("Fetch Error →", err))
      .finally(() => setLoading(false));
  }, [lang]);

  return { phones, loading };
}
