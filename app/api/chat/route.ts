import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { RequestSchema } from '../../../types';
import { augmentMessagesWithSystem } from '../../../utils/chat';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { messages, style = 'detailed' } = RequestSchema.parse(json);
    
    const augmentedMessages = augmentMessagesWithSystem(messages, style);

    const response = await streamText({
      model: openai('gpt-4o-mini'),
      messages: augmentedMessages,
      temperature: 0.2,
      maxTokens: 1500,
    });

    return response.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ error: 'Error processing request' }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}