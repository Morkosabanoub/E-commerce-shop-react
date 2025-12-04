import { useEffect, useState } from "react";
import "./slider.css";
import useSlider from "../../../hooks/useSlider";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import useChngtext from "../../../hooks/UseChngtext";
import i18n from "../../../Helper/i18n";

export default function Slider() {
  const { text } = useChngtext();

  const [slider, setslider] = useState([]);
  const lang = i18n.language;

  useEffect(() => {
    fetch(
      `https://phones-shop.onrender.com/api/translations/${lang}/slider`
    )
      .then((res) => res.json())
      .then((data) => setslider(data))
      .catch((err) => console.log(err));
  }, [lang]);

  const {
    currentIndex,
    nextIndex,
    prevIndex,
    goTo,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSlider(slider.length, 1, true, 8000);

if (!Array.isArray(slider) || slider.length === 0) {
  return <div>{text.Loading}</div>;
}

const currentslider = slider[currentIndex] || {
  title: "",
  subtitle: "",
  image: "",
};

  return (
    <div
      className="slidercontainer"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="sliderinfo">
        <h2>{currentslider.title}</h2>
        <p>{currentslider.subtitle}</p>
      </div>
      <img
        className="sliderimage"
        src={currentslider.image}
        alt={currentslider.title}
        loading="lazy"
      />
      <button className="slidernext" onClick={nextIndex}>
        <IoArrowForwardCircleOutline />
      </button>
      <button className="sliderprve" onClick={prevIndex}>
        <IoArrowBackCircleOutline />
      </button>
      <div className="sliderdots">
        {Array.isArray(slider) &&
          slider.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goTo(index)}
            ></span>
          ))}
      </div>
    </div>
  );
}
