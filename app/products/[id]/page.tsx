"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/components/ProductComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Page({ params }: { params: { id: string } }) {
  // ✅ Correctly destructure id from params (no React.use)
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // 🛒 Add to Cart Function
  const addToCart = (product: Product) => {
    try {
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];

      const existingItem = cart.find((item: Product) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      toast.error("Error adding to cart.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-950 px-6 py-12">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div className="w-full md:w-1/2 h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl" />
          <div className="flex flex-col justify-between w-full md:w-1/2">
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="flex items-center justify-between mt-6">
              <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-9 w-28 rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-400">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex justify-center items-center px-6 py-12">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-80 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain h-72 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-snug">
              {product.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
