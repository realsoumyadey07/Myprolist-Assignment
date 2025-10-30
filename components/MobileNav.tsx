"use client";

import Link from "next/link";
import { Home, Search, ShoppingCart } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-md md:hidden">
      <div className="flex justify-around items-center py-3">
        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Home size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* Search */}
        <Link
          href="/search"
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Search size={22} />
          <span className="text-xs mt-1">Search</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ShoppingCart size={22} />
          <span className="text-xs mt-1">Cart</span>
        </Link>

        {/* Theme Toggle */}
        <div className="flex flex-col items-center">
          <ModeToggle />
          <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
            Mode
          </span>
        </div>
      </div>
    </nav>
  );
}

export default MobileNav;
