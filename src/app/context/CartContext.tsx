"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  contents: string[];
  benefits: string[];
  reviews: {
    rating: number;
    text: string;
  }[];
  category?: string; // Make category optional
}
// Define the context type
interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
  }
  
  // Create the context with a default value
  const CartContext = createContext<CartContextType | undefined>(undefined);
  
  // Create a provider component
  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);
  
    // Load cart from local storage when component mounts
    useEffect(() => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }, []);
  
    // Save cart to local storage whenever it changes
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
  
    const addToCart = (product: Product) => {
      setCart((prevCart) => [...prevCart, product]);
    };
  
    const removeFromCart = (productId: number) => {
      setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };
  
    const clearCart = () => {
      setCart([]);
      localStorage.removeItem("cart");
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  // Custom hook to use the cart context
  export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };
  