import { useState, useEffect } from "react";
import Reflang from "../Helper/Reflang";

export default function UsePhone() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = Reflang();

  useEffect(() => {
    setLoading(true);

    const storageKey = `phonesData_${lang}`;
    const cachedData = localStorage.getItem(storageKey);

    if (cachedData) {
      setPhones(JSON.parse(cachedData));
      setLoading(false);
    } else {
      
      fetch(
        `https://phones-shop.onrender.com/api/translations/${lang}/phones`
      )
        .then((res) => res.json())
        .then((data) => {
          setPhones(data);
          setLoading(false);

          localStorage.setItem(storageKey, JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [lang]);

  return { phones, loading };
}
