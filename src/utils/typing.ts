// src/utils/typing.ts
export const calculateWPM = (correctCharacters: number, timeInSeconds: number): number => {
  if (timeInSeconds === 0) return 0;
  
  // Standard: 5 characters = 1 word
  const words = correctCharacters / 5;
  const minutes = timeInSeconds / 60;
  
  return Math.round(words / minutes);
};

export const calculateAccuracy = (totalCharacters: number, errorCount: number): number => {
  if (totalCharacters === 0) return 100;
  
  const correctCharacters = totalCharacters - errorCount;
  return Math.round((correctCharacters / totalCharacters) * 100);
};

export const getCharacterStatus = (
  targetChar: string,
  userChar: string | undefined,
  index: number,
  currentIndex: number
): 'correct' | 'incorrect' | 'current' | 'pending' => {
  if (index === currentIndex) return 'current';
  if (index > currentIndex) return 'pending';
  if (userChar === targetChar) return 'correct';
  return 'incorrect';
};