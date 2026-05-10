import React from 'react';
import { PanelLeft, Sparkles } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const Navbar = () => {
  const { toggleSidebar } = useChat();

  return (
    <nav className="md:hidden sticky top-0 z-10 bg-ai-panel/80 backdrop-blur-md border-b border-ai-border px-4 py-3 flex items-center justify-between">
      <button onClick={toggleSidebar} className="p-2 text-ai-text-muted hover:text-ai-text rounded-lg hover:bg-white/5 transition-colors">
        <PanelLeft className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-ai-primary" />
        <span className="font-heading font-semibold text-lg">NexAI</span>
      </div>
      
      <div className="w-10"></div> {/* Spacer for centering */}
    </nav>
  );
};

export default Navbar;
