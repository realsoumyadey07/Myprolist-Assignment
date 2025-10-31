import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
};

function ProductComponent({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      key={product.id}
      className="bg-white dark:bg-gray-900 shadow-md rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain h-48 transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col justify-between">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition">
            <ShoppingCart size={16} />
            Product Details
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductComponent;
