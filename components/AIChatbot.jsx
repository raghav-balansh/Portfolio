import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X, Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useData } from '../contexts/DataContext.jsx';

const AIChatbot = () => {
  const { projects, skills, blogs, certificates, stats, resumeLink } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatSessionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize Chat Session
  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            setError("API Key is missing.");
            setMessages([{
                role: 'model',
                text: "⚠️ System Error: API Key missing."
            }]);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: apiKey });
            
            const contextData = {
                projects,
                skills,
                blogs,
                certificates,
                stats,
                resumeLink
            };

            chatSessionRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: `You are "Nexus", Raghav Maheshwari's Portfolio Assistant. Be concise, professional, and witty. Knowledge: ${JSON.stringify(contextData)}.`,
                }
            });
            
            setMessages([{
                role: 'model', 
                text: "Online. I am Nexus. Ask me about Raghav's projects or skills."
            }]);
        } catch (err) {
            console.error("Initialization Error:", err);
            setError("Failed to initialize AI");
        }
    }
  }, [isOpen, projects, skills, blogs, certificates, stats, resumeLink]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!chatSessionRef.current) {
        setMessages(prev => [...prev, { role: 'model', text: "⚠️ Error: Chat not active." }]);
        return;
    }

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
        const response = await chatSessionRef.current.sendMessage({ message: userMsg });
        setMessages(prev => [...prev, { role: 'model', text: response.text || "No response generated." }]);
    } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev => [...prev, { role: 'model', text: "⚠️ Connection Failed." }]);
    } finally {
        setIsLoading(false);
    }
  };

  // Chat UI Content
  const chatContent = (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-sans">
      <style>{`
        @keyframes border-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .chat-wrapper {
            position: relative;
            border-radius: 24px;
            box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5);
        }

        .animated-border {
            position: absolute;
            inset: -2px;
            background: linear-gradient(
                60deg,
                #050505,
                #3b82f6,
                #8b5cf6,
                #06b6d4,
                #050505
            );
            background-size: 300% 300%;
            animation: border-flow 6s ease infinite;
            border-radius: 26px;
            z-index: -1;
            opacity: 0.8;
        }

        .neon-inner {
            position: relative;
            background: #0a0a0a;
            border-radius: 24px;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            z-index: 10;
            overflow: hidden;
        }
      `}</style>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[320px] h-[450px] chat-wrapper animate-in slide-in-from-bottom-5 fade-in duration-300 origin-bottom-right">
            {/* The Animated Border Layer */}
            <div className="animated-border"></div>
            
            <div className="neon-inner">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0f0f0f]">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                           <Sparkles className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-white tracking-wide">NEXUS AI</h3>
                            <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${error ? 'bg-red-500' : 'bg-green-400 shadow-[0_0_5px_#4ade80]'}`}></span>
                                <p className="text-[10px] text-slate-400 font-medium">
                                    {error ? 'System Error' : 'Systems Nominal'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-[#1f1f1f] text-slate-200 border border-white/5 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-[#1f1f1f] px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                                <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                                <span className="text-[10px] text-slate-400 font-mono tracking-widest">PROCESSING</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-white/10 shrink-0 bg-[#0a0a0a]">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={!!error}
                            placeholder="Type a command..."
                            className="w-full pl-4 pr-10 py-3 bg-[#111] border border-white/10 rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder-slate-600 transition-all shadow-inner"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading || !input.trim() || !!error}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-white transition-colors disabled:opacity-50 hover:bg-white/5 rounded-lg"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all active:scale-90 flex items-center justify-center border border-white/10 z-[100]"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
      </button>
    </div>
  );

  // Use React Portal to render the chat directly into the body
  return ReactDOM.createPortal(chatContent, document.body);
};

export default AIChatbot;