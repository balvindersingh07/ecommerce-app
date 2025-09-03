// src/components/ProductGrid.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProductGrid({ category = "women's clothing" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErr(null);

    const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
      category
    )}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setErr("Unable to load products. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [category]);

  const handleAddToCart = (p) => {
    dispatch(addToCart({ id: p.id, title: p.title, price: p.price, image: p.image }));
  };

  const handleAddToWishlist = (p) => {
    dispatch(addToWishlist({ id: p.id, title: p.title, price: p.price, image: p.image }));
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-gray-500">Loading products…</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-red-600">{err}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-2 capitalize">{category}</h1>
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-soft transition relative"
          >
            {/* Wishlist */}
            <button
              onClick={() => handleAddToWishlist(product)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 border hover:bg-white"
              aria-label="Add to wishlist"
              title="Add to wishlist"
            >
              <FiHeart className="text-gray-700" />
            </button>

            {/* Image (clickable) */}
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain mb-4"
                loading="lazy"
              />
            </Link>

            {/* Title (clickable) */}
            <Link to={`/product/${product.id}`}>
              <h2 className="text-sm font-semibold mb-2 line-clamp-2 min-h-[40px] hover:text-primary-700">
                {product.title}
              </h2>
            </Link>

            {/* Price */}
            <p className="text-primary-700 font-semibold mb-3">${product.price}</p>

            {/* CTA */}
            <button onClick={() => handleAddToCart(product)} className="w-full btn btn-primary">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
