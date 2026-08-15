import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Trash2, ShoppingBag, Tag, Lock } from "lucide-react";
import { useCart } from "../store/CartContext";

export default function Cart() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "NEXUS10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#EADDFF" }}
        >
          <ShoppingBag className="w-10 h-10" style={{ color: "#6750A4" }} />
        </div>
        <h2
          className="text-3xl font-black mb-3"
          style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
        >
          Your cart is empty
        </h2>
        <p className="mb-8" style={{ color: "#79747E" }}>
          Add some products to get started on your order.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
          style={{ backgroundColor: "#6750A4" }}
        >
          Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full transition-colors hover:bg-[#E7E0EC]"
          style={{ color: "#49454F" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1
            className="text-3xl font-black"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
          >
            Shopping Cart
          </h1>
          <p className="text-sm" style={{ color: "#79747E" }}>
            {state.items.length} {state.items.length === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div
              key={`${item.id}-${item.color}`}
              className="flex gap-4 p-4 rounded-[24px] border bg-white"
              style={{ borderColor: "#CAC4D0" }}
            >
              
              <div
                className="w-24 h-24 rounded-[16px] overflow-hidden flex-shrink-0"
                style={{ backgroundColor: "#F4EFF4" }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: "#79747E" }}>
                  {item.brand}
                </p>
                <h3
                  className="font-black truncate"
                  style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
                >
                  {item.name}
                </h3>
                {item.color && (
                  <p className="text-xs mt-0.5" style={{ color: "#79747E" }}>
                    {item.color}
                  </p>
                )}

                <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                  
                  <div
                    className="flex items-center rounded-full border-2 overflow-hidden"
                    style={{ borderColor: "#CAC4D0" }}
                  >
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          dispatch({ type: "REMOVE_ITEM", payload: item.id });
                        } else {
                          dispatch({
                            type: "UPDATE_QTY",
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          });
                        }
                      }}
                      className="w-9 h-9 flex items-center justify-center font-bold transition-colors hover:bg-[#EADDFF]"
                      style={{ color: "#6750A4" }}
                    >
                      −
                    </button>
                    <span
                      className="w-9 text-center text-sm font-bold"
                      style={{ color: "#1C1B1F" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QTY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                      className="w-9 h-9 flex items-center justify-center font-bold transition-colors hover:bg-[#EADDFF]"
                      style={{ color: "#6750A4" }}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className="font-black text-lg"
                      style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
                    >
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item.id })
                      }
                      className="p-1.5 rounded-full transition-colors hover:bg-[#F9DEDC]"
                      style={{ color: "#79747E" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#B3261E")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#79747E")
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors hover:bg-[#EADDFF]"
              style={{ color: "#6750A4" }}
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        
        <div>
          <div
            className="rounded-[28px] p-6 sticky top-24 border"
            style={{ backgroundColor: "#FFFBFE", borderColor: "#CAC4D0" }}
          >
            <h2
              className="text-xl font-black mb-6"
              style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
            >
              Order Summary
            </h2>

            
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Tag
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#79747E" }}
                />
                <input
                  type="text"
                  placeholder='Try "NEXUS10"'
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError(false);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: "#E7E0EC",
                    color: "#1C1B1F",
                  }}
                />
              </div>
              <button
                onClick={handlePromo}
                className="px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#6750A4" }}
              >
                Apply
              </button>
            </div>

            {promoApplied && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#95F290", color: "#006E1C" }}
              >
                ✓ 10% discount applied (NEXUS10)
              </div>
            )}
            {promoError && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#F9DEDC", color: "#B3261E" }}
              >
                ✗ Invalid promo code
              </div>
            )}

            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "#49454F" }}>
                  Subtotal ({state.items.reduce((s, i) => s + i.quantity, 0)} items)
                </span>
                <span className="font-semibold" style={{ color: "#1C1B1F" }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between" style={{ color: "#006E1C" }}>
                  <span>Promo discount</span>
                  <span className="font-semibold">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span style={{ color: "#49454F" }}>Shipping</span>
                <span
                  className="font-semibold"
                  style={{ color: shipping === 0 ? "#006E1C" : "#1C1B1F" }}
                >
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span style={{ color: "#49454F" }}>Tax (8%)</span>
                <span className="font-semibold" style={{ color: "#1C1B1F" }}>
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div
                className="flex justify-between pt-3 border-t"
                style={{ borderColor: "#CAC4D0" }}
              >
                <span className="text-base font-bold" style={{ color: "#1C1B1F" }}>
                  Total
                </span>
                <span
                  className="text-xl font-black"
                  style={{ fontFamily: "'Nunito', sans-serif", color: "#1C1B1F" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {shipping > 0 && (
              <p
                className="text-xs mt-3 text-center"
                style={{ color: "#79747E" }}
              >
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            
            <button
              onClick={() => alert("Checkout coming soon! 🛍️")}
              className="w-full mt-6 py-4 rounded-full font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: "#6750A4" }}
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div
              className="flex items-center justify-center gap-2 mt-4 text-xs"
              style={{ color: "#79747E" }}
            >
              <Lock className="w-3 h-3" />
              <span>SSL Encrypted • Visa • Mastercard • Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
