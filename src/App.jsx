// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

/* Core pages */
import Dashboard from "./pages/Dashboard.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Signup from "./pages/Signup.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

/* Company / Info */
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Terms from "./pages/Terms.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Returns from "./pages/Returns.jsx";
import Shipping from "./pages/Shipping.jsx";
import MoneyBack from "./pages/MoneyBack.jsx";
import OurServices from "./pages/OurServices.jsx";
import PaymentMethods from "./pages/PaymentMethods.jsx";

/* NEW info pages */
import FAQ from "./pages/FAQ.jsx";
import HowToShop from "./pages/HowToShop.jsx";
import Help from "./pages/Help.jsx";

/* Categories (only if files exist) */
import Electronics from "./pages/categories/Electronics.jsx";
import WomensClothing from "./pages/categories/WomensClothing.jsx";
import MensClothing from "./pages/categories/MensClothing.jsx";
import Jewellery from "./pages/categories/Jewellery.jsx";
import Shoes from "./pages/categories/Shoes.jsx";

/* Shop (listing) */
import Shop from "./pages/Shop.jsx";

/* Account pages */
import AccountLayout from "./pages/account/AccountLayout.jsx";
import AccountHome from "./pages/account/AccountHome.jsx";
import AccountEdit from "./pages/account/AccountEdit.jsx";
import AccountOrders from "./pages/account/AccountOrders.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Dashboard />} />

          {/* Shop / Listing */}
          <Route path="/shop" element={<Shop />} />

          {/* Product Details */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Core */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />

          {/* Company / Info */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/money-back" element={<MoneyBack />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          {/* NEW info pages */}
          <Route path="/how-to-shop" element={<HowToShop />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<Help />} />

          {/* Categories */}
          <Route path="/category/electronics" element={<Electronics />} />
          <Route path="/category/womens-clothing" element={<WomensClothing />} />
          <Route path="/category/mens-clothing" element={<MensClothing />} />
          <Route path="/category/jewellery" element={<Jewellery />} />
          <Route path="/category/shoes" element={<Shoes />} />

          {/* Account (protected area) */}
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<AccountHome />} />
            <Route path="profile" element={<AccountEdit />} />
            <Route path="orders" element={<AccountOrders />} />
          </Route>

          {/* 404 (optional) */}
          {/* <Route path="*" element={<div className="p-8">Page not found</div>} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
