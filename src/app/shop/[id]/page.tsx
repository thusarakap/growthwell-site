"use client";

import { useParams } from 'next/navigation';
import { useCart } from '../..//context/CartContext';
import products from '../../products.json';
import Carousel from '../../components/carousel';

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart } = useCart();

  const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-1/2">
            <Carousel images={product.images} />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>
            <button
              className="px-8 py-4 bg-green-600 text-white text-lg rounded-md shadow-md hover:bg-green-500 duration-300 mb-8"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <section className="mt-10">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Contents</h2>
          <ul className="list-disc list-inside text-lg text-gray-600 mb-8">
            {product.contents.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Benefits</h2>
          <ul className="list-disc list-inside text-lg text-gray-600">
            {product.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
