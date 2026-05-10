import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sparkles, Zap, Box, BrainCircuit, Lightbulb, Hexagon } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

const models = [
  { id: 'gemini', name: 'Gemini 3.1 Pro', icon: Sparkles, color: 'text-blue-400' },
  { id: 'groq', name: 'Groq (Llama 3)', icon: Hexagon, color: 'text-fuchsia-400' },
  { id: 'chatgpt', name: 'ChatGPT-4', icon: Zap, color: 'text-green-400' },
  { id: 'claude', name: 'Claude 3 Opus', icon: BrainCircuit, color: 'text-orange-400' },
  { id: 'deepseek', name: 'DeepSeek V2', icon: Box, color: 'text-indigo-400' },
  { id: 'perplexity', name: 'Perplexity', icon: Lightbulb, color: 'text-cyan-400' },
];

const ModelSelector = ({ panel = 'direct' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedModels, handleModelChange } = useChat();
  const dropdownRef = useRef(null);

  const selectedModelId = selectedModels[panel];
  const activeModel = models.find(m => m.id === selectedModelId) || models[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    handleModelChange(panel, id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ai-panel border border-ai-border/50 hover:bg-white/5 transition-colors text-sm font-medium text-ai-text"
      >
        <activeModel.icon className={`w-4 h-4 ${activeModel.color}`} />
        <span className="hidden sm:inline">{activeModel.name}</span>
        <ChevronDown className={`w-4 h-4 text-ai-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute ${panel === 'right' ? 'right-0' : 'left-0'} bottom-full mb-2 w-48 rounded-xl bg-ai-panel/95 backdrop-blur-xl border border-ai-border shadow-2xl overflow-hidden z-50`}
          >
            <div className="p-1">
              {models.map((model) => (
                <button
                  type="button"
                  key={model.id}
                  onClick={() => handleSelect(model.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                    selectedModelId === model.id ? 'bg-white/10 text-ai-text font-medium' : 'text-ai-text-muted hover:bg-white/5 hover:text-ai-text'
                  }`}
                >
                  <model.icon className={`w-4 h-4 ${model.color}`} />
                  {model.name}
                  {model.id !== 'gemini' && model.id !== 'groq' && (
                    <span className="ml-auto text-[10px] uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-ai-text-muted/70">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelSelector;
