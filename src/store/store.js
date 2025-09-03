// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cart from "../redux/cartSlice";
import wishlist from "../redux/wishlistSlice";
import ui from "../redux/uiSlice";

export const store = configureStore({
  reducer: { cart, wishlist, ui },
  devTools: import.meta.env.DEV,
});
