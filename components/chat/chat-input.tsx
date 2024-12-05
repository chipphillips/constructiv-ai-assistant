'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PaperclipIcon, SendIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, options?: any) => void;
  isLoading: boolean;
  onFileSelect?: (files: FileList | null, type: 'file' | 'image') => void;
  hasAttachments?: boolean;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  onFileSelect,
  hasAttachments,
}: ChatInputProps) {
  const [style, setStyle] = useState<'detailed' | 'concise' | 'technical'>('detailed');

  const handleStyleChange = (value: string) => {
    setStyle(value as typeof style);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e, { style });
  };

  return (
    <form onSubmit={handleFormSubmit} className="relative w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-4">
        <Select value={style} onValueChange={handleStyleChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Response Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="detailed">Detailed</SelectItem>
            <SelectItem value="concise">Concise</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative flex flex-col w-full bg-background rounded-lg border shadow-sm">
        <Textarea
          placeholder="Ask me anything about construction..."
          value={input}
          onChange={handleInputChange}
          rows={3}
          className="min-h-[100px] w-full resize-y bg-transparent px-4 py-3 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          {onFileSelect && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.onchange = (e) => {
                  const target = e.target as HTMLInputElement;
                  onFileSelect(target.files, 'file');
                };
                input.click();
              }}
            >
              <PaperclipIcon className="h-5 w-5" />
              <span className="sr-only">Attach files</span>
            </Button>
          )}
          <Button 
            type="submit" 
            size="icon" 
            className="h-8 w-8" 
            disabled={isLoading || input.length === 0}
          >
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
      {hasAttachments && (
        <div className="mt-2 text-sm text-gray-500">Files attached</div>
      )}
    </form>
  );
} 