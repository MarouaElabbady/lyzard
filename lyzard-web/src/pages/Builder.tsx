import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSSEStream } from '../hooks/useSSEStream';
import { ChatPanel } from '../components/Builder/ChatPanel';
import { PreviewIframe } from '../components/Builder/PreviewIframe';
import { BuilderTopBar } from '../components/Builder/BuilderTopBar';
import { BuilderSidebar } from '../components/Builder/BuilderSidebar';
import { supabase } from '../lib/supabase';
import { getProject, saveProjectVersion, getProjectVersions } from '../api/projects';
import { getCredits } from '../api/credits';
import { exportProject } from '../api/export';
import type { ProjectWithVersions } from '../api/projects';
import { Loader2, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type SaveState = 'idle' | 'saving' | 'saved';

export default function Builder() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');

  const [project, setProject] = useState<ProjectWithVersions | null>(null);
  const [loadingProject, setLoadingProject] = useState(!!projectId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [initialCode, setInitialCode] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  const { isStreaming, streamedCode, startStream } = useSSEStream();

  // ── Load project, versions & credits ─────────────────────────────────────
  useEffect(() => {
    if (!projectId) return;

    setLoadingProject(true);
    Promise.all([
      getProject(projectId),
      getProjectVersions(projectId),
      getCredits()
    ])
      .then(([p, vRes, cRes]) => {
        setProject(p);
        setUserCredits(cRes.credits);
        if (vRes.data.length > 0 && vRes.data[0].content) {
          setInitialCode(vRes.data[0].content);
        }
      })
      .catch((err) => {
        console.error('Failed to load initial data:', err);
      })
      .finally(() => setLoadingProject(false));
  }, [projectId]);

  // ── Auto-save logic ───────────────────────────────────────────────────────
  const autoSave = useCallback(async (code: string, prompt: string) => {
    if (!projectId || !code) return;
    setSaveState('saving');
    try {
      await saveProjectVersion(projectId, code, prompt);
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 3000);
      
      const cRes = await getCredits();
      setUserCredits(cRes.credits);
    } catch (err) {
      console.error('Auto-save failed:', err);
      setSaveState('idle');
    }
  }, [projectId]);

  // ── Send message & start generation ────────────────────────────────────────
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);

    if (userCredits <= 0) {
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: "Energy low. You've depleted your current fragment cycle. Please align with more credits to continue construction." 
      }]);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token ?? '';
    const base = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
    
    const apiUrl = `${base}/v1/generate?prompt=${encodeURIComponent(content)}&token=${encodeURIComponent(token)}${projectId ? `&project_id=${projectId}` : ''}`;

    startStream(apiUrl, {
      onDone: (fullCode) => {
        setMessages((prev) => [...prev, { 
          role: 'assistant', 
          content: "Crystallization complete. The design has been successfully materialized." 
        }]);
        autoSave(fullCode, content);
      },
      onError: () => {
        setMessages((prev) => [...prev, { 
          role: 'assistant', 
          content: "Frequency interference detected. The spectral signature was disrupted. Please attempt re-alignment." 
        }]);
      },
    });
  };

  const handleLaunch = async () => {
    if (!projectId || !project) return;
    setIsExporting(true);
    try {
      await exportProject(projectId, project.name);
    } catch (err) {
      console.error('Launch failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleManualSave = () => {
    autoSave(streamedCode || initialCode, 'Manual Snapshot');
  };

  const displayCode = streamedCode || initialCode;

  if (loadingProject) {
    return (
      <div className="h-screen flex items-center justify-center bg-carbon-0">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-amber-primary animate-spin" />
          <div className="absolute inset-0 blur-3xl bg-amber-primary/10 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-carbon-0 text-white selection:bg-amber-primary/30 selection:text-white overflow-hidden font-sans">
      <BuilderTopBar 
        projectName={project?.name ?? 'The Silent Vision'}
        isSaving={saveState === 'saving'}
        isDeploying={isExporting}
        credits={userCredits}
        onDeploy={handleLaunch}
        onSave={handleManualSave}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Subtle Background Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <BuilderSidebar />
        
        <main className="flex flex-1 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[440px] border-r border-border-sharp glass-surface-elevated z-10"
          >
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              isStreaming={isStreaming}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-carbon-0/50 relative overflow-hidden"
          >
            <PreviewIframe 
              code={displayCode} 
              device={device}
              onDeviceChange={setDevice}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
