import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isStreaming) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="w-[400px] bg-neutral-900 border-r border-neutral-800 flex flex-col h-full">
      <div className="p-4 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Sparkles className="w-5 h-5" />
          <span>Lyzard AI Assistant</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
              m.role === 'user' 
                ? 'bg-emerald-500 text-neutral-950 font-medium' 
                : 'bg-neutral-800 text-neutral-200 border border-neutral-700'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isStreaming && (
          <div className="flex justify-start">
            <div className="bg-neutral-800 text-neutral-400 p-4 rounded-2xl border border-neutral-700 flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
              <span>Generating your masterpiece...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-800 bg-neutral-950">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a prompt for your landing page..."
            className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-emerald-500 transition-colors"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-400 hover:text-emerald-300 disabled:text-neutral-600 disabled:hover:text-neutral-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
