'use client';

import { useChat } from 'ai/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { PromptHistoryPanel } from '@/components/PromptHistoryPanel/PromptHistoryPanel';
import { Card } from '@/components/ui/card';
import { CHAT_SETTINGS } from '@/lib/constants';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  const [chatId, setChatId] = useState<string>('new');
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    id: chatId,
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I'm ${CHAT_SETTINGS.name}. ${CHAT_SETTINGS.description}. How can I help you today?`
      }
    ],
    body: {
      id: chatId,
    },
    onResponse(response) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
    },
    onFinish() {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNewChat = () => {
    setChatId(`new-${Date.now()}`);
    setMessages([]);
  };

  const handleFileSelect = (newFiles: FileList | null, type: 'file' | 'image') => {
    if (newFiles) {
      setFiles(newFiles);
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await handleSubmit(e, {
        experimental_attachments: files,
        data: {
          id: chatId,
        }
      });

      // Reset files after successful submission
      setFiles(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <PromptHistoryPanel />
      
      <main className="flex-1 flex flex-col items-center p-4 pl-[80px] lg:pl-[280px]">
        <div className="w-full max-w-4xl flex-1 flex flex-col">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              {CHAT_SETTINGS.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {CHAT_SETTINGS.description}
            </p>
          </div>
          
          <Card className="flex-1 flex flex-col min-h-[600px]">
            <div className="flex-1 overflow-y-auto p-4">
              <ChatMessages messages={messages} isLoading={isLoading} />
            </div>
            <div className="border-t p-4">
              <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleMessageSubmit}
                isLoading={isLoading}
                onFileSelect={handleFileSelect}
                hasAttachments={files !== undefined && files.length > 0}
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
