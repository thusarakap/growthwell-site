"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Product 1",
    image: "/images/product1.webp",
    description: "Description of Product 1.",
    price: "$20.00",
  },
  {
    id: 2,
    name: "Product 2",
    image: "/images/product2.webp",
    description: "Description of Product 2.",
    price: "$25.00",
  },
  {
    id: 3,
    name: "Product 3",
    image: "/images/product3.webp",
    description: "Description of Product 3.",
    price: "$30.00",
  },
  // Add more products as needed
];

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100 dark:bg-neutral-900">
      <motion.h1
        className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Shop
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="relative w-60 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-t-lg cursor-pointer w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedProduct && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="rounded-lg w-80 h-70 object-cover"
            />
            <h3 className="text-xl font-medium mt-4">{selectedProduct.name}</h3>
            <p className="mt-2">{selectedProduct.description}</p>
            <p className="text-lg font-bold mt-4">{selectedProduct.price}</p>
            <button
              className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-700 duration-300"
              onClick={() => {
                addToCart(selectedProduct);
                handleCloseModal();
              }}
            >
              Add to Cart
            </button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
