import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getCredits } from '../api/credits';
import { ArrowLeft, User, Coins, LogOut } from 'lucide-react';
import './Dashboard.css';

export default function Settings() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.full_name || 'User';
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

  return (
    <div className="dash-root" style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem' }}>
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-sm text-[#475569] hover:text-[#0f172a] mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-8 text-[#0f172a]">Settings</h1>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-center mb-6 border-b border-[#f1f5f9] pb-6">
            <div className="w-16 h-16 bg-[#ebf8ff] rounded-full flex items-center justify-center text-[#0288d1] font-bold text-2xl mr-6">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">{userName}</h2>
              <p className="text-[#64748b]">{userEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#94a3b8] mb-4 flex items-center">
                <User className="w-4 h-4 mr-2" /> Profile Details
              </h3>
              <div className="mb-4">
                <label className="block text-sm text-[#64748b] mb-1">Full Name</label>
                <div className="font-medium">{userName || 'Not set'}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-[#64748b] mb-1">Email Address</label>
                <div className="font-medium">{userEmail}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-[#64748b] mb-1">Account ID</label>
                <div className="font-medium text-xs text-[#94a3b8]">Managed by Supabase</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#94a3b8] mb-4 flex items-center">
                <Coins className="w-4 h-4 mr-2" /> Credit Balance
              </h3>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-6 flex flex-col items-center justify-center h-32">
                <span className="text-3xl font-bold text-[#0f172a] mb-1">
                  {credits !== null ? credits : '...'}
                </span>
                <span className="text-sm text-[#64748b]">credits available</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full max-w-sm mx-auto text-[#ef4444] border border-[#fecaca] hover:bg-[#fef2f2] bg-white py-3 rounded-lg font-medium transition"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </button>
      </div>
    </div>
  );
}
