// src/services/api.ts
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { 
  LoginRequest, 
  RegisterRequest, 
  TokenResponse, 
  User, 
  Snippet, 
  SnippetRequest,
  TypingResultRequest,
  TypingResult,
  TypingStats
} from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data: LoginRequest): Promise<AxiosResponse<TokenResponse>> =>
    api.post('/api/auth/login', data),
  
  register: (data: RegisterRequest): Promise<AxiosResponse<User>> =>
    api.post('/api/auth/register', data),
  
  getCurrentUser: (): Promise<AxiosResponse<User>> =>
    api.get('/api/user'),
};

export const snippetAPI = {
  getSnippet: (id: number): Promise<AxiosResponse<Snippet>> =>
    api.get(`/api/snippets/${id}`),
  
  recommendSnippet: (params: {
    language?: string;
    domain?: string;
    difficulty?: number;
  }): Promise<AxiosResponse<Snippet>> =>
    api.get('/api/recommend-snippet', { params }),
  
  generateSnippet: (data: SnippetRequest): Promise<AxiosResponse<Snippet>> =>
    api.post('/api/generate-snippet', data),
  
  createSnippet: (data: Partial<Snippet>): Promise<AxiosResponse<Snippet>> =>
    api.post('/api/snippets', data),
};

export const typingAPI = {
  submitResult: (data: TypingResultRequest): Promise<AxiosResponse<TypingResult>> =>
    api.post('/api/submit-typing-result', data),
  
  getUserStats: (): Promise<AxiosResponse<TypingStats>> =>
    api.get('/api/user/stats'),
};

export default api;