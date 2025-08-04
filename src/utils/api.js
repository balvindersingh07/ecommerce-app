// src/utils/api.js

const API_BASE = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/products/categories`);
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product (${id}): ${res.status} ${res.statusText}`);
  }
  return res.json();
};
