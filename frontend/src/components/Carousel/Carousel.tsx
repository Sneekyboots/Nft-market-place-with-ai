"use client";
import React, { useState } from "react";
import Image from "next/image";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: any[] = [
    {
      src: "https://media.istockphoto.com/id/1386672279/photo/businessman-using-a-computer-for-nft-non-fungible-token-for-crypto-art-blockchain-technology.jpg?s=1024x1024&w=is&k=20&c=ibxxLmg7yU5P4HmB7Xv5RNtG2x2HpWGl1XmeEPgw6ng=",
      alt: "img_3",
    },
    {
      src: "https://media.istockphoto.com/id/1360520396/photo/man-wearing-vr-glasses-virtual-global-internet-connection-metaverse-with-a-new-experience-in.jpg?s=1024x1024&w=is&k=20&c=xGfKL5XvzVtpJOMt1xpGU3cyWmCXvbvxE5CzPyAIzJM=",
      alt: "img_4",
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_1280.png",
      alt: "img_1",
    },
    {
      src: "https://cdn.pixabay.com/photo/2018/06/02/14/36/blockchain-3448502_1280.jpg",
      alt: "img_2",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="relative w-full h-80 overflow-hidden">
      {/* Image Slides */}
      <div>
        {images.map((image, index) => (
          <div key={index} className={`w-full h-full flex-shrink-0 `}>
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      {/* <div className="flex transition-transform duration-300 ease-in-out">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-full h-full flex-shrink-0 ${
              index !== currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div> */}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full focus:outline-none"
      >
        &#9664;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full focus:outline-none"
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
