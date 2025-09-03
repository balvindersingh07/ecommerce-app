// src/redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const KEY = "wishItems";

const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const save = (items) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
};

const slice = createSlice({
  name: "wishlist",
  initialState: { items: load() }, // [{id,title,price,image}]
  reducers: {
    toggle(state, action) {
      const p = action.payload; // {id,title,price,image}
      const exists = state.items.some((i) => i.id === p.id);
      state.items = exists
        ? state.items.filter((i) => i.id !== p.id)
        : [...state.items, p];
      save(state.items);
    },
    remove(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      save(state.items);
    },
    clear(state) {
      state.items = [];
      save(state.items);
    },
  },
});

export const { toggle, remove, clear } = slice.actions;
export const addToWishlist = slice.actions.toggle; // ✅ alias
export default slice.reducer;
