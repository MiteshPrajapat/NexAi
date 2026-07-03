import React, { useState, useRef, useEffect } from 'react';
import { PanelLeft, Sparkles, ChevronDown, MessageSquare, SplitSquareHorizontal } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const Navbar = () => {
  const { toggleSidebar, appMode, setAppMode, currentView, setCurrentView } = useChat();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-10 bg-ai-panel/80 backdrop-blur-md border-b border-ai-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 text-ai-text-muted hover:text-ai-text rounded-lg hover:bg-white/5 transition-colors">
          <PanelLeft className="w-6 h-6" />
        </button>
        
        <div 
          onClick={() => setCurrentView('chat')}
          className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <Sparkles className="w-5 h-5 text-ai-primary" />
          <span className="font-heading font-semibold text-lg">NexAI</span>
        </div>
      </div>

      {/* Mode Selector */}
      {currentView === 'chat' ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-ai-bg border border-ai-border/50 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-ai-primary/50"
          >
            {appMode === 'direct' ? (
              <>
                <MessageSquare className="w-4 h-4 text-ai-primary" />
                <span className="text-sm font-medium">Direct Chat</span>
              </>
            ) : (
              <>
                <SplitSquareHorizontal className="w-4 h-4 text-ai-secondary" />
                <span className="text-sm font-medium">Side by Side</span>
              </>
            )}
            <ChevronDown className={`w-4 h-4 text-ai-text-muted ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-ai-panel border border-ai-border rounded-xl shadow-xl overflow-hidden z-20">
              <button
                onClick={() => { setAppMode('direct'); setIsDropdownOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${appMode === 'direct' ? 'bg-ai-primary/10 text-ai-primary' : 'text-ai-text hover:bg-white/5'}`}
              >
                <MessageSquare className="w-4 h-4" />
                Direct Chat
              </button>
              <button
                onClick={() => { setAppMode('side-by-side'); setIsDropdownOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${appMode === 'side-by-side' ? 'bg-ai-secondary/10 text-ai-secondary' : 'text-ai-text hover:bg-white/5'}`}
              >
                <SplitSquareHorizontal className="w-4 h-4" />
                Side by Side
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-ai-bg border border-ai-border/50 rounded-xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-gradient">Policy & Standards</span>
        </div>
      )}

      <div className="w-10 md:hidden"></div> {/* Spacer for centering on mobile */}
    </nav>
  );
};

export default Navbar;
