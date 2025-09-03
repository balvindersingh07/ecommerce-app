// src/components/Hero.jsx
import { Link } from "react-router-dom";

const BANNER = "/logo2.png";              // public/logo2.png
const FALLBACK = "https://via.placeholder.com/1600x600.png?text=ShopSage+Sale";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left copy */}
          <div className="lg:col-span-5">
            <p className="uppercase tracking-wider text-primary-600 font-semibold">
              Tradition, Reimagined.
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Classic roots.<br />Modern prints.<br />
              Your wardrobe deserves{" "}
              <span className="text-primary-600">this upgrade.</span>
            </h1>
            <p className="mt-4 text-gray-600">
              Handpicked styles curated for comfort and everyday elegance.
            </p>

            <div className="mt-6 flex gap-3">
              <Link to="/category/womens-clothing" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/shop" className="btn btn-outline">
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Right banner */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl shadow-soft border">
              {/* Fixed height so gray gap disappear, image covers nicely */}
              <img
                src={BANNER}
                alt="ShopSage fashion sale"
                className="w-full h-[320px] sm:h-[380px] object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
