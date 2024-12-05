'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface PromptHistoryContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  chatHistory: ChatHistory[];
  filteredChatHistory: ChatHistory[];
  currentChatId?: string;
  setCurrentChatId: (id: string) => void;
  createNewChat: () => void;
  searchChats: (query: string) => void;
}

const PromptHistoryContext = createContext<PromptHistoryContextType | undefined>(undefined);

// Temporary mock data until Supabase integration
const mockChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: 'Project Planning Discussion',
    lastMessage: 'Let\'s review the timeline...',
    timestamp: new Date('2024-03-01')
  },
  {
    id: '2',
    title: 'Site Safety Analysis',
    lastMessage: 'The safety protocols need...',
    timestamp: new Date('2024-03-02')
  }
];

export function PromptHistoryProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(mockChatHistory);
  const [filteredChatHistory, setFilteredChatHistory] = useState<ChatHistory[]>(mockChatHistory);
  const [currentChatId, setCurrentChatId] = useState<string>();

  const createNewChat = () => {
    // This will be replaced with actual Supabase integration
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: 'New Construction Chat',
      lastMessage: 'Chat started',
      timestamp: new Date()
    };
    const updatedHistory = [newChat, ...chatHistory];
    setChatHistory(updatedHistory);
    setFilteredChatHistory(updatedHistory);
    setCurrentChatId(newChat.id);
  };

  const searchChats = (query: string) => {
    if (!query.trim()) {
      setFilteredChatHistory(chatHistory);
      return;
    }

    const filtered = chatHistory.filter(chat => 
      chat.title.toLowerCase().includes(query.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredChatHistory(filtered);
  };

  return (
    <PromptHistoryContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        chatHistory,
        filteredChatHistory,
        currentChatId,
        setCurrentChatId,
        createNewChat,
        searchChats
      }}
    >
      {children}
    </PromptHistoryContext.Provider>
  );
}

export function usePromptHistory() {
  const context = useContext(PromptHistoryContext);
  if (context === undefined) {
    throw new Error('usePromptHistory must be used within a PromptHistoryProvider');
  }
  return context;
} 