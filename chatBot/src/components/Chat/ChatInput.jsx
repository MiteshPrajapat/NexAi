import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import ModelSelector from './ModelSelector';
import { generateChatResponse } from '../../services/gemini';
import { useChat } from '../../context/ChatContext';
import toast from 'react-hot-toast';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const { messages, addMessage, isLoading, setIsLoading, selectedModel } = useChat();

  const handleInput = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (selectedModel !== 'gemini') {
      toast.error('Selected model is not supported yet.');
      return;
    }

    const userMessage = { role: 'user', content: input.trim() };
    addMessage(userMessage);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setIsLoading(true);
    try {
      // Pass the previous messages as history to gemini service
      const response = await generateChatResponse(userMessage.content, messages);
      addMessage({ role: 'ai', content: response });
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to generate response', {
        style: {
          borderRadius: '10px',
          background: '#1e293b',
          color: '#fff',
        },
      });
      addMessage({ role: 'ai', content: 'Sorry, I encountered an error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:px-8">
      <div className="relative glass-panel rounded-3xl p-2 pb-3 transition-shadow focus-within:ring-1 focus-within:ring-ai-primary/50">
        <div className="flex px-3 pb-2 pt-1">
          <ModelSelector />
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-end gap-2 px-2">
          <button type="button" className="p-3 text-ai-text-muted hover:text-ai-text rounded-xl hover:bg-white/5 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Send a message to NexAI..."
            className="flex-1 max-h-[200px] bg-transparent border-0 resize-none outline-none text-ai-text placeholder:text-ai-text-muted/50 py-3 custom-scrollbar"
            rows={1}
          />

          {input.trim() ? (
            <button
              type="submit"
              disabled={isLoading}
              className="p-3 bg-gradient-to-tr from-ai-primary to-ai-secondary text-white rounded-xl shadow-lg shadow-ai-primary/20 hover:shadow-ai-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-1"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button type="button" className="p-3 text-ai-text-muted hover:text-ai-text rounded-xl hover:bg-white/5 transition-colors mb-1">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
      <div className="text-center mt-3 text-xs text-ai-text-muted/50">
        NexAI can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
};

export default ChatInput;
