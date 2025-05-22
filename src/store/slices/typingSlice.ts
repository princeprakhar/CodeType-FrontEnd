// src/store/slices/typingSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TypingState {
  isTyping: boolean;
  isCompleted: boolean;
  userInput: string;
  mistakePositions: number[];
  startTime: number | null;
  wpm: number;
  accuracy: number;
}

const initialState: TypingState = {
  isTyping: false,
  isCompleted: false,
  userInput: '',
  mistakePositions: [],
  startTime: null,
  wpm: 0,
  accuracy: 100,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    startTyping: (state) => {
      state.isTyping = true;
      state.startTime = Date.now();
    },
    updateInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    addError: (state, action: PayloadAction<number>) => {
      state.mistakePositions.push(action.payload);
    },
    removeError: (state, action: PayloadAction<number>) => {
      // Remove one element at the specified index
      const index = state.mistakePositions.indexOf(action.payload);
      if (index !== -1) {
        state.mistakePositions.splice(index, 1);
      }
    },
    completeTyping: (state) => {
      state.isCompleted = true;
      state.isTyping = false;
    },
    updateStats: (state, action: PayloadAction<{ wpm: number; accuracy: number }>) => {
      state.wpm = action.payload.wpm;
      state.accuracy = action.payload.accuracy;
    },
    resetTyping: (state) => {
      state.isTyping = false;
      state.isCompleted = false;
      state.userInput = '';
      state.mistakePositions = [];
      state.startTime = null;
      state.wpm = 0;
      state.accuracy = 100;
    },
  },
});

export const {
  startTyping,
  updateInput,
  addError,
  removeError,
  completeTyping,
  updateStats,
  resetTyping,
} = typingSlice.actions;

export default typingSlice.reducer;