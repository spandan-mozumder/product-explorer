import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../services/api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await loginUser(username, password);
      await AsyncStorage.setItem('authToken', data.accessToken);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';
      return rejectWithValue(message);
    }
  }
);

export const restoreToken = createAsyncThunk(
  'auth/restoreToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        return token;
      }
      return rejectWithValue('No token found');
    } catch (error) {
      return rejectWithValue('Failed to restore token');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('authToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          image: action.payload.image,
        };
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      // Restore Token
      .addCase(restoreToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(restoreToken.rejected, (state) => {
        state.token = null;
        state.isLoggedIn = false;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
