import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Settings from './pages/Settings';
import Landing from './pages/Landing';

// ── Protected Route ──────────────────────────────────────────────────────────
// Reads the live Supabase session — never the old localStorage key.
const ProtectedRoute = ({
  session,
  loading,
  children,
}: {
  session: Session | null;
  loading: boolean;
  children: React.ReactNode;
}) => {
  if (loading) {
    // Show nothing (or a spinner) while Supabase restores the session
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return session ? <>{children}</> : <Navigate to="/login" replace />;
};

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChange fires INITIAL_SESSION on mount — use it as
    // the single source of truth so we avoid the getSession race.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Auth]', event, session?.user?.email ?? 'null');
      setSession(session);
      setLoading(false); // clears loading on INITIAL_SESSION and all future events
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public — redirect to dashboard if already logged in */}
        <Route path="/login"  element={!loading && session ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={!loading && session ? <Navigate to="/dashboard" replace /> : <Signup />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder"
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Builder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Public Landing */}
        <Route path="/" element={!loading && session ? <Navigate to="/dashboard" replace /> : <Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
