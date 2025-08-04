import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems); // ✅ fixed selector

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">❤️ Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {wishlistItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
