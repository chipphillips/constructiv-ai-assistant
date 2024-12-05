'use client';

import { cn } from '@/lib/utils';
import { usePromptHistory } from './PromptHistoryContext';
import { PromptItem } from './PromptItem';
import { PromptActions } from './PromptActions';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function PromptHistoryPanel() {
  const { chatHistory, filteredChatHistory, searchChats } = usePromptHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchChats(searchQuery);
  };

  return (
    <div className="max-w-xl rounded-lg border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-start p-4 border-b border-neutral-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          Construction Chats
        </h2>
        <span className="ml-2 rounded-full bg-primary-600 px-2 py-1 text-xs text-white">
          {chatHistory.length}
        </span>
      </div>

      {/* Search */}
      <form className="p-4" onSubmit={handleSearch}>
        <label htmlFor="search-chats" className="sr-only">Search chats</label>
        <div className="relative">
          <Input
            id="search-chats"
            type="text"
            className="w-full bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100 dark:placeholder-neutral-400"
            placeholder="Search construction chats"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchChats(e.target.value);
            }}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search chats</span>
          </button>
        </div>
      </form>

      {/* Chat List */}
      <div className="h-[calc(100vh-16rem)] overflow-y-auto p-4 space-y-2 bg-white dark:bg-neutral-900">
        {filteredChatHistory.map((chat) => (
          <PromptItem
            key={chat.id}
            id={chat.id}
            title={chat.title}
            lastMessage={chat.lastMessage}
            timestamp={chat.timestamp}
          />
        ))}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
        <PromptActions />
      </div>
    </div>
  );
} 