import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { getProjects, createProject, deleteProject, renameProject } from '../api/projects';
import type { Project } from '../api/projects';
import { getCredits } from '../api/credits';
import {
  Plus, LogOut, Wand2, Trash2, Loader2, ChevronRight,
  AlertCircle, X, Coins, Settings as SettingsIcon, Edit2,
  LayoutGrid, Clock, Rocket
} from 'lucide-react';
import { Button, Input, GlassPanel, Card } from '../components/ui';

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Modal states
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renamingProject, setRenamingProject] = useState<Project | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, creditsRes] = await Promise.all([
        getProjects(),
        getCredits()
      ]);

      setProjects(projectsRes.data);
      setCredits(creditsRes.credits);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      setIsCreating(true);
      const project = await createProject(newProjectName);
      setProjects([project, ...projects]);
      setIsNewProjectModalOpen(false);
      setNewProjectName('');
      navigate(`/builder?project=${project.id}`);
    } catch (err: any) {
      alert(err.message || 'Failed to create project');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    }
  };

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renamingProject || !renameValue.trim()) return;

    try {
      await renameProject(renamingProject.id, renameValue);
      setProjects(projects.map(p => p.id === renamingProject.id ? { ...p, name: renameValue } : p));
      setIsRenameModalOpen(false);
      setRenamingProject(null);
    } catch (err: any) {
      alert(err.message || 'Failed to rename project');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-carbon-0">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-amber-primary animate-spin" />
          <div className="absolute inset-0 blur-2xl bg-amber-primary/20 animate-pulse" />
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-carbon-0 text-white font-sans relative">
      
      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-40 border-b border-border-sharp bg-carbon-0/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-amber-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,184,0,0.3)]">
              <Wand2 className="w-4 h-4 text-carbon-0 fill-carbon-0" />
            </div>
            <span className="text-xl font-heading font-extrabold tracking-tighter uppercase">
              Lyzard.ai
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex glass-surface px-4 py-2 rounded-full items-center gap-3 border border-white/5 shadow-xl">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-primary/10 border border-amber-primary/20">
                <Coins className="w-3.5 h-3.5 text-amber-primary" />
                <span className="text-[11px] font-black text-amber-primary tracking-widest">{credits ?? 0}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white-50">Intelligence Credits</span>
            </div>

            <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/settings')} 
                className="w-10 h-10 p-0 rounded-full"
              >
                <SettingsIcon className="w-5 h-5 text-white-50 hover:text-white" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="w-10 h-10 p-0 rounded-full"
              >
                <LogOut className="w-5 h-5 text-white-50 hover:text-white" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface text-[10px] font-black uppercase tracking-widest text-amber-primary border border-amber-primary/20 shadow-xl"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Project Nexus</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight">Your Masterpieces.</h2>
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => setIsNewProjectModalOpen(true)}
            className="shadow-2xl shadow-amber-primary/20 group"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm tracking-widest uppercase">New Vision</span>
          </Button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between bg-ruby-danger/10 border border-ruby-danger/20 text-ruby-danger p-4 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-bold tracking-tight">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="p-1 hover:bg-white/5 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Project Grid */}
        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-amber-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Wand2 className="w-10 h-10 text-white-10 group-hover:text-amber-primary transition-colors" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-heading font-extrabold">The void is waiting.</h3>
              <p className="text-white-50 font-medium max-w-sm mx-auto">Generate your first conversion-optimized masterpiece in sixty seconds.</p>
            </div>
            <Button variant="glass" size="lg" onClick={() => setIsNewProjectModalOpen(true)}>
              Initialize First Project
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card 
                  className="group cursor-pointer overflow-hidden relative flex flex-col border border-border-sharp hover:border-white/20 hover:bg-white/5 transition-all p-0 h-full"
                  onClick={() => navigate(`/builder?project=${project.id}`)}
                >
                  {/* Card Preview Area */}
                  <div className="aspect-[16/10] bg-carbon-1/80 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-carbon-0 to-transparent opacity-60" />
                    <div className="opacity-5 scale-150 transition-transform group-hover:scale-125 duration-700">
                      <LayoutGrid className="w-20 h-20 text-white" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                      <div className="px-6 py-2 bg-white text-carbon-0 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                        Enter Workspace
                      </div>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-heading font-extrabold tracking-tight group-hover:text-amber-primary transition-colors truncate">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-3 text-white-50 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(project.updated_at || project.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Rocket className="w-3 h-3 text-emerald-state" />
                          <span>Ready</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-8 h-8 p-0 rounded-lg hover:bg-white/5 text-white-50 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenamingProject(project);
                            setRenameValue(project.name);
                            setIsRenameModalOpen(true);
                          }}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-8 h-8 p-0 rounded-lg hover:bg-ruby-danger/10 text-white-50 hover:text-ruby-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white-50 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {(isNewProjectModalOpen || isRenameModalOpen) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsNewProjectModalOpen(false);
                setIsRenameModalOpen(false);
              }}
              className="absolute inset-0 bg-carbon-0/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md z-[101]"
            >
              <GlassPanel elevated className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-heading font-extrabold tracking-tight">
                    {isNewProjectModalOpen ? 'Initialize New Vision' : 'Redefine Vision'}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-8 h-8 p-0" 
                    onClick={() => {
                      setIsNewProjectModalOpen(false);
                      setIsRenameModalOpen(false);
                    }}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <form 
                  onSubmit={isNewProjectModalOpen ? handleCreateProject : handleRename}
                  className="space-y-8"
                >
                  <Input 
                    label={isNewProjectModalOpen ? "Vision Title" : "New Title"}
                    value={isNewProjectModalOpen ? newProjectName : renameValue}
                    onChange={(e) => isNewProjectModalOpen ? setNewProjectName(e.target.value) : setRenameValue(e.target.value)}
                    placeholder="e.g. Midnight Gallery"
                    autoFocus
                  />

                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="flex-1 text-[10px] font-black uppercase tracking-widest"
                      onClick={() => {
                        setIsNewProjectModalOpen(false);
                        setIsRenameModalOpen(false);
                      }}
                    >
                      Hold Selection
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="flex-1 text-[10px] font-black uppercase tracking-widest"
                      isLoading={isCreating}
                    >
                      {isNewProjectModalOpen ? 'Confirm Vision' : 'Update Title'}
                    </Button>
                  </div>
                </form>
              </GlassPanel>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
