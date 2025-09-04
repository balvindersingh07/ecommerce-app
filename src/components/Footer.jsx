// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="ShopSage"
              className="w-10 h-10 object-contain"
              onError={(e) => (e.currentTarget.src = "/logo.svg")}
            />
            <span className="text-2xl font-extrabold italic text-primary-600">
              ShopSage
            </span>
          </Link>
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            ShopSage is your trusted online marketplace — from electronics to fashion, we bring
  you quality products at the best prices. Enjoy secure payments, fast delivery,
  and hassle-free returns on every order.
          </p>

          <div className="mt-6 p-4 bg-white rounded-xl border shadow-sm">
            <p className="text-sm text-gray-600">Got Question? Call us 24/7</p>
            <p className="mt-1 text-lg font-semibold text-primary-600">
              +91 94604 03092
            </p>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary-600">About</Link></li>
            <li><Link to="/services" className="hover:text-primary-600">Our Services</Link></li>
            <li><Link to="/how-to-shop" className="hover:text-primary-600">How to shop on ShopSage</Link></li>
            <li><Link to="/faq" className="hover:text-primary-600">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary-600">Contact us</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/payment-methods" className="hover:text-primary-600">Payment Methods</Link></li>
            <li><Link to="/money-back" className="hover:text-primary-600">Money-back guarantee!</Link></li>
            <li><Link to="/returns" className="hover:text-primary-600">Returns</Link></li>
            <li><Link to="/shipping" className="hover:text-primary-600">Shipping</Link></li>
            <li><Link to="/terms" className="hover:text-primary-600">Terms and conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-primary-600">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">My Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-primary-600">Sign In</Link></li>
            <li><Link to="/cart" className="hover:text-primary-600">View Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-primary-600">My Wishlist</Link></li>
            <li><Link to="/account/orders" className="hover:text-primary-600">Track My Order</Link></li>
            <li><Link to="/help" className="hover:text-primary-600">Help</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 <span className="font-extrabold italic text-primary-600">ShopSage</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:opacity-90">
              <FiFacebook size={20} className="text-blue-500" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:opacity-90">
              <FiInstagram size={20} className="text-pink-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:opacity-90">
              <FiTwitter size={20} className="text-sky-400" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:opacity-90">
              <FiYoutube size={20} className="text-red-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
