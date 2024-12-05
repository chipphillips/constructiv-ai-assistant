'use client';

import { Message } from 'ai/react';
import { ChatMessage } from './message';
import { CHAT_SETTINGS } from '@/lib/constants';

export interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-4">
          <div className="flex animate-pulse space-x-2">
            <div className="h-2 w-2 rounded-full bg-slate-600"></div>
            <div className="h-2 w-2 rounded-full bg-slate-600"></div>
            <div className="h-2 w-2 rounded-full bg-slate-600"></div>
          </div>
          <p className="text-sm text-muted-foreground">
            {CHAT_SETTINGS.message.loading}
          </p>
        </div>
      )}
    </div>
  );
} 