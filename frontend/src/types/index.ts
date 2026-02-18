// TypeScript types matching backend Pydantic schemas

export interface User {
  id: number;
  name: string;
  phone?: string | null;
  email?: string | null;
  is_admin: boolean;
}

export interface UserCreate {
  name: string;
  phone?: string | null;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  user_id: number;
  is_admin: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoryCreate {
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

export interface SubCategoryCreate {
  name: string;
  category_id: number;
}

export interface Prompt {
  id: number;
  user_id: number;
  category_id: number;
  sub_category_id: number;
  prompt: string;
  response: string;
  created_at: string; // ISO datetime string
}

export interface PromptCreate {
  user_id: number;
  category_id: number;
  sub_category_id: number;
  prompt: string;
}
