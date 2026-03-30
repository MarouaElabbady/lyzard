import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('supabase_jwt');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Lyzard.ai <span className="text-emerald-400">Dashboard</span></h1>
        <button 
          onClick={handleLogout}
          className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="border border-neutral-800 rounded-xl p-8 bg-neutral-900 shadow-xl">
        <h2 className="text-xl text-neutral-300 font-semibold mb-2">Welcome to your workspace</h2>
        <p className="text-neutral-500">
          This is a placeholder for the Sprint 3 Dashboard feature.
          <br/>Authentication was successful.
        </p>
      </div>
    </div>
  );
}
