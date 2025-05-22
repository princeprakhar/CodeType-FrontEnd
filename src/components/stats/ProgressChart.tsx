// src/components/stats/ProgressChart.tsx
import React from 'react';
import type { ProgressStat } from '@/types/api';

interface ProgressChartProps {
  data: ProgressStat[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Over Time</h3>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const maxWPM = Math.max(...data.map(d => d.avg_wpm));
  // const maxAccuracy = 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Over Time</h3>
      
      {/* Simple bar chart representation */}
      <div className="space-y-4">
        {data.slice(-10).map((stat) => (
          <div key={stat.date} className="flex items-center space-x-4">
            <div className="w-20 text-sm text-gray-600">
              {new Date(stat.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            
            {/* WPM Bar */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>WPM</span>
                <span>{Math.round(stat.avg_wpm)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(stat.avg_wpm / maxWPM) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Accuracy Bar */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Accuracy</span>
                <span>{Math.round(stat.avg_accuracy)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${stat.avg_accuracy}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};