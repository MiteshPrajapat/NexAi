import React, { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';
import WelcomeScreen from '../UI/WelcomeScreen';
import { motion, AnimatePresence } from 'framer-motion';

const ChatContainer = () => {
  const { messages, isLoading, appMode } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar relative pb-32">
      {messages.length === 0 ? (
        <div className="h-full pt-10">
          <WelcomeScreen />
        </div>
      ) : (
        <div className={`${appMode === 'side-by-side' ? 'max-w-[95%] xl:max-w-7xl' : 'max-w-4xl'} mx-auto p-4 md:p-8 space-y-6 pt-10 transition-all duration-300`}>
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 w-full justify-start"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-tr from-ai-primary to-ai-secondary flex items-center justify-center mt-1">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
              <div className="bg-ai-panel/60 border border-ai-border/50 text-ai-text rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-ai-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-ai-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-ai-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} className="h-4" />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
