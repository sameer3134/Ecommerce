import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselImg1 from "../../../assets/carouselImg1.jpg";
import carouselImg2 from "../../../assets/carouselImg2.jpg";
import carouselImg3 from "../../../assets/carouselImg3.jpg";
import carouselImg4 from "../../../assets/carouselImg4.jpg";
import carouselImg5 from "../../../assets/carouselImg5.jpg";

const images = [
 "https://media-hosting.imagekit.io//ff781e6b325c4c3c/carouselImg1.jpg?Expires=1835607616&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=U9znOzQlQepR85tUPZJA-5OlryW29F2YOxoqkdjJzH~GsW0LvzA9No~UQfYcm6LFbjrheboC1Epk~tdktVR1vWSRP2QpZp1TR2yUQ97e09pq-Pii9kA4HUsHENDlsAdYlDpnthGdqjdqwg6Q26EHMjiSviDN5SRkm4kNSHJSf3ebF9fPKfkMPvbeivvFe5HwXnTXUJFJwSk7nf8jTCJIcWQz6dFjC8WNMrxjxllPbtkJf7osSYNUWqAPcalXWZxF1bBfzRigavxuiw3dTcb4krerNrV5KdmN1QaDfyh-~su8amdJykZX7SMrTdFpXuUi9dyYdhInWnaxTVDQVzXd7Q__",
  "https://media-hosting.imagekit.io//7b5cc98822054436/carouselImg2.jpg?Expires=1835607821&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=es3X0YlKY6t0mG-4-F6a-jFqvkLOnmn~p3Oq495xvEMj23XkuZ6AK8dGNP3xpCV2kwwQiCfJpwNYyQhQKMAPxYZZaVzP2bMPGZnOh-Z4qvkkr8bLiKb8xdiHfvsyJunwpRk7X4O8YOwhxYTtOIZSGtoaqsNwZ4zP15cY6~04GmHEWtt1nnjs6tMFrMb~QsOC481m-MxaX-IRXuBUO4UcKNpkxjlRkEwskxfnEP3Z8SRSNHTFcx3qJKKsRpP3mIymS2pKx7gw9EeM9DSqk7kiw~P6Rmm2eeJbfZDtpMZWXPILdXBVOv1pa5qhuR451cAwhAok-ufuzgmvLWJxEYw0Dg__",
  "https://media-hosting.imagekit.io//7ab27c40936841e4/carouselImg3.jpg?Expires=1835607880&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Ge9FLlY48~JupLoH47L7g5GqDoqHo0TWvZs75NC8yYjvSYg4waceSBDOYrZYhwRNTY1P-ZmEXUzEEMKWlc6xOTedqGQT~KAYvBIlp9c4YDbwjdtCAoKZ11LBep5-x8rVY~i5ExalVYCmOiumnCxrvFGyNapKh91RMErB6aGjL2iOsHdcX-UB5CeT2W3I8EgFJCL6xoHn9q8fefk6nOZuDwde3SDIoHngKmpqi4WzEu8Q2YJcbLgtigO3h1NPVGzwgSmrjuOw9LUDBUOXaMg4eD57C~yPUwlIq2eC4~qbH78eTix-rTror5xrG83dVqSXuBcAS753CqWzZn1D4i-j3g__",
  "https://media-hosting.imagekit.io//f98a470fea53488c/carouselImg4.jpg?Expires=1835607950&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=EYqvQNs0eWVcER7RIc3RfqiwioK4u2e3K4nAcanIuCKNcav-VGtQF6kNkPzAafrJdYxhGKRD3BrLlIXRxbCbXQ0hNOZ1B-FmcviedKV~CTH1SBzAhUdCLxQxk~G1Qx1zipXbztScH0YoetE16MGu3vtHzlepCxhUykdwi7MEoVMtpIotEex-REihaPROJpyE6gg9~ifkwGtnnO9mixLSAq7xCroxl3iIbdke4TAGxGigeyH06zaS1Qblyp3~g1yJQcjULLsh4y96NGYRDDiOIhcryU2I2Ep8lisbgqhgF5QfvqT21sq6M6SW7dUUggFq5ITgwkRiawyAubQPd4VlxA__",
  "https://media-hosting.imagekit.io//361788ad9ee84280/carouselImg5.jpg?Expires=1835608002&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=UNCqSBy~-QaxgDtxleu0p1yf8W7BSHGVRAmC25Hc6ftqiQxsaUw-oVcAyY9-BilWgEoL8IQFqQRQNzqFl-LuCaGR0VY5r2msvyntbSCkF--556rGpgusTQHXKm-jEDB7z5UbrJ-x-PdKJxuiVEUzLE0QsT5V07PkH5l6G4UnhW8cWPx2kJ3-YIy0cJyeeiVdE5bgJ5783LjliRFPLGok4xzKvEGDNT87O5YRpX8KOnRY6ts~T-IvjX0x7ZfDGuRnF3PhXDONINJBHBQL-~XeinumqszggtP7JN81LRcYALtItSDhc-ea0-f8-odQ8-jzpXTJegGGTiR05XqWhr8b7A__",
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
                  loading="lazy"
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
