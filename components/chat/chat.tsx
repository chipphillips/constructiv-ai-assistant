'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [files, setFiles] = useState<FileList | undefined>(undefined);

  const handleFileSelect = (newFiles: FileList | null, type: 'file' | 'image') => {
    if (newFiles) {
      setFiles(newFiles);
      // Automatically submit if files are selected
      const e = new Event('submit') as any;
      handleSubmit(e, { experimental_attachments: newFiles });
      setFiles(undefined);
    }
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="max-w-xl text-center space-y-2">
              <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                Welcome to Constructiv AI Assistant
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                A helpful AI assistant for the construction industry. How can I help you today?
              </p>
            </div>
          </div>
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800 p-4">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={(e) => {
              handleSubmit(e, { experimental_attachments: files });
              setFiles(undefined);
            }}
            isLoading={isLoading}
            onFileSelect={handleFileSelect}
          />
        </div>
      </div>
    </div>
  );
} 