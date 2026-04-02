import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getProjects, createProject, deleteProject, renameProject } from '../api/projects';
import type { Project } from '../api/projects';
import { getCredits, purchaseCredits } from '../api/credits';
import {
  Plus, LogOut, Wand2, Trash2, Clock, Loader2,
  AlertCircle, X, FolderOpen, ExternalLink, Coins, ChevronDown, Settings as SettingsIcon, Edit2
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects]       = useState<Project[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [showModal, setShowModal]     = useState(false);
  const [newName, setNewName]         = useState('');
  const [creating, setCreating]       = useState(false);
  const [deletingId, setDeletingId]   = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [renameModalProject, setRenameModalProject] = useState<Project | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [renaming, setRenaming]       = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName]       = useState('');
  const [userEmail, setUserEmail]     = useState('');
  const [credits, setCredits]         = useState<number | null>(null);
  const [showPurchase, setShowPurchase] = useState(false);
  const dropdownRef                   = useRef<HTMLDivElement>(null);

  // ── User info ──────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const name =
        data.user?.user_metadata?.full_name ||
        data.user?.email?.split('@')[0] ||
        'User';
      setUserName(name);
      setUserEmail(data.user?.email ?? '');
    });

    getCredits().then((res) => {
      setCredits(res.credits);
    }).catch(console.error);
  }, []);

  // ── Close dropdown on outside click ───────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Load projects ──────────────────────────────────────────────────────
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load projects';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // ── Create project ─────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const project = await createProject(newName.trim());
      setProjects((prev) => [project, ...prev]);
      setShowModal(false);
      setNewName('');
      navigate(`/builder?project=${project.id}`);
    } catch {
      setError('Failed to create project. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  // ── Delete project ─────────────────────────────────────────────────────
  const initiateDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    setDeletingId(deleteConfirmId);
    try {
      await deleteProject(deleteConfirmId);
      setProjects((prev) => prev.filter((p) => p.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } catch {
      setError('Failed to delete project.');
      setDeleteConfirmId(null);
    } finally {
      setDeletingId(null);
    }
  };

  // ── Rename project ─────────────────────────────────────────────────────
  const initiateRename = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setRenameModalProject(project);
    setRenameValue(project.name);
  };

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameModalProject || !renameValue.trim()) return;
    setRenaming(true);
    try {
      const updated = await renameProject(renameModalProject.id, renameValue.trim());
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setRenameModalProject(null);
    } catch {
      setError('Failed to rename project.');
    } finally {
      setRenaming(false);
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handlePurchase = async () => {
    try {
      const res = await purchaseCredits();
      setCredits(res.credits);
      setShowPurchase(false);
    } catch {
      alert('Failed to purchase credits.');
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const initials = userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="dash-root">

      {/* ── TOP NAVBAR ───────────────────────────────────────────────────── */}
      <nav className="dash-nav">
        <div className="dash-nav-inner">
          {/* Logo */}
          <div className="dash-logo">
            <Wand2 className="dash-logo-icon" />
            <span>Lyzard<span className="dash-logo-accent">.ai</span></span>
          </div>

          {/* Right side */}
          <div className="dash-nav-right">
            {/* Credit badge */}
            <div 
              className="dash-credit-badge hover:bg-[--colors-accent-hover] transition-colors cursor-pointer"
              onClick={() => setShowPurchase(true)}
              style={{ cursor: 'pointer' }}
            >
              <Coins className="dash-credit-icon" />
              <span>{credits !== null ? credits : '...'} credits</span>
            </div>

            {/* User dropdown */}
            <div className="dash-user-wrap" ref={dropdownRef}>
              <button
                className="dash-avatar-btn"
                onClick={() => setShowDropdown((v) => !v)}
              >
                <div className="dash-avatar">{initials || '?'}</div>
                <span className="dash-username">{userName}</span>
                <ChevronDown className="dash-chevron" />
              </button>

              {showDropdown && (
                <div className="dash-dropdown">
                  <div className="dash-dropdown-header">
                    <p className="dash-dropdown-name">{userName}</p>
                    <p className="dash-dropdown-email">{userEmail}</p>
                  </div>
                  <div className="dash-dropdown-divider" />
                  <button className="dash-dropdown-item" onClick={() => navigate('/settings')}>
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <button className="dash-dropdown-item" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <main className="dash-main">

        {/* Page header */}
        <div className="dash-header">
          <h1 className="dash-title">My Projects</h1>
          <button
            id="new-project-btn"
            className="dash-new-btn"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="dash-error">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="dash-loading">
            <Loader2 className="dash-spinner" />
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="dash-empty">
            <div className="dash-empty-icon">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h2 className="dash-empty-title">No projects yet</h2>
            <p className="dash-empty-sub">Create your first AI-generated landing page</p>
            <button className="dash-new-btn" onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4" />
              Create Project
            </button>
          </div>
        )}

        {/* Project grid */}
        {!loading && projects.length > 0 && (
          <div className="dash-grid">
            {projects.map((project) => (
              <div key={project.id} className="dash-card">
                {/* Thumbnail */}
                <div className="dash-card-thumb">
                  <div className="dash-card-thumb-placeholder">
                    <Wand2 className="w-8 h-8 opacity-30" />
                  </div>

                  {/* Hover overlay */}
                  <div className="dash-card-overlay">
                    <button
                      className="dash-overlay-btn dash-overlay-open"
                      onClick={() => navigate(`/builder?project=${project.id}`)}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </button>
                    <button
                      className="dash-overlay-btn dash-overlay-delete"
                      onClick={(e) => initiateRename(e, project)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="dash-overlay-btn dash-overlay-delete"
                      onClick={(e) => initiateDelete(e, project.id)}
                      disabled={deletingId === project.id}
                    >
                      {deletingId === project.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Card info */}
                <div className="dash-card-body">
                  <div className="dash-card-top">
                    <h3 className="dash-card-name">{project.name}</h3>
                    <span className={`dash-status-badge ${project.status === 'active' ? 'dash-status-active' : 'dash-status-draft'}`}>
                      {project.status === 'active' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="dash-card-date">
                    <Clock className="w-3 h-3" />
                    Created {formatDate(project.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── CREATE PROJECT MODAL ─────────────────────────────────────────── */}
      {showModal && (
        <div className="dash-modal-overlay" onClick={() => { setShowModal(false); setNewName(''); }}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h2>New Project</h2>
              <button onClick={() => { setShowModal(false); setNewName(''); }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="dash-modal-body">
              <label htmlFor="new-project-name" className="dash-modal-label">
                Project name
              </label>
              <input
                id="new-project-name"
                autoFocus
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Moroccan Restaurant Landing Page"
                required
                disabled={creating}
                className="dash-modal-input"
              />
              <button
                type="submit"
                disabled={creating || !newName.trim()}
                className="dash-modal-submit"
              >
                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                {creating ? 'Creating…' : 'Create & Open Builder'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── PURCHASE CREDITS MODAL ─────────────────────────────────────────── */}
      {showPurchase && (
        <div className="dash-modal-overlay" onClick={() => setShowPurchase(false)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h2>Buy Credits</h2>
              <button onClick={() => setShowPurchase(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="dash-modal-body text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#e1f5fe] rounded-full flex items-center justify-center text-[#0288d1]">
                  <Coins className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Need more generations?</h3>
              <p className="text-[#64748b] mb-6">Purchase a pack of 10 credits to continue generating components and editing your pages.</p>
              
              <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl flex items-center justify-between mb-6">
                <div className="text-left">
                  <div className="font-semibold">Starter Pack</div>
                  <div className="text-sm text-[#64748b]">10 AI generations</div>
                </div>
                <div className="text-xl font-bold">$5.00</div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
              >
                Mock Purchase (Add 10)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE PROJECT MODAL ─────────────────────────────────────────── */}
      {deleteConfirmId !== null && (
        <div className="dash-modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h2>Confirm Deletion</h2>
              <button onClick={() => setDeleteConfirmId(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="dash-modal-body">
              <p className="mb-6 text-[#64748b]">Are you sure you want to delete this project? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 px-4 bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg font-medium hover:bg-[#f8fafc] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deletingId !== null}
                  className="flex-1 py-2.5 px-4 bg-[#ef4444] text-white rounded-lg font-medium hover:bg-[#dc2626] transition-colors flex items-center justify-center"
                >
                  {deletingId !== null ? <Loader2 className="w-4 h-4 animate-spin opacity-80" /> : 'Delete Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── RENAME PROJECT MODAL ─────────────────────────────────────────── */}
      {renameModalProject && (
        <div className="dash-modal-overlay" onClick={() => setRenameModalProject(null)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h2>Rename Project</h2>
              <button onClick={() => setRenameModalProject(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRename} className="dash-modal-body">
              <label htmlFor="rename-project-name" className="dash-modal-label">
                Project name
              </label>
              <input
                id="rename-project-name"
                autoFocus
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                placeholder="e.g. Moroccan Restaurant Landing Page"
                required
                disabled={renaming}
                className="dash-modal-input"
              />
              <button
                type="submit"
                disabled={renaming || !renameValue.trim() || renameValue.trim() === renameModalProject.name}
                className="dash-modal-submit"
              >
                {renaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit2 className="w-4 h-4" />}
                {renaming ? 'Renaming…' : 'Rename Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
