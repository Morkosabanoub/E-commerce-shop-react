import { useEffect, useState } from "react";
import Reflang from "../Helper/Reflang";
import UseChngtext from "../hooks/UseChngtext";

export default function useService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { text } = UseChngtext();
  const { lang } = Reflang();

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://phones-shop.onrender.com/api/translations/${lang}/services`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${text.error}`);
        }
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || `${text.error}`);
        setLoading(false);
      });
  }, [lang, text.error]);
  return { services, error, loading };
}
