import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Tablet, Smartphone, ExternalLink, RotateCcw, Globe, ChevronLeft, ChevronRight, Lock, Maximize2 } from 'lucide-react';
import { Button } from '../ui';

interface PreviewIframeProps {
  code: string;
  device: 'mobile' | 'tablet' | 'desktop';
  onDeviceChange: (device: 'mobile' | 'tablet' | 'desktop') => void;
}

export function PreviewIframe({ code, device, onDeviceChange }: PreviewIframeProps) {
  const [key, setKey] = useState(0);

  const deviceWidths = {
    mobile: 'max-w-[393px]',
    tablet: 'max-w-[834px]',
    desktop: 'max-w-full'
  };

  const reload = () => setKey(prev => prev + 1);

  // Helper to remove markdown code blocks and extract/scaffold HTML
  const processCode = (input: string) => {
    if (!input) return '';

    let htmlContent = input.trim();

    // 1. Try to extract content from markdown blocks (including unclosed ones)
    const blockRegex = /```(?:html|css|javascript|js)?[ \t]*\n?([\s\S]*?)(?:```|$)/gi;
    const matches = Array.from(input.matchAll(blockRegex));
    
    if (matches.length > 0) {
      const likelyHtml = matches.find(m => m[1].includes('<') || m[0].toLowerCase().includes('html'));
      htmlContent = (likelyHtml ? likelyHtml[1] : matches[matches.length - 1][1]).trim();
    }

    htmlContent = htmlContent.replace(/```$/, '').trim();

    if (htmlContent.toLowerCase().includes('<html') || htmlContent.toLowerCase().includes('<!doctype')) {
      return htmlContent;
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; background-color: #ffffff; color: #000000; overflow-x: hidden; }
        * { box-sizing: border-box; }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`.trim();
  };

  const processedCode = processCode(code);

  return (
    <div className="flex-1 bg-carbon-0 flex flex-col relative overflow-hidden group">
      {/* ── Background Dotted Grid ────────────────────────────────────────── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      {/* ── Browser Mockup Header ─────────────────────────────────────────── */}
      <div className="h-14 bg-carbon-1/80 backdrop-blur-2xl flex items-center justify-between px-6 z-20 border-b border-border-sharp">
        <div className="flex items-center gap-6">
          {/* Traffic Lights */}
          <div className="flex gap-1.5 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
            <div className="w-2.5 h-2.5 rounded-full bg-ruby-danger/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-primary/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-state/50" />
          </div>

          <div className="h-4 w-px bg-white/5 hidden sm:block" />

          {/* Navigation Controls */}
          <div className="flex items-center gap-1 text-white-50">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg hover:bg-white/5"><ChevronLeft size={14} /></Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg hover:bg-white/5"><ChevronRight size={14} /></Button>
            <Button variant="ghost" size="sm" onClick={reload} className="w-8 h-8 p-0 rounded-lg hover:bg-white/5"><RotateCcw size={14} /></Button>
          </div>

          {/* Pseudo-URL Bar */}
          <div className="w-[320px] lg:w-[480px] h-8 bg-carbon-0 border border-white/5 rounded-xl flex items-center px-4 gap-3 group/url shadow-inner">
            <Lock className="w-3 h-3 text-white-10 group-hover/url:text-amber-primary transition-colors" />
            <span className="text-[10px] text-white-10 font-black uppercase tracking-widest truncate group-hover/url:text-white transition-colors">
              vision.lyzard.ai/crystallized-render
            </span>
          </div>
        </div>

        {/* ── Device Switcher ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1 glass-surface p-1 rounded-xl border border-white/5 shadow-xl scale-90 lg:scale-100">
          {[
            { id: 'desktop', icon: <Monitor size={14} /> },
            { id: 'tablet', icon: <Tablet size={14} /> },
            { id: 'mobile', icon: <Smartphone size={14} /> }
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => onDeviceChange(d.id as any)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative ${
                device === d.id 
                  ? 'text-carbon-0 bg-white shadow-2xl' 
                  : 'text-white-50 hover:text-white hover:bg-white/5'
              }`}
            >
              {d.icon}
              {device === d.id && (
                <motion.div 
                  layoutId="active-device"
                  className="absolute inset-0 bg-white rounded-lg -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Actions ────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-xl group/ext">
              <ExternalLink size={14} className="text-white-50 group-hover/ext:text-white transition-colors" />
           </Button>
           <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-xl group/max">
              <Maximize2 size={14} className="text-white-50 group-hover/max:text-white transition-colors" />
           </Button>
        </div>
      </div>

      {/* ── Preview Canvas ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex justify-center p-8 lg:p-12 overflow-auto bg-carbon-0 relative">
        <motion.div 
          layout
          className={`w-full ${deviceWidths[device]} h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 
                      ${device !== 'desktop' 
                        ? 'shadow-[0_60px_120px_rgba(0,0,0,0.8)] border-[12px] border-carbon-1 rounded-[3.5rem]' 
                        : 'shadow-2xl rounded-2xl overflow-hidden'} 
                      bg-white relative`}
        >
          {/* Device Hardware Details (Bezel accents) */}
          {device !== 'desktop' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-carbon-1 rounded-b-3xl z-50 flex items-center justify-center">
               <div className="w-12 h-1 bg-white/5 rounded-full" />
            </div>
          )}

          <iframe
            key={key}
            srcDoc={processedCode}
            title="Design Canvas"
            className="w-full h-full border-none pointer-events-auto"
            sandbox="allow-scripts"
          />

          {!processedCode && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white-10 bg-carbon-0 z-40">
               <div className="w-20 h-20 rounded-[2rem] bg-carbon-1 flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-amber-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Globe size={32} className="opacity-10 text-amber-primary group-hover:opacity-100 transition-all duration-700" />
               </div>
               <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 animate-pulse">Synchronizing Frequencies</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
