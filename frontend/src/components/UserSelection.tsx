import { useState, useEffect } from 'react';
import { usersApi } from '../services/api';
import { useUser } from '../context/UserContext';
import { Registration } from './Registration';
import type { User } from '../types';

export function UserSelection() {
  const { setCurrentUser } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersApi.list();
      setUsers(data);
    } catch (err: any) {
      setError('שגיאה בטעינת משתמשים');
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user: User) => {
    setCurrentUser(user);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    loadUsers(); // Reload users list after registration
  };

  if (showRegistration) {
    return (
      <div>
        <button
          onClick={() => setShowRegistration(false)}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← חזרה לבחירת משתמש
        </button>
        <Registration onSuccess={handleRegistrationSuccess} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">בחר משתמש או הירשם</h2>
      
      {loading ? (
        <div className="text-center py-4">טוען משתמשים...</div>
      ) : error ? (
        <div className="text-red-600 text-center mb-4">{error}</div>
      ) : users.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">משתמשים קיימים:</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="w-full text-right px-4 py-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-md transition-colors"
              >
                <div className="font-medium">{user.name}</div>
                {user.phone && (
                  <div className="text-sm text-gray-600">{user.phone}</div>
                )}
                {user.email && (
                  <div className="text-sm text-gray-600">{user.email}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center text-gray-600">
          אין משתמשים רשומים עדיין
        </div>
      )}

      <div className="border-t pt-4">
        <button
          onClick={() => setShowRegistration(true)}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          הירשם משתמש חדש
        </button>
      </div>
    </div>
  );
}
