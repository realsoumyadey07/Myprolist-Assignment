"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductComponent, { Product } from "@/components/ProductComponent";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if products already exist in localStorage
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        setProducts(parsed);
        setLoading(false);
        return; // ✅ Skip API call if cached data is available
      } catch (err) {
        console.error("Error parsing stored products:", err);
      }
    }

    // ✅ Fetch products from API if not cached
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data)); // ✅ Save to localStorage
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ProductCardSkeleton />;
  }

  return (
    <>
      {products.length > 0 && (
        <section className="md:px-10 py-5 px-5 bg-gray-50 dark:bg-gray-950 min-h-screen">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-5 text-center">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductComponent key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function ProductCardSkeleton() {
  return (
    <section className="md:px-10 px-5 py-5 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-300 mb-5 text-center">
        Loading Products...
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 flex flex-col space-y-4 hover:shadow-lg transition-shadow"
          >
            {/* Image skeleton */}
            <div className="flex justify-center items-center h-64 bg-gray-100 dark:bg-gray-800 rounded-xl" />

            {/* Text skeletons */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Price and Button skeleton */}
            <div className="flex justify-between items-center mt-auto">
              <Skeleton className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-8 w-24 rounded-md bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
