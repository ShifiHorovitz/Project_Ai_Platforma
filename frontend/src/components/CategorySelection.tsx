import { useState, useEffect } from 'react';
import { categoriesApi, subCategoriesApi } from '../services/api';
import type { Category, SubCategory } from '../types';

interface CategorySelectionProps {
  onSelect: (categoryId: number, subCategoryId: number) => void;
  selectedCategoryId?: number;
  selectedSubCategoryId?: number;
}

export function CategorySelection({ onSelect, selectedCategoryId, selectedSubCategoryId }: CategorySelectionProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      loadSubCategories(selectedCategoryId);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryId]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await categoriesApi.list();
      setCategories(data);
    } catch (err: any) {
      setError('שגיאה בטעינת קטגוריות');
    } finally {
      setLoading(false);
    }
  };

  const loadSubCategories = async (categoryId: number) => {
    try {
      const data = await subCategoriesApi.list(categoryId);
      setSubCategories(data);
    } catch (err: any) {
      setError('שגיאה בטעינת תת-קטגוריות');
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    onSelect(categoryId, 0);
  };

  const handleSubCategoryChange = (subCategoryId: number) => {
    if (selectedCategoryId) {
      onSelect(selectedCategoryId, subCategoryId);
    }
  };

  if (loading) {
    return <div className="text-center py-4">טוען קטגוריות...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">קטגוריה</label>
        <select
          value={selectedCategoryId || ''}
          onChange={(e) => handleCategoryChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">בחר קטגוריה</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCategoryId && (
        <div>
          <label className="block text-sm font-medium mb-2">תת-קטגוריה</label>
          <select
            value={selectedSubCategoryId || ''}
            onChange={(e) => handleSubCategoryChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">בחר תת-קטגוריה</option>
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}
