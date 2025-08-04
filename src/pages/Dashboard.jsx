import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadProducts,
  loadCategories,
  filterByCategory,
  searchByTitle,
  resetFilters,
} from '../features/products/productsSlice';

import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';
import CategoryFilter from '../components/CategoryFilter';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);

  const { filteredItems, categories, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(filterByCategory(category));
  };

  const handleSearchChange = (e) => {
    dispatch(searchByTitle(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header with optional search */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">ShopSage</h1>

        <div className="flex items-center gap-4">
          {showSearch && (
            <input
              type="text"
              placeholder="Search products..."
              className="border px-3 py-1 rounded"
              onChange={handleSearchChange}
            />
          )}
          <button
            className="bg-gray-200 px-3 py-1 rounded"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            🔍
          </button>

          {/* Reset Filters Button */}
          <button
            onClick={handleResetFilters}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            title="Reset Filters"
          >
            Reset Filters
          </button>
        </div>
      </header>

      {/* Banner */}
      <Banner />

      {/* Categories */}
      <CategoryFilter onSelectCategory={handleCategoryClick} />

      {/* Product Grid */}
      {status === 'loading' ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
