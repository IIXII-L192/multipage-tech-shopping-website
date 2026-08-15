import { useNavigate, Link } from "react-router";
import {
  ArrowRight,
  Star,
  Zap,
  Shield,
  Truck,
  RotateCcw,
  Headphones,
  Smartphone,
  Laptop,
} from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

const featuredIds = [
  "sony-wh1000xm5",
  "apple-macbook-air-m3",
  "samsung-galaxy-s24-ultra",
  "ps5-slim",
];
const newArrivalIds = [
  "apple-ipad-pro-m4",
  "apple-watch-ultra-2",
  "dji-mini-4-pro",
  "nintendo-switch-oled",
];

const brands = ["Sony", "Apple", "Samsung", "LG", "DJI", "Bose", "Nintendo", "GoPro"];

const perks = [
  { Icon: Truck, label: "Free Shipping", sub: "Orders over $100" },
  { Icon: Shield, label: "2-Year Warranty", sub: "On all electronics" },
  { Icon: RotateCcw, label: "30-Day Returns", sub: "Hassle-free" },
];

export default function Home() {
  const navigate = useNavigate();

  const featured = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  const newArrivals = newArrivalIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div>
      
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #EADDFF 0%, #E8DEF8 45%, #FFD8E4 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: "#EADDFF", color: "#21005D" }}
              >
                <Zap className="w-3.5 h-3.5" />
                New Season — Up to 28% Off
              </div>

              <h1
                className="text-5xl lg:text-7xl font-black leading-[1.05] mb-6"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: "#1C1B1F",
                }}
              >
                Shop the
                <br />
                <span style={{ color: "#6750A4" }}>Future</span>
                <br />
                Today.
              </h1>

              <p
                className="text-lg leading-relaxed mb-8 max-w-md"
                style={{ color: "#49454F" }}
              >
                Discover flagship smartphones, pro audio gear, and the latest
                gaming hardware — curated for the way you live.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
                  style={{ backgroundColor: "#6750A4" }}
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/catalog?tag=sale"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border-2 transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: "#6750A4",
                    color: "#6750A4",
                    backgroundColor: "rgba(255,255,255,0.55)",
                  }}
                >
                  View Deals
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {perks.map(({ Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#EADDFF" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#6750A4" }} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#1C1B1F" }}
                      >
                        {label}
                      </p>
                      <p className="text-xs" style={{ color: "#79747E" }}>
                        {sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="relative hidden lg:block">
              <div
                className="rounded-[40px] overflow-hidden aspect-square"
                style={{ backgroundColor: "#EADDFF" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&h=700&fit=crop&auto=format"
                  alt="Sony WH-1000XM5 premium noise-canceling headphones"
                  className="w-full h-full object-cover"
                />
              </div>

              
              <div
                className="absolute -bottom-5 -left-6 bg-white rounded-[24px] p-4 shadow-2xl flex items-center gap-3"
                style={{ minWidth: "210px" }}
              >
                <div
                  className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#EADDFF" }}
                >
                  <Headphones className="w-6 h-6" style={{ color: "#6750A4" }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#79747E" }}>
                    Best Seller
                  </p>
                  <p
                    className="font-black text-sm"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: "#1C1B1F",
                    }}
                  >
                    WH-1000XM5
                  </p>
                  <p className="font-bold text-sm" style={{ color: "#6750A4" }}>
                    $349
                  </p>
                </div>
              </div>

              
              <div className="absolute -top-4 -right-4 bg-white rounded-[20px] px-4 py-2 shadow-2xl flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                <span
                  className="font-black"
                  style={{ color: "#1C1B1F" }}
                >
                  4.8
                </span>
                <span className="text-xs" style={{ color: "#79747E" }}>
                  / 5.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-black"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
          >
            Browse Categories
          </h2>
          <Link
            to="/catalog"
            className="text-sm font-medium flex items-center gap-1 hover:underline"
            style={{ color: "#6750A4" }}
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.slice(1).map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/catalog?category=${cat.id}`)}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: cat.bgColor, color: cat.color }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      
      <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl font-black"
              style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
            >
              Featured Products
            </h2>
            <p className="text-sm mt-1" style={{ color: "#79747E" }}>
              Handpicked for quality and value
            </p>
          </div>
          <Link
            to="/catalog"
            className="text-sm font-medium flex items-center gap-1 hover:underline"
            style={{ color: "#6750A4" }}
          >
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[36px] overflow-hidden relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, #6750A4 0%, #7D5260 100%)" }}
        >
          <div className="flex-1 text-center md:text-left">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black mb-5 tracking-wide"
              style={{ backgroundColor: "#FFD8E4", color: "#31111D" }}
            >
              LIMITED TIME OFFER
            </div>
            <h2
              className="text-3xl md:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Up to 28% Off
              <br />
              TVs & Audio
            </h2>
            <p className="mb-7 text-lg" style={{ color: "#E8DEF8" }}>
              Upgrade your home entertainment setup. Sale ends Sunday, July 28.
            </p>
            <Link
              to="/catalog?tag=sale"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-colors hover:bg-[#EADDFF]"
              style={{ backgroundColor: "white", color: "#6750A4" }}
            >
              Shop the Sale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative shrink-0">
            <div className="w-44 h-44 md:w-64 md:h-64 rounded-[32px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&auto=format"
                alt="LG OLED C3 TV on sale"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full shadow-xl flex flex-col items-center justify-center"
              style={{ backgroundColor: "#FFD8E4", color: "#31111D" }}
            >
              <span className="text-[10px] font-bold leading-none">UP TO</span>
              <span
                className="text-xl font-black leading-none"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                28%
              </span>
              <span className="text-[10px] font-bold leading-none">OFF</span>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl font-black"
              style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
            >
              New Arrivals
            </h2>
            <p className="text-sm mt-1" style={{ color: "#79747E" }}>
              Just landed in our store
            </p>
          </div>
          <Link
            to="/catalog?tag=new"
            className="text-sm font-medium flex items-center gap-1 hover:underline"
            style={{ color: "#6750A4" }}
          >
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl font-black mb-6"
          style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
        >
          Explore by Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Smartphones",
              sub: "12 products",
              cat: "phones",
              Icon: Smartphone,
              bg: "#97F0FF",
              fg: "#006874",
              img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=280&fit=crop&auto=format",
            },
            {
              label: "Laptops",
              sub: "8 products",
              cat: "laptops",
              Icon: Laptop,
              bg: "#95F290",
              fg: "#006E1C",
              img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=280&fit=crop&auto=format",
            },
            {
              label: "Headphones",
              sub: "10 products",
              cat: "audio",
              Icon: Headphones,
              bg: "#FFD8E4",
              fg: "#7D5260",
              img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=280&fit=crop&auto=format",
            },
          ].map(({ label, sub, cat, Icon, bg, fg, img }) => (
            <button
              key={cat}
              onClick={() => navigate(`/catalog?category=${cat}`)}
              className="group relative rounded-[28px] overflow-hidden text-left transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ backgroundColor: bg }}
            >
              <img
                src={img}
                alt={label}
                className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p
                    className="font-black text-lg"
                    style={{ fontFamily: "'Nunito', sans-serif", color: fg }}
                  >
                    {label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: fg, opacity: 0.75 }}>
                    {sub}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: fg }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      
      <section className="py-12 mt-6" style={{ backgroundColor: "#F4EFF4" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-xs font-bold uppercase tracking-widest mb-8"
            style={{ color: "#79747E" }}
          >
            Featuring brands you trust
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => navigate(`/catalog?brand=${brand}`)}
                className="text-xl font-black transition-colors hover:underline"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: "#49454F",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#6750A4")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#49454F")
                }
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
