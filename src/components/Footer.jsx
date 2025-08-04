// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* About */}
        <div>
          <h2 className="text-lg font-bold mb-2">About ShopSage</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            ShopSage is your one-stop destination for premium quality products.
            Enjoy free shipping, 24/7 support, and easy returns.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links">
          <h2 className="text-lg font-bold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            <li><Link to="/wishlist" className="hover:underline">Wishlist</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-bold mb-2">Contact Us</h2>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Email: support@shopsage.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Chandigarh, India</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ShopSage. All rights reserved.
      </div>
    </footer>
  );
}
