import type { Prompt } from '../types';

interface LessonViewProps {
  prompt: Prompt;
}

export function LessonView({ prompt }: LessonViewProps) {
  const date = new Date(prompt.created_at).toLocaleString('he-IL');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="mb-4 pb-4 border-b">
        <div className="text-sm text-gray-500 mb-2">תאריך: {date}</div>
        <div className="font-semibold text-lg mb-2">השאלה שלך:</div>
        <div className="text-gray-700">{prompt.prompt}</div>
      </div>
      <div>
        <div className="font-semibold text-lg mb-2">תגובת ה-AI:</div>
        <div className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
          {prompt.response}
        </div>
      </div>
    </div>
  );
}
