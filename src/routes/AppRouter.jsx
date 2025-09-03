// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Dashboard from '../pages/Dashboard';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import LoginPage from '../pages/LoginPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
