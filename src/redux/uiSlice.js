// src/redux/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    cartOpen: false,
    loggedIn: !!localStorage.getItem("authToken"),
  },
  reducers: {
    openCart(state) {
      state.cartOpen = true;
    },
    closeCart(state) {
      state.cartOpen = false;
    },
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

export const { openCart, closeCart, login, logout } = slice.actions;
export default slice.reducer;

