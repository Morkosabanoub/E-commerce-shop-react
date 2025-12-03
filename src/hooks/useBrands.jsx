import { useEffect, useState } from "react";
import Reflang from "../Helper/Reflang";

export default function useBrands() {
  const [brands, setBrands] = useState([]);
  const { lang } = Reflang();
  const [loadingbrand, setLoadingbrand] = useState(true);

  useEffect(() => {
    fetch(
      `https://phones-shop-sever.onrender.com/api/translations/${lang}/brands`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBrands(data);
          setLoadingbrand(false);
        } else {
          console.warn("Brands API did not return an array:", data);
          setBrands([]); 
          setLoadingbrand(false);
        }
      })
      .catch((err) => console.error("Failed to fetch brands:", err));
  }, [lang]);

  return { brands , loadingbrand };
}
