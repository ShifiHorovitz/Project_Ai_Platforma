import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { currentUser, setCurrentUser } = useUser();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8 space-x-reverse">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                בית
              </Link>
              {currentUser && (
                <>
                  <Link
                    to="/learn"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/learn') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    למידה
                  </Link>
                  <Link
                    to="/history"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/history') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    היסטוריה
                  </Link>
                  {currentUser.is_admin && (
                    <Link
                      to="/admin"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/admin') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      אדמין
                    </Link>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              {currentUser ? (
                <>
                  <span className="text-sm text-gray-700">{currentUser.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    התנתק
                  </button>
                </>
              ) : (
                <span className="text-sm text-gray-500">לא מחובר</span>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
