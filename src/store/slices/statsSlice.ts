// src/store/slices/statsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {PayloadAction} from "@reduxjs/toolkit"
import { typingAPI } from '@/services/api';
import type { TypingStats } from '@/types/api';

interface StatsState {
  stats: TypingStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  stats: null,
  loading: false,
  error: null,
};

export const fetchUserStats = createAsyncThunk(
  'stats/fetchUserStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await typingAPI.getUserStats();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch stats');
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action: PayloadAction<TypingStats>) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = statsSlice.actions;
export default statsSlice.reducer;