import ProductFilters from "@/components/product-app/page";
import { Main } from "next/document";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
    <ProductFilters/>
    </div>
  );
}
