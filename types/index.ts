import { Message } from 'ai/react';

export interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

export interface ChatMessageProps {
  message: Message;
} 