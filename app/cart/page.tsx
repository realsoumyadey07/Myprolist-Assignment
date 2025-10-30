"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Product } from "@/components/ProductComponent";

export default function Page() {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          return JSON.parse(storedCart);
        } catch (err) {
          console.error("Error parsing cart:", err);
        }
      }
    }
    return [];
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0
  );

  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, change: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max((item.quantity ?? 1) + change, 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 px-6 py-5 flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-400 mb-5">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 mt-20 w-full">
          <ShoppingCart size={50} className="mb-5"/>
          <p className="text-lg">Your cart is empty</p>
          <p className="text-sm text-gray-500 mt-2">
            Start adding some products to your cart!
          </p>
        </div>
      ) : (
        <div className="w-full max-w-7xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6">
          {/* Cart Items */}
          <div className="space-y-10">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-contain rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Subtotal:
              <span className="ml-2 text-blue-600 dark:text-blue-400 font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
