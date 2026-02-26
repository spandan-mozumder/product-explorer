import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      // Persist favorites
      AsyncStorage.setItem('favorites', JSON.stringify(state.items)).catch(
        () => {}
      );
    },
    removeFavorite: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      AsyncStorage.setItem('favorites', JSON.stringify(state.items)).catch(
        () => {}
      );
    },
    loadFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { toggleFavorite, removeFavorite, loadFavorites } =
  favoritesSlice.actions;

export const restoreFavorites = () => async (dispatch) => {
  try {
    const stored = await AsyncStorage.getItem('favorites');
    if (stored) {
      dispatch(loadFavorites(JSON.parse(stored)));
    }
  } catch (error) {
    // silently fail
  }
};

export default favoritesSlice.reducer;
