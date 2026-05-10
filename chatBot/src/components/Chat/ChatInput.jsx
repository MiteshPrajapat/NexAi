import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import ModelSelector from './ModelSelector';
import { generateChatResponse } from '../../services/gemini';
import { generateGroqResponse } from '../../services/groq';
import { useChat } from '../../context/ChatContext';
import toast from 'react-hot-toast';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const { messages, addMessage, isLoading, setIsLoading, appMode, selectedModels } = useChat();

  const handleInput = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const callModel = async (modelId, prompt) => {
    if (modelId === 'gemini') {
      return await generateChatResponse(prompt, messages);
    } else if (modelId === 'groq') {
      return await generateGroqResponse(prompt, messages);
    } else {
      throw new Error('Selected model is not supported yet.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    addMessage(userMessage);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setIsLoading(true);

    try {
      if (appMode === 'direct') {
        const response = await callModel(selectedModels.direct, userMessage.content);
        addMessage({ role: 'ai', content: response, model: selectedModels.direct });
      } else {
        const [leftRes, rightRes] = await Promise.allSettled([
          callModel(selectedModels.left, userMessage.content),
          callModel(selectedModels.right, userMessage.content)
        ]);

        addMessage({
          role: 'ai',
          isSideBySide: true,
          left: {
            model: selectedModels.left,
            content: leftRes.status === 'fulfilled' ? leftRes.value : `Error: ${leftRes.reason.message || 'Failed'}`
          },
          right: {
            model: selectedModels.right,
            content: rightRes.status === 'fulfilled' ? rightRes.value : `Error: ${rightRes.reason.message || 'Failed'}`
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to generate response', {
        style: {
          borderRadius: '10px',
          background: '#1e293b',
          color: '#fff',
        },
      });
      if (appMode === 'direct') {
        addMessage({ role: 'ai', content: 'Sorry, I encountered an error. Please try again.', model: selectedModels.direct });
      }
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
          {appMode === 'direct' ? (
            <ModelSelector panel="direct" />
          ) : (
            <div className="flex w-full gap-4">
              <div className="flex-1 flex justify-start pl-2">
                <ModelSelector panel="left" />
              </div>
              <div className="flex-1 flex justify-end pr-2">
                <ModelSelector panel="right" />
              </div>
            </div>
          )}
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
