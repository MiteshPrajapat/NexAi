import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, PenTool, Lightbulb, Search } from 'lucide-react';

const suggestions = [
  { icon: Code, text: 'Write a React component for a data table' },
  { icon: PenTool, text: 'Draft an email to a client about a delay' },
  { icon: Lightbulb, text: 'Brainstorm ideas for a sci-fi novel' },
  { icon: Search, text: 'Explain quantum computing simply' },
];

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-4 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-24 h-24 mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-ai-primary to-ai-secondary rounded-3xl blur-xl opacity-50 animate-pulse-slow"></div>
        <div className="relative w-full h-full bg-ai-panel border border-ai-border/50 rounded-3xl flex items-center justify-center shadow-2xl">
          <Sparkles className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70" style={{ stroke: "url(#gradient)" }} />
          <svg width="0" height="0">
            <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop stopColor="#6366f1" offset="0%" />
              <stop stopColor="#8b5cf6" offset="100%" />
            </linearGradient>
          </svg>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-heading font-semibold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50"
      >
        How can I help you today?
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-ai-text-muted text-center mb-12 max-w-xl"
      >
        Experience the next generation of AI conversation. Powered by Gemini 3.1 Pro.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="flex items-center gap-4 p-4 rounded-2xl bg-ai-panel/30 border border-ai-border/40 hover:bg-white/5 hover:border-ai-primary/30 transition-all text-left group"
          >
            <div className="p-3 rounded-xl bg-ai-panel group-hover:bg-ai-primary/10 transition-colors">
              <suggestion.icon className="w-5 h-5 text-ai-primary" />
            </div>
            <span className="text-sm font-medium text-ai-text-muted group-hover:text-ai-text transition-colors">
              {suggestion.text}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
