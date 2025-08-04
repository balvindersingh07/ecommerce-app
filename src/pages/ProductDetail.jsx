import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
  const cartItems = useSelector(state => state.cart.cartItems);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Product fetch failed');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-4 text-gray-500">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <p className="p-4 text-red-500">Product not found.</p>;

  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

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

  // Render stars based on rating.rate (1-5)
  const renderStars = () => {
    if (!product.rating || !product.rating.rate) return null;
    const rating = Math.round(product.rating.rate * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
      else if (i - 0.5 === rating) stars.push(<span key={i} className="text-yellow-400 text-xl">☆</span>);
      else stars.push(<span key={i} className="text-gray-300 text-xl">★</span>);
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/3 object-contain max-h-80"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <div>
            {renderStars()}
            <p className="text-sm text-gray-600">{product.rating?.count} reviews</p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Price & (optional) discount */}
          <div className="text-xl font-semibold text-green-700">
            ${product.price.toFixed(2)}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`px-4 py-2 rounded text-white ${
                isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={handleWishlistToggle}
              className={`px-4 py-2 rounded text-white ${
                isInWishlist ? 'bg-pink-600 hover:bg-pink-700' : 'bg-pink-500 hover:bg-pink-600'
              }`}
            >
              {isInWishlist ? 'Remove from Wishlist ❤️' : 'Add to Wishlist ♡'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
