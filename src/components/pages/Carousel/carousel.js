import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselImg1 from "../../../assets/carouselImg1.jpg";
import carouselImg2 from "../../../assets/carouselImg2.jpg";
import carouselImg3 from "../../../assets/carouselImg3.jpg";
import carouselImg4 from "../../../assets/carouselImg4.jpg";
import carouselImg5 from "../../../assets/carouselImg5.jpg";

const images = [
  carouselImg1,
  carouselImg2,
  carouselImg3,
  carouselImg4,
  carouselImg5,
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);

  useEffect(() => {
    const updateVisibleImages = () => {
      if (window.innerWidth < 640) {
        setVisibleImages(2); // Mobile: 1 image
      } else if (window.innerWidth < 1024) {
        setVisibleImages(2); // Tablet: 2 images
      } else {
        setVisibleImages(4); // Desktop: 3 images
      }
    };

    updateVisibleImages();
    window.addEventListener("resize", updateVisibleImages);
    return () => window.removeEventListener("resize", updateVisibleImages);
  }, []);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-slide every 3 sec
    return () => clearInterval(interval);
  }, []);
  const extendedImages = [...images, ...images, ...images]
  return (
    <div className="w-full mx-auto px-4 relative z-10 pt-20">
      <div className="relative w-full max-w-full mx-auto mb-10">
        {/* Image Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * (100 / visibleImages)}%)`,
              width: `${images.length * (100 / visibleImages)}%`,
            }}
          >
            {extendedImages.map((img, i) => (
              <div
                key={i}
                className="relative"
                style={{
                  flex: `0 0 ${100 / visibleImages}%`,
                  padding: "0 2px",
                }}
              >
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover "
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 mx-1 rounded-full ${
                index === i ? "bg-blue-500" : "bg-gray-300"
              } transition-all duration-300`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
