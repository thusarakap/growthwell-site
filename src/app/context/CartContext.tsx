"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the product type
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
}

// Define the context type
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
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
