// src/pages/Stats.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { fetchUserStats } from '@/store/slices/statsSlice';
import { StatsCard } from '@/components/stats/StatsCard';
import { ProgressChart } from '@/components/stats/ProgressChart';
import { LanguageStats } from '@/components/stats/LanguageStats';
import { Target, Zap, Clock, Trophy, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Stats: React.FC = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state: RootState) => state.stats);

  useEffect(() => {
    dispatch(fetchUserStats() as any);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading your statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load statistics</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => dispatch(fetchUserStats() as any)}>Try Again</Button>
      </div>
    );
  }

  if (!stats || stats.total_sessions === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No statistics yet</h3>
        <p className="text-gray-600 mb-4">
          Start practicing to see your typing statistics!
        </p>
        <Button onClick={() => window.location.href = '/practice'}>
          Start Practicing
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Statistics</h1>
        <p className="mt-2 text-gray-600">
          Track your progress and improve your coding typing skills
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Average WPM"
          value={Math.round(stats.average_wpm)}
          icon={Zap}
          color="text-blue-500"
          description="Words per minute"
        />
        <StatsCard
          title="Average Accuracy"
          value={`${Math.round(stats.average_accuracy)}%`}
          icon={Target}
          color="text-green-500"
          description="Typing accuracy"
        />
        <StatsCard
          title="Total Sessions"
          value={stats.total_sessions}
          icon={Clock}
          color="text-purple-500"
          description="Practice sessions"
        />
        <StatsCard
          title="Best WPM"
          value={stats.languages.length > 0 ? Math.round(Math.max(...stats.languages.map(l => l.avg_wpm))) : 0}
          icon={Trophy}
          color="text-yellow-500"
          description="Personal best"
        />
      </div>

      {/* Progress Chart */}
      <ProgressChart data={stats.progress} />

      {/* Language and Domain Stats */}
      <LanguageStats languages={stats.languages} domains={stats.domains} />
    </div>
  );
};