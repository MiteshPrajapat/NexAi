import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Sparkles, User } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageBubble = ({ message }) => {
  const isAi = message.role === 'ai';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Copied to clipboard!', {
      style: {
        borderRadius: '10px',
        background: '#1e293b',
        color: '#fff',
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 w-full ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      {isAi && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-tr from-ai-primary to-ai-secondary flex items-center justify-center mt-1">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`relative max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 ${
          isAi
            ? 'bg-ai-panel/60 border border-ai-border/50 text-ai-text rounded-tl-sm shadow-lg'
            : 'bg-gradient-to-br from-ai-primary to-ai-secondary text-white rounded-tr-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]'
        }`}
      >
        <div className="markdown-body">
          {isAi ? (
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ borderRadius: '0.5rem', background: '#0f172a', margin: '1rem 0' }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {isAi && (
          <button
            onClick={handleCopy}
            className="absolute -right-12 bottom-0 p-2 text-ai-text-muted hover:text-ai-text bg-ai-panel/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copy response"
          >
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isAi && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mt-1">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
