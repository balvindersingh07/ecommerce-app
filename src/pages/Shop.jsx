// src/pages/Shop.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { add as addToCart } from "../redux/cartSlice";
import { toggle as toggleWish } from "../redux/wishlistSlice";

const FALLBACK_IMG =
  "https://via.placeholder.com/600x700.png?text=Product+Image";
const toINR = (usd) => Math.round((Number(usd) || 0) * 83);

// ---- Helpers: normalize cat from URL to FakeStore API values ----
function normalizeApiCategory(raw) {
  let x = decodeURIComponent(raw || "").trim().toLowerCase();

  // unify to kebab for easier checks
  x = x.replace(/\s+/g, "-");

  if (x === "electronics") return "electronics";
  if (x === "womens-clothing" || x === "women's-clothing") return "women's clothing";
  if (x === "mens-clothing" || x === "men's-clothing") return "men's clothing";
  if (x === "jewellery" || x === "jewelery") return "jewelery"; // API uses 'jewelery'
  // if empty or unknown -> all products
  return "";
}

const PRETTY_LABEL = {
  "": "All Products",
  electronics: "Electronics",
  "women's clothing": "Women’s Clothing",
  "men's clothing": "Men’s Clothing",
  jewelery: "Jewellery",
};

export default function Shop() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL params
  const catFromUrl = searchParams.get("cat") || "";
  const apiCat = normalizeApiCategory(catFromUrl);
  const qParam = searchParams.get("q") || "";

  // Local state
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(qParam);
  const [sort, setSort] = useState("default"); // default | price-asc | price-desc | rating-desc
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(50000);
  const [error, setError] = useState("");

  // Fetch all or by category whenever cat changes
  useEffect(() => {
    const url = apiCat
      ? `https://fakestoreapi.com/products/category/${encodeURIComponent(apiCat)}`
      : "https://fakestoreapi.com/products";

    let alive = true;
    setLoading(true);
    setError("");

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        if (!alive) return;
        setAll(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setError("Unable to load products. Please try again.");
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [apiCat]);

  // Keep local search in sync with URL ?q=
  useEffect(() => {
    setQ(qParam);
  }, [qParam]);

  // Derived + filtered list
  const products = useMemo(() => {
    let arr = all.map((p) => ({ ...p, inr: toINR(p.price) }));
    if (q.trim()) {
      const needle = q.toLowerCase();
      arr = arr.filter((p) => (p.title || "").toLowerCase().includes(needle));
    }
    arr = arr.filter((p) => p.inr >= min && p.inr <= max);

    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.inr - b.inr);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.inr - a.inr);
    if (sort === "rating-desc")
      arr = [...arr].sort(
        (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
      );

    return arr;
  }, [all, q, sort, min, max]);

  const prettyCat = PRETTY_LABEL[apiCat ?? ""] ?? "Products";

  // Card handlers
  const handleAdd = (p) =>
    dispatch(
      addToCart({
        id: p.id,
        title: p.title,
        price: p.inr,
        image: p.image,
      })
    );

  const handleWish = (p) =>
    dispatch(
      toggleWish({
        id: p.id,
        title: p.title,
        price: p.inr,
        image: p.image,
      })
    );

  // Sync URL when searching
  const onSearchChange = (val) => {
    setQ(val);
    const next = new URLSearchParams(searchParams);
    if (val) next.set("q", val);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-primary-700">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link to="/shop" className="hover:text-primary-700">
          Shop
        </Link>
        {apiCat && (
          <>
            <span className="mx-2">›</span>
            <span className="text-gray-800">{prettyCat}</span>
          </>
        )}
      </div>

      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h1 className="text-xl font-bold">
          {prettyCat}{" "}
          <span className="text-gray-500 font-normal">({products.length})</span>
        </h1>
        <div className="text-sm text-gray-500">
          {loading ? "Loading…" : error ? "" : "Showing best results"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <aside className="md:col-span-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              value={q}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Search products…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sort by</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating-desc">Rating</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Price range (₹)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(+e.target.value || 0)}
                className="w-1/2 border rounded px-3 py-2"
              />
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(+e.target.value || 0)}
                className="w-1/2 border rounded px-3 py-2"
              />
            </div>
          </div>
        </aside>

        {/* Grid */}
        <section className="md:col-span-3">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : loading ? (
            <p className="text-gray-500">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products match your filters.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image || FALLBACK_IMG}
                  title={p.title}
                  price={p.inr}
                  oldPrice={Math.round(p.inr * 1.18)}
                  onAddToCart={() => handleAdd(p)}
                  onAddToWish={() => handleWish(p)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
