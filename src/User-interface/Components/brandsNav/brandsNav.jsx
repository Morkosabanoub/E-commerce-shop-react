import { Link } from "react-router-dom";
import useBrands from "../../../hooks/useBrands";
import "./brandsNav.css";
import useChngtext from "../../../hooks/UseChngtext";

export default function BrandsNav() {
  const { text , loadingtext } = useChngtext();

  const { brands } = useBrands();
  if (loadingtext) return <p>{text.loading}</p>;
  if (!Array.isArray(brands) || brands.length === 0)
    
    return <div>{text.Loading}</div>;

  return (
    <div className="BrandsNav">
      {brands.map((brand) => (
        <div className="brand" key={brand.id}>
          <Link to={`/brand/${brand.name}`}>
            <img
              src={brand.logo || "/default-logo.png"}
              alt={brand.name || "brand"}
              loading="lazy"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
