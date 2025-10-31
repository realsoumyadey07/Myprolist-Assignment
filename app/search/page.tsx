"use client";

import { Suspense, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductComponent, { Product } from "@/components/ProductComponent";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading search...</div>}>
      <SearchPage />
    </Suspense>
  );
}

function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setQuery(currentQuery);
  }, [searchParams]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );

    setFilteredProducts(filtered);
  }, [query, products]);

  const handleSearchChange = (value: string) => {
    setQuery(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    router.replace(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-5 flex flex-col items-center">
      <div className="relative w-full mb-10 md:hidden flex">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-4 py-7 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition w-full"
        />
      </div>

      {query.trim() === "" ? (
        <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-600 dark:text-gray-400">
          <Search size={48} className="mb-4 opacity-70" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-400 mb-2">
            Search Products
          </h1>
          <p className="text-lg">Start typing to search for products</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            You can search by product name, category, or keyword.
          </p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <section className="w-full">
          <h2 className="text-xl mb-4 text-gray-700 dark:text-gray-300 text-center">
            Showing results for{" "}
            <span className="font-semibold">&quot;{query}&quot;</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductComponent key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center mt-10 text-gray-600 dark:text-gray-400">
          <Search size={48} className="mb-4 opacity-60" />
          <h1 className="text-xl font-medium">No products found</h1>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your search terms.
          </p>
        </div>
      )}
    </div>
  );
}
