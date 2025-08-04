import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../utils/api'; // ✅ ensure this path is correct

export default function CategoryFilter({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-3 my-6">
      <button
        onClick={() => onSelectCategory('all')}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        aria-label="Filter by All"
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className="px-4 py-2 bg-blue-600 text-white rounded capitalize hover:bg-blue-700"
          aria-label={`Filter by ${cat}`}
        >
          {cat.replace(/-/g, ' ')}
        </button>
      ))}
    </div>
  );
}
