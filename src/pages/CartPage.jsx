// src/pages/CartPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { increase, decrease, remove, clear } from "../redux/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();

  // ✅ SAFE: fall back to []
  const items = useSelector((s) =>
    Array.isArray(s?.cart?.items) ? s.cart.items : []
  );

  // ✅ SAFE totals
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
  const totalQty = items.reduce((sum, i) => sum + (i.qty || 1), 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="border rounded-xl p-6 bg-white">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-3 gap-8">
      {/* Items */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 border rounded-xl bg-white p-4">
            <img src={p.image} alt={p.title} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <h3 className="font-medium line-clamp-2">{p.title}</h3>
              <p className="text-sm text-gray-500">₹{p.price}</p>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrease(p.id))}
                  className="px-3 py-1 border rounded"
                  aria-label="decrease"
                >
                  −
                </button>
                <span className="w-8 text-center">{p.qty || 1}</span>
                <button
                  onClick={() => dispatch(increase(p.id))}
                  className="px-3 py-1 border rounded"
                  aria-label="increase"
                >
                  +
                </button>

                <button
                  onClick={() => dispatch(remove(p.id))}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="text-right font-semibold">
              ₹{((p.price || 0) * (p.qty || 1)).toFixed(2)}
            </div>
          </div>
        ))}

        <button onClick={() => dispatch(clear())} className="text-sm text-red-600 hover:underline">
          Clear cart
        </button>
      </div>

      {/* Summary */}
      <aside className="border rounded-xl bg-white p-6 h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>{totalQty}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-primary-700 text-lg mt-2">
          <span>Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <button className="btn btn-primary w-full mt-6">Checkout</button>
        <Link to="/shop" className="block text-center text-sm text-gray-600 mt-3 hover:underline">
          Continue Shopping
        </Link>
      </aside>
    </div>
  );
}
