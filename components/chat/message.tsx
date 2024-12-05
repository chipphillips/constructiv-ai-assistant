'use client';

import { Message } from 'ai';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../ui/code-block';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message, isLoading }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={cn(
      "w-full py-4 first:pt-2",
      "bg-white dark:bg-neutral-900"
    )}>
      <div className="mx-auto max-w-3xl px-3">
        <div className={cn(
          "flex items-start gap-3",
          isAssistant ? "justify-start" : "justify-end"
        )}>
          {isAssistant && (
            <div className="flex-shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-600/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-600">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}
          <div className={cn(
            "relative text-sm px-4 py-3 rounded-xl max-w-[85%]",
            isAssistant ? "text-neutral-800 dark:text-neutral-200" : "bg-primary-600 text-white"
          )}>
            <ReactMarkdown
              className={cn(
                "prose prose-sm max-w-none",
                isAssistant ? "prose-neutral dark:prose-invert" : "prose-invert"
              )}
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                code(props) {
                  const { children, className, ...rest } = props;
                  const language = (className || '').replace('language-', '');
                  const isInline = !className;
                  
                  if (isInline) {
                    return <code {...rest}>{children}</code>;
                  }

                  return (
                    <CodeBlock
                      language={language || 'text'}
                      value={String(children).replace(/\n$/, '')}
                    />
                  );
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto">
                    <table className="border-collapse border border-gray-400">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-400 px-4 py-2 bg-gray-100">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-400 px-4 py-2">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};