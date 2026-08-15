import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Zap,
  Home,
  Store,
  Tag,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { useCart } from "../store/CartContext";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  match: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home, match: "/" },
  { href: "/catalog", label: "Shop", icon: Store, match: "/catalog" },
  { href: "/catalog?tag=sale", label: "Deals", icon: Tag, match: "/catalog" },
];

// M3 Expressive "dynamic color" — each route seeds a different tonal accent,
// drawn from the design-system container tokens, and morphs smoothly on navigation.
const accentByRoute: Record<string, { glow: string; ring: string }> = {
  "/": { glow: "#EADDFF", ring: "#6750A4" },
  "/catalog": { glow: "#FFD8E4", ring: "#7D5260" },
  "/cart": { glow: "#E8DEF8", ring: "#6750A4" },
};

const spring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.9 };

export function Navbar() {
  const { state } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isSale = new URLSearchParams(location.search).get("tag") === "sale";
  const isActive = (item: NavItem) => {
    if (item.href === "/") return location.pathname === "/";
    if (item.label === "Deals")
      return location.pathname.startsWith("/catalog") && isSale;
    if (item.label === "Shop")
      return location.pathname.startsWith("/catalog") && !isSale;
    return location.pathname.startsWith(item.match);
  };

  const accent =
    accentByRoute[location.pathname] ?? accentByRoute["/catalog"];

  return (
    <>
      
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.header
          layout
          transition={spring}
          className="pointer-events-auto relative mt-3 w-full max-w-6xl overflow-hidden"
          style={{
            borderRadius: 9999,
            backgroundColor: scrolled
              ? "color-mix(in srgb, var(--background) 82%, transparent)"
              : "color-mix(in srgb, var(--background) 62%, transparent)",
            backdropFilter: "blur(18px) saturate(180%)",
            WebkitBackdropFilter: "blur(18px) saturate(180%)",
            border: "1px solid var(--border)",
            boxShadow: scrolled
              ? "0 12px 40px -12px rgba(103,80,164,0.35), 0 2px 8px rgba(28,27,31,0.06)"
              : "0 6px 24px -14px rgba(103,80,164,0.25)",
          }}
        >
          
          <motion.div
            aria-hidden
            className="absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full blur-3xl"
            animate={{ backgroundColor: accent.glow, opacity: scrolled ? 0.55 : 0.75 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <div className="relative flex items-center gap-2 px-3 sm:px-4">
            <motion.div layout className="flex items-center h-14">
              
              <Link to="/" className="flex items-center gap-2 shrink-0 pr-2">
                <motion.span
                  whileHover={{ rotate: -12, scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground"
                  style={{ boxShadow: "0 4px 12px -2px rgba(103,80,164,0.5)" }}
                >
                  <Zap className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </motion.span>
                <span
                  className="text-primary hidden sm:inline"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: "1.35rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Nexus
                </span>
              </Link>
            </motion.div>

            
            <nav className="hidden md:flex items-center gap-1 ml-2">
              {navItems.map((item) => {
                const active = isActive(item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={spring}
                        className="absolute inset-0 rounded-full bg-secondary"
                        style={{
                          boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--primary) 22%, transparent)",
                        }}
                      />
                    )}
                    <span
                      className="relative z-10 flex items-center gap-2 transition-colors"
                      style={{
                        color: active
                          ? "var(--secondary-foreground)"
                          : "var(--muted-foreground)",
                      }}
                    >
                      <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2.6 : 2.1} />
                      <span className="text-[0.95rem]">{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            
            <form
              onSubmit={handleSearch}
              className="relative flex-1 hidden lg:flex max-w-xs mx-auto"
            >
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2 rounded-full text-sm bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none transition-shadow"
                style={{ boxShadow: "0 0 0 0 transparent" }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0 2px ${accent.ring}`)
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0 transparent")}
              />
            </form>

            
            <div className="flex items-center gap-1 ml-auto">
              <IconButton
                onClick={() => setSearchOpen((v) => !v)}
                className="lg:hidden"
                label="Search"
              >
                <Search className="w-5 h-5" />
              </IconButton>

              <Link to="/cart" className="relative">
                <IconButton as="span" label="Cart">
                  <ShoppingCart className="w-5 h-5" />
                </IconButton>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0, y: -4 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0 }}
                      transition={spring}
                      className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] flex items-center justify-center pointer-events-none"
                      style={{ fontWeight: 800, boxShadow: "0 2px 6px rgba(103,80,164,0.5)" }}
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <IconButton
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden"
                label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex"
                  >
                    {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </IconButton>
            </div>
          </div>

          
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden overflow-hidden"
              >
                <form onSubmit={handleSearch} className="relative px-3 pb-3 pt-1">
                  <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search products…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-full text-sm bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>

      
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: "rgba(28,27,31,0.32)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="fixed z-40 md:hidden left-3 right-3 top-20 rounded-[28px] p-2 overflow-hidden"
              style={{
                backgroundColor: "color-mix(in srgb, var(--background) 92%, transparent)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--border)",
                boxShadow: "0 20px 50px -18px rgba(103,80,164,0.45)",
              }}
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={spring}
            >
              {navItems.map((item, i) => {
                const active = isActive(item);
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-[20px]"
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 700,
                        backgroundColor: active ? "var(--secondary)" : "transparent",
                        color: active
                          ? "var(--secondary-foreground)"
                          : "var(--foreground)",
                      }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2.3} />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      
      <div className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-4 pb-4 md:hidden pointer-events-none">
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={spring}
          className="pointer-events-auto flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{
            backgroundColor: "color-mix(in srgb, var(--background) 85%, transparent)",
            backdropFilter: "blur(18px) saturate(180%)",
            WebkitBackdropFilter: "blur(18px) saturate(180%)",
            border: "1px solid var(--border)",
            boxShadow: "0 12px 36px -12px rgba(103,80,164,0.4)",
          }}
        >
          {[...navItems, { href: "/cart", label: "Cart", icon: ShoppingCart, match: "/cart" }].map(
            (item) => {
              const active =
                item.label === "Cart"
                  ? location.pathname.startsWith("/cart")
                  : isActive(item as NavItem);
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative flex flex-col items-center justify-center rounded-full px-4 py-2"
                >
                  {active && (
                    <motion.span
                      layoutId="bottom-pill"
                      transition={spring}
                      className="absolute inset-0 rounded-full bg-secondary"
                    />
                  )}
                  <span
                    className="relative z-10 flex flex-col items-center gap-0.5 transition-colors"
                    style={{
                      color: active
                        ? "var(--secondary-foreground)"
                        : "var(--muted-foreground)",
                    }}
                  >
                    <span className="relative">
                      <Icon className="w-[22px] h-[22px]" strokeWidth={active ? 2.6 : 2.1} />
                      {item.label === "Cart" && cartCount > 0 && (
                        <span
                          className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center"
                          style={{ fontWeight: 800 }}
                        >
                          {cartCount > 9 ? "9+" : cartCount}
                        </span>
                      )}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              );
            }
          )}
        </motion.nav>
      </div>
    </>
  );
}

function IconButton({
  children,
  onClick,
  className = "",
  label,
  as = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  label: string;
  as?: "button" | "span";
}) {
  const Comp = motion[as] as typeof motion.button;
  return (
    <Comp
      type={as === "button" ? "button" : undefined}
      onClick={onClick}
      aria-label={label}
      whileHover={{ backgroundColor: "var(--muted)" }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className={`p-2.5 rounded-full text-muted-foreground flex items-center justify-center ${className}`}
    >
      {children}
    </Comp>
  );
}
