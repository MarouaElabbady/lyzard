import { useState } from 'react';
import { useSSEStream } from '../hooks/useSSEStream';
import { ChatPanel } from '../components/Builder/ChatPanel';
import { PreviewIframe } from '../components/Builder/PreviewIframe';
import { Smartphone, Tablet, Monitor, Wand2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Builder() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const { isStreaming, streamedCode, startStream } = useSSEStream();

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);

    // Get live Supabase session token (SSE can't set headers, so pass as query param)
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token ?? '';
    const base = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
    const apiUrl = `${base}/v1/generate?prompt=${encodeURIComponent(content)}&token=${encodeURIComponent(token)}`;

    startStream(apiUrl, {
      onDone: () => {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Here is your landing page design!' }]);
      },
      onError: () => {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Oops! Something went wrong with the generation.' }]);
      }
    });
  };

  return (
    <div className="h-screen flex bg-neutral-950 font-sans">
      {/* Sidebar Chat */}
      <ChatPanel 
        messages={messages} 
        onSendMessage={handleSendMessage} 
        isStreaming={isStreaming} 
      />

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col h-full bg-neutral-900 shadow-inner">
        {/* Device Toolbar */}
        <div className="h-14 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDevice('mobile')}
              className={`p-2 rounded-lg transition-colors ${device === 'mobile' ? 'bg-neutral-800 text-emerald-400 border border-neutral-700' : 'text-neutral-500 hover:text-neutral-300'}`}
              title="Mobile View"
            >
              <Smartphone className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDevice('tablet')}
              className={`p-2 rounded-lg transition-colors ${device === 'tablet' ? 'bg-neutral-800 text-emerald-400 border border-neutral-700' : 'text-neutral-500 hover:text-neutral-300'}`}
              title="Tablet View"
            >
              <Tablet className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDevice('desktop')}
              className={`p-2 rounded-lg transition-colors ${device === 'desktop' ? 'bg-neutral-800 text-emerald-400 border border-neutral-700' : 'text-neutral-500 hover:text-neutral-300'}`}
              title="Desktop View"
            >
              <Monitor className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="h-4 w-px bg-neutral-800 mx-2" />
             <div className="text-xs text-neutral-500 font-medium uppercase tracking-widest flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-emerald-500/50" />
                <span>Auto-Saving</span>
             </div>
          </div>
        </div>

        {/* Live Preview */}
        <PreviewIframe code={streamedCode} device={device} />
      </div>
    </div>
  );
}
