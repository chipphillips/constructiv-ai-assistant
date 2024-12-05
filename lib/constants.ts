export const OPENAI_MODEL = 'gpt-3.5-turbo' as const;
export const MAX_TOKENS = 500;
export const TEMPERATURE = 0.7;

export const API_ROUTES = {
  chat: '/api/chat'
} as const;

export const CHAT_SETTINGS = {
  id: 'constructiv-ai-assistant',
  name: 'Constructiv AI Assistant',
  description: 'A helpful AI assistant for the construction industry',
  systemPrompt: `You are a knowledgeable AI assistant specializing in the construction industry. 
You help users with construction-related queries, project management, and technical information. 
Your responses should be practical, clear, and focused on construction industry best practices.`,
  message: {
    loading: 'Thinking...',
    error: 'An error occurred. Please try again.',
    placeholder: 'Ask me anything about construction...'
  }
} as const; 