// src/pages/ProductDetail.jsx
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { add as addToCart } from "../redux/cartSlice";
import { toggle as toggleWish } from "../redux/wishlistSlice";
import { FiHeart, FiCreditCard, FiTruck, FiShield } from "react-icons/fi";
import RatingStars from "../components/RatingStars";

const FALLBACK_IMG =
  "https://via.placeholder.com/700x700.png?text=Product+Image";
const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setErr("");
    setProduct(null);

    fetch(`https://fakestoreapi.com/products/${encodeURIComponent(id)}`, {
      signal: ctrl.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProduct(data || null);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setErr("Unable to load product. Please try again.");
          setLoading(false);
        }
      });

    return () => ctrl.abort();
  }, [id]);

  // FakeStore API prices are in USD; show INR in UI and store INR in cart/wishlist
  const priceINR = useMemo(
    () => (product ? INR.format(product.price * 83) : ""),
    [product]
  );
  const oldINR = useMemo(() => {
    if (!product) return "";
    const old = product.price * 83 * 1.18; // ~18% higher “old” price
    return INR.format(Math.round(old));
  }, [product]);

  const discountPct = useMemo(() => {
    if (!product) return 0;
    const old = product.price * 1.18;
    return Math.round(((old - product.price) / old) * 100);
  }, [product]);

  // Delivery ETA (4 days from today)
  const deliveryEta = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }, []);

  // PDP extras
  const features = useMemo(
    () => [
      "Genuine product from verified seller",
      "Secure packaging & tracked shipping",
      "Warranty as per brand policy",
    ],
    []
  );

  const offers = useMemo(
    () => [
      "10% Instant Discount with ShopSwift Card",
      "FREE delivery on orders over ₹3,999",
      "Buy 2 Get 5% Off — auto applied",
    ],
    []
  );

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading product…</p>;
  }
  if (err) {
    return <p className="text-center py-10 text-red-600">{err}</p>;
  }
  if (!product) {
    return (
      <p className="text-center py-10 text-red-600">Product not found.</p>
    );
  }

  const addCart = () =>
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: Math.round(product.price * 83), // store INR
        image: product.image,
      })
    );

  const toggleWishlist = () =>
    dispatch(
      toggleWish({
        id: product.id,
        title: product.title,
        price: Math.round(product.price * 83), // store INR
        image: product.image,
      })
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-700">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link to="/shop" className="hover:text-primary-700">
          Shop
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium line-clamp-1">
          {product.title}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image */}
        <div className="relative">
          {discountPct > 0 && (
            <span className="absolute top-3 left-3 z-10 bg-primary-600 text-white text-xs px-2 py-1 rounded">
              -{discountPct}%
            </span>
          )}
          <img
            src={product.image || FALLBACK_IMG}
            alt={product.title}
            className="rounded-lg border w-full max-h-[520px] object-contain bg-white"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
        </div>

        {/* Right: Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          {/* Rating + Category */}
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-2" aria-label="rating">
              <RatingStars value={product?.rating?.rate || 0} />
              {product.rating?.rate != null && (
                <span>{Number(product.rating.rate).toFixed(1)} / 5</span>
              )}
              {product.rating?.count != null && (
                <span className="text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              )}
            </div>
            <span className="hidden md:inline">•</span>
            <span className="capitalize">Category: {product.category}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-semibold text-primary-600">
              {priceINR}
            </span>
            <span className="line-through text-gray-400">{oldINR}</span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Payment / Delivery / Policies quick chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 rounded-lg border">
              <FiCreditCard />
              <span className="text-sm">UPI • Cards • Netbanking • COD</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg border">
              <FiTruck />
              <span className="text-sm">
                Delivery by <strong>{deliveryEta}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg border">
              <FiShield />
              <span className="text-sm">Secure Payments • Easy Returns</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={addCart}
              className="px-5 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Add to cart"
              title="Add to cart"
            >
              Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className="p-2 border rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              title="Add to wishlist"
              aria-label="Add to wishlist"
            >
              <FiHeart size={20} />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-8">
            In Stock • Free Shipping Available
          </p>

          {/* Offers */}
          <section className="mt-4">
            <h3 className="font-semibold mb-2">Offers</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
              {offers.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </section>

          {/* Key Features */}
          <section className="mt-6">
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>

          {/* Reviews */}
          <section className="mt-6">
            <h3 className="font-semibold mb-2">Reviews</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <RatingStars value={product?.rating?.rate || 0} />
                  <span className="text-xs text-gray-500">Verified Buyer</span>
                </div>
                <p className="mt-1">
                  Pretty solid for the price. Packaging was great.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <RatingStars
                    value={Math.min(5, (product?.rating?.rate || 0) + 0.5)}
                  />
                  <span className="text-xs text-gray-500">Verified Buyer</span>
                </div>
                <p className="mt-1">
                  Matches the description, quick delivery.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Long Description */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
