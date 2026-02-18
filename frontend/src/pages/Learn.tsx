import { useState } from 'react';
import { PromptForm } from '../components/PromptForm';
import { LessonView } from '../components/LessonView';
import type { Prompt } from '../types';

export function Learn() {
  const [latestPrompt, setLatestPrompt] = useState<Prompt | null>(null);

  const handlePromptCreated = (prompt: Prompt) => {
    setLatestPrompt(prompt);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">למד עם AI</h1>
        
        <PromptForm onPromptCreated={handlePromptCreated} />
        
        {latestPrompt && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">השיעור האחרון שלך:</h2>
            <LessonView prompt={latestPrompt} />
          </div>
        )}
      </div>
    </div>
  );
}
