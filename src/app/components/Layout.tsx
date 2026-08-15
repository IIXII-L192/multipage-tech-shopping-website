import { Link, Outlet } from "react-router";
import { Zap } from "lucide-react";
import { Navbar } from "./Navbar";

const footerShop = ["Phones", "Laptops", "Audio", "Gaming", "Cameras", "Wearables"];
const footerSupport = ["Help Center", "Track Order", "Returns", "Warranty", "Contact"];
const footerCompany = ["About", "Careers", "Blog", "Press", "Partners"];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <Navbar />

      
      <main className="flex-1 pt-24 pb-24 md:pb-0">
        <Outlet />
      </main>

      
      <footer style={{ backgroundColor: "#1C1B1F", color: "#E7E0EC", marginTop: "4rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#EADDFF" }}
                >
                  <Zap className="w-4 h-4" style={{ color: "#6750A4" }} />
                </div>
                <span
                  className="font-black text-xl text-white"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Nexus
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#CAC4D0" }}>
                Your destination for the latest and greatest in consumer electronics. Free
                shipping on orders over $100.
              </p>
            </div>

            <div>
              <h4
                className="font-bold text-white mb-4"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Shop
              </h4>
              <ul className="space-y-2">
                {footerShop.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/catalog?category=${item.toLowerCase()}`}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#CAC4D0" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="font-bold text-white mb-4"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Support
              </h4>
              <ul className="space-y-2">
                {footerSupport.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#CAC4D0" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="font-bold text-white mb-4"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Company
              </h4>
              <ul className="space-y-2">
                {footerCompany.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#CAC4D0" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ borderColor: "#49454F" }}
          >
            <p className="text-xs" style={{ color: "#79747E" }}>
              © 2026 IIXII™ & Aakarsh Singhal. All rights reserved. (This is just a template, not a real service)
            </p>
            <div className="flex gap-6 text-xs" style={{ color: "#79747E" }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
