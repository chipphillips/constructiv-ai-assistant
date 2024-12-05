import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  id: z.string().optional(),
});

export const RequestSchema = z.object({
  messages: z.array(MessageSchema),
  style: z.enum(['detailed', 'concise', 'technical']).optional(),
});

export type ChatRequest = z.infer<typeof RequestSchema>;
export type MessageStyle = 'detailed' | 'concise' | 'technical'; 