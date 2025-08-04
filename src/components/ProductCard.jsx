import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '../features/wishlist/wishlistSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(product));
      toast.success('Added to cart ✅');
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.info('Removed from wishlist 🗑️');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist ❤️');
    }
  };

  const renderStars = () => {
    if (!product.rating || !product.rating.rate) return null;
    const rating = Math.round(product.rating.rate * 2) / 2;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i - 0.5 === rating) {
        stars.push(<span key={i} className="text-yellow-400">☆</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return <div className="flex text-sm">{stars}</div>;
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden relative flex flex-col h-full">
      {/* Discount Badge */}
      {product.originalPrice && product.originalPrice > product.price && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </div>
      )}

      <Link to={`/product/${product.id}`} aria-label={`View details of ${product.title}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain p-4 mx-auto"
        />
        <h3 className="text-sm font-semibold mb-1 line-clamp-2 px-4">{product.title}</h3>
      </Link>

      <div className="px-4 pb-4 flex flex-col justify-between flex-grow">
        {renderStars()}
        <div className="flex items-center gap-2 mt-1">
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
              <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`px-3 py-1 text-sm rounded ${
              isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>

          <button
            onClick={handleWishlistToggle}
            className={`text-xl ${
              isInWishlist ? 'text-pink-600' : 'text-pink-500'
            } hover:text-pink-700`}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isInWishlist ? '❤️' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
}
