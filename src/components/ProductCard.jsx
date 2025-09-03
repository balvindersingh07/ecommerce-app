// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import RatingStars from "./RatingStars"; // ✅ NEW: use the shared stars component

const FALLBACK_IMG =
  "https://via.placeholder.com/600x700.png?text=Product+Image";
const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

// Build a CORS/referrer-safe image URL via images.weserv.nl
function safeImg(url) {
  if (!url || typeof url !== "string") return FALLBACK_IMG;
  // strip protocol and proxy it
  const stripped = url.replace(/^https?:\/\//i, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}`;
}

// Helper: decide shown oldPrice/discount if oldPrice not provided
function derivePricing(currentPrice, providedOldPrice, discountPct = 15) {
  const price = Number.isFinite(currentPrice) ? currentPrice : Number(currentPrice) || 0;
  const old = Number.isFinite(providedOldPrice) && providedOldPrice > price
    ? Number(providedOldPrice)
    : null;

  if (old) {
    const pct = Math.round(((old - price) / old) * 100);
    return { price, oldPrice: old, discountPct: Math.max(0, pct) };
  }
  // fallback: synthesize an oldPrice from a default discount percent
  const pct = Math.max(0, Number(discountPct) || 0);
  if (pct > 0 && pct < 90) {
    const syntheticOld = +(price / (1 - pct / 100)).toFixed(2);
    return { price, oldPrice: syntheticOld, discountPct: pct };
  }
  return { price, oldPrice: null, discountPct: 0 };
}

export default function ProductCard({
  id,
  image,
  title,
  price,
  oldPrice,
  rating = 0,        // ✅ NEW: pass API rating.rate if available
  ratingCount = 0,   // ✅ NEW: pass API rating.count if available
  discountPct = 15,  // ✅ default auto-discount when oldPrice is absent
  onAddToCart,
  onAddToWish,
}) {
  const { price: curPrice, oldPrice: showOld, discountPct: pct } =
    derivePricing(price, oldPrice, discountPct);

  const imgSrc = safeImg(image);

  return (
    <div className="group bg-white border rounded-xl overflow-hidden hover:shadow-soft transition">
      {/* Image */}
      <div className="relative bg-gray-50">
        <Link to={`/product/${id}`} className="block">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-56 object-contain bg-white transition group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // stop loops then set fallback
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
        </Link>

        {pct > 0 && (
          <span className="absolute top-3 left-3 badge bg-primary-600 text-white">
            -{pct}%
          </span>
        )}

        <button
          type="button"
          onClick={() => onAddToWish?.()}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 border hover:bg-white focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Add to wishlist"
          title="Add to wishlist"
        >
          <FiHeart className="text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${id}`} className="block hover:underline">
          <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
            {title}
          </h3>
        </Link>

        {/* Price row: discounted + original */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-primary-700 font-semibold">
            {INR.format(curPrice)}
          </span>
          {showOld && (
            <span className="text-xs text-gray-400 line-through">
              {INR.format(showOld)}
            </span>
          )}
        </div>

        {/* Rating + CTA */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2" aria-label="product-rating">
            <RatingStars value={Number(rating) || 0} />
            <span className="text-xs text-gray-500">
              ({Number(ratingCount) || 0})
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart?.()}
            className="btn btn-primary text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Add to cart"
            title="Add to cart"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
