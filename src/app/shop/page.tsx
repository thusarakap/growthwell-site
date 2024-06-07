"use client";

import Link from 'next/link';
import products from '../products.json'; 
import { useCart } from '../context/CartContext';

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100 overflow-x-hidden">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">Shop</h1>
      <div className="grid gap-8 w-full max-w-7xl px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            <Link href={`/shop/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer" />
            </Link>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-gray-900 mb-4">Rs. {product.price}/=</p>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 duration-300"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
