import { useState, useEffect } from 'react';
import { promptsApi } from '../services/api';
import { useUser } from '../context/UserContext';
import { LessonView } from './LessonView';
import type { Prompt } from '../types';

export function History() {
  const { currentUser } = useUser();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      loadHistory();
    }
  }, [currentUser]);

  const loadHistory = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await promptsApi.getUserPrompts(currentUser.id);
      setPrompts(data);
    } catch (err: any) {
      setError('שגיאה בטעינת היסטוריה');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center py-8 text-gray-600">
        יש להתחבר כדי לראות את ההיסטוריה
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">טוען היסטוריה...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">היסטוריית הלמידה שלי</h2>
      {prompts.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          עדיין אין לך היסטוריה. שלח prompt ראשון כדי להתחיל!
        </div>
      ) : (
        <div>
          {prompts.map((prompt) => (
            <LessonView key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
