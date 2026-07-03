import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { 
  ShieldCheck, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Lock, 
  Megaphone, 
  Cpu, 
  Layers, 
  Award,
  Zap,
  Globe,
  Navigation,
  Smartphone,
  Accessibility,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Mail,
  Info,
  Terminal,
  HelpCircle,
  Code,
  Book,
  ListFilter
} from 'lucide-react';

const tabs = [
  { id: 'privacy', title: 'Privacy Policy', icon: Lock },
  { id: 'terms', title: 'Terms of Service', icon: FileText },
  { id: 'cookies', title: 'Cookie Policy', icon: ShieldCheck },
  { id: 'disclaimer', title: 'AI Disclaimer', icon: AlertTriangle },
  { id: 'content-policy', title: 'Content Policy', icon: CheckCircle },
  { id: 'search-essentials', title: 'Search Essentials', icon: Globe },
  { id: 'about-contact', title: 'About & Contact', icon: Info },
  { id: 'resources', title: 'Resources & Guides', icon: Book }
];

const articles = [
  {
    id: 'ai-coding',
    title: 'How to Use AI for Coding: React, APIs, and Best Practices',
    category: 'Programming',
    readTime: '5 min read',
    content: `Artificial Intelligence has transformed software engineering from simple syntax autocomplete to collaborative pair programming. To get the most out of tools like Nex AI Bot when coding React applications, you should structure your workflow around modularity, security, and verification.
    
    First, write highly descriptive prompts. Instead of asking "build a React table," prompt the AI with context: "Build a responsive React data table component using Tailwind CSS, supporting custom search filters and pagination. Keep states local and ensure TypeScript interfaces are defined."
    
    Second, use AI for incremental refactoring. Rather than feeding it a 1000-line file, paste small, self-contained helper functions and ask: "Refactor this function to reduce cyclomatic complexity and handle edge cases where variables are undefined."
    
    Finally, always audit security. AI models are trained on public repositories, which means they can occasionally generate code with deprecated dependencies or security weaknesses. Always review data validation, sanitization inputs, and CORS policies.`
  },
  {
    id: 'ai-vs-chatgpt',
    title: 'AI Models Comparison: Nex AI Bot vs Standard ChatGPT',
    category: 'AI Analysis',
    readTime: '6 min read',
    content: `While general-purpose chatbots are useful, specialized developer assistants like Nex AI Bot offer distinct architectural differences and performance tweaks. 
    
    Unlike standard chatbots that use generic models, Nex AI Bot integrates API access to multiple advanced reasoning backends (including Gemini 3.1 Pro and DeepSeek). This lets you toggle between models depending on the problem structure. For instance, code synthesis is better handled by models trained on source code tokens, whereas creative copywriting benefits from high temperature parameters in conversational models.
    
    Additionally, Nex AI Bot provides specialized developer views, such as "Side by Side" mode. This allows developers to run comparative queries simultaneously, saving tab-switching time and letting programmers run A/B testing on generated layouts or logic scripts side by side.`
  },
  {
    id: 'best-prompts',
    title: 'Best AI Prompts: Creative and Technical Prompt Templates',
    category: 'Prompt Engineering',
    readTime: '4 min read',
    content: `The quality of an AI output is a direct function of its prompt. Good prompt templates utilize three key pillars: Role, Context, and Constraints.
    
    Here is a template for technical debugging:
    "Role: Senior Fullstack Engineer.
    Context: I am receiving a 500 error when querying a PostgreSQL database in my Node.js backend. The error occurs when users attempt to write special characters.
    Constraints: Suggest three possible causes, outline the exact code fix for sanitizing inputs, and do not use external libraries."
    
    For writing tasks, try:
    "Role: Professional Copywriter.
    Context: Rewrite this landing page header to increase sign-ups. Target audience: SaaS developers.
    Constraints: Keep it under 100 characters, use active voice, and output exactly 5 variations."`
  },
  {
    id: 'python-tutorials',
    title: 'Python Tutorials: Understanding Decorators, Async, and Generators',
    category: 'Python',
    readTime: '7 min read',
    content: `Python is a powerful language, but mastering intermediate concepts like decorators, asynchronous loops, and generator functions is essential for building scalable applications.
    
    Decorators allow you to modify the behavior of a function or class. They are wrapper functions that execute code before and after the target function without altering its source code, commonly used for logging, auth checks, and performance timing.
    
    Asynchronous programming using 'asyncio' enables cooperative multitasking. It lets your program execute database or network queries in the background without blocking the main CPU execution thread, which is vital for building responsive, high-throughput APIs.
    
    Generators use 'yield' instead of 'return' to return lazy iterators. They generate items on the fly, consuming minimal memory, making them perfect for parsing huge files or database chunks.`
  },
  {
    id: 'fastapi-guides',
    title: 'FastAPI Guides: Building High-Performance REST APIs',
    category: 'Python APIs',
    readTime: '5 min read',
    content: `FastAPI has quickly become the framework of choice for Python developers due to its speed, typing safety, and automatic documentation.
    
    FastAPI relies on Starlette for web handling and Pydantic for data validation. This makes it as fast as Node.js and Go. By declaring Pydantic schemas, FastAPI validates incoming request bodies before they reach your database handlers, automatically throwing clean 422 errors if data types do not match.
    
    Moreover, it generates interactive OpenAPI documentation out-of-the-box at '/docs'. This lets frontend developers verify endpoint schemas, parameter requirements, and response types immediately, accelerating team integrations.`
  },
  {
    id: 'aws-tutorials',
    title: 'AWS Tutorials: Deploying Containerized Apps with ECS and Fargate',
    category: 'Cloud Devops',
    readTime: '8 min read',
    content: `Deploying containerized React or Node.js web applications to AWS doesn't require managing complex EC2 servers. AWS Fargate provides a serverless execution engine for containers, operating alongside Amazon ECS (Elastic Container Service).
    
    To start, build a Docker image for your application and push it to AWS ECR (Elastic Container Registry).
    
    Next, define an ECS Task Definition. Specify CPU and memory limits, environment variables, and the ECR image path.
    
    Finally, launch an ECS Service using the Fargate launch type. Fargate automatically handles provisioning, clustering, scaling, and load balancer attachment. This ensures your app scales under heavy user traffic without requiring manual operating system patching.`
  },
  {
    id: 'ai-productivity',
    title: 'AI Productivity Tips: Maximizing Coding and Writing Workflows',
    category: 'Productivity',
    readTime: '4 min read',
    content: `Using an AI assistant productively requires treating it as a specialized trainee rather than an omniscient engine.
    
    1. Keep a Scratch File: Keep a scratchpad alongside your editor. Store your common prompt templates and copy/paste blocks of code to avoid typing the same contextual parameters.
    2. Feed It Stack Traces: When debugging, do not explain the error. Paste the exact terminal output and traceback. AI is highly effective at identifying missing modules or null variable errors.
    3. Document Code Instantly: Paste undocumented code and request JSDoc, Docstrings, or README usage sections. This saves hours of manual writing.`
  }
];

const PolicyPage = () => {
  const { policyTab, setPolicyTab } = useChat();
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-ai-bg text-ai-text min-h-[calc(100vh-64px)] pb-12">
      {/* Hero Header */}
      <section className="relative py-10 md:py-16 px-4 md:px-8 border-b border-ai-border/40 overflow-hidden bg-gradient-to-b from-ai-panel/30 to-transparent">
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
          <div className="absolute top-[20%] left-[10%] w-[30%] h-[50%] rounded-full bg-ai-primary/20 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[50%] rounded-full bg-ai-secondary/20 blur-[120px]" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ai-primary/10 border border-ai-primary/20 text-xs font-semibold text-ai-primary mb-3 tracking-wide uppercase">
            Trust & Quality Center
          </span>
          <h1 className="font-heading font-bold text-2xl md:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Nex AI Bot <span className="text-gradient">— Policies, Safety & Resources</span>
          </h1>
          <p className="max-w-2xl mx-auto text-ai-text-muted text-xs md:text-sm leading-relaxed">
            Welcome to our Trust & Information Center. Here we document our compliance with Google Search Essentials, AdSense policies, terms of service, and share helpful development tutorials.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Tabs Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit z-10">
            <div className="glass-panel rounded-2xl p-4 border border-ai-border/40">
              <h2 className="font-heading font-semibold text-white text-xs uppercase tracking-wider mb-4 pb-2 border-b border-ai-border/30 flex items-center gap-2">
                <ListFilter className="w-3.5 h-3.5 text-ai-primary" /> Navigation
              </h2>
              
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 custom-scrollbar snap-x">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = policyTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setPolicyTab(tab.id); setSelectedArticle(null); }}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left text-xs md:text-sm font-medium transition-all duration-200 shrink-0 snap-start border ${
                        isActive
                          ? 'bg-ai-primary/20 border-ai-primary/40 text-white shadow-sm'
                          : 'bg-transparent border-transparent text-ai-text-muted hover:text-ai-text hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-ai-primary' : 'text-ai-text-muted'}`} />
                      <span>{tab.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* AdSense Zone */}
            <div className="hidden lg:block mt-6 glass-panel rounded-2xl p-4 border border-ai-border/30 bg-ai-panel/30 text-center">
              <span className="text-[10px] tracking-wider uppercase text-ai-text-muted/40 font-semibold block mb-2">Advertisement</span>
              <div className="h-48 rounded-xl border border-dashed border-ai-border/50 bg-ai-bg/50 flex flex-col items-center justify-center p-3">
                <Megaphone className="w-6 h-6 text-ai-text-muted/30 mb-2" />
                <p className="text-[11px] text-ai-text-muted/50 font-medium">Responsive Ad Spot</p>
                <p className="text-[9px] text-ai-text-muted/40 mt-1 max-w-[150px] leading-normal">Positioned separate from interaction elements.</p>
              </div>
            </div>
          </aside>

          {/* Tab Contents */}
          <main className="lg:col-span-3">
            
            {/* Tab 1: Privacy Policy */}
            {policyTab === 'privacy' && (
              <section className="glass-panel rounded-2xl p-6 md:p-8 border border-ai-border/40 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Lock className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-white">Privacy Policy</h2>
                </div>
                <p className="text-xs text-ai-text-muted/65 italic">Last Updated: July 3, 2026</p>
                
                <p className="text-ai-text-muted leading-relaxed">
                  At Nex AI Bot, reachable from this interface, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and how it is securely processed.
                </p>

                <h3 className="font-semibold text-white text-base">Information We Collect</h3>
                <p className="text-ai-text-muted leading-relaxed">
                  If you contact us directly or interact with the AI model, we may receive information about you such as your IP address, email details, and the text prompt submitted. We use standard web metrics and cookies to track page states and remember layout configurations.
                </p>

                <h3 className="font-semibold text-white text-base">GDPR & CCPA Rights</h3>
                <p className="text-ai-text-muted leading-relaxed">
                  We fully respect your data protection rights. You have the right to request access, correction, erasure, or portability of any personal conversation traces. Because we do not log data permanently on server disks, we can purge local session caches instantly upon logging out or hitting "New Chat".
                </p>
              </section>
            )}

            {/* Tab 2: Terms of Service */}
            {policyTab === 'terms' && (
              <section className="glass-panel rounded-2xl p-6 md:p-8 border border-ai-border/40 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <FileText className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-white">Terms of Service</h2>
                </div>
                <p className="text-xs text-ai-text-muted/65 italic">Last Updated: July 3, 2026</p>

                <p className="text-ai-text-muted leading-relaxed">
                  By accessing and using Nex AI Bot, you agree to comply with and be bound by the following terms and regulations. If you disagree, please stop using the service immediately.
                </p>

                <h3 className="font-semibold text-white text-base">Usage Restrictions</h3>
                <p className="text-ai-text-muted leading-relaxed">
                  Users agree to use the chatbot responsibly. You must not use our AI endpoints to generate malware, promote illegal materials, scrape contents automatically in high volume, bypass system safety guards, or flood the API channels.
                </p>

                <h3 className="font-semibold text-white text-base">Disclaimer of Warranty</h3>
                <p className="text-ai-text-muted leading-relaxed">
                  Nex AI Bot is provided "as is" and "as available". We provide no warranties regarding accuracy, model availability, or uninterrupted uptime. Any outputs generated are used at your own risk.
                </p>
              </section>
            )}

            {/* Tab 3: Cookie Policy */}
            {policyTab === 'cookies' && (
              <section className="glass-panel rounded-2xl p-6 md:p-8 border border-ai-border/40 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-white">Cookie & Local Storage Policy</h2>
                </div>
                <p className="text-xs text-ai-text-muted/65 italic">Last Updated: July 3, 2026</p>

                <p className="text-ai-text-muted leading-relaxed">
                  Nex AI Bot utilizes standard cookies and local storage tokens to deliver a personalized, responsive layout.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-ai-bg/40 border border-ai-border/30">
                    <h4 className="font-semibold text-white text-sm mb-1">Session Cookies</h4>
                    <p className="text-xs text-ai-text-muted">Used to authenticate sessions and temporarily store conversational states between messages.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-ai-bg/40 border border-ai-border/30">
                    <h4 className="font-semibold text-white text-sm mb-1">Preference Cookies</h4>
                    <p className="text-xs text-ai-text-muted">Stores UI selections such as dark mode toggle and active model configurations (e.g. Gemini/Groq).</p>
                  </div>
                </div>

                <p className="text-xs text-ai-text-muted">
                  Note: You can configure your browser to reject all cookies, but doing so may limit your capability to use specific interactive parts of the chatbot.
                </p>
              </section>
            )}

            {/* Tab 4: AI Disclaimer */}
            {policyTab === 'disclaimer' && (
              <section className="glass-panel rounded-2xl p-6 md:p-8 border border-ai-border/40 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-white">Safety & AI Disclaimer</h2>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm text-ai-text-muted leading-relaxed space-y-3">
                  <p>
                    <strong>Artificial Intelligence Limitations:</strong> All outputs provided by Nex AI Bot are synthesized statistically. The system can occasionally hallucinate, offering incorrect source code, outdated information, or misleading logic.
                  </p>
                  <p>
                    <strong>Verify Critical Fields:</strong> Do not rely on Nex AI Bot for critical decision-making. Always consult a certified professional for medical diagnosis, legal counsel, or financial and investment parameters.
                  </p>
                </div>

                <h3 className="font-semibold text-white text-base">Model Versioning</h3>
                <p className="text-ai-text-muted leading-relaxed">
                  Our system calls current api layers such as Gemini 3.1 Pro. The weights are updated by model providers and we continuously run temperature checks to increase logical reliability.
                </p>
              </section>
            )}

            {/* Tab 5: Content Policy */}
            {policyTab === 'content-policy' && (
              <section className="glass-panel rounded-2xl p-6 md:p-8 border border-ai-border/40 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-violet-500/10 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-violet-400" />
                  </div>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-white">Content Quality Standards</h2>
                </div>

                <p className="text-ai-text-muted leading-relaxed">
                  We enforce rigid quality controls on all materials published on this website and generated by our chatbot to protect users and comply with Google AdSense program guidelines.
                </p>

                <h3 className="font-semibold text-white text-base">AdSense Placement Compliance</h3>
                <ul className="space-y-2.5 text-xs text-ai-text-muted">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>No ads are ever placed inside active chat logs or conversation bubbles.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>Advertisements are styled differently and separated clearly from navigation and model control triggers.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>We never use pop-ups, pop-unders, or overlay modals containing dynamic script links to serve advertising code.</span>
                  </li>
                </ul>
              </section>
            )}

            {/* Tab 6: Search Essentials */}
            {policyTab === 'search-essentials' && (
              <section className="glass-panel rounded-2xl p-6 md:p-8 border border-ai-border/40 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sky-500/10 rounded-xl">
                    <Globe className="w-6 h-6 text-sky-400" />
                  </div>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-white">Google Search Essentials Compliance</h2>
                </div>

                <p className="text-ai-text-muted leading-relaxed">
                  We track and comply with Google's web developer guidelines to make sure our interface is index-friendly, highly accessible, secure, and performs excellently.
                </p>

                {/* Checklist table */}
                <div className="overflow-x-auto my-6 border border-ai-border/30 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-ai-panel border-b border-ai-border/40">
                        <th className="p-3 font-semibold text-white">Requirement</th>
                        <th className="p-3 font-semibold text-white">Status</th>
                        <th className="p-3 font-semibold text-white">Implementation Detail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ai-border/30">
                      <tr>
                        <td className="p-3 font-medium text-white">HTTPS Security</td>
                        <td className="p-3 text-emerald-400 font-semibold">✅ Enabled</td>
                        <td className="p-3 text-ai-text-muted">Production domains enforce SSL (HTTPS).</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">Responsive Design</td>
                        <td className="p-3 text-emerald-400 font-semibold">✅ Active</td>
                        <td className="p-3 text-ai-text-muted">Tested on screens from 375px to 4K ultra-wide.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">Page Speed / Core Vitals</td>
                        <td className="p-3 text-emerald-400 font-semibold">✅ Optimized</td>
                        <td className="p-3 text-ai-text-muted">Vite bundle is minified and compressed.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">Sitemap (sitemap.xml)</td>
                        <td className="p-3 text-emerald-400 font-semibold">✅ Integrated</td>
                        <td className="p-3 text-ai-text-muted">XML index submitted to Search Console.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">robots.txt</td>
                        <td className="p-3 text-emerald-400 font-semibold">✅ Created</td>
                        <td className="p-3 text-ai-text-muted">Configured crawler rules properly.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">Structured Schema</td>
                        <td className="p-3 text-emerald-400 font-semibold">✅ Active</td>
                        <td className="p-3 text-ai-text-muted">Breadcrumbs and Articles structured data injected.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">Original Content Blog</td>
                        <td className="p-3 text-emerald-400 font-semibold">⭐ Added</td>
                        <td className="p-3 text-ai-text-muted">7 detailed dev articles added in Resources tab.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-white text-base">robots.txt Rules</h3>
                  <pre className="p-4 bg-ai-bg/60 border border-ai-border/40 rounded-xl text-[11px] font-mono text-cyan-400 overflow-x-auto">
                    {`User-agent: *
Allow: /
Sitemap: https://nexaibot.com/sitemap.xml`}
                  </pre>

                  <h3 className="font-semibold text-white text-base">Structured Schema (JSON-LD Organization Example)</h3>
                  <pre className="p-4 bg-ai-bg/60 border border-ai-border/40 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto">
                    {`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nex AI Bot",
  "url": "https://nexaibot.com",
  "description": "Free AI chat assistant for coding, writing, research, and productivity."
}`}
                  </pre>
                </div>
              </section>
            )}

            {/* Tab 7: About & Contact */}
            {policyTab === 'about-contact' && (
              <section className="glass-panel rounded-2xl p-6 md:p-8 border border-ai-border/40 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-fuchsia-500/10 rounded-xl">
                    <Info className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-white">About Us & Contact</h2>
                </div>

                <p className="text-ai-text-muted leading-relaxed">
                  Nex AI Bot was created by a dedicated team of engineers who want to make advanced AI workflows intuitive, fast, and accessible to everyone. We believe that artificial intelligence tools should be user-first and highly informative.
                </p>

                <h3 className="font-semibold text-white text-base">Our Vision</h3>
                <p className="text-ai-text-muted leading-relaxed">
                  To provide web-based utilities that save hours of programming, draft quality copy, simplify math formulas, and help clarify general questions instantly.
                </p>

                <h3 className="font-semibold text-white text-base">Get in Touch</h3>
                <p className="text-ai-text-muted leading-relaxed">
                  Do you have questions, feedback, or need support? Send us an email directly, and our developer team will reply within 24–48 hours.
                </p>

                <div className="p-4 rounded-xl bg-ai-bg/40 border border-ai-border/30 flex items-center gap-3 w-fit">
                  <Mail className="w-5 h-5 text-ai-primary" />
                  <div>
                    <span className="text-xs text-ai-text-muted block">Support Email</span>
                    <a href="mailto:support@nexaibot.com" className="text-sm font-semibold text-white hover:text-ai-primary transition-colors">support@nexaibot.com</a>
                  </div>
                </div>
              </section>
            )}

            {/* Tab 8: Resources & Blog */}
            {policyTab === 'resources' && (
              <section className="space-y-6">
                
                {selectedArticle ? (
                  /* Single Article View */
                  <div className="glass-panel rounded-2xl p-6 md:p-8 border border-ai-border/40 space-y-6">
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="text-xs text-ai-primary hover:text-white transition-colors flex items-center gap-1.5 mb-2 font-semibold"
                    >
                      ← Back to Guides & Articles
                    </button>
                    
                    <div className="space-y-3">
                      <span className="px-2.5 py-1 rounded bg-ai-primary/10 border border-ai-primary/20 text-[10px] uppercase font-bold tracking-wider text-ai-primary">
                        {selectedArticle.category}
                      </span>
                      <h2 className="font-heading font-bold text-2xl md:text-3xl text-white leading-tight">
                        {selectedArticle.title}
                      </h2>
                      <p className="text-xs text-ai-text-muted">{selectedArticle.readTime}</p>
                    </div>

                    <hr className="border-ai-border/30" />

                    <div className="text-ai-text-muted leading-relaxed text-sm md:text-base space-y-4 whitespace-pre-line">
                      {selectedArticle.content}
                    </div>
                  </div>
                ) : (
                  /* Blog Index View */
                  <div className="space-y-6">
                    <div className="glass-panel rounded-2xl p-6 border border-ai-border/40">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-ai-primary/10 rounded-lg text-ai-primary">
                          <Book className="w-5 h-5" />
                        </div>
                        <h2 className="font-heading font-bold text-lg text-white">Resources & Learning Center</h2>
                      </div>
                      <p className="text-xs text-ai-text-muted leading-relaxed">
                        Read original developer articles, prompt templates, and tutorials crafted by the Nex AI Bot team to help boost your productivity.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {articles.map((article) => (
                        <div
                          key={article.id}
                          onClick={() => setSelectedArticle(article)}
                          className="glass-panel rounded-xl p-5 border border-ai-border/30 hover:border-ai-primary/30 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div className="space-y-2">
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-ai-border/40 text-[9px] uppercase tracking-wider text-ai-text-muted font-bold">
                              {article.category}
                            </span>
                            <h3 className="font-semibold text-white group-hover:text-ai-primary transition-colors text-sm md:text-base leading-snug">
                              {article.title}
                            </h3>
                            <p className="text-xs text-ai-text-muted/70 line-clamp-3 leading-relaxed">
                              {article.content}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-ai-border/20">
                            <span className="text-[10px] text-ai-text-muted">{article.readTime}</span>
                            <span className="text-[10px] text-ai-primary group-hover:text-white font-semibold flex items-center gap-1 transition-colors">
                              Read Guide <ArrowUpRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-ai-border/40 bg-ai-panel/50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-tr from-ai-primary to-ai-secondary rounded-xl">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-semibold text-lg text-white">Nex AI Bot</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs md:text-sm text-ai-text-muted">
            <button onClick={() => { setPolicyTab('privacy'); setSelectedArticle(null); }} className="hover:text-ai-primary transition-colors">Privacy Policy</button>
            <button onClick={() => { setPolicyTab('terms'); setSelectedArticle(null); }} className="hover:text-ai-primary transition-colors">Terms of Service</button>
            <button onClick={() => { setPolicyTab('cookies'); setSelectedArticle(null); }} className="hover:text-ai-primary transition-colors">Cookie Policy</button>
            <button onClick={() => { setPolicyTab('disclaimer'); setSelectedArticle(null); }} className="hover:text-ai-primary transition-colors">AI Disclaimer</button>
            <button onClick={() => { setPolicyTab('content-policy'); setSelectedArticle(null); }} className="hover:text-ai-primary transition-colors">Content Policy</button>
            <button onClick={() => { setPolicyTab('resources'); setSelectedArticle(null); }} className="hover:text-ai-primary transition-colors">Resources & Blog</button>
          </div>
          
          <div className="text-xs text-ai-text-muted/65 text-center md:text-right">
            Copyright © 2026 Nex AI Bot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PolicyPage;
