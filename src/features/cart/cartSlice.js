import { createSlice } from '@reduxjs/toolkit';

const storedCart = localStorage.getItem('cartItems');
const initialState = {
  cartItems: storedCart ? JSON.parse(storedCart) : [],
};

const updateLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const exists = state.cartItems.find(i => i.id === item.id);

      if (exists) {
        exists.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      updateLocalStorage(state.cartItems);
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      updateLocalStorage(state.cartItems);
    },

    clearCart(state) {
      state.cartItems = [];
      updateLocalStorage([]);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
        updateLocalStorage(state.cartItems);
      }
    },

    // ✅ Decrease quantity
    decreaseQuantity(state, action) {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateLocalStorage(state.cartItems);
      }
    },

    // ✅ Increase quantity (NEW)
    increaseQuantity(state, action) {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        updateLocalStorage(state.cartItems);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  decreaseQuantity,
  increaseQuantity, // ✅ Now exported
} = cartSlice.actions;

export default cartSlice.reducer;
