import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getProjects, createProject, deleteProject } from '../api/projects';
import type { Project } from '../api/projects';
import {
  Plus, LogOut, Wand2, Trash2, Clock, Loader2,
  AlertCircle, X, FolderOpen, ExternalLink, Coins, ChevronDown
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName]       = useState('');
  const [userEmail, setUserEmail]     = useState('');
  const [credits]                     = useState(3);
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
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError('Failed to delete project.');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
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
            <div className="dash-credit-badge">
              <Coins className="dash-credit-icon" />
              <span>{credits} credits</span>
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
                      onClick={(e) => handleDelete(e, project.id)}
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
    </div>
  );
}
