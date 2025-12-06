import { FilterOptions } from "@/types/product";

export default function ProductFilters({
  categories,
  filters,
  onFilterChange,
  onClearFilters,
  onSearchChange,
}: {
  categories: string[];
  filters: FilterOptions;
  onFilterChange: (field: keyof FilterOptions, value: any) => void;
  onClearFilters: () => void;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="p-6 bg-stone-100 rounded-lg border border-gray-300 h-full">
      <div className="grid grid-cols-1 gap-10">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
            placeholder="Search products..."
            className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange("category", e.target.value)}
                className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    onFilterChange(
                      "minPrice",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="w-1/2 bg-white  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    onFilterChange(
                      "maxPrice",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="w-1/2 bg-white  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={filters.status === "active"}
                    onChange={() => onFilterChange("status", "active")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={filters.status === "inactive"}
                    onChange={() => onFilterChange("status", "inactive")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Inactive</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={filters.status === null}
                    onChange={() => onFilterChange("status", null)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">All</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end w-full">
              <button
                onClick={onClearFilters}
                className="bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors rounded-sm py-1 px-5"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
