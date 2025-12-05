import { Product } from "@/types/product";
import ProductCard from "./card";
import VirtualList from "../shared/virtualLists";

const Card= ({ products }:{ products:Product[] }) => {
  return (
    <div className="border rounded-lg col-span-1 bg-stone-100  border-gray-300 h-full p-2 grid grid-cols-1 gap-2 ">
      <label className="block p-2 text-Productmd font-extrabold text-gray-700">
        Result: {products.length} items
      </label>

      <VirtualList
        items={products}
        itemHeight={100}
        containerHeight={400}
        renderItem={(product) => {return <div><ProductCard product={product} /></div>}} 
      />
    </div>
  );
};

export default Card;