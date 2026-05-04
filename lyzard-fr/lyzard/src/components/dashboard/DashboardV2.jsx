import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Search, 
  BookOpen, 
  Grid, 
  Star, 
  User, 
  ChevronDown, 
  Plus, 
  Mic,
  MicOff,
  CheckCheck, 
  ArrowUp, 
  Gift, 
  Zap, 
  Bell,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
  Settings,
  Mail,
  Shield,
  CreditCard,
  Play,
  Pause,
  MoreVertical,
  Trash2,
  History,
  MessageSquarePlus,
  Code,
  Eye,
  X,
  Terminal,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Logo from "../Logo";
import { cn } from "../../lib/utils";
import { 
  AnimatePresence, 
  motion 
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiProjects } from '../../lib/api';
import { PaymentModal } from '../ui/PaymentModal';

const NavItem = ({ icon: Icon, label, shortcut, active = false, isSidebarOpen = true, theme = "dark", color = "blue", onClick }) => {
  const colorMap = {
    blue:   { base: "text-blue-400",    hover: "group-hover:text-blue-400" },
    cyan:   { base: "text-cyan-400",    hover: "group-hover:text-cyan-400" },
    purple: { base: "text-purple-400",  hover: "group-hover:text-purple-400" },
    pink:   { base: "text-pink-400",    hover: "group-hover:text-pink-400" },
    amber:  { base: "text-amber-400",   hover: "group-hover:text-amber-400" },
    rose:   { base: "text-rose-400",    hover: "group-hover:text-rose-400" },
    mauve:  { base: "text-[#A78BFA]",   hover: "group-hover:text-[#A78BFA]" },
    violet: { base: "text-[#8B5CF6]",   hover: "group-hover:text-[#8B5CF6]" },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div 
      onClick={onClick}
      className={cn(
      "flex items-center rounded-lg cursor-pointer transition-all duration-200 group px-3 py-2",
      active 
        ? (theme === "dark" ? "bg-white/10 text-white" : "bg-black/5 text-black font-bold") 
        : (theme === "dark" ? "text-white/60 hover:bg-white/5 hover:text-white" : "text-black/60 hover:bg-black/5 hover:text-black"),
      !isSidebarOpen && "justify-center px-0 h-10 w-10 mx-auto"
    )}>
      <div className="flex items-center gap-3">
        <Icon size={18} className={cn(
          "shrink-0 transition-colors duration-200",
          active ? colors.base : (theme === "dark" ? "text-white/30" : "text-slate-400"),
          colors.hover
        )} />
        {isSidebarOpen && label && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
      </div>
      {isSidebarOpen && shortcut && (
        <span className={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter shrink-0 ml-auto",
          theme === "dark" ? "text-white/20 bg-white/5" : "text-black/20 bg-black/5"
        )}>
          {shortcut}
        </span>
      )}
    </div>
  );
};

export const DashboardV2 = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState(null);
  const [isYearly, setIsYearly] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [promptValue, setPromptValue] = useState("");
  const [activeSessionId, setActiveSessionId] = useState('default');
  const [starredSessions, setStarredSessions] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showArtifact, setShowArtifact] = useState(false);
  const [artifactData, setArtifactData] = useState({ type: 'code', content: '', title: '' });
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState([
    {
      id: 'default',
      title: 'New Discussion',
      messages: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [notifications, setNotifications] = useState([
    { id: 1, icon: '🚀', title: 'Lyzard AI is live!', body: 'Welcome to the next generation of AI-powered development.', time: '2m ago', read: false },
    { id: 2, icon: '⭐', title: 'New: Starred discussions', body: 'Star any conversation to bookmark it for quick access.', time: '1h ago', read: false },
    { id: 3, icon: '💳', title: 'Pro plan available', body: 'Unlock unlimited projects and advanced AI capabilities.', time: '3h ago', read: true },
    { id: 4, icon: '🎨', title: 'Templates updated', body: 'New prompt templates added to your dashboard.', time: '1d ago', read: true },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatSessions, activeSessionId]);

  const [profileName, setProfileName] = useState(user?.user_metadata?.full_name || 'Explorer');
  const [profileAvatar, setProfileAvatar] = useState(user?.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lyzard');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiProjects.getProjects();
        setProjects(response.data.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const handleSendMessage = () => {
    if (!promptValue.trim()) return;

    const isCodeRequest = promptValue.toLowerCase().includes('code') || 
                         promptValue.toLowerCase().includes('website') || 
                         promptValue.toLowerCase().includes('component');
    
    const newMessage = {
      id: Date.now(),
      text: promptValue,
      type: 'text',
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? { 
            ...session, 
            messages: [...session.messages, newMessage],
            title: session.messages.length === 0 ? promptValue.slice(0, 30) : session.title 
          } 
        : session
    ));

    setPromptValue("");

    // Simulate AI response
    setTimeout(() => {
      const artifact = isCodeRequest ? {
        id: 'art-' + Date.now(),
        title: 'Landing Page Component',
        type: 'code',
        content: `// Lyzard AI Generated Landing Page\nimport React from 'react';\n\nexport const LandingPage = () => {\n  return (\n    <div className="min-h-screen bg-slate-900 text-white p-8">\n      <header className="text-center mb-12">\n        <h1 className="text-5xl font-bold mb-4">Materialize Your Vision</h1>\n        <p className="text-xl text-slate-400">Powered by Lyzard AI</p>\n      </header>\n      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">\n        {[1,2,3].map(i => (\n          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500 transition-all cursor-pointer">\n            <h3 className="text-xl font-bold mb-2">Feature ${i}</h3>\n            <p className="text-slate-400">Advanced AI capabilities to streamline your workflow.</p>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n};`
      } : null;

      const aiMessage = {
        id: Date.now() + 1,
        text: isCodeRequest 
          ? "I've designed a modern landing page for you. You can explore the code and see the live preview in the artifact panel."
          : "I'm analyzing your request... This is a simulated AI response to help you build your vision.",
        type: 'text',
        sender: 'ai',
        artifact: artifact,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (isCodeRequest) {
        setArtifactData(artifact);
        setShowArtifact(true);
      }

      setChatSessions(prev => prev.map(session => 
        session.id === activeSessionId 
          ? { ...session, messages: [...session.messages, aiMessage] } 
          : session
      ));
    }, 1500);
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newSession = {
      id: newId,
      title: 'New Discussion',
      messages: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
    setActiveMenuItem('Dashboard');
  };

  const handleToggleStar = (e, sessionId) => {
    e.stopPropagation();
    setStarredSessions(prev => {
      const next = new Set(prev);
      if (next.has(sessionId)) next.delete(sessionId);
      else next.add(sessionId);
      return next;
    });
  };

  const handleToggleMic = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        audioChunksRef.current = [];
        recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          stream.getTracks().forEach(t => t.stop());
          const audioMsg = { id: Date.now(), type: 'audio', audioUrl: url, sender: 'user', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
          setChatSessions(prev => prev.map(s =>
            s.id === activeSessionId
              ? { ...s, messages: [...s.messages, audioMsg], title: s.messages.length === 0 ? '🎤 Voice message' : s.title }
              : s
          ));
          setTimeout(() => {
            const aiMsg = { id: Date.now() + 1, type: 'text', text: 'I received your voice message! Audio analysis is being processed — this is a simulated response.', sender: 'ai', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setChatSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: [...s.messages, aiMsg] } : s));
          }, 1200);
        };
        recorder.start();
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
      } catch (err) {
        console.error('Mic access denied', err);
      }
    }
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleChangeAvatar = () => {
    const seeds = ['Felix', 'Max', 'Luna', 'Oscar', 'Milo', 'Bella'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    setProfileAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`);
  };

  const userName = profileName.charAt(0).toUpperCase() + profileName.slice(1);
  const initial = (userName.charAt(0) || 'E').toUpperCase();
  const avatarUrl = profileAvatar;

  // Branch Rendering Logic
  const renderContent = () => {
    if (activeMenuItem === 'Upgrade') {
      return (
        <div className="flex-1 px-8 py-12 flex flex-col items-center">
          <div className="text-center mb-12">
            <h1 className={cn("text-4xl md:text-5xl font-black mb-4", theme === "dark" ? "text-white" : "text-slate-900")}>
              Upgrade your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Experience</span>
            </h1>
            <p className={cn("text-lg", theme === "dark" ? "text-white/60" : "text-slate-500")}>Get access to advanced AI features, unlimited projects and more.</p>
            <div className="mt-8 flex justify-center">
              <div className={cn("flex p-1 rounded-full border", theme === "dark" ? "bg-white/5 border-white/10" : "bg-black/5 border-slate-200")}>
                <button onClick={() => setIsYearly(false)} className={cn("px-6 py-2 rounded-full text-sm font-bold transition-all", !isYearly ? (theme === "dark" ? "bg-white text-black" : "bg-slate-900 text-white") : (theme === "dark" ? "text-white/60 hover:text-white" : "text-slate-600 hover:text-slate-900"))}>Monthly</button>
                <button onClick={() => setIsYearly(true)} className={cn("px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2", isYearly ? (theme === "dark" ? "bg-white text-black" : "bg-slate-900 text-white") : (theme === "dark" ? "text-white/60 hover:text-white" : "text-slate-600 hover:text-slate-900"))}>Yearly <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-md">-35%</span></button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
            {/* Pro Plan */}
            <div className={cn("relative p-8 rounded-3xl border transition-all hover:scale-[1.02]", theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-blue-100 shadow-xl shadow-blue-500/5")}>
              <div className="absolute top-0 right-0 p-6"><span className="bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Popular</span></div>
              <h3 className={cn("text-2xl font-bold mb-2", theme === "dark" ? "text-white" : "text-slate-900")}>Pro</h3>
              <div className="flex items-baseline mb-8"><span className={cn("text-5xl font-black", theme === "dark" ? "text-white" : "text-slate-900")}>{isYearly ? "780" : "100"}</span><span className="text-2xl ml-1 font-bold">DH</span><span className={cn("ml-2", theme === "dark" ? "text-white/40" : "text-slate-400")}>/{isYearly ? "year" : "month"}</span></div>
              <button onClick={() => setSelectedPlanForPayment({ name: "Pro", price: 100, yearlyPrice: 780 })} className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg mb-8 shadow-lg shadow-blue-500/30">Subscribe to Pro</button>
              <div className="space-y-4">{["Unlimited Pages", "Advanced AI Copywriting", "Full Automatic SEO", "CRM Integrations", "Priority Support"].map(f => (<div key={f} className="flex items-center gap-3"><Zap size={16} className="text-blue-500" /><span className={cn("text-sm font-medium", theme === "dark" ? "text-white/80" : "text-slate-700")}>{f}</span></div>))}</div>
            </div>
            {/* Pro Max Plan */}
            <div className={cn("relative p-8 rounded-3xl border transition-all hover:scale-[1.02]", theme === "dark" ? "bg-gradient-to-b from-purple-500/10 to-transparent border-purple-500/30" : "bg-gradient-to-b from-purple-50 to-white border-purple-200 shadow-xl shadow-purple-500/5")}>
              <h3 className={cn("text-2xl font-bold mb-2", theme === "dark" ? "text-white" : "text-slate-900")}>Pro Max</h3>
              <div className="flex items-baseline mb-8"><span className={cn("text-5xl font-black", theme === "dark" ? "text-white" : "text-slate-900")}>{isYearly ? "1248" : "160"}</span><span className="text-2xl ml-1 font-bold">DH</span><span className={cn("ml-2", theme === "dark" ? "text-white/40" : "text-slate-400")}>/{isYearly ? "year" : "month"}</span></div>
              <button onClick={() => setSelectedPlanForPayment({ name: "Pro Max", price: 160, yearlyPrice: 1248 })} className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg mb-8 shadow-lg shadow-purple-500/30">Subscribe to Pro Max</button>
              <div className="space-y-4">{["Everything in Pro", "Multi-project Management", "Total White-label", "Unlimited API Access"].map(f => (<div key={f} className="flex items-center gap-3"><Star size={16} className="text-purple-500" /><span className={cn("text-sm font-medium", theme === "dark" ? "text-white/80" : "text-slate-700")}>{f}</span></div>))}</div>
            </div>
          </div>
        </div>
      );
    }

    if (activeMenuItem === 'Projects') {
      return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="h-16 border-b flex items-center px-8 justify-between shrink-0">
             <h2 className={cn("text-xl font-black", theme === "dark" ? "text-white" : "text-slate-900")}>Projects</h2>
             <button onClick={() => setActiveMenuItem('Dashboard')} className="p-2 rounded-lg bg-blue-500 text-white font-bold text-sm">New Project</button>
          </div>
          <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
            {isLoadingProjects ? (
               <div className="flex justify-center py-20"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full" /></div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {projects.map(p => (
                  <div key={p.id} onClick={() => setActiveMenuItem(`Project-${p.id}`)} className={cn("p-5 border rounded-2xl transition-all cursor-pointer group shadow-sm hover:-translate-y-1 hover:shadow-xl", theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-slate-200")}>
                    <div className={cn("w-full aspect-video rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br", theme === "dark" ? "from-white/5 to-white/10" : "from-slate-100 to-slate-200")}>
                      <Grid size={32} className="opacity-20 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-xs opacity-50">Version {p.versions_count || 1}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 opacity-50"><Grid size={48} className="mx-auto mb-4" /><p className="font-bold">No projects yet</p></div>
            )}
          </div>
        </div>
      );
    }

    if (activeMenuItem === 'Starred') {
      const starred = chatSessions.filter(s => starredSessions.has(s.id));
      return (
        <div className="flex-1 overflow-y-auto no-scrollbar py-12 px-8">
          <div className="max-w-2xl mx-auto">
            <header className="mb-8">
              <h1 className={cn("text-4xl font-black mb-2", theme === "dark" ? "text-white" : "text-slate-900")}>⭐ Starred</h1>
              <p className="opacity-40">Your bookmarked discussions.</p>
            </header>
            {starred.length === 0 ? (
              <div className={cn("text-center py-20 rounded-3xl border", theme === "dark" ? "border-white/5 bg-white/[0.02]" : "border-slate-100 bg-white")}>
                <Star size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold opacity-30">No starred discussions yet</p>
                <p className="text-sm opacity-20 mt-1">Hover a chat in the sidebar and click ⭐</p>
              </div>
            ) : (
              <div className="space-y-3">
                {starred.map(session => (
                  <div
                    key={session.id}
                    onClick={() => { setActiveSessionId(session.id); setActiveMenuItem('Dashboard'); }}
                    className={cn("p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg", theme === "dark" ? "bg-white/5 border-white/10 hover:bg-white/8" : "bg-white border-slate-200 hover:border-amber-200")}
                  >
                    <div className="flex items-center gap-3">
                      <Star size={14} className="text-amber-400 shrink-0" fill="currentColor" />
                      <p className="font-bold text-sm flex-1 truncate">{session.title}</p>
                      <span className="text-[10px] opacity-30">{session.timestamp}</span>
                    </div>
                    {session.messages.length > 0 && (
                      <p className="text-xs opacity-40 mt-2 ml-5 truncate">{session.messages[0].text}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeMenuItem === 'Search') {
      const results = searchQuery.trim()
        ? chatSessions.filter(s =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        : [];
      return (
        <div className="flex-1 overflow-y-auto no-scrollbar py-12 px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className={cn("text-4xl font-black mb-6", theme === "dark" ? "text-white" : "text-slate-900")}>Search</h1>
            <div className={cn("flex items-center gap-3 px-4 py-3 rounded-2xl border mb-8", theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm")}>
              <Search size={18} className="opacity-40 shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search discussions..."
                className={cn("flex-1 bg-transparent outline-none text-base font-medium placeholder:opacity-30", theme === "dark" ? "text-white" : "text-slate-900")}
              />
            </div>
            {searchQuery.trim() ? (
              results.length === 0 ? (
                <div className="text-center py-16 opacity-30">
                  <p className="font-bold">No discussions found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map(session => (
                    <div
                      key={session.id}
                      onClick={() => { setActiveSessionId(session.id); setActiveMenuItem('Dashboard'); }}
                      className={cn("p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-0.5", theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-slate-200")}
                    >
                      <p className="font-bold text-sm">{session.title}</p>
                      {session.messages.length > 0 && (
                        <p className="text-xs opacity-40 mt-1 truncate">{session.messages[0].text}</p>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 opacity-20">
                <Search size={48} className="mx-auto mb-4" />
                <p className="font-bold">Start typing to search discussions</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeMenuItem === 'Notifications') {
      const unreadCount = notifications.filter(n => !n.read).length;
      return (
        <div className="flex-1 overflow-y-auto no-scrollbar py-12 px-8">
          <div className="max-w-2xl mx-auto">
            <header className="mb-8 flex items-center justify-between">
              <div>
                <h1 className={cn("text-4xl font-black mb-1", theme === "dark" ? "text-white" : "text-slate-900")}>Notifications</h1>
                <p className="opacity-40 text-sm">{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}</p>
              </div>
              {unreadCount > 0 && (
                <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-blue-500 hover:bg-blue-500/10 transition-all">
                  <CheckCheck size={16} /> Mark all read
                </button>
              )}
            </header>
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                  className={cn("p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg flex items-start gap-4",
                    n.read
                      ? (theme === "dark" ? "bg-white/3 border-white/5 opacity-50" : "bg-slate-50 border-slate-100 opacity-60")
                      : (theme === "dark" ? "bg-white/8 border-white/15" : "bg-white border-slate-200 shadow-sm")
                  )}>
                  <span className="text-2xl shrink-0 mt-0.5">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={cn("font-bold text-sm", n.read ? "" : (theme === "dark" ? "text-white" : "text-slate-900"))}>{n.title}</p>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                    </div>
                    <p className="text-xs opacity-50 leading-relaxed">{n.body}</p>
                  </div>
                  <span className="text-[10px] opacity-30 shrink-0 mt-1">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeMenuItem === 'Settings') {
      return (
        <div className="flex-1 overflow-y-auto no-scrollbar py-12 px-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className={cn("text-4xl font-black mb-2", theme === "dark" ? "text-white" : "text-slate-900")}>Account Settings</h1>
              <p className={cn("text-lg opacity-50")}>Manage your profile and preferences.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                {['profile', 'security', 'billing'].map(id => (
                  <button key={id} onClick={() => setActiveSettingsTab(id)} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all", activeSettingsTab === id ? (theme === "dark" ? "bg-white/10 text-white" : "bg-white border text-blue-600 shadow-sm") : "opacity-50")}>
                    <span className="capitalize">{id}</span>
                  </button>
                ))}
              </div>
              <div className="md:col-span-2 space-y-6">
                <section className={cn("p-8 rounded-3xl border", theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-slate-200")}>
                  {activeSettingsTab === 'profile' && (
                    <>
                      <h3 className="text-xl font-bold mb-6">Your Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-purple-600 p-0.5"><div className={cn("w-full h-full rounded-full flex items-center justify-center overflow-hidden", theme === "dark" ? "bg-black" : "bg-white")}>{avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" /> : initial}</div></div>
                          <button onClick={handleChangeAvatar} className="text-sm font-bold text-blue-500">Change Avatar</button>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold opacity-40 ml-1">Full Name</p>
                          <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none", theme === "dark" ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold opacity-40 ml-1">Email Address</p>
                          <input type="email" disabled value={user?.email || 'user@example.com'} className={cn("w-full px-4 py-3 rounded-xl border opacity-50 cursor-not-allowed", theme === "dark" ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")} />
                        </div>
                        <button onClick={handleSaveProfile} className="px-8 py-3 bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95">{isSaving ? 'Saving...' : 'Save Changes'}</button>
                      </div>
                    </>
                  )}

                  {activeSettingsTab === 'security' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold mb-6">Security Settings</h3>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <p className="text-xs font-bold opacity-40 ml-1">Current Password</p>
                            <input type="password" placeholder="••••••••" className={cn("w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500", theme === "dark" ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-xs font-bold opacity-40 ml-1">New Password</p>
                              <input type="password" placeholder="••••••••" className={cn("w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500", theme === "dark" ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")} />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-bold opacity-40 ml-1">Confirm New Password</p>
                              <input type="password" placeholder="••••••••" className={cn("w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500", theme === "dark" ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")} />
                            </div>
                          </div>
                          <button className="px-8 py-3 bg-blue-500 text-white rounded-xl font-bold">Update Password</button>
                        </div>
                      </div>
                      
                      <div className="pt-8 border-t border-white/5">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-bold">Two-Factor Authentication</p>
                            <p className="text-xs opacity-50">Add an extra layer of security to your account.</p>
                          </div>
                          <div className="w-12 h-6 rounded-full bg-white/10 relative p-1 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-white/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'billing' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold mb-6">Subscription Plan</h3>
                        <div className={cn("p-6 rounded-2xl border flex items-center justify-between", theme === "dark" ? "bg-blue-500/5 border-blue-500/20" : "bg-blue-50 border-blue-100")}>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Current Plan</span>
                            <h4 className="text-2xl font-black">Free Plan</h4>
                            <p className="text-xs opacity-50">You are currently on the free tier.</p>
                          </div>
                          <button onClick={() => setActiveMenuItem('Upgrade')} className="px-6 py-2.5 bg-blue-500 text-white rounded-xl font-bold text-sm">Upgrade Now</button>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5">
                        <h4 className="font-bold mb-4">Payment Method</h4>
                        <div className={cn("p-4 rounded-2xl border flex items-center gap-4", theme === "dark" ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")}>
                          <div className="w-12 h-8 rounded bg-slate-800 flex items-center justify-center text-[8px] font-black text-white">VISA</div>
                          <div className="flex-1">
                            <p className="text-sm font-bold">•••• •••• •••• 4242</p>
                            <p className="text-[10px] opacity-40 uppercase">Expires 12/28</p>
                          </div>
                          <button className="text-xs font-bold text-blue-500">Edit</button>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5">
                        <h4 className="font-bold mb-4">Invoice History</h4>
                        <div className="space-y-2">
                          {[
                            { id: '#INV-001', date: 'May 1, 2026', amount: '0.00 DH', status: 'Paid' },
                            { id: '#INV-002', date: 'Apr 1, 2026', amount: '0.00 DH', status: 'Paid' },
                          ].map(inv => (
                            <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                              <div className="flex items-center gap-4">
                                <Mail size={14} className="opacity-30" />
                                <div>
                                  <p className="text-xs font-bold">{inv.id}</p>
                                  <p className="text-[10px] opacity-40">{inv.date}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-bold">{inv.amount}</p>
                                <p className="text-[10px] text-green-500 font-bold uppercase">{inv.status}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeMenuItem?.startsWith('Project-')) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center h-full p-8">
          <div className={cn("max-w-md w-full p-8 rounded-3xl border text-center", theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-xl")}>
             <BookOpen size={48} className="mx-auto mb-6 text-blue-500" />
             <h2 className="text-2xl font-black mb-2">Project Editor</h2>
             <p className="opacity-50 mb-6">Loading project workspace and assets...</p>
             <div className="w-full bg-slate-200 dark:bg-white/10 h-1 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-blue-500" />
             </div>
          </div>
        </div>
      );
    }

    // Default: Chat Dashboard
    const activeSession = chatSessions.find(s => s.id === activeSessionId) || chatSessions[0];
    const messages = activeSession.messages;

    return (
      <div className="flex-1 flex flex-row h-full relative overflow-hidden">
        {/* Chat Side */}
        <div className={cn(
          "flex flex-col h-full transition-all duration-500 relative",
          showArtifact ? "w-1/2 border-r border-white/10" : "flex-1"
        )}>
          <div className="flex-1 overflow-y-auto no-scrollbar pt-12 px-6">
            <div className={cn("mx-auto w-full transition-all duration-500", showArtifact ? "max-w-xl" : "max-w-3xl")}>
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                    <h1 className={cn("text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-3", theme === "dark" ? "text-white" : "text-slate-900")}>
                      Got an idea, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{userName}?</span>
                    </h1>
                    <p className="text-lg opacity-40 font-medium mb-10">Ask Lyzard to materialize your vision...</p>
                    <div className={cn("grid gap-3 text-left max-w-2xl mx-auto", showArtifact ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3")}>
                      {[
                        { icon: '🚀', label: 'SaaS Materializer', prompt: 'Design a high-converting SaaS landing page with dark mode for ' },
                        { icon: '💎', label: 'Premium Showcase', prompt: 'Create a premium product showcase landing page for ' },
                        { icon: '📱', label: 'Mobile App Page', prompt: 'Build a sleek landing page to promote a mobile app called ' },
                        { icon: '✨', label: 'Minimalist Waitlist', prompt: 'Design a minimalist and clean waitlist landing page for ' },
                        { icon: '🎨', label: 'Creative Portfolio', prompt: 'Materialize a creative and modern portfolio landing page for ' },
                        { icon: '💼', label: 'Business Presence', prompt: 'Create a professional and trust-building business landing page for ' },
                      ].map(t => (
                        <button
                          key={t.label}
                          onClick={() => setPromptValue(t.prompt)}
                          className={cn(
                            'p-4 rounded-2xl border text-left transition-all hover:-translate-y-1 hover:shadow-xl',
                            theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-blue-500/10'
                          )}
                        >
                          <span className="text-2xl block mb-2">{t.icon}</span>
                          <p className={cn('text-sm font-bold', theme === 'dark' ? 'text-white/80' : 'text-slate-700')}>{t.label}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-8 pb-10 flex flex-col">
                {messages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    key={msg.id} 
                    className={cn(
                      "flex gap-4 group w-full",
                      msg.sender === 'user' ? "flex-row-reverse justify-start" : "flex-row justify-start"
                    )}
                  >
                    {/* Avatar */}
                    <div className={cn(
                      "w-9 h-9 shrink-0 rounded-xl flex items-center justify-center overflow-hidden shadow-lg mt-1", 
                      msg.sender === 'user' ? "bg-blue-500" : "bg-purple-500"
                    )}>
                      <div className={cn("w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden", theme === "dark" ? "bg-black" : "bg-white")}>
                        {msg.sender === 'user' ? (avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" /> : initial) : <Logo size={20} variant={theme} />}
                      </div>
                    </div>

                    {/* Message Bubble container */}
                    <div className={cn(
                      "flex flex-col",
                      showArtifact ? "max-w-[90%]" : "max-w-[80%]",
                      msg.sender === 'user' ? "items-end" : "items-start"
                    )}>
                      <div className={cn(
                        "p-5 rounded-[24px] border shadow-sm transition-all duration-300", 
                        msg.sender === 'user' 
                          ? (theme === "dark" ? "bg-white/5 border-white/10 rounded-tr-none shadow-[0_4px_20px_rgba(0,0,0,0.1)]" : "bg-white border-slate-200 rounded-tr-none shadow-sm") 
                          : (theme === "dark" ? "bg-purple-500/10 border-purple-500/20 rounded-tl-none shadow-[0_4px_20px_rgba(168,85,247,0.1)]" : "bg-purple-50 border-purple-100 rounded-tl-none shadow-sm")
                      )}>
                        {msg.type === 'audio' ? (
                          <div className="flex items-center gap-3 min-w-[220px]">
                            <Mic size={16} className="text-blue-400 shrink-0" />
                            <audio controls src={msg.audioUrl} className="h-8 flex-1" style={{ accentColor: '#3b82f6' }} />
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <p className={cn("text-base font-medium leading-relaxed whitespace-pre-wrap", theme === "dark" ? "text-white" : "text-slate-800")}>{msg.text}</p>
                            
                            {msg.artifact && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => { setArtifactData(msg.artifact); setShowArtifact(true); }}
                                className={cn(
                                  "w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all",
                                  theme === "dark" 
                                    ? "bg-white/5 border-white/10 hover:bg-white/10" 
                                    : "bg-white border-slate-200 hover:border-blue-200 shadow-sm"
                                )}
                              >
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                  <Code size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-black truncate">{msg.artifact.title}</p>
                                  <p className="text-[10px] opacity-40 uppercase font-black tracking-widest">Click to open artifact</p>
                                </div>
                                <div className="p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                  <Maximize2 size={16} />
                                </div>
                              </motion.button>
                            )}
                          </div>
                        )}
                      </div>
                      <div className={cn(
                        "mt-1.5 flex items-center gap-2 px-1",
                        msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                      )}>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-30">
                          {msg.timestamp} • {msg.sender === 'user' ? 'You' : 'Lyzard AI'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
          <div className="px-6 pb-8 pt-4 relative z-20">
            <div className={cn("mx-auto transition-all duration-500", showArtifact ? "max-w-xl" : "max-w-3xl")}>
              <div className={cn("w-full backdrop-blur-3xl rounded-[32px] border p-2 shadow-2xl overflow-hidden relative", theme === "dark" ? "bg-[#141414]/90 border-white/5" : "bg-white/90 border-slate-100")}>
                <div className="px-5 py-4">
                  <textarea value={promptValue} onChange={(e) => setPromptValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())} placeholder="Ask Lyzard to materialize your vision..." className={cn("w-full bg-transparent border-none resize-none focus:ring-0 outline-none text-lg h-20 font-semibold tracking-tight", theme === "dark" ? "text-white placeholder:text-white/20" : "text-slate-900 placeholder:text-slate-400")} />
                </div>
                <div className="flex items-center justify-between px-3 pb-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1"><button className="p-2 opacity-40 hover:opacity-100"><Plus size={20} /></button></div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleToggleMic} className={cn("p-2 rounded-xl transition-all relative", isRecording ? "text-red-500 bg-red-500/10" : "opacity-40 hover:opacity-100")}>
                      {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                      {isRecording && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                    </button>
                    <button onClick={handleSendMessage} className="p-2.5 bg-gradient-to-r from-[#00e5ff] to-[#9d00ff] text-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"><ArrowUp size={22} strokeWidth={3} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artifact Side (Claude-style) */}
        <AnimatePresence>
          {showArtifact && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "w-1/2 h-full flex flex-col shadow-2xl relative z-30",
                theme === "dark" ? "bg-[#0A0A0B]" : "bg-white"
              )}
            >
              <div className={cn("h-16 border-b flex items-center justify-between px-6 shrink-0", theme === "dark" ? "border-white/10" : "border-slate-200")}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <Code size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold truncate">{artifactData.title}</h3>
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-widest">Version 1.0 • React</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn("flex p-1 rounded-xl border", theme === "dark" ? "bg-white/5 border-white/5" : "bg-slate-100 border-slate-200")}>
                    <button 
                      onClick={() => setArtifactData({...artifactData, type: 'code'})}
                      className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2", artifactData.type === 'code' ? (theme === "dark" ? "bg-white/10 text-white" : "bg-white shadow-sm text-blue-600") : "opacity-40 hover:opacity-100")}
                    >
                      <Terminal size={14} /> Code
                    </button>
                    <button 
                      onClick={() => setArtifactData({...artifactData, type: 'preview'})}
                      className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2", artifactData.type === 'preview' ? (theme === "dark" ? "bg-white/10 text-white" : "bg-white shadow-sm text-blue-600") : "opacity-40 hover:opacity-100")}
                    >
                      <Eye size={14} /> Preview
                    </button>
                  </div>
                  <button onClick={() => setShowArtifact(false)} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all">
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden relative">
                {artifactData.type === 'code' ? (
                  <div className="h-full w-full overflow-auto p-6 font-mono text-sm leading-relaxed bg-[#050508] text-blue-400/90 selection:bg-blue-500/30">
                    <pre><code>{artifactData.content}</code></pre>
                  </div>
                ) : (
                  <div className="h-full w-full bg-[#f8fafc] flex flex-col items-center justify-center p-8 overflow-auto">
                    {/* Simulated Preview */}
                    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden min-h-[500px]">
                      <div className="h-12 border-b bg-slate-50 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 mx-4 h-7 bg-white rounded-lg border border-slate-200 flex items-center px-3 text-[10px] text-slate-400 truncate">
                          https://lyzard-preview.ai/projects/{artifactData.title.toLowerCase().replace(/\s+/g, '-')}
                        </div>
                      </div>
                      <div className="p-8 text-slate-900 font-sans">
                         <div className="h-12 w-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white mb-6">
                            <Zap size={24} />
                         </div>
                         <h1 className="text-4xl font-black mb-4 tracking-tighter">Your Materialized Vision</h1>
                         <p className="text-slate-500 text-lg mb-8">This is a live preview of the landing page generated by Lyzard AI based on your instructions.</p>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                               <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3"><Grid size={18}/></div>
                               <div className="h-2 w-12 bg-slate-200 rounded-full mb-2"/>
                               <div className="h-2 w-20 bg-slate-100 rounded-full"/>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                               <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3"><Star size={18}/></div>
                               <div className="h-2 w-12 bg-slate-200 rounded-full mb-2"/>
                               <div className="h-2 w-20 bg-slate-100 rounded-full"/>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className={cn("flex h-screen overflow-hidden font-sans relative transition-colors duration-500", theme === "dark" ? "bg-[#050508] text-white" : "bg-[#f8fafc] text-slate-900")}>
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <motion.aside 
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className={cn("h-screen flex flex-col border-r backdrop-blur-3xl p-3 relative z-40 overflow-hidden transition-all", theme === "dark" ? "border-white/10 bg-[#0A0A0B]/80" : "border-slate-200 bg-white/80")}
      >
        <div className={cn("flex items-center mb-6 px-2 pt-2 gap-2", isSidebarOpen ? "justify-between" : "flex-col justify-center gap-4")}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "p-2 rounded-lg transition-all",
                theme === "dark" ? "hover:bg-white/5 text-white/60 hover:text-white" : "hover:bg-black/5 text-black/60 hover:text-black"
              )}
            >
              {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>
            {isSidebarOpen && <Logo size={60} variant={theme} />}
          </div>
          {!isSidebarOpen && <Logo size={40} variant={theme} />}
          {isSidebarOpen && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg hover:bg-white/5">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
          <div className="space-y-1">
            <NavItem icon={Home}    label={isSidebarOpen ? "Dashboard"     : ""} active={activeMenuItem === 'Dashboard'}     onClick={() => setActiveMenuItem('Dashboard')}     isSidebarOpen={isSidebarOpen} theme={theme} color="blue" />
            <NavItem icon={Search}  label={isSidebarOpen ? "Search"        : ""} active={activeMenuItem === 'Search'}        onClick={() => { setActiveMenuItem('Search'); setSearchQuery(''); }} isSidebarOpen={isSidebarOpen} theme={theme} color="cyan" />
            <div className="space-y-1">
              <NavItem 
                icon={Grid} 
                label={isSidebarOpen ? "Projects" : ""} 
                active={activeMenuItem === 'Projects' || activeMenuItem.startsWith('Project-')} 
                onClick={() => {
                  if (!isSidebarOpen) setIsSidebarOpen(true);
                  setIsProjectsMenuOpen(!isProjectsMenuOpen);
                }} 
                isSidebarOpen={isSidebarOpen} 
                theme={theme} 
                color="purple" 
              />
              
              {/* Projects Accordion Menu */}
              <AnimatePresence>
                {isProjectsMenuOpen && isSidebarOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 pr-2 space-y-1"
                  >
                    {projects.length > 0 ? projects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setActiveMenuItem(`Project-${p.id}`)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-xs font-medium truncate transition-all flex items-center gap-2",
                          activeMenuItem === `Project-${p.id}`
                            ? (theme === "dark" ? "bg-white/10 text-white" : "bg-purple-50 text-purple-600")
                            : "opacity-40 hover:opacity-100 hover:bg-white/5"
                        )}
                      >
                        <div className="w-1 h-1 rounded-full bg-purple-500 shrink-0" />
                        <span className="truncate">{p.name}</span>
                      </button>
                    )) : (
                      <p className="text-[10px] opacity-20 px-3 py-2 italic">No projects yet</p>
                    )}
                    <button 
                      onClick={() => setActiveMenuItem('Dashboard')}
                      className="w-full text-left px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider text-blue-500 opacity-60 hover:opacity-100 transition-all"
                    >
                      + New Project
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <NavItem icon={History} label={isSidebarOpen ? "History"       : ""} active={activeMenuItem === 'History'}       onClick={() => setActiveMenuItem('History')}       isSidebarOpen={isSidebarOpen} theme={theme} color="pink" />
            <NavItem icon={Star}    label={isSidebarOpen ? "Starred"       : ""} active={activeMenuItem === 'Starred'}       onClick={() => setActiveMenuItem('Starred')}       isSidebarOpen={isSidebarOpen} theme={theme} color="amber" />
            <div className="relative">
              <NavItem icon={Bell} label={isSidebarOpen ? "Notifications" : ""} active={activeMenuItem === 'Notifications'} onClick={() => setActiveMenuItem('Notifications')} isSidebarOpen={isSidebarOpen} theme={theme} color="rose" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 pointer-events-none" />
              )}
            </div>
          </div>

          {isSidebarOpen && (
            <div className="px-2 space-y-4">
              <button 
                onClick={handleNewChat}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 flex items-center gap-3 transition-all border border-blue-500/20 group"
              >
                <MessageSquarePlus size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black uppercase tracking-wider">New Discussion</span>
              </button>

              {starredSessions.size > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 px-2">⭐ Starred</p>
                  <div className="space-y-1">
                    {chatSessions.filter(s => starredSessions.has(s.id)).map(session => (
                      <button
                        key={session.id}
                        onClick={() => { setActiveSessionId(session.id); setActiveMenuItem('Dashboard'); }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2",
                          activeSessionId === session.id && activeMenuItem === 'Dashboard'
                            ? (theme === "dark" ? "bg-white/5 text-white" : "bg-blue-50 text-blue-600")
                            : "opacity-40 hover:opacity-100"
                        )}
                      >
                        <Star size={10} className="text-amber-400 shrink-0" fill="currentColor" />
                        <span className="truncate">{session.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 px-2">Recent Chats</p>
                <div className="space-y-1 max-h-[150px] overflow-y-auto no-scrollbar">
                  {chatSessions.map(session => (
                    <div
                      key={session.id}
                      className={cn(
                        "flex items-center rounded-lg text-xs font-medium transition-all group/session",
                        activeSessionId === session.id && activeMenuItem === 'Dashboard'
                          ? (theme === "dark" ? "bg-white/5 text-white" : "bg-blue-50 text-blue-600")
                          : "opacity-40 hover:opacity-100"
                      )}
                    >
                      <button
                        onClick={() => { setActiveSessionId(session.id); setActiveMenuItem('Dashboard'); }}
                        className="flex-1 text-left px-3 py-2 truncate"
                      >
                        {session.title}
                      </button>
                      <button
                        onClick={(e) => handleToggleStar(e, session.id)}
                        className={cn(
                          "p-1 mr-1.5 rounded transition-all",
                          starredSessions.has(session.id)
                            ? "text-amber-400"
                            : "opacity-0 group-hover/session:opacity-50 hover:!opacity-100"
                        )}
                      >
                        <Star size={11} fill={starredSessions.has(session.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t border-white/5">
            <NavItem icon={Zap} label={isSidebarOpen ? "Upgrade Plan" : ""} active={activeMenuItem === 'Upgrade'} onClick={() => setActiveMenuItem('Upgrade')} isSidebarOpen={isSidebarOpen} theme={theme} color="pink" />
          </div>
        </div>

        <div className="mt-auto pt-4 space-y-2">
          <div onClick={() => setActiveMenuItem('Settings')} className={cn("flex items-center gap-3 p-2 rounded-xl border transition-all cursor-pointer", theme === "dark" ? "bg-white/5 border-white/5" : "bg-white border-slate-200", !isSidebarOpen && "justify-center", activeMenuItem === 'Settings' && "border-blue-500")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#9d00ff] p-0.5"><div className={cn("w-full h-full rounded-full flex items-center justify-center overflow-hidden", theme === "dark" ? "bg-black" : "bg-white")}>{avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" /> : initial}</div></div>
            {isSidebarOpen && <div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{userName}</p></div>}
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all">{isSidebarOpen && <span className="text-sm font-bold">Sign Out</span>}<LogOut size={16} className={!isSidebarOpen ? "mx-auto" : ""} /></button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {renderContent()}
      </main>

      <PaymentModal isOpen={!!selectedPlanForPayment} onClose={() => setSelectedPlanForPayment(null)} plan={selectedPlanForPayment} isYearly={isYearly} />
    </div>
  );
};

export default DashboardV2;
