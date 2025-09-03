// src/features/wishlist/wishlistSlice.js

import { createSlice } from '@reduxjs/toolkit';

const storedWishlist = localStorage.getItem('wishlistItems');
const initialState = {
  wishlistItems: storedWishlist ? JSON.parse(storedWishlist) : [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const item = action.payload;
      const exists = state.wishlistItems.find(i => i.id === item.id);
      if (!exists) {
        state.wishlistItems.push(item);
        localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
      }
    },
    removeFromWishlist(state, action) {
      state.wishlistItems = state.wishlistItems.filter(i => i.id !== action.payload);
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
    },
    clearWishlist(state) {
      state.wishlistItems = [];
      localStorage.setItem('wishlistItems', JSON.stringify([]));
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
