// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Hero from "../components/Hero.jsx";
import PolicyStrip from "../components/PolicyStrip.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { add as addToCart } from "../redux/cartSlice";
import { toggle as toggleWish } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tab, setTab] = useState("featured");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("https://fakestoreapi.com/products?limit=12")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) {
          setItems(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const onAddToCart = (p) =>
    dispatch(
      addToCart({
        id: p.id,
        title: p.title,
        price: Math.round(p.price * 83), // INR approx
        image: p.image,
      })
    );

  const onAddToWish = (p) =>
    dispatch(
      toggleWish({
        id: p.id,
        title: p.title,
        price: Math.round(p.price * 83),
        image: p.image,
      })
    );

  return (
    <>
      <Hero />
      <PolicyStrip />

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            {["featured", "popular", "new"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-full text-sm border ${
                  tab === t
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-white text-gray-700 hover:bg-primary-50 border-gray-200"
                }`}
              >
                {t === "featured"
                  ? "Featured"
                  : t === "popular"
                  ? "Popular"
                  : "New added"}
              </button>
            ))}
            <div className="ml-auto">
              <Link to="/shop" className="text-primary-700 text-sm hover:underline">
                View More »
              </Link>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading products…</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.slice(0, 8).map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image}
                  title={p.title}
                  price={Math.round(p.price * 83)}
                  onAddToCart={() => onAddToCart(p)}
                  onAddToWish={() => onAddToWish(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
