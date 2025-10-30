"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Input } from "./ui/input";
import { ShoppingCart } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function DesktopNavContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("query") || "");

  const handleSearch = (value: string) => {
    setQuery(value);
    const params = new URLSearchParams(searchParams);
    if (value) params.set("query", value);
    else params.delete("query");
    router.replace(`/search?${params.toString()}`);
  };

  return (
    <nav className="hidden md:flex items-center justify-between px-10 py-4 bg-white dark:bg-gray-900 shadow-md">
      <Link
        href="/"
        className="text-2xl font-semibold text-gray-800 dark:text-gray-300 hover:text-blue-600 transition-colors"
      >
        Myprolist
      </Link>

      <div className="flex items-center gap-4">
        <div className="w-64">
          <Input
            placeholder="Search products..."
            className="w-full"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              if (pathname !== "/search") router.push("/search");
            }}
          />
        </div>

        <Link
          href="/cart"
          className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </Link>

        <ModeToggle />
      </div>
    </nav>
  );
}

// ✅ Wrap the part using useSearchParams with Suspense
export default function DesktopNav() {
  return (
    <Suspense fallback={null}>
      <DesktopNavContent />
    </Suspense>
  );
}
