// src/store/slices/snippetsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { snippetAPI } from '@/services/api';
import type { Snippet, SnippetRequest } from '@/types/api';

interface SnippetsState {
  currentSnippet: Snippet | null;
  loading: boolean;
  error: string | null;
  preferences: {
    language: string;
    domain: string;
    difficulty: number;
  };
}

const initialState: SnippetsState = {
  currentSnippet: null,
  loading: false,
  error: null,
  preferences: {
    language: 'javascript',
    domain: 'algorithms',
    difficulty: 1,
  },
};

export const fetchRecommendedSnippet = createAsyncThunk(
  'snippets/fetchRecommended',
  async (params: { language?: string; domain?: string; difficulty?: number }, { rejectWithValue }) => {
    try {
      const response = await snippetAPI.recommendSnippet(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch snippet');
    }
  }
);

export const generateSnippet = createAsyncThunk(
  'snippets/generate',
  async (request: SnippetRequest, { rejectWithValue }) => {
    try {
      const response = await snippetAPI.generateSnippet(request);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to generate snippet');
    }
  }
);

const snippetsSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<Partial<SnippetsState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch recommended snippet
      .addCase(fetchRecommendedSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedSnippet.fulfilled, (state, action: PayloadAction<Snippet>) => {
        state.loading = false;
        state.currentSnippet = action.payload;
      })
      .addCase(fetchRecommendedSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Generate snippet
      .addCase(generateSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSnippet.fulfilled, (state, action: PayloadAction<Snippet>) => {
        state.loading = false;
        state.currentSnippet = action.payload;
      })
      .addCase(generateSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPreferences, clearError } = snippetsSlice.actions;
export default snippetsSlice.reducer;