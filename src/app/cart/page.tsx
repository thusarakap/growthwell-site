"use client";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100 dark:bg-neutral-900">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((product) => (
            <div key={product.id} className="flex items-center bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg w-20 h-20 object-cover"
              />
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{product.price}</p>
              </div>
              <button
                className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-500 duration-300"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
