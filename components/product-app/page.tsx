"use client";
import { useDebounce } from "@/hooks/useDebouncing";
import { Product, products } from "@/types/product";
import  {
  useState,
  useCallback,
  useMemo,
} from "react";
import ProductFilters from "./ProductFilters";
import Card from "./cards";

interface FilterOptions {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  status: "active" | "inactive" | null;
}

const normalizeSearch = (search: string): string => {
  return search.trim().toLowerCase();
};

const filterProducts = (
  products: Product[],
  filters: FilterOptions
): Product[] => {
  const searchTerm = normalizeSearch(filters.search);
  const hasSearch = searchTerm.length > 0;
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.minPrice !== null && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && product.price > filters.maxPrice) {
      return false;
    }

    if (filters.status !== null && product.status !== filters.status) {
      return false;
    }
    if (hasSearch) {
      if (!product.name.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }
    return true;
  });
};

export default function SearchFilterApp() {
  
  const allProducts = products;
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    category: "",
    minPrice: null,
    maxPrice: null,
    status: null,
  });

  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((p: any) => p.category))).sort();
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return filterProducts(allProducts, filters);
  }, [allProducts, filters]);

  const performSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const debouncedSearch = useDebounce(performSearch, 500);
  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  const handleFilterChange = useCallback(
    (field: keyof FilterOptions, value: any) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    []
  );
  
  const handleClearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "",
      minPrice: null,
      maxPrice: null,
      status: null,
    });

  }, []);

  return (
    <div className="p-6 bg-white max-w-7xl w-full rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <ProductFilters
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onSearchChange={handleSearchChange}
        />

        <div className="grid grid-cols-1 gap-4">
          <Card products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
