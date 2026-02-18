import { useState } from 'react';
import { authApi } from '../services/api';
import { useUser } from '../context/UserContext';
import type { LoginRequest } from '../types';

interface LoginProps {
  onSwitchToRegister: () => void;
}

export function Login({ onSwitchToRegister }: LoginProps) {
  const { setCurrentUser } = useUser();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const tokenData = await authApi.login(formData);
      
      // Store token
      localStorage.setItem('access_token', tokenData.access_token);
      
      // Get user info
      const user = await authApi.getMe();
      
      // Store user with token info
      const userWithToken = {
        ...user,
        access_token: tokenData.access_token,
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userWithToken));
      setCurrentUser(userWithToken);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'שגיאה בהתחברות. בדוק את האימייל והסיסמה.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">התחברות</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="הזן סיסמה"
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'מתחבר...' : 'התחבר'}
        </button>
        <div className="text-center text-sm text-gray-600">
          אין לך חשבון?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            הירשם כאן
          </button>
        </div>
      </form>
    </div>
  );
}
