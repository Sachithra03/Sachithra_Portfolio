'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

function extractText(node: React.ReactNode): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && node.props && (node.props as { children?: React.ReactNode }).children) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

function CodeBlockWrapper({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  let lang = 'CODE';
  if (React.isValidElement(children)) {
    const childProps = children.props as { className?: string } | undefined;
    if (childProps?.className) {
      const match = /language-([a-z0-9_-]+)/i.exec(childProps.className);
      if (match) {
        lang = match[1].toUpperCase();
      }
    }
  }

  const handleCopy = async () => {
    const text = extractText(children);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <div className="brutalist-code-container">
      <div className="brutalist-code-header">
        <div className="brutalist-code-title">
          <span className="brutalist-code-dot" />
          <span className="brutalist-code-lang">{lang}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="brutalist-copy-btn"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} style={{ color: 'var(--accent)' }} />
              <span style={{ color: 'var(--accent)' }}>COPIED</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>
      <pre className="brutalist-code-pre" {...props}>
        {children}
      </pre>
    </div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="article-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ children, ...props }) => (
            <CodeBlockWrapper {...props}>{children}</CodeBlockWrapper>
          ),
          table: ({ children, ...props }) => (
            <div className="brutalist-table-wrapper">
              <table className="brutalist-table" {...props}>
                {children}
              </table>
            </div>
          ),
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http') || href?.startsWith('//');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="markdown-link"
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
