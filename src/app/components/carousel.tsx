"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt="Product Image"
          className="w-full h-80 object-cover rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full"
      >
        &#9664;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full"
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
