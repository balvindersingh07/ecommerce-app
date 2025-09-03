// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiPhone,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
  FiSearch,
  FiMenu,
  FiAlertCircle,
} from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SAFE SELECTORS
  const cartItems = useSelector((s) =>
    Array.isArray(s?.cart?.items) ? s.cart.items : []
  );
  const cartCount = cartItems.reduce((a, c) => a + (c?.qty || 1), 0);

  const wishItems = useSelector((s) =>
    Array.isArray(s?.wishlist?.items) ? s.wishlist.items : []
  );
  const wishCount = wishItems.length;

  // UI state
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");
  const [q, setQ] = useState("");

  // Auth
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("currentUser") || "null");
      setUser(u);
    } catch {
      setUser(null);
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    dispatch({ type: "ui/logout" });
    setUser(null);
    navigate("/");
  };

  // 🔎 route searches to /shop?q=
  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/shop?q=" + encodeURIComponent(q));
  };

  return (
    <header className="bg-white border-b">
      {/* Top strip */}
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiPhone className="text-primary-600" />
            <span className="hidden sm:inline">Call: +9194604-03092</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency */}
            <label className="flex items-center gap-1">
              <span className="sr-only">Currency</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none bg-transparent px-2 py-1 rounded border border-gray-200 hover:border-gray-300 focus:outline-none"
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <FiChevronDown />
            </label>

            {/* Language */}
            <label className="flex items-center gap-1">
              <span className="sr-only">Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-transparent px-2 py-1 rounded border border-gray-200 hover:border-gray-300 focus:outline-none"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>German</option>
              </select>
              <FiChevronDown />
            </label>

            {/* Auth actions */}
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="hover:text-gray-900 whitespace-nowrap">
                  Sign in
                </Link>
                <span className="text-gray-300">/</span>
                <Link to="/signup" className="hover:text-gray-900 whitespace-nowrap">
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="whitespace-nowrap">
                  Hello, <span className="font-medium">{user.name || user.email}</span>
                </span>
                <button
                  onClick={onLogout}
                  className="px-3 py-1 rounded border hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-12 items-center gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="col-span-12 md:col-span-2 text-2xl font-extrabold tracking-tight"
          >
            <span className="inline-flex items-center">
              <img
                src="/logo.png"
                alt="ShopSage logo"
                className="mr-2 w-8 h-8 object-contain"
                onError={(e) => (e.currentTarget.src = "/logo.svg")}
              />
              ShopSage
            </span>
          </Link>

          {/* Search */}
          <form
            onSubmit={onSubmit}
            className="col-span-12 md:col-span-6 order-3 md:order-none"
          >
            <div className="flex">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search product ..."
                className="flex-1 border border-primary-200 rounded-l-xl px-4 h-12 focus:outline-none"
              />
              <button
                type="submit"
                className="h-12 px-5 rounded-r-xl bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>

          {/* Wishlist / Cart */}
          <div className="col-span-12 md:col-span-4 flex items-center justify-end gap-8">
            <Link to="/wishlist" className="relative text-gray-700">
              <div className="flex items-center gap-2 justify-center">
                <span className="relative">
                  <FiHeart size={22} />
                  {wishCount > 0 && (
                    <span className="absolute -top-2 -right-3 text-xs bg-primary-600 text-white rounded-full px-1">
                      {wishCount}
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">Wishlist</span>
              </div>
            </Link>

            <Link to="/cart" className="relative text-gray-700">
              <div className="flex items-center gap-2 justify-center">
                <span className="relative">
                  <FiShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 text-xs bg-primary-600 text-white rounded-full px-1">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">Cart</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom nav bar */}
      <div className="bg-zinc-900 text-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Browse Categories -> Shop */}
            <Link
              to="/shop"
              className="flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-md"
            >
              <FiMenu size={20} />
              <span>Browse Categories</span>
            </Link>

            {/* Category links -> Shop with ?cat= */}
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <NavItem label="ELECTRONICS"      to="/shop?cat=electronics" />
              <NavItem label="WOMEN'S CLOTHING" to="/shop?cat=women%27s%20clothing" />
              <NavItem label="MEN'S CLOTHING"   to="/shop?cat=men%27s%20clothing" />
              <NavItem label="JEWELLERY"        to="/shop?cat=jewelery" />
            </nav>

            {/* Clearance text */}
            <div className="hidden md:flex items-center gap-3 text-primary-300">
              <span className="h-6 w-px bg-white/30" />
              <FiAlertCircle />
              <span className="font-medium">Clearance Up to 30% Off</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// NavItem -> Link to /shop?cat=...
function NavItem({ label, to }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1 hover:text-primary-300"
    >
      <span>{label}</span>
      <FiChevronDown className="transition-transform group-hover:rotate-180" />
    </Link>
  );
}
