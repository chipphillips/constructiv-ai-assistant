# Chat System Architecture

## Overview
The chat system is built using Next.js and the Vercel AI SDK, providing a structured way to interact with AI models while supporting markdown and table formatting.

## Core Components

### API Routes

#### `/api/chat/route.ts`
- Main chat API endpoint
- Handles streaming responses from OpenAI
- Supports structured output formats (markdown and tables)
- Uses `streamText` from Vercel AI SDK
- Configures system messages based on requested format

### UI Components

#### `components/chat/chat-input.tsx`
- Main chat input interface
- Features:
  - Expandable textarea
  - Format selector (Default/Markdown/Table)
  - File attachment support
  - Submit button with loading state
- Handles format options for structured responses

#### `components/chat/message.tsx`
- Renders individual chat messages
- Supports:
  - Markdown rendering
  - Code blocks with syntax highlighting
  - Tables with proper formatting
  - Inline code
- Uses `react-markdown` with custom components

#### `components/ui/code-block.tsx`
- Reusable code block component
- Features:
  - Syntax highlighting
  - Language indicator
  - Custom styling
- Used within markdown messages

## Utility Functions

#### `lib/structured-chat.ts`
- Provides types and utilities for structured chat
- Defines format types (markdown/table)
- Handles message structure

## Current Usage

The system is currently set up to:
1. Accept user input with format selection
2. Process messages through the AI with format-specific instructions
3. Render responses with proper formatting
4. Support file attachments

## Format Options

### Markdown Format
- Supports sections like:
  - Overview
  - Details
  - Conclusion
- Renders with proper headings and styling

### Table Format
- Supports structured data with headers
- Default headers:
  - Item
  - Description
  - Value
- Renders in a clean, bordered table format

## Not Currently Used
Some components that exist but aren't actively used:
- `components/StructuredChat.tsx` (standalone component)
- `app/api/structured-chat/route.ts` (separate API route)

## Dependencies
- `ai` - Vercel AI SDK
- `@ai-sdk/openai` - OpenAI integration
- `react-markdown` - Markdown rendering
- `react-syntax-highlighter` - Code highlighting
- `lucide-react` - Icons
- `zod` - Request validation 