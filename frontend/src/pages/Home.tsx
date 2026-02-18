import { useState } from 'react';
import { Login } from '../components/Login';
import { Registration } from '../components/Registration';
import { useUser } from '../context/UserContext';

export function Home() {
  const { currentUser } = useUser();
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">פלטפורמת למידה מונעת AI</h1>
        <p className="text-center text-gray-600 mb-8">
          בחר נושא, שלח prompt, וקבל שיעור מותאם אישית מ-AI
        </p>
        
        {!currentUser ? (
          showLogin ? (
            <Login onSwitchToRegister={() => setShowLogin(false)} />
          ) : (
            <Registration onSwitchToLogin={() => setShowLogin(true)} />
          )
        ) : (
          <div className="text-center py-8">
            <p className="text-lg mb-4">שלום, {currentUser.name}!</p>
            <p className="text-gray-600">נווט לתפריט כדי להתחיל ללמוד</p>
          </div>
        )}
      </div>
    </div>
  );
}
