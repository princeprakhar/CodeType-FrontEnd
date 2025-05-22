// src/hooks/useTyping.ts
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import {
  startTyping,
  updateInput,
  addError,
  removeError,
  completeTyping,
  updateStats,
  resetTyping,
} from '@/store/slices/typingSlice';
import { calculateWPM, calculateAccuracy } from '@/utils/typing';

export const useTyping = (targetText: string) => {
  const dispatch = useDispatch();
  const typingState = useSelector((state: RootState) => state.typing);

  const handleKeyPress = useCallback((key: string) => {
    console.log('Key pressed:', key, 'Current index:', typingState.userInput.length);
    
    if (typingState.isCompleted) return;

    // Start timing on first non-backspace key
    if (!typingState.isTyping && key !== 'Backspace') {
      dispatch(startTyping());
    }

    if (key === 'Backspace') {
      if (typingState.userInput.length > 0) {
        const removedIndex = typingState.userInput.length - 1;
        
        // Only allow backspace if the last character was a mistake
        if (typingState.mistakePositions.includes(removedIndex)) {
          const newInput = typingState.userInput.slice(0, -1);
          console.log('Backspace allowed - removing mistake at index:', removedIndex);
          dispatch(removeError(removedIndex));
          dispatch(updateInput(newInput));
        } else {
          console.log('Backspace blocked - last character was correct');
        }
      }
      return;
    }

    // Handle all other keys
    if (key.length === 1 || key === 'Tab' || key === 'Enter') {
      const actualKey = key === 'Enter' ? '\n' : key === 'Tab' ? '\t' : key;
      const currentIndex = typingState.userInput.length;
      
      console.log('Processing key:', actualKey, 'at index:', currentIndex);
      
      // Check if we've reached the end of target text
      if (currentIndex >= targetText.length) {
        console.log('Reached end of target text');
        return;
      }
      
      const expectedChar = targetText[currentIndex];
      const newInput = typingState.userInput + actualKey;
      
      console.log('Expected:', expectedChar.charCodeAt(0), 'Got:', actualKey.charCodeAt(0));
      
      // Check for mistake
      if (actualKey !== expectedChar) {
        console.log('Mistake at index:', currentIndex);
        dispatch(addError(currentIndex));
      } else {
        console.log('Correct character at index:', currentIndex);
      }
      
      // Always update input (MonkeyType behavior)
      dispatch(updateInput(newInput));
      
      // Check if completed
      if (newInput.length === targetText.length) {
        console.log('Typing completed');
        dispatch(completeTyping());
      }
    }
  }, [dispatch, typingState.userInput, typingState.isTyping, typingState.isCompleted, typingState.mistakePositions, targetText]);

  // Calculate stats when input changes
  useEffect(() => {
    if (typingState.startTime && typingState.userInput.length > 0) {
      const timeElapsed = (Date.now() - typingState.startTime) / 1000;
      
      // Calculate correct characters (total - mistakes)
      const correctCharacters = typingState.userInput.length - typingState.mistakePositions.length;
      const wpm = calculateWPM(correctCharacters, timeElapsed); // Only count correct chars for WPM
      const accuracy = calculateAccuracy(typingState.userInput.length, typingState.mistakePositions.length);
      
      dispatch(updateStats({ wpm, accuracy }));
    }
  }, [typingState.userInput, typingState.startTime, typingState.mistakePositions.length, dispatch]);

  const resetGame = useCallback(() => {
    dispatch(resetTyping());
  }, [dispatch]);

  return {
    ...typingState,
    currentIndex: typingState.userInput.length,
    mistakePositions: typingState.mistakePositions,
    handleKeyPress,
    resetGame,
  };
};