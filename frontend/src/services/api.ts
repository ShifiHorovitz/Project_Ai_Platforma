import axios from 'axios';
import type { User, UserCreate, LoginRequest, Token, Category, CategoryCreate, SubCategory, SubCategoryCreate, Prompt, PromptCreate } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'הבקשה ארכה יותר מדי זמן. נסה שוב.';
    } else if (!error.response) {
      error.message = 'לא ניתן להתחבר לשרת. ודא שהבקאנד רץ.';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (data: LoginRequest): Promise<Token> => {
    const response = await api.post<Token>('/auth/login', data);
    return response.data;
  },
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

// Users API
export const usersApi = {
  register: async (data: UserCreate): Promise<User> => {
    const response = await api.post<User>('/users/', data);
    return response.data;
  },
  list: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users/');
    return response.data;
  },
};

// Categories API
export const categoriesApi = {
  list: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories/');
    return response.data;
  },
  create: async (data: CategoryCreate): Promise<Category> => {
    const response = await api.post<Category>('/categories/', data);
    return response.data;
  },
};

// SubCategories API
export const subCategoriesApi = {
  list: async (categoryId?: number): Promise<SubCategory[]> => {
    const params = categoryId ? { category_id: categoryId } : {};
    const response = await api.get<SubCategory[]>('/categories/sub', { params });
    return response.data;
  },
  create: async (data: SubCategoryCreate): Promise<SubCategory> => {
    const response = await api.post<SubCategory>('/categories/sub', data);
    return response.data;
  },
};

// Prompts API
export const promptsApi = {
  create: async (data: PromptCreate): Promise<Prompt> => {
    const response = await api.post<Prompt>('/prompts/', data);
    return response.data;
  },
  getUserPrompts: async (userId: number): Promise<Prompt[]> => {
    const response = await api.get<Prompt[]>(`/prompts/user/${userId}`);
    return response.data;
  },
  listAll: async (): Promise<Prompt[]> => {
    const response = await api.get<Prompt[]>('/prompts/');
    return response.data;
  },
};

// Admin API
export const adminApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/admin/users');
    return response.data;
  },
  getPrompts: async (): Promise<Prompt[]> => {
    const response = await api.get<Prompt[]>('/admin/prompts');
    return response.data;
  },
};
