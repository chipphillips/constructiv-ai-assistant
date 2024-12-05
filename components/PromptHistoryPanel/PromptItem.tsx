'use client';

import { format } from 'date-fns';
import { usePromptHistory } from './PromptHistoryContext';
import { cn } from '@/lib/utils';

interface PromptItemProps {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export function PromptItem({ id, title, timestamp }: PromptItemProps) {
  const { currentChatId, setCurrentChatId } = usePromptHistory();
  const isSelected = id === currentChatId;

  return (
    <button
      onClick={() => setCurrentChatId(id)}
      className={cn(
        "w-full rounded-lg p-3 text-left transition-all",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
        isSelected ? 
          "bg-neutral-100 dark:bg-neutral-800 border-l-2 border-primary-600" : 
          "bg-neutral-50 dark:bg-neutral-800/50"
      )}
    >
      <h1 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
        {title}
      </h1>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {format(timestamp, 'd MMM')}
      </p>
    </button>
  );
} 