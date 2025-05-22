// src/pages/Practice.tsx
import React from 'react';
import { TypingGame } from '@/components/typing/TypingGame';

export const Practice: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Practice Typing</h1>
        <p className="mt-2 text-gray-600">
          Improve your coding speed and accuracy by typing real code snippets
        </p>
      </div>
      <TypingGame />
    </div>
  );
};