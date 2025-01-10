import React, { useCallback, useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import imageSpeaker from "../assets/banner/speaker-slider.png";
import imageIphone from "../assets/banner/iphone-slider.webp";
import imageTv from "../assets/banner/tv-slider.jpg";
import imageWatch from "../assets/banner/watch-slider.jpg";
import imagePhone from "../assets/banner/xiaomi-slider.jpg";
import imageAirpods from "../assets/banner/earbuds-slider.webp";
import imageProcessor from "../assets/banner/processor-slider.jpg";

const SlidingBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Array of images
  const deskImages = [
    imagePhone,
    imageTv,
    imageProcessor,
    imageIphone,
    imageAirpods,
    imageWatch,
    imageSpeaker
  ];

  // Array of URLs for each product category
  const links = [
    "/product-category?category=phone",
    "/product-category?category=television",
    "/product-category?category=processor",
    "/product-category?category=phone",
    "/product-category?category=airpods",
    "/product-category?category=watches",
    "/product-category?category=speaker",
  ];

  const nextImage = useCallback(() => {
    if (deskImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  }, [currentImage, deskImages.length]);

  const previousImage = useCallback(() => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  }, [currentImage]);

  // Set up the interval effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-60 md:h-96 w-full bg-slate-200 relative">
        {/* Arrow buttons for navigation */}
        <div className="absolute h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-3xl">
            <button
              onClick={previousImage}
              className="bg-white shadow-md rounded-full p-1 z-10"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1 z-10"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Image Slideshow */}
        <div className="flex w-full h-full overflow-hidden">
          {deskImages.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="w-full h-full min-w-full min-h-full transition-all duration-500"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {/* Wrap each image with a Link */}
              <Link to={links[index]}>
                <img
                  src={imageUrl}
                  alt={`banner-${index}`}
                  className="w-full h-full"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-2 mt-2">
        {deskImages.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)} // Change image when dot is clicked
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentImage === index ? "bg-cyan-500" : "bg-gray-400"
            }`} // Style the active dot differently
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SlidingBanner;
