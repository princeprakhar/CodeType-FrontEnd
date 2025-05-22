// src/components/stats/LanguageStats.tsx
import React from 'react';
import type { LanguageStat, DomainStat } from '@/types/api';

interface LanguageStatsProps {
  languages: LanguageStat[];
  domains: DomainStat[];
}

export const LanguageStats: React.FC<LanguageStatsProps> = ({ languages, domains }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Languages */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Languages</h3>
        {languages.length === 0 ? (
          <p className="text-gray-500">No language data available</p>
        ) : (
          <div className="space-y-3">
            {languages.map((lang) => (
              <div key={lang.language} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {lang.language}
                    </span>
                    <span className="text-xs text-gray-500">
                      {lang.count} sessions
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                    <span>{Math.round(lang.avg_wpm)} WPM</span>
                    <span>{Math.round(lang.avg_accuracy)}% accuracy</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Domains */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Domains</h3>
        {domains.length === 0 ? (
          <p className="text-gray-500">No domain data available</p>
        ) : (
          <div className="space-y-3">
            {domains.map((domain) => (
              <div key={domain.domain} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {domain.domain.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {domain.count} sessions
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                    <span>{Math.round(domain.avg_wpm)} WPM</span>
                    <span>{Math.round(domain.avg_accuracy)}% accuracy</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};