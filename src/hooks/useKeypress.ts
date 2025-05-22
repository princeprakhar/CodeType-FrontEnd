// src/hooks/useKeypress.ts
import { useEffect } from 'react';

export const useKeypress = (handler: (key: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for certain keys
      // if (event.key === 'Tab' || event.key === 'Enter') {
      //   event.preventDefault();
      // }

      handler(event.key);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handler]);
};