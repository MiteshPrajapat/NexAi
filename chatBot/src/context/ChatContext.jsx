import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appMode, setAppMode] = useState('direct'); // 'direct' or 'side-by-side'
  const [selectedModels, setSelectedModels] = useState({
    direct: 'gemini',
    left: 'gemini',
    right: 'groq'
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleModelChange = (panel, modelId) => {
    if (modelId !== 'gemini' && modelId !== 'groq' && modelId !== 'openrouter') {
      toast('Support Coming Soon', {
        icon: '🚀',
        style: {
          borderRadius: '10px',
          background: '#1e293b',
          color: '#fff',
        },
      });
      return;
    }
    setSelectedModels(prev => ({
      ...prev,
      [panel]: modelId
    }));
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const value = {
    messages,
    isLoading,
    setIsLoading,
    appMode,
    setAppMode,
    selectedModels,
    handleModelChange,
    isSidebarOpen,
    toggleSidebar,
    addMessage,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
