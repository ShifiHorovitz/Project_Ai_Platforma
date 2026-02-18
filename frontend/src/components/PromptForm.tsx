import { useState } from 'react';
import { promptsApi } from '../services/api';
import { useUser } from '../context/UserContext';
import { CategorySelection } from './CategorySelection';
import type { Prompt } from '../types';

interface PromptFormProps {
  onPromptCreated: (prompt: Prompt) => void;
}

export function PromptForm({ onPromptCreated }: PromptFormProps) {
  const { currentUser } = useUser();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [subCategoryId, setSubCategoryId] = useState<number | undefined>();
  const [promptText, setPromptText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('יש להתחבר תחילה');
      return;
    }

    if (!categoryId || !subCategoryId) {
      setError('יש לבחור קטגוריה ותת-קטגוריה');
      return;
    }

    if (!promptText.trim()) {
      setError('יש להזין prompt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const prompt = await promptsApi.create({
        user_id: currentUser.id,
        category_id: categoryId,
        sub_category_id: subCategoryId,
        prompt: promptText,
      });
      onPromptCreated(prompt);
      setPromptText('');
      setCategoryId(undefined);
      setSubCategoryId(undefined);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'שגיאה בשליחת prompt. נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center py-8 text-gray-600">
        יש להתחבר תחילה כדי לשלוח prompt
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">שלח prompt ל-AI</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CategorySelection
          onSelect={(catId, subCatId) => {
            setCategoryId(catId);
            setSubCategoryId(subCatId);
          }}
          selectedCategoryId={categoryId}
          selectedSubCategoryId={subCategoryId}
        />
        <div>
          <label className="block text-sm font-medium mb-2">Prompt שלך</label>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="לדוגמה: 'למד אותי על חורים שחורים'"
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading || !categoryId || !subCategoryId || !promptText.trim()}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'שולח...' : 'שלח prompt'}
        </button>
      </form>
    </div>
  );
}
