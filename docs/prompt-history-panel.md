# Prompt History Panel Documentation

## Overview
The Prompt History Panel is a crucial component of the chat system that displays the conversation history between users and the AI assistant. This document covers the configuration, components, and integration with Supabase for persistent storage.

## Components Structure

### Core Components

```typescript
// components/PromptHistoryPanel/
├── PromptHistoryPanel.tsx       // Main container component
├── PromptItem.tsx              // Individual prompt/response item
├── PromptActions.tsx           // Action buttons for each prompt
└── PromptHistoryContext.tsx    // Context for managing history state
```

### Key Features
- Collapsible sidebar design
- Real-time updates
- Message grouping by conversation
- Search functionality
- Timestamp display
- Action buttons (copy, edit, delete)

## Configuration

### Basic Setup

```typescript
// config/prompt-history.ts
export const promptHistoryConfig = {
  maxDisplayedItems: 50,
  groupByConversation: true,
  timestampFormat: 'MMM DD, YYYY HH:mm',
  enableSearch: true,
  enableActions: true,
  itemsPerPage: 20,
};
```

### Styling Configuration

```typescript
// styles/prompt-history.ts
export const promptHistoryStyles = {
  panel: {
    width: '320px',
    maxHeight: '100vh',
    backgroundColor: 'var(--background-secondary)',
    borderLeft: '1px solid var(--border-color)',
  },
  item: {
    padding: '12px',
    margin: '8px 0',
    borderRadius: '6px',
    backgroundColor: 'var(--background-primary)',
  },
  // Add custom styles here
};
```

## UI/UX Customization

### Theme Configuration
The panel supports both light and dark modes, customizable through CSS variables:

```css
:root {
  /* Light theme */
  --background-primary: #ffffff;
  --background-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --accent-color: #0070f3;
}

[data-theme="dark"] {
  /* Dark theme */
  --background-primary: #1a1a1a;
  --background-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --border-color: #404040;
  --accent-color: #3291ff;
}
```

### Layout Customization
Modify the panel layout through the configuration:

```typescript
export const layoutConfig = {
  sidebarPosition: 'right', // 'left' | 'right'
  expandedWidth: '320px',
  collapsedWidth: '60px',
  animationDuration: '0.3s',
  showHeader: true,
  showFooter: true,
};
```

## Supabase Integration

### Database Schema

```sql
-- prompts table
create table prompts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  conversation_id uuid references conversations(id),
  content text not null,
  role text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- conversations table
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  title text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

### Supabase Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Data Fetching

```typescript
// hooks/usePromptHistory.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const usePromptHistory = (conversationId: string) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching prompts:', error);
        return;
      }

      setPrompts(data);
      setLoading(false);
    };

    fetchPrompts();
  }, [conversationId]);

  return { prompts, loading };
};
```

## Implementation Example

```typescript
// components/PromptHistoryPanel/PromptHistoryPanel.tsx
import React from 'react';
import { usePromptHistory } from '@/hooks/usePromptHistory';
import { PromptItem } from './PromptItem';
import { promptHistoryStyles } from '@/styles/prompt-history';

export const PromptHistoryPanel: React.FC<{ conversationId: string }> = ({ 
  conversationId 
}) => {
  const { prompts, loading } = usePromptHistory(conversationId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={promptHistoryStyles.panel}>
      <div className="prompt-history-header">
        <h2>Chat History</h2>
      </div>
      <div className="prompt-history-content">
        {prompts.map((prompt) => (
          <PromptItem key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};
```

## Best Practices

1. **Performance Optimization**
   - Implement virtual scrolling for large histories
   - Use pagination for data fetching
   - Optimize re-renders using React.memo and useMemo

2. **Accessibility**
   - Include ARIA labels
   - Ensure keyboard navigation
   - Maintain sufficient color contrast
   - Support screen readers

3. **Error Handling**
   - Implement proper error boundaries
   - Show user-friendly error messages
   - Provide retry mechanisms for failed operations

4. **State Management**
   - Use appropriate state management solution (Context/Redux)
   - Implement optimistic updates
   - Handle concurrent updates properly

## Future Enhancements

1. **Real-time Collaboration**
   - Implement Supabase real-time subscriptions
   - Add user presence indicators
   - Enable shared conversation viewing

2. **Advanced Features**
   - Message search with filters
   - Conversation categorization
   - Export functionality
   - Rich text formatting support

3. **Analytics Integration**
   - Track usage patterns
   - Measure response times
   - Monitor error rates

## Troubleshooting

Common issues and their solutions:

1. **Data Not Loading**
   - Check Supabase connection
   - Verify authentication status
   - Console log error responses

2. **UI Issues**
   - Clear browser cache
   - Check CSS specificity
   - Verify theme variables

3. **Performance Problems**
   - Implement pagination
   - Use proper indexing in database
   - Optimize component re-renders 