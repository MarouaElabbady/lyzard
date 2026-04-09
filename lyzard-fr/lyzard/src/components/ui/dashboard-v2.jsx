'use client'
import React, { useState } from 'react';
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
  ArrowUp, 
  Gift, 
  Zap, 
  Bell,
  PanelLeftClose,
  MoreVertical
} from 'lucide-react';
import { cn } from "../../lib/utils";

import { 
  AnimatePresence, 
  motion 
} from 'framer-motion';

const Logo = ({ size = 24, className = "" }) => (
  <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad-dash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#9d00ff" />
        </linearGradient>
      </defs>
      <path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50Z" stroke="url(#logo-grad-dash)" strokeWidth="8" />
      <path d="M40 50L48 58L65 42" stroke="url(#logo-grad-dash)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 25L35 35" stroke="url(#logo-grad-dash)" strokeWidth="6" strokeLinecap="round" />
      <path d="M75 75L65 65" stroke="url(#logo-grad-dash)" strokeWidth="6" strokeLinecap="round" />
    </svg>
    <div className="absolute inset-0 bg-[#00e5ff]/10 blur-xl -z-10" />
  </div>
);

const NavItem = ({ icon: Icon, label, shortcut, active = false }) => (
  <div className={cn(
    "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group",
    active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
  )}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? "text-[#00e5ff]" : "text-white/60 group-hover:text-[#00e5ff]"} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {shortcut && (
      <span className="text-[10px] font-bold text-white/20 bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-tighter">
        {shortcut}
      </span>
    )}
  </div>
);

export const DashboardV2 = ({ onLogout, user }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isProjectsVisible, setIsProjectsVisible] = useState(true);
  const userName = user?.name || 'Explorer';
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-white/5 bg-[#0a0a0a] p-4">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3 group cursor-pointer">
             <Logo size={28} />
             <span className="text-xl font-black tracking-tighter text-white">Lyzard<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-[#9d00ff]">.ai</span></span>
          </div>
          <button className="text-white/40 hover:text-white transition-colors">
            <PanelLeftClose size={18} />
          </button>
        </div>

        {/* Workspace Switcher */}
        <div className="mb-6">
          <button className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#00e5ff] to-[#9d00ff] flex items-center justify-center text-[10px] font-bold text-black">{initial}</div>
              <span className="text-sm font-semibold truncate">{userName}'s Portal</span>
            </div>
            <ChevronDown size={14} className="text-white/40 group-hover:text-white" />
          </button>
        </div>

        {/* Main Nav */}
        <nav className="space-y-1 mb-8">
          <NavItem icon={Home} label="Home" active />
          <NavItem icon={Search} label="Search" shortcut="Ctrl K" />
          <NavItem icon={BookOpen} label="Resources" />
        </nav>

        {/* Projects Category */}
        <div className="mb-4">
          <div className="px-3 text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Workspace</div>
          <div className="space-y-1">
            <NavItem icon={Grid} label="All projects" />
            <NavItem icon={Star} label="Starred" />
            <NavItem icon={User} label="Team access" />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bonus Cards */}
        <div className="space-y-3 mb-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group cursor-pointer hover:border-[#00e5ff]/30 transition-all">
             <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white mb-1 tracking-tight">Refer & Earn</p>
                <p className="text-[10px] text-white/40 leading-tight">Get 100 credits<br/>per referral</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00e5ff]/40">
                <Gift size={14} className="text-white/60 group-hover:text-[#00e5ff]" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group cursor-pointer hover:border-[#9d00ff]/30 transition-all">
             <div className="absolute inset-0 bg-gradient-to-br from-[#9d00ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white mb-1 tracking-tight">Upgrade to Pro</p>
                <p className="text-[10px] text-white/40 leading-tight">Unlock premium<br/>AI features</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#9d00ff]/10 flex items-center justify-center border border-[#9d00ff]/30 group-hover:bg-[#9d00ff] transition-all">
                <Zap size={14} className="text-[#9d00ff] group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-2 pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#9d00ff] p-[1px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">{initial}</div>
            </div>
            <button 
              onClick={onLogout}
              className="text-[10px] text-white/30 hover:text-white transition-colors font-bold uppercase tracking-widest"
            >
              Logout
            </button>
          </div>
          <button className="relative text-white/40 hover:text-[#00e5ff] transition-colors">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#9d00ff] rounded-full border-2 border-[#0a0a0a]" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 flex flex-col overflow-hidden">
        <div className="flex-1 relative rounded-[32px] overflow-hidden bg-black shadow-2xl flex flex-col border border-white/5">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/5 via-[#9d00ff]/5 to-black opacity-50" />
             <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00e5ff]/20 rounded-full blur-[120px] animate-pulse" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#9d00ff]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s'}} />
             <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#00e5ff]/10 rounded-full blur-[100px]" />
          </div>

          {/* Prompt Section */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-10 text-center animate-fade-in">
              Got an idea, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-[#9d00ff]">{userName}?</span>
            </h1>

            {/* Prompt Input */}
            <div className="w-full max-w-2xl bg-[#141414]/90 backdrop-blur-3xl rounded-[28px] border border-white/10 p-2 shadow-2xl focus-within:border-[#00e5ff]/50 transition-all group overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent -translate-x-full group-focus-within:translate-x-full transition-transform duration-1000" />
              
              <div className="px-5 pt-4 pb-4">
                <textarea 
                  placeholder="Ask Lyzard to materialize your vision..."
                  className="w-full bg-transparent border-none resize-none focus:ring-0 text-lg placeholder:text-white/20 h-24 font-semibold tracking-tight"
                />
              </div>
              <div className="flex items-center justify-between px-3 pb-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1">
                  <button className="p-2 text-white/40 hover:text-[#00e5ff] hover:bg-[#00e5ff]/5 rounded-xl transition-all">
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all uppercase tracking-wider">
                    Core <ChevronDown size={14} />
                  </button>
                  <button className="p-2 text-white/40 hover:text-[#00e5ff] hover:bg-[#00e5ff]/5 rounded-xl transition-all">
                    <Mic size={18} />
                  </button>
                  <button className="p-2.5 bg-gradient-to-r from-[#00e5ff] to-[#9d00ff] text-black rounded-xl shadow-lg shadow-[#00e5ff]/20 hover:scale-105 active:scale-95 transition-all font-black">
                    <ArrowUp size={22} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Button for Bottom Section */}
          <div className="relative z-20 flex justify-center -mb-4">
            <button 
              onClick={() => setIsProjectsVisible(!isProjectsVisible)}
              className="px-4 py-1.5 bg-[#141414] border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:border-white/20 transition-all backdrop-blur-3xl flex items-center gap-2 group shadow-2xl"
            >
              {isProjectsVisible ? "Hide Projects" : "Reveal Projects"}
              <ChevronDown size={14} className={cn("transition-transform duration-500", !isProjectsVisible && "rotate-180")} />
            </button>
          </div>

          {/* Bottom Tabs Section */}
          <AnimatePresence>
            {isProjectsVisible && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 bg-black/60 backdrop-blur-2xl p-6 border-t border-white/5 rounded-b-[32px] overflow-hidden"
              >
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
                    <button 
                      onClick={() => setActiveTab('projects')}
                      className={cn(
                        "px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                        activeTab === 'projects' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white hover:bg-white/5"
                      )}
                    >
                      Projects
                    </button>
                    <button 
                       onClick={() => setActiveTab('viewed')}
                       className={cn(
                         "px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                         activeTab === 'viewed' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white hover:bg-white/5"
                       )}
                    >
                      History
                    </button>
                    <button 
                       onClick={() => setActiveTab('templates')}
                       className={cn(
                         "px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                         activeTab === 'templates' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white hover:bg-white/5"
                       )}
                    >
                      Templates
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-[#00e5ff] group transition-all">
                    Access All
                    <ArrowUp size={16} className="rotate-90 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {/* Empty state placeholder */}
                <div className="mt-8 flex justify-center py-10 opacity-30">
                   <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-tr from-[#00e5ff]/20 to-[#9d00ff]/20 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                        <Grid size={32} className="text-white/40" />
                      </div>
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">Neural net empty</p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
