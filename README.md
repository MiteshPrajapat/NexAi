# 🤖 Nex AI Bot — Next-Generation Multi-Model AI Assistant

<p align="center">
  <strong>An ultra-fast, intelligent, and multi-model AI chat platform featuring side-by-side model comparison, rich markdown rendering, and a sleek futuristic UI.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.3-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 🌟 Overview

**Nex AI Bot** is a modern, responsive web application designed for power users, developers, researchers, and creators. It allows users to seamlessly converse with multiple state-of-the-art AI models and run **Side-by-Side Model Comparisons** to evaluate reasoning, speed, and output quality across providers.

---

## ✨ Key Features

- **⚡ Multi-Model & Multi-Provider Support**:
  - **Google Gemini**: Powered by `@google/generative-ai` (`gemini-flash-latest`).
  - **Groq**: Ultra-fast inference with Llama models (`llama-3.3-70b-versatile`).
  - **OpenRouter**: Access to DeepSeek and open-source models (`deepseek/deepseek-chat`).
- **⚔️ Dual Chat Modes**:
  - **Direct Mode**: Classic conversational AI chat with history retention.
  - **Side-by-Side Comparison Mode**: Prompt two different LLMs simultaneously and contrast their responses in real time.
- **🎨 Futuristic Glassmorphic UI**:
  - Neon gradients, smooth ambient backdrop animations, and modern dark-mode aesthetic.
  - Fluid micro-animations powered by **Framer Motion**.
- **💻 Rich Markdown & Code Highlighting**:
  - Syntax highlighting for multiple programming languages using `react-syntax-highlighter`.
  - Full Markdown formatting support with tables, lists, quotes, and copy-to-clipboard functionality.
- **📱 Fully Responsive**:
  - Optimized for mobile, tablet, and desktop screens with collapsible sidebars and touch-friendly controls.
- **🛡️ Built-in Privacy & Policy Portal**:
  - Integrated privacy policy, terms of service, and compliance views.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI library with modern concurrent rendering |
| **[Vite](https://vitejs.dev/)** | Next-generation fast frontend tooling and dev server |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first styling with custom glow effects and gradients |
| **[Framer Motion](https://www.framer.com/motion/)** | Production-ready motion and UI animations |
| **[Lucide React](https://lucide.dev/)** | Clean, modern icon set |
| **[React Hot Toast](https://react-hot-toast.com/)** | Lightweight, animated toast notifications |
| **[React Markdown & Syntax Highlighter](https://github.com/remarkjs/react-markdown)** | Code snippet highlighting & formatted markdown |

---

## 📂 Project Structure

```
NexAi/
├── chatBot/                     # Main frontend application
│   ├── public/                  # Public assets (favicons, icons)
│   ├── src/
│   │   ├── assets/              # Static assets & images
│   │   ├── components/
│   │   │   ├── Chat/            # ChatContainer, ChatInput, MessageBubble, ModelSelector
│   │   │   ├── Layout/          # Navbar, Sidebar
│   │   │   └── UI/              # PolicyPage, WelcomeScreen, AdSense
│   │   ├── context/             # ChatContext for global state management
│   │   ├── services/            # API integration (Gemini, Groq, OpenRouter)
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styling & Tailwind directives
│   ├── .env.example             # Template for API keys
│   ├── package.json             # Project dependencies & scripts
│   ├── tailwind.config.js       # Tailwind CSS custom themes and animations
│   └── vite.config.js           # Vite build configuration
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version `18.x` or higher) and `npm` installed:

```bash
node -v
npm -v
```

### 2. Clone the Repository

```bash
git clone https://github.com/MiteshPrajapat/NexAi.git
cd NexAi/chatBot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `chatBot` directory based on `.env.example`:

```bash
cp .env.example .env
```

Open `.env` and add your API keys:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> **🔑 How to get API keys:**
> - **Google Gemini**: [Google AI Studio](https://aistudio.google.com/)
> - **Groq**: [Groq Console](https://console.groq.com/)
> - **OpenRouter**: [OpenRouter Keys](https://openrouter.ai/keys)

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

Inside the `chatBot` directory, you can run:

- `npm run dev` — Starts the local Vite development server with HMR.
- `npm run build` — Compiles and bundles the application for production into `dist/`.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs ESLint to check for code quality and syntax issues.

---

## 🔒 Security & Privacy

- Client-side environment variables prefixed with `VITE_` are bundled at build time. For production environments, ensure appropriate rate limiting and domain whitelisting are configured on your API provider dashboards.
- Nex AI Bot does not store private user conversations on external databases by default.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
