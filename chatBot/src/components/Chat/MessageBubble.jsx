import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Sparkles, User, RefreshCw, Hexagon, Zap, BrainCircuit, Box, Lightbulb, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const getModelIcon = (modelId) => {
  switch (modelId) {
    case 'gemini': return <Sparkles className="w-4 h-4 text-blue-400" />;
    case 'groq': return <Hexagon className="w-4 h-4 text-fuchsia-400" />;
    case 'openrouter': return <Globe className="w-4 h-4 text-emerald-400" />;
    case 'chatgpt': return <Zap className="w-4 h-4 text-green-400" />;
    case 'claude': return <BrainCircuit className="w-4 h-4 text-orange-400" />;
    case 'deepseek': return <Box className="w-4 h-4 text-indigo-400" />;
    case 'perplexity': return <Lightbulb className="w-4 h-4 text-cyan-400" />;
    default: return <Sparkles className="w-4 h-4 text-ai-primary" />;
  }
};

const getModelName = (modelId) => {
  switch (modelId) {
    case 'gemini': return 'Gemini 3.1 Pro';
    case 'groq': return 'Groq (Llama 3)';
    case 'openrouter': return 'OpenRouter';
    case 'chatgpt': return 'ChatGPT-4';
    case 'claude': return 'Claude 3 Opus';
    case 'deepseek': return 'DeepSeek V3';
    case 'perplexity': return 'Perplexity';
    default: return modelId || 'AI Assistant';
  }
};

const MarkdownContent = ({ content }) => (
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
    {content}
  </ReactMarkdown>
);

const ResponsePanel = ({ content, modelId }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!', {
      style: { borderRadius: '10px', background: '#1e293b', color: '#fff' }
    });
  };

  return (
    <div className="flex-1 bg-ai-panel/60 border border-ai-border/50 rounded-2xl p-4 shadow-lg flex flex-col relative group overflow-hidden">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-ai-border/30">
        <div className="flex items-center gap-2">
          {getModelIcon(modelId)}
          <span className="text-sm font-semibold text-ai-text/90">{getModelName(modelId)}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="p-1.5 text-ai-text-muted hover:text-ai-text hover:bg-white/5 rounded-md" title="Copy">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-ai-text-muted hover:text-ai-text hover:bg-white/5 rounded-md" title="Regenerate">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="markdown-body custom-scrollbar overflow-x-auto">
        <MarkdownContent content={content} />
      </div>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const isAi = message.role === 'ai';

  if (message.isSideBySide) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 w-full">
        <ResponsePanel content={message.left.content} modelId={message.left.model} />
        <ResponsePanel content={message.right.content} modelId={message.right.model} />
      </motion.div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Copied to clipboard!', {
      style: { borderRadius: '10px', background: '#1e293b', color: '#fff' }
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
          {getModelIcon(message.model)}
        </div>
      )}

      <div
        className={`relative max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 group ${
          isAi
            ? 'bg-ai-panel/60 border border-ai-border/50 text-ai-text rounded-tl-sm shadow-lg'
            : 'bg-gradient-to-br from-ai-primary to-ai-secondary text-white rounded-tr-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]'
        }`}
      >
        {isAi && (
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/5">
            <span className="text-xs font-semibold text-ai-text-muted">{getModelName(message.model)}</span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={handleCopy} className="p-1 text-ai-text-muted hover:text-ai-text rounded" title="Copy">
                 <Copy className="w-3.5 h-3.5" />
               </button>
               <button className="p-1 text-ai-text-muted hover:text-ai-text rounded" title="Regenerate">
                 <RefreshCw className="w-3.5 h-3.5" />
               </button>
            </div>
          </div>
        )}
        <div className="markdown-body">
          {isAi ? (
            <MarkdownContent content={message.content} />
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
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
