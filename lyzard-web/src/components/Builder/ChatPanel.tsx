import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image, Wand2, Sparkles, Loader2, User, Bot, Paperclip, Layers, Terminal } from 'lucide-react';
import { Button } from '../ui';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  onSendMessage: (message: string) => void;
  isStreaming: boolean;
  messages: Message[];
}

export function ChatPanel({ onSendMessage, isStreaming, messages }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isStreaming) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-carbon-0/40 relative">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="px-8 py-6 border-b border-border-sharp flex items-center justify-between bg-carbon-1/20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-primary/10 border border-amber-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,184,0,0.1)]">
            <Sparkles size={18} className="text-amber-primary" />
          </div>
          <div>
            <h2 className="text-xs font-black text-white tracking-[0.2em] uppercase font-heading">Design Oracle</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 bg-emerald-state rounded-full shadow-[0_0_8px_#10b981] animate-pulse" />
              <span className="text-[9px] text-white-50 font-black uppercase tracking-widest leading-none">Resonating Active</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
           <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl">
              <Terminal size={16} className="text-white-50 hover:text-white" />
           </Button>
           <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl">
              <Layers size={16} className="text-white-50 hover:text-white" />
           </Button>
        </div>
      </div>

      {/* ── Messages Area ──────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-8 space-y-10 py-10 scrollbar-none">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col items-center justify-center text-center px-4"
            >
              <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/5 flex items-center justify-center mb-8 shadow-2xl relative group">
                 <div className="absolute inset-0 bg-amber-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <Wand2 size={40} className="text-white-10 transition-colors group-hover:text-amber-primary" />
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-white mb-3 tracking-tight">Crystallize Your Vision.</h3>
              <p className="text-sm text-white-50 leading-relaxed max-w-[280px] font-medium">
                Describe the essence of your landing page. The loom of logic awaits your command.
              </p>
            </motion.div>
          )}

          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10, x: m.role === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-center gap-3 mb-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-lg ${
                  m.role === 'user' 
                    ? 'bg-carbon-1 border-white/10' 
                    : 'bg-amber-primary/10 border-amber-primary/20'
                }`}>
                  {m.role === 'user' ? <User size={14} className="text-white-50" /> : <Sparkles size={14} className="text-amber-primary" />}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white-10">
                  {m.role === 'user' ? 'Visionary' : 'Oracle v4'}
                </span>
              </div>

              <div className={`max-w-[95%] rounded-2xl px-6 py-4 text-[13px] leading-relaxed relative ${
                m.role === 'user' 
                  ? 'bg-white text-carbon-0 font-bold shadow-[0_10px_30px_rgba(255,255,255,0.05)] rounded-tr-sm' 
                  : 'bg-carbon-1 text-white border border-border-sharp shadow-2xl rounded-tl-sm'
              }`}>
                {m.content}
              </div>
            </motion.div>
          ))}

          {isStreaming && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-amber-primary/10 border border-amber-primary/20 flex items-center justify-center">
                  <Bot size={14} className="text-amber-primary" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white-10 text-amber-primary">Oracle Processing</span>
              </div>
              <div className="bg-carbon-1 border border-border-sharp px-6 py-5 rounded-2xl rounded-tl-sm shadow-2xl flex items-center gap-5">
                <div className="relative">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-primary" />
                  <div className="absolute inset-0 blur-lg bg-amber-primary/30 animate-pulse" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-white uppercase tracking-widest leading-none">Crystallizing Vision</p>
                  <p className="text-[10px] text-white-50 mt-1.5 font-bold leading-none">Assembling geometric logic</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ──────────────────────────────────────────────────────── */}
      <div className="p-8 border-t border-border-sharp bg-carbon-1/30 relative">
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="glass-surface-elevated border border-white/5 focus-within:border-white/10 transition-all duration-700 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Manifest your next vision..."
              className="w-full bg-transparent text-white text-sm p-6 focus:outline-none placeholder-white-10 resize-none font-medium leading-relaxed"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isStreaming}
            />
            
            <div className="flex items-center justify-between px-6 pb-5 mt-1">
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg hover:bg-white/5">
                  <Paperclip size={16} className="text-white-10" />
                </Button>
                <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg hover:bg-white/5">
                  <Image size={16} className="text-white-10" />
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isStreaming || !input.trim()}
                variant="primary"
                size="sm"
                className="h-10 px-8 rounded-full font-black text-[10px] uppercase tracking-widest group shadow-[0_0_20px_rgba(255,184,0,0.1)]"
              >
                <span>Initialize</span>
                <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Preset Suggestions */}
          <div className="mt-5 flex gap-2.5 overflow-x-auto scrollbar-none pb-2">
            {[
              { id: 'hero', text: 'Celestial Header', icon: <Sparkles size={10}/> },
              { id: 'grid', text: 'Ritual Layout', icon: <Layers size={10}/> },
              { id: 'auth', text: 'Secure Gates', icon: <Terminal size={10}/> }
            ].map((opt) => (
              <button 
                key={opt.id}
                type="button"
                onClick={() => setInput(prev => prev + (prev ? ' ' : '') + opt.text)}
                className="whitespace-nowrap px-4 py-2 rounded-xl bg-carbon-1/50 border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-white-50 hover:text-white hover:border-white/10 transition-all shadow-lg"
              >
                <span className="flex items-center gap-2">{opt.icon} {opt.text}</span>
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
