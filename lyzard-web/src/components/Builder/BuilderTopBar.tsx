import { Rocket, Save, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

interface BuilderTopBarProps {
  projectName: string;
  isSaving: boolean;
  isDeploying: boolean;
  credits: number;
  onDeploy: () => Promise<void>;
  onSave: () => void;
}

export function BuilderTopBar({ 
  projectName, 
  isSaving, 
  isDeploying, 
  credits, 
  onDeploy, 
  onSave 
}: BuilderTopBarProps) {
  return (
    <header className="h-20 bg-carbon-0/80 backdrop-blur-3xl border-b border-border-sharp flex items-center justify-between px-8 z-50 sticky top-0">
      <div className="flex items-center gap-10">
        <Link to="/dashboard" className="group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-primary rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_20px_rgba(255,184,0,0.3)]">
              <Rocket className="text-carbon-0 w-5 h-5 -rotate-3 group-hover:-rotate-12 transition-transform" />
            </div>
            <div>
              <h1 className="text-sm font-heading font-black tracking-[0.2em] uppercase text-white group-hover:text-amber-primary transition-colors">Lyzard AI</h1>
              <p className="text-[9px] font-black tracking-widest text-white-10 uppercase mt-0.5">Design Orchestrator</p>
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
           <div className="h-6 w-px bg-white/5" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white-10">Active Project</span>
              <span className="text-xs font-bold text-white/90 truncate max-w-[200px]">{projectName}</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Credits Status */}
        <div className="hidden sm:flex items-center gap-2 mr-4 bg-carbon-1/50 px-4 py-2 rounded-xl border border-white/5">
           <div className="w-1.5 h-1.5 bg-amber-primary rounded-full animate-pulse shadow-[0_0_8px_#ffb800]" />
           <span className="text-[10px] font-black uppercase tracking-widest text-white-50">{credits} Fragments</span>
        </div>

        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onSave}
          isLoading={isSaving}
          className="h-10 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest border-white/5 hover:border-white/10"
        >
          {!isSaving && <Save size={14} className="mr-2" />}
          Protocol Save
        </Button>

        <Button 
          variant="primary" 
          size="sm"
          onClick={onDeploy}
          isLoading={isDeploying}
          className="h-10 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest"
        >
          {!isDeploying && <Sparkles size={14} className="mr-2" />}
          Deploy
        </Button>

        <div className="h-10 w-px bg-white/5 mx-2" />
        
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-white/5">
           <ChevronDown size={18} className="text-white-50" />
        </Button>
      </div>
    </header>
  );
}
