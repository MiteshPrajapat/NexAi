import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import ChatContainer from './components/Chat/ChatContainer';
import ChatInput from './components/Chat/ChatInput';

function App() {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-ai-bg text-ai-text font-sans overflow-hidden">
        {/* Background Effects */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-ai-primary/20 blur-[120px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-ai-secondary/20 blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-ai-primary/10 blur-[150px] animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <Sidebar />

        <div className="flex-1 flex flex-col relative h-full">
          <Navbar />
          
          <main className="flex-1 relative flex flex-col h-full">
            <ChatContainer />
            
            {/* Sticky Input Area */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ai-bg via-ai-bg/90 to-transparent pt-10">
              <ChatInput />
            </div>
          </main>
        </div>

        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </div>
    </ChatProvider>
  );
}

export default App;
