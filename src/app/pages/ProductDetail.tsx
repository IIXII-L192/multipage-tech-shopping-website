import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../store/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p
          className="text-2xl font-black mb-4"
          style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
        >
          Product not found
        </p>
        <Link to="/catalog" style={{ color: "#6750A4" }} className="hover:underline">
          ← Back to catalog
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
        color: selectedColor,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleBuyNow = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
        color: selectedColor,
      },
    });
    navigate("/cart");
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <nav
        className="flex items-center flex-wrap gap-1.5 text-sm mb-6"
        style={{ color: "#79747E" }}
      >
        <Link to="/" className="hover:underline" style={{ color: "#79747E" }}>
          Home
        </Link>
        <span>/</span>
        <Link to="/catalog" className="hover:underline" style={{ color: "#79747E" }}>
          Shop
        </Link>
        <span>/</span>
        <Link
          to={`/catalog?category=${product.category}`}
          className="hover:underline capitalize"
          style={{ color: "#79747E" }}
        >
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: "#1C1B1F" }}>{product.name}</span>
      </nav>

      
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:bg-[#EADDFF]"
        style={{ color: "#6750A4" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        
        <div>
          <div
            className="rounded-[36px] overflow-hidden aspect-square mb-4"
            style={{ backgroundColor: "#F4EFF4" }}
          >
            <img
              src={product.images[selectedImage] ?? product.imageUrl}
              alt={`${product.brand} ${product.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className="w-16 h-16 rounded-[16px] overflow-hidden border-2 transition-colors"
                  style={{
                    borderColor: selectedImage === idx ? "#6750A4" : "#CAC4D0",
                  }}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        
        <div>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-semibold" style={{ color: "#79747E" }}>
              {product.brand}
            </span>
            {product.badge && (
              <span
                className="px-3 py-0.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: "#EADDFF", color: "#21005D" }}
              >
                {product.badge}
              </span>
            )}
          </div>

          <h1
            className="text-4xl font-black leading-tight mb-4"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
          >
            {product.name}
          </h1>

          
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i <= Math.floor(product.rating)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "text-[#CAC4D0]"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-sm" style={{ color: "#1C1B1F" }}>
              {product.rating}
            </span>
            <span className="text-sm" style={{ color: "#79747E" }}>
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          
          <div className="flex items-end gap-3 mb-6">
            <span
              className="text-4xl font-black"
              style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
            >
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span
                  className="text-xl line-through mb-0.5"
                  style={{ color: "#79747E" }}
                >
                  ${product.originalPrice.toLocaleString()}
                </span>
                <span
                  className="px-2.5 py-1 rounded-full text-sm font-bold mb-0.5"
                  style={{ backgroundColor: "#F9DEDC", color: "#B3261E" }}
                >
                  -{discount}%
                </span>
              </>
            )}
          </div>

          
          <p className="leading-relaxed mb-5" style={{ color: "#49454F" }}>
            {product.description}
          </p>

          
          <ul className="space-y-2 mb-6">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#EADDFF" }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#6750A4" }}
                  />
                </div>
                <span style={{ color: "#1C1B1F" }}>{h}</span>
              </li>
            ))}
          </ul>

          
          {product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2" style={{ color: "#1C1B1F" }}>
                Color:{" "}
                <span className="font-normal" style={{ color: "#49454F" }}>
                  {selectedColor}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors"
                    style={
                      selectedColor === color
                        ? {
                            borderColor: "#6750A4",
                            backgroundColor: "#EADDFF",
                            color: "#21005D",
                          }
                        : { borderColor: "#CAC4D0", color: "#49454F" }
                    }
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-semibold" style={{ color: "#1C1B1F" }}>
              Qty:
            </span>
            <div
              className="flex items-center rounded-full border-2 overflow-hidden"
              style={{ borderColor: "#CAC4D0" }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center font-bold text-lg transition-colors hover:bg-[#EADDFF]"
                style={{ color: "#6750A4" }}
              >
                −
              </button>
              <span
                className="w-12 text-center font-bold"
                style={{ color: "#1C1B1F" }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center font-bold text-lg transition-colors hover:bg-[#EADDFF]"
                style={{ color: "#6750A4" }}
              >
                +
              </button>
            </div>
          </div>

          
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: added ? "#006E1C" : "#6750A4" }}
            >
              {added ? (
                <>✓ Added to Cart</>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-semibold border-2 transition-colors hover:bg-[#EADDFF]"
              style={{ borderColor: "#6750A4", color: "#6750A4" }}
            >
              <Zap className="w-5 h-5" /> Buy Now
            </button>

            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors"
              style={
                wishlisted
                  ? {
                      borderColor: "#7D5260",
                      backgroundColor: "#FFD8E4",
                      color: "#7D5260",
                    }
                  : { borderColor: "#CAC4D0", color: "#79747E" }
              }
            >
              <Heart
                className="w-5 h-5"
                style={wishlisted ? { fill: "#7D5260" } : {}}
              />
            </button>
          </div>

          
          <div
            className="flex flex-wrap gap-5 py-4 border-t text-sm"
            style={{ borderColor: "#CAC4D0", color: "#49454F" }}
          >
            {[
              { Icon: Truck, text: "Free Shipping" },
              { Icon: Shield, text: "2-Year Warranty" },
              { Icon: RotateCcw, text: "30-Day Returns" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4" style={{ color: "#6750A4" }} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          
          <div
            className="mt-5 rounded-[20px] border overflow-hidden"
            style={{ borderColor: "#CAC4D0" }}
          >
            <button
              onClick={() => setSpecsOpen(!specsOpen)}
              className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-[#F4EFF4]"
            >
              <span
                className="font-black"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
              >
                Specifications
              </span>
              {specsOpen ? (
                <ChevronUp className="w-4 h-4" style={{ color: "#79747E" }} />
              ) : (
                <ChevronDown className="w-4 h-4" style={{ color: "#79747E" }} />
              )}
            </button>

            {specsOpen && (
              <div className="border-t px-6 pb-4" style={{ borderColor: "#CAC4D0" }}>
                <dl>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <div
                      key={key}
                      className={`flex py-2.5 gap-4 ${i > 0 ? "border-t" : ""}`}
                      style={i > 0 ? { borderColor: "#E7E0EC" } : {}}
                    >
                      <dt
                        className="w-40 shrink-0 text-sm"
                        style={{ color: "#79747E" }}
                      >
                        {key}
                      </dt>
                      <dd className="text-sm" style={{ color: "#1C1B1F" }}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      
      {related.length > 0 && (
        <section>
          <h2
            className="text-2xl font-black mb-6"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
          >
            More in{" "}
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
