// src/components/typing/SettingsPanel.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { setPreferences } from '@/store/slices/snippetsSilce';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LANGUAGES, DOMAINS, DIFFICULTIES } from '@/utils/constants';
import { RefreshCw, Settings } from 'lucide-react';

interface SettingsPanelProps {
  onGenerateNew: () => void;
  onResetTyping: () => void;
  loading: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onGenerateNew,
  onResetTyping,
  loading,
}) => {
  const dispatch = useDispatch();
  const { preferences } = useSelector((state: RootState) => state.snippets);
  const { isTyping, isCompleted } = useSelector((state: RootState) => state.typing);

  const handlePreferenceChange = (key: string, value: string | number) => {
    dispatch(setPreferences({ [key]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Settings className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          label="Language"
          value={preferences.language}
          onChange={(e) => handlePreferenceChange('language', e.target.value)}
          options={LANGUAGES}
          disabled={isTyping}
        />

        <Select
          label="Domain"
          value={preferences.domain}
          onChange={(e) => handlePreferenceChange('domain', e.target.value)}
          options={DOMAINS}
          disabled={isTyping}
        />

        <Select
          label="Difficulty"
          value={preferences.difficulty}
          onChange={(e) => handlePreferenceChange('difficulty', parseInt(e.target.value))}
          options={DIFFICULTIES}
          disabled={isTyping}
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onGenerateNew}
          disabled={loading || isTyping}
          className="flex-1"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Generating...' : 'New Snippet'}
        </Button>

        {(isTyping || isCompleted) && (
          <Button
            variant="outline"
            onClick={onResetTyping}
            className="flex-1"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};