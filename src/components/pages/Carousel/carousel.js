import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
 "https://media-hosting.imagekit.io//d2d99d1b84fd4ccd/c1.jpg?Expires=1835608897&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=D9WZ~F3re82qisC12f3I8dKTxYNA9sg0~R34S3YRll-~Kvj8d9L~HQp1bACwPBgnpZs~XPY5sldIi8AL93QJ0Y0suu86WHmCZb9Obv4cuNPiXatGorceR5ShyJwH62z4pompcFx1z-RxQvTh~K7LMljNqfEX84griswl68pXl~xYtfGbwh05bQY1ONaNPsofdnzsHzzBpy2DeTjpeR3ip4lfZ8M1TpT9BGvbABZMy5szfRmuqVyHgwLaiMXvJjANeAMhrf9X4Y6agBIYvKwYlqEeJis4jaNKoAU7tHr0qlHBreW5lTIzVyYkrq6fm4mzztPaLD0GyJVmyoW3nq52BA__",
  "https://media-hosting.imagekit.io//5f9ea245a0314f08/c3.jpg?Expires=1835609010&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=bk~S-6B2YfqgSTHli-NSf7MjGLg7~qr1X8B4ylxqGZTfLukgW7q6Z0KTMCN5x-HgpafAYsL~yNGGDnabXSGq5Y9rXGa~27npQ3TRPSzn61Urnu84TOWhUnvegCJk-ogaFl-n8fKtgBiKLP01qwZh6NZq7Wk~6R8yGBGKhRVdr57Yl8b6HSwPycrxeDo3J8qR1yVoKmb1~03P9~ciY0m8cEsFWvdE7gj2VxMsO5jzHt5GkrAiC~ARGgo920kILjmz0FEp7BL37peJgx9LgR6zN7ju8VFF5zkp0HQmua68t0fmjYetrcmiAQ7NsJYR9DrtuayP90Myd0eqWzUEOoyZOw__",
  "https://media-hosting.imagekit.io//0c3154e05d1440f9/c4.jpg?Expires=1835609042&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=MLK12P4PGPrq4sDSR~UNaESuh5uR-1B0jqSrYdierWV~jr0RbTcBUKEKmFoow~I3I5GRFr7w7zuOpTAEuXYBdLAFtr7a8JJz8ZVpJ81JtVsP~QoMoYTxTmi-Fz2-tcYQGCtG-ATwx0KSFz56b8wmNtvKn4FXG5HVhmaBs4BxxoDbvE19wv6J-KufxEftDha7Sr9-JB38athezHSQy6jPXC4uX0OuXQGXDOPk01jgF3WDmjPeMDgHX4jnZyZeVu5SClM4aDRgDIRjHA8zKieY~Z~KxbG-qOZs5B5qoI2pl46~FsbyNAUgRZf-HGOe8LFlKSGSLeT0kg47Z2ALZL~nQA__",
  "https://media-hosting.imagekit.io//0e068f4d63144cfb/c5.jpg?Expires=1835609062&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=vbpulPAu-8RRZRCnqh-N4cJkuQhQxG5sYG3IBLf4I2Tnl03Vu9D7PyyCxeOidvDcJ6sCU71EQsZzUHZ5ApLnUxUFsyyIuFj5ft3TnKBxfb-R1JG2Kujw2fZW1qSSQCZ99VLpkAPsTt1uC4nJU~lurQzwpNQ9Ux6YZtJRmZ7FDhCsAV087yjp87qjbyvHgJ2aqe0P4ZAGeDew5PoojpK9UB-UwRb~3J1vgRiJnQwgMZw8rvD9OITAh2rc03a70MDhVe5VDlHesk3FwR1W7xqrmFHiNV-IwHIgUyHBydzoNYzNRB4x7uxFRMr~1V3Y4ai7YR3OFo90MJcrBqSHSakQyQ__",
  "https://media-hosting.imagekit.io//5b5ef025f6464b45/x2.jpg?Expires=1835609087&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=iJ~J6t3qbBR3Ik1w~12kb3KV08omUGEoG9vfm-DKTYvVBp8RrMErvzbMl2reKERo53-AfPi8OQ9n18lyXCL3398WOdoq2fjJfi9a9eR6D70d7dSTUi6IWVAF~ZfjaSNkY1eehFC4HTY2AiE8aai5XbvfV7nThQvBltGuazvtdXBDkUMcyqyn~gfrl67UW2lPH6nVc~sjFkk5SA4hyEBsOIo1yowcjmNAtlxIzebVL33yguS45LiRdsNtPYagVSmZXcK2sQPDqwasJ3-00J6RiprcszM4pP4lb6RInC~TjuyUu7eGeYMuET-OIz3yB0K3eWq0q92LRBtVOjDuaZublA__",
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
