import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-gray-300 rounded-sm p-2 grid grid-cols-2 gap-2 py-2 mb-2">
      <div className="flex">
        <label className="block text-sm font-bold text-gray-700">Name:</label>
        <label className="pl-2 block text-sm font-normal text-gray-700">
          {product.name}
      </label>
    </div>
    <div className="flex">
      <label className="block text-sm font-bold text-gray-700">Category:</label>
      <label className="pl-2 block text-sm font-normal text-gray-700">
        {product.category}
      </label>
    </div>
    <div className="flex">
      <label className="block text-sm font-bold text-gray-700">Price:</label>
      <label className="pl-2 block text-sm font-normal text-gray-700">
        ${product.price.toFixed(2) || "info not available"}
      </label>
    </div>
    <div className="flex">
      <label className="block text-sm font-bold text-gray-700">Status:</label>
      <label className="pl-2 block text-sm font-normal text-gray-700">
        {product.status}
      </label>
    </div>
  </div>
)}