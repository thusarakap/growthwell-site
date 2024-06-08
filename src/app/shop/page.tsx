"use client";

import Link from 'next/link';
import products from '../products.json'; 
import { useCart } from '../context/CartContext';

// Utility function to calculate average rating
function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
}

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {products.map((product) => {
          const averageRating = calculateAverageRating(product.reviews);
          return (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
              <Link href={`/shop/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer" />
              </Link>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>       
              <p className="text-lg font-bold text-gray-900 mb-4">Rs. {product.price}/=</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">{averageRating.toFixed(1)}</span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.584 4.87a1 1 0 00.95.69h5.094c.969 0 1.371 1.24.588 1.81l-4.1 2.98a1 1 0 00-.364 1.118l1.584 4.87c.3.921-.755 1.688-1.54 1.118l-4.1-2.98a1 1 0 00-1.175 0l-4.1 2.98c-.784.57-1.839-.197-1.54-1.118l1.584-4.87a1 1 0 00-.364-1.118l-4.1-2.98c-.783-.57-.38-1.81.588-1.81h5.094a1 1 0 00.95-.69l1.584-4.87z" />
                    </svg>
                  ))}
                </div>
              </div>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 duration-300"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
