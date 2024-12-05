'use client';

import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string;
  value: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <div className="relative w-full">
      <div className="absolute right-2 top-2 text-xs text-gray-400">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1.5rem 1rem',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}; 