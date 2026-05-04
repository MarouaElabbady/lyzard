import React from 'react';
import { DashboardV2 } from '../components/dashboard/DashboardV2';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now, just navigate back to home
    navigate('/');
  };

  // Mock user for the dashboard
  const mockUser = {
    email: 'hello@lyzard.ai',
    user_metadata: {
      full_name: 'Lyzard Creator',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lyzard'
    }
  };

  return (
    <DashboardV2 onLogout={handleLogout} user={mockUser} />
  );
};

export default DashboardPage;
