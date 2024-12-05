'use client';

import { Plus } from 'lucide-react';
import { usePromptHistory } from './PromptHistoryContext';

export function PromptActions() {
  const { createNewChat } = usePromptHistory();

  return (
    <button
      onClick={createNewChat}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg
        bg-primary-600 hover:bg-primary-700 
        dark:bg-primary-700 dark:hover:bg-primary-600
        text-neutral-50 font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
    >
      <span>New Construction Chat</span>
      <Plus className="h-5 w-5" />
    </button>
  );
} 