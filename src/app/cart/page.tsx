"use client";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Group the products by ID to count quantities and calculate the total price
  interface ProductItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
    totalPrice: number;
    [key: string]: any; 
  }
  
  const groupedCart = cart.reduce((acc: ProductItem[], product) => {
    const existingProduct = acc.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalPrice += parseFloat(product.price);
    } else {
      acc.push({ ...product, quantity: 1, totalPrice: parseFloat(product.price) });
    }
    return acc;
  }, []);

  // Calculate the total price of the cart
  const totalPrice = groupedCart.reduce((acc, product) => acc + product.totalPrice, 0);

  const formatCartItems = () => {
    return groupedCart
      .map(
        (product) =>
          `${product.name} - Quantity: ${product.quantity} - Total: ${product.totalPrice.toFixed(2)}`
      )
      .join("%0A"); // "%0A" is URL encoded for new line
  };

  const handleCheckout = () => {
    const presetNumber = "1234567890"; // Replace with your preset number
    const message = `Hello,%0AI would like to place an order for the following items:%0A${formatCartItems()}%0A%0ATotal Price: ${totalPrice.toFixed(
      2
    )}`;
    const whatsappURL = `https://wa.me/${presetNumber}?text=${message}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          {groupedCart.map((product) => (
            <div key={product.id} className="flex items-center bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg w-20 h-20 object-cover"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-xl font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold text-gray-900">
                  Quantity: {product.quantity}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  Total: Rs. {product.totalPrice.toFixed(0)}/=
                </p>
              </div>
              <button
                className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-500 duration-300"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 duration-300"
              onClick={handleCheckout}
            >
              Checkout via WhatsApp
            </button>
            <button
              className="px-6 py-3 bg-red-600 text-white rounded-md shadow-md hover:bg-red-500 duration-300"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-4 text-lg font-bold text-gray-900">
            Total Price: Rs. {totalPrice}/=
          </div>
        </div>
      )}
    </main>
  );
}
