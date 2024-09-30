'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartState {
  items: CartItem[];
  totalAmount: number;
  favorites: Product[];
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  favorites: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalAmount -= existingItem.price;
        } else {
          state.totalAmount -= existingItem.price;
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    addFavorite: (state, action: PayloadAction<Product>) => {
      const existingFavorite = state.favorites.find(favorite => favorite.id === action.payload.id);
      if (!existingFavorite) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload);
    },
  },
});

export const { addItemToCart, removeItemFromCart, addFavorite, removeFavorite } = cartSlice.actions;
export default cartSlice.reducer;
