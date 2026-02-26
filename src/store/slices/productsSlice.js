import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts as fetchProductsApi } from '../../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProductsApi();
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to fetch products.';
      return rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'All',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = filterProducts(
        state.items,
        action.payload,
        state.selectedCategory
      );
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = filterProducts(
        state.items,
        state.searchQuery,
        action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = filterProducts(
          action.payload,
          state.searchQuery,
          state.selectedCategory
        );
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

function filterProducts(items, searchQuery, selectedCategory) {
  let filtered = items;

  if (selectedCategory && selectedCategory !== 'All') {
    filtered = filtered.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  }

  return filtered;
}

export const { setSearchQuery, setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
