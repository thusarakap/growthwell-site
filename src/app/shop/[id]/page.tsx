// "use client";

// import { useParams } from 'next/navigation';
// import { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import productsData from '../../products.json';
// import Carousel from '../../components/carousel';
// import StarRating from '../../components/starRating';

export default function ProductPage() {

    return (
        <div>
            <h1>Product Page</h1>
        </div>
    );
  
//   const params = useParams();
//   const { id } = params;
//   const { addToCart } = useCart();
//   const [products, setProducts] = useState(productsData);
//   const [reviewText, setReviewText] = useState('');
//   const [reviewRating, setReviewRating] = useState(0);

//   // Assuming you want to use the first id if it's an array or the id directly if it's not
//   const productId = Array.isArray(id) ? id[0] : id;
//   const product = products.find((prod) => prod.id === parseInt(productId, 10));

//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   const handleAddReview = () => {
//     const newReview = { rating: reviewRating, text: reviewText };
//     const updatedProducts = products.map((prod) =>
//       prod.id === product.id
//         ? { ...prod, reviews: [...prod.reviews, newReview] }
//         : prod
//     );
//     setProducts(updatedProducts);
//     setReviewText('');
//     setReviewRating(0);
//   };

//   return (
//     <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
//         <div className="flex flex-col lg:flex-row lg:space-x-8">
//           <div className="lg:w-1/2">
//             <Carousel images={product.images} />
//           </div>
//           <div className="lg:w-1/2">
//             <h1 className="text-4xl font-bold mb-6 text-gray-900">{product.name}</h1>
//             <p className="text-xl text-gray-600 mb-6">{product.description}</p>
//             <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>
//             <button
//               className="px-8 py-4 bg-green-600 text-white text-lg rounded-md shadow-md hover:bg-green-500 duration-300 mb-8"
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//         <section className="mt-10">
//           <h2 className="text-3xl font-semibold mb-4 text-gray-900">Contents</h2>
//           <ul className="list-disc list-inside text-lg text-gray-600 mb-8">
//             {product.contents.map((content, index) => (
//               <li key={index}>{content}</li>
//             ))}
//           </ul>
//         </section>
//         <section className="mt-10">
//           <h2 className="text-3xl font-semibold mb-4 text-gray-900">Benefits</h2>
//           <ul className="list-disc list-inside text-lg text-gray-600">
//             {product.benefits.map((benefit, index) => (
//               <li key={index}>{benefit}</li>
//             ))}
//           </ul>
//         </section>
//         <section className="mt-10">
//           <h2 className="text-3xl font-semibold mb-4 text-gray-900">Reviews</h2>
//           <div className="mb-8">
//             {product.reviews.map((review, index) => (
//               <div key={index} className="mb-4">
//                 <StarRating rating={review.rating} setRating={() => {}} />
//                 <p className="text-gray-600">{review.text}</p>
//               </div>
//             ))}
//           </div>
//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Add a Review</h3>
//             <StarRating rating={reviewRating} setRating={setReviewRating} />
//             <textarea
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               className="border border-gray-300 p-2 rounded-md w-full mb-4"
//               placeholder="Write your review..."
//             ></textarea>
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 duration-300"
//               onClick={handleAddReview}
//             >
//               Submit Review
//             </button>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
}
