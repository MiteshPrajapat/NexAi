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
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleModelChange = (modelId) => {
    if (modelId !== 'gemini') {
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
    setSelectedModel(modelId);
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
    selectedModel,
    handleModelChange,
    isSidebarOpen,
    toggleSidebar,
    addMessage,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
