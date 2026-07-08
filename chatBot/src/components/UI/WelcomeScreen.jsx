import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdSense from './AdSense';
import { 
  Sparkles, 
  Code, 
  PenTool, 
  Lightbulb, 
  Search, 
  BookOpen, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';

const suggestions = [
  { icon: Code, text: 'Write a React component for a data table' },
  { icon: PenTool, text: 'Draft an email to a client about a delay' },
  { icon: Lightbulb, text: 'Brainstorm ideas for a sci-fi novel' },
  { icon: Search, text: 'Explain quantum computing simply' },
];

const capabilities = [
  {
    icon: Code,
    title: 'Coding & Debugging',
    desc: 'Generate clean code in Python, JavaScript, HTML/CSS, SQL, and more. Explain complex logic and optimize algorithms.'
  },
  {
    icon: PenTool,
    title: 'Writing & Summarization',
    desc: 'Create high-quality essays, professional emails, copy, and outline documents. Summarize dense PDFs and long articles.'
  },
  {
    icon: Search,
    title: 'Research & Explanations',
    desc: 'Break down complex topics into clear terms. Help with history, scientific formulas, business strategies, and math.'
  },
  {
    icon: Lightbulb,
    title: 'Productivity & Planning',
    desc: 'Brainstorm creative concepts, plan project frameworks, organize content strategies, and optimize your schedule.'
  }
];

const promptTips = [
  'Be Specific: Provide context, target length, and structural format.',
  'Define a Role: e.g. "Act as a senior DevOps engineer and solve this issue."',
  'Provide Examples: Show the exact output style you want to receive.',
  'Iterate: Ask follow-up questions to refine, fix bugs, or expand explanations.'
];

const faqs = [
  {
    q: 'What is Nex AI Bot?',
    a: 'Nex AI Bot is a state-of-the-art AI assistant designed to help with programming, content creation, education, and general research. It utilizes advanced large language models to deliver accurate, helpful responses.'
  },
  {
    q: 'How does it handle my privacy and data?',
    a: 'We prioritize your privacy. Conversation history is stored locally in your active session and is not logged permanently on our servers or sold to third-party brokers. Prompts are handled securely using SSL encryption.'
  },
  {
    q: 'Why does it say answers can contain mistakes?',
    a: 'Large language models process text statistically. This means they can occasionally generate incorrect answers or "hallucinations". We strongly recommend verifying critical code, financial calculations, or medical and legal advice.'
  },
  {
    q: 'How do I write effective prompts?',
    a: 'Clear instruction leads to better results. State your request directly, specify the format (e.g. JSON list, code block, executive summary), and give background context where applicable.'
  }
];

const WelcomeScreen = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-full max-w-4xl mx-auto px-4 md:px-8 w-full py-10 space-y-12">
      {/* Brand & Title */}
      <div className="text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-20 h-20 mx-auto mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-ai-primary to-ai-secondary rounded-3xl blur-xl opacity-40 animate-pulse-slow"></div>
          <div className="relative w-full h-full bg-ai-panel border border-ai-border/40 rounded-3xl flex items-center justify-center shadow-xl">
            <Sparkles className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70" style={{ stroke: "url(#gradient)" }} />
            <svg width="0" height="0">
              <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop stopColor="#6366f1" offset="0%" />
                <stop stopColor="#8b5cf6" offset="100%" />
              </linearGradient>
            </svg>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 mb-3"
        >
          How can I help you today?
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-ai-text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed"
        >
          Welcome to Nex AI Bot. Experience rapid AI assistance for coding, research, writing, and problem-solving.
        </motion.p>
      </div>

      {/* Grid: Quick Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full"
      >
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="flex items-center gap-3.5 p-3.5 rounded-xl bg-ai-panel/30 border border-ai-border/30 hover:bg-white/5 hover:border-ai-primary/20 transition-all text-left group"
          >
            <div className="p-2.5 rounded-lg bg-ai-panel border border-ai-border/45 group-hover:bg-ai-primary/10 transition-colors">
              <suggestion.icon className="w-4 h-4 text-ai-primary" />
            </div>
            <span className="text-xs md:text-sm font-medium text-ai-text-muted group-hover:text-ai-text transition-colors">
              {suggestion.text}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Grid: Supported Tasks & Use Cases */}
      <div className="w-full space-y-5">
        <div className="flex items-center gap-2 border-b border-ai-border/30 pb-2">
          <BookOpen className="w-4 h-4 text-ai-primary" />
          <h2 className="text-xs uppercase tracking-wider font-semibold text-white">Supported Capabilities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-ai-panel/20 border border-ai-border/25 flex gap-3 hover:border-ai-primary/15 transition-colors">
                <div className="p-2 bg-ai-primary/5 rounded-lg h-fit border border-ai-primary/10 text-ai-primary">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">{cap.title}</h3>
                  <p className="text-xs text-ai-text-muted leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column: Prompt Tips & Safety Disclaimer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Prompt Tips */}
        <div className="p-5 rounded-xl bg-ai-panel/30 border border-ai-border/25 space-y-4">
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-ai-secondary" /> Tips for Effective Prompts
          </h3>
          <ul className="space-y-2.5">
            {promptTips.map((tip, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-ai-text-muted leading-relaxed">
                <CheckCircle className="w-3.5 h-3.5 text-ai-secondary shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety Disclaimer */}
        <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/15 space-y-3.5 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <AlertTriangle className="w-4.5 h-4.5" /> Safety & AI Disclaimer
          </div>
          <p className="text-xs text-ai-text-muted leading-relaxed">
            Nex AI Bot provides algorithmically synthesized outputs. Please verify important code implementations, equations, or legal and medical insights. Our platform is not a replacement for qualified advice.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="w-full space-y-5">
        <div className="flex items-center gap-2 border-b border-ai-border/30 pb-2">
          <QuestionIcon className="w-4 h-4 text-ai-primary" />
          <h2 className="text-xs uppercase tracking-wider font-semibold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-xl border border-ai-border/30 bg-ai-panel/10 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="font-medium text-white text-xs md:text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-ai-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-ai-primary' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 pt-0 border-t border-ai-border/20 text-xs text-ai-text-muted leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* AdSense Zone */}
      <div className="w-full glass-panel rounded-2xl p-4 border border-ai-border/30 bg-ai-panel/30 text-center">
        <span className="text-[10px] tracking-wider uppercase text-ai-text-muted/40 font-semibold block mb-2">Advertisement</span>
        <div className="overflow-hidden flex justify-center items-center">
          <AdSense />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
