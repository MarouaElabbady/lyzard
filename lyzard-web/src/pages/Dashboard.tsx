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

      <div className="border border-neutral-800 rounded-xl p-8 bg-neutral-900 shadow-xl flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
          <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </div>
        <h2 className="text-xl text-neutral-300 font-semibold mb-2">Build your first landing page</h2>
        <p className="text-neutral-500 mb-8 max-w-sm">
          Use our AI engine to generate a high-converting, premium landing page in seconds.
        </p>
        <button 
          onClick={() => navigate('/builder')}
          className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Create New Page
        </button>
      </div>
    </div>
  );
}
