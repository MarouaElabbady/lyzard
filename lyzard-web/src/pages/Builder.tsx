import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSSEStream } from '../hooks/useSSEStream';
import { ChatPanel } from '../components/Builder/ChatPanel';
import { PreviewIframe } from '../components/Builder/PreviewIframe';
import { Smartphone, Tablet, Monitor, Wand2, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getProject, saveProjectVersion } from '../api/projects';
import type { ProjectWithVersions } from '../api/projects';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type SaveState = 'idle' | 'saving' | 'saved';

export default function Builder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectId = searchParams.get('project');

  const [project, setProject] = useState<ProjectWithVersions | null>(null);
  const [loadingProject, setLoadingProject] = useState(!!projectId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [initialCode, setInitialCode] = useState('');

  const { isStreaming, streamedCode, startStream } = useSSEStream();

  // ── Load project & latest version ─────────────────────────────────────────
  useEffect(() => {
    if (!projectId) return;

    setLoadingProject(true);
    getProject(projectId)
      .then((p) => {
        setProject(p);
        // Load the latest version's code into the preview if it exists
        const latestVersion = p.versions?.[0];
        if (latestVersion?.content) {
          setInitialCode(latestVersion.content);
        }
      })
      .catch((err) => {
        console.error('Failed to load project:', err);
      })
      .finally(() => setLoadingProject(false));
  }, [projectId]);

  // ── Auto-save after stream finishes ────────────────────────────────────────
  const autoSave = useCallback(async (code: string, prompt: string) => {
    if (!projectId || !code) return;
    setSaveState('saving');
    try {
      await saveProjectVersion(projectId, code, prompt);
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 3000);
    } catch (err) {
      console.error('Auto-save failed:', err);
      setSaveState('idle');
    }
  }, [projectId]);

  // ── Send message & start generation ────────────────────────────────────────
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentPrompt(content);

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token ?? '';
    const base = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
    const apiUrl = `${base}/v1/generate?prompt=${encodeURIComponent(content)}&token=${encodeURIComponent(token)}`;

    startStream(apiUrl, {
      onDone: (fullCode) => {
        setMessages((prev) => [...prev, { role: 'assistant', content: '✅ Generation complete! Your page is ready.' }]);
        // Auto-save the generated code as a new version
        autoSave(fullCode, content);
      },
      onError: () => {
        setMessages((prev) => [...prev, { role: 'assistant', content: '❌ Generation failed. Please try again.' }]);
      },
    });
  };

  // ── The live code to display — streamed output takes priority ─────────────
  const displayCode = streamedCode || initialCode;

  if (loadingProject) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-neutral-950 font-sans">
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <div className="h-12 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-4 shrink-0">
        {/* Left: back + project name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-white">
              {project?.name ?? 'New Project'}
            </span>
            {project && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                project.status === 'active'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-neutral-700 text-neutral-400'
              }`}>
                {project.status === 'active' ? 'Active' : 'Draft'}
              </span>
            )}
          </div>
        </div>

        {/* Center: device switcher */}
        <div className="flex items-center gap-1">
          {([['mobile', Smartphone], ['tablet', Tablet], ['desktop', Monitor]] as const).map(([d, Icon]) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`p-2 rounded-lg transition-colors ${device === d ? 'bg-neutral-800 text-purple-400 border border-neutral-700' : 'text-neutral-500 hover:text-neutral-300'}`}
              title={`${d.charAt(0).toUpperCase() + d.slice(1)} View`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Right: save indicator */}
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          {saveState === 'saving' && (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span className="text-purple-400">Saving…</span>
            </>
          )}
          {saveState === 'saved' && (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Saved</span>
            </>
          )}
          {saveState === 'idle' && !projectId && (
            <span className="text-neutral-600 italic">No project selected</span>
          )}
          {saveState === 'idle' && projectId && (
            <span className="text-neutral-600">Auto-save enabled</span>
          )}
        </div>
      </div>

      {/* ── Main layout: Chat + Preview ────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          isStreaming={isStreaming}
        />
        <PreviewIframe code={displayCode} device={device} />
      </div>
    </div>
  );
}
