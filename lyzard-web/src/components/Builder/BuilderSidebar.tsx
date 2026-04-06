import { MessageSquare, History, Layers, Settings, HelpCircle, User, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  icon: typeof MessageSquare;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`group relative w-12 h-12 flex items-center justify-center rounded-2xl cursor-pointer transition-all duration-500 ${
        active 
          ? 'bg-amber-primary text-carbon-0 shadow-[0_0_20px_rgba(255,184,0,0.3)]' 
          : 'text-white-50 bg-transparent hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
      }`}
    >
      <Icon size={18} className={`transition-transform duration-500 group-active:scale-90 ${active ? 'scale-110' : ''}`} />
      
      {/* ── Tooltip ────────────────────────────────────────────────────────── */}
      <div className="absolute left-16 bg-carbon-1 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all border border-border-sharp shadow-2xl z-50 pointer-events-none whitespace-nowrap">
        {label}
      </div>

      {active && (
        <motion.div 
          layoutId="sidebar-active-indicator"
          className="absolute -left-4 w-1 h-6 bg-amber-primary rounded-r-full shadow-[0_0_15px_rgba(255,184,0,0.8)]" 
        />
      )}
    </div>
  );
}

export function BuilderSidebar() {
  const location = useLocation();

  return (
    <aside className="w-[72px] bg-carbon-0/80 backdrop-blur-3xl border-r border-border-sharp flex flex-col items-center py-8 gap-10 z-[55]">
      {/* ── Core Navigation ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-5">
        <SidebarItem icon={MessageSquare} label="Orchestrator" active />
        <SidebarItem icon={History} label="Temporal Hub" />
        <SidebarItem icon={Layers} label="Foundations" />
        <SidebarItem icon={Database} label="Knowledge" />
      </div>

      {/* ── Footer Navigation ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 pb-4">
        <SidebarItem icon={HelpCircle} label="Guidance" />
        <Link to="/settings">
          <SidebarItem icon={Settings} label="Protocols" active={location.pathname === '/settings'} />
        </Link>
        <div className="h-px w-8 bg-white/5 mx-auto my-2" />
        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-all hover:border-white/10">
          <User size={16} className="text-white-50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}
