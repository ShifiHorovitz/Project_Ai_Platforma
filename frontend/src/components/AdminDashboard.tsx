import { useState, useEffect } from 'react';
import { adminApi } from '../services/api';
import { useUser } from '../context/UserContext';
import type { User, Prompt } from '../types';

export function AdminDashboard() {
  const { currentUser } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'prompts'>('users');

  useEffect(() => {
    if (currentUser?.is_admin) {
      loadData();
    }
  }, [currentUser]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersData, promptsData] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getPrompts(),
      ]);
      setUsers(usersData);
      setPrompts(promptsData);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('אין לך הרשאות אדמין');
      } else {
        setError('שגיאה בטעינת נתונים');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser?.is_admin) {
    return (
      <div className="text-center py-8 text-red-600">
        גישה נדחתה. רק אדמינים יכולים לגשת לדשבורד זה.
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">טוען נתונים...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">דשבורד אדמין</h2>
      
      <div className="mb-4 border-b">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          משתמשים ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-4 py-2 ${activeTab === 'prompts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Prompts ({prompts.length})
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right">ID</th>
                <th className="px-4 py-3 text-right">שם</th>
                <th className="px-4 py-3 text-right">טלפון</th>
                <th className="px-4 py-3 text-right">אימייל</th>
                <th className="px-4 py-3 text-right">אדמין</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.phone || '-'}</td>
                  <td className="px-4 py-3">{user.email || '-'}</td>
                  <td className="px-4 py-3">{user.is_admin ? '✓' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'prompts' && (
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="text-sm text-gray-500 mb-2">
                משתמש #{prompt.user_id} | {new Date(prompt.created_at).toLocaleString('he-IL')}
              </div>
              <div className="font-semibold mb-1">Prompt:</div>
              <div className="text-gray-700 mb-3">{prompt.prompt}</div>
              <div className="font-semibold mb-1">תגובה:</div>
              <div className="text-gray-800 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                {prompt.response}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
