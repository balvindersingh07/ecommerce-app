import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaSearch, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('authToken') !== null;

  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const wishlistCount = useSelector(
    (state) => state.wishlist?.wishlistItems?.length || 0
  );

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛍️ ShopSage
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Search */}
          {showSearch && (
            <input
              type="text"
              placeholder="Search products..."
              className="border px-3 py-1 rounded w-48 transition-all"
            />
          )}
          <button onClick={() => setShowSearch((prev) => !prev)} aria-label="Toggle Search">
            <FaSearch className="text-gray-600" />
          </button>

          {/* Wishlist */}
          {isAuthenticated && (
            <Link to="/wishlist" className="relative" aria-label="Wishlist">
              <FaHeart className="text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          )}

          {/* Cart */}
          {isAuthenticated && (
            <Link to="/cart" className="relative" aria-label="Cart">
              <FaShoppingCart className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Auth */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
              title="Logout"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" aria-label="Login">
              <FaUser className="text-gray-600" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
