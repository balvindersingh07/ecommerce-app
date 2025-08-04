// src/features/products/productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories } from '../../utils/api';

// Async thunk to load all products
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to load categories
export const loadCategories = createAsyncThunk(
  'products/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await fetchCategories();
      return categories;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  items: [],
  categories: [],
  filteredItems: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory(state, action) {
      const category = action.payload;
      state.filteredItems =
        category === 'all'
          ? state.items
          : state.items.filter((p) => p.category === category);
    },
    searchByTitle(state, action) {
      const query = action.payload.toLowerCase();
      state.filteredItems = state.items.filter((p) =>
        p.title.toLowerCase().includes(query)
      );
    },
    resetFilters(state) {
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { filterByCategory, searchByTitle, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
