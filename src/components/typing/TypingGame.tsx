// // src/components/typing/TypingGame.tsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '@/store/store';
// import { useTyping } from '@/hooks/useTyping';
// import  { fetchRecommendedSnippet } from '@/store/slices/snippetsSilce';
// import { typingAPI } from '@/services/api';
// import { CodeEditor } from './CodeEditor';
// import { PerformanceDisplay } from './PerformanceDisplay';
// import { SettingsPanel } from './SettingsPanel';
// import { Button } from '@/components/ui/button';
// import { AlertCircle } from 'lucide-react';
// import { DIFFICULTIES } from '@/utils/constants';

// export const TypingGame: React.FC = () => {
//   const dispatch = useDispatch();
//   const { currentSnippet, loading, error, preferences } = useSelector(
//     (state: RootState) => state.snippets
//   );
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [submitted, setSubmitted] = useState(false);

//   const typingState = useTyping(currentSnippet?.content || '');

//   // Timer effect
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (typingState.isTyping && !typingState.isCompleted) {
//       interval = setInterval(() => {
//         setTimeElapsed(Math.floor((Date.now() - (typingState.startTime || 0)) / 1000));
//       }, 100);
//     }
//     return () => clearInterval(interval);
//   }, [typingState.isTyping, typingState.isCompleted, typingState.startTime]);

//   // Load initial snippet
//   useEffect(() => {
//     handleGenerateNew();
//   }, []);

//   // Submit results when completed
//   useEffect(() => {
//     if (typingState.isCompleted && !submitted && currentSnippet) {
//       submitResults();
//     }
//   }, [typingState.isCompleted, submitted, currentSnippet]);

//   const handleGenerateNew = async () => {
//     const result = await dispatch(fetchRecommendedSnippet(preferences) as any);
//     if (fetchRecommendedSnippet.fulfilled.match(result)) {
//       typingState.resetGame();
//       setTimeElapsed(0);
//       setSubmitted(false);
//     }
//   };

//   const submitResults = async () => {
//     if (!currentSnippet || submitted) return;

//     try {
//       await typingAPI.submitResult({
//         snippet_id: currentSnippet.id,
//         wpm: typingState.wpm,
//         accuracy: typingState.accuracy,
//         duration: timeElapsed,
//       });
//       setSubmitted(true);
//     } catch (error) {
//       console.error('Failed to submit results:', error);
//     }
//   };

//   const calculateProgress = () => {
//     if (!currentSnippet) return 0;
//     return (typingState.currentIndex / currentSnippet.content.length) * 100;
//   };

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-gray-900 mb-2">
//           Failed to load snippet
//         </h3>
//         <p className="text-gray-600 mb-4">{error}</p>
//         <Button onClick={handleGenerateNew}>Try Again</Button>
//       </div>
//     );
//   }

//   if (loading || !currentSnippet) {
//     return (
//       <div className="text-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
//         <p className="text-gray-600">Loading code snippet...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Performance Display */}
//       <PerformanceDisplay
//         wpm={typingState.wpm}
//         accuracy={typingState.accuracy}
//         timeElapsed={timeElapsed}
//         progress={calculateProgress()}
//         isCompleted={typingState.isCompleted}
//       />

//       {/* Code Editor */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h3 className="text-lg font-medium text-gray-900">
//               {currentSnippet.language.charAt(0).toUpperCase() + currentSnippet.language.slice(1)} - {' '}
//               {currentSnippet.domain.replace('_', ' ').charAt(0).toUpperCase() + currentSnippet.domain.replace('_', ' ').slice(1)}
//             </h3>
//             <p className="text-sm text-gray-600">
//               Difficulty: {DIFFICULTIES.find(d => d.value === currentSnippet.difficulty)?.label}
//             </p>
//           </div>
//         </div>

//         <CodeEditor
//           content={currentSnippet.content}
//           language={currentSnippet.language}
//           userInput={typingState.userInput}
//           currentIndex={typingState.currentIndex}
//           onKeyPress={typingState.handleKeyPress}
//           mistakePositions={typingState.mistakePositions}
//         />
//       </div>

//       {/* Settings Panel */}
//       <SettingsPanel
//         onGenerateNew={handleGenerateNew}
//         onResetTyping={() => {
//           typingState.resetGame();
//           setTimeElapsed(0);
//           setSubmitted(false);
//         }}
//         loading={loading}
//       />
//     </div>
//   );
// };




// src/components/typing/TypingGame.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useTyping } from '@/hooks/useTyping';
import  { fetchRecommendedSnippet } from '@/store/slices/snippetsSilce';
import { typingAPI } from '@/services/api';
import { CodeEditor } from './CodeEditor';
import { PerformanceDisplay } from './PerformanceDisplay';
import { SettingsPanel } from './SettingsPanel';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { DIFFICULTIES } from '@/utils/constants';

export const TypingGame: React.FC = () => {
  const dispatch = useDispatch();
  const { currentSnippet, loading, error, preferences } = useSelector(
    (state: RootState) => state.snippets
  );
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const typingState = useTyping(currentSnippet?.content || '');

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (typingState.isTyping && !typingState.isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - (typingState.startTime || 0)) / 1000));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [typingState.isTyping, typingState.isCompleted, typingState.startTime]);

  // Load initial snippet
  useEffect(() => {
    handleGenerateNew();
  }, []);

  // Submit results when completed
  useEffect(() => {
    if (typingState.isCompleted && !submitted && currentSnippet) {
      submitResults();
    }
  }, [typingState.isCompleted, submitted, currentSnippet]);

  const handleGenerateNew = async () => {
    const result = await dispatch(fetchRecommendedSnippet(preferences) as any);
    if (fetchRecommendedSnippet.fulfilled.match(result)) {
      typingState.resetGame();
      setTimeElapsed(0);
      setSubmitted(false);
    }
  };

  const submitResults = async () => {
    if (!currentSnippet || submitted) return;

    try {
      await typingAPI.submitResult({
        snippet_id: currentSnippet.id,
        wpm: typingState.wpm,
        accuracy: typingState.accuracy,
        duration: timeElapsed,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit results:', error);
    }
  };

  const calculateProgress = () => {
    if (!currentSnippet) return 0;
    return (typingState.currentIndex / currentSnippet.content.length) * 100;
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load snippet
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={handleGenerateNew}>Try Again</Button>
      </div>
    );
  }

  if (loading || !currentSnippet) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading code snippet...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Performance Display */}
      <PerformanceDisplay
        wpm={typingState.wpm}
        accuracy={typingState.accuracy}
        timeElapsed={timeElapsed}
        progress={calculateProgress()}
        isCompleted={typingState.isCompleted}
      />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Reference Code */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Reference Code
            </h3>
            <p className="text-sm text-gray-600">
              {currentSnippet.language.charAt(0).toUpperCase() + currentSnippet.language.slice(1)} - {' '}
              {currentSnippet.domain.replace('_', ' ').charAt(0).toUpperCase() + currentSnippet.domain.replace('_', ' ').slice(1)}
            </p>
            <p className="text-sm text-gray-600">
              Difficulty: {DIFFICULTIES.find(d => d.value === currentSnippet.difficulty)?.label}
            </p>
          </div>
          
          {/* Reference code display */}
          <div className="bg-gray-50 rounded-md p-4 border">
            <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap leading-relaxed">
              {currentSnippet.content}
            </pre>
          </div>
        </div>

        {/* Right side - Typing Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Type Here
            </h3>
            <p className="text-sm text-gray-600">
              Type the code from the left panel
            </p>
          </div>

          <CodeEditor
            content={currentSnippet.content}
            language={currentSnippet.language}
            userInput={typingState.userInput}
            currentIndex={typingState.currentIndex}
            onKeyPress={typingState.handleKeyPress}
            mistakePositions={Array.from(typingState.mistakePositions)}
          />
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        onGenerateNew={handleGenerateNew}
        onResetTyping={() => {
          typingState.resetGame();
          setTimeElapsed(0);
          setSubmitted(false);
        }}
        loading={loading}
      />
    </div>
  );
};