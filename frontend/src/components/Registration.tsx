import { useState } from 'react';
import { usersApi, authApi } from '../services/api';
import { useUser } from '../context/UserContext';
import type { UserCreate } from '../types';

interface RegistrationProps {
  onSwitchToLogin: () => void;
}

export function Registration({ onSwitchToLogin }: RegistrationProps) {
  const { setCurrentUser } = useUser();
  const [formData, setFormData] = useState<UserCreate>({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      setLoading(false);
      return;
    }

    try {
      console.log('Starting registration for:', formData.email);
      
      // Register user
      const registeredUser = await usersApi.register(formData);
      console.log('User registered:', registeredUser);
      
      // Auto-login after registration
      console.log('Attempting auto-login...');
      const tokenData = await authApi.login({
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      console.log('Login successful, token received');
      
      localStorage.setItem('access_token', tokenData.access_token);
      const user = await authApi.getMe();
      console.log('User info retrieved:', user);
      
      const userWithToken = {
        ...user,
        access_token: tokenData.access_token,
      };
      localStorage.setItem('currentUser', JSON.stringify(userWithToken));
      setCurrentUser(userWithToken);
      
      // Success - form will be hidden by parent component
    } catch (err: any) {
      console.error('Registration error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.code,
      });
      
      let errorMsg = 'שגיאה ברישום. נסה שוב.';
      
      if (err.response) {
        const detail = err.response.data?.detail || '';
        if (detail.includes('already') || detail.includes('Email already')) {
          errorMsg = 'אימייל זה כבר רשום במערכת. נסה להתחבר במקום.';
        } else if (detail.includes('Password')) {
          errorMsg = 'הסיסמה חייבת להכיל לפחות 6 תווים';
        } else if (detail) {
          errorMsg = detail;
        } else if (err.response.status === 400) {
          errorMsg = 'נתונים לא תקינים. בדוק את השדות ונסה שוב.';
        } else if (err.response.status === 500) {
          errorMsg = 'שגיאת שרת. נסה שוב מאוחר יותר.';
        }
      } else if (err.request) {
        errorMsg = 'לא ניתן להתחבר לשרת. ודא שהבקאנד רץ על http://127.0.0.1:8000';
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">רישום משתמש חדש</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">שם מלא *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">טלפון</label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">אימייל *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">סיסמה *</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="לפחות 6 תווים"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">אימות סיסמה *</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="הזן סיסמה שוב"
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'נרשם...' : 'הרשמה'}
        </button>
        <div className="text-center text-sm text-gray-600">
          כבר יש לך חשבון?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            התחבר כאן
          </button>
        </div>
      </form>
    </div>
  );
}
