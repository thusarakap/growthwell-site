import { useState } from 'react';

export default function StarRating({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="text-2xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}
