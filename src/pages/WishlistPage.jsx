import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

// ✅ match your slices
import { add as addToCart } from "../redux/cartSlice";
import { remove as removeFromWishlist, clear as clearWishlist } from "../redux/wishlistSlice";

export default function WishlistPage() {
  const wishlist = useSelector((s) => Array.isArray(s?.wishlist?.items) ? s.wishlist.items : []);
  const dispatch = useDispatch();

  const handleAddToCart = (p) => {
    // cart expects {id,title,price,image}
    const payload = { id: p.id, title: p.title, price: p.price, image: p.image };
    dispatch(addToCart(payload));
    // optional: auto remove from wishlist after adding to cart
    dispatch(removeFromWishlist(p.id));
  };

  const handleRemove = (id) => dispatch(removeFromWishlist(id));

  const handleClearAll = () => {
    if (confirm("Clear all items from wishlist?")) dispatch(clearWishlist());
  };

  if (!wishlist.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary-700">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Wishlist</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-gray-600">No items in wishlist yet.</p>

        <Link
          to="/shop"
          className="mt-6 inline-block btn btn-primary px-4 py-2"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-700">Home</Link>
        <span className="mx-2">›</span>
        <Link to="/shop" className="hover:text-primary-700">Shop</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">Wishlist</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock Status</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                {/* image */}
                <td className="px-4 py-3">
                  <Link to={`/product/${p.id}`} className="inline-block">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-16 h-16 object-contain rounded border"
                      loading="lazy"
                    />
                  </Link>
                </td>

                {/* title + short desc link to PDP */}
                <td className="px-4 py-3">
                  <Link
                    to={`/product/${p.id}`}
                    className="font-medium hover:text-primary-700"
                  >
                    {p.title}
                  </Link>
                  {p.description && (
                    <div className="text-xs text-gray-500 line-clamp-1">
                      {p.description}
                    </div>
                  )}
                </td>

                {/* price */}
                <td className="px-4 py-3">₹{p.price}</td>

                {/* status */}
                <td className="px-4 py-3">
                  <span className="text-green-600">In Stock</span>
                </td>

                {/* add to cart */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="btn btn-primary px-3 py-1.5"
                  >
                    Add to cart
                  </button>
                </td>

                {/* remove */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleRemove(p.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleClearAll}
        className="mt-4 text-sm text-red-600 hover:underline"
      >
        Clear All
      </button>
    </div>
  );
}
