import { z } from 'zod';
import { MessageSchema } from '../types';
import { baseSystemMessage, styleInstructions } from '../config/system-messages';
import type { MessageStyle } from '../types';

export function getSystemMessage(style: MessageStyle = 'detailed'): string {
  return `${baseSystemMessage}${styleInstructions[style]}`;
}

export function augmentMessagesWithSystem(messages: z.infer<typeof MessageSchema>[], style: MessageStyle = 'detailed') {
  const hasSystemMessage = messages.some(msg => msg.role === 'system');
  if (hasSystemMessage) return messages;
  
  return [
    { role: 'system' as const, content: getSystemMessage(style) },
    ...messages
  ];
} 