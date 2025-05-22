// src/components/typing/PerformanceDisplay.tsx
import React from 'react';
import { Timer, Target, Zap, TrendingUp } from 'lucide-react';

interface PerformanceDisplayProps {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  progress: number;
  isCompleted: boolean;
}

export const PerformanceDisplay: React.FC<PerformanceDisplayProps> = ({
  wpm,
  accuracy,
  timeElapsed,
  progress,
  isCompleted,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-green-600';
    if (accuracy >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWPMColor = (wpm: number) => {
    if (wpm >= 60) return 'text-green-600';
    if (wpm >= 40) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* WPM */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">WPM</span>
          </div>
          <div className={`text-2xl font-bold ${getWPMColor(wpm)}`}>
            {wpm}
          </div>
        </div>

        {/* Accuracy */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Accuracy</span>
          </div>
          <div className={`text-2xl font-bold ${getAccuracyColor(accuracy)}`}>
            {accuracy}%
          </div>
        </div>

        {/* Time */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Timer className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Time</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatTime(timeElapsed)}
          </div>
        </div>

        {/* Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Progress</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isCompleted ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="text-center">
            <span className="text-green-800 font-medium">
              🎉 Congratulations! You completed the snippet!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};