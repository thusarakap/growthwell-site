"use client";

// Import necessary types and components
import { useState, useMemo, ChangeEvent } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import products from '../products.json';

// Define types for products and state
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  image: string;
  reviews: { rating: number; text: string }[];
}

interface Filters {
  category: string[];
  brand: string[];
  priceRange: [number, number];
}

// Utility function to calculate average rating
function calculateAverageRating(reviews: { rating: number }[]): number {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
}

export default function Shop() {
  const { addToCart } = useCart();

  const [filters, setFilters] = useState<Filters>({
    category: [],
    brand: [],
    priceRange: [0, 2000],
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category.length > 0 && !filters.category.includes(product.category || '')) {
        return false;
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      if (searchTerm.length > 0 && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [filters, searchTerm]);

  const handleFilterChange = (type: 'category' | 'brand' | 'priceRange', value: string | [number, number]) => {
    setFilters((prevFilters) => {
      if (type === 'category') {
        return {
          ...prevFilters,
          category: typeof value === 'string'
            ? prevFilters.category.includes(value)
              ? prevFilters.category.filter((item) => item !== value)
              : [...prevFilters.category, value]
            : prevFilters.category,
        };
      } else if (type === 'priceRange') {
        return {
          ...prevFilters,
          priceRange: value as [number, number],
        };
      }
      return prevFilters;
    });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    addToCart(product);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex">
        <div className="bg-muted p-6 border-r border-muted-foreground/10 hidden md:block">
          <h3 className="text-lg font-bold mb-4">Filters</h3>
          <div className="grid gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Category</h4>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={filters.category.includes('Supplements')}
                    onCheckedChange={() => handleFilterChange('category', 'Supplements')}
                  />
                  Supplements
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={filters.category.includes('Treats')}
                    onCheckedChange={() => handleFilterChange('category', 'Treats')}
                  />
                  Treats
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={filters.category.includes('Toys')}
                    onCheckedChange={() => handleFilterChange('category', 'Toys')}
                  />
                  Toys
                </Label>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Price Range</h4>
              <div />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Rs.{filters.priceRange[0]}</span>
                <span>Rs.{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const averageRating = calculateAverageRating(product.reviews);
              return (
                <div key={product.id} className="bg-background rounded-md overflow-hidden shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
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
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Define icon components with props type
interface IconProps extends React.SVGProps<SVGSVGElement> {}

function PawPrintIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}