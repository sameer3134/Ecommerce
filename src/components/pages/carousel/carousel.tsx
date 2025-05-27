import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useData from "../../redux/customhook/useData";
import { ProductType } from "../home/product";
import { useNavigate } from "react-router-dom";


const images = [
 "https://ucarecdn.com/339c8fa6-734a-43a4-a7b9-e1327c0d0ccb/carousel1.jpg",
 "https://ucarecdn.com/b05c3e8b-697f-4ea4-b520-af37952a0938/carousel2.jpg",
 "https://ucarecdn.com/a8fe7472-a880-4043-b6ce-e845bb8a106d/carousel3.jpg",
 "https://ucarecdn.com/329575b6-a5fc-4fc3-ae6e-2f1477ba63c7/carousel4.jpg",
 "https://ucarecdn.com/a4477c9b-da2b-431e-8eee-c4048f479e1e/carousel5.jpg"
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);
  const navigate=useNavigate()
   const data = useData();
    const [prod, setProd] = useState<ProductType[]>([]);
  
    useEffect(() => {
      if (Array.isArray(data?.data)) {
        setProd(data.data as ProductType[]);
      } else {
        setProd([]);
      }
    }, [data]);
    console.log(prod)
const handleProduct=(img: string)=>{
  let selectProduct=prod.find((p)=> p.image===img);
  navigate(`/product/${selectProduct?.id}`)
  console.log(selectProduct?.id)
}


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
                  loading="lazy"
                  onClick={()=>{handleProduct(img)}}
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
