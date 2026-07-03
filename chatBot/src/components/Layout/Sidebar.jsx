import { MessageSquarePlus, Settings, Moon, Sun, PanelLeftClose, Sparkles, ShieldCheck } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { clearChat, isSidebarOpen, toggleSidebar, currentView, setCurrentView, navigateToPolicy } = useChat();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.div
        className={`fixed md:static inset-y-0 left-0 z-30 bg-ai-panel border-r border-ai-border flex flex-col transition-all duration-300 ease-in-out overflow-hidden h-full ${
          isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 md:w-0 md:border-r-0'
        }`}
      >
        <div className="w-72 flex flex-col h-full min-h-screen md:min-h-0">
        <div className="p-4 flex items-center justify-between">
          <div 
            onClick={() => { setCurrentView('chat'); if (isSidebarOpen) toggleSidebar(); }}
            className="flex items-center gap-2 text-ai-text cursor-pointer hover:opacity-85 transition-opacity"
          >
            <div className="p-2 bg-gradient-to-tr from-ai-primary to-ai-secondary rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-semibold text-xl tracking-wide">NexAI</span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden p-2 text-ai-text-muted hover:text-ai-text rounded-lg">
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-2 flex-1">
          <button
            onClick={() => { clearChat(); setCurrentView('chat'); if (isSidebarOpen) toggleSidebar(); }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-ai-primary/10 hover:bg-ai-primary/20 text-ai-primary rounded-xl transition-all duration-200 border border-ai-primary/20 hover:border-ai-primary/40 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            <MessageSquarePlus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
          
          <div className="mt-8">
            <p className="text-xs font-semibold text-ai-text-muted uppercase tracking-wider mb-4 px-2">No History</p>
            <div className="px-2 text-sm text-ai-text-muted/60 italic">
              Chat history is disabled for privacy. Messages are not saved.
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-ai-border flex flex-col gap-2">
          <button 
            onClick={() => { navigateToPolicy('privacy'); if (isSidebarOpen) toggleSidebar(); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentView === 'policy' 
                ? 'bg-ai-primary/20 text-ai-text border border-ai-primary/30' 
                : 'text-ai-text-muted hover:text-ai-text hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="font-medium">Policy & Quality</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-ai-text-muted hover:text-ai-text hover:bg-white/5 rounded-xl transition-colors">
            <Moon className="w-5 h-5" />
            <span className="font-medium">Dark Mode</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-ai-text-muted hover:text-ai-text hover:bg-white/5 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
