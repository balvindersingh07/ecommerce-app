// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const KEY = "cartItems";

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

const initialState = {
  items: load(), // [{id,title,price,qty,image}]
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const p = action.payload; // {id,title,price,image}
      const existing = state.items.find((i) => i.id === p.id);
      if (existing) existing.qty += 1;
      else state.items.push({ ...p, qty: 1 });
      save(state.items);
    },
    remove(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      save(state.items);
    },
    increase(state, action) {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) it.qty += 1;
      save(state.items);
    },
    decrease(state, action) {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) {
        it.qty -= 1;
        if (it.qty <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      save(state.items);
    },
    clear(state) {
      state.items = [];
      save(state.items);
    },
  },
});

export const { add, remove, increase, decrease, clear } = slice.actions;
export const addToCart = add; // ✅ alias so `import { addToCart } ...` works
export default slice.reducer;
