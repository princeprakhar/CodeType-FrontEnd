// src/types/api.ts
export interface User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  expires_at: Date;
  user_id: number;
  username: string;
}

export interface Snippet {
  id: number;
  content: string;
  language: string;
  domain: string;
  difficulty: number;
  is_ai_generated?: boolean;
  created_at?: Date;
}

export interface SnippetRequest {
  language: string;
  domain: string;
  difficulty: number;
}

export interface TypingResult {
  id: number;
  user_id: number;
  snippet_id: number;
  wpm: number;
  accuracy: number;
  duration: number;
  completed_at: Date;
}

export interface TypingResultRequest {
  snippet_id: number;
  wpm: number;
  accuracy: number;
  duration: number;
}

export interface TypingStats {
  total_sessions: number;
  average_wpm: number;
  average_accuracy: number;
  languages: LanguageStat[];
  domains: DomainStat[];
  progress: ProgressStat[];
}

export interface LanguageStat {
  language: string;
  count: number;
  avg_wpm: number;
  avg_accuracy: number;
}

export interface DomainStat {
  domain: string;
  count: number;
  avg_wpm: number;
  avg_accuracy: number;
}

export interface ProgressStat {
  date: string;
  avg_wpm: number;
  avg_accuracy: number;
}

export interface TypingState {
  currentIndex: number;
  userInput: string;
  errors: number;
  startTime: number | null;
  endTime: number | null;
  isCompleted: boolean;
  wpm: number;
  accuracy: number;
}