"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const carouselImages = [
  { id: 1, src: "/images/banner.webp", alt: "Banner 1" },
  { id: 2, src: "/images/banner.webp", alt: "Banner 2" },
  { id: 3, src: "/images/banner.webp", alt: "Banner 3" },
];

const products = [
  {
    id: 1,
    name: "Product 1",
    image: "/images/product1.webp",
    description: "Description of Product 1.",
  },
  {
    id: 2,
    name: "Product 2",
    image: "/images/product2.webp",
    description: "Description of Product 2.",
  },
  {
    id: 3,
    name: "Product 3",
    image: "/images/product3.webp",
    description: "Description of Product 3.",
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        setIsAnimating(false);
      }, 1000); // duration of the fade out animation
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      {/* Hero Section */}
      <section className="w-full relative">
        <div className="w-full h-0 pb-[28%] relative bg-cover bg-center">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${carouselImages[currentImageIndex].src})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            key={currentImageIndex}
          >
          </motion.div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full flex flex-col items-center py-20 bg-gray-100 bg-green">
        <motion.h2
          className="text-3xl font-semibold mb-10 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Products
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-10">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleProductClick(product)}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="rounded-lg cursor-pointer w-60 h-80 object-cover shadow-lg bg-gray-200 bg-gray-800 bg-opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.p
                className="absolute bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-50 text-white px-4 py-2 rounded-b-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {product.name}
              </motion.p>
            </motion.div>
          ))}
        </div>
        <Link
          href="/shop"
          className="mt-10 px-6 py-3 bg-gray-900 bg-opacity-90 text-white rounded-full shadow-md hover:bg-gray-900 duration-300"
        >
          View All Products
        </Link>
      </section>

      {/* Expanded Product Modal */}
      {selectedProduct && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="bg-neutral-900 bg-opacity-95 text-white  p-6 rounded-lg shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="rounded-lg w-80 h-70 object-cover"
            />
            <h3 className="text-xl font-medium mt-4">{selectedProduct.name}</h3>
            <p className="mt-2">{selectedProduct.description}</p>
          </motion.div>
        </motion.div>
      )}

      {/* About Section */}
      <section className="w-full flex flex-col items-center py-20 bg-white dark:bg-neutral-800">
        <motion.h2
          className="text-3xl font-semibold mb-10 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          GrowthWell is committed to innovation and excellence in animal
          nutrition. Our mission is to provide top-notch supplements that
          promote the health and longevity of your animals. With years of
          experience and a dedicated team of experts, we strive to bring you the
          best in animal care.
        </motion.p>
      </section>

      {/* Contact Section */}
      <section className="w-full flex flex-col items-center py-20 bg-gray-100 dark:bg-neutral-900">
        <motion.h2
          className="text-3xl font-semibold mb-10 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h2>
        <motion.form
          className="w-full max-w-lg bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Contact form content */}
          <div className="flex flex-col gap-6 items-center">
            {/* Hotline */}
            <div className="flex flex-col items-center text-lg">
              <span className="text-3xl font-bold text-gray-900 dark:text-white uppercase">
                Hotline:
              </span>
              <a
                href="tel:+94741202084"
                className="ml-2 pt-2 text-xl text-blue-500 dark:text-blue-300"
              >
                +94741202084
              </a>
            </div>
            <div className="flex items-center text-lg">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-gray-900 dark:text-white mr-2"
              />
              <span className="font-bold text-gray-900 dark:text-white">
                Landline:
              </span>
              <a
                href="tel:+94741202084"
                className="ml-2 text-blue-500 dark:text-blue-300"
              >
                +94741202084
              </a>
            </div>
            <div className="flex items-center text-lg">
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-green-500 dark:text-green-300 mr-2"
              />
              <span className="font-bold text-gray-900 dark:text-white">
                WhatsApp:
              </span>
              <a
                href="tel:+94741202084"
                className="ml-2 text-blue-500 dark:text-blue-300"
              >
                +94741202084
              </a>
            </div>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
