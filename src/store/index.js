import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import favoritesReducer from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
