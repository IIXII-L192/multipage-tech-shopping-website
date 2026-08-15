import { Link } from "react-router";
import { Star } from "lucide-react";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

function getBadgeStyle(badge: string): React.CSSProperties {
  if (badge === "New") return { backgroundColor: "#95F290", color: "#006E1C" };
  if (badge === "Pro") return { backgroundColor: "#DAE2FF", color: "#00419B" };
  if (badge.includes("%") || badge === "Sale")
    return { backgroundColor: "#FFD8E4", color: "#31111D" };
  return { backgroundColor: "#EADDFF", color: "#21005D" };
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div
        className="rounded-[28px] overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border h-full flex flex-col"
        style={{ borderColor: "#CAC4D0" }}
      >
        
        <div
          className="relative aspect-square overflow-hidden flex-shrink-0"
          style={{ backgroundColor: "#F4EFF4" }}
        >
          <img
            src={product.imageUrl}
            alt={`${product.brand} ${product.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <div
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
              style={getBadgeStyle(product.badge)}
            >
              {product.badge}
            </div>
          )}
          {discount && (
            <div
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "#F9DEDC", color: "#B3261E" }}
            >
              -{discount}%
            </div>
          )}
        </div>

        
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs font-medium mb-0.5" style={{ color: "#79747E" }}>
            {product.brand}
          </p>
          <h3
            className="font-bold mb-2 line-clamp-2 text-sm"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mb-3 mt-auto">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i <= Math.floor(product.rating)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "text-[#CAC4D0]"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: "#79747E" }}>
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="font-black text-lg"
              style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
            >
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through" style={{ color: "#79747E" }}>
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
