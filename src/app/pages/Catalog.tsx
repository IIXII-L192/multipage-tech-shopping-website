import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Filter, X, Star, SlidersHorizontal } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryParam = searchParams.get("category") || "all";
  const tagParam = searchParams.get("tag") || "";
  const searchParam = searchParams.get("search") || "";
  const brandParam = searchParams.get("brand") || "";
  const sortParam = searchParams.get("sort") || "featured";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandParam ? [brandParam] : []
  );
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);

  const allBrands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    []
  );

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    if (tagParam) {
      result = result.filter((p) => p.tags.includes(tagParam));
    }
    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    result = result.filter((p) => p.price <= maxPrice);
    result = result.filter((p) => p.rating >= minRating);

    switch (sortParam) {
      case "price-asc":
        return result.sort((a, b) => a.price - b.price);
      case "price-desc":
        return result.sort((a, b) => b.price - a.price);
      case "rating":
        return result.sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [selectedCategory, selectedBrands, tagParam, searchParam, maxPrice, minRating, sortParam]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrands([]);
    setMaxPrice(5000);
    setMinRating(0);
    setSearchParams({});
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedBrands.length +
    (maxPrice < 5000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const pageTitle = searchParam
    ? `Results for "${searchParam}"`
    : tagParam === "sale"
    ? "Sale Items"
    : tagParam === "new"
    ? "New Arrivals"
    : selectedCategory !== "all"
    ? (categories.find((c) => c.id === selectedCategory)?.label ?? "Products")
    : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1
            className="text-3xl font-black"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
          >
            {pageTitle}
          </h1>
          <p className="text-sm mt-1" style={{ color: "#79747E" }}>
            {filtered.length} products
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors lg:hidden"
            style={
              filtersOpen
                ? {
                    backgroundColor: "#EADDFF",
                    borderColor: "#6750A4",
                    color: "#21005D",
                  }
                : { borderColor: "#CAC4D0", color: "#49454F" }
            }
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span
                className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "#6750A4" }}
              >
                {activeFiltersCount}
              </span>
            )}
          </button>

          
          <select
            value={sortParam}
            onChange={(e) =>
              setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.set("sort", e.target.value);
                return next;
              })
            }
            className="px-4 py-2 rounded-full text-sm font-medium border-2 focus:outline-none cursor-pointer"
            style={{ borderColor: "#CAC4D0", color: "#49454F", backgroundColor: "white" }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={
              selectedCategory === cat.id
                ? { backgroundColor: cat.color, color: "#FFFFFF" }
                : { backgroundColor: cat.bgColor, color: cat.color }
            }
          >
            {cat.id !== "all" && <span>{cat.icon}</span>}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        
        <aside className={`shrink-0 w-60 ${filtersOpen ? "block" : "hidden lg:block"}`}>
          <div
            className="sticky top-24 rounded-[24px] p-5 border"
            style={{ borderColor: "#CAC4D0", backgroundColor: "#FFFBFE" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3
                className="font-black text-base"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
              >
                Filters
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{ color: "#6750A4" }}
                >
                  <X className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>

            
            <div className="mb-6">
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "#1C1B1F" }}
              >
                Max Price:{" "}
                <span style={{ color: "#6750A4" }}>
                  ${maxPrice.toLocaleString()}
                </span>
              </p>
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#6750A4] cursor-pointer"
              />
              <div
                className="flex justify-between text-xs mt-1"
                style={{ color: "#79747E" }}
              >
                <span>$50</span>
                <span>$5,000</span>
              </div>
            </div>

            
            <div className="mb-6">
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "#1C1B1F" }}
              >
                Brand
              </p>
              <div className="space-y-2">
                {allBrands.map((brand) => {
                  const checked = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className="w-5 h-5 rounded-[6px] border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
                        style={
                          checked
                            ? { backgroundColor: "#6750A4", borderColor: "#6750A4" }
                            : { borderColor: "#CAC4D0" }
                        }
                        onClick={() => toggleBrand(brand)}
                      >
                        {checked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm" style={{ color: "#49454F" }}>
                        {brand}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "#1C1B1F" }}
              >
                Minimum Rating
              </p>
              <div className="space-y-1">
                {[4.5, 4.0, 0].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors"
                    style={
                      minRating === r
                        ? {
                            backgroundColor: "#EADDFF",
                            color: "#21005D",
                            fontWeight: 600,
                          }
                        : { color: "#49454F" }
                    }
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        r > 0 ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CAC4D0]"
                      }`}
                    />
                    {r > 0 ? `${r}+ stars` : "All ratings"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#E7E0EC" }}
              >
                <Filter className="w-8 h-8" style={{ color: "#79747E" }} />
              </div>
              <h3
                className="text-xl font-black mb-2"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
              >
                No products found
              </h3>
              <p className="mb-5" style={{ color: "#79747E" }}>
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#EADDFF] transition-colors"
                style={{ color: "#6750A4" }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
