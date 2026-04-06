import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { getCredits } from '../api/credits';
import { ArrowLeft, User, LogOut, Shield, Mail, Database, Sparkles, ChevronRight } from 'lucide-react';
import { Button, GlassPanel, Card } from '../components/ui';

export default function Settings() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.full_name || 'Visionary';
      setUserName(name);
      setUserEmail(data.user?.email ?? '');
    });

    getCredits().then((res) => {
      setCredits(res.credits);
    }).catch(console.error);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-carbon-0 text-white font-sans selection:bg-amber-primary/30 py-16 px-6">
      {/* ── Background Decals ──────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Navigation */}
        <motion.button 
          variants={itemVariants}
          onClick={() => navigate('/dashboard')}
          className="group flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-white-50 hover:text-white mb-12 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retrurn to Command Hub
        </motion.button>

        <motion.div variants={itemVariants} className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface text-[10px] font-black uppercase tracking-widest text-amber-primary border border-amber-primary/20">
            <Shield className="w-3.5 h-3.5" />
            <span>Active Protocol</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold tracking-tight">Protocols.</h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div variants={itemVariants}>
          <GlassPanel elevated className="p-10 mb-12 relative overflow-hidden">
             {/* Large background initial */}
             <div className="absolute -top-10 -right-10 text-[200px] font-heading font-black text-white/[0.02] select-none">
                {userName.charAt(0).toUpperCase()}
             </div>

             <div className="flex flex-col md:flex-row items-center gap-10 border-b border-white/5 pb-10 mb-10 relative z-10">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-carbon-1 to-carbon-0 border border-white/10 flex items-center justify-center text-3xl font-black text-amber-primary shadow-2xl relative group">
                  <div className="absolute inset-0 bg-amber-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h2 className="text-3xl font-heading font-extrabold tracking-tight">{userName}</h2>
                  <p className="text-white-50 font-medium tracking-tight flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-4 h-4" />
                    {userEmail}
                  </p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white-10 flex items-center">
                    <User className="w-4 h-4 mr-2" /> Identity Profile
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white-10">Legal Designation</label>
                      <div className="text-lg font-bold tracking-tight text-white/90">{userName || 'Not Specified'}</div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white-10">Communication Signal</label>
                      <div className="text-lg font-bold tracking-tight text-white/90">{userEmail}</div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white-10">Access Identifier</label>
                      <div className="text-[11px] font-mono text-white-50 uppercase bg-white/5 px-2 py-1 rounded inline-block">MNGD_BY_SUPABASE_SYSTEM</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white-10 flex items-center">
                    <Database className="w-4 h-4 mr-2" /> Resource Metrics
                  </h3>
                  <div className="glass-surface-elevated border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center h-48 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-amber-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Sparkles className="w-8 h-8 text-amber-primary mb-4 animate-pulse" />
                    <span className="text-5xl font-heading font-black text-white mb-2 leading-none">
                      {credits !== null ? credits : '...'}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white-10">Fragments Available</span>
                    
                    <button className="mt-6 flex items-center gap-2 text-amber-primary hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest">
                       Amplify Power <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
             </div>
          </GlassPanel>
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex justify-center flex-col items-center gap-6">
           <Button
            onClick={handleLogout}
            variant="ghost"
            size="lg"
            className="w-full max-w-sm rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] border border-ruby-danger/20 text-ruby-danger hover:bg-ruby-danger/10 shadow-2xl transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" /> Terminate Active Session
          </Button>
          <p className="text-[10px] text-white-10 font-bold uppercase tracking-widest">Lyzard Intelligence Protocol v4.0.2</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
