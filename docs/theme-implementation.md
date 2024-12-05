# Theme Implementation Guide

## Overview
This document outlines the implementation of a theme switching functionality in our construction AI assistant application, allowing users to toggle between light and dark modes.

## Dependencies

```bash
# Install required packages
npm install next-themes @radix-ui/react-dropdown-menu lucide-react
```

## Implementation Steps

### 1. Theme Provider Setup

First, create the theme provider component:

```typescript
// components/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### 2. Theme Toggle Component

Create a theme toggle button using shadcn/ui components:

```typescript
// components/theme-toggle.tsx
'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### 3. Root Layout Configuration

Update the root layout to include the theme provider:

```typescript
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 4. Tailwind Configuration

Ensure your `tailwind.config.js` includes dark mode configuration:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  // ... rest of your config
}
```

### 5. CSS Variables

Add CSS variables for theme colors in your global CSS:

```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* Add other light theme variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Add other dark theme variables */
  }
}
```

## Usage

### Adding the Theme Toggle to Your Layout

Place the theme toggle in the top right corner:

```typescript
// app/page.tsx or your layout component
import { ThemeToggle } from '@/components/theme-toggle'

export default function Layout() {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {/* Rest of your layout */}
    </div>
  )
}
```

### Using Theme Classes in Components

When styling components, use the dark: prefix for dark mode styles:

```typescript
<div className="bg-white text-black dark:bg-slate-800 dark:text-white">
  Content
</div>
```

## Best Practices

1. **Hydration Handling**
   - Use `suppressHydrationWarning` on the html element
   - Use `useTheme` hook only in client components

2. **Performance**
   - Use `disableTransitionOnChange` to prevent animation flicker
   - Implement proper color schemes in CSS variables

3. **Accessibility**
   - Include proper aria-labels
   - Ensure sufficient color contrast in both themes
   - Add proper focus states

## Troubleshooting

Common issues and solutions:

1. **Hydration Mismatch**
   - Ensure theme provider is wrapped in 'use client'
   - Check for server/client rendering differences

2. **Flash of Incorrect Theme**
   - Add proper meta tags
   - Use CSS variables for initial theme

3. **Transition Issues**
   - Check transition classes
   - Verify CSS variable implementation 